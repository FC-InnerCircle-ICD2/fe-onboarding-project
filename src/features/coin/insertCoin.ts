import type { CoinController, TCoin } from '../../entities/coin/model';
import { LogService } from '../../shared/log';

export const insertCoin = (
  coin: TCoin,
  coinController: CoinController,
  logService: LogService,
) => {
  if (isNaN(coin)) {
    logService.track(`잘못된 투입 금액입니다.`);

    return;
  }

  coinController.insertCoin(coin);
  logService.track(`${coin}을 투입합니다.`);
};
