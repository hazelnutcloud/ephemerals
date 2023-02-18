import { ethers } from "./deps.ts";
import {
  EventName,
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Source,
  Topic,
} from "./mod.ts";

export interface Ephemeral<T extends Source, U extends EventName | Topic> {
  source: T extends EVMEventLogSource<U> ? EVMEventLogSource<U> : T;
  ephemeral: T extends EVMContractCallSource
    ? (context: { args: ethers.TransactionReceipt }) => void | Promise<void>
    : T extends EVMBlockSource
      ? (context: { block: ethers.Block }) => void | Promise<void>
    : T extends EVMEventLogSource<U>
      ? U extends EventName
        ? (context: { event: ethers.EventLog }) => void | Promise<void>
      : U extends Topic ? (context: { log: ethers.Log }) => void | Promise<void>
      : never
    : never;
  name: string;
  await?: boolean;
}

export class Ephemeral<T extends Source, U extends EventName | Topic> {
  constructor(
    params: Ephemeral<T, U>,
  ) {
    const { source, ephemeral, name, await: await_ } = params;
    this.source = source;
    this.ephemeral = ephemeral;
    this.name = name;
    this.await = await_;
  }
}
