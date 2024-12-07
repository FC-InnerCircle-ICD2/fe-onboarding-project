import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import VendingMachineController from '../controllers/vendingMachineController.js';

// Given: 테스트를 하기 위해 세팅하는 주어진 환경
// When: 테스트를 하기 위한 조건으로 프론트엔드에선 사용자와의 상호작용인 경우도 많음
// Then: 예상 결과를 나타내며 의도대로 동작하는지 검증 및 확인할 수 있음
describe('VendingMachineController', () => {

  let state;
  let ui;
  let service;

  beforeEach(() => {
    // Mock state
    state = {
      productsList: document.createElement('div'),
      template: document.createElement('template'),
      inputField: document.createElement('input'),
      log: [],
      display: document.createElement('div'),
      insertButton: document.createElement('button'),
      returnButton: document.createElement('button'),
      totalAmount: 0,
    };

    jest.spyOn(state.productsList, 'addEventListener');
    jest.spyOn(state.insertButton, 'addEventListener');
    jest.spyOn(state.returnButton, 'addEventListener');

    // Mock UI 메서드
    ui = {
      renderProducts: jest.fn(),
      updateDisplay: jest.fn(),
      logAction: jest.fn(),
      formatNumber: jest.fn((num) => `${num}`),
      clearInputField: jest.fn((input) => { input.value = ''; }),
    };

    // Mock 서비스 메서드
    service = {
      loadProducts: jest.fn(() => Promise.resolve([{ id: 1, name: '콜라', price: 1200 }])),
      isAffordable: jest.fn((total, price) => total >= price),
      purchaseProduct: jest.fn((total, price) => total - price),
      insertAmount: jest.fn((total, amount) => total + amount),
    };

    const html = `
      <button class="btn product" data-price="1200">
        <span class="product-name">콜라</span><br>
        <span class="product-price">1200원</span>
      </button>
    `;

    state.productsList.innerHTML = html;
    document.body.appendChild(state.productsList);
  });

  describe('init()', () => {
    it('init은 제품을 로드하고 렌더링 해야 한다', async () => {
      await VendingMachineController.init(state, ui, service);
  
      expect(service.loadProducts).toHaveBeenCalledWith('./data/products.json');
      expect(state.products).toEqual([{ id: 1, name: '콜라', price: 1200 }]);
      expect(ui.renderProducts).toHaveBeenCalledWith(state.productsList, state.template, state.products);
    });
  });


  describe('setupEvents()', () => {
    it('setupEvents은 제품을 클릿하고 금액을 투입하고 반환하는 버튼에 이벤트을 연결해야 한다', () => {    
      VendingMachineController.setupEvents(state, ui, service);

      expect(state.productsList.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(state.productsList.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(state.productsList.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(state.insertButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(state.returnButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });


  describe('handleProductClick()', () => {

    let user;
    let productButtonList;
    let productButton;
    let productPrice;

    beforeEach(() => {
      user = userEvent.setup();
      productButtonList = screen.getAllByRole('button', { name: /콜라/i }); 
      productButton = productButtonList[0];
      productPrice = Number.parseInt(productButton.dataset.price);
      state.totalAmount = 1500;
    });

    it('클릭된 상품 버튼이 존재하는지 확인하고 데이터를 검증해야 한다.', async () => {
      
      await user.click(productButton);

      VendingMachineController.handleProductClick({ target: productButton }, state, ui, service);
  
      // 클릭된 버튼에 대한 검증
      expect(productButton).toBeInTheDocument();
      expect(productButton).toHaveClass('product');
      expect(productButton).toHaveAttribute('data-price', '1200');
    });


    it('서비스 메서드 호출 여부을 검증하고 금액을 업데이트하고 로그에 남긴다', async () => {
      
      await user.click(productButton);
      const initialTotalAmount = state.totalAmount;
    
      VendingMachineController.handleProductClick({ target: productButton }, state, ui, service);
    
      // 서비스 메서드 호출 검증
      expect(service.isAffordable).toHaveBeenCalledWith(initialTotalAmount, productPrice);
      expect(service.purchaseProduct).toHaveBeenCalledWith(initialTotalAmount, productPrice);
    
      // 구매 후 금액 검증
      const expectedAmount = initialTotalAmount - productPrice;
      expect(state.totalAmount).toBe(expectedAmount);
    
      // UI 업데이트와 로그 액션 검증
      expect(ui.updateDisplay).toHaveBeenCalledWith(state.display, expectedAmount);
      expect(ui.logAction).toHaveBeenCalledWith(state.log, '콜라를 구매했습니다.');
    });

  });

  describe('displayProductPriceIfUnaffordable()', () => {
    it('displayProductPriceIfUnaffordable은 금액이 충분할 경우 제품의 가격을 출력해야 한다', () => {
      const user = userEvent.setup();
      user.click(document.querySelector('.product'));
  
      const event = {
        target: document.createElement('button'),
      };
      event.target.classList.add('product');
      event.target.dataset.price = '1200';
  
      VendingMachineController.displayProductPriceIfUnaffordable(event, state, ui, service);
  
      expect(ui.updateDisplay).toHaveBeenCalledWith(state.display, 1200);
    });
  });

  describe('handleInsertAmount()', () => {
    it('금액을 투입하고 totalAmount를 업데이트 해야 한다', () => {
    
      state.inputField.value = '1000';
      VendingMachineController.handleInsertAmount(state, ui, service);
    
      expect(service.insertAmount).toHaveBeenCalledWith(0, 1000);
      expect(state.totalAmount).toBe(1000);
      expect(ui.updateDisplay).toHaveBeenCalledWith(state.display, 1000);
      expect(ui.logAction).toHaveBeenCalledWith(state.log, '1000원을 투입했습니다.');
      expect(ui.clearInputField).toHaveBeenCalledWith(state.inputField);
    });

    it('handleInsertAmount은 잘못된 금액을 입력하면 오류 메시지를 로그에 남긴다', () => {
      state.inputField.value = '-500';
  
      VendingMachineController.handleInsertAmount(state, ui, service);
  
      expect(service.insertAmount).not.toHaveBeenCalled();
      expect(ui.logAction).toHaveBeenCalledWith(state.log, '올바른 금액을 입력해주세요.');
    });
  });


  describe('handleReturnAmount()', () => {
    it('금액이 있을 경우 반환하고 totalAmount를 초기화 한다', () => {
      state.totalAmount = 1500;
  
      VendingMachineController.handleReturnAmount(state, ui);
  
      expect(ui.logAction).toHaveBeenCalledWith(state.log, '1500원을 반환합니다.');
      expect(state.totalAmount).toBe(0);
      expect(ui.updateDisplay).toHaveBeenCalledWith(state.display, 0);
    });

    it('반환할 금액이 없을 때 오류 메시지를 로그에 남긴다', () => {
      state.totalAmount = 0;
  
      VendingMachineController.handleReturnAmount(state, ui);
  
      expect(ui.logAction).toHaveBeenCalledWith(state.log, '반환할 금액이 없습니다.');
      expect(ui.updateDisplay).not.toHaveBeenCalled();
    });
  });

});
