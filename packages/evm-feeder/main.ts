import { EVMFeeder } from "./evm-feeder.ts";

if (import.meta.main) {
  await new EVMFeeder().run();
}
