import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "chai";
import { artifacts, ethers } from "hardhat";
import type { CombineTier, CombineTierFactory } from "../../../../typechain";
import { InterpreterCallerV1ConstructionConfigStruct } from "../../../../typechain/contracts/flow/FlowCommon";
import { CombineTierConfigStruct } from "../../../../typechain/contracts/tier/CombineTier";
import { ImplementationEvent as ImplementationEventCombineTierFactory } from "../../../../typechain/contracts/tier/CombineTierFactory";
import { zeroAddress } from "../../../constants";
import { getEventArgs } from "../../../events";
import { getRainContractMetaBytes } from "../../../meta";
import { getTouchDeployer } from "../../interpreter/shared/rainterpreterExpressionDeployer/deploy";

export const combineTierDeploy = async (
  deployer: SignerWithAddress,
  config: CombineTierConfigStruct
) => {
  const combineTierFactoryFactory = await ethers.getContractFactory(
    "CombineTierFactory"
  ); 
  const touchDeployer = await getTouchDeployer() ;
  const config_: InterpreterCallerV1ConstructionConfigStruct = {
    callerMeta: getRainContractMetaBytes("combinetier"), 
    deployer: touchDeployer.address
  }; 
  const combineTierFactory = (await combineTierFactoryFactory.deploy(
    config_
  )) as CombineTierFactory;
  await combineTierFactory.deployed();

  const { implementation } = (await getEventArgs(
    combineTierFactory.deployTransaction,
    "Implementation",
    combineTierFactory
  )) as ImplementationEventCombineTierFactory["args"];
  assert(
    !(implementation === zeroAddress),
    "implementation combineTier factory zero address"
  );

  const tx = await combineTierFactory.createChildTyped(config);
  const contract = new ethers.Contract(
    ethers.utils.hexZeroPad(
      ethers.utils.hexStripZeros(
        (await getEventArgs(tx, "NewChild", combineTierFactory)).child
      ),
      20
    ),
    (await artifacts.readArtifact("CombineTier")).abi,
    deployer
  ) as CombineTier;
  await contract.deployed();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  contract.deployTransaction = tx;

  return contract;
};
