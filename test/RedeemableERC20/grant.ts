import { assert } from "chai";
import { ethers } from "hardhat";
import type { ReadWriteTier } from "../../typechain";
import type { RedeemableERC20 } from "../../typechain";
import type { ReserveToken } from "../../typechain";
import * as Util from "../../utils";
import { Tier } from "../../utils";

describe("RedeemableERC20 grant test", async function () {
  it("should grant alice sender then receiver and remain as both", async function () {
    const signers = await ethers.getSigners();

    const owner = signers[0];
    const alice = signers[1];

    const erc20PulleeFactory = await ethers.getContractFactory(
      "ERC20PulleeTest"
    );
    const erc20Pullee = await erc20PulleeFactory.deploy();
    await erc20Pullee.deployed();

    // Constructing the RedeemableERC20 sets the parameters but nothing stateful happens.

    const tierFactory = await ethers.getContractFactory("ReadWriteTier");
    const tier = (await tierFactory.deploy()) as ReadWriteTier;
    const minimumTier = Tier.ONE;

    const totalSupply = ethers.BigNumber.from("5000" + Util.eighteenZeros);
    const redeemableERC20Config = {
      name: "RedeemableERC20",
      symbol: "RDX",
      distributor: erc20Pullee.address,
      initialSupply: totalSupply,
    };

    const reserve = (await Util.basicDeploy(
      "ReserveToken",
      {}
    )) as ReserveToken;

    const token = (await Util.redeemableERC20Deploy(owner, {
      reserve: reserve.address,
      erc20Config: redeemableERC20Config,
      tier: tier.address,
      minimumTier,
      distributionEndForwardingAddress: ethers.constants.AddressZero,
    })) as RedeemableERC20;

    await erc20Pullee.grantSender(token.address, alice.address);

    assert(await token.isSender(alice.address));
    assert(!(await token.isReceiver(alice.address)));

    await erc20Pullee.grantReceiver(token.address, alice.address);

    assert(await token.isReceiver(alice.address));
    assert(await token.isSender(alice.address));
  });

  it("should grant alice receiver then sender and remain as both", async function () {
    const signers = await ethers.getSigners();

    const owner = signers[0];
    const alice = signers[1];

    const erc20PulleeFactory = await ethers.getContractFactory(
      "ERC20PulleeTest"
    );
    const erc20Pullee = await erc20PulleeFactory.deploy();
    await erc20Pullee.deployed();

    // Constructing the RedeemableERC20 sets the parameters but nothing stateful happens.

    const tierFactory = await ethers.getContractFactory("ReadWriteTier");
    const tier = (await tierFactory.deploy()) as ReadWriteTier;
    const minimumTier = Tier.ONE;

    const totalSupply = ethers.BigNumber.from("5000" + Util.eighteenZeros);
    const redeemableERC20Config = {
      name: "RedeemableERC20",
      symbol: "RDX",
      distributor: erc20Pullee.address,
      initialSupply: totalSupply,
    };

    const reserve = (await Util.basicDeploy(
      "ReserveToken",
      {}
    )) as ReserveToken;

    const token = (await Util.redeemableERC20Deploy(owner, {
      reserve: reserve.address,
      erc20Config: redeemableERC20Config,
      tier: tier.address,
      minimumTier,
      distributionEndForwardingAddress: ethers.constants.AddressZero,
    })) as RedeemableERC20;

    await erc20Pullee.grantReceiver(token.address, alice.address);

    assert(await token.isReceiver(alice.address));
    assert(!(await token.isSender(alice.address)));

    await erc20Pullee.grantSender(token.address, alice.address);

    assert(await token.isReceiver(alice.address));
    assert(await token.isSender(alice.address));
  });

  it("should allow admin to grant sender/receiver roles, and burn undistributed tokens, bypassing BlockBlockable restrictions", async function () {
    const TEN_TOKENS = ethers.BigNumber.from("10" + Util.eighteenZeros);

    const signers = await ethers.getSigners();

    const erc20PulleeFactory = await ethers.getContractFactory(
      "ERC20PulleeTest"
    );
    const erc20Pullee = await erc20PulleeFactory.deploy();
    await erc20Pullee.deployed();

    const owner = signers[0];
    const alice = signers[1];
    const bob = signers[2];

    // Constructing the RedeemableERC20 sets the parameters but nothing stateful happens.

    const tierFactory = await ethers.getContractFactory("ReadWriteTier");
    const tier = (await tierFactory.deploy()) as ReadWriteTier;
    const minimumTier = Tier.FOUR;

    await tier.setTier(alice.address, Tier.ONE);
    await tier.setTier(bob.address, Tier.ONE);

    const totalSupply = ethers.BigNumber.from("5000" + Util.eighteenZeros);
    const redeemableERC20Config = {
      name: "RedeemableERC20",
      symbol: "RDX",
      distributor: erc20Pullee.address,
      initialSupply: totalSupply,
    };

    const reserve = (await Util.basicDeploy(
      "ReserveToken",
      {}
    )) as ReserveToken;

    const token = (await Util.redeemableERC20Deploy(owner, {
      reserve: reserve.address,
      erc20Config: redeemableERC20Config,
      tier: tier.address,
      minimumTier,
      distributionEndForwardingAddress: ethers.constants.AddressZero,
    })) as RedeemableERC20;

    // alice tries to transfer to bob
    await Util.assertError(
      async () => await token.connect(alice).transfer(bob.address, 1),
      "2SPOKE", // token sender must be a 'receiver'
      "alice/bob sent/received tokens despite alice not being a 'receiver'"
    );

    // remove transfer restrictions for sender and receiver
    await erc20Pullee.grantSender(token.address, alice.address);
    assert(await token.isSender(alice.address), "sender status was wrong");

    await erc20Pullee.grantReceiver(token.address, bob.address);
    assert(await token.isReceiver(bob.address), "receiver status was wrong");

    // sender needs tokens (actually needs permission to receive these tokens anyway)
    await erc20Pullee.grantReceiver(token.address, alice.address);
    assert(
      await token.isReceiver(alice.address),
      "alice did not also become receiver"
    );
    assert(
      await token.isSender(alice.address),
      "alice did not remain sender after also becoming receiver"
    );

    // give some tokens
    await erc20Pullee.transfer(token.address, alice.address, TEN_TOKENS);

    // should work now
    await token.connect(alice).transfer(bob.address, 1);

    await erc20Pullee.endDistribution(token.address, Util.oneAddress);

    // alice and bob should be unrestricted in phase 1
    await token.connect(alice).transfer(bob.address, 1);
  });
});
