import { vendingContents } from "./data.js";
import { checkBatchimEnding } from "./utils.js";

/*************************************************************
 * 전역
 *************************************************************/
/**
 * Element 전역 선언
 */
const moneyInput = document.querySelector("#currentMoney");
const insertInput = document.querySelector("#insertMoney");
const logAreaDiv = document.querySelector(".log_area");
const logTextPre = document.querySelector("#log_text");
const insertButton = document.querySelector("#insertBtn");
const returnButton = document.querySelector("#returnBtn");

// 자판기 Button 들 랜더링을 위한 변수
const buttonWrap = document.querySelector(".btn_wrap");
const fragment = document.createDocumentFragment();

// 전역 사용 변수
let moneyInputOriginValue = 0;
let isMousedown = false;

/**
 * input 전역에 쉼표 적용
 */
document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.tagName === "INPUT" && target.type === "text") {
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

/*************************************************************
 * Item Button
 *************************************************************/
/**
 * item button에서 mousedown 했을 때 실행되는 함수
 * @param {MouseEvent} MouseEvent
 */
const itemBtnMousedownHandler = (event) => {
  isMousedown = true; // 마우스 버튼 눌림

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
  if (isMousedown) {
    // mousedown에서 가격 보여주는 event로 인해 바뀐 값, class 초기화
    moneyInput.value = moneyInputOriginValue;
    moneyInput.classList.remove("item_pressed_text");
  }
};

/**
 * item button에서 mouseup 했을 때 실행되는 함수
 * @param {MouseEvent} MouseEvent
 */
const itemBtnMouseupHandler = (event) => {
  isMousedown = false; // 마우스 버튼 떼어짐

  // mousedown에서 가격 보여주는 event로 인해 바뀐 값, class 초기화
  moneyInput.value = moneyInputOriginValue;
  moneyInput.classList.remove("item_pressed_text");

  // 계산 및 log 출력
  const currentMoney = Number(moneyInput.value);
  if (currentMoney - event.currentTarget.value > 0) {
    // 값 계산
    const calculatedValue = currentMoney - event.currentTarget.value;
    moneyInputOriginValue = calculatedValue;
    moneyInput.value = calculatedValue.toLocaleString();

    // log text 생성
    const adj = checkBatchimEnding(event.currentTarget.name) ? "을" : "를";
    logTextPre.innerText += `${event.currentTarget.name + adj} 구매했습니다.\n`;
    logAreaDiv.scrollTop = logTextPre.scrollHeight;
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

/*************************************************************
 * Insert Button
 *************************************************************/
/**
 * 투입 button 클릭 했을 때 실행되는 함수
 * @param {MouseEvent} MouseEvent
 */
const insertBtnClickHandler = (event) => {
  const insertMoney = Number(insertInput.value.replace(/[^0-9.]/g, ""));

  if (insertMoney < 0) {
    alert("금액은 양수만 입력할 수 있습니다!");
    insertInput.value = null;
  } else {
    // 값 계산
    const currentMoney = Number(moneyInput.value.replace(/[^0-9.]/g, ""));
    moneyInput.value = (currentMoney + insertMoney).toLocaleString();

    // log text 생성, scroll 설정, input 초기화
    logTextPre.innerText += `${insertMoney.toLocaleString()}원을 투입했습니다.\n`;
    logAreaDiv.scrollTop = logTextPre.scrollHeight;
    insertInput.value = null;
  }
};
insertButton.addEventListener("click", insertBtnClickHandler);

/*************************************************************
 * Return Button
 *************************************************************/
/**
 * 반환 button 클릭 했을 때 실행되는 함수
 * @param {MouseEvent} MouseEvent
 */
const returnBtnClickHandler = (event) => {
  // log text 생성, scroll 설정, 값 초기화
  logTextPre.innerText += `${moneyInput.value}원을 반환했습니다.\n`;
  logAreaDiv.scrollTop = logAreaDiv.scrollHeight;
  moneyInput.value = 0;
};
returnButton.addEventListener("click", returnBtnClickHandler);
