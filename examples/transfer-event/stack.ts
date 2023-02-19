import {
  Ephemeral,
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Stack,
} from "https://raw.githubusercontent.com/hazelnutcloud/ephemerals/main/mod.ts";

export default function stacker(stack: Stack) {
  const eventSource = new EVMEventLogSource("Transfer", {
    addresses: ["0xdAC17F958D2ee523a2206206994597C13D831ec7"],
    chains: ["ethereum"],
  });

  const callSource = new EVMContractCallSource("approve", {
    addresses: ["0xdAC17F958D2ee523a2206206994597C13D831ec7"],
    chains: ["ethereum"],
  });

  const blockSource = new EVMBlockSource({
    chain: "ethereum",
    interval: 10,
  });

  stack.ephemerals([
    new Ephemeral({
      name: "transferEventEphemeral",
      source: eventSource,
      ephemeral: (context) => {},
    }),
    new Ephemeral({
      name: "blocksEphemeral",
      source: blockSource,
      ephemeral: (context) => {},
    }),
    new Ephemeral({
      name: "contractCallEphemeral",
      source: callSource,
      ephemeral: (context) => {},
    }),
  ]);
}
