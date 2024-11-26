import "./style.css";
import VendingMachine from "./VendingMachine";

// 자판기 생성
const vendingMachine1 = new VendingMachine("machine-1", [
  { name: "콜라", price: 1500 },
  { name: "사이다", price: 1500 },
  { name: "환타", price: 1500 },
  { name: "물", price: 1000 },
  { name: "커피", price: 2000 },
  { name: "에너지드링크", price: 2500 },
  { name: "주스", price: 2000 },
  { name: "이온음료", price: 1800 },
  { name: "탄산수", price: 1300 },
]);
const vendingMachine2 = new VendingMachine("machine-2");
const machineList = [vendingMachine1, vendingMachine2];

// 이벤트 초기화
machineList.forEach((machine) => {
  machine.init();
});
