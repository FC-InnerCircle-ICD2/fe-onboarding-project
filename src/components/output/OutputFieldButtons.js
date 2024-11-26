import OutputFieldButton from "./OutputFieldButton.js";

export default class OutputFieldButtons {
  constructor(version) {
    this.version = version;
    this.element = document.createElement("div");
    this.element.className = "outputField_buttons";

    this.element.appendChild(new OutputFieldButton("투입", version).element);
    this.element.appendChild(new OutputFieldButton("반환", version).element);
  }
}
