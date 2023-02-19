import { ethers } from "@shared-deps";
import { type SupportedChains } from "../chains.ts";
import { EVMBaseSource } from "./base.ts";

export interface EVMEventLogSource {
  name: string;
  chains: [SupportedChains, ...SupportedChains[]];
  addresses?: string[];
  abi?: ethers.InterfaceAbi;
  filters?: (string | string[])[];
}

type EVMEventLogSourceOptions = {
  addresses?: string[];
  chains: [SupportedChains, ...SupportedChains[]];
  abi?: ethers.InterfaceAbi;
  filters?: (string | string[])[];
};

export class EVMEventLogSource extends EVMBaseSource {
  constructor(
    name: string,
    options: EVMEventLogSourceOptions,
  ) {
    super("evm_event_log");

    const { filters, chains, addresses, abi } = options;
    this.name = name;
    this.filters = filters;
    this.chains = chains;
    this.addresses = addresses;
    this.abi = abi;
  }
}
