export const supportedChains = {
  evm: [
    { id: "ethereum", scanner: new URL("https://etherscan.io") },
    { id: "arbitrum", scanner: new URL("https://arbiscan.io/") },
  ],
} as const;

export type SupportedChains = typeof supportedChains["evm"][number]["id"];
