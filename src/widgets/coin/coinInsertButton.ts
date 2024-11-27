import type { CoinController } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insertCoin';

const coinInputElement =
  document.querySelector<HTMLInputElement>('.coin-input');

export const handleInsertCoinButtonClick = (coinController: CoinController) => {
  const coin = parseInt(coinInputElement!.value);

  if (isNaN(coin)) {
    alert('잘못된 투입 금액입니다. 다시 시도해주세요.');
    return;
  }

  insertCoin(coin, coinController);
};
