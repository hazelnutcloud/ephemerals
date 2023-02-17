import { ethers } from "../../deps.ts";
import { type SupportedChains } from "../chains.ts";
import { fetchAbi } from "../abi.ts";
import { Source } from "../interfaces.ts";

export interface EVMEventLogSource {
  name: string;
  abi?: ethers.InterfaceAbi;
  chainsToAddresses?: Map<SupportedChains, string[]>;
}

interface ArrayAtLeastOne<T> extends Array<T> {
  0: T;
}

type ContractSource = {
  address: string;
  chains: ArrayAtLeastOne<SupportedChains>;
  startBlock?: number;
};

type EVMEventLogSourceOptions =
  | {
    abi: ethers.InterfaceAbi;
    chains: ArrayAtLeastOne<SupportedChains>;
    contracts?: never;
  }
  | {
    abi: ethers.InterfaceAbi;
    chains?: never;
    contracts: ArrayAtLeastOne<ContractSource>;
  }
  | {
    abi?: ethers.InterfaceAbi;
    chains?: never;
    contracts: ArrayAtLeastOne<ContractSource>;
  } & {
    filters?: (string | string[])[];
  };

export class EVMEventLogSource implements Source {
  constructor(name: string, options: EVMEventLogSourceOptions) {
    this.name = name;

    const { abi, contracts, chains } = options;

    if (!abi) {
      if (!contracts) {
        throw new Error(
          "EVMEventLogSource requires an ABI or at least one contract address",
        );
      }
    } else {
      this.abi = abi;
    }

    if (contracts && chains) {
      throw new Error(
        "EVMEventLogSource cannot be constructed with both contracts and chains",
      );
    }

    if (contracts) {
      for (const { address, chains } of contracts) {
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
      chains = ["ethereum", "avalanche"];
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
