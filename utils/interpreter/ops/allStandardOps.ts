import { camelize } from "../../format/camelize";
import { getAllStandardOpsEnum } from "./allStandardOpmeta";

export enum AllStandardOps {
  chainlinkPrice,
  call,
  context,
  contextRow,
  debug,
  doWhile,
  extern,
  foldContext,
  get,
  loopN,
  readMemory,
  set,
  hash,
  erc1155BalanceOf,
  erc1155BalanceOfBatch,
  erc20BalanceOf,
  erc20TotalSupply,
  erc20SnapshotBalanceOfAt,
  erc20SnapshotTotalSupplyAt,
  erc5313Owner,
  erc721BalanceOf,
  erc721OwnerOf,
  ensure,
  blockNumber,
  blockTimestamp,
  explode32,
  add,
  div,
  exp,
  max,
  min,
  mod,
  mul,
  sub,
  scale18,
  scale18Div,
  scale18Dynamic,
  scale18Mul,
  scaleBy,
  scaleN,
  any,
  eagerIf,
  equalTo,
  every,
  greaterThan,
  isZero,
  lessThan,
  saturatingAdd,
  saturatingMul,
  saturatingSub,
  iorderbookV1VaultBalance,
  isaleV2RemainingTokenInventory,
  isalev2Reserve,
  isaleV2SaleStatus,
  isaleV2Token,
  isaleV2TotalReserveReceived,
  iverifyV1AccountStatusAtTime,
  itierV2Report,
  itierV2ReportTimeForTier,
  saturatingDiff,
  selectLte,
  updateTimesForTierRange,
  length,
}

export const Opcode = AllStandardOps;

export const RainterpreterOps = AllStandardOps;

const verifyAllStandardOpsEnum = () => {
  const enumRaw: [string, number][] = Object.entries(getAllStandardOpsEnum());
  const enumCamelCase: [string, number][] = enumRaw.map((item) => [
    camelize(item[0]),
    item[1],
  ]);

  console.log({ enumCamelCase });

  // We want to preserve TypeScript enum, so we verify that it lines up with the autogenerated opmeta list.
  enumCamelCase.forEach((op, i_) => {
    if (op[0] !== AllStandardOps[op[1]]) {
      console.log(op[0], AllStandardOps[op[1]]);
      throw new Error(`AllStandardOps does not match autogenerated list
      expected  ${op[0]}
      got       ${AllStandardOps[op[1]]}`);
    }

    if (op[0] !== AllStandardOps[i_])
      throw new Error(`AllStandardOps does not match autogenerated list (missing opmeta file?)
      expected  ${op[0]}
      got       ${AllStandardOps[op[1]]}`);
  });
};

verifyAllStandardOpsEnum();
