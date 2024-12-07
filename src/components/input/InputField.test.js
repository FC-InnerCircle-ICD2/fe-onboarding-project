import { expect, test } from "vitest";
import Machine from "../Machine";
import InputField from "./InputField";

test("inputField 생성 테스트", () => {
  const version = "inputField";
  const machine = new Machine(version);
  const inputField = new InputField(machine.element, version);

  expect(inputField.element).not.toBeNull();
});
