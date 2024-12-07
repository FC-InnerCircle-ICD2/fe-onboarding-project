import { formatNumberToKoreanLocale, selectNode } from "./common.js"
import { products } from "./constants/products.js"

export const switchLogType = (type, amount, productId) => {
  switch (type) {
    case "insert":
      return `${formatNumberToKoreanLocale(amount)}원을 투입했습니다.`
    case "purchase":
      return `${
        products.find(product => product.id === productId).name
      }을(를) 구매했습니다.`
    case "return":
      return `${formatNumberToKoreanLocale(amount)}원을 반환합니다.`
    case "insufficient":
      return `${formatNumberToKoreanLocale(amount)}원이 부족합니다.`
    default:
      return ""
  }
}

export const addLog = (type, amount, productId) => {
  const clone = selectNode(".log-template").content.cloneNode(true)

  const logList = clone.querySelector(".log")
  logList.textContent = switchLogType(type, amount, productId)

  const logLists = selectNode(".log-lists")
  logLists.appendChild(clone)

  logLists.scrollTop = logLists.scrollHeight
}
