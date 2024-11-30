import type { TCoinManager } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insertCoin';
import { returnCoin } from '../../features/coin/returnCoin';
import { updateProductWindow } from '../../features/products/updateProductWindow';
import { LogService } from '../../shared/log';

const productWindowElement =
  document.querySelector<HTMLDivElement>('.product-window');
const coinFormElement = document.querySelector<HTMLFormElement>('.coin-form');
const coinReturnButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-return-button',
);

export const initializeCoinForm = (
  coinManager: TCoinManager,
  logService: LogService,
) => {
  coinFormElement!.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const coinInFormData = formData.get('coin') as string;
    const coin = parseInt(coinInFormData);

    if (isNaN(coin)) {
      return;
    }

    insertCoin(coin, coinManager, logService);

    formElement.reset();

    const currentBalance = coinManager.getCoin();
    updateProductWindow(productWindowElement!, currentBalance);
  });

  coinReturnButtonElement!.addEventListener('click', () => {
    returnCoin(coinManager, logService);

    const currentBalance = coinManager.getCoin();

    updateProductWindow(productWindowElement!, currentBalance);
  });
};
