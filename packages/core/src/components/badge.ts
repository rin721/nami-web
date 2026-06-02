import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type RlBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export type RlBadgeTone = 'soft' | 'solid';

export class RlBadge extends LitElement {
  static properties = {
    variant: { reflect: true },
    tone: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: inline-flex;
      }

      .base {
        align-items: center;
        background: var(--badge-bg, var(--rl-badge-bg, var(--rl-hover-overlay)));
        border: var(--rl-badge-border-width, var(--rl-style-stroke-width, 1px)) solid var(--badge-border, var(--rl-badge-border, transparent));
        border-radius: var(--rl-badge-radius, var(--rl-radius-control, 999px));
        color: var(--badge-fg, var(--rl-badge-fg, var(--rl-text)));
        display: inline-flex;
        font-size: var(--rl-badge-font-size, 0.75rem);
        font-weight: 800;
        gap: var(--rl-space-1, 4px);
        line-height: 1;
        min-height: var(--rl-badge-height, 24px);
        padding: 0 var(--rl-badge-padding-x, 9px);
        white-space: nowrap;
      }

      :host([variant='primary']) {
        --badge-bg: var(--rl-color-primary-muted);
        --badge-border: color-mix(in oklab, var(--rl-color-primary), transparent 54%);
        --badge-fg: var(--rl-color-primary);
      }

      :host([variant='success']) {
        --badge-bg: color-mix(in oklab, #22c55e, transparent 88%);
        --badge-border: color-mix(in oklab, #22c55e, transparent 52%);
        --badge-fg: #15803d;
      }

      :host([variant='warning']) {
        --badge-bg: color-mix(in oklab, #f59e0b, transparent 86%);
        --badge-border: color-mix(in oklab, #f59e0b, transparent 48%);
        --badge-fg: #92400e;
      }

      :host([variant='danger']) {
        --badge-bg: color-mix(in oklab, var(--rl-color-danger), transparent 88%);
        --badge-border: color-mix(in oklab, var(--rl-color-danger), transparent 54%);
        --badge-fg: var(--rl-color-danger);
      }

      :host([tone='solid']) {
        --badge-bg: var(--rl-text);
        --badge-border: var(--rl-text);
        --badge-fg: var(--rl-text-inverse);
      }

      :host([tone='solid'][variant='primary']) {
        --badge-bg: var(--rl-color-primary);
        --badge-border: var(--rl-color-primary);
        --badge-fg: var(--rl-text-inverse);
      }

      :host([tone='solid'][variant='success']) {
        --badge-bg: #22c55e;
        --badge-border: #22c55e;
        --badge-fg: #fff;
      }

      :host([tone='solid'][variant='warning']) {
        --badge-bg: #f59e0b;
        --badge-border: #f59e0b;
        --badge-fg: #1f1300;
      }

      :host([tone='solid'][variant='danger']) {
        --badge-bg: var(--rl-color-danger);
        --badge-border: var(--rl-color-danger);
        --badge-fg: #fff;
      }
    `
  ];

  declare variant: RlBadgeVariant;
  declare tone: RlBadgeTone;

  constructor() {
    super();
    this.variant = 'neutral';
    this.tone = 'soft';
  }

  render() {
    return html`<span class="base" part="base"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-badge': RlBadge;
  }
}
