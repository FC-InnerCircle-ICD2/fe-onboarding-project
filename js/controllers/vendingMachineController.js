const VendingMachineController = (() => {
  const init = async (state, ui, service) => {
      try {
          const products = await service.loadProducts('./data/products.json');
          state.products = products;

          ui.renderProducts(state.productsList, state.template, state.products);
          setupEvents(state, ui, service);
      } catch (error) {
          console.error('Error loading products:', error);
      }
  };

  const setupEvents = (state, ui, service) => {

    state.productsList.addEventListener('click', (event) =>
        handleProductClick(event, state, ui, service)
    );

      state.productsList.addEventListener('mousedown', (event) =>
        displayProductPriceIfUnaffordable(event, state, ui, service)
      );

      state.productsList.addEventListener('mouseup', () =>
          ui.updateDisplay(state.display, state.totalAmount)
      );

      state.insertButton.addEventListener('click', () =>
          handleInsertAmount(state, ui, service)
      );

      state.returnButton.addEventListener('click', () =>
          handleReturnAmount(state, ui)
      );
  };

  const handleProductClick = (event, state, ui, service) => {
      const button = event.target;
      if (!button.classList.contains('product')) return;

      const productPrice = Number.parseInt(button.dataset.price);
      const productName = button.querySelector('.product-name').textContent;

      if (service.isAffordable(state.totalAmount, productPrice)) {
          state.totalAmount = service.purchaseProduct(state.totalAmount, productPrice);
          ui.logAction(state.log, `${productName}를 구매했습니다.`);
          ui.updateDisplay(state.display, state.totalAmount);
      } 
  };

  const displayProductPriceIfUnaffordable = (event, state, ui, service) => {   
      const button = event.target;
      if (!button.classList.contains('product')) return;

      const productPrice = Number.parseInt(button.dataset.price);

      if (!service.isAffordable(state.totalAmount, productPrice)) {
        ui.updateDisplay(state.display, productPrice);
    } 
  };

  const handleInsertAmount = (state, ui, service) => {
      const amount = Number.parseInt(state.inputField.value);
      if (Number.isNaN(amount) || amount <= 0 || !Number.isInteger(amount)) {
          ui.logAction(state.log, '올바른 금액을 입력해주세요.');  // 요구사항엔 없지만 사용자 편의셩을 위해 추가
          return;
      }

      state.totalAmount = service.insertAmount(state.totalAmount, amount);
      ui.updateDisplay(state.display, state.totalAmount);
      ui.logAction(state.log, `${ui.formatNumber(amount)}원을 투입했습니다.`);
      ui.clearInputField(state.inputField);
  };

  const handleReturnAmount = (state, ui) => {
      if (state.totalAmount > 0) {
          ui.logAction(
              state.log,
              `${ui.formatNumber(state.totalAmount)}원을 반환합니다.`
          );
          state.totalAmount = 0;
          ui.updateDisplay(state.display, state.totalAmount);
      } else {
          ui.logAction(state.log, '반환할 금액이 없습니다.'); // 요구사항엔 없지만 사용자 편의셩을 위해 추가
      }
  };

  return { init, setupEvents, handleProductClick, displayProductPriceIfUnaffordable, handleInsertAmount, handleReturnAmount };
})();

export default VendingMachineController