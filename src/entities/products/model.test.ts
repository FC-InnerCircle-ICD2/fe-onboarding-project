import { beforeEach, describe, expect, it } from 'vitest';
import { createProductManager, products } from './model';

describe('createProductManager', () => {
  let productManager: ReturnType<typeof createProductManager>;

  beforeEach(() => {
    productManager = createProductManager();
  });

  it('기본적으로 currentProduct는 null이다.', () => {
    expect(productManager.getProduct()).toBeNull();
  });

  it('setProduct를 호출하면 currentProduct가 설정된다.', () => {
    const product = products[0];

    productManager.setProduct(product);
    expect(productManager.getProduct()).toEqual(product);
  });

  it('resetProduct를 호출하면 currentProduct가 null로 초기화된다.', () => {
    const product = products[1];

    productManager.setProduct(product);
    expect(productManager.getProduct()).toEqual(product);

    productManager.resetProduct();
    expect(productManager.getProduct()).toBeNull();
  });

  it('getProduct는 currentProduct를 반환한다.', () => {
    const product = products[2];

    productManager.setProduct(product);
    expect(productManager.getProduct()).toEqual(product);
  });

  it('여러 번 호출 시 상태가 올바르게 변경된다.', () => {
    const firstProduct = products[3];
    productManager.setProduct(firstProduct);
    expect(productManager.getProduct()).toEqual(firstProduct);

    const secondProduct = products[4];
    productManager.setProduct(secondProduct);
    expect(productManager.getProduct()).toEqual(secondProduct);

    productManager.resetProduct();
    expect(productManager.getProduct()).toBeNull();
  });
});
