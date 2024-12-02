const VendingMachineController = (() => {
  const init = async (ui, service) => {
      try {
          const products = await service.loadProducts('./data/products.json');
          ui.renderProducts(document.getElementById('products-list'), document.getElementById('product-template'), products);
          setupEvents(ui, service);
      } catch (error) {
          console.error('Error loading products:', error);
      }
  };

  const setupEvents = (ui, service) => {
      const productsList = document.getElementById('products-list');
      const inputField = document.getElementById('inputAmount');
      const display = document.getElementById('display');
      const log = document.getElementById('log');
      const insertButton = document.getElementById('insertAmountButton');
      const returnButton = document.getElementById('returnAmountButton');

      const totalAmount = 0;

      // 상품 클릭 이벤트
      productsList.addEventListener('mousedown', (event) =>
          handleProductClick(event, ui, service, totalAmount, display, log)
      );

      productsList.addEventListener('mouseup', () =>
          ui.updateDisplay(display, totalAmount)
      );

      // 금액 투입 버튼 클릭 이벤트
      insertButton.addEventListener('click', () =>
          handleInsertAmount(inputField, ui, service, totalAmount, display, log)
      );

      // 금액 반환 버튼 클릭 이벤트
      returnButton.addEventListener('click', () =>
          handleReturnAmount(ui, totalAmount, display, log)
      );
  };

  const handleProductClick = (event, ui, service, totalAmount, display, log) => {
      const button = event.target;
      if (!button.classList.contains('product')) return;

      const productPrice = Number.parseInt(button.dataset.price);
      const productName = button.querySelector('.product-name').textContent;

      if (service.isAffordable(totalAmount, productPrice)) {
          totalAmount = service.purchaseProduct(totalAmount, productPrice);
          ui.logAction(log, `${productName}를 구매했습니다.`);
      } else {
          ui.updateDisplay(display, productPrice);
      }
  };

  const handleInsertAmount = (inputField, ui, service, totalAmount, display, log) => {
      const amount = Number.parseInt(inputField.value);
      if (Number.isNaN(amount) || amount <= 0) {
          ui.logAction(log, '올바른 금액을 입력해주세요.');
          return;
      }

      totalAmount = service.insertAmount(totalAmount, amount);
      ui.updateDisplay(display, totalAmount);
      ui.logAction(log, `${ui.formatNumber(amount)}원을 투입했습니다.`);
      ui.clearInputField(inputField);
  };

  const handleReturnAmount = (ui, totalAmount, display, log) => {
      if (totalAmount > 0) {
          ui.logAction(
              log,
              `${ui.formatNumber(totalAmount)}원을 반환합니다.`
          );
          totalAmount = 0;
          ui.updateDisplay(display, totalAmount);
      } else {
          ui.logAction(log, '반환할 금액이 없습니다.');
      }
  };

  return { init };
})();

export default VendingMachineController