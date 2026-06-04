import { i as o, a as n, A as l, b as e } from "../chunks/lit-element-GeMXvhiH.js";
import { m as a } from "../chunks/runtime-4rCsJ4EI.js";
import { u as p } from "../chunks/localized-controller-BapUPJ8o.js";
import { d as m } from "../chunks/define-BpqXLfIT.js";
import { c } from "../chunks/styles-C6m3uqJJ.js";
import { NamiIllustration as d } from "./illustration.js";
m("nami-illustration", d);
const t = class t extends o {
  constructor() {
    super(), p(this), this.illustration = "empty", this.title = "", this.description = "", this.compact = !1;
  }
  render() {
    const i = this.description || a("No data", { id: "nami.empty.description" }), r = this.title || i || a("Empty state", { id: "nami.empty.aria" });
    return e`
      <section class="base" part="base" aria-label=${r}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustration} size=${this.compact ? "sm" : "md"}></nami-illustration>
        </slot>
        ${this.title ? e`<div class="title" part="title"><slot name="title">${this.title}</slot></div>` : l}
        <div class="description" part="description"><slot name="description">${i}</slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `;
  }
};
t.properties = {
  illustration: { reflect: !0 },
  title: { reflect: !0 },
  description: { reflect: !0 },
  compact: { type: Boolean, reflect: !0 }
}, t.styles = [
  c,
  n`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        background: var(--nami-empty-bg, transparent);
        border: var(--nami-empty-border-width, 0) solid var(--nami-empty-border-color, transparent);
        border-radius: var(--nami-empty-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-empty-shadow, none);
        gap: var(--nami-empty-gap, 12px);
        justify-items: center;
        padding: var(--nami-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--nami-space-3, 10px);
      }

      .title {
        color: var(--nami-empty-title-color, var(--nami-text));
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .description {
        color: var(--nami-empty-description-color, var(--nami-text-muted));
        font-size: 0.925rem;
        line-height: 1.6;
        max-width: 42ch;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
      }
    `
];
let s = t;
export {
  s as NamiEmpty
};
