import { Classname } from "../../utils/constant.js";
import Element from "../common/Element.js";
import OutputFieldButtons from "./OutputFieldButtons.js";
import OutputFieldText from "./OutputFieldText.js";
import OutputFieldTextArea from "./OutputFieldTextArea.js";

export default class OutputField extends Element {
  constructor(parent, version) {
    super("article", parent, `${Classname.OUTPUT_FIELD} ${version}`, version);

    this.element.appendChild(
      new OutputFieldText(this.element, version).element
    );
    this.element.appendChild(
      new OutputFieldButtons(this.element, version).element
    );
    this.element.appendChild(
      new OutputFieldTextArea(this.element, this.version).element
    );
  }
}
