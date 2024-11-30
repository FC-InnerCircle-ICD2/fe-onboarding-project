import type { TCoinManager } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insertCoin';
import { returnCoin } from '../../features/coin/returnCoin';
import { updateCoinInput } from '../../features/coin/updateCoinInput';
import { updateProductWindow } from '../../features/products/updateProductWindow';
import { LogService } from '../../shared/log';

const productWindowElement =
  document.querySelector<HTMLDivElement>('.product-window');
const coinInputElement =
  document.querySelector<HTMLInputElement>('.coin-input');
const coinInsertButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-insert-button',
);
const coinReturnButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-return-button',
);

export const initializeCoinButtons = (
  coinManager: TCoinManager,
  logService: LogService,
) => {
  coinInsertButtonElement!.addEventListener('click', () => {
    const coin = parseInt(coinInputElement!.value);

    insertCoin(coin, coinManager, logService);

    const currentBalance = coinManager.getCoin();

    updateCoinInput(coinInputElement!, 0);
    updateProductWindow(productWindowElement!, currentBalance);
  });

  coinReturnButtonElement!.addEventListener('click', () => {
    returnCoin(coinManager, logService);

    const currentBalance = coinManager.getCoin();

    updateProductWindow(productWindowElement!, currentBalance);
  });
};
