class CoinInput {
    private coinInput: HTMLInputElement

    constructor(element: HTMLInputElement) {
        this.coinInput = element

        this.coinInput.addEventListener('input', this.handleInputChange.bind(this))
    }

    private handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement

        this.updateCoin(Number(target.value.replace(/[^0-9]/g, '')))
    }

    public updateCoin(value: number) {
        this.coinInput.value = !value ? '' : value.toLocaleString()
    }

    public getCoin() {
        return Number(this.coinInput.value.replace(/,/g, ''))
    }

    public reset() {
        this.coinInput.value = ''
    }
}

export const coinInput = new CoinInput(document.getElementById('coin-input') as HTMLInputElement)
