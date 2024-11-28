import { vendingContents } from "./data.js";

/**
 * input 전역에 쉼표 적용
 */
document.addEventListener("input", (event) => {
  const target = event.target;
  if (
    target.tagName === "INPUT" &&
    target.type === "text" &&
    target.dataset.type === "number"
  ) {
    // 커서 위치 저장
    const cursorPosition = target.selectionStart;

    // 원본 값에서 숫자만 추출
    const originalValue = target.value;
    const numericValue = originalValue.replace(/[^0-9.]/g, ""); // 숫자와 소수점만 남김

    // 쉼표를 추가한 값 생성
    const formattedValue = Number(numericValue).toLocaleString();

    // 값 갱신
    target.value = formattedValue;

    // 커서 위치 계산 및 복원
    const newCursorPosition =
      formattedValue.length - (originalValue.length - cursorPosition);
    target.setSelectionRange(newCursorPosition, newCursorPosition);
  }
});

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

let moneyInputOriginValue = 0;
let isMousedown = false;
/**
 * item button에서 mousedown 했을 때 실행되는 함수
 * @param {event} event
 */
const itemBtnMousedownHandler = (event) => {
  isMousedown = true; // 마우스 버튼 눌림

  const moneyInput = document.querySelector("#currentMoney");
  const currentMoney = Number(moneyInput.value.replace(/[^0-9.]/g, ""));
  moneyInputOriginValue = currentMoney;

  if (currentMoney <= 0 || currentMoney - event.currentTarget.value < 0) {
    moneyInput.value = event.currentTarget.value;
    moneyInput.className += " item_pressed_text";
  }
};

/**
 * item button에서 mouseleave 했을 때 실행되는 함수
 */
const itemBtnMouseleaveHandler = () => {
  // HTML Element 선택
  const moneyInput = document.querySelector("#currentMoney");

  if (isMousedown) {
    // mousedown에서 가격 보여주는 event로 인해 바뀐 값, class 초기화
    moneyInput.value = moneyInputOriginValue;
    moneyInput.classList.remove("item_pressed_text");
  }
};

/**
 * item button에서 mouseup 했을 때 실행되는 함수
 * @param {event} event
 */
const itemBtnMouseupHandler = (event) => {
  isMousedown = false; // 마우스 버튼 떼어짐

  // HTML Element 선택
  const moneyInput = document.querySelector("#currentMoney");
  const logArea = document.querySelector(".log_area");

  // mousedown에서 가격 보여주는 event로 인해 바뀐 값, class 초기화
  moneyInput.value = moneyInputOriginValue;
  moneyInput.classList.remove("item_pressed_text");

  // 계산 및 log 출력
  const currentMoney = Number(moneyInput.value);
  if (currentMoney - event.currentTarget.value > 0) {
    const calculatedValue = currentMoney - event.currentTarget.value;
    moneyInputOriginValue = calculatedValue;
    moneyInput.value = calculatedValue.toLocaleString();
    const adj = checkBatchimEnding(event.currentTarget.name) ? "을" : "를";
    logArea.innerHTML += `${event.currentTarget.name + adj} 구매했습니다.<br/>`;
    logArea.scrollTop = logArea.scrollHeight;
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
  button.addEventListener("mousedown", itemBtnMousedownHandler);
  button.addEventListener("mouseleave", itemBtnMouseleaveHandler);
  button.addEventListener("mouseup", itemBtnMouseupHandler);
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
  const insertMoney = Number(insertInput.value.replace(/[^0-9.]/g, ""));

  if (insertMoney < 0) {
    alert("금액은 양수만 입력할 수 있습니다!");
    insertInput.value = null;
  } else {
    const currentMoney = Number(moneyInput.value.replace(/[^0-9.]/g, ""));
    moneyInput.value = (currentMoney + insertMoney).toLocaleString();
    logArea.innerHTML += `${insertMoney.toLocaleString()}원을 투입했습니다.<br/>`;
    logArea.scrollTop = logArea.scrollHeight;
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
  logArea.scrollTop = logArea.scrollHeight;
  moneyInput.value = 0;
};
returnButton.addEventListener("click", returnBtnClickHandler);
