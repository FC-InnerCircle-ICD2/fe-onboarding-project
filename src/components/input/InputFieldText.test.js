import { expect, test } from "vitest";
import Machine from "../Machine";
import InputFieldText from "./InputFieldText";

test("inputFieldText 생성 및 초기화 테스트", () => {
  const version = "inputField";
  const machine = new Machine(version);
  const inputFieldText = new InputFieldText(machine.element, version);
  expect(inputFieldText.element.innerText).toEqual("0");
  expect(inputFieldText.element.dataset.value).toEqual("0");
});
