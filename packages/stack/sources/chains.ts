export const supportedChains = {
  evm: [
    { id: "ethereum", scanner: new URL("https://etherscan.io") },
  ],
} as const;

export type SupportedChains = typeof supportedChains["evm"][number]["id"];
