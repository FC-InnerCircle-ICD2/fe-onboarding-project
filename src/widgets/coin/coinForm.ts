import type { TCoinManager } from '../../entities/coin/model';
import { insertCoin } from '../../features/coin/insert';
import { returnCoin } from '../../features/coin/return';
import { formatCurrency } from '../../shared/currency';
import { TLogService } from '../../shared/log';
import { updateDisplay } from '../../shared/updateDisplay';

type TInitializeCoinProps = {
  coinManager: TCoinManager;
  logService: TLogService;
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

    const formData = new FormData(form);
    const coinInFormData = formData.get('coin') as string;

    const response = insertCoin(coinInFormData, coinManager, logService);

    form.reset();

    if (response.ok) {
      const currentBalance = coinManager.getCoin();
      updateDisplay(window, formatCurrency(currentBalance));
    }
  });

  returnButton.addEventListener('click', () => {
    returnCoin(coinManager, logService);

    const currentBalance = coinManager.getCoin();
    updateDisplay(window, formatCurrency(currentBalance));
  });
};
