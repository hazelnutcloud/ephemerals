import { ethers } from "@shared-deps";
import { type SupportedChains } from "../chains.ts";

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

export class EVMEventLogSource {
  constructor(
    name: string,
    options: EVMEventLogSourceOptions,
  ) {
    const { filters, chains, addresses, abi } = options;
    this.name = name;
    this.filters = filters;
    this.chains = chains;
    this.addresses = addresses;
    this.abi = abi;
  }
}
