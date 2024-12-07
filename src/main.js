import './style.css';
import { elements } from './dom/index.js';
import {
  initializeProductGrid,
  handleClick,
  handleMouseLeave,
} from './features/product/index.js';
import {
  handleMoneyInsert,
  handleMoneyReturn,
  handleInputValidation,
} from './features/money/index.js';

const initializeEventListeners = () => {
  elements.productGrid.addEventListener('click', handleClick);
  elements.productGrid.addEventListener('mouseleave', handleMouseLeave, true);

  elements.inputContainer.addEventListener('submit', handleMoneyInsert);
  elements.returnButton.addEventListener('click', handleMoneyReturn);
  elements.moneyInput.addEventListener('input', handleInputValidation);
};

const initialize = () => {
  initializeProductGrid();
  initializeEventListeners();
};

initialize();
