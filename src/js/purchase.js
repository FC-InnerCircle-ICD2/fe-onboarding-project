const purchaseProduct = (price, balance) => {
  if (balance === 0) {
    // 잔액 0원시 1초간 상품금액 노출
    document.querySelector("#product-price-display").innerHTML =
      price.toLocaleString("ko-kr")

    setTimeout(() => {
      document.querySelector("#product-price-display").innerHTML = 0
    }, 1000)
  } else if (balance > price) {
    // 잔액 변동
    changeAmount(price * -1)

    // 잔액표시 변동
    document.querySelector("#product-price-display").innerHTML = parseInt(
      balance - price
    ).toLocaleString("ko-kr")

    // TODO: 로그에 찍어줘야 해서 class에 id 추가해야 할듯
  } else {
    alert(
      `잔액이 ${parseInt(price - balance).toLocaleString("ko-kr")}원 부족합니다`
    )
  }
}
