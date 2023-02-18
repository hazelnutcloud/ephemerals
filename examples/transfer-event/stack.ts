import {
  ContractSource,
  Ephemeral,
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  Stack,
} from "../../mod.ts";

export default function stacker(stack: Stack) {
  const usdc = new ContractSource(
    {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      chains: ["ethereum"],
    },
  );

  const eventSource = new EVMEventLogSource("Transfer", {
    contractSources: [usdc],
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
