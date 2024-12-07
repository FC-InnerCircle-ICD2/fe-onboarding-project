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
    this.addEvent('click', '.product-button', (e) => {
      const button = e.target.closest('.product-button');
      if (!button) return;
      const productId = Number(button.dataset.id);

      // 가격이 충분하지 않을 때 가격 표시
      if (balance < product.price) {
        onMouseDown(product);

        // 잠시 후 가격 표시 초기화
        setTimeout(() => {
          onMouseUp();
        }, 500);
      }

      // 상품 선택 로직
      onSelect(productId);
    });
  }
}
