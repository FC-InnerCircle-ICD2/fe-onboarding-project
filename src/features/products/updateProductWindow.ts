import { TCoin } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { updateDisplay } from '../../shared/updateDisplay';

export const updateProductWindow = (
  element: HTMLDivElement,
  currentBalance: TCoin,
) => {
  updateDisplay(element, formatCurrency(currentBalance));
};
