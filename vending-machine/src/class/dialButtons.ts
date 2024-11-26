import { Item } from '../data'
import { createElement } from '../function'
import { VendingMachine } from './vendingMachine'

export class DialButtons {
    private vendingMachine: VendingMachine
    private item: Item

    constructor(vendingMachine: VendingMachine, item: Item) {
        this.vendingMachine = vendingMachine
        this.item = item
    }

    private startAction(target: HTMLDivElement) {
        // button active 효과
        target.classList.add('button_active')

        setTimeout(() => {
            target.classList.remove('button_active')
        }, 300)

        this.vendingMachine.buyItem(this.item)
    }

    private stopAction = () => {
        this.vendingMachine.resetError()
    }

    public getElement(): HTMLDivElement {
        const btn = createElement({ tagName: 'div', className: ['dial-item'] }) as HTMLDivElement
        btn.setAttribute('role', 'button')

        btn.dataset.name = this.item.name
        btn.dataset.price = String(this.item.price)

        btn.innerHTML = `
                <p class="title ellipsis align-center dial-child">${this.item.name}</p>
                <p class="price ellipsis align-center dial-child">${this.item.price.toLocaleString()}원</p>
            `

        // 마우스 이벤트
        btn.addEventListener('mousedown', (e: MouseEvent) => {
            this.startAction(btn)
        })
        btn.addEventListener('mouseleave', this.stopAction)
        btn.addEventListener('mouseup', this.stopAction)

        // 키보드 이벤트
        btn.addEventListener('keydown', (e: KeyboardEvent) => {
            this.startAction(btn)
        })
        btn.addEventListener('keyup', this.stopAction)

        // 터치 이벤트
        btn.addEventListener('touchstart', (e: TouchEvent) => {
            this.startAction(btn)
        })
        btn.addEventListener('touchend', this.stopAction)

        return btn
    }
}
