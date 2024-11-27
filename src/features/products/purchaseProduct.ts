import type { CoinController } from '../../entities/coin/model';
import type {
  ProductController,
  TProduct,
} from '../../entities/products/model';
import { formatCurrency } from '../../shared/currency';
import type { TResponse } from '../../shared/response';

export const purchaseProduct = (
  product: TProduct,
  productController: ProductController,
  coinController: CoinController,
): TResponse => {
  const currentCoin = coinController.getCoin();

  if (product.price <= currentCoin) {
    productController.setProduct(product);

    coinController.useCoin(product.price);

    return { ok: true };
  } else {
    const diff = Math.abs(currentCoin - product.price);

    alert(`투입한 금액이 ${formatCurrency(diff)}원 부족합니다.`);

    return { ok: false };
  }
};
