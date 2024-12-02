import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

// 예시 테스트
describe('메인 페이지', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <h1>자판기</h1>
      </div>
    `;
  });

  it('제목이 올바르게 표시되어야 합니다', () => {
    expect(screen.getByText('자판기')).toBeInTheDocument();
  });
});
