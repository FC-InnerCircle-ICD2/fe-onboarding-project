import { updateElementContent, formatNumberToKoreanLocale } from "./common"
import { addLog } from "./log"

let balance = 0

export const increaseBalance = amount => (balance += amount)
export const reduceBalance = amount => increaseBalance(amount * -1)
export const resetBalance = () => (balance = 0)
export const getBalance = () => balance

export const insertMoney = amount => {
  if (isNaN(amount)) return
  increaseBalance(amount)
  updateElementContent(".insert-input", "", "value")
  updateElementContent(
    ".product-price-display",
    formatNumberToKoreanLocale(getBalance())
  )
  addLog("insert", amount)
}

export const returnMoney = () => {
  if (getBalance() === 0) return
  addLog("return", getBalance())
  resetBalance()
  updateElementContent(".product-price-display", 0)
}
