import { inputInfo } from "../../utils/inputInfo.js";

export default class InputButtons {
  constructor(parent) {
    this.parent = parent;
    this.buttons = document.createElement("div");
    this.buttons.classList.add("inputField_buttons");
  }

  init() {
    inputInfo.forEach((item) => {
      const info = document.createElement("button");
      info.classList.add("inputField_buttons_button");

      const label = document.createElement("div");
      label.innerText = item.label;
      info.appendChild(label);

      const price = document.createElement("div");
      price.innerText = item.price;
      info.appendChild(price);

      this.buttons.appendChild(info);
    });
    this.parent.appendChild(this.buttons);
  }
}
