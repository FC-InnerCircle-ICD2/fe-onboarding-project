import { describe, it, expect, beforeEach } from 'vitest';
import createProductService from '../productService';
import createMoneyService from '../moneyService';

describe('상품 서비스', () => {
  const mockProducts = [
    { id: 1, name: '콜라', price: 1500 },
    { id: 2, name: '사이다', price: 1000 },
  ];

  let moneyService;
  let productService;

  beforeEach(() => {
    moneyService = createMoneyService();
    productService = createProductService(mockProducts, moneyService);
  });

  describe('상품 조회', () => {
    it('ID로 상품을 조회할 수 있다', () => {
      const product = productService.getProductById(1);
      expect(product).toEqual({ id: 1, name: '콜라', price: 1500 });
    });

    it('존재하지 않는 ID로 조회하면 undefined를 반환한다', () => {
      const product = productService.getProductById(999);
      expect(product).toBeUndefined();
    });

    it('모든 상품을 조회할 수 있다', () => {
      const products = productService.getAllProducts();
      expect(products).toEqual(mockProducts);
    });
  });

  describe('구매 유효성 검사', () => {
    it('잔액이 충분하면 구매가 가능하다', () => {
      moneyService.insertMoney(2000);
      const result = productService.validatePurchase(mockProducts[0]);
      expect(result.isValid).toBe(true);
    });

    it('잔액이 부족하면 에러 메시지를 반환한다', () => {
      moneyService.insertMoney(1000);
      const result = productService.validatePurchase(mockProducts[0]);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('잔액이 부족합니다. (필요금액: 500원)');
    });
  });

  describe('상품 구매', () => {
    it('정상적인 구매 시 성공 메시지와 함께 구매 정보를 반환한다', () => {
      moneyService.insertMoney(2000);
      const result = productService.purchaseProduct(1);

      expect(result.isValid).toBe(true);
      expect(result.message).toBe('콜라를 구매했습니다. (1500원)');
      expect(result.product).toEqual(mockProducts[0]);
      expect(result.currentMoney).toBe(500);
    });

    it('잔액이 부족하면 구매가 실패한다', () => {
      moneyService.insertMoney(1000);
      const result = productService.purchaseProduct(1);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('잔액이 부족합니다. (필요금액: 500원)');
    });

    it('여러 번 구매 시 잔액이 정상적으로 차감된다', () => {
      moneyService.insertMoney(5000);

      const firstPurchase = productService.purchaseProduct(1); // 1500원
      expect(firstPurchase.isValid).toBe(true);
      expect(firstPurchase.currentMoney).toBe(3500);

      const secondPurchase = productService.purchaseProduct(2); // 1000원
      expect(secondPurchase.isValid).toBe(true);
      expect(secondPurchase.currentMoney).toBe(2500);
    });
  });
});
