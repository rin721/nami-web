export interface NamiClickEventDetail {
  sourceEvent?: Event;
  selected?: boolean;
}

export interface NamiChangeEventDetail<TValue = string> {
  value?: TValue;
  checked?: boolean;
  selected?: boolean;
  open?: boolean;
  locale?: string;
  dir?: string;
  sourceEvent?: Event;
}

export interface NamiSelectEventDetail<TValue = string> {
  value?: TValue;
  selected?: boolean;
  sourceEvent?: Event;
}

export interface NamiOpenEventDetail {
  sourceEvent?: Event;
}

export interface NamiCloseEventDetail {
  sourceEvent?: Event;
}

export interface NamiLocaleStatusEventDetail {
  status: 'loading' | 'ready' | 'error';
  loadingLocale?: string;
  readyLocale?: string;
  errorLocale?: string;
  errorMessage?: string;
}

export interface NamiScrollSmootherEventDetail {
  scroll: number;
  limit: number;
  progress: number;
  velocity: number;
  direction: 1 | -1 | 0;
  preset: 'gentle' | 'balanced' | 'strong';
  reducedMotion: boolean;
}

export type NamiClickEvent = CustomEvent<NamiClickEventDetail>;
export type NamiChangeEvent<TValue = string> = CustomEvent<NamiChangeEventDetail<TValue>>;
export type NamiSelectEvent<TValue = string> = CustomEvent<NamiSelectEventDetail<TValue>>;
export type NamiOpenEvent = CustomEvent<NamiOpenEventDetail | undefined>;
export type NamiCloseEvent = CustomEvent<NamiCloseEventDetail | undefined>;
export type NamiLocaleStatusEvent = CustomEvent<NamiLocaleStatusEventDetail>;
export type NamiScrollSmootherEvent = CustomEvent<NamiScrollSmootherEventDetail>;
