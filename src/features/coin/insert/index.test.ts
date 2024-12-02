/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { insertCoin } from '.';
import { createCoinManager } from '../../../entities/coin/model';
import { createLogService } from '../../../shared/log';

describe('insertCoin', () => {
  const coinManager = createCoinManager();
  const logWindowElement = document.createElement('div');
  const logService = createLogService(logWindowElement);

  it('1000원을 투입하면 로그가 남고 true를 반환한다.', () => {
    const response = insertCoin(1000, coinManager, logService);

    expect(response.ok).toBe(true);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[0].textContent).toBe('1,000원을 투입했습니다.');
  });

  it('1000원을 여러번 투입하면 로그가 여러번 남고 true를 반환한다.', () => {
    const response1 = insertCoin(1000, coinManager, logService);
    const response2 = insertCoin(1000, coinManager, logService);
    const response3 = insertCoin(1000, coinManager, logService);

    expect(response1.ok).toBe(true);
    expect(response2.ok).toBe(true);
    expect(response3.ok).toBe(true);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[1].textContent).toBe('1,000원을 투입했습니다.');
    expect(paragraphs[2].textContent).toBe('1,000원을 투입했습니다.');
    expect(paragraphs[3].textContent).toBe('1,000원을 투입했습니다.');
  });

  it("잘못된 형태를 투입하면 '잘못된 투입 금액입니다.' 로그가 남고 false를 반환한다.", () => {
    const response = insertCoin('1000원', coinManager, logService);

    expect(response.ok).toBe(false);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[4].textContent).toBe('잘못된 투입 금액입니다.');
  });

  it('0원 투입하면 false를 반환하고, 로그는 남지 않는다.', () => {
    const response = insertCoin(0, coinManager, logService);

    expect(response.ok).toBe(false);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[5]).toBeUndefined();
  });
});
