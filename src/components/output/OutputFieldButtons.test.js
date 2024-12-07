import { beforeAll, describe, expect, it } from "vitest";
import Machine from "../Machine";
import OutputFieldButtons from "./OutputFieldButtons";
import { Classname } from "../../utils/constant";
import OutputFieldText from "./OutputFieldText";
import { fireEvent, screen } from "@testing-library/dom";
import InputFieldText from "../input/InputFieldText";
import OutputFieldTextArea from "./OutputFieldTextArea";

describe("outputFields", () => {
  let machine;
  let version;
  let outputButtons;
  let inputText;
  let outputTextArea;

  beforeAll(() => {
    version = "one";
    machine = new Machine(version);
    machine.on();
    outputButtons = new OutputFieldButtons(machine.element, version);
    inputText = document.querySelector(
      `.${Classname.INPUT_FIELD_TEXT}.${version}`
    );
    outputTextArea = new OutputFieldTextArea(machine.element, version);
  });

  it("투입 테스트", () => {
    const outputText = document.querySelector(
      `.${Classname.OUTPUT_FIELD_TEXT}.${version}`
    );
    outputText.value = "2000원";
    outputButtons.handleInsertEvent(inputText, version);
  });

  it("반환 테스트", () => {});
});
