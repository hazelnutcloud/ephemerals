import { fromFileUrl } from "../../deps.ts";
import {
  Ephemeral,
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Source,
  Stack,
} from "@stack";

export const parseStack = async (directory: string) => {
  const stackFile = new URL("./stack.ts", `file://${Deno.cwd()}/${directory}/`);
  const stacker = await import(fromFileUrl(stackFile));
  const stack = new Stack();
  await stacker.default(stack);

  return stack;
};

export const getEphemeralSourceType = (
  ephemeral: Ephemeral<Source>,
) => {
  switch (true) {
    case ephemeral.source instanceof EVMEventLogSource: {
      return "evm_event_log";
    }
    case ephemeral.source instanceof EVMContractCallSource: {
      return "evm_contract_call";
    }
    case ephemeral.source instanceof EVMBlockSource: {
      return "evm_block";
    }
    default: {
      throw new Error("Unknown ephemeral source type");
    }
  }
};
