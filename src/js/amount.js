// 잔액관리 전역함수
const changeAmount = amount => {
  if (amount === 0) {
    // 반환
    balance = 0
  } else if (amount > 0) {
    // 투입
    balance += parseInt(amount)
  } else {
    // amount가 음수 : 상품 구매시
    balance += parseInt(amount)
  }
}

const priceDisplay = document.querySelector("#product-price-display")

const insertMoney = amount => {
  // 투입금액 입력창 초기화
  document.querySelector("#insert-input").value = ""

  // 잔액 변동
  changeAmount(amount)

  // 잔액표시 화면변경
  priceDisplay.innerHTML = balance.toLocaleString("ko-kr")

  // TODO: 로그 입력하기
}

const returnMoney = () => {
  // 투입금액 전액 반환
  changeAmount(0)

  // 잔액표시 화면변경
  priceDisplay.innerHTML = 0

  // TODO: 로그 입력하기
}
