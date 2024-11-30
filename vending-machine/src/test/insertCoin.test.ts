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

    describe('insertCoin', () => {
        it('투입한 금액과 화면에 표시된 금액이 일치해야 한다.', () => {
            const coinInput = container.querySelector('.coin-input') as HTMLInputElement
            const display = container.querySelector('#count-display') as HTMLInputElement
            const insertButton = container.querySelector('.insert-coin') as HTMLButtonElement

            coinInput.value = '1000'
            insertButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(1000)
            expect(display.value).toBe('1,000')
        })

        it('투입 가능한 최대 금액은 1,000,000입니다.', () => {
            const coinInput = container.querySelector('.coin-input') as HTMLInputElement
            const insertButton = container.querySelector('.insert-coin') as HTMLButtonElement

            coinInput.value = '1000001'
            insertButton.click()

            const logs = container.querySelectorAll('.log-item')

            expect(logs[logs.length - 1].textContent).toBe('최대 투입 가능한 금액은 1,000,000원 입니다.')
        })

        it('투입한 금액은 현재 금액에 더해져야 한다.', () => {
            const coinInput = container.querySelector('.coin-input') as HTMLInputElement
            const display = container.querySelector('#count-display') as HTMLInputElement
            const insertButton = container.querySelector('.insert-coin') as HTMLButtonElement

            coinInput.value = '1000'
            insertButton.click()

            coinInput.value = '2000'
            insertButton.click()

            expect(vendingMachine.getCurrentCoin()).toBe(3000)
            expect(display.value).toBe('3,000')
        })
    })
})
