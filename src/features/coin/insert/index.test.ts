/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { insertCoin } from '.';
import { createCoinManager } from '../../../entities/coin/model';
import { createLogService } from '../../../shared/log';

describe('insertCoin', () => {
  let coinManager: ReturnType<typeof createCoinManager>;
  let logService: ReturnType<typeof createLogService>;
  let logWindowElement: HTMLDivElement;
  let logParagraphElements: NodeListOf<HTMLParagraphElement>;

  beforeEach(() => {
    logWindowElement = document.createElement('div');
    coinManager = createCoinManager();
    logService = createLogService(logWindowElement);
  });

  it('1000원을 투입하면 로그가 남고 true를 반환한다.', () => {
    const response = insertCoin(1000, coinManager, logService);

    logParagraphElements =
      logWindowElement.querySelectorAll<HTMLParagraphElement>(
        '.log-window_paragraph',
      );

    expect(response.ok).toBe(true);
    expect(logParagraphElements.length).toBe(1);
  });

  it('1000원을 여러번 투입하면 로그가 여러번 남고 true를 반환한다.', () => {
    const response1 = insertCoin(1000, coinManager, logService);
    const response2 = insertCoin(1500, coinManager, logService);
    const response3 = insertCoin(2000, coinManager, logService);

    expect(response1.ok).toBe(true);
    expect(response2.ok).toBe(true);
    expect(response3.ok).toBe(true);

    logParagraphElements =
      logWindowElement.querySelectorAll<HTMLParagraphElement>(
        '.log-window_paragraph',
      );

    expect(logParagraphElements.length).toBe(3);
  });

  it("잘못된 형태를 투입하면 '잘못된 투입 금액입니다.' 로그가 남고 false를 반환한다.", () => {
    const response = insertCoin('1000원', coinManager, logService);

    expect(response.ok).toBe(false);

    logParagraphElements =
      logWindowElement.querySelectorAll<HTMLParagraphElement>(
        '.log-window_paragraph',
      );

    expect(logParagraphElements.length).toBe(1);
  });

  it('0원을 투입하면 false를 반환하고, 로그는 남지 않는다.', () => {
    const response = insertCoin('0', coinManager, logService);

    expect(response.ok).toBe(false);

    logParagraphElements =
      logWindowElement.querySelectorAll<HTMLParagraphElement>(
        '.log-window_paragraph',
      );

    expect(logParagraphElements.length).toBe(0);
  });
});
