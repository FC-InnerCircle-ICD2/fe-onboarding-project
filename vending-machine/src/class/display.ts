class Display {
    private display: HTMLInputElement
    private currentCoin: number

    constructor(element: HTMLInputElement) {
        this.display = element
        this.currentCoin = 0

        this.display.value = this.currentCoin.toLocaleString()
    }

    public addCoin(coin: number) {
        if (!coin) return

        if (this.currentCoin + coin > 1000000) {
            alert('최대 보유 금액은 1,000,000원 입니다.')
            return
        }

        this.currentCoin += coin

        this.updateDisplay()
    }

    public minusCoin(coin: number) {
        if (!coin) return

        this.currentCoin -= coin

        this.updateDisplay()
    }

    public returnCoin() {
        this.currentCoin = 0

        this.updateDisplay()
    }

    public updateDisplay(price?: number) {
        this.display.value = price ? price.toLocaleString() : this.currentCoin.toLocaleString()
    }

    public getCurrentCoin() {
        return this.currentCoin
    }

    public setError(price: number) {
        this.display.classList.add('error-text')
        this.updateDisplay(price)
    }

    public resetError() {
        if (this.display.classList.contains('error-text')) {
            this.display.classList.remove('error-text')
            this.updateDisplay()
        }
    }
}

export const display = new Display(document.getElementById('count-display') as HTMLInputElement)
