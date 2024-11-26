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
    /** @type {number} */
    this.currentMoney = 0;
    /** @type {number} */
    this.insertedMoney = 0;
    /** @type {string[]} */
    this.logs = [];
    /** @type {Product[]} */
    this.products = products;
  }

  // 돈 넣기
  insertMoney() {
    const insertedMoneyInputEl = this.machineEl.querySelector(
      '[aria-label="투입 금액"]'
    );
    const parsedMoney = parseInt(insertedMoneyInputEl.value);
    if (parsedMoney > 0) {
      this.currentMoney += parsedMoney;
      this.logs.push(`${parsedMoney}원을 투입했습니다.`);
    }
    insertedMoneyInputEl.value = 0;
    this.updateCurrentMoney();
    this.updateLogs();
  }

  // 잔돈 반환 하기
  returnChange() {
    if (this.currentMoney === 0) return;
    this.logs.push(`${this.currentMoney}원을 반환했습니다.`);
    this.currentMoney = 0;
    this.updateCurrentMoney();
    this.updateLogs();
  }

  // 투입 금액 업데이트
  updateCurrentMoney() {
    const currentMoneyEl = this.machineEl.querySelector(
      '[aria-label="현재 잔액"]'
    );
    currentMoneyEl.textContent = this.currentMoney;
  }

  // 로그 업데이트
  updateLogs() {
    const logsEl = this.machineEl.querySelector('[aria-label="로그"]');
    logsEl.textContent = this.logs.join("\n");
    logsEl.scrollTo({ top: logsEl.scrollHeight, behavior: "smooth" });
  }

  // 상품 추가 및 버튼 생성
  setupProducts() {
    const productButtonsContainer =
      this.machineEl.querySelector(".product-container");

    this.products.forEach((product) => {
      const button = document.createElement("button");
      const productNameEl = document.createElement("div");
      const productPriceEl = document.createElement("div");
      button.ariaLabel = `${product.name} 구매: ${product.price}원`;
      button.classList.add(
        "basis-[31%]",
        "p-3",
        "border",
        "border-black",
        "rounded-md",
        "bg-blue-300"
      );
      productNameEl.textContent = product.name;
      productPriceEl.textContent = `${product.price}원`;
      button.appendChild(productNameEl);
      button.appendChild(productPriceEl);

      // 버튼 클릭 이벤트 추가
      button.addEventListener("click", () => {
        this.buyProduct(product);
      });

      // 잔액 부족으로 구매 실패시 버튼을 누르고 있을 때 이벤트 추가
      button.addEventListener("mousedown", () => {
        if (this.currentMoney < product.price) {
          const currentMoneyEl = this.machineEl.querySelector(
            '[aria-label="현재 잔액"]'
          );
          currentMoneyEl.textContent = product.price;
        }
      });

      // 잔액 부족으로 구매 실패시 버튼에서 손을 뗄 때 이벤트 추가
      button.addEventListener("mouseup", () => {
        const currentMoneyEl = this.machineEl.querySelector(
          '[aria-label="현재 잔액"]'
        );
        currentMoneyEl.textContent = this.currentMoney;
      });

      productButtonsContainer.appendChild(button);
    });
  }

  // 상품 구매 처리
  buyProduct(product) {
    if (this.currentMoney >= product.price) {
      this.currentMoney -= product.price;
      this.logs.push(
        `[구매 완료] ${product.name} (잔액 ${this.currentMoney}원)`
      );
      this.updateCurrentMoney();
      this.updateLogs();
    } else {
      this.logs.push(
        `[구매 실패] ${product.name} (${
          (this.currentMoney - product.price) * -1
        }원 부족)`
      );
      this.updateLogs();
    }
  }

  // 초기 셋팅
  init() {
    // 투입 버튼 클릭 이벤트 추가
    const insertButtonEl = this.machineEl.querySelector('[aria-label="투입"]');
    insertButtonEl.addEventListener("click", () => {
      this.insertMoney();
    });

    // 잔돈 반환 버튼 클릭 이벤트 추가
    const returnChangeButtonEl =
      this.machineEl.querySelector('[aria-label="반환"]');
    returnChangeButtonEl.addEventListener("click", () => {
      this.returnChange();
    });

    // 상품 버튼 추가
    this.setupProducts();
  }
}

export default VendingMachine;
