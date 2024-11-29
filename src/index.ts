import { VendingMachineData } from "./mock/VendingMachineData";
import { VendingMachineState } from "./model/State";
import { VendingMachineController } from "./model/VendingMachine";
import "./styles/reset.css";
import "./styles/style.css";
const productGroup = document.getElementById("productGroup");
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

const state = new VendingMachineState();
const controller = new VendingMachineController({
  productData: VendingMachineData,
  state,
  component: {
    insertInput,
    priceDisplay,
    insertButton,
    returnButton,
    logsContainer,
    productGroup,
  },
});
controller.build();
