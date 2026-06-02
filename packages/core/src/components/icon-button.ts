import { css, html, LitElement } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { emit } from '../internal/events';
import { defineElement } from '../internal/define';
import { componentHostStyles, softControlStyles } from '../internal/styles';
import { RlSpinner } from './spinner';

defineElement('rl-spinner', RlSpinner);

export class RlIconButton extends LitElement {
  static properties = {
    label: {},
    size: { reflect: true },
    disabled: { type: Boolean, reflect: true },
    selected: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    softControlStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        height: var(--rl-icon-button-size, 40px);
        width: var(--rl-icon-button-size, 40px);
      }

      :host([size='sm']) {
        --rl-icon-button-size: 32px;
      }

      :host([size='lg']) {
        --rl-icon-button-size: 48px;
      }

      rl-spinner {
        color: currentColor;
      }
    `
  ];

  declare label: string;
  declare size: 'sm' | 'md' | 'lg';
  declare disabled: boolean;
  declare selected: boolean;
  declare loading: boolean;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.label = '';
    this.size = 'md';
    this.disabled = false;
    this.selected = false;
    this.loading = false;
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    emit(this, 'rl-click', { sourceEvent: event, selected: this.selected });
  }

  render() {
    return html`
      <button
        part="base control"
        class="soft-control"
        type="button"
        aria-label=${this.label}
        aria-pressed=${this.selected ? 'true' : 'false'}
        aria-busy=${this.loading ? 'true' : 'false'}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        <span class="icon-motion" part="icon">
          ${this.loading ? html`<rl-spinner size="sm" label=${msg('Loading', { id: 'rl.spinner.loading' })}></rl-spinner>` : html`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-icon-button': RlIconButton;
  }
}
