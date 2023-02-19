import { SupportedChains } from "../chains.ts";

export interface EVMBlockSource {
  chain: SupportedChains;
  interval: number;
}

export class EVMBlockSource {
  constructor(
    params: {
      chain: SupportedChains;
      interval: number;
    },
  ) {
    const { chain, interval } = params;
    this.chain = chain;
    this.interval = interval;
  }
}
