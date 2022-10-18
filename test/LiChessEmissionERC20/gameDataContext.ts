import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { concat, hexlify } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { LiChessEmissionsERC20Factory } from "../../typechain";
import { LiChessEmissionsERC20 } from "../../typechain/contracts/signedClaim/LiChessEmissionsERC20";
import {
  getEventArgs,
  memoryOperand,
  MemoryType,
  op,
  Opcode,
} from "../../utils";
let signers: SignerWithAddress[];
let creator: SignerWithAddress;
let liChainEmissionERC20: LiChessEmissionsERC20;
describe.only("LiChessERC20Emission Game data context test.", () => {
  before(async () => {
    signers = await ethers.getSigners();
    creator = signers[0];

    const integrityFactory = await ethers.getContractFactory(
      "StandardIntegrity"
    );
    const integrity = await integrityFactory.deploy();
    await integrity.deployed();

    const Factory = await ethers.getContractFactory(
      "LiChessEmissionsERC20Factory"
    );
    const factory = (await Factory.deploy(
      integrity.address
    )) as LiChessEmissionsERC20Factory;
    await factory.deployed();

    const emissionsERC20Config = {
      allowDelegatedClaims: true,
      erc20Config: {
        name: "Emissions",
        symbol: "EMS",
        distributor: signers[0].address,
        initialSupply: 0,
      },
      vmStateConfig: {
        sources: [
          concat([op(Opcode.STATE, memoryOperand(MemoryType.Constant, 0))]),
        ],
        constants: [0],
      },
    };

    const trx = await factory.createChildTyped(emissionsERC20Config);

    const [sender, child] = await getEventArgs(trx, "NewChild", factory);

    liChainEmissionERC20 = (await ethers.getContractAt(
      "LiChessEmissionsERC20",
      child
    )) as LiChessEmissionsERC20;
  });

  it("should deploy factory and child", async () => {
    expect(liChainEmissionERC20.address).to.not.null;
  });

  it("Should accept claim with gameData", async () => {
    await liChainEmissionERC20.claim(
      creator.address,
      {
        timeStamp: 12387371289,
        whiteAddress: signers[2].address,
        blackAddress: signers[3].address,
        whiteResult: 1,
        blackResult: 0,
        whiteElo: 100,
        blackElo: 120,
      },
      hexlify([...Buffer.from("")])
    );
  });
});
