import { fromFileUrl } from "../../deps.ts";
import { Stack } from "@stack";

export const parseStack = async (directory: string) => {
  const stackFile = new URL("./stack.ts", `file://${Deno.cwd()}/${directory}/`);
  const stacker = await import(fromFileUrl(stackFile));
  const stack = new Stack();
  await stacker.default(stack);

  return stack;
};
