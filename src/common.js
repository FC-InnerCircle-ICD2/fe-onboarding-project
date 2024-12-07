export const formatNumberToKoreanLocale = number =>
  parseInt(number).toLocaleString("ko-kr")

export const selectNode = node => document.querySelector(node)

export const updateElementContent = (selector, value, type = "innerText") => {
  const element = selectNode(selector)
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