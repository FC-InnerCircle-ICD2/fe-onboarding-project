import { CoinController } from './entities/coin/model';
import { ProductController } from './entities/products/model';
import { LogService } from './shared/log';
import './style.css';
import { createInsertCoinButton } from './widgets/coin/coinInsertButton';
import { createReturnCoinButton } from './widgets/coin/coinReturnButton';
import { createProductButtons } from './widgets/products/productButtons';
import { updateProductWindow } from './widgets/products/productWindow';

const logWindowElement = document.querySelector<HTMLDivElement>('.log-window');

const productController = new ProductController();
const coinController = new CoinController();
const logService = new LogService(logWindowElement!);

document.addEventListener('DOMContentLoaded', () => {
  updateProductWindow(0);
  createProductButtons(productController, coinController);
  createInsertCoinButton(coinController);
  createReturnCoinButton(coinController);
});
