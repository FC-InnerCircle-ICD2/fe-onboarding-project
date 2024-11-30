import { convertPriceFormat } from "../shared/priceFormat";
import type {
  ControllerComponentType,
  ProductGroupType,
  VendingMachineControllerType,
  VendingMachineItemType,
} from "../types";
import { VendingMachineProduct } from "./VendingMachineProduct";
import { VendingMachineState } from "./VendingMachineState";

export class VendingMachineManager {
  private productData: VendingMachineItemType[];
  private state: VendingMachineState;
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
    this.insertInput?.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      //숫자만
      const onlyNumbers = target.value.replace(/\D/g, "");
      //세 자리마다 쉼표
      const formattedValue = Number(onlyNumbers).toLocaleString("ko-KR");
      target.value = formattedValue;
      // console.log({ value: onlyNumbers, formattedValue });
      this.state.insertAmount = Number(onlyNumbers);
    });
  }
  //금액 투입
  insert() {
    this.insertButton?.addEventListener("click", () => {
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
  return() {
    // 반환 버튼 클릭
    this.returnButton?.addEventListener("click", () => {
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
      if (!this.priceDisplay) return;
      this.priceDisplay.innerText = String(this.state.remainingAmount);

      // this.insertInput에 포커싱
      if (!this.insertInput) return;
      this.insertInput.focus();
    });
  }
  //로그 찍기 함수
  addLog(log: string) {
    if (!this.logsContainer) return;
    const li = document.createElement("li");
    li.innerText = `${log}`;
    this.logsContainer.append(li);
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

  //자판기 아이템 구입
  purchase({ name, price }: Omit<VendingMachineItemType, "id">) {
    const newAmount = this.state.remainingAmount - price;
    this.state.remainingAmount = newAmount;
    this.displayPrice(this.state.remainingAmount);
    this.addLog(`${name}을 구입했습니다.`);
  }
  displayPrice(price: number | string) {
    if (!this.priceDisplay) return;
    this.priceDisplay.innerText = convertPriceFormat(String(price));
  }
  //자판기 아이템 생성
  generatorProducts() {
    const productItemsRender = () => {
      for (const data of this.productData) {
        const node = { product: new VendingMachineProduct(), data };
        const { name, price } = data;
        node.product.item.classList.add("vendingMachine_product_item");
        node.product.item.dataset.productName = name;
        node.product.item.dataset.productPrice = String(price);
        node.product.innerHTML(`
        <strong class="vendingMachine_product_item_name">${data.name}</strong>
        <span class="vendingMachine_product_item_price">${convertPriceFormat(
          String(data.price)
        )}원</span>
        `);

        this.productGroupData.push(node);
        this.productGroup?.append(node.product.item);
      }
    };

    const productEventHandler = () => {
      const handleEvent = (event: Event) => {
        const target = event.target as HTMLElement;
        const productItem = target.closest<HTMLButtonElement>(
          ".vendingMachine_product_item"
        );

        const name = productItem?.dataset.productName;
        const price = Number(productItem?.dataset.productPrice);

        if (!name || isNaN(price)) return;

        if (this.state.purchaseState) {
          // 구매 상태인 경우 클릭 이벤트 처리
          if (event.type === "click") {
            this.purchase({ name, price });
          }
        } else {
          // 구매 상태가 아닌 경우 이벤트 유형에 따른 처리
          switch (event.type) {
            case "mousedown":
            case "touchstart":
              this.displayPrice(price);
              break;
            case "mouseup":
            case "mouseleave":
            case "touchend":
              this.displayPrice(0);
              break;
            case "keypress":
              if ((event as KeyboardEvent).key === "Enter") {
                this.displayPrice(price);
              }
              break;
            case "keyup":
              if ((event as KeyboardEvent).key === "Enter") {
                this.displayPrice(0);
              }
              break;
          }
        }
      };

      // 부모 요소에 단일 이벤트 리스너 등록
      const eventTypes = [
        "click",
        "mousedown",
        "mouseup",
        "mouseleave",
        "keypress",
        "keyup",
        "touchstart",
        "touchend",
      ];

      for (const eventType of eventTypes) {
        this.productGroup?.addEventListener(eventType, handleEvent);
      }
    };
    productEventHandler();
    productItemsRender();
  }
  updateState() {
    this.state.addListener(() => {
      if (!this.insertButton) return;
      if (!this.returnButton) return;

      console.log("state", this.state);

      for (const product of this.productGroupData) {
        product.product.setItemState({
          disabled: this.state.purchaseState
            ? product.data.price > this.state.remainingAmount
            : false,
        });
      }

      this.insertButton.disabled =
        this.insertInput?.value === "0" || this.insertInput?.value === "";

      this.returnButton.disabled = this.state.remainingAmount === 0;
    });
  }

  //자판기 빌드
  build() {
    //초기 상태 설정
    if (this.priceDisplay) this.priceDisplay.innerText = "0";
    if (this.insertInput) this.insertInput.maxLength = 7; //999,999까지
    if (this.insertButton) this.insertButton.disabled = true;
    if (this.returnButton) this.returnButton.disabled = true;
    this.generatorProducts();
    this.onChangeInsert();
    this.insert();
    this.return();
    this.updateState();
  }
}
