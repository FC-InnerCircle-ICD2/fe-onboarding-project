export class VendingMachineProduct {
  #disabled: boolean;
  #item: HTMLButtonElement;
  constructor() {
    this.#disabled = false;
    this.#item = document.createElement("button");
  }
  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
  }

  get item() {
    return this.#item;
  }
  setItemState({ disabled = false }: { disabled?: boolean }) {
    this.#item.disabled = disabled;
  }
  innerHTML(innerHTML: string) {
    this.#item.innerHTML = innerHTML;
  }
}
