/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { createLogService } from '.';

describe('createLogService', () => {
  const logWindowElement = document.createElement('div');

  it('track 메서드는 로그를 기록하고, logWindowElement에 표시한다.', () => {
    const logService = createLogService(logWindowElement);

    logService.track('첫 번째 로그');
    logService.track('두 번째 로그');

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].innerHTML).toBe('첫 번째 로그');
    expect(paragraphs[1].innerHTML).toBe('두 번째 로그');
  });

  it('로그가 추가되면 logWindowElement 하단으로 스크롤한다.', () => {
    Object.defineProperty(logWindowElement, 'scrollHeight', {
      value: 100,
      writable: true,
    });

    Object.defineProperty(logWindowElement, 'scrollTop', {
      value: 0,
      writable: true,
    });

    const logService = createLogService(logWindowElement);

    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');

    expect(logWindowElement.scrollTop).toBe(logWindowElement.scrollHeight);
  });
});
