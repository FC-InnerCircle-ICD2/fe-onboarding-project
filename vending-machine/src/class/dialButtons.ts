import { Item } from '../data'
import { createElement } from '../util/elementFactory'
import { VendingMachine } from './vendingMachine'

export class DialButtons {
    private vendingMachine: VendingMachine
    private item: Item

    constructor(vendingMachine: VendingMachine, item: Item) {
        this.vendingMachine = vendingMachine
        this.item = item
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

        return btn
    }
}
