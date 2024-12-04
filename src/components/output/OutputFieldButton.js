import Element from "../common/Element.js";

export default class OutputFieldButton extends Element {
  constructor(parent, version, innerText) {
    super(
      "button",
      parent,
      `outputField_buttons_button ${
        innerText === "투입" ? "insert" : "return"
      }`,
      version
    );
    this.element.innerText = innerText;
  }
}
