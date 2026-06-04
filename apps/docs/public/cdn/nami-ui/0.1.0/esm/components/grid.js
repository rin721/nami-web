import { i, a as e, b as r } from "../chunks/lit-element-GeMXvhiH.js";
import { c as a } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends i {
  constructor() {
    super(), this.columns = 0, this.min = "", this.gap = "md";
  }
  updated() {
    this.columns > 0 ? this.style.setProperty("--nami-grid-columns", String(this.columns)) : this.style.removeProperty("--nami-grid-columns"), this.min ? this.style.setProperty("--nami-grid-min", this.min) : this.style.removeProperty("--nami-grid-min");
  }
  render() {
    return r`<div class="base" part="base"><slot></slot></div>`;
  }
};
t.properties = {
  columns: { type: Number, reflect: !0 },
  min: { reflect: !0 },
  gap: { reflect: !0 }
}, t.styles = [
  a,
  e`
      :host {
        display: block;
      }

      .base {
        display: grid;
        gap: var(--nami-grid-gap, var(--nami-layout-gutter, 16px));
        grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--nami-grid-min, 16rem)), 1fr));
        min-width: 0;
      }

      :host([columns]) .base {
        grid-template-columns: repeat(var(--nami-grid-columns), minmax(0, 1fr));
      }

      :host([gap='none']) {
        --nami-grid-gap: 0;
      }

      :host([gap='sm']) {
        --nami-grid-gap: var(--nami-space-2, 6px);
      }

      :host,
      :host([gap='md']) {
        --nami-grid-gap: var(--nami-layout-gutter, 16px);
      }

      :host([gap='lg']) {
        --nami-grid-gap: var(--nami-space-5, 24px);
      }
    `
];
let s = t;
export {
  s as NamiGrid
};
