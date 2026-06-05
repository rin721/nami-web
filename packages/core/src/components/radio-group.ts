import { css, html, LitElement, nothing } from 'lit';
import { attachInternalsSafe, requiredTextValidity, setSafeFormValue, setSafeValidity, type SafeElementInternals } from '../foundation/form-associated';
import { getNextRovingIndex } from '../foundation/roving-tabindex';
import { syncHostState } from '../foundation/selection';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';
import type { NamiRadioItem } from './radio-item';

export class NamiRadioGroup extends LitElement {
  static formAssociated = true;
  static properties = {
    name: {},
    value: {},
    defaultValue: { attribute: 'default-value' },
    orientation: { reflect: true },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    error: { reflect: true, useDefault: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        border: 0;
        display: grid;
        gap: var(--nami-radio-group-gap, var(--nami-space-2, 6px));
        margin: 0;
        min-inline-size: 0;
        padding: 0;
      }

      :host([orientation='horizontal']) .items {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-radio-group-gap, var(--nami-space-3, 10px));
      }

      :host([orientation='vertical']) .items {
        display: grid;
        gap: var(--nami-radio-group-gap, var(--nami-space-2, 6px));
      }

      .label {
        color: var(--nami-text);
        font-size: 0.875rem;
        font-weight: 600;
      }

      .error {
        color: var(--nami-color-danger);
        font-size: 0.8125rem;
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `
  ];

  declare name: string;
  declare value: string;
  declare defaultValue: string;
  declare orientation: 'horizontal' | 'vertical';
  declare disabled: boolean;
  declare required: boolean;
  declare error: string;

  private internals: SafeElementInternals | null = attachInternalsSafe(this);

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.defaultValue = '';
    this.orientation = 'vertical';
    this.disabled = false;
    this.required = false;
    this.error = '';
  }

  private get items() {
    return Array.from(this.children).filter((element): element is NamiRadioItem => element.localName === 'nami-radio-item');
  }

  private get enabledItems() {
    return this.items.filter((item) => !item.effectiveDisabled);
  }

  firstUpdated() {
    this.syncItems();
  }

  updated() {
    this.syncItems();
    const invalid = !this.disabled && Boolean(this.error || (this.required && !this.value));
    syncHostState(this, {
      state: this.value ? 'selected' : 'empty',
      disabled: this.disabled,
      invalid
    });
    setSafeFormValue(this.internals, this.disabled || !this.value ? null : this.value);
    setSafeValidity(this.internals, this.validityFlags, this.validityMessage);
  }

  formResetCallback() {
    this.value = this.defaultValue;
    this.syncItems();
  }

  checkValidity() {
    return Object.keys(this.validityFlags).length === 0;
  }

  reportValidity() {
    return this.checkValidity();
  }

  get validationMessage() {
    return this.validityMessage ?? '';
  }

  private get validityFlags(): ValidityStateFlags {
    if (this.disabled) return {};
    if (this.error) return { customError: true };
    if (this.required) return requiredTextValidity(this.value, this.name || 'Radio group').flags;
    return {};
  }

  private get validityMessage() {
    if (this.disabled) return undefined;
    if (this.error) return this.error;
    if (this.required) return requiredTextValidity(this.value, this.name || 'Radio group').message;
    return undefined;
  }

  private syncItems() {
    const items = this.items;
    const hasValue = Boolean(this.value);
    const enabledItems = items.filter((item) => !item.disabled && !this.disabled);
    const selectedEnabledItem = enabledItems.find((item) => hasValue && item.value === this.value);
    const rovingItem = selectedEnabledItem ?? enabledItems[0];

    items.forEach((item) => {
      const selected = hasValue && item.value === this.value;
      item.setGroupDisabled(this.disabled);
      item.checked = selected;
      item.tabIndex = item === rovingItem ? 0 : -1;
      item.removeEventListener('nami-select', this.handleItemSelect);
      item.removeEventListener('nami-change', this.handleItemChange);
      item.removeEventListener('keydown', this.handleItemKeydown);
      item.addEventListener('nami-select', this.handleItemSelect);
      item.addEventListener('nami-change', this.handleItemChange);
      item.addEventListener('keydown', this.handleItemKeydown);
    });
  }

  private handleItemSelect = (event: Event) => {
    event.stopPropagation();
    const item = event.currentTarget as NamiRadioItem;
    const sourceEvent = (event as CustomEvent<{ sourceEvent?: Event }>).detail?.sourceEvent ?? event;
    this.selectItem(item, sourceEvent);
  };

  private handleItemChange = (event: Event) => {
    event.stopPropagation();
  };

  private handleItemKeydown = (event: KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = event.currentTarget as NamiRadioItem;
    const enabledItems = this.enabledItems;
    const index = enabledItems.indexOf(current);
    if (index < 0 || enabledItems.length === 0) return;
    const next = getNextRovingIndex(event.key, index, enabledItems.length, this.orientation);
    const item = enabledItems[next];
    item?.focus();
    if (item) this.selectItem(item, event);
  };

  private selectItem(item: NamiRadioItem, sourceEvent: Event) {
    if (this.disabled || item.effectiveDisabled || !item.value) return;
    const previousValue = this.value;
    if (previousValue === item.value) {
      this.syncItems();
      return;
    }
    this.value = item.value;
    this.syncItems();
    const detail = { value: this.value, previousValue, item, sourceEvent };
    emit(this, 'nami-select', detail);
    emit(this, 'nami-change', detail);
  }

  render() {
    return html`
      <fieldset class="base" part="base">
        <legend class="label" part="label"><slot name="label">${nothing}</slot></legend>
        <div class="items" part="items" role="radiogroup" aria-orientation=${this.orientation} aria-invalid=${this.error ? 'true' : 'false'}>
          <slot @slotchange=${() => this.syncItems()}></slot>
        </div>
        ${this.error ? html`<div class="error" part="error">${this.error}</div>` : nothing}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-radio-group': NamiRadioGroup;
  }
}
