import { logs } from './events'
import { logContainer } from './init'

// log 출력 함수
export const printLog = () => {
    const html = logs
        .map((log) => {
            return `<li class="log-item">${log}</li>`
        })
        .join('')

    logContainer.innerHTML = html

    // 맨 아래로 스크롤
    logContainer.scrollTop = logContainer.scrollHeight
}
