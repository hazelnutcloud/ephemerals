import { ethers } from "../../deps.ts";
import { ContractSource } from "./mod.ts";

export interface EVMContractCallSource {
  name: string;
  contractSources: [ContractSource, ...ContractSource[]];
  filter?: (args: ethers.Result) => boolean;
}

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
