import { Classname } from "../../utils/constant.js";
import Element from "../common/Element.js";

export default class OutputFieldButton extends Element {
  constructor(parent, version, innerText) {
    super(
      "button",
      parent,
      `${Classname.OUTPUT_FIELD_BUTTONS_BUTTON} ${
        innerText === "투입" ? "insert" : "return"
      }`,
      version
    );
    this.element.innerText = innerText;
  }
}
