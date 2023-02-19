import { getPocketBaseClient } from "../utils.ts";
import { login } from "../login/mod.ts";
import {
  ClientResponseError,
  PocketBase,
  RecordListQueryParams,
  Spinner,
} from "../../deps.ts";
import { getEphemeralSourceType, parseStack } from "./stack-parser.ts";
import {
  EVMBlockSource,
  EVMContractCallSource,
  EVMEventLogSource,
  fetchAbi,
} from "@stack";
import { ethers } from "@shared-deps";

interface Stage {
  id: string;
  name: string;
  status: "updating" | "ready";
}

export const upload = async (
  params: {
    directory: string;
    pkgName: string;
    tempPath: string;
    stage: string;
    spinner: Spinner;
  },
) => {
  const { directory, pkgName, tempPath, stage, spinner } = params;
  const pb = getPocketBaseClient();

  if (!pb.authStore.isValid || !pb.authStore.model) {
    await login({}, pb);
  }

  // create stage record if it doesn't exist
  let stageRecord: Stage | undefined;
  try {
    stageRecord = await pb.collection("stages").getFirstListItem<
      Stage
    >(`name="${stage}"`);
  } catch (error) {
    if (error instanceof ClientResponseError) {
      if (error.status === 401) {
        await login({}, pb);
      } else if (error.status === 404) {
        stageRecord = undefined;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }

  if (!stageRecord) {
    const formData = new FormData();
    formData.append("name", stage);
    formData.append("status", "updating");
    formData.append("owner", pb.authStore.model!.id);
    const code = new File([
      await Deno.readFile(
        new URL(`./${pkgName}`, `file://${tempPath}/`),
      ),
    ], pkgName);
    formData.append("code", code, pkgName);
    spinner.text = "Creating stage...";
    stageRecord = await pb.collection("stages").create(formData);
  }

  // delete old ephemerals for this stage
  for await (
    const ephemeralRecord of collectionIterator(pb, "ephemerals", 10, {
      filter: `stage="${stageRecord!.id}"`,
    })
  ) {
    spinner.text = `Deleting old ephemerals...`;
    await pb.collection("ephemerals").delete(ephemeralRecord.id);
  }

  // create new ephemerals for this stage
  const stack = await parseStack(directory);
  for (const ephemeral of stack.getEphemerals()) {
    const sourceType = getEphemeralSourceType(ephemeral);

    spinner.text = `Creating ephemeral ${ephemeral.name}...`;
    const ephemeralRecord = await pb.collection("ephemerals").create({
      name: ephemeral.name,
      stage: stageRecord!.id,
      source_type: sourceType,
    });

    // create ephemeral source
    switch (sourceType) {
      case "evm_event_log": {
        let { name, abi, chains, filters, addresses } = ephemeral
          .source as EVMEventLogSource;

        // if no abi is given, try to fetch it
        if (!abi) {
          if (!addresses) {
            throw new Error(
              `No ABI supplied for EVMEventLogSource ${name}, pass in an address to automatically fetch from scanner websites.`,
            );
          }
          spinner.text = `Fetching ABI...`;
          abi = await fetchAbi(
            addresses,
            chains,
          );
        }

        const topic0 = new ethers.Interface(abi).getEvent(name)?.topicHash;
        if (!topic0) {
          throw new Error(
            `Could not find event ${name} in ABI`,
          );
        }

        const [topic1, topic2, topic3] = filters || [];

        await pb.collection(
          "evm_event_log_sources",
        ).create({
          abi,
          topic0,
          topic1,
          topic2,
          topic3,
          addresses,
          chains,
          ephemeral: ephemeralRecord.id,
        });
        break;
      }
      case "evm_contract_call": {
        let { chains, name, abi, addresses, senders } = ephemeral
          .source as EVMContractCallSource;

        // if no abi is given, try to fetch it
        if (!abi) {
          if (!addresses) {
            throw new Error(
              `No ABI supplied for EVMContractCallSource ${name}, pass in an address to automatically fetch from scanner websites.`,
            );
          }
          spinner.text = `Fetching ABI...`;
          abi = await fetchAbi(
            addresses,
            chains,
          );
        }

        const selector = new ethers.Interface(abi).getFunction(name)?.selector;
        if (!selector) {
          throw new Error(
            `Could not find function ${name} in ABI`,
          );
        }

        await pb.collection(
          "evm_contract_call_sources",
        ).create({
          abi,
          selector,
          addresses,
          chains,
          senders,
          ephemeral: ephemeralRecord.id,
        });

        break;
      }
      case "evm_block": {
        const { chain, interval } = ephemeral.source as EVMBlockSource;

        await pb.collection(
          "evm_block_sources",
        ).create({
          chain,
          interval,
          ephemeral: ephemeralRecord.id,
        });
      }
    }
  }
};

async function* collectionIterator(
  pb: PocketBase,
  collectionIdOrName: string,
  perPage: number,
  queryParams?: RecordListQueryParams,
) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    try {
      const res = await pb.collection(collectionIdOrName).getList(
        page,
        perPage,
        queryParams,
      );
      for (const item of res.items) {
        yield item;
      }
      hasMore = res.items.length > 0;
      page++;
    } catch (error) {
      throw error;
    }
  }
}
