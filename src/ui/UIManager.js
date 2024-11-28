import { Display } from "./Display";
import { LogPanel } from "./LogPanel";

export class UIManager {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.display = new Display();
    this.logPanel = new LogPanel();
    this.currentTimeoutId = null; // 현재 활성화된 타이머 ID를 저장
  }

  initializeUI() {
    this.#initButton("insert-money", this.#handleInsertMoney);
    this.#initButton("return-money", this.#handleReturnMoney);
    this.#initProductButtons();
  }

  // 버튼 이벤트 등록
  #initButton(buttonId, handler) {
    const button = document.getElementById(buttonId);
    if (button) button.addEventListener("click", handler.bind(this));
  }

  // 제품 구매 버튼 초기화 및 이벤트 등록
  #initProductButtons() {
    const buttonsContainer = document.getElementById("buttons");
    const products = this.vendingMachine.getProducts();

    products.forEach((product) => {
      const button = this.#createProductButton(product);
      buttonsContainer.appendChild(button);
    });
  }

  // 제품 버튼 생성
  #createProductButton(product) {
    const button = document.createElement("button");
    button.className = "product";
    button.innerHTML = `<strong>${
      product.name
    }</strong><br /><small>${product.price.toLocaleString()}원</small>`;
    button.addEventListener("click", () => this.#handlePurchase(product));
    return button;
  }

  // 금액 투입
  #handleInsertMoney() {
    const moneyInput = document.getElementById("money-input");
    const money = parseInt(moneyInput.value, 10);

    this.#handleTransaction(
      () => this.vendingMachine.addBalance(money),
      `${money}원을 투입했습니다.`,
    );

    moneyInput.value = 0;
  }

  // 금액 반환
  #handleReturnMoney() {
    const balance = this.vendingMachine.getBalance();

    this.#handleTransaction(
      () => this.vendingMachine.resetBalance(),
      `${balance}원을 반환했습니다.`,
    );
  }

  // 제품 구매
  #handlePurchase(product) {
    const balance = this.vendingMachine.getBalance();

    this.#handleTransaction(
      () => this.vendingMachine.purchaseProduct(product),
      `${product.name}을 구매했습니다.`,
      () => {
        // 이전 타이머가 있으면 취소
        if (this.currentTimeoutId) {
          clearTimeout(this.currentTimeoutId);
          this.currentTimeoutId = null;
        }

        // 구매 실패 시, 가격을 표시하고 1.5초 뒤 잔액을 다시 표시
        this.display.update(product.price);
        this.currentTimeoutId = setTimeout(() => {
          this.display.update(this.vendingMachine.getBalance());
          this.currentTimeoutId = null; // 타이머 완료 후 초기화
        }, 1500);
      },
    );
  }

  // 거래 처리 및 로깅
  #handleTransaction(transaction, successLogMessage, errorCallback = null) {
    try {
      transaction();
      this.display.update(this.vendingMachine.getBalance());
      this.logPanel.addLog(successLogMessage);
    } catch (e) {
      this.display.update(this.vendingMachine.getBalance());
      this.logPanel.addLog(e.message);

      if (errorCallback) {
        errorCallback();
      }
    }
  }
}