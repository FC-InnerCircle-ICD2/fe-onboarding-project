import "./style.css";
import VendingMachine from "./VendingMachine";

// 자판기 생성
const vendingMachine1 = new VendingMachine();

/********** 엘리멘트 요소들 **********/
const currentMoneyEl = document.querySelector('[aria-label="현재 잔액"]');

/********** 기능 구현 **********/
// 현재 잔액 표시
currentMoneyEl.textContent = vendingMachine1.currentMoney;
