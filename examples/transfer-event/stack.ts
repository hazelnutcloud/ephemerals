import {
  ContractSource,
  Ephemeral,
  EventName,
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Stack,
  Topic,
} from "../../mod.ts";

export default function stacker(stack: Stack) {
  const usdc = new ContractSource(
    {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      chains: ["ethereum"],
    },
  );

  const eventSource = new EVMEventLogSource("Transfer" as EventName, {
    contractSources: [usdc],
  });

  const topicSource = new EVMEventLogSource("0x12345678" as Topic, {
    chains: ["ethereum"],
  });

  const callSource = new EVMContractCallSource("transfer", {
    contractSources: [usdc],
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
      name: "topicEphemeral",
      source: topicSource,
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
