import { POCKETBASE_URL } from "../cli/constants.ts";
import { PocketBase, Record } from "@shared-deps";
import {
  EVMBlockSourceParsed,
  EVMContractCallSourceParsed,
  EVMEventLogSourceParsed,
} from "./source-types.ts";
import { SupportedChains } from "../stack/sources/chains.ts";

export class DataSourceManager {
  pb: PocketBase;
  eventLogSources: EVMEventLogSourceParsed[] = [];
  contractCallSources: EVMContractCallSourceParsed[] = [];
  blockSources: EVMBlockSourceParsed[] = [];

  constructor() {
    this.pb = new PocketBase(POCKETBASE_URL);
  }

  async init() {
    const adminEmail = Deno.env.get("POCKETBASE_ADMIN_EMAIL");
    const adminPassword = Deno.env.get("POCKETBASE_ADMIN_PASSWORD");

    if (!adminEmail || !adminPassword) {
      throw new Error("Missing PocketBase admin credentials");
    }

    await this.pb.admins.authWithPassword(adminEmail, adminPassword);
  }

  async getDependencies() {
    await Promise.all([
      this.getEventLogSources(),
      this.getContractCallSources(),
      this.getBlockSources(),
    ]);

    const eventLogDependencies = this.eventLogSources.reduce((acc, source) => {
      const { topic0, chains } = source;
      if (topic0) {
        // NOTE: Need to update this once more chains are supported
        const counts = acc.get(chains) || new Map<string, number>();
        const count = counts.get(topic0) || 0;
        counts.set(topic0, count + 1);

        acc.set(chains, counts);
      }
      return acc;
    }, new Map<SupportedChains, Map<string, number>>());

    const contractCallDependencies = this.contractCallSources.reduce(
      (acc, source) => {
        const { selector, chains } = source;
        // NOTE: Need to update this once more chains are supported
        const counts = acc.get(chains) || new Map<string, number>();
        const count = counts.get(selector) || 0;
        counts.set(selector, count + 1);
        acc.set(chains, counts);

        return acc;
      },
      new Map<SupportedChains, Map<string, number>>(),
    );

    const blockDependencies = this.blockSources.reduce((acc, source) => {
      const { chain } = source;
      const count = acc.get(chain) || 0;
      acc.set(chain, count + 1);
      return acc;
    }, new Map<SupportedChains, number>());

    return {
      eventLogDependencies,
      contractCallDependencies,
      blockDependencies,
    };
  }

  async getEventLogSources() {
    const eventLogSources = await this.pb.collection("evm_event_log_sources")
      .getFullList<EVMEventLogSourceParsed & Record>(200);
    for (
      const dataSource of eventLogSources
    ) {
      this.eventLogSources.push(dataSource);
    }
  }

  async getContractCallSources() {
    const contractCallSources = await this.pb.collection(
      "evm_contract_call_sources",
    ).getFullList<EVMContractCallSourceParsed & Record>(200);
    for (const dataSource of contractCallSources) {
      this.contractCallSources.push(dataSource);
    }
  }

  async getBlockSources() {
    const blockSources = await this.pb.collection("evm_block_sources")
      .getFullList<EVMBlockSourceParsed & Record>(200);
    for (
      const dataSource of blockSources
    ) {
      this.blockSources.push(dataSource);
    }
  }
}
