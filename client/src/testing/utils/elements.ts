export const getElement = (element: HTMLElement, selector: string) => {
  return element.querySelector(selector);
};

export const getElements = (element: HTMLElement, selector: string) => {
  return Array.from(element.querySelectorAll(selector));
};