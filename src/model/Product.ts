export class VendingMachineProduct {
  private _disabled: boolean;
  private _item: HTMLButtonElement;
  constructor() {
    this._disabled = false;
    this._item = document.createElement("button");
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }

  get item() {
    return this._item;
  }
  setItemState({ disabled = false }: { disabled?: boolean }) {
    this._item.disabled = disabled;
  }
  innerHTML(innerHTML: string) {
    this._item.innerHTML = innerHTML;
  }
}
