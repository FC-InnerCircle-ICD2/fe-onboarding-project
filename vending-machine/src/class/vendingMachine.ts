import { Item } from '../data'
import { UIElement } from '../interface/UIElement'
import { createElement } from '../util/elementFactory'
import { CoinInput } from './coinInput'
import { DialContainer } from './dialContainer'
import { DisplayInput } from './display'
import { InsertButton } from './insertButton'
import { ReturnButton } from './returnButton'

export class VendingMachine implements UIElement {
    #root: Element // 해당 요소의 안에 UI를 그림
    #currentCoin: number // 투입된 금액

    // item data
    #items: Item[]

    // element
    #container: HTMLDivElement | null
    #display: HTMLInputElement | null
    #coinInput: HTMLInputElement | null
    #insertButton: HTMLButtonElement | null
    #returnButton: HTMLButtonElement | null
    #logContainer: HTMLUListElement | null

    constructor(parent: Element, items: Item[]) {
        this.#root = parent
        this.#items = items

        this.#container = null
        this.#display = null
        this.#coinInput = null
        this.#insertButton = null
        this.#returnButton = null
        this.#logContainer = null

        this.#currentCoin = 0
    }

    public init() {
        if (!this.#root) return

        this.#root.appendChild(this.getElement())
    }

    getElement(): HTMLDivElement {
        this.#container = createElement({ tagName: 'div', className: ['container'] }) as HTMLDivElement

        this.#initCalculator()
        this.#initSideContainer()

        return this.#container
    }

    // 자판기 UI 초기화
    #initCalculator() {
        const calculator = createElement({ tagName: 'div', className: ['calculator'] })

        const currentCoin = createElement({ tagName: 'div', className: ['current-coin'] })
        this.#display = new DisplayInput().getElement()

        currentCoin.appendChild(this.#display)

        // 자판기 버튼 초기화
        calculator?.appendChild(currentCoin)
        calculator?.appendChild(new DialContainer(this, this.#items).getElement())

        this.#container?.appendChild(calculator)
    }

    // side UI 초기화
    #initSideContainer() {
        const info = createElement({ tagName: 'div', className: ['info'] })

        const operation = createElement({ tagName: 'div', className: ['operation-container'] })

        this.#coinInput = new CoinInput().getElement()
        this.#insertButton = new InsertButton(this).getElement()
        this.#returnButton = new ReturnButton(this).getElement()

        operation.appendChild(this.#coinInput)
        operation.appendChild(this.#insertButton)
        operation.appendChild(this.#returnButton)

        this.#logContainer = createElement({ tagName: 'ul', className: ['log-container'] }) as HTMLUListElement

        info.appendChild(operation)
        info.appendChild(this.#logContainer)

        this.#container?.appendChild(info)
    }

    public buyItem(item: Item) {
        if (!this.#display) return

        const { name, price } = item

        if (price > this.#currentCoin) {
            this.#display.value = price.toLocaleString()
            this.#display.classList.add('error-text')
        } else {
            this.#currentCoin -= price
            this.#display.value = this.#currentCoin.toLocaleString()

            this.#addLog(`${name}을(를) 구매했습니다.`)
        }
    }

    public resetError() {
        if (!this.#display) return

        if (this.#display.classList.contains('error-text')) {
            this.#display.classList.remove('error-text')
            this.#display.value = this.#currentCoin.toLocaleString()
        }
    }

    public insertCoin() {
        if (!this.#display || !this.#coinInput) return

        const coin = Number(this.#coinInput.value.replace(/,/g, ''))

        if (!coin) {
            alert('금액을 입력해주세요.')
            return
        }

        if (this.#currentCoin + coin > 1000000) {
            this.#addLog('최대 투입 가능한 금액은 1,000,000원 입니다.')
            return
        }

        this.#currentCoin += coin
        this.#coinInput.value = ''
        this.#display.value = this.#currentCoin.toLocaleString()

        this.#addLog(`${coin.toLocaleString()}을 투입했습니다.`)
    }

    public returnCoin() {
        if (!this.#currentCoin || !this.#display) return

        this.#addLog(`${this.#currentCoin.toLocaleString()}을 반환합니다.`)

        this.#currentCoin = 0
        this.#display.value = '0'
    }

    #addLog(log: string) {
        if (!this.#logContainer) return

        const li = createElement({ tagName: 'li', className: ['log-item'] })
        li.innerText = log

        this.#logContainer.appendChild(li)
        this.#logContainer.scrollTop = this.#logContainer.scrollHeight
    }
}
