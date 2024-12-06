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

    // 입력된 값에서 숫자가 아닌 문자 제거
    const rawValue = event.target.value.replace(/[^\d]/g, '');

    // 포맷팅된 값으로 input 업데이트
    inputElement.value = formatNumber(Number(rawValue));

    // 실제 raw 값을 data-raw-value 속성에 저장
    inputElement.setAttribute('data-raw-value', rawValue);

    // props 업데이트 (부모 컴포넌트에 알림)
    this.props.onInputChange?.(rawValue);
  }
}
