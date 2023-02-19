import { wait } from "../../deps.ts";
import { getPocketBaseClient } from "../utils.ts";

export const action = () => {
  const pb = getPocketBaseClient();

  const spinner = wait("Logging out...").start();

  pb.authStore.clear();

  spinner.succeed("Logged out successfully!");
};
