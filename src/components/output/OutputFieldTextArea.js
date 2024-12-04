import Element from "../common/Element.js";

export default class OutputFieldTextArea extends Element {
  constructor(parent, version) {
    super("p", parent, `outputField_textarea ${version}`, version);
  }
}
