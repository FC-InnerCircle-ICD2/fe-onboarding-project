import type { TCoinManager } from '../../../entities/coin/model';
import type {
  TProduct,
  TProductManger,
} from '../../../entities/products/model';
import { formatCurrency } from '../../../shared/currency';
import { TLogService } from '../../../shared/log';
import type { TResponse } from '../../../shared/response';

export const purchaseProduct = (
  product: TProduct,
  productManager: TProductManger,
  coinManager: TCoinManager,
  logService: TLogService,
): TResponse => {
  const currentCoin = coinManager.getCoin();

  if (product.price <= currentCoin) {
    productManager.setProduct(product);
    coinManager.useCoin(product.price);

    logService.track(
      `${product.name} 상품을 구매했습니다. ${formatCurrency(
        product.price,
      )}원을 사용했습니다.`,
    );

    return { ok: true };
  } else {
    const diff = Math.abs(currentCoin - product.price);

    logService.track(
      `${product.name} 상품 구매에 실패했습니다. ${formatCurrency(
        diff,
      )}원이 부족합니다.`,
    );

    return { ok: false };
  }
};
