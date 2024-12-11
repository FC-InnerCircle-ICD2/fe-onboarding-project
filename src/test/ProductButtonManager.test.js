import { describe, vi } from "vitest";
import ProductButtonManager from "../managers/ProductButtonManager";

describe("ProductButtonManager", () => {
  /** @type {HTMLElement} */
  let machineEl;
  /** @type {ProductButtonManager} */
  let buttonManager;
  /** @type {HTMLElement} */
  let productButtonListEl;

  const mockProducts = [
    { name: "콜라", price: 1500 },
    { name: "사이다", price: 1000 },
  ];

  const mockHandlers = {
    onBuyProduct: vi.fn(),
    onProductMouseDown: vi.fn(),
    onProductMouseUp: vi.fn(),
  };

  beforeEach(() => {
    machineEl = document.createElement("div");
    productButtonListEl = document.createElement("div");
    productButtonListEl.className = "product-button-list";
    machineEl.appendChild(productButtonListEl);

    buttonManager = new ProductButtonManager(
      machineEl,
      mockProducts,
      mockHandlers
    );
    buttonManager.init();
  });

  describe("상품 버튼 생성", () => {
    it("상품 목록에 맞게 버튼이 생성되어야 함", () => {
      const buttons = productButtonListEl.querySelectorAll("button");
      expect(buttons.length).toBe(mockProducts.length);
    });

    it("생성된 버튼은 상품 정보를 올바르게 표시해야 함", () => {
      const firstButton = productButtonListEl.querySelector("button");
      expect(firstButton.getAttribute("data-name")).toBe("콜라");
      expect(firstButton.getAttribute("data-price")).toBe("1500");
      expect(firstButton.querySelector("span").textContent).toBe("콜라");
    });
  });

  describe("이벤트 핸들링", () => {
    it("버튼 클릭 시 onBuyProduct 핸들러가 호출되어야 함", () => {
      const firstButton = productButtonListEl.querySelector("button");
      firstButton.click();

      expect(mockHandlers.onBuyProduct).toHaveBeenCalledWith(mockProducts[0]);
    });

    it("버튼 mousedown 시 onProductMouseDown 핸들러가 호출되어야 함", () => {
      const firstButton = productButtonListEl.querySelector("button");
      firstButton.dispatchEvent(new MouseEvent("mousedown"));

      expect(mockHandlers.onProductMouseDown).toHaveBeenCalledWith(1500);
    });

    // it("버튼 mouseup 시 onProductMouseUp 핸들러가 호출되어야 함", () => {
    //   const firstButton = productButtonListEl.querySelector("button");
    //   firstButton.dispatchEvent(new MouseEvent("mouseup"));

    //   expect(mockHandlers.onProductMouseUp).toHaveBeenCalled();
    // });
  });
});
