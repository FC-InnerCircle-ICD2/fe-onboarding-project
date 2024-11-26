import { createElement } from '../function'

export class CoinInput {
    constructor() {}

    public getElement(): HTMLInputElement {
        const input = createElement({ tagName: 'input', className: ['coin-input', 'input'] }) as HTMLInputElement
        input.setAttribute('maxlength', '9')

        input.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement
            const value = Number(target.value.replace(/[^0-9]/g, ''))

            target.value = value ? value.toLocaleString() : ''
        })

        return input
    }
}
