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
    /** @type {string} */
    this.insertedMoney = "0";
    /** @type {string[]} */
    this.logs = [];
    /** @type {Product[]} */
    this.products = products;
    /** @type {HTMLInputElement} */
    this.insertedMoneyInputEl = this.machineEl.querySelector(
      '[aria-label="투입 금액"]'
    );
  }

  // 돈 넣기
  insertMoney() {
    const moneyWithComma = this.insertedMoneyInputEl.value;
    const parsedMoney = parseInt(moneyWithComma.replace(/,/g, "")); // 콤마 제거 + 숫자로 변환
    if (parsedMoney > 0) {
      this.currentMoney += parsedMoney;
      this.logs.push(`${parsedMoney.toLocaleString()}원을 투입했습니다.`);
    }
    this.insertedMoneyInputEl.value = "0";
    this.renderMoneyBoard();
    this.renderLogs();
  }

  // 잔돈 반환 하기
  returnChange() {
    if (this.currentMoney === 0) return;
    this.logs.push(`${this.currentMoney}원을 반환했습니다.`);
    this.currentMoney = 0;
    this.renderMoneyBoard();
    this.renderLogs();
  }

  /**
   * 금액 표시판 랜더링
   * @param {number} money
   */
  renderMoneyBoard(money = this.currentMoney) {
    const moneyBoardEl = this.machineEl.querySelector(
      '[aria-label="금액 표시판"]'
    );
    moneyBoardEl.textContent = money.toLocaleString();
  }

  // 로그 랜더링
  renderLogs() {
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
        "bg-blue-300",
        "active:scale-95",
        "hover:brightness-105",
        "duration-200"
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
          this.renderMoneyBoard(product.price);
        }
      });

      // 잔액 부족으로 구매 실패시 버튼에서 손을 뗄 때 이벤트 추가
      button.addEventListener("mouseup", () => {
        this.renderMoneyBoard();
      });

      productButtonsContainer.appendChild(button);
    });
  }

  // 상품 구매 처리
  buyProduct(product) {
    if (this.currentMoney >= product.price) {
      this.currentMoney -= product.price;
      this.logs.push(
        `[구매 완료] ${
          product.name
        } (잔액 ${this.currentMoney.toLocaleString()}원)`
      );
      this.renderMoneyBoard();
      this.renderLogs();
    } else {
      this.logs.push(
        `[구매 실패] ${product.name} (${(
          (this.currentMoney - product.price) *
          -1
        ).toLocaleString()}원 부족)`
      );
      this.renderLogs();
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

    // input 값 입력시 콤마 추가
    this.insertedMoneyInputEl.addEventListener("input", (e) => {
      const value = e.target.value.replace(/[^\d]/g, "");
      if (value) {
        const numValue = value.replace(/^0+/, ""); // 앞의 0 제거
        e.target.value = Number(numValue).toLocaleString();
      }
    });
  }
}

export default VendingMachine;
