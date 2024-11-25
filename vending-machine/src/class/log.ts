class Log {
    private logContainer: HTMLUListElement
    private logs: string[]

    constructor(el: HTMLUListElement) {
        this.logContainer = el
        this.logs = []
    }

    public addLog(log: string) {
        this.logs.push(log)

        this.showLogs()
    }

    public showLogs() {
        this.logContainer.innerHTML = this.logs
            .map((log) => {
                return `<li class="log-item">${log}</li>`
            })
            .join('')

        this.logContainer.scrollTop = this.logContainer.scrollHeight
    }
}

export const log = new Log(document.getElementById('log-container') as HTMLUListElement)
