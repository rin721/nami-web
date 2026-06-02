export function defineElement(tagName: string, element: CustomElementConstructor) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, element);
  }
}
