import type { CoinController } from '../../entities/coin/model';
import { returnCoin } from '../../features/coin/returnCoin';
import { updateProductWindow } from '../products/productWindow';

const coinReturnButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-return-button',
);

export const createReturnCoinButton = (coinController: CoinController) => {
  coinReturnButtonElement!.addEventListener('click', () => {
    handleReturnCoinButtonClick(coinController);

    const currentBalance = coinController.getCoin();

    updateProductWindow(currentBalance);
  });
};

export const handleReturnCoinButtonClick = (coinController: CoinController) => {
  returnCoin(coinController);
};
