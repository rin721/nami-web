import { css, html, LitElement, nothing } from 'lit';
import { attachInternalsSafe, setSafeFormValue, setSafeValidity, type SafeElementInternals } from '../foundation/form-associated';
import { nextId } from '../foundation/ids';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class RlInput extends LitElement {
  static formAssociated = true;
  static properties = {
    name: {},
    value: {},
    defaultValue: { attribute: 'default-value' },
    type: {},
    placeholder: {},
    label: {},
    helperText: { attribute: 'helper-text' },
    error: { reflect: true },
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
        color: var(--rl-text);
        display: grid;
        gap: var(--rl-space-2, 6px);
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        align-items: center;
        background: var(--rl-input-bg, transparent);
        border: var(--rl-input-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-input-border, var(--rl-border));
        border-radius: var(--rl-input-radius, var(--rl-radius-surface, 6px));
        display: flex;
        min-height: var(--rl-control-height-md, 40px);
        padding: 0 10px;
        box-shadow: var(--rl-input-shadow, none);
        transition:
          border-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          box-shadow var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease);
      }

      .control:focus-within {
        border-color: var(--rl-color-primary);
        box-shadow: var(--rl-style-focus-shadow, var(--rl-focus-ring));
      }

      :host([error]) .control {
        border-color: var(--rl-color-danger);
      }

      input {
        background: transparent;
        border: 0;
        color: var(--rl-style-on-paper, var(--rl-text));
        flex: 1 1 auto;
        font: inherit;
        min-width: 0;
        outline: none;
        padding: 0;
      }

      input::placeholder {
        color: var(--rl-style-on-paper-muted, var(--rl-text-muted));
      }

      .meta {
        color: var(--rl-text-muted);
        font-size: 0.8125rem;
      }

      .error {
        color: var(--rl-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }

      ::slotted([slot='icon']),
      ::slotted([slot='actions']) {
        color: var(--rl-icon-color);
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
  private metaId = `${nextId('rl-input')}-meta`;

  updated() {
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
    if (this.required && !this.value) return { valueMissing: true };
    return {};
  }

  private get validityMessage() {
    if (this.disabled) return undefined;
    if (this.error) return this.error;
    if (this.required && !this.value) return `${this.label || this.name || 'Field'} is required`;
    return undefined;
  }

  private handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    emit(this, 'rl-input', { value: this.value, sourceEvent: event });
  }

  private handleChange(event: Event) {
    emit(this, 'rl-change', { value: this.value, sourceEvent: event });
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
    'rl-input': RlInput;
  }
}
