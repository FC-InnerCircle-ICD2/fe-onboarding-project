import OutputFieldButtons from "./OutputFieldButtons.js";
import OutputFieldText from "./OutputFieldText.js";

export default class OutputField {
  constructor(version) {
    this.element = document.createElement("article");
    this.element.className = `outputField ${version}`;

    this.element.appendChild(new OutputFieldText(version).element);
    this.element.appendChild(new OutputFieldButtons(version).element);
  }
}
