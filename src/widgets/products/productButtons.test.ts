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
  let productPanelElement: HTMLElement;
  let productWindowElement: HTMLDivElement;
  let productButtonsElement: HTMLDivElement;
  let logWindowElement: HTMLDivElement;

  let productManager: ReturnType<typeof createProductManager>;
  let coinManager: ReturnType<typeof createCoinManager>;
  let logService: ReturnType<typeof createLogService>;

  beforeEach(() => {
    productPanelElement = document.createElement('div');
    productPanelElement.className = 'product-panel';

    productWindowElement = document.createElement('div');
    productWindowElement.className = 'product-window';

    productButtonsElement = document.createElement('div');
    productButtonsElement.className = 'product-buttons';

    logWindowElement = document.createElement('div');
    logWindowElement.className = 'log-window';

    document.body.appendChild(productPanelElement);
    document.body.appendChild(productWindowElement);
    document.body.appendChild(productButtonsElement);
    document.body.appendChild(logWindowElement);

    productManager = createProductManager();
    coinManager = createCoinManager();
    logService = createLogService(logWindowElement);

    initializeProductButtons({
      productManager,
      coinManager,
      logService,
      elements: {
        buttons: productButtonsElement,
        window: logWindowElement,
      },
    });
  });

  it('상품 버튼 9개가 정상적으로 표시된다.', () => {
    const renderedButtons =
      productButtonsElement.querySelectorAll('.product-button');

    expect(renderedButtons.length).toBe(products.length);
  });

  it('맥주 버튼을 클릭하면 상품 구매가 이루어지고, 4,500원이 소모되고 금액창에 남은 잔액, 6,500원이 표시된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toBe(10000);

    const product = products[8];

    const productButton =
      productButtonsElement.querySelector<HTMLButtonElement>(
        `[data-product-id="${product.id}"]`,
      )!;
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    productButton.dispatchEvent(clickEvent);

    expect(coinManager.getCoin()).toBe(10000 - product.price);
    expect(logWindowElement.textContent).toBe(
      `${formatCurrency(10000 - product.price)}`,
    );
  });

  it('상품 버튼을 눌렀는데, 선택한 상품 id가 등록된 상품에 존재하지 않는 경우 구매가 무시된다.', () => {
    const invalidButton = document.createElement('button');
    invalidButton.dataset.productId = 'invalid-id';
    productButtonsElement.appendChild(invalidButton);

    invalidButton.click();

    expect(productWindowElement.textContent).toBe('');

    invalidButton.remove();
  });

  it('사이다 버튼을 누르고 있는 동안 해당 상품의 가격이 금액창에 표시되고, 떼는 순간 잔액이 표시된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toBe(10000);

    const product = products[1];

    const productButton =
      productButtonsElement.querySelector<HTMLButtonElement>(
        `[data-product-id="${product.id}"]`,
      )!;

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    productButton.dispatchEvent(mouseDownEvent);

    expect(productWindowElement.textContent).toBe(
      `${formatCurrency(product.price)}`,
    );

    const mouseLeaveEvent = new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true,
    });
    productButton.dispatchEvent(mouseLeaveEvent);

    const currentBalance = coinManager.getCoin();
    expect(productWindowElement.textContent).toBe(
      `${formatCurrency(currentBalance)}`,
    );
  });
});
