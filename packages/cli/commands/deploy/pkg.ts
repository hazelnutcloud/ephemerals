import { join } from "../../deps.ts";

export const pkg = async (dir: string) => {
  const tempPath = await Deno.makeTempDir({ prefix: "ephemeral" });
  const fileName = crypto.randomUUID() + ".tar.gz";
  const out = join(tempPath, fileName);

  const process = Deno.run({
    cmd: ["tar", "-zcvf", out, "-C", dir, "."],
    stdout: "piped",
    stderr: "piped",
  });

  const [status, err] = await Promise.all([
    process.status(),
    process.stderrOutput(),
  ]);

  if (status.code !== 0) {
    const errMsg = `Failed to build package: ${new TextDecoder().decode(err)}`;
    throw new Error(errMsg);
  }

  process.close();

  return { fileName, tempPath };
};
