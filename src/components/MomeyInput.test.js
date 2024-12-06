import MoneyInput from '../components/MoneyInput.js';
import { formatNumber } from '../utils/helpers.js';

describe('MoneyInput Component', () => {
  let container;
  let mockOnInputChange;

  beforeEach(() => {
    // 테스트를 위한 DOM 환경 설정
    container = document.createElement('div');
    mockOnInputChange = jest.fn();
  });

  // 테스트 목적: 입력 컴포넌트의 초기 렌더링 검증
  describe('Initialization', () => {
    it('should render with initial input value', () => {
      const props = {
        inputAmount: '',
        onInputChange: mockOnInputChange,
      };

      new MoneyInput(container, props);

      const input = container.querySelector('input');
      expect(input.value).toBe('0');
      expect(input.getAttribute('data-raw-value')).toBe('0');
    });
  });

  // 테스트 목적: 입력 이벤트 처리의 정확성
  describe('Input Handling', () => {
    it('should format input and update raw value', () => {
      const props = {
        inputAmount: '0',
        onInputChange: mockOnInputChange,
      };

      new MoneyInput(container, props);
      const input = container.querySelector('input');

      // 숫자 입력 시뮬레이션
      input.value = '1234';
      const inputEvent = new Event('input');
      input.dispatchEvent(inputEvent);

      expect(input.value).toBe('1,234');
      expect(input.getAttribute('data-raw-value')).toBe('1234');
      expect(mockOnInputChange).toHaveBeenCalledWith('1234');
    });

    it('should remove non-numeric characters', () => {
      const props = {
        inputAmount: '0',
        onInputChange: mockOnInputChange,
      };

      new MoneyInput(container, props);
      const input = container.querySelector('input');

      // 특수 문자 포함 입력 시뮬레이션
      input.value = '1,234원';
      const inputEvent = new Event('input');
      input.dispatchEvent(inputEvent);

      expect(input.value).toBe('1,234');
      expect(input.getAttribute('data-raw-value')).toBe('1234');
    });
  });

  // 테스트 목적: 경계 조건 처리
  describe('Edge Cases', () => {
    it('should handle zero input', () => {
      const props = {
        inputAmount: '0',
        onInputChange: mockOnInputChange,
      };

      new MoneyInput(container, props);
      const input = container.querySelector('input');

      input.value = '0';
      const inputEvent = new Event('input');
      input.dispatchEvent(inputEvent);

      expect(input.value).toBe('0');
      expect(input.getAttribute('data-raw-value')).toBe('0');
    });

    it('should handle large number inputs', () => {
      const props = {
        inputAmount: '0',
        onInputChange: mockOnInputChange,
      };

      new MoneyInput(container, props);
      const input = container.querySelector('input');

      input.value = '1000000';
      const inputEvent = new Event('input');
      input.dispatchEvent(inputEvent);

      expect(input.value).toBe('1,000,000');
      expect(input.getAttribute('data-raw-value')).toBe('1000000');
    });

    it('should update data-raw-value correctly', () => {
      const props = {
        inputAmount: '12abc34',
        onInputChange: mockOnInputChange,
      };

      const moneyInput = new MoneyInput(container, props);
      const input = container.querySelector('input');

      input.value = '12abc34';
      const inputEvent = new Event('input');
      input.dispatchEvent(inputEvent);

      expect(input.value).toBe('1,234');
      expect(input.getAttribute('data-raw-value')).toBe('1234');
      expect(moneyInput.props.inputAmount).toBe('1234');
    });
  });
});
