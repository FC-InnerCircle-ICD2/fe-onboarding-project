import { GeneratorProductButtonsType, VendingMachineItemType } from "./model";
/**
 * 자판기 물품 버튼 생성 클래스
 */
export class GeneratorProductButtons {
  private data: VendingMachineItemType[];
  private container: HTMLElement | null;

  constructor({ data, container }: GeneratorProductButtonsType) {
    this.data = data;
    this.container = container;
  }

  render(): void {
    if (!this.container) return;

    this.data.forEach((item) => {
      const button = document.createElement("button");
      button.innerHTML = `<strong>${
        item.name
      }</strong> <br> <span>${item.price.toLocaleString("ko-KR")}원</span>`;
      this.container?.appendChild(button);
    });
  }
}

/**
 * 벤딩머신 작동 함수
 */

type StateType = "insertAmount" | "remainingAmount";
export class VendingMachine {
  /**투입 금액 */
  private insertAmount: number;
  /**남은 금액 */
  private remainingAmount: number;
  state: {
    insertAmount: number;
    remainingAmount: number;
  };
  constructor() {
    // 초기값 설정
    this.insertAmount = 0;
    this.remainingAmount = 0;

    // state 초기화
    this.state = {
      insertAmount: this.insertAmount,
      remainingAmount: this.remainingAmount,
    };
  }

  setState(name: StateType, value: number) {
    this.state[name] = value;
  }
}
const vm = new VendingMachine();
vm.state.insertAmount;
