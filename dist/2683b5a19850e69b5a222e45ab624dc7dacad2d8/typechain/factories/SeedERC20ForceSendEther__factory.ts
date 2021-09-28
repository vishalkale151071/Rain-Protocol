/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { SeedERC20ForceSendEther } from "../SeedERC20ForceSendEther";

export class SeedERC20ForceSendEther__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<SeedERC20ForceSendEther> {
    return super.deploy(overrides || {}) as Promise<SeedERC20ForceSendEther>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SeedERC20ForceSendEther {
    return super.attach(address) as SeedERC20ForceSendEther;
  }
  connect(signer: Signer): SeedERC20ForceSendEther__factory {
    return super.connect(signer) as SeedERC20ForceSendEther__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SeedERC20ForceSendEther {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SeedERC20ForceSendEther;
  }
}

const _abi = [
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "contract SeedERC20",
        name: "seedERC20Contract_",
        type: "address",
      },
    ],
    name: "destroy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b5060988061001e6000396000f3fe608060405260043610601e5760003560e01c8062f55d9d146026576024565b36602457005b005b348015603157600080fd5b50602460048036036020811015604657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff168080fffea2646970667358221220e5e6106862c7679a9a51b1c035df8217c2427913375e7faf59e02c07aa8298a664736f6c634300060c0033";
