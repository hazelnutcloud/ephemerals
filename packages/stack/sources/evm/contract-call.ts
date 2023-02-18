import { ethers } from "../../deps.ts";
import { SupportedChains } from "../chains.ts";
import { ContractSource } from "./mod.ts";

export interface EVMContractCallSource {
  name: string;
  contractSources: [ContractSource, ...ContractSource[]];
  filter?: (args: ethers.Result) => boolean;
}

type EVMContractCallSourceOptions =
  & (
    {
      selector: string;
      name?: never;
      chains: [SupportedChains, ...SupportedChains[]];
      contractSources?: never;
    } | {
      selector: string;
      name?: never;
      contractSources: [ContractSource, ...ContractSource[]];
      chains?: never;
    } | {
      name: string;
      selector?: never;
      contractSources: [ContractSource, ...ContractSource[]];
      chains?: never;
      abi?: never;
    } | {
      name: string;
      selector?: never;
      contractSources?: never;
      chains: [SupportedChains, ...SupportedChains[]];
      abi: ethers.InterfaceAbi;
    }
  )
  & {
    filters?: (string | string[])[];
  };

export class EVMContractCallSource {
  constructor(
    name: string,
    options: {
      contractSources: [ContractSource, ...ContractSource[]];
      filter?: (args: ethers.Result) => boolean;
    },
  ) {
    this.name = name;
    this.contractSources = options.contractSources;
    this.filter = options.filter;
  }
}
