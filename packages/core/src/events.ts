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

export interface NamiScrollStateEventDetail {
  scrollY: number;
  progress: number;
  direction: 'idle' | 'up' | 'down';
  hidden: boolean;
  elevated: boolean;
}

export type NamiClickEvent = CustomEvent<NamiClickEventDetail>;
export type NamiChangeEvent<TValue = string> = CustomEvent<NamiChangeEventDetail<TValue>>;
export type NamiSelectEvent<TValue = string> = CustomEvent<NamiSelectEventDetail<TValue>>;
export type NamiOpenEvent = CustomEvent<NamiOpenEventDetail | undefined>;
export type NamiCloseEvent = CustomEvent<NamiCloseEventDetail | undefined>;
export type NamiLocaleStatusEvent = CustomEvent<NamiLocaleStatusEventDetail>;
export type NamiScrollStateEvent = CustomEvent<NamiScrollStateEventDetail>;
