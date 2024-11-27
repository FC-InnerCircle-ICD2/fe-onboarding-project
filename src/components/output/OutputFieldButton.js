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

  changeOutputTextarea(version, value) {
    const outputTextarea = document.querySelector(
      `.outputField_textarea.${version}`
    );
    outputTextarea.innerHTML += value;
    outputTextarea.scrollTo({
      top: outputTextarea.scrollHeight,
      behavior: "smooth",
    });
  }

  handleInsertEvent(version) {
    const outputText = document.querySelector(
      `.outputField_inputText.${version}`
    );
    const inputText = document.querySelector(
      `.inputField_inputText.${version}`
    );

    if (outputText.value !== "0" && outputText.value !== "") {
      this.changeOutputTextarea(
        version,
        `${outputText.value}원이 투입되었습니다.<br />`
      );
      inputText.innerText = (
        Number(inputText.innerText.replaceAll(",", "")) +
        Number(outputText.value)
      ).toLocaleString();
      inputText.dataset.value =
        Number(inputText.dataset.value) + Number(outputText.value);
      outputText.value = "";
    }
  }

  handleReturnEvent(version) {
    const inputText = document.querySelector(
      `.inputField_inputText.${version}`
    );
    if (inputText.innerText !== "0") {
      this.changeOutputTextarea(
        version,
        `${inputText.innerText.replaceAll(",", "")}원이 반환되었습니다.<br />`
      );
      inputText.innerText = "0";
      inputText.dataset.value = "0";
    }
  }
}
