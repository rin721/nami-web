import { css, html, LitElement, nothing } from 'lit';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export type NamiAlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export class NamiAlert extends LitElement {
  static properties = {
    variant: { reflect: true },
    title: {},
    closable: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        background: var(--nami-alert-bg, var(--nami-surface-raised));
        border: var(--nami-alert-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-alert-border, var(--nami-border));
        border-radius: var(--nami-alert-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-alert-shadow, none);
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        gap: var(--nami-space-2, 6px) var(--nami-space-3, 10px);
        grid-template-columns: auto minmax(0, 1fr) auto;
        padding: var(--nami-space-4, 16px);
      }

      .indicator {
        color: var(--nami-color-primary);
        font-weight: 900;
      }

      :host([variant='danger']) .indicator {
        color: var(--nami-color-danger);
      }

      :host([variant='warning']) .indicator {
        color: #b7791f;
      }

      h3 {
        font-size: 0.95rem;
        line-height: 1.35;
        margin: 0;
      }

      .body {
        color: var(--nami-text-muted);
        line-height: 1.55;
      }

      button {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-icon-color);
        cursor: pointer;
        height: 30px;
        width: 30px;
      }

      button:hover {
        background: var(--nami-hover-overlay);
      }

      .actions {
        align-items: start;
        display: inline-flex;
        gap: var(--nami-space-2, 6px);
      }
    `
  ];

  declare variant: NamiAlertVariant;
  declare title: string;
  declare closable: boolean;

  constructor() {
    super();
    this.variant = 'neutral';
    this.title = '';
    this.closable = false;
  }

  updated() {
    this.dataset.state = this.variant;
  }

  private close(event: MouseEvent) {
    const shouldContinue = emit(this, 'nami-close', { sourceEvent: event }, { cancelable: true });
    if (shouldContinue) this.remove();
  }

  render() {
    const role = this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
    return html`
      <section class="base" part="base" role=${role}>
        <span class="indicator" part="indicator"><slot name="icon">${this.variant === 'neutral' ? 'i' : '!'}</slot></span>
        <div>
          ${this.title ? html`<h3 part="label"><slot name="title">${this.title}</slot></h3>` : html`<slot name="title"></slot>`}
          <div class="body" part="description"><slot></slot></div>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
          ${this.closable ? html`<button type="button" aria-label="Close" @click=${this.close}>${'\u00d7'}</button>` : nothing}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-alert': NamiAlert;
  }
}
