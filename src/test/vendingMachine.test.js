import "@testing-library/jest-dom";
import { beforeEach, describe } from "vitest";
import CurrentBalanceManager from "../managers/CurrentBalanceManager";
import LogManager from "../managers/LogManager";
import { createVendingMachineDOM } from "./utils/testUtils";

describe("VendingMachine", () => {
  let testElements;

  beforeEach(() => {
    // 테스트 자판기 DOM 요소 생성
    const { machine, displayPanel, input, insertButton, returnButton } =
      createVendingMachineDOM(1);
    document.body.appendChild(machine);

    // 이벤트 핸들러 추가
    const balanceManager = new CurrentBalanceManager(displayPanel);
    const logManager = new LogManager(machine);

    const updateBalanceDisplay = () => {
      displayPanel.textContent = balanceManager.getBalance().toLocaleString();
    };

    /******* insertMoney (start) *******/
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
    /******* insertMoney (end) *******/

    /******* returnChange (start) *******/
    const returnChange = () => {
      const returnedChange = balanceManager.returnChange();
      if (returnedChange === 0) return;
      logManager.add(`[잔액 반환] ${returnedChange.toLocaleString()}원`);
      updateBalanceDisplay();
    };

    // 잔액 반환 버튼 클릭 이벤트 핸들러
    returnButton.addEventListener("click", returnChange);
    /******* returnChange (end) *******/

    testElements = {
      displayPanel,
      input,
      insertButton,
      balanceManager,
      logManager,
      returnButton,
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

  describe("잔액 반환(returnChange) 테스트", () => {
    beforeEach(() => {
      // 1000원을 투입하고 시작
      const { input, insertButton } = testElements;
      input.value = "1000";
      insertButton.click();
    });

    it("잔액을 반환하고 잔액이 0으로 초기화되는 것을 확인", () => {
      const { balanceManager, returnButton } = testElements;
      returnButton.click();
      expect(balanceManager.getBalance()).toBe(0);
    });

    it("로그에 잔액 반환 내역이 추가되는 것을 확인", () => {
      const { returnButton } = testElements;
      returnButton.click();
      expect(testElements.logManager.getLogs().at(-1)).toContain(
        "[잔액 반환] 1,000원"
      );
    });

    it("잔액이 0원이면 잔액 반환 버튼을 눌러도 로그가 추가되지 않는 것을 확인", () => {
      const { returnButton } = testElements;
      returnButton.click();
      returnButton.click();
      // 초기 투입 1회 + 잔액 반환 1회 + 잔액 0원 로그 추가하지 않음으로 0회 = 총 2회
      expect(testElements.logManager.getLogs().length).toBe(2);
    });
  });
});
