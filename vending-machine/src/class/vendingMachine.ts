import { Item } from '../data'
import { createElement } from '../function'
import { CoinInput } from './coinInput'
import { DialButtons } from './dialButtons'
import { DisplayInput } from './display'
import { InsertButton } from './insertButton'
import { ReturnButton } from './returnButton'

export class VendingMachine {
    private root: Element // 해당 요소의 안에 UI를 그림
    private currentCoin: number // 투입된 금액

    // item data
    private items: Item[]

    // element
    private container: HTMLDivElement | null
    private display: HTMLInputElement | null
    private coinInput: HTMLInputElement | null
    private insertButton: HTMLButtonElement | null
    private returnButton: HTMLButtonElement | null
    private logContainer: HTMLUListElement | null

    constructor(parent: Element, items: Item[]) {
        this.root = parent
        this.items = items

        this.container = null
        this.display = null
        this.coinInput = null
        this.insertButton = null
        this.returnButton = null
        this.logContainer = null

        this.currentCoin = 0
    }

    public init() {
        if (!this.root) return

        this.container = createElement({ tagName: 'div', className: ['container'] }) as HTMLDivElement

        this.initCalculator()
        this.initSideContainer()

        this.root.appendChild(this.container)
    }

    // 자판기 UI 초기화
    private initCalculator() {
        const calculator = createElement({ tagName: 'div', className: ['calculator'] })

        const currentCoin = createElement({ tagName: 'div', className: ['current-coin'] })
        this.display = new DisplayInput().getElement()

        currentCoin.appendChild(this.display)

        // 자판기 버튼 초기화
        const dialContainer = createElement({ tagName: 'div', className: ['dial-container'] }) as HTMLDivElement

        this.items.map((item) => {
            dialContainer.appendChild(new DialButtons(this, item).getElement())
        })

        calculator.appendChild(currentCoin)
        calculator.appendChild(dialContainer)

        this.container?.appendChild(calculator)
    }

    // side UI 초기화
    private initSideContainer() {
        const info = createElement({ tagName: 'div', className: ['info'] })

        const operation = createElement({ tagName: 'div', className: ['operation-container'] })

        this.coinInput = new CoinInput().getElement()
        this.insertButton = new InsertButton(this).getElement()
        this.returnButton = new ReturnButton(this).getElement()

        operation.appendChild(this.coinInput)
        operation.appendChild(this.insertButton)
        operation.appendChild(this.returnButton)

        this.logContainer = createElement({ tagName: 'ul', className: ['log-container'] }) as HTMLUListElement

        info.appendChild(operation)
        info.appendChild(this.logContainer)

        this.container?.appendChild(info)
    }

    public buyItem(item: Item) {
        if (!this.display) return

        const { name, price } = item

        if (price > this.currentCoin) {
            this.display.value = price.toLocaleString()
            this.display.classList.add('error-text')
        } else {
            this.currentCoin -= price
            this.display.value = this.currentCoin.toLocaleString()

            this.addLog(`${name}을(를) 구매했습니다.`)
        }
    }

    public resetError() {
        if (!this.display) return

        if (this.display.classList.contains('error-text')) {
            this.display.classList.remove('error-text')
            this.display.value = this.currentCoin.toLocaleString()
        }
    }

    public insertCoin() {
        if (!this.display || !this.coinInput) return

        const coin = Number(this.coinInput.value.replace(/,/g, ''))

        if (!coin) {
            alert('금액을 입력해주세요.')
            return
        }

        if (this.currentCoin + coin > 1000000) {
            alert('최대 투입 가능한 금액은 1,000,000원 입니다.')
            return
        }

        this.currentCoin += coin
        this.coinInput.value = ''
        this.display.value = this.currentCoin.toLocaleString()

        this.addLog(`${coin.toLocaleString()}을 투입했습니다.`)
    }

    public returnCoin() {
        if (!this.currentCoin || !this.display) return

        this.addLog(`${this.currentCoin.toLocaleString()}을 반환합니다.`)

        this.currentCoin = 0
        this.display.value = '0'
    }

    private addLog(log: string) {
        if (!this.logContainer) return

        const li = createElement({ tagName: 'li', className: ['log-item'] })
        li.innerText = log

        this.logContainer.appendChild(li)
        this.logContainer.scrollTop = this.logContainer.scrollHeight
    }
}
