import { POCKETBASE_URL } from "../cli/constants.ts";
import { PocketBase, Record } from "@shared-deps";
import {
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
} from "@stack";
import { collectionIterator } from "../shared/collection-iterator.ts";

export class DataSourceManager {
  pb: PocketBase;
  eventLogSources: EVMEventLogSource[] = [];
  contractCallSources: EVMContractCallSource[] = [];
  blockSources: EVMBlockSource[] = [];

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

  async getDataSources() {
    await Promise.all([
      this.getEventLogSources(),
    ]);
    console.log(
      this.eventLogSources,
      this.contractCallSources,
      this.blockSources,
    );
  }

  async getEventLogSources() {
    for await (
      const dataSource of collectionIterator<EVMEventLogSource & Record>(
        this.pb,
        "evm_event_log_sources",
        100,
      )
    ) {
      this.eventLogSources.push(dataSource);
    }
  }

  async getContractCallSources() {
    for await (
      const dataSource of collectionIterator<EVMContractCallSource & Record>(
        this.pb,
        "evm_contract_call_sources",
        100,
      )
    ) {
      this.contractCallSources.push(dataSource);
    }
  }

  async getBlockSources() {
    for await (
      const dataSource of collectionIterator<EVMBlockSource & Record>(
        this.pb,
        "evm_block_sources",
        100,
      )
    ) {
      this.blockSources.push(dataSource);
    }
  }
}
