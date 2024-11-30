import type { TCoin, TCoinManager } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { LogService } from '../../shared/log';

export const insertCoin = (
  coin: TCoin,
  coinManager: TCoinManager,
  logService: LogService,
) => {
  if (isNaN(coin)) {
    logService.track(`잘못된 투입 금액입니다.`);

    return;
  }

  coinManager.insertCoin(coin);
  logService.track(`${formatCurrency(coin)}원을 투입합니다.`);
};
