import Element from "../common/Element.js";

export default class InputFieldText extends Element {
  constructor(tag, parent, className, version) {
    super(tag, parent, className, version);
    this.element.innerText = "0";
    this.element.dataset.value = "0";
  }
}
