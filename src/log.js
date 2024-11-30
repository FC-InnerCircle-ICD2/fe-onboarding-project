const logLists = document.querySelector(".log-lists")

const switchLogType = (type, amount, productId) => {
  switch (type) {
    case "insert":
      return `${convertCurrencyFormat(amount)}원을 투입했습니다.`
    case "purchase":
      return `${
        products.find(product => product.id === productId).name
      }을 구매했습니다.`
    case "return":
      return `${convertCurrencyFormat(amount)}원을 반환합니다.`
    case "insufficient":
      return `${convertCurrencyFormat(amount)}원이 부족합니다.`
  }
}

const addLog = (type, amount, productId) => {
  const logList = createElement("li")
  logList.textContent = switchLogType(type, amount, productId)
  logList.className = "log ellipsis"

  logLists.appendChild(logList)
  logLists.scrollTop = logLists.scrollHeight
}
