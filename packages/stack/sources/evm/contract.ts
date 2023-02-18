import { ethers } from "../../deps.ts";
import { SupportedChains } from "../chains.ts";

export interface ContractSource {
  address: string;
  chains: [SupportedChains, ...SupportedChains[]];
  abi?: ethers.InterfaceAbi;
}

export class ContractSource {
  constructor(
    params: {
      address: string;
      chains: [SupportedChains, ...SupportedChains[]];
      abi?: ethers.InterfaceAbi;
    },
  ) {
    const { address, chains, abi } = params;
    this.address = address;
    this.chains = chains;
    this.abi = abi;
  }
}
