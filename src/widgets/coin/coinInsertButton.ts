import type { CoinController } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insertCoin';
import { updateProductWindow } from '../products/productWindow';
import { updateCoinInput } from './coinInput';

const coinInputElement =
  document.querySelector<HTMLInputElement>('.coin-input');
const coinInsertButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-insert-button',
);

export const createInsertCoinButton = (coinController: CoinController) => {
  coinInsertButtonElement!.addEventListener('click', () => {
    handleInsertCoinButtonClick(coinController);

    const currentBalance = coinController.getCoin();

    updateCoinInput(0);
    updateProductWindow(currentBalance);
  });
};

export const handleInsertCoinButtonClick = (coinController: CoinController) => {
  const coin = parseInt(coinInputElement!.value);

  if (isNaN(coin)) {
    alert('잘못된 투입 금액입니다. 다시 시도해주세요.');
    return;
  }

  insertCoin(coin, coinController);
};
