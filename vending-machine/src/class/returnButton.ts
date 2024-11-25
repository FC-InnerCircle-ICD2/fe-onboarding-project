import { coinInput } from './coinInput'
import { display } from './display'
import { log } from './log'

class ReturnButton {
    private btn: HTMLButtonElement

    constructor(el: HTMLButtonElement) {
        this.btn = el

        this.btn.addEventListener('click', () => {
            if (!coinInput || !display) return

            const coin = coinInput.getCoin()

            if (!coin) {
                alert('반환 금액을 입력해주세요.')
                return
            }

            const currentCoin = display.getCurrentCoin()

            coinInput.reset()

            if (!currentCoin) {
                return
            } else if (currentCoin - coin < 0) {
                display.minusCoin(currentCoin)
                log.addLog(`${currentCoin.toLocaleString()}원을 반환했습니다.`)
            } else {
                display.minusCoin(coin)
                log.addLog(`${coin.toLocaleString()}원을 반환했습니다.`)
            }
        })
    }
}

export const returnButton = new ReturnButton(document.getElementById('return-coin') as HTMLButtonElement)
