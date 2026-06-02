export type RovingOrientation = 'horizontal' | 'vertical';

export function getRovingValue(item: HTMLElement) {
  return item.getAttribute('value') || item.dataset.value || item.textContent?.trim() || '';
}

export function syncRovingItems(items: HTMLElement[], activeValue: string) {
  items.forEach((item) => {
    const selected = getRovingValue(item) === activeValue;
    item.setAttribute('tabindex', selected ? '0' : '-1');
  });
}

export function getNextRovingIndex(
  key: string,
  currentIndex: number,
  length: number,
  orientation: RovingOrientation
) {
  const nextKeys = orientation === 'vertical' ? ['ArrowDown'] : ['ArrowRight'];
  const previousKeys = orientation === 'vertical' ? ['ArrowUp'] : ['ArrowLeft'];
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  if (nextKeys.includes(key)) return (currentIndex + 1) % length;
  if (previousKeys.includes(key)) return (currentIndex - 1 + length) % length;
  return currentIndex;
}
