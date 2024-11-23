import './style.css'

let currentCoin = 0

const display = document.getElementById('count-display') as HTMLInputElement
const coinInput = document.getElementById('insert-coin') as HTMLInputElement

if (display) display.value = currentCoin.toLocaleString()

// 입력값이 숫자만 포함하도록 처리하는 이벤트 리스너
coinInput.addEventListener('input', () => {
    // 입력값이 정규식에 맞지 않으면 값을 비웁니다.
    coinInput.value = Number(coinInput.value.replace(/[^0-9]/g, '')).toLocaleString() // 유효하지 않으면 이전 값으로 복원
})
