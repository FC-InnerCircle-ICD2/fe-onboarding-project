import '@testing-library/jest-dom'
import { VendingMachine } from '../class/vendingMachine'
import { dummyData } from '../data'

describe('자판기 기능 동작 테스트', () => {
    let vendingMachine: VendingMachine
    let container: HTMLDivElement
    let coinInput: HTMLInputElement
    let display: HTMLInputElement
    let insertButton: HTMLButtonElement
    let dialContainer: HTMLDivElement
    let dialItems: NodeListOf<HTMLButtonElement>
    let returnButton: HTMLButtonElement

    beforeEach(() => {
        container = document.createElement('div')
        vendingMachine = new VendingMachine(container, dummyData)
        vendingMachine.init()

        coinInput = container.querySelector('[data-role="coin-input"]') as HTMLInputElement
        display = container.querySelector('[data-role="display"]') as HTMLInputElement
        insertButton = container.querySelector('[data-role="insert-button"]') as HTMLButtonElement

        dialContainer = container.querySelector('[data-role="dial-container"]') as HTMLDivElement
        dialItems = dialContainer.querySelectorAll('[data-role="dial-item"]') as NodeListOf<HTMLButtonElement>
        returnButton = container.querySelector('[data-role="return-button"]') as HTMLButtonElement
    })

    // 구매 기능 동작 테스트
    describe('구매 기능 동작 테스트', () => {
        it('투입한 금액이 상품 가격보다 높으면 상품을 구매할 수 있다.', () => {
            coinInput.value = '10000'
            insertButton.click()

            const dialItem = dialItems[1]
            const price = Number(dialItem.dataset.price)
            const name = dialItem.dataset.name as string
            const buyItemSpy = jest.spyOn(vendingMachine, 'buyItem')

            const mousedown = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window })
            dialItem.dispatchEvent(mousedown)

            expect(buyItemSpy).toHaveBeenCalledWith({ name, price })

            expect(vendingMachine.getCurrentCoin()).toBe(10000 - price)
            expect(display.value).toBe((10000 - price).toLocaleString())

            const logs = container.querySelectorAll('.log-item')
            expect(logs[logs.length - 1].textContent).toBe(`${name}을(를) 구매했습니다.`)
        })

        it('투입한 금액이 상품 가격보다 낮으면 상품을 구매할 수 없다.', () => {
            coinInput.value = '100'
            insertButton.click()

            const dialItem = dialItems[1]
            const price = Number(dialItem.dataset.price)
            const name = dialItem.dataset.name as string

            vendingMachine.buyItem({ name, price })

            expect(display.value).toBe(price.toLocaleString())
            expect(display.classList.contains('error-text')).toBe(true)
        })
    })

    // 투입 기능 동작 테스트
    describe('투입 기능 동작 테스트', () => {
        it('투입한 금액과 화면에 표시된 금액이 일치해야 한다.', () => {
            coinInput.value = '1000'
            insertButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(1000)
            expect(display.value).toBe('1,000')
        })

        it('투입한 금액은 현재 금액에 더해져야 한다.', () => {
            coinInput.value = '1000'
            insertButton.click()

            coinInput.value = '2000'
            insertButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(3000)
            expect(display.value).toBe('3,000')
        })

        it('투입하려는 금액과 투입된 금액의 총합이 1,000,000을 초과하는 경우 오류 메시지를 출력한다.', () => {
            coinInput.value = '1000'
            insertButton.click()

            coinInput.value = '999999'
            insertButton.click()

            const logs = container.querySelectorAll('.log-item')

            expect(logs[logs.length - 1].textContent).toBe('최대 투입 가능한 금액은 1,000,000원 입니다.')
        })

        it('투입하려는 금액과 투입된 금액의 총합이 1,000,000을 초과하는 경우 투입된 금액은 변동되지 않는다.', () => {
            coinInput.value = '1000'
            insertButton.click()

            coinInput.value = '999999'
            insertButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(1000)
            expect(display.value).toBe('1,000')
        })
    })

    // 반환 기능 동작 테스트
    describe('반환 기능 동작 테스트', () => {
        it('반환 버튼을 클릭하면 투입된 금액이 0원이 된다.', () => {
            coinInput.value = '1000'
            insertButton.click()

            coinInput.value = '3423'
            insertButton.click()

            returnButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(0)
            expect(display.value).toBe('0')

            const logs = container.querySelectorAll('.log-item')
            expect(logs[logs.length - 1].textContent).toBe(`4,423원을 반환합니다.`)
        })

        it('반환 버튼을 클릭하면 투입된 금액이 반환되었다는 log를 남긴다.', () => {
            coinInput.value = '1000'
            insertButton.click()

            coinInput.value = '3423'
            insertButton.click()

            returnButton.click()

            const logs = container.querySelectorAll('.log-item')
            expect(logs[logs.length - 1].textContent).toBe(`4,423원을 반환합니다.`)
        })

        it('투입한 금액이 없을때 반환 버튼을 클릭하면 현재 금액은 0원을 유지한다.', () => {
            returnButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(0)
            expect(display.value).toBe('0')
        })

        it('투입한 금액이 없을때 반환 버튼을 클릭하면 log를 남기지 않는다.', () => {
            returnButton.click()

            const logs = container.querySelectorAll('.log-item')
            expect(logs.length).toBe(0)
        })
    })
})
