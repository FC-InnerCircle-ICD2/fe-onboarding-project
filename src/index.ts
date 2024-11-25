import { VendingMachine } from "./class";
import { VendingMachineData } from "./mockData";
const buttonGroup = document.getElementById("buttonGroup");
const priceViewPannel = document.getElementById("priceViewPannel");
const insertAmountInput = document.getElementById(
  "priceInput"
) as HTMLInputElement | null;
const insertActionButton = document.getElementById(
  "insertActionButton"
) as HTMLButtonElement | null;
const returnActionButton = document.getElementById(
  "returnActionButton"
) as HTMLButtonElement | null;
const logContainer = document.getElementById("logContainer");
const vm = new VendingMachine({
  components: {
    insertAmountInput,
    insertActionButton,
    returnActionButton,
    priceViewPannel,
    logContainer,
  },
  product: {
    data: VendingMachineData,
    container: buttonGroup,
  },
});

if (returnActionButton) returnActionButton.disabled = true;
vm.productButtonsRender();
insertAmountInput?.addEventListener("input", (e) => vm.onChangePrice(e));
insertActionButton?.addEventListener("click", () => {
  vm.insertAction();
});

returnActionButton?.addEventListener("click", () => {
  vm.returnAction();
});
