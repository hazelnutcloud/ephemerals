import { wait } from "../../deps.ts";
import { cleanup } from "./cleanup.ts";
import { pkg } from "./pkg.ts";
import { upload } from "./upload.ts";

export const action = async (
  _: void,
  directory: string,
  stage = "main",
) => {
  const spinner = wait("Packaging...").start();

  try {
    // package directory
    const { fileName, tempPath } = await pkg(directory);

    spinner.text = "Uploading package...";
    // upload package
    await upload({ directory, pkgName: fileName, tempPath, stage, spinner });

    spinner.text = "Cleaning up...";
    // cleanup
    await cleanup(tempPath);

    spinner.succeed("Deployed successfully!");
  } catch (error) {
    spinner.fail("Deployment failed: " + error.message);
    console.error(error);
  }

  Deno.exit();
};
