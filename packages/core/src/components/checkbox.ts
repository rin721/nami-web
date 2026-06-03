import { css, html, LitElement } from 'lit';
import { attachInternalsSafe, setSafeFormValue, setSafeValidity, type SafeElementInternals } from '../foundation/form-associated';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiCheckbox extends LitElement {
  static formAssociated = true;
  static properties = {
    name: {},
    value: {},
    checked: { type: Boolean, reflect: true },
    defaultChecked: { attribute: 'default-checked', type: Boolean },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    error: { reflect: true, useDefault: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: transparent;
        border: 0;
        color: var(--nami-text);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-3, 10px);
        padding: 0;
      }

      .box {
        align-items: center;
        background: var(--nami-checkbox-bg, transparent);
        border: var(--nami-checkbox-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-checkbox-border, var(--nami-border));
        border-radius: var(--nami-checkbox-radius, var(--nami-radius-tight, 4px));
        box-sizing: border-box;
        color: var(--nami-checkbox-indicator-color, #fff);
        display: inline-flex;
        height: 20px;
        justify-content: center;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 20px;
      }

      :host([checked]) .box {
        background: var(--nami-color-primary);
        border-color: var(--nami-color-primary);
      }

      :host([error]) .box {
        border-color: var(--nami-color-danger);
      }

      button:focus-visible .box {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .mark {
        display: inline-block;
        font-size: 0.9rem;
        line-height: 1;
        opacity: 0;
        transform: scale(0.82);
        transition:
          opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      :host([checked]) .mark {
        opacity: 1;
        transform: scale(1);
      }
    `
  ];

  declare name: string;
  declare value: string;
  declare checked: boolean;
  declare defaultChecked: boolean;
  declare disabled: boolean;
  declare required: boolean;
  declare error: string;

  private internals: SafeElementInternals | null = attachInternalsSafe(this);

  constructor() {
    super();
    this.name = '';
    this.value = 'on';
    this.checked = false;
    this.defaultChecked = false;
    this.disabled = false;
    this.required = false;
    this.error = '';
  }

  updated() {
    this.dataset.state = this.checked ? 'checked' : 'unchecked';
    this.toggleAttribute('data-disabled', this.disabled);
    this.toggleAttribute('data-invalid', Boolean(this.error || (this.required && !this.checked)));
    setSafeFormValue(this.internals, !this.disabled && this.checked ? this.value : null);
    setSafeValidity(this.internals, this.validityFlags, this.validationMessage || undefined);
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
  }

  checkValidity() {
    return Object.keys(this.validityFlags).length === 0;
  }

  reportValidity() {
    return this.checkValidity();
  }

  get validationMessage() {
    if (this.disabled) return '';
    if (this.error) return this.error;
    if (this.required && !this.checked) return 'This field is required';
    return '';
  }

  private get validityFlags(): ValidityStateFlags {
    if (this.disabled) return {};
    if (this.error) return { customError: true };
    if (this.required && !this.checked) return { valueMissing: true };
    return {};
  }

  private toggle(event: MouseEvent) {
    if (this.disabled) return;
    this.checked = !this.checked;
    emit(this, 'nami-change', { checked: this.checked, value: this.value, sourceEvent: event });
  }

  render() {
    return html`
      <button
        part="base control"
        type="button"
        role="checkbox"
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-invalid=${this.error ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="box" part="indicator"><span class="mark" aria-hidden="true">${'\u2713'}</span></span>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-checkbox': NamiCheckbox;
  }
}
