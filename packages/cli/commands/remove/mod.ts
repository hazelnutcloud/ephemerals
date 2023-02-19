import { wait } from "../../deps.ts";
import { login } from "../login/mod.ts";
import { getPocketBaseClient } from "../utils.ts";

export const action = async (_: void, stage: string) => {
  const spinner = wait("Deleting...").start();

  try {
    // delete package
    const pb = getPocketBaseClient();
    if (!pb.authStore.isValid && !pb.authStore.model) {
      await login({}, pb);
    }

    const stageRecord = await pb.collection("stages").getFirstListItem(
      `name="${stage}" && owner.id="${pb.authStore.model!.id}"`,
    );

    await pb.collection("stages").delete(stageRecord.id);

    spinner.succeed("Deleted successfully!");
  } catch (error) {
    spinner.fail("Deletion failed: " + error.message);
    console.error(error);
  }

  Deno.exit();
};
