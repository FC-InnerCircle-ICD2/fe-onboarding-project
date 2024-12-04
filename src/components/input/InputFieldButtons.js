import { Classname } from "../../utils/constant.js";
import { inputInfo } from "../../utils/inputInfo.js";
import { numberFormatting } from "../../utils/numberFormatting.js";
import Element from "../common/Element.js";
import InputFieldButton from "./InputFieldButton.js";

export default class InputFieldButtons extends Element {
  constructor(parent, version) {
    super("div", parent, Classname.INPUT_FIELD_BUTTONS, version);

    inputInfo.forEach((item) => {
      this.element.appendChild(
        new InputFieldButton(this.element, this.version, item.label, item.price)
          .element
      );
    });

    this.element.addEventListener("mousedown", (e) => {
      if (e.target.className === Classname.INPUT_FIELD_BUTTONS) return;
      const inputText = document.querySelector(
        `.${Classname.INPUT_FIELD_TEXT}.${this.version}`
      );
      const inputNum = Number(inputText.innerText.replaceAll(",", ""));
      const value = Number(e.target.value);
      if (inputNum >= value) {
        const outputTextarea = document.querySelector(
          `.${Classname.OUTPUT_FIELD_TEXTAREA}.${this.version}`
        );

        outputTextarea.innerHTML += `${e.target.dataset.label}을 구매했습니다.<br />`;
        outputTextarea.scrollTo({
          top: outputTextarea.scrollHeight,
          behavior: "smooth",
        });

        inputText.innerText = numberFormatting(inputNum - value);
        inputText.dataset.value = inputNum - value;
      } else {
        inputText.innerText = numberFormatting(value);
      }
    });

    this.element.addEventListener("mouseup", (e) => {
      if (e.target.className === Classname.INPUT_FIELD_BUTTONS) return;
      const inputText = document.querySelector(
        `.${Classname.INPUT_FIELD_TEXT}.${this.version}`
      );
      const inputNum = Number(inputText.dataset.value);
      const value = Number(e.target.value);
      if (value > inputNum) {
        inputText.innerText = numberFormatting(inputText.dataset.value);
      }
    });
  }
}
