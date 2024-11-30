import '@testing-library/jest-dom'
import { VendingMachine } from '../class/vendingMachine'
import { dummyData } from '../data'

describe('VendingMachine', () => {
    let vendingMachine: VendingMachine
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div')
        vendingMachine = new VendingMachine(container, dummyData)
        vendingMachine.init()
    })

    describe('buyItem', () => {
        it('투입한 금액이 상품 가격보다 높으면 상품을 구매할 수 있다.', () => {
            const coinInput = container.querySelector('.coin-input') as HTMLInputElement
            const display = container.querySelector('#count-display') as HTMLInputElement
            const insertButton = container.querySelector('.insert-coin') as HTMLButtonElement

            coinInput.value = '10000'
            insertButton.click()

            const dialContainer = container.querySelector('.dial-container') as HTMLDivElement
            const dialItems = dialContainer.querySelectorAll('.dial-item') as NodeListOf<HTMLDivElement>

            const index = Math.floor(Math.random() * dialItems.length)
            const dialItem = dialItems[index]
            const price = Number(dialItem.dataset.price)
            const name = dialItem.dataset.name as string

            const buyItemSpy = jest.spyOn(vendingMachine, 'buyItem')

            vendingMachine.buyItem({ name, price })

            expect(buyItemSpy).toHaveBeenCalledWith({ name, price })

            expect(vendingMachine.getCurrentCoin()).toBe(10000 - price)
            expect(display.value).toBe((10000 - price).toLocaleString())

            const logs = container.querySelectorAll('.log-item')
            expect(logs[logs.length - 1].textContent).toBe(`${name}을(를) 구매했습니다.`)
        })

        it('투입한 금액이 상품 가격보다 낮으면 상품을 구매할 수 없다.', () => {
            const coinInput = container.querySelector('.coin-input') as HTMLInputElement
            const display = container.querySelector('#count-display') as HTMLInputElement
            const insertButton = container.querySelector('.insert-coin') as HTMLButtonElement

            coinInput.value = '100'
            insertButton.click()

            const dialContainer = container.querySelector('.dial-container') as HTMLDivElement
            const dialItems = dialContainer.querySelectorAll('.dial-item') as NodeListOf<HTMLDivElement>

            const index = Math.floor(Math.random() * dialItems.length)
            const dialItem = dialItems[index]
            const price = Number(dialItem.dataset.price)
            const name = dialItem.dataset.name as string

            vendingMachine.buyItem({ name, price })

            expect(display.value).toBe(price.toLocaleString())
            expect(display.classList.contains('error-text')).toBe(true)
        })
    })
})
