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
    mockComponent.priceDisplay.innerText = "0"; // 초기화
    mockComponent.productGroup.innerHTML = ""; // 기존 제품 제거
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

  it("productItemsRender(): 제품이 올바르게 렌더링 되여야함", () => {
    manager.productItemsRender();

    const productButtons = mockComponent.productGroup.querySelectorAll(
      '[data-testId="product-item"]'
    );

    expect(productButtons.length).toBe(productData.length);

    productData.forEach((product, index) => {
      const productButton = productButtons[index];
      expect(productButton.dataset.productName).toBe(product.name);
      expect(productButton.dataset.productPrice).toBe(String(product.price));
    });
  });
  it("productEventHandler(): 이벤트가 올바르게 바인딩되고 상태가 업데이트되어야 한다", () => {
    // Mock purchase() 함수 호출 추적
    const purchaseSpy = jest.spyOn(manager, "purchase");

    // 제품 렌더링
    manager.productItemsRender();
    // 이벤트 바인딩
    manager.productEventHandler();

    const productGroup = mockComponent.productGroup;
    const firstProduct = productGroup.querySelector(
      '[data-testId="product-item"]'
    );
    // 상태 업데이트 전: 구매 상태가 false
    mockState.state.purchaseState = false;

    const eventConfig = {
      bubbles: true,
      cancelable: true,
    };
    // MouseDown 이벤트 테스트
    firstProduct?.dispatchEvent(new MouseEvent("mousedown", eventConfig));
    expect(mockComponent.priceDisplay.innerText).toBe("1,000"); // 가격 표시 확인

    // MouseUp 이벤트 테스트
    firstProduct.dispatchEvent(new MouseEvent("mouseup", eventConfig));
    expect(mockComponent.priceDisplay.innerText).toBe("0"); // 초기화 확인

    // 구매 상태 true로 설정 후 클릭 이벤트 테스트
    mockState.state.purchaseState = true;
    firstProduct.dispatchEvent(new MouseEvent("click", eventConfig));

    expect(purchaseSpy).toHaveBeenCalledWith({
      name: "콜라",
      price: 1000,
    });

    purchaseSpy.mockRestore();
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
