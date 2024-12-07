import { PRODUCTS } from '../../data/products.js';
import { state, updateDisplayAmount } from '../../store/index.js';
import { addLog } from '../../utils/logger/index.js';
import { formatNumber } from '../../utils/formatters/index.js';
import { elements } from '../../dom/index.js';

export const handleProductPurchase = (product) => {
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

export const initializeProductGrid = () => {
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

export const getProductById = (productId) => {
  return PRODUCTS.find((product) => product.id === productId);
};

export const handleClick = ({ target }) => {
  const productButton = target.closest('.product-button');
  if (!productButton) return;
  const product = getProductById(
    Number.parseInt(productButton.dataset.productId)
  );
  updateDisplayAmount(product.price);
  handleProductPurchase(product);
};

export const handleMouseLeave = ({ target }) => {
  updateDisplayAmount(state.currentMoney);
};
