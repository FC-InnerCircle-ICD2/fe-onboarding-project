export default class OutputFieldButton {
  constructor(text) {
    this.element = document.createElement("button");
    this.element.innerText = text;
    this.element.className = `outputField_buttons_button ${
      text === "투입" ? "insert" : "return"
    }`;
  }
}
