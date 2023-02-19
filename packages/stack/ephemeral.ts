import { ethers } from "@shared-deps";
import {
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Source,
} from "./mod.ts";

export interface Ephemeral<T extends Source> {
  source: T;
  ephemeral: T extends EVMContractCallSource
    ? (context: { args: ethers.TransactionReceipt }) => void | Promise<void>
    : T extends EVMBlockSource
      ? (context: { block: ethers.Block }) => void | Promise<void>
    : T extends EVMEventLogSource
      ? (context: { event: ethers.EventLog }) => void | Promise<void>
    : never;
  name: string;
  await?: boolean;
}

export class Ephemeral<T extends Source> {
  constructor(
    params: Ephemeral<T>,
  ) {
    const { source, ephemeral, name, await: await_ } = params;
    this.source = source;
    this.ephemeral = ephemeral;
    this.name = name;
    this.await = await_;
  }
}
