import type { TCoin } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { updateDisplay } from '../../shared/updateDisplay';

const coinInputElement =
  document.querySelector<HTMLInputElement>('.coin-input');

export const updateCoinInput = (currentBalance: TCoin) => {
  updateDisplay(
    coinInputElement!,
    currentBalance ? formatCurrency(currentBalance) : '',
  );
};
