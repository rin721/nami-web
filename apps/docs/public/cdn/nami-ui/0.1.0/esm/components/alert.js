import { i as o, a as e, A as s, b as a } from "../chunks/lit-element-GeMXvhiH.js";
import { e as n } from "../chunks/events-DtyLzvDt.js";
import { c as l } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends o {
  constructor() {
    super(), this.variant = "neutral", this.title = "", this.closable = !1;
  }
  updated() {
    this.dataset.state = this.variant;
  }
  close(r) {
    n(this, "nami-close", { sourceEvent: r }, { cancelable: !0 }) && this.remove();
  }
  render() {
    const r = this.variant === "danger" || this.variant === "warning" ? "alert" : "status";
    return a`
      <section class="base" part="base" role=${r}>
        <span class="indicator" part="indicator"><slot name="icon">${this.variant === "neutral" ? "i" : "!"}</slot></span>
        <div>
          ${this.title ? a`<h3 part="label"><slot name="title">${this.title}</slot></h3>` : a`<slot name="title"></slot>`}
          <div class="body" part="description"><slot></slot></div>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
          ${this.closable ? a`<button type="button" aria-label="Close" @click=${this.close}>${"×"}</button>` : s}
        </div>
      </section>
    `;
  }
};
t.properties = {
  variant: { reflect: !0 },
  title: {},
  closable: { type: Boolean, reflect: !0 }
}, t.styles = [
  l,
  e`
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
let i = t;
export {
  i as NamiAlert
};
