import Component from '../core/Component.js';
import { formatNumber } from '../utils/helpers.js';

/** 금액 입력 컴포넌트 */
export default class MoneyInput extends Component {
  constructor($target, props) {
    props.inputAmount = props.inputAmount.replace(/[^\d]/g, '');
    super($target, props);
    this.inputRef = null;
  }

  template() {
    const { inputAmount } = this.props;
    const rawValue = Number(inputAmount).toString();

    return `
            <div class="money-input">
              <input 
                type="text" 
                min="0" 
                placeholder="금액을 입력하세요" 
                value="${formatNumber(Number(rawValue))}"
                data-raw-value="${rawValue}"
              />
            </div>
          `;
  }

  mounted() {
    this.inputRef = this.$target.querySelector('input');
    if (this.inputRef) {
      // 포커스를 유지하기 위해 처음에 포커스 설정
      this.inputRef.focus();
      this.inputRef.addEventListener('input', this.handleInput.bind(this));
    }
  }

  handleInput(event) {
    const inputElement = event.target;

    // 현재 커서 위치 저장 (포맷팅 전)
    const selectionStart = inputElement.selectionStart;
    const originalValue = inputElement.value;

    // 입력된 값에서 숫자가 아닌 문자 제거
    const rawValue = inputElement.value.replace(/[^\d]/g, '');

    // 포맷팅된 값으로 input 업데이트
    const formattedValue = formatNumber(Number(rawValue));
    inputElement.value = formattedValue;

    // 실제 raw 값을 data-raw-value 속성에 저장
    inputElement.setAttribute('data-raw-value', rawValue);

    // 커서 위치 조정 로직
    const cursorAdjustment = this.calculateCursorPosition(
      originalValue,
      formattedValue,
      selectionStart
    );

    // 새 커서 위치 설정
    inputElement.setSelectionRange(cursorAdjustment, cursorAdjustment);

    // 부모 컴포넌트에 상태 변경 알림 (필수)
    // this.props.onInputChange?.(rawValue);
  }

  // 커서 위치 계산 메서드
  calculateCursorPosition(originalValue, formattedValue, originalCursorPos) {
    // 원본 문자열에서 커서 위치 이전의 숫자만 추출
    const beforeCursor = originalValue
      .slice(0, originalCursorPos)
      .replace(/[^\d]/g, '');

    // 포맷팅된 값에서 해당 숫자의 위치 찾기
    let newCursorPos = 0;
    let digitCount = 0;

    for (let i = 0; i < formattedValue.length; i++) {
      if (/\d/.test(formattedValue[i])) {
        digitCount++;

        // 현재 숫자가 beforeCursor의 길이와 같아지면 현재 위치 저장
        if (digitCount === beforeCursor.length) {
          newCursorPos = i + 1;
          break;
        }
      }
    }

    // 콤마 개수만큼 보정
    const commasBeforeCursor =
      formattedValue.slice(0, newCursorPos).split(',').length - 1;
    return newCursorPos + commasBeforeCursor;
  }
}
