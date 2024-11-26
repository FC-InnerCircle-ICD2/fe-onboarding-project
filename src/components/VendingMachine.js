import Component from '../core/Component.js';
import DisplayPanel from './DisplayPanel.js';
import ProductButton from './ProductButton.js';
import MoneyInput from './MoneyInput.js';
import LogPanel from './LogPanel.js';
import { products } from '../utils/helpers.js';

/** 자판기 메인 컴포넌트 */
export default class VendingMachine extends Component {
  setup() {
    this.state = {
      balance: 0,
      inputAmount: '0',
      logs: [],
      displayAmount: 0,
    };
  }

  template() {
    return `
            <div class="vending-machine">
                <div class="machine-container">
                    <div data-component="display"></div>
                    <div class="products-grid">
                        ${products
                          .map(
                            (product) => `
                            <div data-component="product-${product.id}"></div>
                        `
                          )
                          .join('')}
                    </div>
                </div>
                <div class="control-panel">
                  <form class="money-control" data-component="money-form">
                    <div data-component="money-input"></div>
                    <div class="money-actions">
                      <button class="insert-button" data-component="insert-money">투입</button>
                      <button class="reset-button" data-component="reset-money">반환</button>
                    </div>
                  </form>
                  <div data-component="log"></div>
                </div>
            </div>
        `;
  }

  mounted() {
    const { balance, displayAmount, logs, inputAmount } = this.state;

    /** 자판기의 현재 금액을 나타내는 패널 */
    const $display = this.$target.querySelector('[data-component="display"]');
    if ($display) {
      new DisplayPanel($display, {
        amount: displayAmount || balance,
      });
    }

    /** 자판기 제품의 버튼 리스트 */
    products.forEach((product) => {
      const productButton = this.$target.querySelector(
        `[data-component="product-${product.id}"]`
      );

      if (productButton) {
        new ProductButton(productButton, {
          product,
          balance,
          onSelect: (productId) => this.handleProductSelect(productId),
          onMouseDown: () => this.handleProductMouseDown(product),
          onMouseUp: () => this.handleProductMouseUp(),
        });
      }
    });

    new MoneyInput(
      this.$target.querySelector('[data-component="money-input"]'),
      {
        inputAmount,
        onInputChange: (value) => {
          this.setState({ inputAmount: value });
        },
      }
    );

    new LogPanel(this.$target.querySelector('[data-component="log"]'), {
      logs,
    });

    /** 폼의 submit 이벤트 처리 */
    const moneyForm = this.$target.querySelector(
      '[data-component="money-form"]'
    );
    moneyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputField = this.$target.querySelector(
        '[data-component="money-input"] input'
      );
      // data-raw-value 속성에서 값을 가져옴
      const amount = Number(inputField.getAttribute('data-raw-value'));

      if (amount > 0) {
        this.handleMoneyInsert(amount);
        inputField.value = '';
        inputField.setAttribute('data-raw-value', '0');
      }
    });

    /** 리셋 버튼 클릭 처리 */
    const resetButton = this.$target.querySelector(
      '[data-component="reset-money"]'
    );
    resetButton.addEventListener('click', () => this.handleMoneyReset());
  }

  handleProductSelect(productId) {
    const product = products.find((p) => p.id === productId);
    const { balance } = this.state;

    if (balance >= product.price) {
      this.setState({
        balance: balance - product.price,
        logs: [
          ...this.state.logs,
          {
            message: `${product.name} 구매 완료`,
            timestamp: new Date(),
          },
        ],
      });
    } else if (product && balance < product.price) {
      this.setState({
        displayAmount: product.price, // 부족한 금액을 화면에 표시
      });
    }
  }

  handleProductMouseDown(product) {
    const { balance } = this.state;

    // 잔액이 충분하지 않을 때만 가격 표시
    if (balance < product.price) {
      this.setState({
        displayAmount: product.price,
      });
    }
  }

  handleProductMouseUp() {
    this.setState({
      displayAmount: 0,
    });
  }

  handleMoneyInsert(amount) {
    const { balance } = this.state;

    if (amount > 0) {
      this.setState({
        balance: balance + amount,
        inputAmount: '0',
        logs: [
          ...this.state.logs,
          {
            message: `${amount}원 투입`,
            timestamp: new Date(),
          },
        ],
      });

      // 입력 필드 초기화
      const input = this.$target.querySelector('input');
      input.value = ''; // 입력 필드 초기화

      // 서버에 요청 보내는 부분 (추후 구현 예정)
      // 예시: fetch('/api/money-insert', { method: 'POST', body: JSON.stringify({ amount }) });
    }
  }

  handleMoneyReset() {
    const { balance } = this.state;

    if (balance > 0) {
      this.setState({
        balance: 0,
        inputAmount: '0',
        logs: [
          ...this.state.logs,
          {
            message: `${balance}원 반환`,
            timestamp: new Date(),
          },
        ],
      });

      // 서버에 요청 보내는 부분 (추후 구현 예정)
      // 예시: fetch('/api/money-reset', { method: 'POST' });
    }
  }
}
