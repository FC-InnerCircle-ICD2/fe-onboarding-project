import CurrentBalance from "./CurrentBalance";
import LogManager from "./LogManager";
import ProductButtonManager from "./ProductButtonManager";

/**
 * @typedef {Object} Product
 * @property {string} name - 상품 이름
 * @property {number} price - 상품 가격
 */

class VendingMachine {
  /**
   * @param {string} machineId - 자판기 DOM 요소의 ID
   * @param {Product[]} products - 상품 목록
   */
  constructor(machineId, products) {
    /** @type {HTMLElement} */
    this.machineEl = document.querySelector(`#${machineId}`);
    /** @type {CurrentBalance} */
    this.currentBalance = new CurrentBalance();
    /** @type {string} */
    this.insertedMoney = "0";
    /** @type {LogManager} */
    this.logManager = new LogManager(this.machineEl);
    /** @type {HTMLInputElement} */
    this.insertedMoneyInputEl = this.machineEl.querySelector(
      '[aria-label="투입 금액"]'
    );
    /** @type {ProductButtonManager} */
    this.productButtonManager = new ProductButtonManager(
      this.machineEl,
      products,
      {
        onBuyProduct: this.buyProduct.bind(this),
        onProductMouseDown: (price) => {
          if (!this.currentBalance.canAfford(price)) {
            this.updateBalanceDisplay(price);
          }
        },
        onProductMouseUp: () => {
          this.updateBalanceDisplay();
        },
      }
    );
  }

  // 돈 넣기
  insertMoney() {
    const moneyWithComma = this.insertedMoneyInputEl.value;
    const parsedMoney = parseInt(moneyWithComma.replace(/,/g, "")); // 콤마 제거 + 숫자로 변환
    if (parsedMoney > 0) {
      this.currentBalance.add(parsedMoney);
      this.logManager.add(`[금액 투입] ${parsedMoney.toLocaleString()}원`);
    }
    this.insertedMoneyInputEl.value = "0";
    this.updateBalanceDisplay();
    this.insertedMoneyInputEl.focus();
  }

  // 잔돈 반환 하기
  returnChange() {
    const returnedChange = this.currentBalance.returnChange();
    if (returnedChange === 0) return;
    this.logManager.add(`[잔액 반환] ${returnedChange.toLocaleString()}원`);
    this.updateBalanceDisplay();
  }

  /**
   * 현재 잔액을 화면에 표시
   * @param {number} [displayMoney]
   */
  updateBalanceDisplay(displayMoney = this.currentBalance.getBalance()) {
    const balanceBoardEl = this.machineEl.querySelector(
      '[aria-label="금액 표시판"]'
    );
    balanceBoardEl.textContent = displayMoney.toLocaleString();
  }

  // 상품 구매 처리
  buyProduct(product) {
    if (this.currentBalance.canAfford(product.price)) {
      this.currentBalance.subtract(product.price);
      this.logManager.add(
        `[구매 성공] ${product.name} (잔액 ${this.currentBalance
          .getBalance()
          .toLocaleString()}원)`
      );
      this.updateBalanceDisplay();
    } else {
      this.logManager.add(
        `[구매 실패] ${product.name} (${this.currentBalance
          .getNeededMoney(product.price)
          .toLocaleString()}원 부족)`
      );
    }
  }

  // 초기 셋팅
  init() {
    // 투입 버튼 클릭 이벤트 추가
    const insertButtonEl = this.machineEl.querySelector(
      '[aria-label="금액 투입 버튼"]'
    );
    insertButtonEl.addEventListener("click", () => {
      this.insertMoney();
    });

    // 잔돈 반환 버튼 클릭 이벤트 추가
    const returnChangeButtonEl = this.machineEl.querySelector(
      '[aria-label="잔액 반환 버튼"]'
    );
    returnChangeButtonEl.addEventListener("click", () => {
      this.returnChange();
    });

    // 상품 버튼 셋팅
    this.productButtonManager.init();

    // 금액 입력 input의 값 입력시 콤마 추가
    this.insertedMoneyInputEl.addEventListener("input", (e) => {
      const value = e.target.value.replace(/[^\d]/g, "");
      if (value) {
        const numValue = value.replace(/^0+/, ""); // 앞의 0 제거
        e.target.value = Number(numValue).toLocaleString();
      }
    });

    // 금액 입력 input의 Enter키 입력 이벤트 추가
    this.insertedMoneyInputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.insertMoney();
      }
    });
  }
}

export default VendingMachine;
