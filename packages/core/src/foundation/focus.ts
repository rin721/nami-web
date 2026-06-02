const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export function getFocusableElements(container: ParentNode) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => {
    return !element.hasAttribute('disabled') && element.tabIndex >= 0;
  });
}

export function trapFocus(event: KeyboardEvent, container: ParentNode) {
  if (event.key !== 'Tab') return;
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function restoreFocus(element: Element | null) {
  if (element instanceof HTMLElement) {
    element.focus();
  }
}
