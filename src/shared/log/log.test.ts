/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { createLogService } from '.';

describe('createLogService', () => {
  let logWindowElement: HTMLDivElement;
  let logService: ReturnType<typeof createLogService>;
  let logParagraphElements: NodeListOf<HTMLParagraphElement>;

  beforeEach(() => {
    logWindowElement = document.createElement('div');
    logService = createLogService(logWindowElement);
  });

  it('track 메서드는 로그를 기록하고, logWindowElement에 표시한다.', () => {
    logService.track('첫 번째 로그');
    logService.track('두 번째 로그');

    logParagraphElements =
      logWindowElement.querySelectorAll<HTMLParagraphElement>(
        '.log-window_paragraph',
      );

    expect(logParagraphElements.length).toBe(2);
    expect(logParagraphElements[0].textContent).toBe('첫 번째 로그');
    expect(logParagraphElements[1].textContent).toBe('두 번째 로그');
  });

  it('문자열이 아닌 로그를 track하면, 무시된다.', () => {
    logService.track(0 as unknown as string);

    logParagraphElements =
      logWindowElement.querySelectorAll<HTMLParagraphElement>(
        '.log-window_paragraph',
      );

    expect(logParagraphElements.length).toBe(0);
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

    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');
    logService.track('스크롤 테스트 로그');

    expect(logWindowElement.scrollTop).toBe(logWindowElement.scrollHeight);
  });
});
