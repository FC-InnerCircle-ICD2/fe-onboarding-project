import { formatNumber } from '../utils/formatters/index.js';
import { elements } from '../dom/index.js';

export const state = new Proxy(
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

export const updateDisplayAmount = (amount) => {
  state.displayAmount = amount;
};
