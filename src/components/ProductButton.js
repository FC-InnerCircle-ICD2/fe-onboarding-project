import Component from '../core/Component.js';

/** 상품 버튼 컴포넌트 */
export default class ProductButton extends Component {
  template() {
    const { product } = this.props;
    return `
            <button class="product-button" data-id="${product.id}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}원</div>
            </button>
        `;
  }

  setEvent() {
    const { onSelect, onMouseDown, onMouseUp, product, balance } = this.props;

    // 가격이 부족할 때만 mousedown/mouseup 이벤트 등록
    if (onMouseDown && balance < product.price) {
      this.addEvent('mousedown', '.product-button', () => {
        onMouseDown(product);
      });

      this.addEvent('mouseup', '.product-button', () => {
        onMouseUp();
      });
    } else {
      // 가격이 충분하거나 조건에 맞지 않으면 click 이벤트만 등록
      this.addEvent('click', '.product-button', (e) => {
        const button = e.target.closest('.product-button');
        if (!button) return;
        const productId = Number(button.dataset.id);
        onSelect(productId);
      });
    }
  }
}
