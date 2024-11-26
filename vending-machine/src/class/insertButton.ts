import { createElement } from '../function'
import { VendingMachine } from './vendingMachine'

export class InsertButton {
    private vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine
    }

    public getElement(): HTMLButtonElement {
        const button = createElement({ tagName: 'button', className: ['insert-coin', 'button'] }) as HTMLButtonElement

        button.innerText = '투입'
        button.addEventListener('click', () => {
            this.vendingMachine.insertCoin()
        })

        return button
    }
}
