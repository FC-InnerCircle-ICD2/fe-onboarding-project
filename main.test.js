import { expect, test } from "vitest";
import Machine from "./src/components/Machine";

test("machine test", () => {
  const machine = new Machine();
  machine.on();

  const machineId = document.querySelector(".machine");
  expect(machineId).not.toBeNull();
});
