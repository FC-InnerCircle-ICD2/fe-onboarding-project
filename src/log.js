const logLists = document.querySelector(".log-lists")

const switchLogType = (type, amount, product_id) => {
  switch (type) {
    case "insert":
      return `${convertCurrencyFormat(amount)}원을 투입했습니다.`
    case "purchase":
      return `${
        products.find(product => product.id === product_id).name
      }을 구매했습니다.`
    case "return":
      return `${convertCurrencyFormat(amount)}원을 반환합니다.`
  }
}

const addLog = (type, amount, product_id) => {
  const logList = createElement("li")
  logList.textContent = switchLogType(type, amount, product_id)
  logList.className = "log ellipsis"

  logLists.appendChild(logList)
  logLists.scrollTop = logLists.scrollHeight
}
