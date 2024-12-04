import { StateManager } from "./StateManager";

describe("StateManager 클래스 테스트", () => {
  // 테스트 전에 StateManager 인스턴스 초기화
  let stateManager: StateManager<{ count: number; name: string }>;

  beforeEach(() => {
    stateManager = new StateManager({ count: 0, name: "test" });
  });

  it("초기 상태가 올바르게 설정되어야 한다", () => {
    // 초기값이 올바르게 설정되었는지 확인
    expect(stateManager.state.count).toBe(0);
    expect(stateManager.state.name).toBe("test");
  });

  it("상태 속성을 업데이트할 수 있어야 한다", () => {
    // 상태 값을 변경하고 결과를 확인
    stateManager.state.count = 10;
    expect(stateManager.state.count).toBe(10);

    stateManager.state.name = "updated";
    expect(stateManager.state.name).toBe("updated");
  });

  it("상태 변경 시 리스너가 호출되어야 한다", () => {
    // 리스너 등록
    const listener = jest.fn();
    stateManager.addListener(listener);

    // 상태를 변경하여 리스너 호출 테스트
    stateManager.state.count = 42;

    expect(listener).toHaveBeenCalledTimes(1); // 리스너가 한 번 호출되었는지 확인
  });

  it("알 수 없는 속성에 접근할 경우 에러를 발생시켜야 한다", () => {
    // 존재하지 않는 속성에 접근할 경우 오류가 발생해야 함
    expect(() => {
      // @ts-expect-error: 'unknown'은 정의되지 않은 속성이므로 의도적으로 타입 오류 발생
      console.log(stateManager.state.unknown);
    }).toThrow('Property "unknown" does not exist on state.');
  });

  it("알 수 없는 속성에 값을 설정할 경우 에러를 발생시켜야 한다", () => {
    // 존재하지 않는 속성에 값을 설정할 경우 오류가 발생해야 함
    expect(() => {
      // @ts-expect-error: 'unknown'은 정의되지 않은 속성이므로 의도적으로 타입 오류 발생
      stateManager.state.unknown = 123;
    }).toThrow('Cannot set unknown property "unknown" on state.');
  });

  it("여러 리스너를 추가했을 때 모두 호출되어야 한다", () => {
    // 두 개의 리스너를 등록
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    stateManager.addListener(listener1);
    stateManager.addListener(listener2);

    // 상태를 변경하여 리스너 호출 테스트
    stateManager.state.count = 100;

    expect(listener1).toHaveBeenCalledTimes(1); // 첫 번째 리스너가 호출되었는지 확인
    expect(listener2).toHaveBeenCalledTimes(1); // 두 번째 리스너가 호출되었는지 확인
  });
});
