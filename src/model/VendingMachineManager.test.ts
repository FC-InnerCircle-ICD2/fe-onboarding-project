import { convertPriceFormat } from "../shared/priceFormat";
import { StateManager } from "./StateManager";
import { VendingMachineManager } from "./VendingMachineManager";

describe("VendingMachineManager 클래스 테스트", () => {
  let mockState: StateManager<{
    insertAmount: number;
    remainingAmount: number;
    displayPrice: number;
    purchaseState: boolean;
  }>;
  let mockComponent: any;
  let productData: any[];
  let manager: VendingMachineManager;

  beforeAll(() => {
    // scrollTo 메서드 Mocking
    Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });
  });

  beforeEach(() => {
    // 상태와 컴포넌트 초기화
    mockState = new StateManager({
      insertAmount: 0,
      remainingAmount: 0,
      displayPrice: 0,
      purchaseState: false,
    });

    mockComponent = {
      insertInput: document.createElement("input"),
      priceDisplay: document.createElement("span"),
      insertButton: document.createElement("button"),
      returnButton: document.createElement("button"),
      logsContainer: document.createElement("ul"),
      productGroup: document.createElement("div"),
    };

    productData = [
      { id: 1, name: "콜라", price: 1000 },
      { id: 2, name: "사이다", price: 1200 },
    ];

    manager = new VendingMachineManager({
      productData,
      state: mockState,
      component: mockComponent,
    });

    // 기본 초기화
    manager.build();
  });

  it("초기 상태가 올바르게 설정되어야 한다", () => {
    expect(mockState.state.insertAmount).toBe(0);
    expect(mockState.state.remainingAmount).toBe(0);
    expect(mockState.state.purchaseState).toBe(false);

    expect(mockComponent.priceDisplay.innerText).toBe("0");
    expect(mockComponent.insertButton.disabled).toBe(true);
    expect(mockComponent.returnButton.disabled).toBe(true);
  });

  it("onChangeInsert(): 금액 입력이 올바르게 포맷팅되고 상태에 반영되어야 한다", () => {
    mockComponent.insertInput.value = "1234";
    mockComponent.insertInput.dispatchEvent(new Event("input"));

    expect(mockComponent.insertInput.value).toBe("1,234");
    expect(mockState.state.insertAmount).toBe(1234);
  });

  it("insert(): 금액 투입 후 상태와 로그가 업데이트되어야 한다", () => {
    mockState.state.insertAmount = 5000;
    mockComponent.insertButton.dispatchEvent(new Event("click"));

    expect(mockState.state.remainingAmount).toBe(5000);
    expect(mockState.state.purchaseState).toBe(true);
    expect(mockComponent.priceDisplay.innerText).toBe("5,000");

    const log = mockComponent.logsContainer.querySelector("li");
    expect(log?.innerText).toBe(`5,000원을 투입했습니다.`);
  });

  it("return(): 금액 반환 후 상태와 로그가 업데이트되어야 한다", () => {
    mockState.state.remainingAmount = 3000;
    mockComponent.returnButton.click();

    expect(mockState.state.remainingAmount).toBe(0);
    expect(mockState.state.purchaseState).toBe(false);
    expect(mockComponent.priceDisplay.innerText).toBe("0");

    const log = mockComponent.logsContainer.querySelector("li");
    expect(log?.innerText).toBe("3,000원이 반환되었습니다.");
  });

  it("generatorProducts(): 제품이 렌더링되고 이벤트가 바인딩되어야 한다", () => {
    // "data-testid"를 사용하여 요소 식별
    const productButtons = mockComponent.productGroup.querySelectorAll(
      '[data-testid="product-item"]'
    );

    expect(productButtons.length).toBe(productData.length);

    const firstProduct = productButtons[0];
    expect(firstProduct.dataset.productName).toBe("콜라");
    expect(firstProduct.dataset.productPrice).toBe("1000");
  });

  it("purchase(): 상품 구매 후 상태와 로그가 업데이트되어야 한다", () => {
    mockState.state.remainingAmount = 2000;

    manager.purchase({ name: "콜라", price: 1000 });

    expect(mockState.state.remainingAmount).toBe(1000);
    expect(mockComponent.priceDisplay.innerText).toBe(
      convertPriceFormat(String(mockState.state.remainingAmount))
    );

    const log = mockComponent.logsContainer.querySelector("li");
    expect(log?.innerText).toBe("콜라을 구입했습니다.");
  });
});
