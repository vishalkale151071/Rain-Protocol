/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { NeverTier } from "../NeverTier";

export class NeverTier__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<NeverTier> {
    return super.deploy(overrides || {}) as Promise<NeverTier>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NeverTier {
    return super.attach(address) as NeverTier;
  }
  connect(signer: Signer): NeverTier__factory {
    return super.connect(signer) as NeverTier__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NeverTier {
    return new Contract(address, _abi, signerOrProvider) as NeverTier;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "enum ITier.Tier",
        name: "startTier",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "enum ITier.Tier",
        name: "endTier",
        type: "uint8",
      },
    ],
    name: "TierChange",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "report",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "enum ITier.Tier",
        name: "",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "setTier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061020f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806352dab69d1461003b578063e053ea3114610108575b600080fd5b6101066004803603606081101561005157600080fd5b73ffffffffffffffffffffffffffffffffffffffff8235169160ff6020820135169181019060608101604082013564010000000081111561009157600080fd5b8201836020820111156100a357600080fd5b803590602001918460018302840111640100000000831117156100c557600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061014d945050505050565b005b61013b6004803603602081101561011e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166101b4565b60408051918252519081900360200190f35b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f5345545f54494552000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9056fea264697066735822122067a2950bc1a50a4048a5b18484091a9eed4bf0e67a12b9dfd740cce5e68ecb1864736f6c634300060c0033";
