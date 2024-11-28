export default class InputFieldButton {
  constructor(version, label, price) {
    this.element = document.createElement("button");
    this.element.className = `inputField_buttons_button ${version}`;
    this.element.value = price;
    this.element.dataset.label = label;
    this.element.innerHTML = `${price}원`;
  }
}
