const increaseBalance = amount => (balance += amount)
const reduceBalance = amount => increaseBalance(amount * -1)
const resetBalance = () => (balance = 0)

const insertMoney = amount => {
  if (isNaN(amount)) return

  innerText("insert-input", "")

  increaseBalance(amount)

  innerText("product-price-display", convertCurrencyFormat(balance))

  addLog("insert", amount)
}

const returnMoney = () => {
  if (balance === 0) return

  // 로그 입력 (잔액이 0이 되기 전에 로그에 전달해야 해서 먼저 실행)
  addLog("return", balance)

  resetBalance(0)

  innerText("product-price-display", 0)
}
