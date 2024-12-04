import { VendingMachineData } from "./mock/VendingMachineData";
import { StateManager } from "./model/StateManager";
import { VendingMachineManager } from "./model/VendingMachineManager";
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

export type InitialStateType = {
  insertAmount: number;
  remainingAmount: number;
  displayPrice: number;
  purchaseState: boolean;
};

const initialState = {
  insertAmount: 0,
  remainingAmount: 0,
  displayPrice: 0,
  purchaseState: false,
};
const state = new StateManager<InitialStateType>(initialState);
const controller = new VendingMachineManager({
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
