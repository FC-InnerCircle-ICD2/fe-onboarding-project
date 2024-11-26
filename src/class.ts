// import { VendingMachineData } from "./mockData";
// import { VendingMachineItemType } from "./model";
// /**
//  * 자판기 물품 버튼 생성 클래스
//  */

import { VendingMachineItemType } from "./model";

// function formmatedNumber(value: string) {
//   return Number(value.replace(/,/g, ""));
// }
// function formmatedPrice(value: string) {
//   // 숫자만
//   const onlyNumbers = String(value).replace(/[^0-9]/g, "");
//   // 세 자리마다 쉼표 추가
//   const formattedValue = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return formattedValue;
// }

// /**
//  * 벤딩머신 작동 함수
//  */

// type StateType = "insertAmount" | "remainingAmount";

// type VendingMachineComponentType = {
//   insertAmountInput: HTMLInputElement | null;
//   insertActionButton: HTMLButtonElement | null;
//   returnActionButton: HTMLButtonElement | null;
//   priceViewPannel: HTMLElement | null;
//   logContainer: HTMLElement | null;
// };

// type ProductType = {
//   data: VendingMachineItemType[];
//   container: HTMLElement | null;
// };
// export class VendingMachine {
//   /**투입 금액 */
//   private insertAmount: string;
//   /**남은 금액 */
//   private remainingAmount: string;
//   private components: VendingMachineComponentType;
//   private product: ProductType;
//   state: {
//     insertAmount: string;
//     remainingAmount: string;
//   };
//   logData: string[];

//   constructor({
//     components,
//     product,
//   }: {
//     components: VendingMachineComponentType;
//     product: ProductType;
//   }) {
//     // 초기값 설정
//     this.insertAmount = "";
//     this.remainingAmount = "0";
//     this.components = components;
//     this.product = product;
//     // state 초기화
//     this.state = {
//       insertAmount: this.insertAmount,
//       remainingAmount: this.remainingAmount,
//     };
//     this.logData = [];
//   }

//   setState(name: StateType, value: string) {
//     this.state[name] = value;
//   }

//   /**
//    * 투입 금액 인풋 채인지 핸들러
//    */
//   onChangePrice(e: Event) {
//     const target = e.target as HTMLInputElement;

//     target.value = formmatedPrice(target.value);
//     this.setState("insertAmount", formmatedPrice(target.value));
//   }

//   /**
//    * 금액 투입 액션
//    */
//   insertAction() {
//     const { priceViewPannel, insertAmountInput, returnActionButton } =
//       this.components;
//     const { container } = this.product;

//     if (priceViewPannel) {
//       priceViewPannel.innerText = `${this.state.insertAmount}원`;
//       this.setState("remainingAmount", this.state.insertAmount);
//       this.record(`${this.state.insertAmount}원을 투입했습니다.`);
//     }
//     if (insertAmountInput) {
//       const input = insertAmountInput as HTMLInputElement;
//       input.value = "";
//     }
//     if (returnActionButton) {
//       const condition = this.state.remainingAmount !== "0";
//       returnActionButton.disabled = !condition;
//     }
//     //버튼 조건부 disabled
//     const remainingAmount = formmatedNumber(this.state.remainingAmount);
//     container?.childNodes.forEach((node, index) => {
//       if (node instanceof HTMLButtonElement) {
//         const price = this.product.data[index].price;

//         node.disabled = remainingAmount < price; // 남은 금액이 price보다 작으면 disabled
//       }
//     });
//   }
//   /**
//    * 금액 반환 액션
//    */
//   returnAction() {
//     const { priceViewPannel, returnActionButton } = this.components;
//     const button = returnActionButton as HTMLButtonElement;

//     this.record(`${this.state.remainingAmount}원을 반환합니다`);
//     this.setState("remainingAmount", "0");
//     if (priceViewPannel) priceViewPannel.innerText = "";
//     button.disabled = this.state.remainingAmount === "0";
//   }

//   purchase({ name, price }: { name: string; price: number }) {
//     const { priceViewPannel } = this.components;
//     const { container } = this.product;
//     const newRemainingAmount =
//       formmatedNumber(this.state.remainingAmount) - price;

//     if (newRemainingAmount < 0) {
//       alert("잔액이 부족합니다!");
//       return;
//     }

//     //버튼 조건부 disabled
//     const remainingAmount = formmatedNumber(this.state.remainingAmount);
//     console.log({ remainingAmount });
//     container?.childNodes.forEach((node, index) => {
//       if (node instanceof HTMLButtonElement) {
//         // HTMLButtonElement만 처리
//         const price = this.product.data[index].price;

