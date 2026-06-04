import { i as s, c as a, a as e, b as r } from "../chunks/styles-DgWJnXXm.js";
const t = class t extends s {
  constructor() {
    super(), this.min = "", this.gap = "md", this.ratio = "even";
  }
  updated() {
    this.style.containerType = "inline-size", this.min ? this.style.setProperty("--nami-split-min", this.min) : this.style.removeProperty("--nami-split-min");
  }
  render() {
    return r`<div class="base" part="base"><slot></slot></div>`;
  }
};
t.properties = {
  min: { reflect: !0 },
  gap: { reflect: !0 },
  ratio: { reflect: !0 }
}, t.styles = [
  a,
  e`
      :host {
        display: block;
      }

      .base {
        align-items: stretch;
        display: grid;
        gap: var(--nami-split-gap, var(--nami-layout-gutter, 16px));
        grid-template-columns: minmax(min(100%, var(--nami-split-min, 18rem)), var(--nami-split-first, 1fr)) minmax(0, var(--nami-split-second, 1fr));
        min-width: 0;
      }

      :host([ratio='sidebar-main']) {
        --nami-split-first: 0.38fr;
        --nami-split-second: 1fr;
      }

      :host([ratio='main-sidebar']) {
        --nami-split-first: 1fr;
        --nami-split-second: 0.38fr;
      }

      :host([gap='none']) {
        --nami-split-gap: 0;
      }

      :host([gap='sm']) {
        --nami-split-gap: var(--nami-space-2, 6px);
      }

      :host,
      :host([gap='md']) {
        --nami-split-gap: var(--nami-layout-gutter, 16px);
      }

      :host([gap='lg']) {
        --nami-split-gap: var(--nami-space-5, 24px);
      }

      @container (width < 42rem) {
        .base {
          grid-template-columns: 1fr;
        }
      }

      @supports not (container-type: inline-size) {
        @media (width <= 720px) {
          .base {
            grid-template-columns: 1fr;
          }
        }
      }
    `
];
let i = t;
export {
  i as NamiSplit
};
