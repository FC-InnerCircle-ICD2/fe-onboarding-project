import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'
import { VendingMachine } from './vendingMachine'

export class ReturnButton implements UIElement {
    #vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine) {
        this.#vendingMachine = vendingMachine
    }

    getElement(): HTMLButtonElement {
        const button = createElement<'button'>({ tagName: 'button', className: ['return-coin', 'button'] })
        button.innerText = '반환'

        button.addEventListener('click', () => {
            this.#vendingMachine.returnCoin()
        })

        return button
    }
}
