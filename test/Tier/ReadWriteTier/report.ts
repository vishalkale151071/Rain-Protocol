import { assert } from "chai";
import { hexlify } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { max_uint256 } from "../../../utils/constants";
import { TIERS } from "../../../utils/constants/readWriteTier";
import { deployReadWriteTier } from "../../../utils/deploy/readWriteTier";
import { getBlockTimestamp } from "../../../utils/hardhat";
import { numArrayToReport, tierReport } from "../../../utils/tier";

describe("ReadWriteTier report", async function () {
  it("will return uninitialized report if nothing set", async function () {
    const [signers, readWriteTier] = await deployReadWriteTier();
    for (const signer of signers) {
      const status = await readWriteTier.report(signer.address, []);
      assert(ethers.BigNumber.from(max_uint256).eq(status));
    }
  });

  it("will return tier if set", async function () {
    const [signers, readWriteTier] = await deployReadWriteTier();
    const expected = tierReport(hexlify(max_uint256));
    let expectedReport = numArrayToReport(expected);
    let i = 0;
    for (const tier of TIERS) {
      if (tier) {
        await readWriteTier.setTier(signers[0].address, tier);
        expected[i] = await getBlockTimestamp();
        expectedReport = numArrayToReport(expected);
        i++;
      }
      const actualReport =
        "0x" +
        (await readWriteTier.report(signers[0].address, []))
          .toHexString()
          .substring(2)
          .padStart(64, "0");

      assert(
        expectedReport.eq(actualReport),
        `wrong report
        expected  ${expectedReport}
        got       ${actualReport}`
      );
    }
  });

  it("will be possible to know the previous tier from the current tier", async function () {
    const [signers, readWriteTier] = await deployReadWriteTier();
    // change the tier to one
    await readWriteTier.setTier(signers[0].address, 1);
    const previousTimestamp = await getBlockTimestamp();
    // change the tier to three
    await readWriteTier.setTier(signers[0].address, 3);
    // check with the contract
    const status = await readWriteTier.report(signers[0].address, []);
    const report = tierReport(status.toString());
    assert(report[0] === previousTimestamp);
  });
});
