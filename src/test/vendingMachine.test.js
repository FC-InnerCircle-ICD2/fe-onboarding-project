import "@testing-library/jest-dom";
import { BALANCE_ARIA_LABELS } from "../constants/vendingMachine";
import CurrentBalanceManager from "../managers/CurrentBalanceManager";
import LogManager from "../managers/LogManager";
import { createVendingMachineDOM } from "./utils/testUtils";
import { beforeEach, describe } from "vitest";

describe("VendingMachine", () => {
  let testElements;

  beforeEach(() => {
    // 테스트 자판기 DOM 요소 생성
    const { machine, displayPanel, input, insertButton } =
      createVendingMachineDOM(1);
    document.body.appendChild(machine);

    // 이벤트 핸들러 추가
    const balanceManager = new CurrentBalanceManager(displayPanel);
    const logManager = new LogManager(machine);

    const updateBalanceDisplay = () => {
      displayPanel.textContent = balanceManager.getBalance().toLocaleString();
    };

    // 투입 버튼 클릭 이벤트 핸들러 추가
    insertButton.addEventListener("click", () => {
      const parsedMoney = parseInt(input.value.replace(/,/g, ""));
      if (parsedMoney > 0) {
        balanceManager.add(parsedMoney);
        logManager.add(`[금액 투입] ${parsedMoney.toLocaleString()}원`);
      }
      input.value = "0";
      updateBalanceDisplay();
      input.focus();
    });

    testElements = {
      displayPanel,
      input,
      insertButton,
      balanceManager,
      logManager,
    };
  });

  describe("잔액 투입(insertMoney) 테스트", () => {
    it("input에 값을 입력하고 투입 버튼을 누르면 잔액이 입력한 금액만큼 증가하고, 3자리마다 쉼표가 추가되는 것을 확인", () => {
      const { input, displayPanel, insertButton } = testElements;

      input.value = "1000";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      insertButton.click();
      expect(displayPanel).toHaveTextContent("1,000");
    });
  });
});
