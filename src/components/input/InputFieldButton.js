export default class InputFieldButton {
  constructor(version, label, price) {
    // inputField_buttons_button

    this.element = document.createElement("button");
    this.element.className = `inputField_buttons_button ${version}`;

    const labelTag = document.createElement("div");
    labelTag.innerText = label;
    this.element.appendChild(labelTag);

    const priceTag = document.createElement("div");
    priceTag.innerText = price + "원";
    this.element.appendChild(priceTag);
    this.element.value = price;
    this.element.dataset.label = label;

    // 클릭시 구매 이벤트 요청
    this.element.addEventListener("click", (e) => {});

    this.element.addEventListener("mousedown", (e) => {
      const inputText = document.querySelector(
        `.inputField_inputText.${version}`
      );
      const inputNum = Number(inputText.innerText.replaceAll(",", ""));
      const value = Number(e.currentTarget.value);
      if (inputNum >= value) {
        const outputTextarea = document.querySelector(
          `.outputField_textarea.${version}`
        );
        outputTextarea.innerHTML += `${e.currentTarget.dataset.label}을 구매했습니다.<br />`;
        outputTextarea.scrollTo({
          top: outputTextarea.scrollHeight,
          behavior: "smooth",
        });
        inputText.innerText = (inputNum - value).toLocaleString();
        inputText.dataset.value = inputNum - value;
      } else {
        inputText.innerText = value.toLocaleString();
      }
    });

    this.element.addEventListener("mouseup", (e) => {
      const inputText = document.querySelector(
        `.inputField_inputText.${version}`
      );
      const inputNum = Number(inputText.dataset.value);
      const value = Number(e.currentTarget.value);
      if (value > inputNum) {
        inputText.innerText = Number(inputText.dataset.value).toLocaleString();
      }
    });
  }
}
