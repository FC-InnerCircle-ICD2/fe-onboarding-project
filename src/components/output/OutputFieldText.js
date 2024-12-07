import { Classname } from "../../utils/constant.js";
import Element from "../common/Element.js";

export default class OutputFieldText extends Element {
  constructor(parent, version) {
    super(
      "input",
      parent,
      `${Classname.OUTPUT_FIELD_TEXT} ${version}`,
      version
    );
    this.element.value = "";
    this.element.type = "number";
    this.element.addEventListener("keydown", (event) => {
      if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    });
  }
}
