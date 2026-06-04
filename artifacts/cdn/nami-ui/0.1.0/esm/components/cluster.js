import { i as e, a, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { c as r } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends e {
  constructor() {
    super(), this.gap = "sm", this.align = "", this.justify = "";
  }
  updated() {
    this.align ? this.style.setProperty("--nami-cluster-align", this.align) : this.style.removeProperty("--nami-cluster-align"), this.justify ? this.style.setProperty("--nami-cluster-justify", this.justify) : this.style.removeProperty("--nami-cluster-justify");
  }
  render() {
    return i`<div class="base" part="base"><slot></slot></div>`;
  }
};
t.properties = {
  gap: { reflect: !0 },
  align: { reflect: !0 },
  justify: { reflect: !0 }
}, t.styles = [
  r,
  a`
      :host {
        display: block;
      }

      .base {
        align-items: var(--nami-cluster-align, center);
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-cluster-gap, var(--nami-space-2, 6px));
        justify-content: var(--nami-cluster-justify, flex-start);
        min-width: 0;
      }

      :host([gap='none']) {
        --nami-cluster-gap: 0;
      }

      :host([gap='sm']) {
        --nami-cluster-gap: var(--nami-space-2, 6px);
      }

      :host([gap='md']) {
        --nami-cluster-gap: var(--nami-space-3, 10px);
      }

      :host([gap='lg']) {
        --nami-cluster-gap: var(--nami-space-4, 16px);
      }
    `
];
let s = t;
export {
  s as NamiCluster
};
