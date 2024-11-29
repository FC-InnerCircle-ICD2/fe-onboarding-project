import "./style.css";
import { PRODUCTS, VENDING_MACHINE_CONFIG } from "./data/products.js";

// 상태 관리
const state = {
  currentMoney: 0,
  displayAmount: 0,
};

// 유틸리티 함수
const formatNumber = (number) => {
  return number.toLocaleString("ko-KR");
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};

const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};

// 화면 업데이트 함수
const updateDisplayAmount = (amount, elements) => {
  state.displayAmount = amount;
  elements.moneyDisplay.textContent = formatNumber(state.displayAmount);
};

const updateBalance = (elements) => {
  elements.balanceAmount.textContent = formatNumber(state.currentMoney);
  elements.moneyDisplay.textContent = formatNumber(state.currentMoney);
};

const addLog = (message, elements) => {
  const logEntry = createElement("p", "log-entry");
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  elements.logContainer.appendChild(logEntry);
  scrollToBottom(elements.logContainer);
};

// 상품 구매 처리
const handleProductPurchase = (product, elements) => {
  if (state.currentMoney < product.price) {
    addLog(
      `잔액이 부족합니다. (필요금액: ${formatNumber(
        product.price - state.currentMoney
      )}원)`,
      elements
    );
    return;
  }

  state.currentMoney -= product.price;
  updateBalance(elements);
  addLog(
    `${product.name}를 구매했습니다. (${formatNumber(product.price)}원)`,
    elements
  );
};

// UI 생성 함수
const createProductGrid = (elements) => {
  const grid = createElement("div", "product-grid");

  PRODUCTS.forEach((product) => {
    const button = createElement("button", "product-button");
    const nameSpan = createElement("span", "product-name");
    const priceSpan = createElement("span", "product-price");

    nameSpan.textContent = product.name;
    priceSpan.textContent = `${formatNumber(product.price)}원`;

    button.dataset.productId = product.id;

    button.append(nameSpan, priceSpan);

    grid.appendChild(button);
  });

  // 이벤트 버블링을 활용한 이벤트 처리
  grid.addEventListener("click", handleGridEvent);
  grid.addEventListener("mouseover", handleGridEvent);
  grid.addEventListener("mouseout", handleGridEvent);

  function handleGridEvent(e) {
    const target = e.target.closest(".product-button");
    if (!target) return;

    const productId = parseInt(target.dataset.productId);
    const product = PRODUCTS.find((product) => product.id === productId);

    switch (e.type) {
      case "click":
        handleProductPurchase(product, elements);
        break;
      case "mouseover":
        updateDisplayAmount(product.price, elements);
        break;
      case "mouseout":
        updateDisplayAmount(state.currentMoney, elements);
        break;
    }
  }

  return grid;
};

const createMainElements = (elements) => {
  const title = createElement("h1", "title");
  title.textContent = VENDING_MACHINE_CONFIG.TITLE;

  const contentWrapper = createElement("div", "content-wrapper");
  const vendingBody = createElement("div", "vending-body");
  const displayContainer = createElement("div", "display-container");
  const moneyDisplay = createElement("div", "money-display");
  moneyDisplay.textContent = "0";

  elements.moneyDisplay = moneyDisplay;
  const productGrid = createProductGrid(elements);

  displayContainer.appendChild(moneyDisplay);
  vendingBody.append(displayContainer, productGrid);

  return { title, contentWrapper, vendingBody };
};

// 금액 처리 함수
const handleMoneyInsert = (elements) => {
  const inputAmount = parseInt(elements.moneyInput.value);

  if (!inputAmount || inputAmount <= 0) {
    addLog("올바른 금액을 입력해주세요.", elements);
    return;
  }

  state.currentMoney += inputAmount;
  updateDisplayAmount(state.currentMoney, elements);
  updateBalance(elements);
  addLog(`${formatNumber(inputAmount)}원이 투입되었습니다.`, elements);
  elements.moneyInput.value = "";
};

const handleMoneyReturn = (elements) => {
  if (state.currentMoney > 0) {
    addLog(`${formatNumber(state.currentMoney)}원이 반환되었습니다.`, elements);
    state.currentMoney = 0;
    updateBalance(elements);
  }
};

const handleInputValidation = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

// UI 섹션 생성 함수
const createMoneySection = (elements) => {
  const section = createElement("div", "money-section");
  const content = createElement("div", "money-content");
  const balanceText = createElement("p", "balance-text");
  const balanceAmount = createElement("span");
  const inputContainer = createElement("div", "input-container");
  const moneyInput = createElement("input", "money-input");
  const buttonContainer = createElement("div", "button-container");
  const insertButton = createElement("button", "button button-insert");
  const returnButton = createElement("button", "button button-return");

  balanceAmount.textContent = "0";

  moneyInput.type = "number";
  moneyInput.placeholder = VENDING_MACHINE_CONFIG.MONEY_PLACEHOLDER;

  insertButton.textContent = "투입";
  returnButton.textContent = "반환";

  insertButton.addEventListener("click", () => handleMoneyInsert(elements));
  returnButton.addEventListener("click", () => handleMoneyReturn(elements));
  moneyInput.addEventListener("input", handleInputValidation);
  moneyInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") insertButton.click();
  });

  buttonContainer.append(insertButton, returnButton);
  inputContainer.append(moneyInput, buttonContainer);
  content.append(balanceText, inputContainer);
  section.appendChild(content);

  elements.balanceAmount = balanceAmount;
  elements.moneyInput = moneyInput;

  return section;
};

const createLogSection = (elements) => {
  const section = createElement("div", "log-section");
  const title = createElement("h2", "log-title");
  const container = createElement("div", "log-container");

  title.textContent = VENDING_MACHINE_CONFIG.LOG_TITLE;
  section.append(title, container);

  elements.logContainer = container;

  return section;
};

const createControlElements = (elements) => {
  const controlPanel = createElement("div", "control-panel");
  const moneySection = createMoneySection(elements);
  const logSection = createLogSection(elements);

  controlPanel.append(moneySection, logSection);
  return controlPanel;
};

// 자판기 초기화 및 생성
const createVendingMachine = () => {
  const elements = {
    app: document.querySelector("#app"),
    container: createElement("div", "container"),
    vendingMachine: createElement("div", "vending-machine"),
  };

  const { title, contentWrapper, vendingBody } = createMainElements(elements);
  const controlPanel = createControlElements(elements);

  contentWrapper.append(vendingBody, controlPanel);
  elements.vendingMachine.append(title, contentWrapper);
  elements.container.appendChild(elements.vendingMachine);
  elements.app.appendChild(elements.container);
};

createVendingMachine();
