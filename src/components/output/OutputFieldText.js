export default class OutputFieldText {
  constructor(version) {
    this.element = document.createElement("input");
    this.element.className = `outputField_inputText ${version}`;
    this.element.value = 0;
  }
}
