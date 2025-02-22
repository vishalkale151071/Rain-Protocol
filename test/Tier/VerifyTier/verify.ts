import { assert } from "chai";
import { hexlify } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type { Verify, VerifyTier } from "../../../typechain";
import { VerifyFactory } from "../../../typechain";
import * as Util from "../../../utils";
import { getBlockTimestamp } from "../../../utils";

describe("VerifyTier verify", async function () {
  let verifyFactory: VerifyFactory;

  before(async () => {
    const verifyFactoryFactory = await ethers.getContractFactory(
      "VerifyFactory"
    );
    verifyFactory = (await verifyFactoryFactory.deploy()) as VerifyFactory;
    await verifyFactory.deployed();
  });

  it("should correctly verify tier", async function () {
    const signers = await ethers.getSigners();
    const admin = signers[0];
    const verifier = signers[1];
    const signer1 = signers[2];
    const newAdmin = signers[3];

    const verify = (await Util.verifyDeploy(signers[0], verifyFactory, {
      admin: admin.address,
      callback: ethers.constants.AddressZero,
    })) as Verify;

    const verifyTier = (await Util.verifyTierDeploy(
      signers[0],
      verify.address
    )) as VerifyTier;

    await verify.grantRole(await verify.APPROVER_ADMIN(), newAdmin.address);
    await verify.grantRole(await verify.BANNER_ADMIN(), newAdmin.address);
    await verify.grantRole(await verify.REMOVER_ADMIN(), newAdmin.address);

    const verifyNewAdmin = verify.connect(newAdmin);
    await verifyNewAdmin.grantRole(
      await verifyNewAdmin.APPROVER(),
      verifier.address
    );
    await verifyNewAdmin.grantRole(
      await verifyNewAdmin.BANNER(),
      verifier.address
    );
    await verifyNewAdmin.grantRole(
      await verifyNewAdmin.REMOVER(),
      verifier.address
    );

    const tierReportNil = await verifyTier.report(signer1.address, []);
    assert(
      tierReportNil.eq(Util.max_uint256),
      "Nil status did not return max uint256"
    );

    const evidenceAdd = hexlify([...Buffer.from("Evidence for add")]);
    const evidenceApprove = hexlify([...Buffer.from("Evidence for approve")]);
    const evidenceBan = hexlify([...Buffer.from("Evidence for ban")]);
    const evidenceRemove = hexlify([...Buffer.from("Evidence for remove")]);

    // Add
    await verify.connect(signer1).add(evidenceAdd);
    const tierReportAdded = await verifyTier.report(signer1.address, []);
    assert(
      tierReportAdded.eq(Util.max_uint256),
      "Added status did not return max uint256"
    );

    // Approve
    await verify
      .connect(verifier)
      .approve([{ account: signer1.address, data: evidenceApprove }]);
    const timeApproved = await getBlockTimestamp();
    const tierReportApprovedActual = Util.zeroPad32(
      await verifyTier.report(signer1.address, [])
    );
    const tierReportApprovedExpected =
      "0x" +
      Util.zeroPad4(ethers.BigNumber.from(timeApproved)).slice(2).repeat(8);
    assert(
      tierReportApprovedActual === tierReportApprovedExpected,
      `Approved status did not return correct report
      expected  ${tierReportApprovedExpected}
      got       ${tierReportApprovedActual}`
    );

    // Ban
    await verify
      .connect(verifier)
      .ban([{ account: signer1.address, data: evidenceBan }]);
    const tierReportBanned = await verifyTier.report(signer1.address, []);
    assert(
      tierReportBanned.eq(Util.max_uint256),
      "Banned status did not return max uint256"
    );

    // Remove
    await verify
      .connect(verifier)
      .remove([{ account: signer1.address, data: evidenceRemove }]);
    const tierReportRemoved = await verifyTier.report(signer1.address, []);
    assert(
      tierReportRemoved.eq(Util.max_uint256),
      "Nil status (removed) did not return max uint256"
    );
  });
});
