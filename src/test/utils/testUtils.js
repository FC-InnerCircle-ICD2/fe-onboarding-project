import {
  BALANCE_ARIA_LABELS,
  LOG_ARIA_LABELS,
} from "../../constants/vendingMachine";

/**
 * 테스트용 자판기 DOM 생성 함수
 * @param {number} id - 자판기의 고유 ID (기본값: 1)
 * @returns {HTMLElement} 생성된 자판기 DOM 요소
 */
export const createVendingMachineDOM = (id = 1) => {
  const machine = document.createElement("article");
  machine.id = `machine-${id}`;

  const displayPanel = document.createElement("div");
  displayPanel.setAttribute(
    "aria-label",
    BALANCE_ARIA_LABELS.BALANCE_DISPLAY_PANEL
  );
  displayPanel.textContent = "0";

  const input = document.createElement("input");
  input.type = "number";
  input.setAttribute("aria-label", BALANCE_ARIA_LABELS.BALANCE_INPUT);

  const insertButton = document.createElement("button");
  insertButton.setAttribute(
    "aria-label",
    BALANCE_ARIA_LABELS.BALANCE_INSERT_BUTTON
  );

  const logsPanel = document.createElement("div");
  logsPanel.setAttribute("aria-label", LOG_ARIA_LABELS.BALANCE_LOGS_PANEL);

  machine.appendChild(displayPanel);
  machine.appendChild(input);
  machine.appendChild(insertButton);
  machine.appendChild(logsPanel);

  return {
    machine,
    displayPanel,
    input,
    insertButton,
    logsPanel,
  };
};
