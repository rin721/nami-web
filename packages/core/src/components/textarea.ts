import { css, html, LitElement, nothing } from 'lit';
import { attachInternalsSafe, requiredTextValidity, setSafeFormValue, setSafeValidity, type SafeElementInternals } from '../foundation/form-associated';
import { nextId } from '../foundation/ids';
import { syncHostState } from '../foundation/selection';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiTextarea extends LitElement {
  static formAssociated = true;
  static properties = {
    name: {},
    value: {},
    defaultValue: { attribute: 'default-value' },
    placeholder: {},
    label: {},
    helperText: { attribute: 'helper-text' },
    error: { reflect: true, useDefault: true },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    rows: { type: Number, reflect: true }
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
        gap: var(--nami-form-field-gap, var(--nami-space-2, 6px));
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      textarea {
        background: var(--nami-textarea-bg, transparent);
        border: var(--nami-textarea-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-textarea-border, var(--nami-border));
        border-radius: var(--nami-textarea-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-textarea-shadow, none);
        box-sizing: border-box;
        color: var(--nami-style-on-paper, var(--nami-text));
        font: inherit;
        line-height: 1.5;
        min-height: calc(var(--nami-control-height, var(--nami-control-height-md, 40px)) * 2);
        min-width: 0;
        outline: none;
        padding: var(--nami-space-3, 10px) var(--nami-control-padding-x, 12px);
        resize: vertical;
        transition:
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 100%;
      }

      textarea:focus-visible {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([error]) textarea {
        border-color: var(--nami-color-danger);
      }

      textarea::placeholder {
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
    `
  ];

  declare name: string;
  declare value: string;
  declare defaultValue: string;
  declare placeholder: string;
  declare label: string;
  declare helperText: string;
  declare error: string;
  declare disabled: boolean;
  declare required: boolean;
  declare rows: number;

  private internals: SafeElementInternals | null = attachInternalsSafe(this);
  private metaId = `${nextId('nami-textarea')}-meta`;

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.defaultValue = '';
    this.placeholder = '';
    this.label = '';
    this.helperText = '';
    this.error = '';
    this.disabled = false;
    this.required = false;
    this.rows = 4;
  }

  private get textareaElement() {
    return this.renderRoot.querySelector('textarea') as HTMLTextAreaElement | null;
  }

  updated() {
    const invalid = !this.disabled && Boolean(this.error || (this.required && !this.value));
    syncHostState(this, {
      state: invalid ? 'invalid' : 'valid',
      disabled: this.disabled,
      invalid
    });
    setSafeFormValue(this.internals, this.disabled ? null : this.value);
    setSafeValidity(this.internals, this.validityFlags, this.validityMessage, this.textareaElement ?? undefined);
  }

  formResetCallback() {
    this.value = this.defaultValue;
  }

  focus() {
    this.textareaElement?.focus();
  }

  checkValidity() {
    return this.textareaElement?.checkValidity() ?? Object.keys(this.validityFlags).length === 0;
  }

  reportValidity() {
    return this.textareaElement?.reportValidity() ?? this.checkValidity();
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
    this.value = (event.target as HTMLTextAreaElement).value;
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
        <textarea
          part="control"
          .value=${this.value}
          name=${this.name}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-describedby=${meta ? helperId : nothing}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </label>
      ${meta ? html`<div id=${helperId} class="meta ${this.error ? 'error' : ''}" part=${this.error ? 'error' : 'description'}>${meta}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-textarea': NamiTextarea;
  }
}
