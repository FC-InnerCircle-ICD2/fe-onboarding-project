import Element from "./common/Element.js";
import InputField from "./input/InputField.js";
import OutputField from "./output/OutputField.js";

export default class Machine extends Element {
  constructor(version) {
    super("section", document.body, `machine ${version}`, version);
  }

  on() {
    new InputField(this.element, this.version);
    new OutputField(this.element, this.version);
  }
}
