import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type {
  AllStandardOpsTest,
  StandardIntegrity,
} from "../../../../typechain";
import { createEmptyBlock } from "../../../../utils/hardhat";
import { AllStandardOps } from "../../../../utils/rainvm/ops/allStandardOps";
import { memoryOperand, MemoryType, op } from "../../../../utils/rainvm/vm";
import { assertError } from "../../../../utils/test/assertError";
import { NEVER } from "../../../../utils/tier";
import { Tier } from "../../../../utils/types/tier";

const Opcode = AllStandardOps;

/**
 * Generates operand for UPDATE_TIMES_FOR_TIER_RANGE by specifying the range of tiers to be updated. Equivalent to `Util.tierRange` without guards for testing `MAX_TIER` error.
 * @see /utils/tier/index.ts
 * @param startTier
 * @param endTier
 * @returns Tier range, for use as operand
 */
function tierRangeUnrestricted(startTier: number, endTier: number): number {
  //   op_.val & 0x0f, //     00001111
  //   op_.val & 0xf0, //     11110000
  let range = endTier;
  range <<= 4;
  range += startTier;
  return range;
}

describe("RainVM update tier range op", async function () {
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

  it("should enforce maxTier for update tier range operation", async () => {
    await createEmptyBlock(3);

    const block = await ethers.provider.getBlockNumber();

    const constants0 = [block, NEVER];

    const vBlock = op(Opcode.STATE, memoryOperand(MemoryType.Constant, 0));

    // prettier-ignore
    const source0 = concat([
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)),
        vBlock,
      op(
        Opcode.UPDATE_TIMES_FOR_TIER_RANGE,
        tierRangeUnrestricted(Tier.ZERO, 9) // beyond max tier of Tier.EIGHT
      ),
    ]);

    await logic.initialize({
      sources: [source0],
      constants: constants0,
    });

    await assertError(
      async () => await logic.run(),
      "MAX_TIER",
      "wrongly updated blocks with endTier of 9, which is greater than maxTier constant"
    );
  });
});
