import { Classname } from "../../utils/constant.js";
import Element from "../common/Element.js";

export default class InputFieldText extends Element {
  constructor(parent, version) {
    super("div", parent, `${Classname.INPUT_FIELD_TEXT} ${version}`, version);
    this.element.innerText = "0";
    this.element.dataset.value = "0";
  }
}
