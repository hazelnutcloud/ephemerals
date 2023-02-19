import { ethers } from "@shared-deps";
import { SupportedChains } from "./chains.ts";

const abiStore = new Map<
  string,
  Record<SupportedChains, ethers.InterfaceAbi>
>();

export const fetchAbi = async (
  addresses: string[],
  chains: SupportedChains[],
): Promise<ethers.InterfaceAbi> => {
  let abi;
  for (const chain of chains) {
    for (const address of addresses) {
      // check if we've already fetched this abi
      if (abiStore.has(address)) {
        const abis = abiStore.get(address)!;
        const abiChains = Object.keys(abis) as SupportedChains[];
        if (chains.includes(abiChains[0])) {
          abi = abis[abiChains[0]];
          break;
        }
      }

      let fetchedAbi;
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${
            Deno.env.get("ETHERSCAN_API_KEY")
          }`,
        );
        const json = await response.json();
        if (json.status === "0") {
          throw new Error(json.result);
        }
        fetchedAbi = JSON.parse(json.result);
      } catch (error) {
        throw new Error(
          `Failed to fetch ABI for ${address} on ${chain}: ${error.message}`,
        );
      }
      if (fetchedAbi) {
        abi = fetchedAbi;
        abiStore.set(address, { [chain]: abi });
        break;
      }
    }
    if (abi) {
      break;
    }
  }
  return abi;
};
