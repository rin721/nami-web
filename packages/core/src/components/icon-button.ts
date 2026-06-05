import { css, html, LitElement } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { emit } from '../internal/events';
import { defineElement } from '../internal/define';
import { componentHostStyles, softControlStyles } from '../internal/styles';
import { selectedState, syncHostState } from '../foundation/selection';
import { NamiSpinner } from './spinner';

defineElement('nami-spinner', NamiSpinner);

export class NamiIconButton extends LitElement {
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
        height: var(--nami-icon-button-size, var(--nami-control-height, 40px));
        width: var(--nami-icon-button-size, var(--nami-control-height, 40px));
      }

      :host([size='sm']) {
        --nami-icon-button-size: var(--nami-control-height-sm, 32px);
      }

      :host([size='md']) {
        --nami-icon-button-size: var(--nami-control-height-md, 40px);
      }

      :host([size='lg']) {
        --nami-icon-button-size: var(--nami-control-height-lg, 48px);
      }

      nami-spinner {
        color: currentColor;
      }
    `
  ];

  declare label: string;
  declare size?: 'sm' | 'md' | 'lg';
  declare disabled: boolean;
  declare selected: boolean;
  declare loading: boolean;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.label = '';
    this.disabled = false;
    this.selected = false;
    this.loading = false;
  }

  updated() {
    syncHostState(this, {
      state: this.loading ? 'loading' : selectedState(this.selected),
      disabled: this.disabled,
      loading: this.loading
    });
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    emit(this, 'nami-click', { sourceEvent: event, selected: this.selected });
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
          ${this.loading ? html`<nami-spinner size="sm" label=${msg('Loading', { id: 'nami.spinner.loading' })}></nami-spinner>` : html`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-icon-button': NamiIconButton;
  }
}
