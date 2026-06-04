import { i as a, c as o, s as n, a as l, b as i } from "../chunks/styles-DgWJnXXm.js";
import { m as r } from "../chunks/runtime-4rCsJ4EI.js";
import { u as c } from "../chunks/localized-controller-BapUPJ8o.js";
import { e as m } from "../chunks/events-DtyLzvDt.js";
import { d as h } from "../chunks/define-BpqXLfIT.js";
import { NamiSpinner as d } from "./spinner.js";
h("nami-spinner", d);
const e = class e extends a {
  constructor() {
    super(), c(this), this.label = "", this.disabled = !1, this.selected = !1, this.loading = !1;
  }
  handleClick(t) {
    if (this.disabled || this.loading) {
      t.preventDefault(), t.stopImmediatePropagation();
      return;
    }
    m(this, "nami-click", { sourceEvent: t, selected: this.selected });
  }
  render() {
    return i`
      <button
        part="base control"
        class="soft-control"
        type="button"
        aria-label=${this.label}
        aria-pressed=${this.selected ? "true" : "false"}
        aria-busy=${this.loading ? "true" : "false"}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        <span class="icon-motion" part="icon">
          ${this.loading ? i`<nami-spinner size="sm" label=${r("Loading", { id: "nami.spinner.loading" })}></nami-spinner>` : i`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `;
  }
};
e.properties = {
  label: {},
  size: { reflect: !0 },
  disabled: { type: Boolean, reflect: !0 },
  selected: { type: Boolean, reflect: !0 },
  loading: { type: Boolean, reflect: !0 }
}, e.styles = [
  o,
  n,
  l`
      :host {
        display: inline-flex;
      }

      button {
        height: var(--nami-icon-button-size, var(--nami-control-height, 40px));
        width: var(--nami-icon-button-size, var(--nami-control-height, 40px));
      }

      :host([size='sm']) {
        --nami-icon-button-size: var(--nami-control-height-sm, 32px);
      }

      :host([size='md']) {
        --nami-icon-button-size: var(--nami-control-height-md, 40px);
      }

      :host([size='lg']) {
        --nami-icon-button-size: var(--nami-control-height-lg, 48px);
      }

      nami-spinner {
        color: currentColor;
      }
    `
];
let s = e;
export {
  s as NamiIconButton
};
