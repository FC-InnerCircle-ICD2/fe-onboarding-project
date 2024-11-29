import { createCoinManager } from './entities/coin/model';
import { createProductManager } from './entities/products/model';
import { updateProductWindow } from './features/products/updateProductWindow';
import { LogService } from './shared/log';
import './style.css';
import { initializeProductButtons } from './widgets/products/productButtons';

const logWindowElement = document.querySelector<HTMLDivElement>('.log-window');
const productWindowElement =
  document.querySelector<HTMLDivElement>('.product-window');

const productManager = createProductManager();
const coinManager = createCoinManager();
const logService = new LogService(logWindowElement!);

document.addEventListener('DOMContentLoaded', () => {
  updateProductWindow(productWindowElement!, 0);
  initializeProductButtons(productManager, coinManager, logService);
  createInsertCoinButton(coinManager, logService);
  createReturnCoinButton(coinManager, logService);
});
