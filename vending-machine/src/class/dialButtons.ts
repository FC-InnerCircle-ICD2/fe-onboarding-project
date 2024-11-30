import { Item } from '../data'
import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'

export class DialButtons implements UIElement {
    #item: Item

    constructor(item: Item) {
        this.#item = item
    }

    getElement(): HTMLDivElement {
        const btn = createElement({ tagName: 'div', className: ['dial-item'] })
        btn.setAttribute('role', 'button')

        btn.dataset.name = this.#item.name
        btn.dataset.price = String(this.#item.price)

        btn.innerHTML = `
                <p class="title ellipsis align-center dial-child">${this.#item.name}</p>
                <p class="price ellipsis align-center dial-child">${this.#item.price.toLocaleString()}원</p>
            `

        return btn
    }
}
