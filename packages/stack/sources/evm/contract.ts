import { ethers } from "../../deps.ts";
import { SupportedChains } from "../chains.ts";

export interface ContractSource {
  address: string;
  chains: [SupportedChains, ...SupportedChains[]];
  abi?: ethers.InterfaceAbi;
}

export class ContractSource<TAnonymous extends boolean = false> {
  constructor(
    params: {
      address: string;
      chains: [SupportedChains, ...SupportedChains[]];
      abi?: TAnonymous extends true ? never : ethers.InterfaceAbi;
    },
  ) {
    const { address, chains, abi } = params;
    this.address = address;
    this.chains = chains;
    this.abi = abi;
  }
}
