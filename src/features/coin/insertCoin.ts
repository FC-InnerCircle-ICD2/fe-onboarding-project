import type { CoinController, TCoin } from '../../entities/coin/model';
import { LogService } from '../../shared/log';

export const insertCoin = (
  coin: TCoin,
  coinController: CoinController,
  logService: LogService,
) => {
  coinController.insertCoin(coin);
  logService.track(`${coin}을 투입합니다.`);
};
