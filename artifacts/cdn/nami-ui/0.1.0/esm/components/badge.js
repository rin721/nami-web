import { i as e, c as n, a as o, b as i } from "../chunks/styles-DgWJnXXm.js";
const a = class a extends e {
  constructor() {
    super(), this.variant = "neutral", this.tone = "soft";
  }
  render() {
    return i`<span class="base" part="base"><slot></slot></span>`;
  }
};
a.properties = {
  variant: { reflect: !0 },
  tone: { reflect: !0 }
}, a.styles = [
  n,
  o`
      :host {
        display: inline-flex;
      }

      .base {
        align-items: center;
        background: var(--badge-bg, var(--nami-badge-bg, var(--nami-hover-overlay)));
        border: var(--nami-badge-border-width, var(--nami-style-stroke-width, 1px)) solid var(--badge-border, var(--nami-badge-border, transparent));
        border-radius: var(--nami-badge-radius, var(--nami-radius-control, 999px));
        color: var(--badge-fg, var(--nami-badge-fg, var(--nami-text)));
        display: inline-flex;
        font-size: var(--nami-badge-font-size, 0.75rem);
        font-weight: 800;
        gap: var(--nami-space-1, 4px);
        line-height: 1;
        min-height: var(--nami-badge-height, 24px);
        padding: 0 var(--nami-badge-padding-x, 9px);
        white-space: nowrap;
      }

      :host([variant='primary']) {
        --badge-bg: var(--nami-color-primary-muted);
        --badge-border: color-mix(in oklab, var(--nami-color-primary), transparent 54%);
        --badge-fg: var(--nami-color-primary);
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
        --badge-bg: color-mix(in oklab, var(--nami-color-danger), transparent 88%);
        --badge-border: color-mix(in oklab, var(--nami-color-danger), transparent 54%);
        --badge-fg: var(--nami-color-danger);
      }

      :host([tone='solid']) {
        --badge-bg: var(--nami-text);
        --badge-border: var(--nami-text);
        --badge-fg: var(--nami-text-inverse);
      }

      :host([tone='solid'][variant='primary']) {
        --badge-bg: var(--nami-color-primary);
        --badge-border: var(--nami-color-primary);
        --badge-fg: var(--nami-text-inverse);
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
        --badge-bg: var(--nami-color-danger);
        --badge-border: var(--nami-color-danger);
        --badge-fg: #fff;
      }
    `
];
let r = a;
export {
  r as NamiBadge
};
