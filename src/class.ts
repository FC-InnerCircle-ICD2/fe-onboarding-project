import { VendingMachineData } from "./mockData";
import { VendingMachineItemType } from "./model";
/**
 * 자판기 물품 버튼 생성 클래스
 */

function formmatedNumber(value: string) {
  return Number(value.replace(/,/g, ""));
}
function formmatedPrice(value: string) {
  // 숫자만
  const onlyNumbers = String(value).replace(/[^0-9]/g, "");
  // 세 자리마다 쉼표 추가
  const formattedValue = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
}

/**
 * 벤딩머신 작동 함수
 */

type StateType = "insertAmount" | "remainingAmount";

type VendingMachineComponentType = {
  insertAmountInput: HTMLInputElement | null;
  insertActionButton: HTMLButtonElement | null;
  returnActionButton: HTMLButtonElement | null;
  priceViewPannel: HTMLElement | null;
  logContainer: HTMLElement | null;
};

type ProductType = {
  data: VendingMachineItemType[];
  container: HTMLElement | null;
};
export class VendingMachine {
  /**투입 금액 */
  private insertAmount: string;
  /**남은 금액 */
  private remainingAmount: string;
  private components: VendingMachineComponentType;
  private product: ProductType;
  state: {
    insertAmount: string;
    remainingAmount: string;
  };
  logData: string[];

  constructor({
    components,
    product,
  }: {
    components: VendingMachineComponentType;
    product: ProductType;
  }) {
    // 초기값 설정
    this.insertAmount = "";
    this.remainingAmount = "0";
    this.components = components;
    this.product = product;
    // state 초기화
    this.state = {
      insertAmount: this.insertAmount,
      remainingAmount: this.remainingAmount,
    };
    this.logData = [];
  }

  setState(name: StateType, value: string) {
    this.state[name] = value;
  }

  /**
   * 투입 금액 인풋 채인지 핸들러
   */
  onChangePrice(e: Event) {
    const target = e.target as HTMLInputElement;

    target.value = formmatedPrice(target.value);
    this.setState("insertAmount", formmatedPrice(target.value));
  }

  /**
   * 금액 투입 액션
   */
  insertAction() {
    const { priceViewPannel, insertAmountInput, returnActionButton } =
      this.components;
    const { container } = this.product;

    if (priceViewPannel) {
      priceViewPannel.innerText = `${this.state.insertAmount}원`;
      this.setState("remainingAmount", this.state.insertAmount);
      this.record(`${this.state.insertAmount}원을 투입했습니다.`);
    }
    if (insertAmountInput) {
      const input = insertAmountInput as HTMLInputElement;
      input.value = "";
    }
    if (returnActionButton) {
      const condition = this.state.remainingAmount !== "0";
      returnActionButton.disabled = !condition;
    }
    //버튼 조건부 disabled
    const remainingAmount = formmatedNumber(this.state.remainingAmount);
    container?.childNodes.forEach((node, index) => {
      if (node instanceof HTMLButtonElement) {
        const price = this.product.data[index].price;

        node.disabled = remainingAmount < price; // 남은 금액이 price보다 작으면 disabled
      }
    });
  }
  /**
   * 금액 반환 액션
   */
  returnAction() {
    const { priceViewPannel, returnActionButton } = this.components;
    const button = returnActionButton as HTMLButtonElement;

    this.record(`${this.state.remainingAmount}원을 반환합니다`);
    this.setState("remainingAmount", "0");
    if (priceViewPannel) priceViewPannel.innerText = "";
    button.disabled = this.state.remainingAmount === "0";
  }

  purchase({ name, price }: { name: string; price: number }) {
    const { priceViewPannel } = this.components;
    const { container } = this.product;
    const newRemainingAmount =
      formmatedNumber(this.state.remainingAmount) - price;

    if (newRemainingAmount < 0) {
      alert("잔액이 부족합니다!");
      return;
    }

    //버튼 조건부 disabled
    const remainingAmount = formmatedNumber(this.state.remainingAmount);
    console.log({ remainingAmount });
    container?.childNodes.forEach((node, index) => {
      if (node instanceof HTMLButtonElement) {
        // HTMLButtonElement만 처리
        const price = this.product.data[index].price;

        node.disabled = newRemainingAmount < price; // 남은 금액이 price보다 작으면 disabled
      }
    });

    this.setState(
      "remainingAmount",
      formmatedPrice(newRemainingAmount.toLocaleString("ko-KR"))
    );

    if (priceViewPannel) priceViewPannel.innerText = this.state.remainingAmount;
    this.record(`${name}을 구입했습니다`);
  }
  /**
   * 상품 버튼 렌더
   */
  productButtonsRender() {
    const { container, data } = this.product;
    if (!container) return;

    data.forEach((item) => {
      const button = document.createElement("button");
      button.innerHTML = `<strong>${
        item.name
      }</strong> <br> <span>${item.price.toLocaleString("ko-KR")}원</span>`;

      //버튼 disbled 초기값 true 설정
      button.setAttribute("disabled", "true");
      button.addEventListener("click", (e) => {
        this.purchase({ name: item.name, price: item.price });
      });

      container?.appendChild(button);
    });
  }

  /**
   * 로그 기록
   */
  record(log: string) {
    this.logData.unshift(log);
    // 새 로그만 추가
    const { logContainer } = this.components;
    if (!logContainer) return;

    const li = document.createElement("li");
    li.innerText = log;
    logContainer.insertBefore(li, logContainer.firstChild);
  }
  /**
   * 로그 DOM렌더
   */
  renderLog() {
    const { logContainer } = this.components;
    if (!logContainer) {
      console.log(`renderLog함수의 target이 없습니다.`);
      return;
    }
    logContainer.innerHTML = "";
    this.logData.forEach((data) => {
      const li = document.createElement("li");
      li.innerText = `${data}`;
      logContainer.appendChild(li);
    });
  }
}
