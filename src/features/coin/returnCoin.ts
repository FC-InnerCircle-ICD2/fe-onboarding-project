import type { CoinController } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';

export const returnCoin = (coinController: CoinController) => {
  const returnedCoin = coinController.returnCoin();

  alert(`${formatCurrency(returnedCoin)}원이 반환되었습니다.`);
};
