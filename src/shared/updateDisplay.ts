export const updateDisplay = <T extends Element, K extends string>(
  element: T,
  value: K,
) => {
  if ('value' in element) {
    element.value = value;
  }

  if ('textContent' in element) {
    element.textContent = value;
  }
};
