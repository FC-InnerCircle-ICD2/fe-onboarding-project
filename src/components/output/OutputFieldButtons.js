import OutputFieldButton from "./OutputFieldButton.js";

export default class OutputFieldButtons {
  constructor(version) {
    this.version = version;
    this.element = document.createElement("div");
    this.element.className = "outputField_buttons";

    this.element.appendChild(new OutputFieldButton("투입").element);
    this.element.appendChild(new OutputFieldButton("반환").element);

    this.element.addEventListener("click", (e) => {
      const inputText = document.querySelector(
        `.inputField_inputText.${version}`
      );
      if (e.target.innerText === "투입") {
        this.handleInsertEvent(inputText, version);
      } else {
        this.handleReturnEvent(inputText, version);
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

  handleInsertEvent(inputText, version) {
    const outputText = document.querySelector(
      `.outputField_inputText.${version}`
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

  handleReturnEvent(inputText, version) {
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
