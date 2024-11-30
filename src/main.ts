import { createCoinManager } from './entities/coin/model';
import { createProductManager } from './entities/products/model';
import { updateProductWindow } from './features/products/updateProductWindow';
import { LogService } from './shared/log';
import { initializeCoinForm } from './widgets/coin/coinForm';
import { initializeProductButtons } from './widgets/products/productButtons';

import './style.css';

const productWindowElement =
  document.querySelector<HTMLDivElement>('.product-window');
const productButtonsElement =
  document.querySelector<HTMLDivElement>('.product-buttons');

const coinFormElement = document.querySelector<HTMLFormElement>('.coin-form');
const coinReturnButtonElement = document.querySelector<HTMLButtonElement>(
  '.coin-return-button',
);

const logWindowElement = document.querySelector<HTMLDivElement>('.log-window');

const productManager = createProductManager();
const coinManager = createCoinManager();
const logService = new LogService(logWindowElement!);

document.addEventListener('DOMContentLoaded', () => {
  updateProductWindow(productWindowElement!, 0);

  initializeProductButtons({
    productManager,
    coinManager,
    logService,
    elements: {
      buttons: productButtonsElement!,
      window: productWindowElement!,
    },
  });

  initializeCoinForm({
    coinManager,
    logService,
    elements: {
      form: coinFormElement!,
      returnButton: coinReturnButtonElement!,
      window: productWindowElement!,
    },
  });
});
