import InputButtons from "./InputButtons.js";

export default class InputField {
  constructor(parent) {
    this.parent = parent;
    this.inputField = document.createElement("div");
    this.inputField.classList.add("inputField");
  }

  init() {
    const buttons = new InputButtons(this.inputField);
    buttons.init();
    this.parent.appendChild(this.inputField);
  }
}
