export default class InputFieldText {
  constructor(version) {
    this.element = document.createElement("div");
    this.element.className = `inputField_inputText ${version}`;
    this.element.innerText = 0;
  }
}
