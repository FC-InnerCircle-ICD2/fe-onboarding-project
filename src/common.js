const convertCurrencyFormat = number => parseInt(number).toLocaleString("ko-kr")

const innerText = (className, text) =>
  (document.querySelector(`.${className}`).innerText = text)
