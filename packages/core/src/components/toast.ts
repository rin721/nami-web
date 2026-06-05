import { css, html, LitElement, nothing } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { overlayCloseDetail, overlayState } from '../foundation/overlay';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export interface NamiToastOptions {
  message: string;
  variant?: 'neutral' | 'success' | 'danger';
  duration?: number;
  placement?: 'top' | 'bottom';
}

export class NamiToast extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    message: {},
    variant: { reflect: true },
    placement: { reflect: true },
    duration: { type: Number }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
        left: 50%;
        max-width: min(420px, calc(100vw - 32px));
        pointer-events: auto;
        position: fixed;
        transform: translateX(-50%) translateY(var(--toast-offset, -16px));
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: max-content;
        z-index: 70;
      }

      :host([placement='top']) {
        top: 16px;
        --toast-offset: -16px;
      }

      :host([placement='bottom']) {
        bottom: 16px;
        --toast-offset: 16px;
      }

      :host([open]) {
        transform: translateX(-50%) translateY(0);
      }

      .base {
        align-items: center;
        background: var(--nami-toast-bg, var(--nami-surface-raised));
        border: var(--nami-toast-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-toast-border-color, var(--nami-border));
        border-radius: var(--nami-toast-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-dialog-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        display: flex;
        gap: var(--nami-space-3, 10px);
        min-height: 44px;
        padding: 10px 12px;
      }

      :host([variant='success']) .indicator {
        color: var(--nami-color-primary);
      }

      :host([variant='danger']) .indicator {
        color: var(--nami-color-danger);
      }

      button {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-style-on-paper-muted, var(--nami-icon-color));
        cursor: pointer;
        height: 30px;
        width: 30px;
      }

      button:hover {
        background: var(--nami-hover-overlay);
      }
    `
  ];

  declare open: boolean;
  declare message: string;
  declare variant: 'neutral' | 'success' | 'danger';
  declare placement: 'top' | 'bottom';
  declare duration: number;

  private timer = 0;
  private closeSourceEvent: Event | undefined;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.open = false;
    this.message = '';
    this.variant = 'neutral';
    this.placement = 'top';
    this.duration = 3200;
  }

  static show(options: NamiToastOptions) {
    const toast = document.createElement('nami-toast') as NamiToast;
    toast.message = options.message;
    toast.variant = options.variant ?? 'neutral';
    toast.placement = options.placement ?? 'top';
    toast.duration = options.duration ?? 3200;
    document.body.append(toast);
    requestAnimationFrame(() => {
      toast.open = true;
    });
    return toast;
  }

  updated(changed: Map<string, unknown>) {
    this.dataset.state = overlayState(this.open);
    if (!changed.has('open')) return;
    if (this.open) {
      emit(this, 'nami-open', undefined);
      window.clearTimeout(this.timer);
      if (this.duration > 0) {
        this.timer = window.setTimeout(() => this.close(), this.duration);
      }
    } else if (changed.get('open') === true) {
      window.clearTimeout(this.timer);
      emit(this, 'nami-close', overlayCloseDetail(this.closeSourceEvent));
      this.closeSourceEvent = undefined;
    }
  }

  disconnectedCallback() {
    window.clearTimeout(this.timer);
    super.disconnectedCallback();
  }

  close(sourceEvent?: Event) {
    if (!this.open) return;
    this.closeSourceEvent = sourceEvent;
    this.open = false;
    window.setTimeout(() => this.remove(), 180);
  }

  render() {
    return html`
      <div class="base" part="base" role="status" aria-live="polite">
        <span class="indicator" part="indicator"><slot name="icon">${this.variant === 'neutral' ? nothing : html`<span aria-hidden="true">*</span>`}</slot></span>
        <span part="label"><slot>${this.message}</slot></span>
        <button type="button" part="actions" aria-label=${msg('Close', { id: 'nami.toast.close' })} @click=${(event: MouseEvent) => this.close(event)}>X</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-toast': NamiToast;
  }
}
