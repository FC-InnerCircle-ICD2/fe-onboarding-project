import { Item } from '../data'
import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'

export class DialButton implements UIElement {
    #item: Item

    constructor(item: Item) {
        this.#item = item
    }

    getElement(): HTMLButtonElement {
        const btn = createElement({ tagName: 'button', className: ['dial-item'] })
        btn.setAttribute('data-role', 'dial-item')

        btn.dataset.name = this.#item.name
        btn.dataset.price = String(this.#item.price)

        btn.innerHTML = `
                <p class="title ellipsis align-center dial-child">${this.#item.name}</p>
                <p class="price ellipsis align-center dial-child">${this.#item.price.toLocaleString()}원</p>
            `

        return btn
    }
}
