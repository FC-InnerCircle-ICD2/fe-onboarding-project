import { inputInfo } from "../../utils/inputInfo.js";
import Element from "../common/Element.js";
import InputFieldButton from "./InputFieldButton.js";
import InputFieldText from "./InputFieldText.js";

export default class InputField extends Element {
  constructor(tag, parent, className, version) {
    super(tag, parent, className, version);
    this.element.appendChild(new InputFieldText(version).element);
    this.element.appendChild(this.makeButtons());
  }

  makeButtons() {
    const buttons = document.createElement("div");
    buttons.classList.add("inputField_buttons");
    inputInfo.forEach((item) => {
      buttons.appendChild(
        new InputFieldButton(this.version, item.label, item.price).element
      );
    });

    buttons.addEventListener("mousedown", (e) => {
      if (e.target.className === "inputField_buttons") return;
      const inputText = document.querySelector(
        `.inputField_inputText.${this.version}`
      );
      const inputNum = Number(inputText.innerText.replaceAll(",", ""));
      const value = Number(e.target.value);
      if (inputNum >= value) {
        const outputTextarea = document.querySelector(
          `.outputField_textarea.${this.version}`
        );

        outputTextarea.innerHTML += `${e.target.dataset.label}을 구매했습니다.<br />`;
        outputTextarea.scrollTo({
          top: outputTextarea.scrollHeight,
          behavior: "smooth",
        });

        inputText.innerText = (inputNum - value).toLocaleString();
        inputText.dataset.value = inputNum - value;
      } else {
        inputText.innerText = value.toLocaleString();
      }
    });

    buttons.addEventListener("mouseup", (e) => {
      if (e.target.className === "inputField_buttons") return;
      const inputText = document.querySelector(
        `.inputField_inputText.${this.version}`
      );
      const inputNum = Number(inputText.dataset.value);
      const value = Number(e.target.value);
      if (value > inputNum) {
        inputText.innerText = Number(inputText.dataset.value).toLocaleString();
      }
    });
    return buttons;
  }
}
