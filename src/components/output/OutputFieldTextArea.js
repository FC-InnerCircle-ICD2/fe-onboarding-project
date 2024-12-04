import { Classname } from "../../utils/constant.js";
import Element from "../common/Element.js";

export default class OutputFieldTextArea extends Element {
  constructor(parent, version) {
    super(
      "p",
      parent,
      `${Classname.OUTPUT_FIELD_TEXTAREA} ${version}`,
      version
    );
  }
}
