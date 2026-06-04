import { i, a as c, b as d } from "../chunks/lit-element-GeMXvhiH.js";
import { c as l } from "../chunks/styles-C6m3uqJJ.js";
const a = class a extends i {
  constructor() {
    super(), this.variant = "surface";
  }
  syncSlotState(n) {
    const r = n.currentTarget, t = r.name || "default", e = r.assignedNodes({ flatten: !0 }).some((s) => s.nodeType !== Node.TEXT_NODE || s.textContent?.trim());
    t === "header" && this.toggleAttribute("has-header", e), t === "actions" && this.toggleAttribute("has-actions", e), t === "footer" && this.toggleAttribute("has-footer", e);
  }
  render() {
    return d`
      <article class="base" part="base">
        <header part="header"><slot name="header" @slotchange=${this.syncSlotState}></slot></header>
        <section class="body" part="body"><slot></slot></section>
        <div class="actions" part="actions"><slot name="actions" @slotchange=${this.syncSlotState}></slot></div>
        <footer part="footer"><slot name="footer" @slotchange=${this.syncSlotState}></slot></footer>
      </article>
    `;
  }
};
a.properties = {
  variant: { reflect: !0 }
}, a.styles = [
  l,
  c`
      :host {
        display: block;
      }

      .base {
        background: var(--nami-card-bg, var(--nami-surface-raised));
        border: var(--nami-card-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-card-border, var(--nami-border));
        border-radius: var(--nami-card-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-card-shadow, none);
        color: var(--nami-card-fg, var(--nami-text));
        display: grid;
        gap: var(--nami-card-gap, var(--nami-space-3, 10px));
        padding: var(--nami-card-padding, var(--nami-space-4, 16px));
      }

      :host([variant='inset']) .base {
        background: var(--nami-card-inset-bg, var(--nami-surface-inset));
      }

      :host([variant='outline']) .base {
        background: transparent;
      }

      :host(:not([has-header])) header,
      :host(:not([has-actions])) .actions,
      :host(:not([has-footer])) footer {
        display: none;
      }

      header,
      footer,
      .actions {
        min-width: 0;
      }

      .body {
        min-width: 0;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
      }
    `
];
let o = a;
export {
  o as NamiCard
};
