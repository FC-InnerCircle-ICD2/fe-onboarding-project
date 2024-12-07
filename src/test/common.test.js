import { describe, beforeEach, test, expect } from "vitest"
import { resetBalance } from "../balance"
import {
  formatNumberToKoreanLocale,
  selectNode,
  updateElementContent
} from "../common"

describe("DOM 관련 함수테스트", () => {
  // @vitest-environment jsdom
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="test-element">Hello World!</div>
      <input type="number" class="test-input" />
    `

    resetBalance()
  })

  test("숫자를 입력하면 한국어 통화 형식으로 변환하는지 테스트", () => {
    expect(
      formatNumberToKoreanLocale(1234567),
      "입력된 값이 숫자가 아닙니다"
    ).toBe("1,234,567")
  })

  test("selectNode 함수가 선택한 요소를 반환하는지 테스트", () => {
    const element = selectNode(".test-element")
    expect(element.textContent).toBe("Hello World!")
  })

  test("텍스트를 입력하면 element의 innerText가 변경됩니다", () => {
    updateElementContent(".test-element", "innerText")
    expect(document.querySelector(".test-element").innerText).toBe("innerText")
  })

  test("숫자를 입력하면 type='number' input의 value가 변경됩니다", () => {
    updateElementContent(".test-input", 1000, "value")
    expect(document.querySelector(".test-input").valueAsNumber).toBe(1000)
  })
})
