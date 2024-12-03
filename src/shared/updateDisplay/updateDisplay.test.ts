/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { updateDisplay } from '.';

describe('updateDisplay', () => {
  let displayElement: HTMLDivElement;
  let displayInputElement: HTMLInputElement;

  beforeEach(() => {
    displayElement = document.createElement('div');
    displayInputElement = document.createElement('input');
  });

  it('div 요소의 textContent 속성을 업데이트한다.', () => {
    updateDisplay(displayElement, '업데이트된 데이터');

    expect(displayElement.textContent).toBe('업데이트된 데이터');
  });

  it('유효하지 않은 요소를 전달하면 무시된다.', () => {
    updateDisplay(null as unknown as HTMLElement, '데이터');

    expect(displayElement.textContent).toBe('');
  });

  it('textContent를 지원하지 않는 요소는 무시된다.', () => {
    updateDisplay(displayInputElement, '데이터');

    expect(displayInputElement.value).toBe('');
  });

  it('유효하지 않은 값(숫자 등)을 전달하면 무시된다.', () => {
    updateDisplay(displayElement, 123 as unknown as string);

    expect(displayElement.textContent).toBe('');
  });
});
