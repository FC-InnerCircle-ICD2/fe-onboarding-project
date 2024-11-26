import Component from '../core/Component.js';
import { formatTime, formatNumber } from '../utils/helpers.js';

/** 로그 패널 컴포넌트 */
export default class LogPanel extends Component {
  template() {
    const { logs = [] } = this.props;
    return `
            <div class="log-panel">
                ${logs
                  .map(
                    (log) => `
                    <div class="log-item">
                      [${formatTime(log.timestamp)}] ${formatNumber(
                      log.message
                    )}
                    </div>
                  `
                  )
                  .join('')}
            </div>
        `;
  }

  mounted() {
    const panel = this.$target.querySelector('.log-panel');
    panel.scrollTop = panel.scrollHeight;
  }
}
