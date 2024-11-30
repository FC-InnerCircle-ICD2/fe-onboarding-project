import { LOG_ARIA_LABELS } from "../constants/vendingMachine";

class LogManager {
  #logs;
  #logsContainerEl;

  constructor(machineEl) {
    /** @type {string[]} */
    this.#logs = [];
    /** @type {HTMLElement} */
    this.#logsContainerEl = machineEl.querySelector(
      `[aria-label="${LOG_ARIA_LABELS.BALANCE_LOGS_PANEL}"]`
    );
  }

  add(log) {
    this.#logs.push(log);
    this.#render();
  }

  #render() {
    // 로그 요소 리셋
    while (this.#logsContainerEl.firstChild) {
      this.#logsContainerEl.removeChild(this.#logsContainerEl.firstChild);
    }

    this.#logs.forEach((log) => {
      const logEl = document.createElement("div");
      logEl.textContent = log;
      const logColor = log.includes("실패")
        ? "text-red-500"
        : log.includes("성공")
        ? "text-emerald-600"
        : "text-black";
      logEl.classList.add(logColor);
      this.#logsContainerEl.appendChild(logEl);
    });
    this.#logsContainerEl.scrollTo({
      top: this.#logsContainerEl.scrollHeight,
      behavior: "smooth",
    });
  }
}

export default LogManager;
