import { LOG_ARIA_LABELS } from "../constants/vendingMachine";
import LogManager from "../managers/LogManager";

describe("LogManager", () => {
  /** @type {HTMLDivElement} */
  let logsContainerEl;
  /** @type {LogManager} */
  let logManager;

  beforeEach(() => {
    const machineSection = document.createElement("section");
    logsContainerEl = document.createElement("div");
    logsContainerEl.setAttribute(
      "aria-label",
      LOG_ARIA_LABELS.BALANCE_LOGS_PANEL
    );
    machineSection.appendChild(logsContainerEl);

    logManager = new LogManager(machineSection);
  });

  it("add 메서드가 입력한 메세지를 로그 배열에 추가해야 함", () => {
    const message = "테스트 메시지";
    logManager.add(message);
    expect(logManager.getLogs().at(-1)).toEqual(message);
  });

  it("로그 패널에 스크롤이 생기면 로그가 추가될때마다 스크롤이 최하단으로 이동해야 함", () => {
    logsContainerEl.style.height = "100px";
    logsContainerEl.style.overflow = "auto";

    for (let i = 0; i < 10; i++) {
      logManager.add(`테스트 메시지 ${i + 1}`);
    }

    const { scrollTop, scrollHeight, clientHeight } = logsContainerEl;
    expect(scrollTop).toBe(scrollHeight - clientHeight);

    logManager.add("테스트 메시지 11");
    expect(scrollTop).toBe(scrollHeight - clientHeight);
  });
});
