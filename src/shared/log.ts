export class LogService {
  private logs: Array<string> = [];
  logWindowElement: HTMLDivElement;

  constructor(element: HTMLDivElement) {
    this.logWindowElement = element;
  }

  track(log: string) {
    this.logs.push(log);
    console.log(log);
    this._show(log);
  }

  _show(log: string) {
    const p = document.createElement('p');

    p.className = 'log-window_paragraph';
    p.innerHTML = log;

    this.logWindowElement.appendChild(p);
    this.logWindowElement.scrollTop = this.logWindowElement.scrollHeight;
  }
}
