import { vendingContents } from "./data.js";

// 자판기 Button 들 랜더링
const buttonWrap = document.querySelector(".btn_wrap");
const fragment = document.createDocumentFragment();

/**
 * 문자열 마지막 글자에 받침이 있는지 확인해주는 함수
 * @param {string} word
 * @returns boolean
 */
const checkBatchimEnding = (word) => {
  if (typeof word !== "string") return null;

  let lastLetter = word[word.length - 1];
  let uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
};

/**
 * item button을 click 했을 때 실행되는 함수
 * @param {event} event
 */
const itemBtnClickHandler = (event) => {
  const moneyInput = document.querySelector("#currentMoney");
  const currentMoney = Number(moneyInput.value);
  const logArea = document.querySelector(".log_area");

  if (!currentMoney || currentMoney <= 0) {
    alert("돈을 넣은 후 원하는 상품을 선택해주세요.");
  } else {
    if (currentMoney - event.currentTarget.value < 0) {
      alert("선택한 상품의 가격이 투입한 금액보다 높습니다.");
    } else {
      moneyInput.value = currentMoney - event.currentTarget.value;
      const adj = checkBatchimEnding(event.currentTarget.name) ? "을" : "를";
      logArea.innerHTML += `${
        event.currentTarget.name + adj
      } 구매했습니다.<br/>`;
    }
  }
};

/**
 * item button들을 렌더링 해줌
 */
vendingContents.map((item) => {
  const button = document.createElement("button");
  const p = document.createElement("p");
  const span = document.createElement("span");

  button.className = "item_btn btn_default_color";
  p.className = "item_name";
  span.className = "item_price";

  p.textContent = item.name;
  span.textContent = `${item.price}원`;

  button.name = item.name;
  button.value = item.price;
  button.addEventListener("click", itemBtnClickHandler);
  button.appendChild(p);
  button.appendChild(span);
  fragment.appendChild(button); // Fragment에 추가
});
buttonWrap.appendChild(fragment); // Fragment를 한 번에 추가

const insertButton = document.querySelector("#insertBtn");
/**
 * 투입 button 클릭 했을 때 실행되는 함수
 * @param {event} event
 */
const insertBtnClickHandler = (event) => {
  const insertInput = document.querySelector("#insertMoney");
  const moneyInput = document.querySelector("#currentMoney");
  const logArea = document.querySelector(".log_area");
  const insertMoney = Number(insertInput.value);

  if (insertMoney < 0) {
    alert("금액은 양수만 입력할 수 있습니다!");
    insertInput.value = null;
  } else {
    moneyInput.value = Number(moneyInput.value) + insertMoney;
    logArea.innerHTML += `${insertMoney}원을 투입했습니다.<br/>`;
    insertInput.value = null;
  }
};
insertButton.addEventListener("click", insertBtnClickHandler);

const returnButton = document.querySelector("#returnBtn");
/**
 * 반환 button 클릭 했을 때 실행되는 함수
 * @param {event} event
 */
const returnBtnClickHandler = (event) => {
  const moneyInput = document.querySelector("#currentMoney");
  const logArea = document.querySelector(".log_area");
  logArea.innerHTML += `${moneyInput.value}원을 반환했습니다.<br/>`;
  moneyInput.value = 0;
};
returnButton.addEventListener("click", returnBtnClickHandler);
