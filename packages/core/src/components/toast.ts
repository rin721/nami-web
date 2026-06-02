import { css, html, LitElement, nothing } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export interface RlToastOptions {
  message: string;
  variant?: 'neutral' | 'success' | 'danger';
  duration?: number;
  placement?: 'top' | 'bottom';
}

export class RlToast extends LitElement {
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
          opacity var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          transform var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease);
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
        background: var(--rl-toast-bg, var(--rl-surface-raised));
        border: var(--rl-toast-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-toast-border-color, var(--rl-border));
        border-radius: var(--rl-toast-radius, var(--rl-radius-surface, 6px));
        box-shadow: var(--rl-dialog-shadow);
        color: var(--rl-style-on-paper, var(--rl-text));
        display: flex;
        gap: var(--rl-space-3, 10px);
        min-height: 44px;
        padding: 10px 12px;
      }

      :host([variant='success']) .indicator {
        color: var(--rl-color-primary);
      }

      :host([variant='danger']) .indicator {
        color: var(--rl-color-danger);
      }

      button {
        background: transparent;
        border: 0;
        border-radius: var(--rl-radius-control, 999px);
        color: var(--rl-style-on-paper-muted, var(--rl-icon-color));
        cursor: pointer;
        height: 30px;
        width: 30px;
      }

      button:hover {
        background: var(--rl-hover-overlay);
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

  static show(options: RlToastOptions) {
    const toast = document.createElement('rl-toast') as RlToast;
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
    if (!changed.has('open')) return;
    if (this.open) {
      emit(this, 'rl-open', undefined);
      window.clearTimeout(this.timer);
      if (this.duration > 0) {
        this.timer = window.setTimeout(() => this.close(), this.duration);
      }
    } else if (changed.get('open') === true) {
      window.clearTimeout(this.timer);
      emit(this, 'rl-close', this.closeSourceEvent ? { sourceEvent: this.closeSourceEvent } : undefined);
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
        <button type="button" part="actions" aria-label=${msg('Close', { id: 'rl.toast.close' })} @click=${(event: MouseEvent) => this.close(event)}>X</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-toast': RlToast;
  }
}
