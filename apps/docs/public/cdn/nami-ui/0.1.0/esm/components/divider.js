import { i as o, a as l, A as r, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { s as h } from "../chunks/selection-CrKkvo5N.js";
import { c } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends o {
  constructor() {
    super(), this.orientation = "horizontal", this.hasLabel = !1;
  }
  updated() {
    h(this, { state: this.orientation }), this.toggleAttribute("data-has-label", this.hasLabel);
  }
  handleSlotChange(e) {
    const n = e.target;
    this.hasLabel = n.assignedNodes({ flatten: !0 }).some((a) => a.nodeType === Node.ELEMENT_NODE || !!a.textContent?.trim());
  }
  render() {
    const e = this.orientation === "vertical" ? "vertical" : "horizontal";
    return i`
      <div class="base" part="base" role="separator" aria-orientation=${e}>
        <span class="line" part="line"></span>
        <span class="label" part="label"><slot @slotchange=${this.handleSlotChange}></slot></span>
        ${this.hasLabel ? i`<span class="line" part="line"></span>` : r}
      </div>
    `;
  }
};
t.properties = {
  orientation: { reflect: !0 },
  hasLabel: { state: !0 }
}, t.styles = [
  c,
  l`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-divider-label-color, var(--nami-text-muted));
        display: flex;
        gap: var(--nami-divider-gap, var(--nami-space-3, 10px));
        inline-size: 100%;
      }

      .line {
        background: var(--nami-divider-color, var(--nami-border));
        block-size: var(--nami-divider-thickness, var(--nami-style-stroke-width, 1px));
        flex: 1 1 auto;
      }

      .label {
        color: inherit;
        flex: 0 0 auto;
        font-size: 0.8125rem;
        line-height: 1.4;
      }

      :host(:not([data-has-label])) .label,
      :host(:not([data-has-label])) .line + .line {
        display: none;
      }

      :host([orientation='vertical']) {
        display: inline-block;
        min-block-size: 1em;
      }

      :host([orientation='vertical']) .base {
        block-size: 100%;
        flex-direction: column;
        inline-size: auto;
        min-block-size: inherit;
      }

      :host([orientation='vertical']) .line {
        block-size: auto;
        inline-size: var(--nami-divider-thickness, var(--nami-style-stroke-width, 1px));
        min-block-size: var(--nami-divider-min-size, 2rem);
      }
    `
];
let s = t;
export {
  s as NamiDivider
};
