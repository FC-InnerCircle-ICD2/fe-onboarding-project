import { formatNumber, formatTime, products } from '../utils/helpers.js';

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    // 테스트 목적: 숫자를 천 단위로 콤마 포맷팅하는 함수의 정확성 검증
    it('should format numbers with comma separator', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1500)).toBe('1,500');
      expect(formatNumber(10000)).toBe('10,000');
      expect(formatNumber(0)).toBe('0');
    });

    it('should handle large numbers correctly', () => {
      expect(formatNumber(1000000)).toBe('1,000,000');
    });
  });

  describe('formatTime', () => {
    // 테스트 목적: 시간 포맷팅 함수의 형식 일관성 검증
    it('should format time in KO-KR locale', () => {
      const mockDate = new Date('2023-01-01T14:30:45');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      const formattedTime = formatTime();
      expect(formattedTime).toMatch(/\d{2}:\d{2}:\d{2}/);

      global.Date.mockRestore();
    });
  });

  describe('products', () => {
    // 테스트 목적: 상품 데이터의 무결성 검증
    it('should have valid product structure', () => {
      products.forEach((product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(typeof product.id).toBe('number');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
      });

      expect(products.length).toBeGreaterThan(0);
    });

    it('should have unique product ids', () => {
      const ids = products.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
