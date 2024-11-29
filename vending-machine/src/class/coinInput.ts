import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'

export class CoinInput implements UIElement {
    getElement(): HTMLInputElement {
        const input = createElement<'input'>({ tagName: 'input', className: ['coin-input', 'input'] })
        input.setAttribute('maxlength', '9')

        input.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement
            const value = Number(target.value.replace(/[^0-9]/g, ''))

            target.value = value ? value.toLocaleString() : ''
        })

        return input
    }
}
