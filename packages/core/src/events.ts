export interface RlClickEventDetail {
  sourceEvent?: Event;
  selected?: boolean;
}

export interface RlChangeEventDetail<TValue = string> {
  value?: TValue;
  checked?: boolean;
  selected?: boolean;
  open?: boolean;
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

export type RlClickEvent = CustomEvent<RlClickEventDetail>;
export type RlChangeEvent<TValue = string> = CustomEvent<RlChangeEventDetail<TValue>>;
export type RlSelectEvent<TValue = string> = CustomEvent<RlSelectEventDetail<TValue>>;
export type RlOpenEvent = CustomEvent<RlOpenEventDetail | undefined>;
export type RlCloseEvent = CustomEvent<RlCloseEventDetail | undefined>;
