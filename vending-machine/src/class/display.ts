import { createElement } from '../function'

export class DisplayInput {
    constructor() {}

    public getElement(): HTMLInputElement {
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
