export type NamiCheckedState = 'checked' | 'unchecked';
export type NamiSelectedState = 'selected' | 'unselected';
export type NamiActiveState = 'active' | 'inactive';

export interface NamiHostStateOptions {
  state: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
}

export function checkedState(checked: boolean): NamiCheckedState {
  return checked ? 'checked' : 'unchecked';
}

export function selectedState(selected: boolean): NamiSelectedState {
  return selected ? 'selected' : 'unselected';
}

export function activeState(active: boolean): NamiActiveState {
  return active ? 'active' : 'inactive';
}

export function syncHostState(host: HTMLElement, options: NamiHostStateOptions) {
  host.dataset.state = options.state;
  if (options.disabled !== undefined) host.toggleAttribute('data-disabled', options.disabled);
  if (options.invalid !== undefined) host.toggleAttribute('data-invalid', options.invalid);
  if (options.loading !== undefined) host.toggleAttribute('data-loading', options.loading);
}
