import { Classname } from "../../utils/constant.js";
import Element from "../common/Element.js";

export default class InputFieldButton extends Element {
  constructor(parent, version, label, price) {
    super(
      "button",
      parent,
      `${Classname.INPUT_FIELD_BUTTONS_BUTTON} ${version}`,
      version
    );
    this.element.value = price;
    this.element.dataset.label = label;
    this.element.innerHTML = `${price}원`;
  }
}
