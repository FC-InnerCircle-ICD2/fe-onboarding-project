class Log {
    private logContainer: HTMLUListElement
    private logs: string[]

    constructor(el: HTMLUListElement) {
        this.logContainer = el
        this.logs = []
    }

    public addLog(log: string) {
        this.logs.push(log)

        this.showLogs(log)
    }

    public showLogs(log: string) {
        const li = document.createElement('li')
        li.classList.add('log-item')
        li.textContent = log

        this.logContainer.appendChild(li)
        this.logContainer.scrollTop = this.logContainer.scrollHeight
    }
}

export const log = new Log(document.getElementById('log-container') as HTMLUListElement)
