import "./style.css";
import VendingMachine from "./VendingMachine";

// 자판기 생성
const vendingMachine1 = new VendingMachine("machine-1");
const vendingMachine2 = new VendingMachine("machine-2");
const machineList = [vendingMachine1, vendingMachine2];

// 이벤트 초기화
machineList.forEach((machine) => {
  machine.init();
});
