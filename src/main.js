import "./style.css";
import VendingMachine from "./VendingMachine";

// 자판기 생성
const vendingMachine1 = new VendingMachine();

/********** 엘리멘트 요소들 **********/
const currentMoneyEl = document.querySelector('[aria-label="현재 잔액"]');
const insertedMoneyInputEl = document.querySelector('[aria-label="투입 금액"]');
const insertButtonEl = document.querySelector('[aria-label="투입"]');
const logsEl = document.querySelector('[aria-label="로그"]');

/********** 기능 구현 **********/
// 현재 잔액 표시
currentMoneyEl.textContent = vendingMachine1.currentMoney;
// 로그 표시
logsEl.textContent = vendingMachine1.logs.join("\n");

// 투입 버튼 클릭
insertButtonEl.addEventListener("click", () => {
  vendingMachine1.insertMoney(insertedMoneyInputEl.value);
  currentMoneyEl.textContent = vendingMachine1.currentMoney;
  vendingMachine1.updateLogs();
});
