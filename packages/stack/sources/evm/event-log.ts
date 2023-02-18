import { ethers } from "../../deps.ts";
import { type SupportedChains, supportedChains } from "../chains.ts";
import { fetchAbi } from "../abi.ts";
import { ContractSource } from "./mod.ts";

export interface EVMEventLogSource {
  name: string;
  abi?: ethers.InterfaceAbi;
  chainsToAddresses?: Map<SupportedChains, string[]>;
}

type EVMEventLogSourceOptions =
  & (
    | {
      abi: ethers.InterfaceAbi;
      chains: [SupportedChains, ...SupportedChains[]];
      contractSources?: never;
    }
    | {
      abi?: never;
      chains?: never;
      contractSources: [ContractSource, ...ContractSource[]];
    }
  )
  & {
    filters?: (string | string[])[];
  };

export class EVMEventLogSource {
  constructor(
    name: string,
    options: EVMEventLogSourceOptions,
  ) {
    this.name = name;

    const { abi, contractSources, chains } = options;

    if (!abi) {
      if (!contractSources) {
        throw new Error(
          "EVMEventLogSource requires an ABI or at least one contract address",
        );
      }
    } else {
      this.abi = abi;
    }

    if (contractSources && chains) {
      throw new Error(
        "EVMEventLogSource cannot be constructed with both contractSources and chains",
      );
    }

    if (contractSources) {
      for (const { address, chains } of contractSources) {
        this.fromContract(address, chains);
      }
    } else if (chains) {
      for (const chain of chains) {
        this.fromChain(chain);
      }
    }
  }

  fromChain(chain: SupportedChains) {
    if (!this.chainsToAddresses) {
      this.chainsToAddresses = new Map();
    }

    this.chainsToAddresses.set(chain, []);

    return this;
  }

  fromContract(
    address: string,
    chains?: SupportedChains[],
  ) {
    if (!this.chainsToAddresses) {
      this.chainsToAddresses = new Map();
    }

    if (!chains) {
      chains = supportedChains.evm.map((chain) => chain.id);
    }

    for (const chain of chains) {
      const addresses = this.chainsToAddresses.get(chain) || [];
      addresses.push(address);
      this.chainsToAddresses.set(chain, addresses);
    }

    return this;
  }

  async build() {
    let { abi } = this;

    if (!abi) {
      if (!this.chainsToAddresses) {
        throw new Error(
          "EVMEventLogSource requires an ABI or at least one contract address",
        );
      }
      for (const [chain, addresses] of this.chainsToAddresses) {
        for (const address of addresses) {
          const fetchedAbi = await fetchAbi(address, chain);
          if (fetchedAbi) {
            abi = fetchedAbi;
            break;
          }
        }
      }
    }

    if (!abi) {
      throw new Error("EVMEventLogSource could not fetch an ABI");
    }

    this.abi = abi;

    return;
  }
}
