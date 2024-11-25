import { coinInput } from './coinInput'
import { display } from './display'
import { log } from './log'

class InsertButton {
    private btn: HTMLButtonElement

    constructor(el: HTMLButtonElement) {
        this.btn = el

        this.btn.addEventListener('click', () => {
            if (!coinInput || !display) return

            const coin = coinInput.getCoin()

            if (!coin) {
                return
            }

            display.addCoin(coin)
            log.addLog(`${coin.toLocaleString()}원을 투입했습니다.`)
            coinInput.reset()
        })
    }
}

export const insertButton = new InsertButton(document.getElementById('insert-coin') as HTMLButtonElement)
