import type { TCoin, TCoinManager } from '../../entities/coin/model';
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
  logService.track(`${coin}을 투입합니다.`);
};
