import { ethers } from "./deps.ts";
import { Source } from "./mod.ts";

export interface Ephemeral {
  name: string;
  source: Source;
  fn: (context: { event: ethers.EventLog }) => void | Promise<void>;
  sequential: boolean;
}

export class Ephemeral {
  constructor(
    params: {
      name: string;
      source: Source;
      fn: (context: { event: ethers.EventLog }) => void | Promise<void>;
      sequential?: true;
    },
  ) {
    const { name, source, fn, sequential } = params;
    this.name = name;
    this.source = source;
    this.fn = fn;
    this.sequential = !!sequential;
  }
}
