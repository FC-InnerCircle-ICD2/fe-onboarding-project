const purchaseProduct = (productId, displayedBalance) => {
  // 상품정의에서 해당 상품의 금액 불러오기
  const price = products.find(product => product.id === productId).price

  if (displayedBalance === 0) {
    // TODO: 명세 분석 다시할것
    updateElement("product-price-display", convertCurrencyFormat(price))

    setTimeout(() => {
      updateElement("product-price-display", 0)
    }, 1000)
  } else if (displayedBalance >= price) {
    reduceBalance(price)

    updateElement(
      "product-price-display",
      convertCurrencyFormat(displayedBalance - price)
    )

    addLog("purchase", price, productId)
  } else {
    addLog("insufficient", price - displayedBalance)
  }
}
