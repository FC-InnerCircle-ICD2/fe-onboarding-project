import { beforeAll, describe, expect } from "vitest";
import Machine from "../Machine";
import OutputFieldButton from "./OutputFieldButton";
import { Classname } from "../../utils/constant";

describe("inputField Button 생성 테스트", () => {
  let machine;
  let version;

  beforeAll(() => {
    version = "inputField";
    machine = new Machine(version);
  });

  it("투입 버튼 생성", () => {
    new OutputFieldButton(machine.element, version, "투입");
    expect(
      document.querySelector(`.${Classname.OUTPUT_FIELD_BUTTONS_BUTTON}.insert`)
        .innerText
    ).toEqual("투입");
  });

  it("반환 버튼 생성", () => {
    new OutputFieldButton(machine.element, version, "반환");
    expect(
      document.querySelector(`.${Classname.OUTPUT_FIELD_BUTTONS_BUTTON}.return`)
        .innerText
    ).toEqual("반환");
  });
});
