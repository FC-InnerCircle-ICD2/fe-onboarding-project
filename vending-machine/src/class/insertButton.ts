import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'
import { VendingMachine } from './vendingMachine'

export class InsertButton implements UIElement {
    #vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine) {
        this.#vendingMachine = vendingMachine
    }

    getElement(): HTMLButtonElement {
        const button = createElement<'button'>({ tagName: 'button', className: ['insert-coin', 'button'] })

        button.innerText = '투입'
        button.addEventListener('click', () => {
            this.#vendingMachine.insertCoin()
        })

        return button
    }
}
