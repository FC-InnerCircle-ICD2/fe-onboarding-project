import InputButtons from "./InputButtons.js";

export default class InputField {
  constructor(parent) {
    this.parent = parent;
    this.price = 0;
    this.inputField = document.createElement("div");
    this.inputField.classList.add("inputField");
  }

  setPrice(price) {
    this.price = price;
  }

  init() {
    const buttons = new InputButtons(this.inputField, this.setPrice);
    buttons.init();

    this.parent.appendChild(this.inputField);
  }
}