//         node.disabled = newRemainingAmount < price; // 남은 금액이 price보다 작으면 disabled
//       }
//     });

//     this.setState(
//       "remainingAmount",
//       formmatedPrice(newRemainingAmount.toLocaleString("ko-KR"))
//     );

//     if (priceViewPannel) priceViewPannel.innerText = this.state.remainingAmount;
//     this.record(`${name}을 구입했습니다`);
//   }
//   /**
//    * 상품 버튼 렌더
//    */
//   productButtonsRender() {
//     const { container, data } = this.product;
//     if (!container) return;

//     data.forEach((item) => {
//       const button = document.createElement("button");
//       button.innerHTML = `<strong>${
//         item.name
//       }</strong> <br> <span>${item.price.toLocaleString("ko-KR")}원</span>`;

//       //버튼 disbled 초기값 true 설정
//       button.setAttribute("disabled", "true");
//       button.addEventListener("click", (e) => {
//         this.purchase({ name: item.name, price: item.price });
//       });

//       container?.appendChild(button);
//     });
//   }

//   /**
//    * 로그 기록
//    */
//   record(log: string) {
//     this.logData.unshift(log);
//     // 새 로그만 추가
//     const { logContainer } = this.components;
//     if (!logContainer) return;

//     const li = document.createElement("li");
//     li.innerText = log;
//     logContainer.insertBefore(li, logContainer.firstChild);
//   }
//   /**
//    * 로그 DOM렌더
//    */
//   renderLog() {
//     const { logContainer } = this.components;
//     if (!logContainer) {
//       console.log(`renderLog함수의 target이 없습니다.`);
//       return;
//     }
//     logContainer.innerHTML = "";
//     this.logData.forEach((data) => {
//       const li = document.createElement("li");
//       li.innerText = `${data}`;
//       logContainer.appendChild(li);
//     });
//   }
// }

export class VendingMachineState {
  private _listeners: (() => void)[];
  private _insertAmout: number;
  private _remainingAmount: number;
  private _displayPrice: number;

  constructor() {
    this._listeners = [];
    this._insertAmout = 0;
    this._remainingAmount = 0;
    this._displayPrice = 0;
  }

  addListener(listener: () => void) {
    console.log("Listener added"); // 디버깅 로그 추가
    this._listeners.push(listener);
  }
  private notify() {
    console.log("notify called with listeners:", this._listeners.length);
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
}

export class Product {
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

type ControllerComponentType = {
  insertInput: HTMLInputElement | null;
  priceDisplay: HTMLElement | null;
  insertButton: HTMLButtonElement | null;
  returnButton: HTMLButtonElement | null;
};
type VendingMachineControllerType = {
  state: VendingMachineState;
  component: ControllerComponentType;
};
export class VendingMachineController {
  private state: VendingMachineState;
  private component: ControllerComponentType;
  private insertInput: ControllerComponentType["insertInput"];
  private priceDisplay: ControllerComponentType["priceDisplay"];
  private insertButton: ControllerComponentType["insertButton"];
  private returnButton: ControllerComponentType["returnButton"];
  constructor({ state, component }: VendingMachineControllerType) {
    this.state = state;
    this.component = component;
    this.insertInput = component.insertInput;
    this.priceDisplay = component.priceDisplay;
    this.insertButton = component.insertButton;
    this.returnButton = component.returnButton;
  }

  onChangeInsert() {
    if (this.insertInput)
      this.insertInput.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        //숫자만
        const onlyNumbers = String(value).replace(/[^0-9]/g, "");
        //세 자리마다 쉼표
        const formattedValue = onlyNumbers.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        console.log({ value: onlyNumbers, formattedValue });
        this.state.insertAmount = Number(onlyNumbers);
      });
  }
  insert() {
    if (this.insertButton) {
      this.insertButton.addEventListener("click", () => {
        console.log("Insert button clicked"); // 디버깅 로그 추가
        if (this.priceDisplay) {
          this.priceDisplay.innerText = String(this.state.insertAmount);
        }
        if (this.insertInput) {
          this.insertInput.value = "";
        }
        // 상태 업데이트
        console.log("Updating state.insertAmount"); // 디버깅 로그 추가
        this.state.remainingAmount += this.state.insertAmount;
        this.state.insertAmount = 0; // 투입 금액 초기화
      });
    }
  }
  return() {}
}
export class VendingMachine {
  constructor() {}
}
