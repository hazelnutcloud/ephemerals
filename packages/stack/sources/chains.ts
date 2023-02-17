export const supportedChains = {
  evm: [
    { id: "ethereum", scanner: new URL("https://etherscan.io") },
    { id: "avalanche", scanner: new URL("https://snowtrace.io") },
  ],
} as const;

export type SupportedChains = typeof supportedChains["evm"][number]["id"];
