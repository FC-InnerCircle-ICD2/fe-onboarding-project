/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { createCoinManager } from '../../entities/coin/model';
import { formatCurrency } from '../../shared/currency';
import { createLogService } from '../../shared/log';
import { initializeCoinForm } from './coinForm';

describe('initializeCoinForm', () => {
  document.body.innerHTML = `
      <div class="product-window"></div>
      <form class="coin-form">
        <input type="number" class="coin-input" name="coin" />
      </form>
      <button class="coin-return-button"></button>
      <div class="log-window"></div>
    `;

  const coinManager = createCoinManager();
  const logService = createLogService(
    document.querySelector<HTMLDivElement>('.log-window')!,
  );

  const form = document.querySelector<HTMLFormElement>('.coin-form')!;
  const input = document.querySelector<HTMLInputElement>('.coin-input')!;
  const returnButton = document.querySelector<HTMLButtonElement>(
    '.coin-return-button',
  )!;
  const windowElement =
    document.querySelector<HTMLDivElement>('.product-window')!;

  beforeEach(() => {
    initializeCoinForm({
      coinManager,
      logService,
      elements: {
        form,
        returnButton,
        window: windowElement,
      },
    });
  });

  it('0원을 투입할 시 무시된다', () => {
    input.value = '0';

    const submitEvent = new SubmitEvent('submit', { bubbles: true });
    form.dispatchEvent(submitEvent);

    expect(coinManager.getCoin()).toBe(0);
    expect(windowElement.textContent).toBe(formatCurrency(0));
    expect(input.value).toBe('');
  });

  it('투입할 금액을 작성하고, 투입 버튼을 누르면 잔액이 1500원이 되고, 금액창에 1,500으로 표시되고, 투입이 완료된 후 input은 초기화된다.', () => {
    input.value = '1500';

    const submitEvent = new SubmitEvent('submit', { bubbles: true });
    form.dispatchEvent(submitEvent);

    expect(coinManager.getCoin()).toBe(1500);
    expect(windowElement.textContent).toBe(formatCurrency(1500));
    expect(input.value).toBe('');
  });

  it('연속적으로 투입해도 동작한다.', () => {
    input.value = '1500';

    const submitEvent1 = new SubmitEvent('submit', { bubbles: true });
    form.dispatchEvent(submitEvent1);

    expect(coinManager.getCoin()).toBe(3000);
    expect(windowElement.textContent).toBe(formatCurrency(3000));
    expect(input.value).toBe('');

    input.value = '1500';

    const submitEvent2 = new SubmitEvent('submit', { bubbles: true });
    form.dispatchEvent(submitEvent2);

    expect(coinManager.getCoin()).toBe(4500);
    expect(windowElement.textContent).toBe(formatCurrency(4500));
    expect(input.value).toBe('');

    input.value = '1500';

    const submitEvent3 = new SubmitEvent('submit', { bubbles: true });
    form.dispatchEvent(submitEvent3);

    expect(coinManager.getCoin()).toBe(6000);
    expect(windowElement.textContent).toBe(formatCurrency(6000));
    expect(input.value).toBe('');
  });

  it('500원의 잔액이 있을 때, 반환 버튼을 누르면 잔액이 0원으로 변경되고, 금액창에 0으로 표시된다.', () => {
    coinManager.insertCoin(500);

    const clickEvent = new MouseEvent('click', { bubbles: true });
    returnButton.dispatchEvent(clickEvent);

    expect(coinManager.getCoin()).toBe(0);
    expect(windowElement.textContent).toBe(formatCurrency(0));
  });
});
