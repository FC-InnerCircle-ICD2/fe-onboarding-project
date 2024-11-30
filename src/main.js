import { products } from "./products"

// ===== 공통 함수 =====
const convertCurrencyFormat = number => parseInt(number).toLocaleString("ko-kr")

const selectNode = node => document.querySelector(`${node}`)

export const updateElement = (selector, value, type = "innerText") => {
  const element = document.querySelector(`${selector}`)
  switch (type) {
    case "innerText":
      element.innerText = value
      break
    case "value":
      if ("value" in element) {
        element.value = value
      }
      break
    default:
      return
  }
}

// ===== 금액 변동 로직 =====
export let balance = 0

export const increaseBalance = amount => (balance += amount)
export const reduceBalance = amount => increaseBalance(amount * -1)
export const resetBalance = () => (balance = 0)

const insertMoney = amount => {
  if (isNaN(amount)) return
  increaseBalance(amount)
  updateElement(".insert-input", "", "value")
  updateElement(".product-price-display", convertCurrencyFormat(balance))
  addLog("insert", amount)
}

const returnMoney = () => {
  if (balance === 0) return
  addLog("return", balance)
  resetBalance()
  updateElement(".product-price-display", 0)
}

// ===== 로그 로직 =====
export const switchLogType = (type, amount, productId) => {
  switch (type) {
    case "insert":
      return `${convertCurrencyFormat(amount)}원을 투입했습니다.`
    case "purchase":
      return `${
        products.find(product => product.id === productId).name
      }을(를) 구매했습니다.`
    case "return":
      return `${convertCurrencyFormat(amount)}원을 반환합니다.`
    case "insufficient":
      return `${convertCurrencyFormat(amount)}원이 부족합니다.`
  }
}

const addLog = (type, amount, productId) => {
  const clone = selectNode(".log-template").content.cloneNode(true)
  const logList = clone.querySelector(".log")
  logList.textContent = switchLogType(type, amount, productId)
  const logLists = selectNode(".log-lists")
  logLists.appendChild(clone)
  logLists.scrollTop = logLists.scrollHeight
}

// ===== 상품 구매 로직 =====
const purchaseProduct = (productId, displayedBalance) => {
  if (displayedBalance === 0) return

  const product = products.find(product => product.id === productId)

  if (displayedBalance >= product.price) {
    reduceBalance(product.price)
    updateElement(
      ".product-price-display",
      convertCurrencyFormat(displayedBalance - product.price)
    )
    addLog("purchase", product.price, productId)
  } else {
    addLog("insufficient", product.price - displayedBalance)
  }
}

// ===== 초기화 로직 =====
products.forEach(product => {
  const clone = selectNode(".product-template").content.cloneNode(true)
  const liElement = clone.querySelector(".product")
  const productName = clone.querySelector(".product-name")
  const productPrice = clone.querySelector(".product-price")

  productName.innerText = product.name
  productPrice.innerText = convertCurrencyFormat(product.price)

  liElement.addEventListener("click", () =>
    purchaseProduct(product.id, balance)
  )

  liElement.addEventListener("mousedown", () => {
    if (balance === 0) {
      updateElement(
        ".product-price-display",
        convertCurrencyFormat(product.price)
      )
    }
  })

  liElement.addEventListener("mouseup", () => {
    if (balance === 0) updateElement(".product-price-display", 0)
  })

  selectNode(".product-lists").appendChild(clone)
})

selectNode(".insert-money").addEventListener("click", () => {
  const insertInputValue = selectNode(".insert-input").valueAsNumber
  insertMoney(insertInputValue)
})

selectNode(".return-money").addEventListener("click", returnMoney)
