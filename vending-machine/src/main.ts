import { dummyData } from './item'
import './style.css'

let currentCoin = 0

// 투입한 금액이 표시되는 input
const display = document.getElementById('count-display') as HTMLInputElement

// 투입할 금액을 입력하는 input
const coinInput = document.getElementById('insert-coin') as HTMLInputElement

// 자판기 버튼 container
const dialContainer = document.getElementById('dial-container') as HTMLDivElement

// 투입한 금액 초기화
if (display) display.value = currentCoin.toLocaleString()

const dialHtml = dummyData
    .map((item) => {
        return `<div class="button">
                  <div class="dial-item">
                    <p class="title ellipsis align-center">${item.name}</p>
                    <p class="price ellipsis align-center">${item.price.toLocaleString()}원</p>
                  </div>
                </div>`
    })
    .join('')

dialContainer.innerHTML = dialHtml

// 입력값이 숫자만 포함하도록 처리하는 이벤트 리스너
coinInput.addEventListener('input', () => {
    // 숫자만 입력 가능하게
    coinInput.value = Number(coinInput.value.replace(/[^0-9]/g, '')).toLocaleString() // 유효하지 않으면 이전 값으로 복원
})
