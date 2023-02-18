import { Ephemeral, EventName, Source, Topic } from "./mod.ts";

type Distribute<T extends Source, U extends Topic | EventName> = T extends
  unknown ? Ephemeral<T, U> : never;
export class Stack {
  private readonly _ephemerals: Distribute<Source, Topic | EventName>[] = [];

  ephemerals(
    ephemerals: Distribute<Source, Topic | EventName>[],
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
