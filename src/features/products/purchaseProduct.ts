import type { CoinController } from '../../entities/coin/model';
import type {
  ProductController,
  TProduct,
} from '../../entities/products/model';
import { LogService } from '../../shared/log';
import type { TResponse } from '../../shared/response';

export const purchaseProduct = (
  product: TProduct,
  productController: ProductController,
  coinController: CoinController,
  logService: LogService,
): TResponse => {
  const currentCoin = coinController.getCoin();

  if (product.price <= currentCoin) {
    productController.setProduct(product);
    logService.track(`${product.name}을/를 구매했습니다.`);

    coinController.useCoin(product.price);
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
