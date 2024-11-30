/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { updateDisplay } from '.';

describe('updateDisplay', () => {
  it('div 요소의 textContent 속성을 업데이트한다.', () => {
    const inputElement = document.createElement('div') as HTMLDivElement;
    updateDisplay(inputElement, '업데이트된 데이터');
    expect(inputElement.textContent).toBe('업데이트된 데이터');
  });

  it('유효하지 않은 요소를 전달하면 무시된다.', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    updateDisplay(null as unknown as HTMLElement, '데이터');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });

  it('textContent를 지원하지 않는 요소는 무시된다.', () => {
    const inputElement = document.createElement('input') as HTMLInputElement;
    updateDisplay(inputElement, '데이터');
    expect(inputElement.value).toBe('');
  });

  it('유효하지 않은 값(숫자 등)을 전달하면 무시된다.', () => {
    const divElement = document.createElement('div');
    updateDisplay(divElement, 123 as unknown as string);
    expect(divElement.textContent).toBe('');
  });
});
