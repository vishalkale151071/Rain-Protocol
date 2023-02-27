import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { artifacts, ethers } from "hardhat";
import {
  CloneFactory,
  RainterpreterExpressionDeployer,
} from "../../../../typechain";
import {
  EvaluableConfigStruct,
  FlowERC20,
  FlowERC20ConfigStruct,
} from "../../../../typechain/contracts/flow/erc20/FlowERC20";
import { getEventArgs } from "../../../events";
import { FlowERC20Config } from "../../../types/flow";
import { generateEvaluableConfig } from "../../../interpreter";
import { getTouchDeployer } from "../../interpreter/shared/rainterpreterExpressionDeployer/deploy";
import { InterpreterCallerV1ConstructionConfigStruct } from "../../../../typechain/contracts/flow/FlowCommon";
import { getRainDocumentsFromContract } from "../../../meta";
import { assert } from "chai";
import { zeroAddress } from "../../../constants";

export const flowERC20Implementation = async (): Promise<FlowERC20> => {
  const flowFactory = await ethers.getContractFactory("FlowERC20", {});

  const touchDeployer: RainterpreterExpressionDeployer =
    await getTouchDeployer();
  const interpreterCallerConfig: InterpreterCallerV1ConstructionConfigStruct = {
    callerMeta: getRainDocumentsFromContract("flow20"),
    deployer: touchDeployer.address,
  };

  const flow = (await flowFactory.deploy(interpreterCallerConfig)) as FlowERC20;

  assert(!(flow.address === zeroAddress), "implementation stake zero address");

  return flow;
};

export const flowERC20Clone = async (
  deployer: SignerWithAddress,
  cloneFactory: CloneFactory,
  implementation: FlowERC20,
  flowERC20Config: FlowERC20Config
) => {
  // Building evaluableConfig
  const evaluableConfig: EvaluableConfigStruct = await generateEvaluableConfig(
    flowERC20Config.expressionConfig.sources,
    flowERC20Config.expressionConfig.constants
  );

  // Building flowConfig
  const flowConfig: EvaluableConfigStruct[] = [];
  for (let i = 0; i < flowERC20Config.flows.length; i++) {
    const evaluableConfig = await generateEvaluableConfig(
      flowERC20Config.flows[i].sources,
      flowERC20Config.flows[i].constants
    );
    flowConfig.push(evaluableConfig);
  }

  const flowERC20ConfigStruct: FlowERC20ConfigStruct = {
    evaluableConfig: evaluableConfig,
    flowConfig: flowConfig,
    name: flowERC20Config.name,
    symbol: flowERC20Config.symbol,
  };

  const encodedConfig = ethers.utils.defaultAbiCoder.encode(
    [
      "tuple(string name, string symbol, tuple(address deployer,bytes[] sources,uint256[] constants) evaluableConfig , tuple(address deployer,bytes[] sources,uint256[] constants)[] flowConfig)",
    ],
    [flowERC20ConfigStruct]
  );

  const flowCloneTx = await cloneFactory.clone(
    implementation.address,
    encodedConfig
  );

  const flow = new ethers.Contract(
    ethers.utils.hexZeroPad(
      ethers.utils.hexStripZeros(
        (await getEventArgs(flowCloneTx, "NewClone", cloneFactory)).clone
      ),
      20 // address bytes length
    ),
    (await artifacts.readArtifact("FlowERC20")).abi,
    deployer
  ) as FlowERC20;

  await flow.deployed();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  flow.deployTransaction = flowCloneTx;

  return { flow };
};
