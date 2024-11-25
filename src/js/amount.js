const changeAmount = amount => {
  if (amount === 0) {
    balance = 0
  } else if (amount > 0) {
    balance += parseInt(amount)
  } else {
    // 상품 구매시
    balance += parseInt(amount)
  }
}

const priceDisplay = document.querySelector("#product-price-display")

const insertMoney = amount => {
  // 투입금액 입력창 초기화
  document.querySelector("#balance").value = ""

  // 투입금액 만큼 잔액 변동
  changeAmount(amount)

  // 잔액변동 화면변경
  priceDisplay.innerHTML = balance

  // TODO: 로그 입력하기
}

const returnMoney = () => {
  // 투입금액 전액 반환
  changeAmount(0)

  // 잔액변동 화면변경
  priceDisplay.innerHTML = 0

  // TODO: 로그 입력하기
}
