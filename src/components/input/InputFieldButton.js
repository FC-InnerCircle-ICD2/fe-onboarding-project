export default class InputFieldButton {
  constructor(version, label, price) {
    // inputField_buttons_button

    this.element = document.createElement("button");
    this.element.className = `inputField_buttons_button ${version}`;

    const labelTag = document.createElement("div");
    labelTag.innerText = label;
    this.element.appendChild(labelTag);

    const priceTag = document.createElement("div");
    priceTag.innerText = price;
    this.element.appendChild(priceTag);
    this.element.value = price;

    this.element.addEventListener("click", (e) => {
      const input = document.querySelector(`.inputField_inputText.${version}`);
      input.innerText = Number(input.innerText) + Number(e.currentTarget.value);
    });
  }
}
