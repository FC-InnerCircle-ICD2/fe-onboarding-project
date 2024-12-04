import Element from "../common/Element.js";

export default class InputFieldButton extends Element {
  constructor(parent, version, label, price) {
    super("button", parent, `inputField_buttons_button ${version}`, version);
    this.element.value = price;
    this.element.dataset.label = label;
    this.element.innerHTML = `${price}원`;
  }
}
