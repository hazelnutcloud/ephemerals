import "https://deno.land/std@0.177.0/dotenv/load.ts";
import { DataSourceManager } from "./data-source-manager.ts";

export class EVMFeeder {
  dataSourceManager: DataSourceManager;

  constructor() {
    this.dataSourceManager = new DataSourceManager();
  }

  async run() {
    await this.dataSourceManager.init();
    this.dataSourceManager.getDataSources();
  }
}
