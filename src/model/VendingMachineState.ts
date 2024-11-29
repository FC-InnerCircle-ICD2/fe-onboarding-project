export class VendingMachineState {
  private _listeners: (() => void)[];
  private _insertAmout: number;
  private _remainingAmount: number;
  private _displayPrice: number;
  /**자판기 사용 상태인지 */
  private _purchaseState: boolean;

  constructor() {
    this._listeners = [];
    this._insertAmout = 0;
    this._remainingAmount = 0;
    this._displayPrice = 0;
    this._purchaseState = false;
  }

  addListener(listener: () => void) {
    this._listeners.push(listener);
  }
  private notify() {
    console.log("this._listeners.length", this._listeners.length);
    this._listeners.forEach((listener) => listener());
  }

  get insertAmount() {
    return this._insertAmout;
  }
  set insertAmount(value: number) {
    this._insertAmout = value;
    this.notify();
  }
  get remainingAmount() {
    return this._remainingAmount;
  }
  set remainingAmount(value: number) {
    this._remainingAmount = value;
    this.notify();
  }
  get displayPrice() {
    return this._displayPrice;
  }
  set displayPrice(value: number) {
    this._displayPrice = value;
    this.notify();
  }
  get purchaseState() {
    return this._purchaseState;
  }
  set purchaseState(value: boolean) {
    this._purchaseState = value;
    this.notify();
  }
}
