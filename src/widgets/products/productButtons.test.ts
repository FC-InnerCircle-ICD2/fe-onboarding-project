/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { createCoinManager } from '../../entities/coin/model';
import { createProductManager, products } from '../../entities/products/model';
import { formatCurrency } from '../../shared/currency';
import { createLogService } from '../../shared/log';
import {
  createProductButton,
  initializeProductButtons,
} from './productButtons';

describe('createProductButton', () => {
  it('createProductButton 함수 호출 시 button.product-button 요소가 생성되고, dataset.productId가 123으로 설정된다.', () => {
    const product = {
      id: '123',
      name: 'Test Product',
      price: 5000,
    };

    const button = createProductButton(product);

    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button.className).toBe('product-button');
    expect(button.dataset.productId).toBe('123');

    const productNameElement = button.querySelector('.product-button_name');
    const productPriceElement = button.querySelector('.product-button_price');

    expect(productNameElement?.textContent).toBe('Test Product');
    expect(productPriceElement?.textContent).toBe(`${formatCurrency(5000)}원`);
  });
});

describe('initializeProductButtons', () => {
  document.body.innerHTML = `
      <section class="product-panel">
        <div class="product-window"></div>
        <div class="product-buttons"></div>
      </section>
      <div class="log-window"></div>
    `;

  const productManager = createProductManager();
  const coinManager = createCoinManager();
  const logService = createLogService(
    document.querySelector<HTMLDivElement>('.log-window')!,
  );

  const buttons = document.querySelector<HTMLDivElement>('.product-buttons')!;
  const windowElement =
    document.querySelector<HTMLDivElement>('.product-window')!;

  beforeEach(() => {
    initializeProductButtons({
      productManager,
      coinManager,
      logService,
      elements: {
        buttons,
        window: windowElement,
      },
    });
  });

  it('상품 버튼 9개가 정상적으로 렌더링 된다.', () => {
    const renderedButtons = buttons.querySelectorAll('.product-button');
    expect(renderedButtons.length).toBe(products.length);
  });

  it('특정 버튼을 클릭하면 상품 구매가 이루어지고, 잔액이 소모되고 금액창에 남은 잔액이 표시된다.', () => {
    coinManager.insertCoin(10000);
    const product = products[0];

    const productButton = buttons.querySelector<HTMLButtonElement>(
      `[data-product-id="${product.id}"]`,
    )!;

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    productButton.dispatchEvent(clickEvent);

    expect(coinManager.getCoin()).toBe(10000 - product.price);
    expect(windowElement.textContent).toBe(
      `${formatCurrency(10000 - product.price)}`,
    );
  });
});
