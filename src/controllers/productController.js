import { formatNumber } from '../utils/formatters/index.js';
import { addLog } from '../utils/logger/index.js';
import { elements } from '../dom/index.js';

const createProductController = (productService, moneyService) => {
  const initializeEventListeners = () => {
    elements.productGrid.addEventListener('click', handleClick);
    elements.productGrid.addEventListener('mouseleave', handleMouseLeave);
  };

  const initializeProductGrid = () => {
    const template = document.querySelector('.product-template');
    const products = productService.getAllProducts();

    for (const product of products) {
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

  const handleClick = ({ target }) => {
    const productButton = target.closest('.product-button');
    if (!productButton) return;

    const productId = Number.parseInt(productButton.dataset.productId);
    const result = productService.purchaseProduct(productId);

    if (!result.isValid) {
      addLog(result.message);
      return;
    }

    addLog(result.message);
    updateDisplayAmount(result.currentMoney);
  };

  const handleMouseLeave = () => {
    updateDisplayAmount(moneyService.getCurrentMoney());
  };

  const updateDisplayAmount = (amount) => {
    elements.moneyDisplay.textContent = formatNumber(amount);
  };

  const initialize = () => {
    initializeEventListeners();
    initializeProductGrid();
  };

  return {
    initialize,
  };
};

export default createProductController;
