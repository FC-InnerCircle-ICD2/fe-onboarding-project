export default class OutputFieldButton {
  constructor(text, version) {
    this.element = document.createElement("button");
    this.element.innerText = text;
    this.element.className = "outputField_buttons_button";
    this.element.addEventListener("click", () => {
      if (text === "투입") {
        this.handleInsertEvent(version);
      } else {
        this.handleReturnEvent(version);
      }
    });
  }

  handleInsertEvent(version) {
    const outputText = document.querySelector(
      `.outputField_inputText.${version}`
    );
    const inputText = document.querySelector(
      `.inputField_inputText.${version}`
    );
    inputText.innerText =
      Number(inputText.innerText) + Number(outputText.value);
    outputText.value = 0;
  }

  handleReturnEvent(version) {
    const inputText = document.querySelector(
      `.inputField_inputText.${version}`
    );
    console.log(inputText.innerText);
    inputText.innerText = "0";
  }
}
