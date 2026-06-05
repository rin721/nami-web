import { css, html, LitElement, nothing } from 'lit';
import { attachInternalsSafe, requiredTextValidity, setSafeFormValue, setSafeValidity, type SafeElementInternals } from '../foundation/form-associated';
import { nextId } from '../foundation/ids';
import { syncHostState } from '../foundation/selection';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiInput extends LitElement {
  static formAssociated = true;
  static properties = {
    name: {},
    value: {},
    defaultValue: { attribute: 'default-value' },
    type: {},
    placeholder: {},
    label: {},
    helperText: { attribute: 'helper-text' },
    error: { reflect: true, useDefault: true },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      label {
        color: var(--nami-text);
        display: grid;
        gap: var(--nami-space-2, 6px);
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        align-items: center;
        background: var(--nami-input-bg, transparent);
        border: var(--nami-input-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-input-border, var(--nami-border));
        border-radius: var(--nami-input-radius, var(--nami-radius-surface, 6px));
        display: flex;
        min-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        padding: 0 var(--nami-control-padding-x, 10px);
        box-shadow: var(--nami-input-shadow, none);
        transition:
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      .control:focus-within {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([error]) .control {
        border-color: var(--nami-color-danger);
      }

      input {
        background: transparent;
        border: 0;
        color: var(--nami-style-on-paper, var(--nami-text));
        flex: 1 1 auto;
        font: inherit;
        font-size: var(--nami-control-font-size, 0.9375rem);
        min-width: 0;
        outline: none;
        padding: 0;
      }

      input::placeholder {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }

      ::slotted([slot='icon']),
      ::slotted([slot='actions']) {
        color: var(--nami-icon-color);
        flex: 0 0 auto;
      }
    `
  ];

  declare name: string;
  declare value: string;
  declare defaultValue: string;
  declare type: string;
  declare placeholder: string;
  declare label: string;
  declare helperText: string;
  declare error: string;
  declare disabled: boolean;
  declare required: boolean;

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.defaultValue = '';
    this.type = 'text';
    this.placeholder = '';
    this.label = '';
    this.helperText = '';
    this.error = '';
    this.disabled = false;
    this.required = false;
  }

  private get inputElement() {
    return this.renderRoot.querySelector('input') as HTMLInputElement | null;
  }

  private internals: SafeElementInternals | null = attachInternalsSafe(this);
  private metaId = `${nextId('nami-input')}-meta`;

  updated() {
    const invalid = !this.disabled && Boolean(this.error || (this.required && !this.value));
    syncHostState(this, {
      state: invalid ? 'invalid' : 'valid',
      disabled: this.disabled,
      invalid
    });
    setSafeFormValue(this.internals, this.disabled ? null : this.value);
    setSafeValidity(this.internals, this.validityFlags, this.validityMessage, this.inputElement ?? undefined);
  }

  formResetCallback() {
    this.value = this.defaultValue;
  }

  focus() {
    this.inputElement?.focus();
  }

  checkValidity() {
    return this.inputElement?.checkValidity() ?? Object.keys(this.validityFlags).length === 0;
  }

  reportValidity() {
    return this.inputElement?.reportValidity() ?? this.checkValidity();
  }

  get validity() {
    return this.inputElement?.validity;
  }

  get validationMessage() {
    return this.error || this.inputElement?.validationMessage || '';
  }

  get willValidate() {
    return !this.disabled;
  }

  private get validityFlags(): ValidityStateFlags {
    if (this.disabled) return {};
    if (this.error) return { customError: true };
    if (this.required) return requiredTextValidity(this.value, this.label || this.name || 'Field').flags;
    return {};
  }

  private get validityMessage() {
    if (this.disabled) return undefined;
    if (this.error) return this.error;
    if (this.required) return requiredTextValidity(this.value, this.label || this.name || 'Field').message;
    return undefined;
  }

  private handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    emit(this, 'nami-input', { value: this.value, sourceEvent: event });
  }

  private handleChange(event: Event) {
    emit(this, 'nami-change', { value: this.value, sourceEvent: event });
  }

  render() {
    const helperId = this.id ? `${this.id}-meta` : this.metaId;
    const meta = this.error || this.helperText;

    return html`
      <label part="base">
        ${this.label ? html`<span class="label" part="label">${this.label}${this.required ? ' *' : ''}</span>` : nothing}
        <span class="control" part="control">
          <slot name="icon" part="icon"></slot>
          <input
            .value=${this.value}
            name=${this.name}
            type=${this.type}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-describedby=${meta ? helperId : nothing}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <slot name="actions"></slot>
        </span>
      </label>
      ${meta ? html`<div id=${helperId} class="meta ${this.error ? 'error' : ''}" part=${this.error ? 'error' : 'description'}>${meta}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-input': NamiInput;
  }
}
