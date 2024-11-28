// import { _VendingMachine, VendingMachine, VendingMachineState } from "./class";
// import { VendingMachineData } from "./mockData";
// const buttonGroup = document.getElementById("buttonGroup");
// const priceViewPannel = document.getElementById("priceViewPannel");
// const insertAmountInput = document.getElementById(
//   "insertInput"
// ) as HTMLInputElement | null;
// const insertButton = document.getElementById(
//   "insertButton"
// ) as HTMLButtonElement | null;
// const returnButton = document.getElementById(
//   "returnButton"
// ) as HTMLButtonElement | null;
// const logContainer = document.getElementById("logContainer");
// const vm = new VendingMachine({
//   components: {
//     insertAmountInput,
//     insertButton,
//     returnButton,
//     priceViewPannel,
//     logContainer,
//   },
//   product: {
//     data: VendingMachineData,
//     container: buttonGroup,
//   },
// });

// if (returnActionButton) returnActionButton.disabled = true;
// vm.productButtonsRender();
// insertAmountInput?.addEventListener("input", (e) => vm.onChangePrice(e));
// insertActionButton?.addEventListener("click", () => {
//   vm.insertAction();
// });

// returnActionButton?.addEventListener("click", () => {
//   vm.returnAction();
// });

import { Product, Controller, State } from "./class";
import { VendingMachineData } from "./mockData";
import { ProductGroupType, VendingMachineItemType } from "./model";

const buttonGroup = document.getElementById("buttonGroup");
const insertInput = document.getElementById(
  "insertInput"
) as HTMLInputElement | null;
const priceDisplay = document.getElementById("priceDisplay");
const insertButton = document.getElementById(
  "insertButton"
) as HTMLButtonElement | null;
const returnButton = document.getElementById(
  "returnButton"
) as HTMLButtonElement | null;
const logsContainer = document.getElementById("logsContainer");

//초기 상태 설정
if (priceDisplay) priceDisplay.innerText = "0";
if (insertButton) insertButton.disabled = true;
if (returnButton) returnButton.disabled = true;

const state = new State();
const controller = new Controller({
  // productData: VendingMachineData,
  state,
  component: {
    insertInput,
    priceDisplay,
    insertButton,
    returnButton,
    logsContainer,
  },
});

const productGroup: ProductGroupType[] = [];
const productItemsRender = () => {
  VendingMachineData.forEach((data) => {
    const node = { product: new Product(), data };
    const { name, price } = data;
    node.product.innerHTML(`
        <strong>${data.name}</strong></br>
        <span>${data.price}</span>
        `);

    node.product.item.addEventListener("click", () => {
      if (state.purchaseState) {
        controller.purchase({ name, price });
      }
      // controller.onProduct(node);
    });

    productGroup.push(node);
    buttonGroup?.append(node.product.item);
  });
};

productItemsRender();

controller.onChangeInsert();
controller.insert();
controller.return();

state.addListener(() => {
  console.log("remainingAmount", state.remainingAmount);
  productGroup.forEach((product) => {
    product.product.setItemState({
      disabled: state.purchaseState
        ? product.data.price > state.remainingAmount
        : false,
    });
  });
  if (insertButton)
    insertButton.disabled =
      insertInput?.value === "0" || insertInput?.value === "";

  if (returnButton) returnButton.disabled = state.remainingAmount === 0;
});