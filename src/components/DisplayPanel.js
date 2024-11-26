import Component from '../core/Component.js';
import { formatNumber } from '../utils/helpers.js';

/** 금액 표시 패널 */
export default class DisplayPanel extends Component {
  template() {
    const { amount = 0 } = this.props;
    return `
            <div class="display-panel">
                <div class="amount">${formatNumber(amount)}원</div>
            </div>
        `;
  }
}
