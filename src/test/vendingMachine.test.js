import "@testing-library/jest-dom";
import { beforeEach, describe } from "vitest";
import CurrentBalanceManager from "../managers/CurrentBalanceManager";
import LogManager from "../managers/LogManager";
import { createVendingMachineDOM } from "./utils/testUtils";

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

    // insertMoney
    const insertMoney = () => {
      const parsedMoney = parseInt(input.value.replace(/,/g, ""));
      if (parsedMoney > 0) {
        balanceManager.add(parsedMoney);
        logManager.add(`[금액 투입] ${parsedMoney.toLocaleString()}원`);
      }
      input.value = "0";
      updateBalanceDisplay();
      input.focus();
    };

    // 투입 버튼 클릭 이벤트 핸들러
    insertButton.addEventListener("click", insertMoney);

    // Enter 키 이벤트 핸들러
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        insertMoney();
      }
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
    // 1000원을 넣고 투입버튼을 클릭하여 돈을 넣고 시작
    beforeEach(() => {
      const { input, insertButton } = testElements;
      input.value = "1000";
      insertButton.click();
    });

    it("input에 값을 입력하고 투입 버튼을 누르면 잔액이 입력한 금액만큼 증가, 3자리마다 쉼표가 추가되는 것을 확인", () => {
      const { input, displayPanel } = testElements;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      expect(displayPanel).toHaveTextContent("1,000");
    });

    it("로그에 투입 내역이 추가되는 것을 확인", () => {
      const { input } = testElements;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      expect(testElements.logManager.getLogs().at(-1)).toContain(
        "[금액 투입] 1,000원"
      );
    });

    it("input에 0원 이하의 값을 입력하면 잔액이 변경되지 않고, input이 0으로 초기화되는 것을 확인", () => {
      const { input, balanceManager, insertButton } = testElements;
      input.value = "-1000";
      insertButton.click();
      expect(balanceManager.getBalance()).toBe(1000);
      expect(input.value).toBe("0");
    });

    it("금액을 투입하고 input에 포커스가 유지되는 것을 확인", () => {
      const { input } = testElements;
      expect(input).toHaveFocus();
    });

    it("input에 값을 입력하고 Enter 키를 눌러도 금액이 투입되는 것을 확인", () => {
      const { input, balanceManager } = testElements;
      input.value = "1000";
      const enterEvent = new KeyboardEvent("keypress", {
        key: "Enter",
        bubbles: true,
      });
      input.dispatchEvent(enterEvent);

      expect(balanceManager.getBalance()).toBe(2000);
    });
  });
});
