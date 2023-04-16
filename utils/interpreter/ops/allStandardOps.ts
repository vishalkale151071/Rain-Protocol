import { getAllStandardOpsEnum } from "../../meta/op/allStandardOpMeta";

export enum AllStandardOps {
  decode_256,
  encode_256,
  explode_32,
  chainlink_price,

  context,
  context_column_hash,
  context_row,
  fold_context,

  call,
  debug,
  do_while,
  extern,
  loop_n,
  read_memory,
  hash,
  erc_1155_balance_of,
  erc_1155_balance_of_batch,
  erc_20_balance_of,
  erc_20_total_supply,
  erc_20_snapshot_balance_of_at,
  erc_20_snapshot_total_supply_at,
  erc_5313_owner,
  erc_721_balance_of,
  erc_721_owner_of,
  ensure,
  block_number,
  block_timestamp,
  add,
  div,
  exp,
  max,
  min,
  mod,
  mul,
  sub,
  scale_18,
  scale_18_dynamic,
  scale_n,
  any,
  eager_if,
  equal_to,
  every,
  greater_than,
  is_zero,
  less_than,
  prb_avg,
  prb_ceil,
  prb_div,
  prb_exp,
  prb_exp2,
  prb_floor,
  prb_frac,
  prb_gm,
  prb_inv,
  prb_ln,
  prb_log10,
  prb_log2,
  prb_mul,
  prb_pow,
  prb_powu,
  prb_sqrt,
  saturating_add,
  saturating_mul,
  saturating_sub,
  iorderbook_v1_vault_balance,
  isale_v2_remaining_token_inventory,
  isale_v2_reserve,
  isale_v2_sale_status,
  isale_v2_token,
  isale_v2_total_reserve_received,
  iverify_v1_account_status_at_time,

  // store
  get,
  set,

  itier_v2_report,
  itier_v2_report_time_for_tier,
  saturating_diff,
  select_lte,
  update_times_for_tier_range,
  length,
}

export const Opcode = AllStandardOps;

export const RainterpreterOps = AllStandardOps;

const validateAllStandardOpsEnum = () => {
  const opsEnum: [string, number][] = Object.entries(getAllStandardOpsEnum());

  // We want to preserve TypeScript enum, so we verify that it lines up with the autogenerated opmeta list.
  opsEnum.forEach((op) => {
    const standardOp = AllStandardOps[op[1]].replace(/_/g, "-");
    const opMetaName = op[0];

    if (opMetaName != standardOp) {
      throw new Error(`AllStandardOps and op meta do not match
      AllStandardOps name ${standardOp}
      op meta name        ${opMetaName}`);
    }
  });
};

validateAllStandardOpsEnum();
