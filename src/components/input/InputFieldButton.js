import Element from "../common/Element.js";

export default class InputFieldButton extends Element {
  constructor(tag, parent, className, version, label, price) {
    super(tag, parent, className, version);
    this.element.value = price;
    this.element.dataset.label = label;
    this.element.innerHTML = `${price}원`;
  }
}
