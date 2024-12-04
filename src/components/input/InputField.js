import Element from "../common/Element.js";
import InputFieldButtons from "./InputFieldButtons.js";
import InputFieldText from "./InputFieldText.js";

export default class InputField extends Element {
  constructor(parent, version) {
    super("article", parent, `inputField ${version}`, version);
    this.element.appendChild(new InputFieldText(this.element, version).element);
    this.element.appendChild(
      new InputFieldButtons(this.element, version).element
    );
  }
}
