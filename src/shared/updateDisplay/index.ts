export const updateDisplay = <T extends HTMLElement, K extends string>(
  element: T,
  value: K,
) => {
  if (!element || typeof value !== 'string') {
    return;
  }

  if ('textContent' in element) {
    element.textContent = value;
  }
};
