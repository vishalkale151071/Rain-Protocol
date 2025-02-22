import { assert } from "chai";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type {
  AllStandardOpsTest,
  StandardIntegrity,
} from "../../../../typechain";
import { getBlockTimestamp } from "../../../../utils/hardhat";
import { AllStandardOps } from "../../../../utils/rainvm/ops/allStandardOps";
import { op } from "../../../../utils/rainvm/vm";

const Opcode = AllStandardOps;

describe("RainVM EVM constant ops", async () => {
  let integrity: StandardIntegrity;
  let logic: AllStandardOpsTest;

  before(async () => {
    const integrityFactory = await ethers.getContractFactory(
      "StandardIntegrity"
    );
    integrity = (await integrityFactory.deploy()) as StandardIntegrity;
    await integrity.deployed();

    const logicFactory = await ethers.getContractFactory("AllStandardOpsTest");
    logic = (await logicFactory.deploy(
      integrity.address
    )) as AllStandardOpsTest;
  });

  it("should return `this` contract address", async () => {
    const constants = [];

    const source = concat([
      // (THIS_ADDRESS)
      op(Opcode.THIS_ADDRESS),
    ]);

    await logic.initialize({
      sources: [source],
      constants,
    });

    await logic.run();
    const result = await logic.stackTop();

    assert(
      result.eq(logic.address),
      `wrong this address
      expected  ${logic.address}
      got       ${result}`
    );
  });

  it("should return caller/sender", async () => {
    const signers = await ethers.getSigners();

    const alice = signers[1];

    const constants = [];

    const source = concat([
      // (SENDER)
      op(Opcode.SENDER),
    ]);

    await logic.initialize({
      sources: [source],
      constants,
    });

    await logic.connect(alice).run();
    const result = await logic.stackTop();

    assert(
      result.eq(alice.address),
      `wrong sender
      expected  ${alice.address}
      got       ${result}`
    );
  });

  it("should return block.timestamp", async () => {
    const constants = [];

    const source = concat([
      // (BLOCK_TIMESTAMP)
      op(Opcode.BLOCK_TIMESTAMP),
    ]);

    await logic.initialize({
      sources: [source],
      constants,
    });

    await logic.run();
    const timestamp = await getBlockTimestamp();
    const result = await logic.stackTop();

    assert(
      result.eq(timestamp),
      `expected timestamp ${timestamp} got ${result}`
    );
  });

  it("should return block.number", async () => {
    const constants = [];

    const source = concat([
      // (BLOCK_NUMBER)
      op(Opcode.BLOCK_NUMBER),
    ]);

    await logic.initialize({ sources: [source], constants });

    await logic.run();
    const block = await ethers.provider.getBlockNumber();
    const result = await logic.stackTop();
    assert(result.eq(block), `expected block ${block} got ${result}`);
  });
});
