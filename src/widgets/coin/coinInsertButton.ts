import type { CoinController } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insertCoin';
import { LogService } from '../../shared/log';
import { updateProductWindow } from '../products/productWindow';
import { updateCoinInput } from './coinInput';

const coinInputElement =
  document.querySelector<HTMLInputElement>('.coin-input');
const coinInsertButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-insert-button',
);

export const createInsertCoinButton = (
  coinController: CoinController,
  logService: LogService,
) => {
  coinInsertButtonElement!.addEventListener('click', () => {
    handleInsertCoinButtonClick(coinController, logService);

    const currentBalance = coinController.getCoin();

    updateCoinInput(0);
    updateProductWindow(currentBalance);
  });
};

export const handleInsertCoinButtonClick = (
  coinController: CoinController,
  logService: LogService,
) => {
  const coin = parseInt(coinInputElement!.value);

  insertCoin(coin, coinController, logService);
};
