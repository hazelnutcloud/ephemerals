import { EVMFeeder } from "./evm-feeder.ts";

if (import.meta.main) {
  new EVMFeeder().run();
}
