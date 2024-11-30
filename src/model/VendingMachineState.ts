type VendingMachineStateKeys =
  | "insertAmount"
  | "remainingAmount"
  | "displayPrice"
  | "purchaseState";

export class VendingMachineState {
  #state: Record<VendingMachineStateKeys, any>;
  #initialState: Record<VendingMachineStateKeys, any>;
  #listeners: (() => void)[];

  constructor() {
    this.#listeners = [];
    this.#initialState = {
      insertAmount: 0,
      remainingAmount: 0,
      displayPrice: 0,
      purchaseState: false,
    };

    this.#state = new Proxy(this.#initialState, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as VendingMachineStateKeys];
        }
        throw new Error(`Property "${prop}" does not exist on state.`);
      },
      set: (target, prop: string, value) => {
        if (prop in target) {
          target[prop as VendingMachineStateKeys] = value;
          this.notify();
          return true;
        }
        throw new Error(`Cannot set unknown property "${prop}" on state.`);
      },
    });
  }

  // 상태 변경 알림을 위한 리스너 관리
  addListener(listener: () => void) {
    this.#listeners.push(listener);
  }
  private notify() {
    for (const listener of this.#listeners) {
      listener();
    }
  }

  get state() {
    return this.#state;
  }
}
