import { printLog } from './function'
import { coinInput, display, insertCoinButton, returnCoinButton } from './init'

let currentCoin: number = 0
export const logs: string[] = []
// 투입한 금액 초기화
if (display) display.value = currentCoin.toLocaleString()

// 입력값이 숫자만 포함하도록 처리하는 이벤트 리스너
// -----------------------------------
coinInput.addEventListener('input', () => {
    // 숫자만 입력 가능하게
    coinInput.value = Number(coinInput.value.replace(/[^0-9]/g, '')).toLocaleString() // 유효하지 않으면 이전 값으로 복원
})
// -----------------------------------

// 투입 button event
// -----------------------------------
insertCoinButton.addEventListener('click', () => {
    const coin = Number(coinInput.value.replace(',', ''))

    if (!coin || isNaN(coin)) {
        alert('금액을 입력하세요.')
        return
    }

    if (currentCoin + coin > 1000000) {
        alert('1,000,000원 이상은 투입할 수 없습니다.')
        coinInput.value = ''
        return
    }

    currentCoin += coin
    logs.push(`${coin.toLocaleString()}원을 투입했습니다.`)
    display.value = currentCoin.toLocaleString()
    coinInput.value = ''

    printLog()
})
// -----------------------------------

// 반환 button event
// -----------------------------------
returnCoinButton.addEventListener('click', () => {
    const coin = Number(coinInput.value.replace(',', ''))

    if (!coin || isNaN(coin)) {
        alert('금액을 입력하세요.')
        return
    }

    if (currentCoin - coin < 0) {
        logs.push(`${currentCoin}을 반환합니다.`)
        currentCoin = 0
    } else {
        logs.push(`${coin.toLocaleString()}원을 반환합니다.`)
        currentCoin -= coin
    }

    display.value = currentCoin.toLocaleString()
    coinInput.value = ''

    printLog()
})
// -----------------------------------
