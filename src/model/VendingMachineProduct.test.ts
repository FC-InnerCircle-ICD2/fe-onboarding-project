import { VendingMachineProduct } from "./VendingMachineProduct";

describe("VendingMachineProduct 클래스 테스트", () => {
  let product: VendingMachineProduct;

  beforeEach(() => {
    // 각 테스트 전에 VendingMachineProduct 인스턴스 초기화
    product = new VendingMachineProduct();
  });

  it("초기 상태에서 disabled는 false여야 한다", () => {
    // 초기 disabled 상태 확인
    expect(product.disabled).toBe(false);
  });

  it("set disabled로 상태를 변경할 수 있어야 한다", () => {
    // disabled 상태를 true로 변경
    product.disabled = true;
    expect(product.disabled).toBe(true);

    // disabled 상태를 다시 false로 변경
    product.disabled = false;
    expect(product.disabled).toBe(false);
  });

  it("item은 HTMLButtonElement여야 한다", () => {
    // item이 HTMLButtonElement인지 확인
    expect(product.item).toBeInstanceOf(HTMLButtonElement);
  });

  it("setItemState()로 버튼의 disabled 속성을 변경할 수 있어야 한다", () => {
    // 초기 상태에서 버튼의 disabled는 false여야 함
    expect(product.item.disabled).toBe(false);

    // setItemState로 버튼의 disabled를 true로 설정
    product.setItemState({ disabled: true });
    expect(product.item.disabled).toBe(true);

    // setItemState로 다시 disabled를 false로 설정
    product.setItemState({ disabled: false });
    expect(product.item.disabled).toBe(false);
  });

  it("innerHTML()로 버튼의 innerHTML을 변경할 수 있어야 한다", () => {
    // 초기 상태에서 innerHTML은 빈 문자열이어야 함
    expect(product.item.innerHTML).toBe("");

    // innerHTML 메서드를 사용하여 버튼의 내용을 설정
    product.innerHTML("Test Button");
    expect(product.item.innerHTML).toBe("Test Button");
  });

  it("setItemState() 호출 시 기본값으로 disabled가 false여야 한다", () => {
    // setItemState 호출 시 옵션을 제공하지 않으면 disabled는 false여야 함
    product.setItemState({});
    expect(product.item.disabled).toBe(false);
  });
});
