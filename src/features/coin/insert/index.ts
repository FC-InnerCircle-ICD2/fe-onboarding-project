import type { TCoinManager } from '../../../entities/coin/model';
import { formatCurrency } from '../../../shared/currency';
import { TLogService } from '../../../shared/log';
import { TResponse } from '../../../shared/response';

export const insertCoin = (
  targetCoin: number | string,
  coinManager: TCoinManager,
  logService: TLogService,
): TResponse => {
  if (!targetCoin) {
    return { ok: false };
  }

  const coin = Number(targetCoin);

  if (isNaN(coin)) {
    logService.track(`잘못된 투입 금액입니다.`);

    return { ok: false };
  }

  coinManager.insertCoin(coin);
  logService.track(`${formatCurrency(coin)}원을 투입했습니다.`);

  return { ok: true };
};
