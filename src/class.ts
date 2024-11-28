import { convertPriceFormat } from "./function";
import { ProductGroupType, VendingMachineItemType } from "./model";

export class State {
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

type ControllerComponentType = {
  insertInput: HTMLInputElement | null;
  priceDisplay: HTMLElement | null;
  insertButton: HTMLButtonElement | null;
  returnButton: HTMLButtonElement | null;
  logsContainer: HTMLElement | null;
  productGroup: HTMLElement | null;
};
type VendingMachineControllerType = {
  productData: VendingMachineItemType[];
  state: State;
  component: ControllerComponentType;
};
export class Controller {
  private productData: VendingMachineItemType[];
  private state: State;
  private component: ControllerComponentType;
  private insertInput: ControllerComponentType["insertInput"];
  private priceDisplay: ControllerComponentType["priceDisplay"];
  private insertButton: ControllerComponentType["insertButton"];
  private returnButton: ControllerComponentType["returnButton"];
  private logsContainer: ControllerComponentType["logsContainer"];
  private productGroup: ControllerComponentType["productGroup"];
  private productGroupData: ProductGroupType[];

  constructor({ productData, state, component }: VendingMachineControllerType) {
    this.productData = productData;
    this.state = state;
    this.component = component;
    this.insertInput = component.insertInput;
    this.priceDisplay = component.priceDisplay;
    this.insertButton = component.insertButton;
    this.returnButton = component.returnButton;
    this.logsContainer = component.logsContainer;
    this.productGroup = component.productGroup;
    this.productGroupData = [];
  }

  //input onChange
  onChangeInsert() {
    if (this.insertInput)
      this.insertInput.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        //숫자만
        const onlyNumbers = String(target.value).replace(/[^0-9]/g, "");
        //세 자리마다 쉼표
        const formattedValue = onlyNumbers.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        target.value = formattedValue;
        // console.log({ value: onlyNumbers, formattedValue });
        this.state.insertAmount = Number(onlyNumbers);
      });
  }
  //금액 투입
  insert() {
    if (this.insertButton) {
      this.insertButton.addEventListener("click", () => {
        this.state.purchaseState = true;
        this.state.remainingAmount += this.state.insertAmount;

        this.displayPrice(String(this.state.remainingAmount));
        if (this.insertInput) {
          this.insertInput.value = "";
        }
        // 상태 업데이트
        this.addLog(
          `${convertPriceFormat(
            String(this.state.insertAmount)
          )}원을 투입했습니다.`
        );
        this.state.insertAmount = 0; // 투입 금액 초기화
      });
    }
  }
  return() {
    if (this.returnButton) {
      // 반환 버튼 클릭
      this.returnButton.addEventListener("click", () => {
        this.state.purchaseState = false;
        // 로그 찍기
        this.addLog(
          `${convertPriceFormat(
            String(this.state.remainingAmount)
          )}원이 반환되었습니다.`
        );
        // this.state.remainingAmount 초기화
        this.state.remainingAmount = 0;
        // this.priceDisplay innerText의 초기화
        if (this.priceDisplay) {
          this.priceDisplay.innerText = String(this.state.remainingAmount);
        }
        // this.insertInput에 포커싱
        if (this.insertInput) {
          this.insertInput.focus();
        }
      });
    }
  }
  //로그 찍기 함수
  addLog(log: string) {
    if (this.logsContainer) {
      const li = document.createElement("li");
      li.innerText = `${log}`;
      this.logsContainer?.append(li);
      console.log({
        scrollHeight: this.logsContainer.scrollHeight,
        clientHeight: this.logsContainer.clientHeight,
      });
      const scrollHeight = this.logsContainer.scrollHeight;
      this.logsContainer.scrollTo({
        left: 0,
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }

  //자판기 아이템 구입
  purchase({ name, price }: Omit<VendingMachineItemType, "id">) {
    const newAmount = this.state.remainingAmount - price;
    this.state.remainingAmount = newAmount;
    this.displayPrice(this.state.remainingAmount);
    this.addLog(`${name}을 구입했습니다.`);
  }
  displayPrice(price: number | string) {
    if (this.priceDisplay) {
      this.priceDisplay.innerText = convertPriceFormat(String(price));
    }
  }
  //자판기 아이템 생성
  generatorProducts() {
    const productItemsRender = () => {
      this.productData.forEach((data, index) => {
        const node = { product: new Product(), data };
        const { name, price } = data;
        node.product.item.classList.add("vendingMachine_product_item");
        node.product.innerHTML(`
      <strong class="vendingMachine_product_item_name">${data.name}</strong>
      <span class="vendingMachine_product_item_price">${convertPriceFormat(
        String(data.price)
      )}원</span>
      `);

        const item = node.product.item;

        const updateEvent = () => {
          // 구매 상태일 때 이벤트
          item.addEventListener("click", () => {
            if (this.state.purchaseState) {
              this.purchase({ name, price });
            }
          });
          // 구매 상태가 아닐 때 이벤트
          item.addEventListener("mousedown", () => {
            if (!this.state.purchaseState) {
              this.displayPrice(price);
            }
          });
          item.addEventListener("mouseup", () => {
            if (!this.state.purchaseState) {
              this.displayPrice(0);
            }
          });
          item.addEventListener("mouseleave", () => {
            if (!this.state.purchaseState) {
              this.displayPrice(0);
            }
          });
          item.addEventListener("keypress", (e) => {
            if (!this.state.purchaseState) {
              if (e.key === "Enter") {
                this.displayPrice(price);
              }
            }
          });
          item.addEventListener("keyup", (e) => {
            if (!this.state.purchaseState) {
              if (e.key === "Enter") {
                this.displayPrice(0);
              }
            }
          });
          item.addEventListener("touchstart", () => {
            if (!this.state.purchaseState) {
              this.displayPrice(price);
            }
          });
          item.addEventListener("touchend", () => {
            if (!this.state.purchaseState) {
              this.displayPrice(0);
            }
          });
        };
        updateEvent();

        this.productGroupData.push(node);
        if (this.productGroup) this.productGroup?.append(node.product.item);
      });
    };
    productItemsRender();
  }
  updateState() {
    this.state.addListener(() => {
      console.log("state", this.state);
      this.productGroupData.forEach((product) => {
        product.product.setItemState({
          disabled: this.state.purchaseState
            ? product.data.price > this.state.remainingAmount
            : false,
        });
      });
      if (this.insertButton)
        this.insertButton.disabled =
          this.insertInput?.value === "0" || this.insertInput?.value === "";

      if (this.returnButton)
        this.returnButton.disabled = this.state.remainingAmount === 0;
    });
  }

  //자판기 빌드
  build() {
    //초기 상태 설정
    if (this.priceDisplay) this.priceDisplay.innerText = "0";
    if (this.insertInput) this.insertInput.maxLength = 7;
    if (this.insertButton) this.insertButton.disabled = true;
    if (this.returnButton) this.returnButton.disabled = true;
    this.generatorProducts();
    this.onChangeInsert();
    this.insert();
    this.return();
    this.updateState();
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
