import { describe, beforeEach, test, expect } from "vitest"
import { switchLogType, addLog } from "../log"

describe("로그 메세지를 생성하는 테스트", () => {
  // @vitest-environment jsdom
  beforeEach(() => {
    document.body.innerHTML = `
        <ul class="log-lists"></ul>
        <template class="log-template">
        <li class="log ellipsis"></li>
        </template>
    `
  })

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

  test("addLog 함수가 화면을 올바르게 변경하는지 테스트합니다", () => {
    const logLists = document.querySelector(".log-lists")
    expect(logLists.children.length).toBe(0)

    addLog("insert", 1000)

    expect(logLists.children.length).toBe(1)
  })
})
