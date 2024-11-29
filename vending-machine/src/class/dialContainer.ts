import { Item } from '../data'
import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'
import { DialButtons } from './dialButtons'
import { VendingMachine } from './vendingMachine'

export class DialContainer implements UIElement {
    #vendingMachine: VendingMachine
    #items: Item[]

    constructor(vendingMachine: VendingMachine, items: Item[]) {
        this.#vendingMachine = vendingMachine
        this.#items = items
    }

    private startAction(target: HTMLDivElement) {
        let targetItem: Item = { name: target.dataset.name as string, price: Number(target.dataset.price) }
        // button active 효과
        target.classList.add('button_active')

        setTimeout(() => {
            target.classList.remove('button_active')
        }, 300)

        this.#vendingMachine.buyItem(targetItem)
    }

    private stopAction = () => {
        this.#vendingMachine.resetError()
    }

    private getTargetElement(target: Element): HTMLDivElement | null {
        let btn: HTMLDivElement | null = null

        if (!target.classList.contains('dial-item')) {
            if (target.parentElement?.classList.contains('dial-item')) {
                btn = target.parentElement as HTMLDivElement
            }
        } else if (target.classList.contains('dial-item')) {
            btn = target as HTMLDivElement
        }

        return btn
    }

    getElement(): HTMLDivElement {
        const container = createElement<'div'>({ tagName: 'div', className: ['dial-container'] })

        this.#items.map((item) => {
            container.appendChild(new DialButtons(item).getElement())
        })

        // 마우스 이벤트
        container.addEventListener('mousedown', (e: Event) => {
            let btn: HTMLDivElement | null = this.getTargetElement(e.target as Element)

            btn && this.startAction(btn)
        })
        container.addEventListener('mouseup', (e: Event) => {
            this.stopAction()
        })
        container.addEventListener('mouseleave', (e: Event) => {
            this.stopAction()
        })

        // 키보드 이벤트
        container.addEventListener('keydown', (e: KeyboardEvent) => {
            let btn: HTMLDivElement | null = this.getTargetElement(e.target as Element)

            btn && this.startAction(btn)
        })
        container.addEventListener('keyup', this.stopAction)

        // 터치 이벤트
        container.addEventListener('touchstart', (e: TouchEvent) => {
            let btn: HTMLDivElement | null = this.getTargetElement(e.target as Element)

            btn && this.startAction(btn)
        })
        container.addEventListener('touchend', this.stopAction)

        return container
    }
}
