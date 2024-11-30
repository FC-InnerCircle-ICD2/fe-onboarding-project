import './style.css';
import { PRODUCTS } from './data/products.js';

// 상태 관리
const state = {
  currentMoney: 0,
  displayAmount: 0,
};

// DOM 요소 참조
const elements = {
  moneyDisplay: document.querySelector('.money-display'),
  moneyInput: document.querySelector('.money-input'),
  inputContainer: document.querySelector('.input-container'),
  logContainer: document.querySelector('.log-container'),
  productGrid: document.querySelector('.product-grid'),
};

// 유틸리티 함수
const formatNumber = (number) => {
  return number.toLocaleString('ko-KR');
};

const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};

// 화면 업데이트 함수
const updateDisplayAmount = (amount) => {
  state.displayAmount = amount;
  elements.moneyDisplay.textContent = formatNumber(state.displayAmount);
};

const addLog = (message) => {
  const logEntry = document.createElement('p');
  logEntry.className = 'log-entry';
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  elements.logContainer.appendChild(logEntry);
  scrollToBottom(elements.logContainer);
};

// 상품 구매 처리
const handleProductPurchase = (product) => {
  if (state.currentMoney < product.price) {
    addLog(
      `잔액이 부족합니다. (필요금액: ${formatNumber(
        product.price - state.currentMoney
      )}원)`
    );
    return;
  }

  state.currentMoney -= product.price;
  addLog(`${product.name}를 구매했습니다. (${formatNumber(product.price)}원)`);
};

// 상품 그리드 초기화
const initializeProductGrid = () => {
  PRODUCTS.forEach((product) => {
    const button = document.createElement('button');
    button.className = 'product-button';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'product-name';
    const priceSpan = document.createElement('span');
    priceSpan.className = 'product-price';

    nameSpan.textContent = product.name;
    priceSpan.textContent = `${formatNumber(product.price)}원`;

    button.dataset.productId = product.id;

    button.append(nameSpan, priceSpan);
    elements.productGrid.appendChild(button);
  });
};

// 이벤트 핸들러
const handleGridEvent = (e) => {
  const target = e.target.closest('.product-button');
  if (!target) return;

  const productId = Number.parseInt(target.dataset.productId);
  const product = PRODUCTS.find((product) => product.id === productId);

  switch (e.type) {
    case 'click':
      updateDisplayAmount(product.price);
      handleProductPurchase(product);
      break;
    case 'mouseout':
      updateDisplayAmount(state.currentMoney);
      break;
  }
};

// 금액 처리 함수
const handleMoneyInsert = (e) => {
  e.preventDefault();
  const inputAmount = Number.parseInt(elements.moneyInput.value);

  if (!inputAmount || inputAmount <= 0) {
    addLog('올바른 금액을 입력해주세요.');
    return;
  }

  if (inputAmount > 100000000) {
    addLog('1억원 이상은 투입할 수 없습니다.');
    return;
  }

  state.currentMoney += inputAmount;
  updateDisplayAmount(state.currentMoney);
  addLog(`${formatNumber(inputAmount)}원이 투입되었습니다.`);
  elements.moneyInput.value = '';
};

const handleMoneyReturn = () => {
  if (state.currentMoney > 0) {
    addLog(`${formatNumber(state.currentMoney)}원이 반환되었습니다.`);
    state.currentMoney = 0;
  }
};

const handleInputValidation = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

// 이벤트 리스너 설정
const initializeEventListeners = () => {
  elements.productGrid.addEventListener('click', handleGridEvent);
  elements.productGrid.addEventListener('mouseout', handleGridEvent);

  elements.inputContainer.addEventListener('submit', handleMoneyInsert);
  const returnButton = document.querySelector('.button-return');
  returnButton.addEventListener('click', handleMoneyReturn);
  elements.moneyInput.addEventListener('input', handleInputValidation);
};

// 초기화
const initialize = () => {
  initializeProductGrid();
  initializeEventListeners();
};

initialize();
