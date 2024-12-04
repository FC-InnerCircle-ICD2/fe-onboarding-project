import { Classname } from "../../utils/constant.js";
import { numberFormatting } from "../../utils/numberFormatting.js";
import Element from "../common/Element.js";
import OutputFieldButton from "./OutputFieldButton.js";

export default class OutputFieldButtons extends Element {
  constructor(parent, version) {
    super("div", parent, Classname.OUTPUT_FIELD_BUTTONS, version);
    this.version = version;

    this.element.appendChild(
      new OutputFieldButton(this.element, version, "투입").element
    );
    this.element.appendChild(
      new OutputFieldButton(this.element, version, "반환").element
    );

    this.element.addEventListener("click", (e) => {
      const inputText = document.querySelector(
        `.inputField_inputText.${version}`
      );
      if (e.target.innerText === "투입") {
        this.handleInsertEvent(inputText, version);
      } else {
        this.handleReturnEvent(inputText, version);
      }
    });
  }

  changeOutputTextarea(version, value) {
    const outputTextarea = document.querySelector(
      `.${Classname.OUTPUT_FIELD_TEXTAREA}.${version}`
    );
    outputTextarea.innerHTML += value;
    outputTextarea.scrollTo({
      top: outputTextarea.scrollHeight,
      behavior: "smooth",
    });
  }

  handleInsertEvent(inputText, version) {
    const outputText = document.querySelector(
      `.${Classname.OUTPUT_FIELD_TEXT}.${version}`
    );
    if (outputText.value !== "0" && outputText.value !== "") {
      this.changeOutputTextarea(
        version,
        `${outputText.value}원이 투입되었습니다.<br />`
      );
      inputText.innerText = numberFormatting(
        Number(inputText.innerText.replaceAll(",", "")) +
          Number(outputText.value)
      );
      inputText.dataset.value =
        Number(inputText.dataset.value) + Number(outputText.value);
      outputText.value = "";
    }
  }

  handleReturnEvent(inputText, version) {
    if (inputText.innerText !== "0") {
      this.changeOutputTextarea(
        version,
        `${inputText.innerText.replaceAll(",", "")}원이 반환되었습니다.<br />`
      );
      inputText.innerText = "0";
      inputText.dataset.value = "0";
    }
  }
}
