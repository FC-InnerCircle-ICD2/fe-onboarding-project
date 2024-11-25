import { display } from './display'
import { log } from './log'

class ReturnButton {
    private btn: HTMLButtonElement

    constructor(el: HTMLButtonElement) {
        this.btn = el

        this.btn.addEventListener('click', () => {
            if (!display) return

            const currentCoin = display.getCurrentCoin()

            if (!currentCoin) return

            display.returnCoin()
            log.addLog(`${currentCoin.toLocaleString()}원을 반환했습니다.`)
        })
    }
}

export const returnButton = new ReturnButton(document.getElementById('return-coin') as HTMLButtonElement)
