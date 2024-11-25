const logLists = document.querySelector(".log-lists")

// TODO: 어떤 로그가 찍힐지 타입을 정의해야 할듯 (충전, 구매, 반환)

const addLog = () => {
  const logList = createElement("li")
  logList.textContent = "로그1"

  logLists.appendChild(logList)
}
