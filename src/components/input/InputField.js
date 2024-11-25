import { inputInfo } from "../../utils/inputInfo.js";

export default class InputField {
  constructor() {
    this.price = 0;
    this.element = document.createElement("div");
    this.element.classList.add("inputField");

    this.inputText = document.createElement("div");
    this.inputText.classList.add("inputField_inputText");
    this.inputText.innerText = 0;
    this.element.appendChild(this.inputText);

    this.makeButtons();
  }

  setPrice(price) {
    this.price = price;
    this.inputText.innerText = price;
  }

  makeButtons() {
    const buttons = document.createElement("div");
    buttons.classList.add("inputField_buttons");

    inputInfo.forEach((item) => {
      const info = document.createElement("button");
      info.classList.add("inputField_buttons_button");

      const label = document.createElement("div");
      label.innerText = item.label;
      info.appendChild(label);

      const price = document.createElement("div");
      price.innerText = item.price;
      info.appendChild(price);
      info.value = item.price;

      info.addEventListener("click", (e) => {
        this.setPrice(e.currentTarget.value);
      });
      buttons.appendChild(info);
    });
    this.element.appendChild(buttons);
  }
}
