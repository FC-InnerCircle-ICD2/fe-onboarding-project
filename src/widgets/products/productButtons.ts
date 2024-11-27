import type { CoinController } from '../../entities/coin/model';
import {
  type ProductController,
  products,
} from '../../entities/products/model';
import { createProductButton, handleProductButtonClick } from './productButton';
import { updateProductWindow } from './productWindow';

const productButtonsElement =
  document.querySelector<HTMLDivElement>('.product-buttons');

export const createProductButtons = (
  productController: ProductController,
  coinController: CoinController,
) => {
  for (const product of products) {
    const button = createProductButton(product);

    button.addEventListener('click', () => {
      handleProductButtonClick(product, productController, coinController);
    });

    button.addEventListener('mousedown', () => {
      updateProductWindow(product.price);
    });

    button.addEventListener('mouseleave', () => {
      const currentBalance = coinController.getCoin();

      updateProductWindow(currentBalance);
    });

    productButtonsElement!.appendChild(button);
  }
};
