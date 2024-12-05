import { beforeAll, describe, it, expect } from "vitest";
import Machine from "../Machine";
import InputFieldButtons from "./InputFieldButtons";
import { Classname } from "../../utils/constant";
import { inputInfo } from "../../utils/inputInfo";
import { screen } from "@testing-library/dom";

describe("inputFieldButtons", () => {
  let machine;
  let version;

  beforeAll(() => {
    version = "one";
    machine = new Machine(version);
    new InputFieldButtons(machine.element, version);
  });

  it("버튼 그룹 생성 테스트", () => {
    const buttons = document.querySelector(`.${Classname.INPUT_FIELD_BUTTONS}`);
    expect(buttons).not.toBeNull();
  });

  it("버튼 요소 생성 테스트", () => {
    inputInfo.map((info) => {
      const button = screen.getAllByText(`${info.price}원`);
      expect(button).not.toBeNull();
    });
  });
});
