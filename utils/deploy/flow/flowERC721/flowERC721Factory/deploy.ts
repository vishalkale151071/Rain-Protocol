import { ethers } from "hardhat";
import { FlowERC721Factory } from "../../../../../typechain/contracts/flow/erc721/FlowERC721Factory";
import { getRainContractMetaBytes } from "../../../../meta";

export const flowERC721FactoryDeploy = async () => {
  const flowFactoryFactory = await ethers.getContractFactory(
    "FlowERC721Factory",
    {}
  );
  const flowFactory = (await flowFactoryFactory.deploy(
    getRainContractMetaBytes("flow721")
  )) as FlowERC721Factory;
  await flowFactory.deployed();
  return flowFactory;
};
