const convertCurrencyFormat = number => parseInt(number).toLocaleString("ko-kr")

const updateElement = (className, value, type = "innerText") => {
  const element = document.querySelector(`.${className}`)

  switch (type) {
    case "innerText":
      element.innerText = value
      break
    case "value":
      if ("value" in element) {
        element.value = value
      }
      break
    default:
      return
  }
}
