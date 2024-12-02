/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { purchaseProduct } from '.';
import { createCoinManager } from '../../../entities/coin/model';
import {
  createProductManager,
  products,
} from '../../../entities/products/model';
import { formatCurrency } from '../../../shared/currency';
import { createLogService } from '../../../shared/log';
import { insertCoin } from '../../coin/insert';

describe('purchaseProduct', () => {
  const coinManager = createCoinManager();
  const productManager = createProductManager();
  const logWindowElement = document.createElement('div');
  const logService = createLogService(logWindowElement);

  it('잔액이 상품 가격보다 적다면 상품 구매 실패 로그가 남고 false를 반환한다.', () => {
    const product = products[8];

    const response = purchaseProduct(
      product,
      productManager,
      coinManager,
      logService,
    );

    expect(response.ok).toBe(false);
    expect(productManager.getProduct()).toBeNull();
    expect(coinManager.getCoin()).toBe(0);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    const diff = Math.abs(coinManager.getCoin() - product.price);
    expect(paragraphs[0].textContent).toBe(
      `${product.name} 상품 구매에 실패했습니다. ${formatCurrency(
        diff,
      )}원이 부족합니다.`,
    );
  });

  it('잔액이 상품 가격보다 많다면 현재 상품이 선택되고, 투입한 금액이 소진되고, 상품 구매 로그가 남고, true를 반환한다.', () => {
    insertCoin(10000, coinManager, logService);

    const product = products[8];

    const response = purchaseProduct(
      product,
      productManager,
      coinManager,
      logService,
    );

    expect(response.ok).toBe(true);
    expect(productManager.getProduct()).toBe(product);
    expect(coinManager.getCoin()).toBe(10000 - product.price);

    const paragraphs = logWindowElement.querySelectorAll(
      '.log-window_paragraph',
    );

    expect(paragraphs[2].textContent).toBe(
      `${product.name} 상품을 구매했습니다. ${formatCurrency(
        product.price,
      )}원을 사용했습니다.`,
    );
  });
});
