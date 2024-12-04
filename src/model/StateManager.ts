// 오브젝트 형태로 타입 제한
export class StateManager<T extends Record<string, any>> {
  #state: T;
  #initialState: T;
  #listeners: (() => void)[];

  constructor(initialState: T) {
    this.#listeners = [];
    this.#initialState = initialState;

    this.#state = new Proxy(this.#initialState, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as keyof T];
        }
        throw new Error(`Property "${prop}" does not exist on state.`);
      },
      set: (target, prop: string, value) => {
        if (prop in target) {
          target[prop as keyof T] = value;
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
