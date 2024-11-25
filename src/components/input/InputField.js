export default class InputField {
  inputField;

  constructor(parent) {
    this.inputField = document.createElement("div");
    this.inputField.classList.add("inputField");
    parent.appendChild(this.inputField);
  }

  init() {
    this.inputField.innerText = "test";
  }
}
