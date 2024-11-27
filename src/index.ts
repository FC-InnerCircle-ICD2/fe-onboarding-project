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

import {
  Product,
  VendingMachine,
  VendingMachineController,
  VendingMachineState,
} from "./class";
import { VendingMachineData } from "./mockData";
import { VendingMachineItemType } from "./model";

const buttonGroup = document.getElementById("buttonGroup");
const insertInput = document.getElementById(
  "insertInput"
) as HTMLInputElement | null;
const priceDisplay = document.getElementById("priceDisplay");
if (priceDisplay) priceDisplay.innerText = "0";
const insertButton = document.getElementById(
  "insertButton"
) as HTMLButtonElement | null;
const returnButton = document.getElementById(
  "returnButton"
) as HTMLButtonElement | null;

const state = new VendingMachineState();
const controller = new VendingMachineController({
  state,
  component: {
    insertInput,
    priceDisplay,
    insertButton,
    returnButton,
  },
});

const productGroup: {
  product: Product;
  data: VendingMachineItemType;
}[] = [];
const productItemsRender = () => {
  VendingMachineData.forEach((data) => {
    const product = new Product();
    product.innerHTML(`
        <strong>${data.name}</strong></br>
        <span>${data.price}</span>
        `);
    productGroup.push({ product, data });
    buttonGroup?.append(product.item);
  });
};

productItemsRender();

controller.onChangeInsert();
controller.insert();
console.log(state.remainingAmount);

state.addListener(() => {
  productGroup.forEach((product) => {
    console.log(product.data.price > state.remainingAmount);
    product.product.setItemState({
      disabled: product.data.price > state.remainingAmount,
    });
  });
});
