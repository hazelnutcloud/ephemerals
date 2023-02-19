import { Ephemeral, Source } from "./mod.ts";

type Distribute<T extends Source> = T extends unknown ? Ephemeral<T> : never;
export class Stack {
  private readonly _ephemerals: Distribute<Source>[] = [];

  ephemerals(
    ephemerals: Distribute<Source>[],
  ) {
    this._ephemerals.push(
      ...ephemerals,
    );
    return this;
  }

  getEphemerals() {
    return this._ephemerals;
  }
}
