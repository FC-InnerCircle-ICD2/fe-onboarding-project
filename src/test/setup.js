import '@testing-library/dom';
import '@testing-library/jest-dom';

// 전역 테스트 설정을 추가할 수 있습니다.
beforeEach(() => {
  // 각 테스트 전에 실행될 코드
});

afterEach(() => {
  // 각 테스트 후에 실행될 코드
  document.body.innerHTML = '';
});
