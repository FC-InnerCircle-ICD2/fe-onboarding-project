const logLists = document.querySelector(".log-lists")

const switchLogType = (type, amount, product_id) => {
  switch (type) {
    case "insert":
      return `${parseInt(amount).toLocaleString("ko-kr")}원을 투입했습니다.`
    case "purchase":
      return `${
        products.filter(product => product.id === product_id)[0].name
      }을 구매했습니다.`
    case "return":
      return `${parseInt(amount).toLocaleString("ko-kr")}원을 반환합니다.`
  }
}

const addLog = (type, amount, product_id) => {
  const logList = createElement("li")
  logList.textContent = switchLogType(type, amount, product_id)

  logLists.appendChild(logList)
}
