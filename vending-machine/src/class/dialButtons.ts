import { dummyData, Item } from '../data'
import { display } from './display'
import { log } from './log'

class DialButtons {
    private buttons: HTMLDivElement[]

    constructor(parent: HTMLElement, items: Item[]) {
        if (!parent) {
            this.buttons = []
            return
        }

        const divArr = items.map((item) => {
            const div = document.createElement('div') as HTMLDivElement

            div.classList.add('dial-item')
            div.setAttribute('role', 'button')

            div.dataset.name = item.name
            div.dataset.price = String(item.price)

            div.innerHTML = `
                <p class="title ellipsis align-center dial-child">${item.name}</p>
                <p class="price ellipsis align-center dial-child">${item.price.toLocaleString()}원</p>
            `

            parent.appendChild(div)
            return div
        })

        const startAction = (target: HTMLDivElement) => {
            if (!target) return

            let name = ''
            let price = 0

            if (target.classList.contains('dial-item')) {
                name = target.dataset.name || ''
                price = target.dataset.price ? Number(target.dataset.price) : 0
            } else if (target.classList.contains('dial-child')) {
                const parent = target.parentElement

                if (parent && parent.classList.contains('dial-item')) {
                    name = parent.dataset.name || ''
                    price = parent.dataset.price ? Number(parent.dataset.price) : 0
                }
            }

            if (!name || !price) return

            // button active 효과
            target.classList.add('button_active')

            setTimeout(() => {
                target.classList.remove('button_active')
            }, 300)

            const currentCoin = display.getCurrentCoin()

            // 현재 금액이 상품 금액보다 적을 때
            if (currentCoin < price) {
                display.setError(price)
            }
            // 현재 금액이 상품 금액보다 클 때
            else {
                display.minusCoin(price)

                log.addLog(`${name}(${price.toLocaleString()}원)을 구매했습니다.`)
            }
        }

        const stopAction = () => {
            display.resetError()
        }

        // 마우스 이벤트
        parent.addEventListener('mousedown', (e: MouseEvent) => {
            const target = e.target as HTMLDivElement

            if (target) startAction(target)
        })
        parent.addEventListener('mouseleave', stopAction)
        parent.addEventListener('mouseup', stopAction)

        // 키보드 이벤트
        parent.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target as HTMLDivElement

                startAction(target)
            }
        })
        parent.addEventListener('keyup', stopAction)

        // 터치 이벤트
        parent.addEventListener('touchstart', (e: TouchEvent) => {
            const target = e.target as HTMLDivElement

            startAction(target)
        })
        parent.addEventListener('touchend', stopAction)

        this.buttons = divArr
    }
}

const dialButtons = new DialButtons(document.getElementById('dial-container') as HTMLDivElement, dummyData)
