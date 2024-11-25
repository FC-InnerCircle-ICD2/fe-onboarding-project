import { dummyData, Item } from '../data'
import { display } from './display'
import { log } from './log'

class DialButtons {
    private buttons: HTMLDivElement[]

    constructor(items: Item[]) {
        const container = document.getElementById('dial-container') as HTMLDivElement

        if (!container) {
            this.buttons = []
            return
        }

        const divArr = items.map((item) => {
            const div = document.createElement('div') as HTMLDivElement

            div.classList.add('dial-item')
            div.setAttribute('role', 'button')

            div.innerHTML = `
                <p class="title ellipsis align-center">${item.name}</p>
                <p class="price ellipsis align-center">${item.price.toLocaleString()}원</p>
            `

            div.addEventListener('mousedown', () => {
                // button active 효과
                div.classList.add('button_active')

                setTimeout(() => {
                    div.classList.remove('button_active')
                }, 300)

                const currentCoin = display.getCurrentCoin()

                // 현재 금액이 상품 금액보다 적을 때
                if (currentCoin < item.price) {
                    display.setError(item.price)
                }
                // 현재 금액이 상품 금액보다 클 때
                else {
                    display.minusCoin(item.price)

                    log.addLog(`${item.name}(${item.price.toLocaleString()}원)을 구매했습니다.`)
                }
            })

            div.addEventListener('mouseleave', () => {
                display.resetError()
            })

            // mouseup시 error 상태와 display된 금액을 되돌림
            div.addEventListener('mouseup', () => {
                display.resetError()
            })

            container.appendChild(div)
            return div
        })

        this.buttons = divArr
    }
}

const dialButtons = new DialButtons(dummyData)
