import { assert } from "chai";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type {
  AllStandardOpsTest,
  StandardIntegrity,
} from "../../../../typechain";
import { AllStandardOps } from "../../../../utils/rainvm/ops/allStandardOps";
import { op } from "../../../../utils/rainvm/vm";
import { assertError } from "../../../../utils/test/assertError";

const Opcode = AllStandardOps;

// Contains tests for RainVM, the constant RainVM ops as well as Math ops via AllStandardOpsTest contract.
// For SaturatingMath library tests, see the associated test file at test/Math/SaturatingMath.sol.ts
describe("RainVM storage", async function () {
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

  it("should error when attempting to read stored value outside STORAGE opcode range", async () => {
    const constants = [];

    const storageOffset = (await logic.storageOpcodesRange())[0];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.STORAGE, storageOffset.add(3)),
    ])];

    await assertError(
      async () => await logic.initialize({ sources, constants }),
      "OOB_STORAGE_READ", // there is at least an error
      "should error when attempting to read stored value outside STORAGE opcode range"
    );
  });

  it("should support reading stored values via STORAGE opcode", async () => {
    const constants = [];

    const storageOffset = (await logic.storageOpcodesRange())[0];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.STORAGE, storageOffset.add(0)),
      op(Opcode.STORAGE, storageOffset.add(1)),
      op(Opcode.STORAGE, storageOffset.add(2)),
    ])];

    await logic.initialize({ sources, constants });

    await logic.run();

    const result = await logic.stack();
    const expected = [0, 1, 2];

    result.forEach((stackVal, index) => {
      assert(
        stackVal.eq(expected[index]),
        `did not support reading stored value via STORAGE opcode at index ${index}
        expected  ${expected[index]}
        got       ${stackVal}`
      );
    });
  });
});
