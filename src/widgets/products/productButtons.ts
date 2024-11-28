import type { TCoinManager } from '../../entities/coin/model';
import { type TProductManger, products } from '../../entities/products/model';
import { LogService } from '../../shared/log';
import { createProductButton, handleProductButtonClick } from './productButton';
import { updateProductWindow } from './productWindow';

const productButtonsElement =
  document.querySelector<HTMLDivElement>('.product-buttons');

export const createProductButtons = (
  productManager: TProductManger,
  coinManager: TCoinManager,
  logService: LogService,
) => {
  for (const product of products) {
    const button = createProductButton(product);

    button.addEventListener('click', () => {
      handleProductButtonClick(
        product,
        productManager,
        coinManager,
        logService,
      );
    });

    button.addEventListener('mousedown', () => {
      updateProductWindow(product.price);
    });

    button.addEventListener('mouseleave', () => {
      const currentBalance = coinManager.getCoin();

      updateProductWindow(currentBalance);
    });

    productButtonsElement!.appendChild(button);
  }
};
