import { vendingContents } from "./data.js";
import { checkBatchimEnding, formatNumber } from "./utils.js";

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

// Input 쉼표 포맷팅 관리를 위한 Proxy를 생성해주는 함수
const createInputProxy = (inputElement) => {
  return new Proxy(inputElement, {
    get(target, prop) {
      if (prop === "value") {
        // 숫자만 남기고 나머지는 제거
        const numericValue = Number(target[prop].replace(/[^\d]/g, ""));
        return numericValue;
      }
    },
    set(target, prop, value) {
      if (prop === "value") {
        // 숫자만 남기고 나머지는 제거
        const numericValue = value.replace(/[^\d]/g, "");
        // 쉼표 추가
        const formattedValue = formatNumber(numericValue);
        target[prop] = formattedValue;
      } else {
        target[prop] = value;
      }
      return true;
    },
  });
};

// Proxy를 사용하여 input의 입력 값 처리
const insertInputProxy = createInputProxy(insertInput);
const moneyInputProxy = createInputProxy(moneyInput);

// 이벤트 리스너로 입력 값 처리
insertInput.addEventListener("input", (event) => {
  insertInputProxy.value = event.target.value; // Proxy를 통해 값 설정
});
moneyInput.addEventListener("input", (event) => {
  moneyInputProxy.value = event.target.value; // Proxy를 통해 값 설정
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

  const currentMoney = moneyInputProxy.value;
  const insertedMoney = event.currentTarget.value;

  moneyInputOriginValue = currentMoney; // 전역 변수에 값 저장

  if (currentMoney <= 0 || currentMoney - insertedMoney < 0) {
    moneyInput.value = formatNumber(insertedMoney);
    moneyInput.className += " item_pressed_text";
  }
};

/**
 * item button에서 mouseleave 했을 때 실행되는 함수
 */
const itemBtnMouseleaveHandler = () => {
  if (isMousedown) {
    // mousedown에서 가격 보여주는 event로 인해 바뀐 값, class 초기화
    moneyInput.value = formatNumber(moneyInputOriginValue);
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
  const currentMoney = moneyInputProxy.value;
  const insertedMoney = event.currentTarget.value;
  if (currentMoney - insertedMoney > 0) {
    // 값 계산
    const calculatedValue = currentMoney - insertedMoney;
    moneyInputOriginValue = calculatedValue; // 전역 변수에 값 저장
    moneyInput.value = formatNumber(calculatedValue);

    // log text 생성
    const adj = checkBatchimEnding(event.currentTarget.name) ? "을" : "를";
    logTextPre.innerText += `${event.currentTarget.name + adj} 구매했습니다.\n`;
    logAreaDiv.scrollTop = logTextPre.scrollHeight;
  } else {
    moneyInput.value = formatNumber(moneyInputOriginValue);
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
 */
const insertBtnClickHandler = () => {
  const insertMoney = insertInputProxy.value;

  if (insertMoney < 0) {
    alert("금액은 양수만 입력할 수 있습니다!");
    insertInput.value = null;
  } else {
    // 값 계산
    const currentMoney = moneyInputProxy.value;
    moneyInput.value = formatNumber(currentMoney + insertMoney);

    // log text 생성, scroll 설정, input 초기화
    logTextPre.innerText += `${formatNumber(insertMoney)}원을 투입했습니다.\n`;
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
 */
const returnBtnClickHandler = () => {
  // log text 생성, scroll 설정, 값 초기화
  logTextPre.innerText += `${moneyInput.value}원을 반환했습니다.\n`;
  logAreaDiv.scrollTop = logAreaDiv.scrollHeight;
  moneyInput.value = 0;
};
returnButton.addEventListener("click", returnBtnClickHandler);
