import type { TCoinManager } from '../../entities/coin/model';
import type { TProduct, TProductManger } from '../../entities/products/model';
import { LogService } from '../../shared/log';
import type { TResponse } from '../../shared/response';

export const purchaseProduct = (
  product: TProduct,
  productManager: TProductManger,
  coinManager: TCoinManager,
  logService: LogService,
): TResponse => {
  const currentCoin = coinManager.getCoin();

  if (product.price <= currentCoin) {
    productManager.setProduct(product);
    logService.track(`${product.name}을/를 구매했습니다.`);

    coinManager.useCoin(product.price);
    logService.track(`${product.price}원을 소비했습니다.`);

    return { ok: true };
  } else {
    const diff = Math.abs(currentCoin - product.price);

    logService.track(
      `${product.name} 구매에 실패했습니다.\n${diff}원이 부족합니다.`,
    );

    return { ok: false };
  }
};
