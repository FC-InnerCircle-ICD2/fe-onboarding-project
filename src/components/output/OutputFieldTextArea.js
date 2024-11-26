export default class OutputFieldTextArea {
  constructor(version) {
    this.element = document.createElement("p");
    this.element.className = `outputField_textarea ${version}`;
  }
}
