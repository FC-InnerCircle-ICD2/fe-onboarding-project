export const elements = {
  moneyDisplay: document.querySelector('.money-display'),
  moneyInput: document.querySelector('.money-input'),
  inputContainer: document.querySelector('.input-container'),
  logContainer: document.querySelector('.log-container'),
  productGrid: document.querySelector('.product-grid'),
  returnButton: document.querySelector('.button-return'),
};

export const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};
