import type { CoinController } from '../../entities/coin/model';
import type {
  ProductController,
  TProduct,
} from '../../entities/products/model';
import { purchaseProduct } from '../../features/products/purchaseProduct';
export const handleProductButtonClick = (
  product: TProduct,
  productController: ProductController,
  coinController: CoinController,
) => {
  purchaseProduct(product, productController, coinController);
};
