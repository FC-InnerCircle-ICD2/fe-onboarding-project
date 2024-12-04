import { VendingMachineStateType } from "../model/VendingMachineManager";
import { VendingMachineProduct } from "../model/VendingMachineProduct";

export type ControllerComponentType = {
  insertInput: HTMLInputElement | null;
  priceDisplay: HTMLElement | null;
  insertButton: HTMLButtonElement | null;
  returnButton: HTMLButtonElement | null;
  logsContainer: HTMLElement | null;
  productGroup: HTMLElement | null;
};
export type VendingMachineControllerType = {
  productData: VendingMachineItemType[];
  state: VendingMachineStateType;
  component: ControllerComponentType;
};
export type VendingMachineItemType = {
  id: number;
  name: string;
  price: number;
};
export type GeneratorProductButtonsType = {
  data: VendingMachineItemType[];
  container: HTMLElement | null;
};

export type ProductGroupType = {
  product: VendingMachineProduct;
  data: VendingMachineItemType;
};
