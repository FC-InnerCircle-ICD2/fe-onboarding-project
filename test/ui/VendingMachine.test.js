import { beforeEach, describe, expect } from "vitest";

import { JSDOM } from "jsdom";
import { VendingMachine } from "../../src/models/VendingMachine";
import { VendingMachineUI } from "../../src/ui/VendingMachineUI";
import {
  InsufficientAmountError,
  InvalidAmountError,
  NoBalanceToReturnError,
} from "../../src/errors/VendingMachine";
import { SuccessMessage } from "../../src/ui/SuccessMessage";
import { formatString } from "../../src/utils/format";
const products = {
  0: { id: "0", name: "콜라", price: 1500 },
  1: { id: "1", name: "사이다", price: 1200 },
};
describe("VendingMachineUI", () => {
  let vendingMachine;
  let ui;

  let dom;
  let container;

  beforeEach(async () => {
    dom = await JSDOM.fromFile("./index.html"); // index.html 경로를 실제 프로젝트 구조에 맞게 설정
    container = dom.window.document.body;

    global.document = dom.window.document;
    global.window = dom.window;
  });
  describe("제품 버튼 생성", () => {
    it("vendingMachineUI 생성 전, 제품 버튼이 0개이어야 한다.", () => {
      const buttons = document.querySelectorAll(".product");
      expect(buttons.length).toBe(0);
    });

    it("VendingMachineUI 생성 후, 제품 버튼이 제품의 개수만큼 생성된다.", () => {
      // VendingMachineUI 생성 후,
      vendingMachine = new VendingMachine(products);
      ui = new VendingMachineUI(vendingMachine);

      // 제품 버튼이 제품의 개수만큼 생성된다.
      const buttons = document.querySelectorAll(".product");
      expect(buttons.length).toBe(2);

      // 각 제품 버튼에는 제품의 이름이 표시된다.
      buttons.forEach((button, index) => {
        expect(button.querySelector(".product-name").textContent).toBe(
          products[index].name,
        );
      });
    });
  });
  describe("이벤트 처리", () => {
    let input, button, logPanel, display, money, returnButton, insertButton;

    beforeEach(() => {
      vendingMachine = new VendingMachine(products);
      ui = new VendingMachineUI(vendingMachine);

      input = document.getElementById("money-input");
      button = document.getElementById("insert-money");
      returnButton = document.getElementById("return-money");
      insertButton = document.getElementById("insert-money");
      logPanel = document.getElementById("log");
      display = document.getElementById("display");
    });

    describe("click: insert-moeney button", () => {
      it("유효한 금액을 투입하면, 투입한 금액만큼 더하여 잔액이 표시된다.", () => {
        // 초기 상태: 잔액 0원
        expect(display.textContent).toBe(formatString(0));

        // 유효한 금액을 투입하면
        let money = 5000;
        input.value = money;
        button.click();

        // 투입한 금액만큼 잔액이 표시된다.
        expect(display.textContent).toBe(formatString(money));

        //
        input.value = money;
        button.click();

        expect(display.textContent).toBe(formatString(money * 2));
      });

      it("유효한 금액을 투입하면, 성공 메시지가 로그에 표시된다.", () => {
        // 초기 상태: 로그 없음
        expect(logPanel.textContent).toBeFalsy();

        // 유효한 금액을 투입하면
        const money = 5000;
        input.value = money;
        button.click();

        // 성공 메시지가 로그에 표시된다.
        expect(logPanel.textContent).toContain(
          SuccessMessage.insertMoney(money),
        );
      });

      it("잘못된 금액(0원)을 투입하면, 오류 메시지가 로그에 추가된다.", () => {
        // 초기상태: 로그 없음
        expect(logPanel.textContent).toBeFalsy();

        // 잘못된 금액(0원)을 투입하면
        input.value = 0;
        insertButton.click();

        // 오류 메시지가 로그에 추가된다.
        expect(logPanel.textContent).toContain(
          new InvalidAmountError().message,
        );
      });

      it("잘못된 금액(음수)을 투입하면, 오류 메시지가 로그에 추가된다.", () => {
        // 초기상태: 로그 없음
        expect(logPanel.textContent).toBeFalsy();

        // 잘못된 금액(음수)를 투입하면
        input.value = -10;
        insertButton.click();

        // 오류 메시지가 로그에 추가된다.
        logPanel = document.getElementById("log");
        expect(logPanel.textContent).toContain(
          new InvalidAmountError().message,
        );
      });

      it("잘못된 금액(빈 값)을 투입하면, 오류 메시지가 로그에 추가된다.", () => {
        // 초기상태: 로그 없음
        expect(logPanel.textContent).toBeFalsy();

        // 빈값을 투입하면
        input.value = "";
        insertButton.click();

        // 오류 메시지가 로그에 추가된다.
        expect(logPanel.textContent).toContain(
          new InvalidAmountError().message,
        );
      });
    });

    describe("click: product button", () => {
      it("", () => {});
    });

    describe("click: return-moeney button", () => {
      it("잔액이 있는 경우, 반환 버튼을 누르면, 성공 메시지가 로그에 표시된다.", () => {
        // 초기 상태: 잔액 0원 & 로그 없음
        expect(logPanel.textContent).toBeFalsy();

        const money = 5000;
        input.value = money;
        insertButton.click();

        // 잔액이 있는 경우
        expect(display.textContent).toBe(formatString(money));

        // 반환 버튼을 누르면
        returnButton.click();

        // 성공 메시지가 로그에 표시된다.
        expect(logPanel.textContent).toContain(
          SuccessMessage.returnMoney(money),
        );
      });

      it("잔액이 있는 경우, 반환 버튼을 누르면, 잔액이 0원으로 변경된다.", () => {
        // 초기 상태: 잔액 0원
        expect(display.textContent).toBe(formatString(0));

        const money = 5000;
        input.value = money;
        insertButton.click();

        // 잔액이 있는 경우
        expect(display.textContent).toBe(formatString(money));

        // 반환 버튼을 누르면
        returnButton.click();

        // 잔액이 0원으로 변경된다.
        expect(display.textContent).toBe(formatString(0));
      });

      it("잔액이 0원인 경우, 반환 버튼을 누르면, 오류 메시지가 표시된다.", () => {
        // 초기 상태: 로그 없음
        expect(logPanel.textContent).toBeFalsy();

        // 잔액이 0원인 경우
        expect(display.textContent).toBe(formatString(0));

        // 반환 버튼을 누르면
        returnButton.click();

        // 오류 메시지가 표시된다.
        expect(logPanel.textContent).toContain(
          new NoBalanceToReturnError().message,
        );
      });
    });
  });
});