const displayProductPrice = () => {
  setTimeout(() => {
    updateElement("product-price-display") = convertCurrencyFormat(balance)
  }, 1000)
}

const purchaseProduct = (productId, displayedBalance) => { 
  if(displayedBalance === 0) return
  console.log("잔액 0 이상")
  
  const price = products.find(product => product.id === productId).price

  if (displayedBalance >= price) {
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
