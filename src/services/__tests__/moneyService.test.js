import { describe, it, expect, beforeEach } from 'vitest';
import createMoneyService from '../moneyService';

describe('금액 서비스', () => {
  let moneyService;

  beforeEach(() => {
    moneyService = createMoneyService();
  });

  describe('금액 유효성 검사', () => {
    it('0원 이하의 금액을 입력하면 에러 메시지를 반환한다', () => {
      const result = moneyService.validateMoneyInput(0);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('올바른 금액을 입력해주세요.');
    });

    it('1억원을 초과하는 금액을 입력하면 에러 메시지를 반환한다', () => {
      const result = moneyService.validateMoneyInput(100000001);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('1억원 이상은 투입할 수 없습니다.');
    });

    it('현재 금액과 입력 금액의 합이 1억원을 초과하면 에러 메시지를 반환한다', () => {
      moneyService.insertMoney(90000000);
      const result = moneyService.validateMoneyInput(20000000);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('1억원 이상은 투입할 수 없습니다.');
    });

    it('유효한 금액을 입력하면 true를 반환한다', () => {
      const result = moneyService.validateMoneyInput(1000);
      expect(result.isValid).toBe(true);
    });
  });

  describe('금액 투입', () => {
    it('유효한 금액을 투입하면 현재 금액이 증가한다', () => {
      const result = moneyService.insertMoney(1000);
      expect(result.isValid).toBe(true);
      expect(result.currentMoney).toBe(1000);
      expect(result.message).toBe('1000원이 투입되었습니다.');
    });

    it('유효하지 않은 금액을 투입하면 에러 메시지를 반환한다', () => {
      const result = moneyService.insertMoney(-1000);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('올바른 금액을 입력해주세요.');
    });
  });

  describe('금액 차감', () => {
    beforeEach(() => {
      moneyService.insertMoney(5000);
    });

    it('현재 금액보다 적은 금액을 차감하면 성공한다', () => {
      const result = moneyService.deductMoney(3000);
      expect(result.isValid).toBe(true);
      expect(result.currentMoney).toBe(2000);
    });

    it('현재 금액보다 많은 금액을 차감하면 에러 메시지를 반환한다', () => {
      const result = moneyService.deductMoney(6000);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('잔액이 부족합니다.');
    });
  });

  describe('금액 반환', () => {
    it('현재 금액이 있으면 전액 반환한다', () => {
      moneyService.insertMoney(5000);
      const result = moneyService.returnMoney();
      expect(result.amount).toBe(5000);
      expect(result.message).toBe('5000원이 반환되었습니다.');
      expect(moneyService.getCurrentMoney()).toBe(0);
    });

    it('현재 금액이 0원이면 0원을 반환한다', () => {
      const result = moneyService.returnMoney();
      expect(result.amount).toBe(0);
    });
  });

  describe('현재 금액 조회', () => {
    it('현재 금액을 정확히 반환한다', () => {
      moneyService.insertMoney(3000);
      expect(moneyService.getCurrentMoney()).toBe(3000);
    });
  });
});
