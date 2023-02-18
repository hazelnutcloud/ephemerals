export interface EVMBlockSource {
  chain: string;
  interval: number;
}

export class EVMBlockSource {
  constructor(
    params: {
      chain: string;
      interval: number;
    },
  ) {
    const { chain, interval } = params;
    this.chain = chain;
    this.interval = interval;
  }
}
