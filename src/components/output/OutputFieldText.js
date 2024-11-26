export default class OutputFieldText {
  constructor(version) {
    this.element = document.createElement("input");
    this.element.className = `outputField_inputText ${version}`;
    this.element.value = 0;
    this.element.type = "number";
    this.element.addEventListener("keydown", (event) => {
      if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    });
  }
}
