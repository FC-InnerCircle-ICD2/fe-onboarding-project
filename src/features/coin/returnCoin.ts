import type { TCoinManager } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { LogService } from '../../shared/log';

export const returnCoin = (
  coinManager: TCoinManager,
  logService: LogService,
) => {
  const returnedCoin = coinManager.returnCoin();

  logService.track(`${returnedCoin}을 반환합니다.`);

  alert(`${formatCurrency(returnedCoin)}원이 반환되었습니다.`);
};
