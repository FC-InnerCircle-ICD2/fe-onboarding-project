import { inputInfo } from "../../utils/inputInfo.js";
import InputFieldButton from "./InputFieldButton.js";
import InputFieldText from "./InputFieldText.js";

export default class InputField {
  constructor(version) {
    this.version = version;
    this.element = document.createElement("div");
    this.element.className = `inputField ${version}`;

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
    return buttons;
  }
}
