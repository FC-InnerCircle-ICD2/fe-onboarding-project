import { beforeAll, describe, it, expect, beforeEach } from "vitest";
import Machine from "../Machine";
import InputFieldButtons from "./InputFieldButtons";
import { Classname } from "../../utils/constant";
import { fireEvent, screen } from "@testing-library/dom";
import OutputFieldTextArea from "../output/OutputFieldTextArea";

describe("inputFieldButtons", () => {
  let machine;
  let version;

  beforeAll(() => {
    version = "one";
    machine = new Machine(version);
  });

  it("버튼 생성 테스트", () => {
    new InputFieldButtons(machine.element, version);
    const buttons = document.querySelector(`.${Classname.INPUT_FIELD_BUTTONS}`);
    expect(buttons).not.toBeNull();
  });

  beforeEach(() => {
    new OutputFieldTextArea(machine.element, version);
  });

  it("버튼 투입 이벤트", () => {
    const insert = screen.getByText("2500원");
    fireEvent.click(insert);
  });
});
