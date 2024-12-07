import { products } from "./constants/products.js"
import {
  selectNode,
  updateElementContent,
  formatNumberToKoreanLocale
} from "./common.js"
import { insertMoney, returnMoney, getBalance } from "./balance.js"
import { purchaseProduct } from "./purchase.js"

document.addEventListener("DOMContentLoaded", () => {
  products.forEach(product => {
    const clone = selectNode(".product-template").content.cloneNode(true)
    const liElement = clone.querySelector(".product")
    const productName = clone.querySelector(".product-name")
    const productPrice = clone.querySelector(".product-price")

    productName.innerText = product.name
    productPrice.innerText = formatNumberToKoreanLocale(product.price)

    liElement.addEventListener("click", () =>
      purchaseProduct(product.id, getBalance())
    )

    liElement.addEventListener("mousedown", () => {
      if (getBalance() === 0) {
        updateElementContent(
          ".product-price-display",
          formatNumberToKoreanLocale(product.price)
        )
      }
    })

    liElement.addEventListener("mouseup", () => {
      if (getBalance() === 0) updateElementContent(".product-price-display", 0)
    })

    selectNode(".product-lists").appendChild(clone)
  })

  selectNode(".insert-money").addEventListener("click", () => {
    const insertInputValue = selectNode(".insert-input").valueAsNumber
    insertMoney(insertInputValue)
  })

  selectNode(".return-money").addEventListener("click", returnMoney)
})
