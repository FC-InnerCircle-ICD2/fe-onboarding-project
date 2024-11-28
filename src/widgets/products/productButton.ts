import type { TCoinManager } from '../../entities/coin/model';
import type { TProduct, TProductManger } from '../../entities/products/model';
import { purchaseProduct } from '../../features/products/purchaseProduct';
import { formatCurrency } from '../../shared/currency';
import { LogService } from '../../shared/log';
import { updateProductWindow } from './productWindow';

export const createProductButton = (product: TProduct) => {
  const button = document.createElement('button');

  button.id = product.id;
  button.className = 'product-button';
  button.innerHTML = `
    <p class='product-button_name'>${product.name}</p>
    <span class='product-button_price'>${formatCurrency(product.price)}원</span>
    `;

  return button;
};

export const handleProductButtonClick = (
  product: TProduct,
  productManager: TProductManger,
  coinManager: TCoinManager,
  logService: LogService,
) => {
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
};
