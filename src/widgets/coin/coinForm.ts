import type { TCoinManager } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insertCoin';
import { returnCoin } from '../../features/coin/returnCoin';
import { updateProductWindow } from '../../features/products/updateProductWindow';
import { LogService } from '../../shared/log';

type TInitializeCoinProps = {
  coinManager: TCoinManager;
  logService: LogService;
  elements: {
    form: HTMLFormElement;
    returnButton: HTMLButtonElement;
    window: HTMLDivElement;
  };
};

export const initializeCoinForm = ({
  coinManager,
  logService,
  elements: { form, returnButton, window },
}: TInitializeCoinProps) => {
  form.addEventListener('submit', (event: SubmitEvent) => {
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
    updateProductWindow(window, currentBalance);
  });

  returnButton!.addEventListener('click', () => {
    returnCoin(coinManager, logService);

    const currentBalance = coinManager.getCoin();

    updateProductWindow(window, currentBalance);
  });
};
