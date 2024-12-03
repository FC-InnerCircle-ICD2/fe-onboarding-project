import VendingMachineService from '../services/vendingMachineService.js';

describe("loadProducts ()", () => {
  it("상품 데이터를 가져와 반환해야 한다.", async () => {
    // fetch를 Mock 처리
    const mockResponse = [{ name: "Product1", price: 1000 }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await VendingMachineService.loadProducts("dummy-url");
    expect(result).toEqual(mockResponse);

    // fetch 복원
    global.fetch.mockRestore();
  });

  it("fetch가 실패하면 오류를 콘솔에 기록해야 한다.", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject("Fetch error"));

    const result = await VendingMachineService.loadProducts("dummy-url");
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith("Error loading products:", "Fetch error");

    // Cleanup
    global.fetch.mockRestore();
    consoleSpy.mockRestore();
  });
});

describe("isAffordable ()", () => {
  it("총 금액이 상품의 가격보다 크거나 같으면 True 를 반환해야 한다.", () => {
    const result = VendingMachineService.isAffordable(1000, 500);
    expect(result).toBe(true);
  });

  it("총 금액이 상품의 가격보다 작으면 False 를 반환해야 한다.", () => {
    const result = VendingMachineService.isAffordable(500, 1000);
    expect(result).toBe(false);
  });
}); 

describe("insertAmount ()", () => {
  it("총액에 투입한 금액을 추가해야 한다.", () => {
    const result = VendingMachineService.insertAmount(0, 500);
    expect(result).toBe(500);
  });
}); 

describe("returnAmount ()", () => {
  it("항상 0을 반환해야 한다.", () => {
    expect(VendingMachineService.returnAmount()).toBe(0);
  });
});

describe("purchaseProduct ()", () => {
  it("총 금액이 상품의 가격보다 크거나 같으면 총 금액에서 상품 가격을 차감해야 한다.", () => {
    expect(VendingMachineService.purchaseProduct(1000, 500)).toBe(500);
  });

  it("총 금액이 상품의 가격보다 작은경우 기존의 총 금액을 반환해야 한다.", () => {
    expect(VendingMachineService.purchaseProduct(1000, 1500)).toBe(1000);
  });
});