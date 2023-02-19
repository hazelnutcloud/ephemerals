export type SourceTypes = "evm_block" | "evm_event_log" | "evm_contract_call";

export abstract class EVMBaseSource {
  type: SourceTypes;

  constructor(type: SourceTypes) {
    this.type = type;
  }
}
