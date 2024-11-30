import { TCoin } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { updateDisplay } from '../../shared/updateDisplay';

export const updateCoinInput = (
  element: HTMLInputElement,
  currentBalance: TCoin,
) => {
  updateDisplay(element, currentBalance ? formatCurrency(currentBalance) : '');
};
