export default class OutputFieldButton {
  constructor(text, version) {
    this.element = document.createElement("button");
    this.element.innerText = text;
    this.element.className = `outputField_buttons_button ${
      text === "투입" ? "insert" : "return"
    }`;
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

    if (outputText.value !== "0") {
      const outputTextarea = document.querySelector(
        `.outputField_textarea.${version}`
      );
      outputTextarea.innerHTML += `${outputText.value}원이 투입되었습니다.<br />`;
      inputText.innerText = (
        Number(inputText.innerText.replaceAll(",", "")) +
        Number(outputText.value)
      ).toLocaleString();
      outputText.value = 0;
    }
  }

  handleReturnEvent(version) {
    const inputText = document.querySelector(
      `.inputField_inputText.${version}`
    );
    const outputTextarea = document.querySelector(
      `.outputField_textarea.${version}`
    );
    if (inputText.innerText !== "0") {
      outputTextarea.innerHTML += `${inputText.innerText.replaceAll(
        ",",
        ""
      )}원이 반환되었습니다.<br />`;
      inputText.innerText = "0";
    }
  }
}
