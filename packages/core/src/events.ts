export interface RlClickEventDetail {
  sourceEvent?: Event;
  selected?: boolean;
}

export interface RlChangeEventDetail<TValue = string> {
  value?: TValue;
  checked?: boolean;
  selected?: boolean;
  open?: boolean;
  locale?: string;
  dir?: string;
  sourceEvent?: Event;
}

export interface RlSelectEventDetail<TValue = string> {
  value?: TValue;
  selected?: boolean;
  sourceEvent?: Event;
}

export interface RlOpenEventDetail {
  sourceEvent?: Event;
}

export interface RlCloseEventDetail {
  sourceEvent?: Event;
}

export interface RlLocaleStatusEventDetail {
  status: 'loading' | 'ready' | 'error';
  loadingLocale?: string;
  readyLocale?: string;
  errorLocale?: string;
  errorMessage?: string;
}

export type RlClickEvent = CustomEvent<RlClickEventDetail>;
export type RlChangeEvent<TValue = string> = CustomEvent<RlChangeEventDetail<TValue>>;
export type RlSelectEvent<TValue = string> = CustomEvent<RlSelectEventDetail<TValue>>;
export type RlOpenEvent = CustomEvent<RlOpenEventDetail | undefined>;
export type RlCloseEvent = CustomEvent<RlCloseEventDetail | undefined>;
export type RlLocaleStatusEvent = CustomEvent<RlLocaleStatusEventDetail>;
