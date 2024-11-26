import { createElement } from '../function'
import { VendingMachine } from './vendingMachine'

export class ReturnButton {
    private vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine
    }

    public getElement(): HTMLButtonElement {
        const button = createElement({ tagName: 'button', className: ['return-coin', 'button'] }) as HTMLButtonElement
        button.innerText = '반환'

        button.addEventListener('click', () => {
            this.vendingMachine.returnCoin()
        })

        return button
    }
}
