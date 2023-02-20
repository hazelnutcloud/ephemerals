import {
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
} from "./evm/mod.ts";
export * from "./evm/mod.ts";
export * from "./abi.ts";
export * from "./chains.ts";

export type Source =
  | EVMContractCallSource
  | EVMEventLogSource
  | EVMBlockSource;
