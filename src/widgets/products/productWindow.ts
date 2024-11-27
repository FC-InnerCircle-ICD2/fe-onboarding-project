import type { TCoin } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { updateDisplay } from '../../shared/updateDisplay';

const productWindowElement =
  document.querySelector<HTMLDivElement>('.product-window');

export const updateProductWindow = (currentBalance: TCoin) => {
  updateDisplay(productWindowElement!, formatCurrency(currentBalance));
};
