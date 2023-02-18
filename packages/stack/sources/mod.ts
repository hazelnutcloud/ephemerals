import {
  EventName,
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Topic,
} from "./evm/mod.ts";
export * from "./evm/mod.ts";

export type Source =
  | EVMContractCallSource
  | EVMEventLogSource<Topic>
  | EVMBlockSource
  | EVMEventLogSource<EventName>;
