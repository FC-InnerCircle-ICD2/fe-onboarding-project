import { GeneratorProductButtons, VendingMachine } from "./class";
import { VendingMachineData } from "./mockData";

const vm = new VendingMachine();

console.log(vm.state.insertAmount);

const buttonGroup = document.getElementById("buttonGroup");
const priceViewPannel = document.getElementById("priceViewPannel");
const insertPriceInput = document.getElementById("priceInput");
const insertButton = document.getElementById("insertButton");
const returnButton = document.getElementById("returnButton");

const productButtons = new GeneratorProductButtons({
  data: VendingMachineData,
  container: buttonGroup,
});
productButtons.render();
/**
 * 투입금액
 */
// let insertedAmount = 0;

// const setPriceView = (price: number) => {
//   if (priceView) {
//     priceView.innerText = `${(insertedAmount - price).toLocaleString("ko-KR")}`;
//     insertedAmount = insertedAmount - price;
//   }
// };

//투입 금액 인풋 채인지 핸들러
function onChangePrice(e: Event) {
  const target = e.target as HTMLInputElement;

  // 숫자만 유지
  const onlyNumbers = target.value.replace(/[^0-9]/g, "");
  // 세 자리마다 쉼표 추가
  const formattedValue = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  target.value = formattedValue;
  console.log(target.value);
}

// priceInput?.addEventListener("input", onChangePrice);

class ActionButton {
  //   private insertAmount: number;
  //   private remainingAmount: number;

  constructor({}) {}
  private creatButton() {
    const button = document.createElement("button");
    return button;
  }
  insertAction(value: string) {
    const insertButton = this.creatButton();
  }
  returnAction() {
    const returnButton = this.creatButton();
  }
}
