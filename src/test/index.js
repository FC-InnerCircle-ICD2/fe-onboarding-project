// @vitest-environment jsdom
import { expect, test, beforeEach } from "vitest"
import {
  increaseBalance,
  reduceBalance,
  resetBalance,
  balance,
  formatNumberToKoreanLocale,
  selectNode,
  updateElement,
  switchLogType,
  insertMoney,
  returnMoney,
  purchaseProduct,
  addLog,
  getBalance
} from "./main"
import { products } from "./constants/products"

beforeEach(() => {
  document.body.innerHTML = `
    <input type="number" class="insert-input" value="" />
    
    <div class="product-price-display">0</div>
    
    <ul class="log-lists"></ul>
    <template class="log-template">
      <li class="log ellipsis"></li>
    </template>

    <div class="test-element">Hello</div>
    <input type="number" class="test-input" />
  `
})

// ===== 단위 테스트 - 금액변동 테스트 =====
test("increaseBalance에 입력한 만큼 잔액이 증가한다", () => {
  expect(getBalance()).toBe(0)
  increaseBalance(1000)
  expect(getBalance()).toBe(1000)
})

test("잔액을 700원 감소시킵니다", () => {
  expect(reduceBalance(700)).toBe(300)
})

test("잔액을 반환합니다", () => {
  resetBalance()
  expect(balance).toBe(0)
})

// ===== 단위 테스트 - 로그 테스트 =====
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

// ===== 단위 테스트 - DOM 변경 테스트 =====
test("formatNumberToKoreanLocale 함수가 숫자를 한국어 통화 형식으로 변환하는지 테스트", () => {
  expect(formatNumberToKoreanLocale(1234567)).toBe("1,234,567")
})

test("selectNode 함수가 선택한 요소를 반환하는지 테스트", () => {
  const element = selectNode(".test-element")
  expect(element.textContent).toBe("Hello")
})

test("updateElement 함수가 innerText를 업데이트하는지 테스트", () => {
  updateElement(".test-element", "world")
  expect(document.querySelector(".test-element").innerText).toBe("world")
})

test("updateElement 함수가 value를 업데이트하는지 테스트", () => {
  updateElement(".test-input", "", "value")
  expect(document.querySelector(".test-input").value).toBe("")
})

test("addLog 함수가 화면을 올바르게 변경하는지 테스트합니다", () => {
  addLog("insert", 1000)

  const logLists = document.querySelector(".log-lists")
  expect(logLists.children[0].textContent.trim()).toBe(
    "1,000원을 투입했습니다."
  )
})

// ===== 유닛 테스트 =====
test("insertMoney 함수가 잔액을 올바르게 변경하고, 화면을 변경하는지 테스트합니다", () => {
  const amount = 1000
  insertMoney(amount)

  expect(balance).toBe(amount)

  const insertInput = document.querySelector(".insert-input")
  expect(insertInput.value).toBe("")

  const productPriceDisplay = document.querySelector(".product-price-display")
  expect(productPriceDisplay.innerText).toBe(amount.toLocaleString("ko-kr"))

  const logLists = document.querySelector(".log-lists")
  expect(logLists.textContent.trim()).toBe("1,000원을 투입했습니다.")
})

test("returnMoney 함수가 잔액을 올바르게 변경하고, 화면을 변경하는지 테스트합니다", () => {
  resetBalance()
  increaseBalance(1000)

  returnMoney()

  const logLists = document.querySelector(".log-lists")
  expect(logLists.textContent.trim()).toBe("1,000원을 반환합니다.")

  expect(balance).toBe(0)

  const productPriceDisplay = document.querySelector(".product-price-display")
  expect(productPriceDisplay.textContent).toBe(balance.toLocaleString("ko-kr"))
})

test("상품금액이 잔액보다 큰 경우 purchaseProduct 함수가 잔액을 올바르게 변경하고, 화면을 변경하는지 테스트합니다", () => {
  resetBalance()
  const amount = 2000
  const productId = 1
  increaseBalance(amount)

  purchaseProduct(productId, amount)

  expect(balance).toBe(
    amount - products.find(product => product.id === productId).price
  )

  const productPriceDisplay = document.querySelector(".product-price-display")
  expect(productPriceDisplay.innerText).toBe(balance.toLocaleString("ko-kr"))

  const logLists = document.querySelector(".log-lists")
  expect(logLists.textContent.trim()).toBe("쿨라을(를) 구매했습니다.")
})

test("상품금액보다 잔액이 작은 경우 purchaseProduct 함수가 화면을 변경하는지 테스트합니다", () => {
  resetBalance()
  const amount = 1000
  const productId = 1
  increaseBalance(amount)

  purchaseProduct(productId, amount)

  expect(balance).toBe(1000)

  // const productPriceDisplay = document.querySelector(".product-price-display")
  // expect(productPriceDisplay.textContent.trim()).toBe(
  //   balance.toLocaleString("ko-kr")
  // )

  const logLists = document.querySelector(".log-lists")
  expect(logLists.textContent.trim()).toBe("500원이 부족합니다.")
})
