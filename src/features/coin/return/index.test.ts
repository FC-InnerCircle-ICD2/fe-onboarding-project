/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { returnCoin } from '.';
import { createCoinManager } from '../../../entities/coin/model';
import { createLogService } from '../../../shared/log';
import { insertCoin } from '../insert';

describe('returnCoin', () => {
  const coinManager = createCoinManager();
  const logWindowElement = document.createElement('div');
  const logService = createLogService(logWindowElement);

  it('잔액이 10,000원일 때, 반환을 하면 10,000원을 반환하고 잔액이 0원이 되고, 반환 금액 관련 로그가 남는다.', () => {
    insertCoin(10000, coinManager, logService);
    expect(coinManager.getCoin()).toBe(10000);

    returnCoin(coinManager, logService);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[1].textContent).toBe('10,000원이 반환되었습니다.');
    expect(coinManager.getCoin()).toBe(0);
  });

  it('현재 잔액이 0원이면, 무시한다.', () => {
    expect(coinManager.getCoin()).toBe(0);
    returnCoin(coinManager, logService);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[2]).toBeUndefined();
  });
});
