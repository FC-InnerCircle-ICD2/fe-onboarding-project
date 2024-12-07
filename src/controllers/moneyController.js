import { formatNumber } from '../utils/formatters/index.js';
import { addLog } from '../utils/logger/index.js';
import { elements } from '../dom/index.js';

const createMoneyController = (moneyService) => {
  const initializeEventListeners = () => {
    elements.moneyForm.addEventListener('submit', handleSubmit);
    elements.moneyReturnButton.addEventListener('click', handleReturn);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = elements.moneyInput.valueAsNumber;

    const result = moneyService.insertMoney(amount);
    if (!result.isValid) {
      addLog(result.message);
      return;
    }

    addLog(result.message);
    updateDisplayAmount(result.currentMoney);
    elements.moneyInput.value = '';
  };

  const handleReturn = () => {
    const result = moneyService.returnMoney();
    if (result.amount > 0) {
      addLog(result.message);
      updateDisplayAmount(0);
    }
  };

  const updateDisplayAmount = (amount) => {
    elements.moneyDisplay.textContent = formatNumber(amount);
  };

  const initialize = () => {
    initializeEventListeners();
  };

  return {
    initialize,
  };
};

export default createMoneyController;
