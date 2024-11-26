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
const vendingMachine2 = new VendingMachine("machine-2", [
  { name: "아메리카노", price: 2500 },
  { name: "카페라떼", price: 3000 },
  { name: "카푸치노", price: 3000 },
  { name: "바닐라라떼", price: 3500 },
  { name: "카라멜마끼아또", price: 3500 },
  { name: "녹차라떼", price: 3000 },
  { name: "초코라떼", price: 3000 },
  { name: "티", price: 2500 },
  { name: "아이스티", price: 2500 },
]);
const vendingMachine3 = new VendingMachine("machine-3", [
  { name: "로봇장난감", price: 5000 },
  { name: "미니카", price: 4000 },
  { name: "퍼즐", price: 3500 },
  { name: "블록세트", price: 6000 },
  { name: "인형", price: 4500 },
  { name: "보드게임", price: 7000 },
  { name: "슬라임", price: 2000 },
  { name: "요요", price: 3000 },
  { name: "공", price: 2500 },
]);
const machineList = [vendingMachine1, vendingMachine2, vendingMachine3];

// 이벤트 초기화
machineList.forEach((machine) => {
  machine.init();
});
