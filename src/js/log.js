const logLists = document.querySelector(".log-lists")

const switchLogType = (type, amount, product_id) => {
  switch (type) {
    case "insert":
      return `${parseInt(amount).toLocaleString("ko-kr")}원을 투입했습니다.`
    case "purchase":
      return `${
        products.find(product => product.id === product_id).name
      }을 구매했습니다.`
    case "return":
      return `${parseInt(amount).toLocaleString("ko-kr")}원을 반환합니다.`
  }
}

const addLog = (type, amount, product_id) => {
  const logList = createElement("li")
  logList.textContent = switchLogType(type, amount, product_id)
  logList.className = "log ellipsis"

  // 질문 : 스크롤을 끝까지 이동시키고 싶은데, 끝에서 조금 위로 이동합니다. 수정값을 줘도 그대로라 다른 원인인것 같은데 찾지를 못하겠습니다
  logLists.scrollTop = logLists.scrollHeight
  logLists.appendChild(logList)
}
