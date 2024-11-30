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

    describe('returnCoin', () => {
        it('투입한 금액을 반환해야 한다.', () => {
            const coinInput = container.querySelector('.coin-input') as HTMLInputElement
            const display = container.querySelector('#count-display') as HTMLInputElement
            const insertButton = container.querySelector('.insert-coin') as HTMLButtonElement
            const returnButton = container.querySelector('.return-coin') as HTMLButtonElement

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

        it('투입한 금액이 없으면 반환할 수 없다.', () => {
            const returnButton = container.querySelector('.return-coin') as HTMLButtonElement

            returnButton.click()

            const logs = container.querySelectorAll('.log-item')
            expect(logs.length).toBe(0)
        })
    })
})
