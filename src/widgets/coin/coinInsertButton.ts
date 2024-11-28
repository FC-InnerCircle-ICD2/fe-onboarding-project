import type { TCoinManager } from '../../entities/coin/model';
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
  coinManager: TCoinManager,
  logService: LogService,
) => {
  coinInsertButtonElement!.addEventListener('click', () => {
    handleInsertCoinButtonClick(coinManager, logService);

    const currentBalance = coinManager.getCoin();

    updateCoinInput(0);
    updateProductWindow(currentBalance);
  });
};

export const handleInsertCoinButtonClick = (
  coinManager: TCoinManager,
  logService: LogService,
) => {
  const coin = parseInt(coinInputElement!.value);

  insertCoin(coin, coinManager, logService);
};
