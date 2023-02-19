import { ethers } from "@shared-deps";
import { SupportedChains } from "../chains.ts";

export interface EVMContractCallSource {
  name: string;
  addresses?: string[];
  chains: [SupportedChains, ...SupportedChains[]];
  senders?: string[];
  abi?: ethers.InterfaceAbi;
}

export class EVMContractCallSource {
  constructor(
    name: string,
    options: {
      addresses?: string[];
      chains: [SupportedChains, ...SupportedChains[]];
      senders?: string[];
      abi?: ethers.InterfaceAbi;
    },
  ) {
    const { addresses, chains, senders, abi } = options;
    this.name = name;
    this.addresses = addresses;
    this.chains = chains;
    this.senders = senders;
    this.abi = abi;
  }
}
