import { state } from '../../store/index.js';
import { addLog } from '../../utils/logger/index.js';
import { formatNumber } from '../../utils/formatters/index.js';
import { elements } from '../../dom/index.js';

export const handleMoneyInsert = (e) => {
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

export const handleMoneyReturn = () => {
  if (state.currentMoney > 0) {
    addLog(`${formatNumber(state.currentMoney)}원이 반환되었습니다.`);
    state.currentMoney = 0;
  }
};

export const handleInputValidation = (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
};
