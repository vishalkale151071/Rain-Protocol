import { strict as assert } from "assert";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { CloneFactory, ReadWriteTier, ReserveToken } from "../../typechain";
import { PhaseScheduledEvent } from "../../typechain/contracts/phased/Phased";
import { Sale, TimeoutEvent } from "../../typechain/contracts/sale/Sale";
import { readWriteTierDeploy } from "../../utils";
import { zeroAddress } from "../../utils/constants/address";
import { ONE, RESERVE_ONE } from "../../utils/constants/bigNumber";
import { basicDeploy } from "../../utils/deploy/basicDeploy";
import { flowCloneFactory } from "../../utils/deploy/factory/cloneFactory";
import deploy1820 from "../../utils/deploy/registry1820/deploy";
import { saleClone, saleImplementation } from "../../utils/deploy/sale/deploy";
import { getEventArgs } from "../../utils/events";
import { createEmptyBlock, getBlockTimestamp } from "../../utils/hardhat";
import {
  generateEvaluableConfig,
  memoryOperand,
  MemoryType,
  op,
} from "../../utils/interpreter/interpreter";
import { AllStandardOps } from "../../utils/interpreter/ops/allStandardOps";
import { betweenBlockNumbersSource } from "../../utils/interpreter/sale";
import { assertError } from "../../utils/test/assertError";
import { Phase } from "../../utils/types/redeemableERC20";
import { Status } from "../../utils/types/sale";
import { Tier } from "../../utils/types/tier";

const Opcode = AllStandardOps;

describe("Sale timeout", async function () {
  let reserve: ReserveToken;
  let readWriteTier: ReadWriteTier;

  let cloneFactory: CloneFactory;
  let implementation: Sale;
  before(async () => {
    // Deploy ERC1820Registry
    const signers = await ethers.getSigners();
    await deploy1820(signers[0]);

    readWriteTier = await readWriteTierDeploy();

    //Deploy Clone Factory
    cloneFactory = await flowCloneFactory();

    implementation = await saleImplementation(cloneFactory);
  });

  beforeEach(async () => {
    reserve = (await basicDeploy("ReserveToken", {})) as ReserveToken;
  });

  it("should correctly timeout sale if it does not end naturally", async function () {
    const signers = await ethers.getSigners();
    const [deployer, recipient, feeRecipient] = signers;
    // 5 blocks from now
    const startBlock = (await ethers.provider.getBlockNumber()) + 5;
    const saleDuration = 30;
    const minimumRaise = ethers.BigNumber.from("150000").mul(RESERVE_ONE);
    const totalTokenSupply = ethers.BigNumber.from("2000").mul(ONE);
    const redeemableERC20Config = {
      name: "Token",
      symbol: "TKN",
      distributor: zeroAddress,
      initialSupply: totalTokenSupply,
    };
    const staticPrice = ethers.BigNumber.from("75").mul(RESERVE_ONE);
    const constants = [
      staticPrice,
      startBlock - 1,
      startBlock + saleDuration - 1,
    ];
    const vBasePrice = op(
      Opcode.read_memory,
      memoryOperand(MemoryType.Constant, 0)
    );
    const vStart = op(
      Opcode.read_memory,
      memoryOperand(MemoryType.Constant, 1)
    );
    const vEnd = op(Opcode.read_memory, memoryOperand(MemoryType.Constant, 2));

    const sources = [
      betweenBlockNumbersSource(vStart, vEnd),
      concat([op(Opcode.context, 0x0001), vBasePrice]),
      concat([]),
    ];
    const evaluableConfig = await generateEvaluableConfig(sources, constants);
    await assertError(
      async () =>
        await saleClone(
          signers,
          deployer,
          cloneFactory,
          implementation,
          {
            evaluableConfig,
            recipient: recipient.address,
            reserve: reserve.address,
            cooldownDuration: 1,
            minimumRaise,
            dustSize: 0,
            saleTimeout: 10001,
          },
          {
            erc20Config: redeemableERC20Config,
            tier: readWriteTier.address,
            minimumTier: Tier.ZERO,
            distributionEndForwardingAddress: ethers.constants.AddressZero,
          }
        ),
      "MAX_TIMEOUT",
      "did not prevent a sale timeout that exceeds maximum timeout, which was set by the sale factory"
    );
    const [sale, token] = await saleClone(
      signers,
      deployer,
      cloneFactory,
      implementation,
      {
        evaluableConfig,
        recipient: recipient.address,
        reserve: reserve.address,
        cooldownDuration: 1,
        minimumRaise,
        dustSize: 0,
        saleTimeout: 100,
      },
      {
        erc20Config: redeemableERC20Config,
        tier: readWriteTier.address,
        minimumTier: Tier.ZERO,
        distributionEndForwardingAddress: ethers.constants.AddressZero,
      }
    );
    await assertError(
      async () => await sale.timeout(),
      "EARLY_TIMEOUT",
      "wrongly timed out sale early"
    );
    // wait for sale timeout
    // should be relative to initialise so we aren't even going to start the sale
    await createEmptyBlock(99);
    await assertError(
      async () => await sale.timeout(),
      "EARLY_TIMEOUT",
      "wrongly timed out sale 1 block early"
    );
    await createEmptyBlock();
    assert((await sale.saleStatus()) === Status.PENDING);
    const txTimeout = await sale.timeout();
    // timeout should set status to Fail
    assert((await sale.saleStatus()) === Status.FAIL);
    const { sender: sender0 } = (await getEventArgs(
      txTimeout,
      "Timeout",
      sale
    )) as TimeoutEvent["args"];
    assert(sender0 === signers[0].address, "wrong sender in Timeout event");
    // Should have ended distribution via rTKN contract.
    // A simple way to tell is that the rTKN phase should have changed to FROZEN.
    const {
      sender: sender1,
      newPhase,
      scheduledTime,
    } = (await getEventArgs(
      txTimeout,
      "PhaseScheduled",
      token
    )) as PhaseScheduledEvent["args"];
    assert(
      sender1 === sale.address,
      "wrong sender for endDistribution call, expected sale address"
    );
    assert(newPhase.eq(Phase.FROZEN), "wrong token phase after timeout");
    assert(
      scheduledTime.eq(await getBlockTimestamp()),
      "expected scheduled time"
    );
    // Sale is now functionally in a Fail state
    // Cannot start, end or buy from sale
    await assertError(
      async () => await sale.start(),
      "NOT_PENDING",
      "wrongly started in Fail state"
    );
    await assertError(
      async () => await sale.end(),
      "NOT_ACTIVE",
      "wrongly ended in Fail state"
    );
    const fee = ethers.BigNumber.from("1").mul(RESERVE_ONE);
    const desiredUnits = totalTokenSupply;
    await assertError(
      async () => {
        await sale.buy({
          feeRecipient: feeRecipient.address,
          fee,
          minimumUnits: desiredUnits,
          desiredUnits,
          maximumPrice: staticPrice,
        });
      },
      "NOT_ACTIVE",
      "wrongly bought units when sale is in Fail state"
    );
  });
});
