import { createCoinManager } from './entities/coin/model';
import { createProductManager } from './entities/products/model';
import { LogService } from './shared/log';
import './style.css';
import { createInsertCoinButton } from './widgets/coin/coinInsertButton';
import { createReturnCoinButton } from './widgets/coin/coinReturnButton';
import { createProductButtons } from './widgets/products/productButtons';
import { updateProductWindow } from './widgets/products/productWindow';

const logWindowElement = document.querySelector<HTMLDivElement>('.log-window');

const productManager = createProductManager();
const coinManager = createCoinManager();
const logService = new LogService(logWindowElement!);

document.addEventListener('DOMContentLoaded', () => {
  updateProductWindow(0);
  createProductButtons(productManager, coinManager, logService);
  createInsertCoinButton(coinManager, logService);
  createReturnCoinButton(coinManager, logService);
});
