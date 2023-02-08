import { assert } from "chai";
import { ContractFactory } from "ethers";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type { OrderBook, ReserveToken18 } from "../../typechain";
import {
  OrderConfigStruct,
  AddOrderEvent,
} from "../../typechain/contracts/orderbook/OrderBook";
import { randomUint256 } from "../../utils/bytes";
import {
  eighteenZeros,
  max_uint256,
  ONE,
} from "../../utils/constants/bigNumber";
import { basicDeploy } from "../../utils/deploy/basicDeploy";
import { getEventArgs } from "../../utils/events";
import {
  generateEvaluableConfig,
  memoryOperand,
  MemoryType,
  op,
} from "../../utils/interpreter/interpreter";
import { AllStandardOps } from "../../utils/interpreter/ops/allStandardOps";
import { fixedPointDiv } from "../../utils/math";
import { compareStructs } from "../../utils/test/compareStructs";
import { getRainContractMetaBytes } from "../../utils";

const Opcode = AllStandardOps;

describe("OrderBook add order", async function () {
  let orderBookFactory: ContractFactory;
  let tokenA: ReserveToken18;
  let tokenB: ReserveToken18;

  beforeEach(async () => {
    tokenA = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
    tokenB = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
  });

  before(async () => {
    orderBookFactory = await ethers.getContractFactory("OrderBook", {});
  });

  it("should add orders", async function () {
    const signers = await ethers.getSigners();

    const alice = signers[1];
    const bob = signers[2];

    const orderBook = (await orderBookFactory.deploy(
      getRainContractMetaBytes("orderbook")
    )) as OrderBook;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());
    const bobInputVault = ethers.BigNumber.from(randomUint256());
    const bobOutputVault = ethers.BigNumber.from(randomUint256());

    const aliceOrder = ethers.utils.toUtf8Bytes("Order_A");

    // Order_A

    const ratio_A = ethers.BigNumber.from("90" + eighteenZeros);
    const constants_A = [max_uint256, ratio_A];
    const aOpMax = op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0));
    const aRatio = op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1));
    // prettier-ignore
    const source_A = concat([
      aOpMax,
      aRatio,
    ]);

    const EvaluableConfig_A = await generateEvaluableConfig({
      sources: [source_A, []],
      constants: constants_A,
    });

    const orderConfig_A: OrderConfigStruct = {
      validInputs: [
        { token: tokenA.address, decimals: 18, vaultId: aliceInputVault },
      ],
      validOutputs: [
        { token: tokenB.address, decimals: 18, vaultId: aliceOutputVault },
      ],
      evaluableConfig: EvaluableConfig_A,
      data: aliceOrder,
    };

    const txOrder_A = await orderBook.connect(alice).addOrder(orderConfig_A);

    const {
      sender: sender_A,
      expressionDeployer: ExpressionDeployer_A,
      order: order_A,
    } = (await getEventArgs(
      txOrder_A,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    assert(
      ExpressionDeployer_A === EvaluableConfig_A.deployer,
      "wrong expression deployer"
    );
    assert(sender_A === alice.address, "wrong sender");
    compareStructs(order_A, orderConfig_A);

    // Order_B

    const ratio_B = fixedPointDiv(ONE, ratio_A);
    const constants_B = [max_uint256, ratio_B];
    const bOpMax = op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0));
    const bRatio = op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1));
    // prettier-ignore
    const source_B = concat([
      bOpMax,
      bRatio,
    ]);

    const bobOrder = ethers.utils.toUtf8Bytes("Order_B");

    const EvaluableConfig_B = await generateEvaluableConfig({
      sources: [source_B, []],
      constants: constants_B,
    });

    const orderConfig_B: OrderConfigStruct = {
      validInputs: [
        { token: tokenB.address, decimals: 18, vaultId: bobInputVault },
      ],
      validOutputs: [
        { token: tokenA.address, decimals: 18, vaultId: bobOutputVault },
      ],
      evaluableConfig: EvaluableConfig_B,
      data: bobOrder,
    };

    const txOrderB = await orderBook.connect(bob).addOrder(orderConfig_B);

    const { sender: sender_B, order: order_B } = (await getEventArgs(
      txOrderB,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    assert(sender_B === bob.address, "wrong sender");
    compareStructs(order_B, orderConfig_B);
  });
});
