// @vitest-environment jsdom
import { expect, test, beforeEach } from "vitest"
import {
  increaseBalance,
  reduceBalance,
  resetBalance,
  balance,
  switchLogType,
  insertMoney
} from "./main"

beforeEach(() => {
  document.body.innerHTML = `
    <input type="number" class="insert-input" value="" />
    <div class="product-price-display">0</div>
    <ul class="log-lists"></ul>
    <template class="log-template">
      <li class="log ellipsis"></li>
    </template>
  `
})

// 단위 테스트 - 금액변동 테스트
test("잔액을 1000원 증가시킵니다", () => {
  expect(increaseBalance(1000)).toBe(1000)
})

test("잔액을 700원 감소시킵니다", () => {
  expect(reduceBalance(700)).toBe(300)
})

test("잔액을 반환합니다", () => {
  resetBalance()
  expect(balance).toBe(0)
})

// 단위 테스트 - 로그 테스트
test("1000원을 투입했을 때 생성되는 로그입니다", () => {
  expect(switchLogType("insert", 1000)).toBe("1,000원을 투입했습니다.")
})

test("쿨라를 구입했을 때 생성되는 로그입니다", () => {
  expect(switchLogType("purchase", "", 1)).toBe("쿨라을(를) 구매했습니다.")
})

test("잔액 400원을 반환했을 때 생성되는 로그입니다", () => {
  expect(switchLogType("return", 400)).toBe("400원을 반환합니다.")
})

test("금액이 600원 모자랄 때 생성되는 로그입니다", () => {
  expect(switchLogType("insufficient", 600)).toBe("600원이 부족합니다.")
})

// 유닛 테스트
test("insertMoney 함수가 금액을 올바르게 처리하고 DOM을 업데이트하는지 테스트", () => {
  const amount = 1000

  insertMoney(amount)

  expect(balance).toBe(amount)

  const insertInput = document.querySelector(".insert-input")
  expect(insertInput.value).toBe("")

  // TODO: 1,000을 예상했는데 0이 반환됨
  const productPriceDisplay = document.querySelector(".product-price-display")
  expect(productPriceDisplay.textContent).toBe(amount.toLocaleString("ko-kr"))

  const logLists = document.querySelector(".log-lists")
  expect(logLists.textContent.trim()).toBe("1,000원을 투입했습니다.")
})
