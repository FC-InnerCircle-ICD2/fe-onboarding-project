import { describe } from "vitest";
import CurrentBalanceManager from "../managers/CurrentBalanceManager";

describe("CurrentBalanceManager", () => {
  /** @type {HTMLDivElement} */
  let balanceDisplayEl;
  /** @type {CurrentBalanceManager} */
  let balanceManager;

  beforeEach(() => {
    const machineSection = document.createElement("section");
    balanceDisplayEl = document.createElement("div");
    machineSection.appendChild(balanceDisplayEl);

    balanceManager = new CurrentBalanceManager(machineSection);
  });

  describe("add()", () => {
    it("금액 투입 시 잔액이 정상적으로 증가해야 함", () => {
      balanceManager.add(1000);
      expect(balanceManager.getBalance()).toBe(1000);
    });
    it("0원 이하 금액 투입은 잔액에 영향을 주지 않아야 함", () => {
      balanceManager.add(1000);
      balanceManager.add(-1000);
      expect(balanceManager.getBalance()).toBe(1000);
      balanceManager.add(0);
      expect(balanceManager.getBalance()).toBe(1000);
    });
  });

  describe("canAfford()", () => {
    it("입력된 금액이 잔액보다 크거나 같으면 true를 반환해야 함", () => {
      balanceManager.add(5000);
      expect(balanceManager.canAfford(3000)).toBe(true);
      expect(balanceManager.canAfford(5000)).toBe(true);
    });
    it("입력된 금액이 잔액보다 적으면 false를 반환해야 함", () => {
      balanceManager.add(1000);
      expect(balanceManager.canAfford(2000)).toBe(false);
    });
  });

  describe("subtract()", () => {
    it("금액 출금 시 잔액이 정상적으로 감소해야 함", () => {
      balanceManager.add(5000);
      balanceManager.subtract(3000);
      expect(balanceManager.getBalance()).toBe(2000);
    });

    it("잔액이 부족할 경우 출금이 실패해야 함", () => {
      balanceManager.add(1000);
      expect(balanceManager.subtract(2000)).toBe(false);
      expect(balanceManager.getBalance()).toBe(1000);
    });
  });

  describe("returnChange()", () => {
    it("반환 시 잔액을 반환하고, 잔액을 0원으로 초기화해야 함", () => {
      balanceManager.add(1000);
      expect(balanceManager.returnChange()).toBe(1000);
      expect(balanceManager.getBalance()).toBe(0);
    });
  });

  describe("getNeededMoney()", () => {
    it("현재 잔액에서 입력한 금액을 빼고 -1을 곱한 금액을 반환해야 함", () => {
      balanceManager.add(5000);
      expect(balanceManager.getNeededMoney(3000)).toBe(-2000);
      expect(balanceManager.getNeededMoney(7000)).toBe(2000);
    });
  });
});
