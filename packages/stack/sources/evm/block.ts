import { SupportedChains } from "../chains.ts";
import { EVMBaseSource } from "./base.ts";

export interface EVMBlockSource {
  chain: SupportedChains;
  interval: number;
}

export class EVMBlockSource extends EVMBaseSource {
  constructor(
    params: {
      chain: SupportedChains;
      interval: number;
    },
  ) {
    super("evm_block");

    const { chain, interval } = params;

    this.chain = chain;
    this.interval = interval;
  }
}
