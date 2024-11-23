import { dummyData } from './item'
import './style.css'

// element 초기화
// -----------------------------------

// 투입한 금액이 표시되는 input
export const display = document.getElementById('count-display') as HTMLInputElement

// 투입할 금액을 입력하는 input
export const coinInput = document.getElementById('coin-input') as HTMLInputElement

// 자판기 버튼 container
export const dialContainer = document.getElementById('dial-container') as HTMLDivElement

// 투입 button
export const insertCoinButton = document.getElementById('insert-coin') as HTMLButtonElement

// 반환 button
export const returnCoinButton = document.getElementById('return-coin') as HTMLButtonElement

export const logContainer = document.getElementById('log-container') as HTMLUListElement

// -----------------------------------

// 자판기 item 배치
// -----------------------------------
const dialHtml = dummyData
    .map((item) => {
        return `<button class="button dial-button" data-name="${item.name}" data-price="${item.price}">
                  <div class="dial-item">
                    <p class="title ellipsis align-center">${item.name}</p>
                    <p class="price ellipsis align-center">${item.price.toLocaleString()}원</p>
                  </div>
                </button>`
    })
    .join('')

dialContainer.innerHTML = dialHtml
// -----------------------------------
