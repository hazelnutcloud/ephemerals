import { ethers } from "../../deps.ts";
import { type SupportedChains } from "../chains.ts";
import { ContractSource } from "./mod.ts";

export interface EVMEventLogSource<T extends Topic | EventName> {
  nameOrTopic: string;
  chains?: [SupportedChains, ...SupportedChains[]];
  contractSources?: [ContractSource, ...ContractSource[]];
}

type Brand<K, T> = K & { __brand: T };
export type Topic = Brand<string, "Topic">;
export type EventName = Brand<string, "EventName">;

type EVMEventLogSourceOptions<T extends Topic | EventName> =
  & (T extends Topic ? ({
      chains: [SupportedChains, ...SupportedChains[]];
      contractSources?: never;
    } | {
      contractSources: [ContractSource<true>, ...ContractSource<true>[]];
      chains?: never;
    })
    : ({
      contractSources: [ContractSource, ...ContractSource[]];
      chains?: never;
      abi?: never;
    } | {
      contractSources?: never;
      chains: [SupportedChains, ...SupportedChains[]];
      abi: ethers.InterfaceAbi;
    }))
  & {
    filters?: (string | string[])[];
  };

export class EVMEventLogSource<T extends Topic | EventName> {
  constructor(
    identifier: T,
    options: EVMEventLogSourceOptions<T>,
  ) {
    const { filters } = options;
  }
}
