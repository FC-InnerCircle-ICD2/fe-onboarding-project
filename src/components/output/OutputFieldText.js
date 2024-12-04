import Element from "../common/Element.js";

export default class OutputFieldText extends Element {
  constructor(parent, version) {
    super("input", parent, `outputField_inputText ${version}`, version);
    this.element.value = "";
    this.element.type = "number";
    this.element.addEventListener("keydown", (event) => {
      if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    });
  }
}
