import type { CoinController } from '../../entities/coin/model';
import type {
  ProductController,
  TProduct,
} from '../../entities/products/model';
import { purchaseProduct } from '../../features/products/purchaseProduct';
import { formatCurrency } from '../../shared/currency';
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
  productController: ProductController,
  coinController: CoinController,
) => {
  purchaseProduct(product, productController, coinController);
};
