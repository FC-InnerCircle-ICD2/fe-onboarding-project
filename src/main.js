import './style.css';
import { PRODUCTS } from './data/products.js';

/** 상태 관리를 위한 프록시 객체 */
const state = new Proxy(
  {
    currentMoney: 0,
    displayAmount: 0,
  },
  {
    set(target, property, value) {
      target[property] = value;

      if (property === 'currentMoney' || property === 'displayAmount') {
        elements.moneyDisplay.textContent = formatNumber(value);
      }

      return true;
    },
  }
);

/** DOM 요소 참조 */
const elements = {
  moneyDisplay: document.querySelector('.money-display'),
  moneyInput: document.querySelector('.money-input'),
  inputContainer: document.querySelector('.input-container'),
  logContainer: document.querySelector('.log-container'),
  productGrid: document.querySelector('.product-grid'),
  returnButton: document.querySelector('.button-return'),
};

/**
 * 숫자를 한국 로케일의 문자열로 포맷팅합니다.
 * @param {number} number - 포맷팅할 숫자
 * @returns {string} 포맷팅된 문자열
 */
const formatNumber = (number) => {
  return number.toLocaleString('ko-KR');
};

/**
 * 요소를 스크롤하여 맨 아래로 이동시킵니다.
 * @param {HTMLElement} element - 스크롤할 요소
 */
const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};

/** 화면에 표시되는 금액을 업데이트 */
const updateDisplayAmount = (amount) => {
  state.displayAmount = amount;
};

/**
 * 로그 메시지를 추가합니다.
 * @param {string} message - 추가할 로그 메시지
 */
const addLog = (message) => {
  const logEntry = document.createElement('p');
  logEntry.className = 'log-entry';
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  elements.logContainer.appendChild(logEntry);
  scrollToBottom(elements.logContainer);
};

/**
 * 상품 구매를 처리합니다.
 * @param {Object} product - 구매할 상품 정보
 * @param {string} product.name - 상품 이름
 * @param {number} product.price - 상품 가격
 */
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

/** 상품 그리드를 초기화 */
const initializeProductGrid = () => {
  const template = document.querySelector('.product-template');

  for (const product of PRODUCTS) {
    const clone = template.content.cloneNode(true);
    const button = clone.querySelector('.product-button');
    const nameSpan = clone.querySelector('.product-name');
    const priceSpan = clone.querySelector('.product-price');

    button.dataset.productId = product.id;
    nameSpan.textContent = product.name;
    priceSpan.textContent = `${formatNumber(product.price)}원`;

    elements.productGrid.appendChild(clone);
  }
};

const getProductById = (productId) => {
  return PRODUCTS.find((product) => product.id === productId);
};

const handleClick = ({ target }) => {
  const productButton = target.closest('.product-button');
  if (!productButton) return;
  const product = getProductById(
    Number.parseInt(productButton.dataset.productId)
  );
  updateDisplayAmount(product.price);
  handleProductPurchase(product);
};

const handleMouseLeave = ({ target }) => {
  updateDisplayAmount(state.currentMoney);
};

/** 금액 투입을 처리 */
const handleMoneyInsert = (e) => {
  e.preventDefault();
  const inputAmount = elements.moneyInput.valueAsNumber;

  if (Number.isNaN(inputAmount) || inputAmount <= 0) {
    addLog('올바른 금액을 입력해주세요.');
    return;
  }

  if (inputAmount > 100000000) {
    addLog('1억원 이상은 투입할 수 없습니다.');
    return;
  }

  if (state.currentMoney + inputAmount > 100000000) {
    addLog('1억원 이상은 투입할 수 없습니다.');
    return;
  }

  state.currentMoney += inputAmount;
  addLog(`${formatNumber(inputAmount)}원이 투입되었습니다.`);
  elements.moneyInput.value = '';
};

/** 금액 반환을 처리 */
const handleMoneyReturn = () => {
  if (state.currentMoney > 0) {
    addLog(`${formatNumber(state.currentMoney)}원이 반환되었습니다.`);
    state.currentMoney = 0;
  }
};

/**
 * 입력값 유효성을 검사
 * @param {Event} e - 이벤트 객체
 */
const handleInputValidation = (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
};

/** 이벤트 리스너를 초기화 */
const initializeEventListeners = ({
  productGrid,
  inputContainer,
  moneyInput,
  returnButton,
}) => {
  productGrid.addEventListener('click', handleClick);
  productGrid.addEventListener('mouseleave', handleMouseLeave, true);

  inputContainer.addEventListener('submit', handleMoneyInsert);
  returnButton.addEventListener('click', handleMoneyReturn);
  moneyInput.addEventListener('input', handleInputValidation);
};

/** 애플리케이션을 초기화 */
const initialize = () => {
  initializeProductGrid();
  initializeEventListeners({
    productGrid: elements.productGrid,
    inputContainer: elements.inputContainer,
    moneyInput: elements.moneyInput,
    returnButton: elements.returnButton,
  });
};

initialize();
