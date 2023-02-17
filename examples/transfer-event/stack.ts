import { Ephemeral, EVMEventLogSource, Stack } from "../../mod.ts";

export default function main(stack: Stack) {
  const source = new EVMEventLogSource("Transfer", {
    contracts: [{
      address: "0x5C0401e81Bc07Ca70fAD469b451682c0d747Ef1c",
      chains: ["avalanche"],
    }],
  });

  const ephemeral = new Ephemeral({ name: "Transfers", source, fn: () => {} });

  stack.ephemeral(ephemeral);
}
