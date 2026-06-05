import { css, html, LitElement, nothing } from 'lit';
import { nextId } from '../foundation/ids';
import { syncHostState } from '../foundation/selection';
import { componentHostStyles } from '../internal/styles';

export class NamiFormField extends LitElement {
  static properties = {
    label: {},
    helperText: { attribute: 'helper-text' },
    error: { reflect: true, useDefault: true },
    required: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        color: var(--nami-text);
        display: block;
      }

      .base {
        display: grid;
        gap: var(--nami-form-field-gap, var(--nami-space-2, 6px));
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        min-width: 0;
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
        line-height: 1.45;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `
  ];

  declare label: string;
  declare helperText: string;
  declare error: string;
  declare required: boolean;
  declare disabled: boolean;

  private metaId = `${nextId('nami-field')}-meta`;

  constructor() {
    super();
    this.label = '';
    this.helperText = '';
    this.error = '';
    this.required = false;
    this.disabled = false;
  }

  updated() {
    const invalid = !this.disabled && Boolean(this.error);
    syncHostState(this, {
      state: invalid ? 'invalid' : 'valid',
      disabled: this.disabled,
      invalid
    });
  }

  private focusControl() {
    const slot = this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement | null;
    const control = slot?.assignedElements({ flatten: true }).find((element) => 'focus' in element) as HTMLElement & { focus?: () => void } | undefined;
    control?.focus?.();
  }

  render() {
    const meta = this.error || this.helperText;
    return html`
      <div class="base" part="base">
        ${this.label ? html`<span class="label" part="label" @click=${this.focusControl}>${this.label}${this.required ? ' *' : ''}</span>` : nothing}
        <div class="control" part="control"><slot></slot></div>
        ${meta ? html`<div id=${this.metaId} class="meta ${this.error ? 'error' : ''}" part=${this.error ? 'error' : 'description'}>${meta}</div>` : html`<slot name="description"></slot>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-form-field': NamiFormField;
  }
}
