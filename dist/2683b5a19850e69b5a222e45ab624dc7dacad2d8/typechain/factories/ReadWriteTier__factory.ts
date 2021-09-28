/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ReadWriteTier } from "../ReadWriteTier";

export class ReadWriteTier__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<ReadWriteTier> {
    return super.deploy(overrides || {}) as Promise<ReadWriteTier>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ReadWriteTier {
    return super.attach(address) as ReadWriteTier;
  }
  connect(signer: Signer): ReadWriteTier__factory {
    return super.connect(signer) as ReadWriteTier__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReadWriteTier {
    return new Contract(address, _abi, signerOrProvider) as ReadWriteTier;
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
        name: "account_",
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
    ],
    name: "reports",
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
        name: "account_",
        type: "address",
      },
      {
        internalType: "enum ITier.Tier",
        name: "endTier_",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "data_",
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
  "0x608060405234801561001057600080fd5b506104b2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063252210e31461004657806352dab69d1461008b578063e053ea3114610158575b600080fd5b6100796004803603602081101561005c57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661018b565b60408051918252519081900360200190f35b610156600480360360608110156100a157600080fd5b73ffffffffffffffffffffffffffffffffffffffff8235169160ff602082013516918101906060810160408201356401000000008111156100e157600080fd5b8201836020820111156100f357600080fd5b8035906020019184600183028401116401000000008311171561011557600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061019d945050505050565b005b6100796004803603602081101561016e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166102d1565b60006020819052908152604090205481565b60008260088111156101ab57fe5b141561021857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f5345545f5a45524f5f5449455200000000000000000000000000000000000000604482015290519081900360640190fd5b6000610223846102d1565b90506000610231824361034e565b905061023f8282864361039b565b73ffffffffffffffffffffffffffffffffffffffff861660009081526020819052604090205583600881111561027157fe5b81600881111561027d57fe5b60405173ffffffffffffffffffffffffffffffffffffffff8816907fc47100edc32c382b56a1def2d144f6ab67d8f50be6efa18b329d2e82ee875db290600090a46102ca858286866103de565b5050505050565b73ffffffffffffffffffffffffffffffffffffffff8116600090815260208190526040812054610321577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610348565b73ffffffffffffffffffffffffffffffffffffffff82166000908152602081905260409020545b92915050565b6000805b6008811015610391578263ffffffff168160200285901c63ffffffff1611156103895780600881111561038157fe5b915050610348565b600101610352565b5060089392505050565b60008360088111156103a957fe5b8360088111156103b557fe5b106103cb576103c6858585856103e4565b6103d5565b6103d58584610436565b95945050505050565b50505050565b60008060008560088111156103f557fe5b90505b84600881111561040457fe5b81101561042b5763ffffffff6020820290811b199790971684881b179691506001016103f8565b509495945050505050565b60008082600881111561044557fe5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60209190910290811c901b84179150509291505056fea26469706673582212204c9bf30ec50e9838a490ed3c97e4d4d8a96b0ce1e178ef56c8c83b4bc7e6136f64736f6c634300060c0033";
