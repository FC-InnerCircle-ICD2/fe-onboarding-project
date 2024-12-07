import { describe, beforeEach, test, expect } from "vitest"
import {
  increaseBalance,
  reduceBalance,
  resetBalance,
  getBalance,
  insertMoney
} from "../balance"

describe("잔액 변동 테스트", () => {
  beforeEach(() => resetBalance())

  test("increaseBalance에 입력한 만큼 잔액이 증가한다", () => {
    expect(getBalance()).toBe(0)
    increaseBalance(1000)
    expect(getBalance(), "잔액이 일치하지 않습니다").toBe(1000)
  })

  test("reduceBalance에 입력한 만큼 잔액이 감소한다", () => {
    expect(getBalance()).toBe(0)
    increaseBalance(1000)
    reduceBalance(700)
    expect(getBalance(), "잔액이 일치하지 않습니다").toBe(300)
  })

  test("잔액을 0으로 만든다", () => {
    expect(getBalance()).toBe(0)
    increaseBalance(1000)
    resetBalance()
    expect(getBalance(), "잔액이 일치하지 않습니다").toBe(0)
  })
})
