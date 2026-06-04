import { i as a, a as i, b as e } from "../chunks/lit-element-GeMXvhiH.js";
import { c as r } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends a {
  constructor() {
    super(), this.gap = "md", this.direction = "vertical", this.align = "", this.justify = "";
  }
  updated() {
    this.align ? this.style.setProperty("--nami-stack-align", this.align) : this.style.removeProperty("--nami-stack-align"), this.justify ? this.style.setProperty("--nami-stack-justify", this.justify) : this.style.removeProperty("--nami-stack-justify");
  }
  render() {
    return e`<div class="base" part="base"><slot></slot></div>`;
  }
};
t.properties = {
  gap: { reflect: !0 },
  direction: { reflect: !0 },
  align: { reflect: !0 },
  justify: { reflect: !0 }
}, t.styles = [
  r,
  i`
      :host {
        display: block;
      }

      .base {
        align-items: var(--nami-stack-align, stretch);
        display: flex;
        flex-direction: column;
        gap: var(--nami-stack-gap, var(--nami-space-3, 10px));
        justify-content: var(--nami-stack-justify, flex-start);
        min-width: 0;
      }

      :host([direction='horizontal']) .base {
        flex-direction: row;
        flex-wrap: wrap;
      }

      :host([gap='none']) {
        --nami-stack-gap: 0;
      }

      :host([gap='xs']) {
        --nami-stack-gap: var(--nami-space-1, 4px);
      }

      :host([gap='sm']) {
        --nami-stack-gap: var(--nami-space-2, 6px);
      }

      :host,
      :host([gap='md']) {
        --nami-stack-gap: var(--nami-space-3, 10px);
      }

      :host([gap='lg']) {
        --nami-stack-gap: var(--nami-space-4, 16px);
      }
    `
];
let s = t;
export {
  s as NamiStack
};
