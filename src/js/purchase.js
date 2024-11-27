const purchaseProduct = (product_id, displayed_balance) => {
  // 상품정의에서 해당 상품의 금액 불러오기
  const price = products.find(product => product.id === product_id).price

  if (displayed_balance === 0) {
    // 잔액 0원시 1초간 상품금액 노출
    document.querySelector("#product-price-display").innerHTML =
      price.toLocaleString("ko-kr")

    setTimeout(() => {
      document.querySelector("#product-price-display").innerHTML = 0
    }, 1000)
  } else if (displayed_balance >= price) {
    // 상품 구매 = 잔액변동 + 화면변경 + 로그 추가

    // 잔액 변동
    changeAmount(price * -1)

    // 잔액표시 화면변경
    document.querySelector("#product-price-display").innerHTML = parseInt(
      displayed_balance - price
    ).toLocaleString("ko-kr")

    // 로그 추가
    addLog("purchase", price, product_id)
  } else {
    alert(
      `잔액이 ${parseInt(price - displayed_balance).toLocaleString(
        "ko-kr"
      )}원 부족합니다`
    )
  }
}
