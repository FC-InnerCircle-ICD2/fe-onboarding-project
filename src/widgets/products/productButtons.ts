import type { TCoinManager } from '../../entities/coin/model';
import {
  TProduct,
  type TProductManger,
  products,
} from '../../entities/products/model';
import { purchaseProduct } from '../../features/products/purchaseProduct';
import { LogService } from '../../shared/log';
import { createProductButton, handleProductButtonClick } from './productButton';
import { updateProductWindow } from './productWindow';

const productButtonsElement =
  document.querySelector<HTMLDivElement>('.product-buttons');

export const createProductButton = (product: TProduct) => {
  const button = document.createElement('button');

  button.dataset.productId = product.id;
  button.className = 'product-button';
  button.innerHTML = `
    <p class='product-button_name'>${product.name}</p>
    <span class='product-button_price'>${formatCurrency(product.price)}원</span>
    `;

  return button;
};
  productManager: TProductManger,
  coinManager: TCoinManager,
  logService: LogService,
) => {
  const productButtons = products.map((product) =>
    createProductButton(product),
  );

  if (!productButtonsElement) return;

  productButtonsElement.append(...productButtons);

    const purchaseResponse = purchaseProduct(
      product,
      productManager,
      coinManager,
      logService,
    );

    if (purchaseResponse.ok) {
      const currentCoin = coinManager.getCoin();

      updateProductWindow(currentCoin);
    }

    button.addEventListener('mouseleave', () => {
      const currentBalance = coinManager.getCoin();

      updateProductWindow(currentBalance);
    });

    productButtonsElement!.appendChild(button);
  }
};
