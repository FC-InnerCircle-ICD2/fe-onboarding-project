import { Product } from "./class";

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
  product: Product;
  data: VendingMachineItemType;
};
