import {
  balance,
  increaseBalance,
  reduceBalance,
  resetBalance,
  switchLogType
} from "./main"
import { products } from "./products"

//  ===== 금액변동 테스트 =====
increaseBalance(1000)
console.assert(balance === 1000, balance)

reduceBalance(500)
console.assert(balance === 500, balance)

increaseBalance(1000)
console.assert(balance === 1500, balance)

resetBalance()
console.assert(balance === 0, balance)

// ===== 로그 생성 테스트 =====
// TODO: 숫자를 전달했는데 화폐 포맷으로 변경해서 출력하고 있는게 맞을까?
const log1 = switchLogType("insert", 1000)
console.assert(log1 === "1,000원을 투입했습니다.", log1)

const log2 = switchLogType("purchase", "", 1)
console.assert(log2 === "쿨라을(를) 구매했습니다.", log2)

const log3 = switchLogType("return", 500)
console.assert(log3 === "500원을 반환합니다.", log3)

// TODO: 부족한 금액만 던지고 단순히 메세지를 출력하고 있는데, 상품id와 잔액을 모두 전달하는게 맞을까?
const log4 = switchLogType("insufficient", 1000)
console.assert(log4 === "1,000원이 부족합니다.", log4)

// ===== 상품 구매 테스트 =====
// TODO: DOM을 조작해버려서 테스트 코드만 따로 작성했는데 이렇게 하는게 맞는지? 아니면 애초에 저 함수 자체를 잘못 짠건가?
const purchaseProduct = (productId, balance) => {
  const product = products.find(product => product.id === productId)
  if (balance >= product.price) {
    return `구매 성공 : ${product.name}`
  } else {
    return `구매 실패 : ${product.price - balance}원이 부족합니다.`
  }
}

const purchase1 = purchaseProduct(1, 2000)
console.assert(purchase1 === "구매 성공 : 쿨라", purchase1)

const purchase2 = purchaseProduct(1, 1000)
console.assert(purchase2 === "구매 실패 : 500원이 부족합니다.", purchase2)
