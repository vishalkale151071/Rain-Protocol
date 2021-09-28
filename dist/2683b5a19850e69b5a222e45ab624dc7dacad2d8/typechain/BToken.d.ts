/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface BTokenInterface extends ethers.utils.Interface {
  functions: {
    "BONE()": FunctionFragment;
    "BPOW_PRECISION()": FunctionFragment;
    "EXIT_FEE()": FunctionFragment;
    "INIT_POOL_SUPPLY()": FunctionFragment;
    "MAX_BOUND_TOKENS()": FunctionFragment;
    "MAX_BPOW_BASE()": FunctionFragment;
    "MAX_FEE()": FunctionFragment;
    "MAX_IN_RATIO()": FunctionFragment;
    "MAX_OUT_RATIO()": FunctionFragment;
    "MAX_TOTAL_WEIGHT()": FunctionFragment;
    "MAX_WEIGHT()": FunctionFragment;
    "MIN_BALANCE()": FunctionFragment;
    "MIN_BOUND_TOKENS()": FunctionFragment;
    "MIN_BPOW_BASE()": FunctionFragment;
    "MIN_FEE()": FunctionFragment;
    "MIN_WEIGHT()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "getColor()": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "BONE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "BPOW_PRECISION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "EXIT_FEE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "INIT_POOL_SUPPLY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_BOUND_TOKENS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_BPOW_BASE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "MAX_FEE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "MAX_IN_RATIO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_OUT_RATIO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_TOTAL_WEIGHT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_WEIGHT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_BALANCE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_BOUND_TOKENS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_BPOW_BASE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "MIN_FEE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "MIN_WEIGHT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseApproval",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getColor", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "increaseApproval",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "BONE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "BPOW_PRECISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "EXIT_FEE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "INIT_POOL_SUPPLY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_BOUND_TOKENS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_BPOW_BASE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "MAX_FEE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "MAX_IN_RATIO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_OUT_RATIO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_TOTAL_WEIGHT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "MAX_WEIGHT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "MIN_BALANCE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_BOUND_TOKENS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_BPOW_BASE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "MIN_FEE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "MIN_WEIGHT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseApproval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getColor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseApproval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class BToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: BTokenInterface;

  functions: {
    BONE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "BONE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    BPOW_PRECISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    "BPOW_PRECISION()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    EXIT_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "EXIT_FEE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    INIT_POOL_SUPPLY(overrides?: CallOverrides): Promise<[BigNumber]>;

    "INIT_POOL_SUPPLY()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_BOUND_TOKENS(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_BPOW_BASE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_BPOW_BASE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_IN_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_IN_RATIO()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_OUT_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_OUT_RATIO()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_TOTAL_WEIGHT(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_TOTAL_WEIGHT()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_WEIGHT(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_WEIGHT()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MIN_BALANCE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MIN_BALANCE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MIN_BOUND_TOKENS(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MIN_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MIN_BPOW_BASE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MIN_BPOW_BASE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MIN_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MIN_WEIGHT(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MIN_WEIGHT()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    allowance(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "allowance(address,address)"(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "approve(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    balanceOf(whom: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    "balanceOf(address)"(
      whom: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    "decimals()"(overrides?: CallOverrides): Promise<[number]>;

    decreaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "decreaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getColor(overrides?: CallOverrides): Promise<[string]>;

    "getColor()"(overrides?: CallOverrides): Promise<[string]>;

    increaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "increaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    "name()"(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    "symbol()"(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    "totalSupply()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transfer(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferFrom(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferFrom(address,address,uint256)"(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  BONE(overrides?: CallOverrides): Promise<BigNumber>;

  "BONE()"(overrides?: CallOverrides): Promise<BigNumber>;

  BPOW_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

  "BPOW_PRECISION()"(overrides?: CallOverrides): Promise<BigNumber>;

  EXIT_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  "EXIT_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

  INIT_POOL_SUPPLY(overrides?: CallOverrides): Promise<BigNumber>;

  "INIT_POOL_SUPPLY()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_BOUND_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_BPOW_BASE(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_BPOW_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_IN_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_IN_RATIO()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_OUT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_OUT_RATIO()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_TOTAL_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_TOTAL_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

  MIN_BALANCE(overrides?: CallOverrides): Promise<BigNumber>;

  "MIN_BALANCE()"(overrides?: CallOverrides): Promise<BigNumber>;

  MIN_BOUND_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

  "MIN_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<BigNumber>;

  MIN_BPOW_BASE(overrides?: CallOverrides): Promise<BigNumber>;

  "MIN_BPOW_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

  MIN_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  "MIN_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

  MIN_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

  "MIN_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

  allowance(
    src: string,
    dst: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "allowance(address,address)"(
    src: string,
    dst: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "approve(address,uint256)"(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  balanceOf(whom: string, overrides?: CallOverrides): Promise<BigNumber>;

  "balanceOf(address)"(
    whom: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  "decimals()"(overrides?: CallOverrides): Promise<number>;

  decreaseApproval(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "decreaseApproval(address,uint256)"(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getColor(overrides?: CallOverrides): Promise<string>;

  "getColor()"(overrides?: CallOverrides): Promise<string>;

  increaseApproval(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "increaseApproval(address,uint256)"(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  "name()"(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  "symbol()"(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transfer(address,uint256)"(
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferFrom(
    src: string,
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferFrom(address,address,uint256)"(
    src: string,
    dst: string,
    amt: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    BONE(overrides?: CallOverrides): Promise<BigNumber>;

    "BONE()"(overrides?: CallOverrides): Promise<BigNumber>;

    BPOW_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    "BPOW_PRECISION()"(overrides?: CallOverrides): Promise<BigNumber>;

    EXIT_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "EXIT_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    INIT_POOL_SUPPLY(overrides?: CallOverrides): Promise<BigNumber>;

    "INIT_POOL_SUPPLY()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_BOUND_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_BPOW_BASE(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_BPOW_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_IN_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_IN_RATIO()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_OUT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_OUT_RATIO()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_TOTAL_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_TOTAL_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_BALANCE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_BALANCE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_BOUND_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_BPOW_BASE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_BPOW_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "approve(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(whom: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      whom: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    "decimals()"(overrides?: CallOverrides): Promise<number>;

    decreaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "decreaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getColor(overrides?: CallOverrides): Promise<string>;

    "getColor()"(overrides?: CallOverrides): Promise<string>;

    increaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "increaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    "name()"(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    "symbol()"(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transfer(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transferFrom(address,address,uint256)"(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    Approval(src: string | null, dst: string | null, amt: null): EventFilter;

    Transfer(src: string | null, dst: string | null, amt: null): EventFilter;
  };

  estimateGas: {
    BONE(overrides?: CallOverrides): Promise<BigNumber>;

    "BONE()"(overrides?: CallOverrides): Promise<BigNumber>;

    BPOW_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    "BPOW_PRECISION()"(overrides?: CallOverrides): Promise<BigNumber>;

    EXIT_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "EXIT_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    INIT_POOL_SUPPLY(overrides?: CallOverrides): Promise<BigNumber>;

    "INIT_POOL_SUPPLY()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_BOUND_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_BPOW_BASE(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_BPOW_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_IN_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_IN_RATIO()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_OUT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_OUT_RATIO()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_TOTAL_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_TOTAL_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_BALANCE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_BALANCE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_BOUND_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_BOUND_TOKENS()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_BPOW_BASE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_BPOW_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_WEIGHT()"(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "approve(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    balanceOf(whom: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      whom: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    "decimals()"(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "decreaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getColor(overrides?: CallOverrides): Promise<BigNumber>;

    "getColor()"(overrides?: CallOverrides): Promise<BigNumber>;

    increaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "increaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    "name()"(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    "symbol()"(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transfer(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferFrom(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferFrom(address,address,uint256)"(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BONE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "BONE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BPOW_PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "BPOW_PRECISION()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    EXIT_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "EXIT_FEE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INIT_POOL_SUPPLY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "INIT_POOL_SUPPLY()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MAX_BOUND_TOKENS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_BOUND_TOKENS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MAX_BPOW_BASE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_BPOW_BASE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_IN_RATIO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_IN_RATIO()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_OUT_RATIO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_OUT_RATIO()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_TOTAL_WEIGHT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_TOTAL_WEIGHT()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MAX_WEIGHT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_WEIGHT()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MIN_BALANCE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MIN_BALANCE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MIN_BOUND_TOKENS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MIN_BOUND_TOKENS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MIN_BPOW_BASE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MIN_BPOW_BASE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MIN_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MIN_WEIGHT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MIN_WEIGHT()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allowance(address,address)"(
      src: string,
      dst: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "approve(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      whom: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(address)"(
      whom: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "decimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "decreaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getColor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getColor()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increaseApproval(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "increaseApproval(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "name()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "symbol()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalSupply()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transfer(address,uint256)"(
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferFrom(address,address,uint256)"(
      src: string,
      dst: string,
      amt: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
