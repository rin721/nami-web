import { restoreFocus } from './focus';

export type NamiOverlayPlacement = 'top' | 'right' | 'bottom' | 'left' | 'start' | 'end';
export type NamiOverlayOpenState = 'open' | 'closed';

export interface NamiOverlayCloseDetail {
  sourceEvent: Event;
}

export function overlayState(open: boolean): NamiOverlayOpenState {
  return open ? 'open' : 'closed';
}

export function captureOverlayFocus() {
  return document.activeElement;
}

export function restoreOverlayFocus(element: Element | null) {
  restoreFocus(element);
}

export function overlayCloseDetail(sourceEvent?: Event): NamiOverlayCloseDetail | undefined {
  return sourceEvent ? { sourceEvent } : undefined;
}

export function isEscapeKey(event: KeyboardEvent) {
  return event.key === 'Escape';
}

export function isBackdropEvent(event: Event, backdrop: EventTarget | null) {
  return event.target === backdrop;
}

export function resolveOverlayPlacement(placement: NamiOverlayPlacement, dir: 'ltr' | 'rtl' = 'ltr') {
  if (placement === 'start') return dir === 'rtl' ? 'right' : 'left';
  if (placement === 'end') return dir === 'rtl' ? 'left' : 'right';
  return placement;
}
