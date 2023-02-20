import { ethers, Record } from "@shared-deps";
import { SupportedChains } from "@stack";

export interface EVMEventLogSourceParsed extends Record {
  abi: ethers.InterfaceAbi | null;
  addresses: string[] | null;
  chains: SupportedChains;
  ephemeral: string;
  topic0: string | null;
  topic1: string | null;
  topic2: string | null;
  topic3: string | null;
}

export interface EVMContractCallSourceParsed extends Record {
  abi: ethers.InterfaceAbi | null;
  addresses: string[] | null;
  chains: SupportedChains;
  ephemeral: string;
  senders: string[] | null;
  selector: string;
}

export interface EVMBlockSourceParsed extends Record {
  chain: SupportedChains;
  ephemeral: string;
  interval: number;
}
