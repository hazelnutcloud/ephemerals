import { Ephemeral } from "./mod.ts";

export abstract class Stack {
  public readonly ephemerals: Ephemeral[] = [];
  ephemeral(ephemeral: Ephemeral) {
    this.ephemerals.push(ephemeral);
    return this;
  }
}
