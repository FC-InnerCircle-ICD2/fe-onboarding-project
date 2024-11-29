import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'

export class DisplayInput implements UIElement {
    getElement(): HTMLInputElement {
        const input = createElement({
            tagName: 'input',
            id: 'count-display',
            className: ['input', 'default-cursor', 'align-center'],
        }) as HTMLInputElement
        input.setAttribute('readonly', 'true')
        input.value = '0'

        return input
    }
}
