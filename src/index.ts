import { Controller, State } from "./class";
import { VendingMachineData } from "./mockData";
import "./reset.css";
import "./style.css";
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

const state = new State();
const controller = new Controller({
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
