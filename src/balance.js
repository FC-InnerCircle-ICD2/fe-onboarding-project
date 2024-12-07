import { updateElement, formatNumberToKoreanLocale } from "./common"
import { addLog } from "./log"

let balance = 0

export const increaseBalance = amount => (balance += amount)
export const reduceBalance = amount => increaseBalance(amount * -1)
export const resetBalance = () => (balance = 0)
export const getBalance = () => balance

export const insertMoney = amount => {
  if (isNaN(amount)) return
  increaseBalance(amount)
  updateElement(".insert-input", "", "value")
  updateElement(
    ".product-price-display",
    formatNumberToKoreanLocale(getBalance())
  )
  addLog("insert", amount)
}

export const returnMoney = () => {
  if (getBalance() === 0) return
  addLog("return", getBalance())
  resetBalance()
  updateElement(".product-price-display", 0)
}
