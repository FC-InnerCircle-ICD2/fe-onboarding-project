import type { TCoinManager } from '../../entities/coin/model';
import { returnCoin } from '../../features/coin/returnCoin';
import { LogService } from '../../shared/log';
import { updateProductWindow } from '../products/productWindow';

const coinReturnButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-return-button',
);

export const createReturnCoinButton = (
  coinManager: TCoinManager,
  logService: LogService,
) => {
  coinReturnButtonElement!.addEventListener('click', () => {
    handleReturnCoinButtonClick(coinManager, logService);

    const currentBalance = coinManager.getCoin();

    updateProductWindow(currentBalance);
  });
};

export const handleReturnCoinButtonClick = (
  coinManager: TCoinManager,
  logService: LogService,
) => {
  returnCoin(coinManager, logService);
};
