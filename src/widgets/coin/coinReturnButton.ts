import type { CoinController } from '../../entities/coin/model';
import { returnCoin } from '../../features/coin/returnCoin';
import { LogService } from '../../shared/log';
import { updateProductWindow } from '../products/productWindow';

const coinReturnButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-return-button',
);

export const createReturnCoinButton = (
  coinController: CoinController,
  logService: LogService,
) => {
  coinReturnButtonElement!.addEventListener('click', () => {
    handleReturnCoinButtonClick(coinController, logService);

    const currentBalance = coinController.getCoin();

    updateProductWindow(currentBalance);
  });
};

export const handleReturnCoinButtonClick = (
  coinController: CoinController,
  logService: LogService,
) => {
  returnCoin(coinController, logService);
  
};
