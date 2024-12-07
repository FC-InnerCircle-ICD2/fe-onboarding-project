import { reduceBalance } from "./balance.js"
import { formatNumberToKoreanLocale, updateElementContent } from "./common.js"
import { addLog } from "./log.js"
import { products } from "./constants/products.js"

export const purchaseProduct = (productId, displayedBalance) => {
  if (displayedBalance === 0) return

  const product = products.find(product => product.id === productId)

  if (displayedBalance >= product.price) {
    reduceBalance(product.price)
    updateElementContent(
      ".product-price-display",
      formatNumberToKoreanLocale(displayedBalance - product.price)
    )
    addLog("purchase", product.price, productId)
  } else {
    addLog("insufficient", product.price - displayedBalance)
  }
}
