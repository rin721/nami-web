import { i as a, a as o, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { m as n } from "../chunks/runtime-4rCsJ4EI.js";
import { u as l } from "../chunks/localized-controller-BapUPJ8o.js";
import { e as r } from "../chunks/events-DtyLzvDt.js";
import { d } from "../chunks/define-BpqXLfIT.js";
import { c as h, s as m } from "../chunks/styles-C6m3uqJJ.js";
import { s as c, a as p } from "../chunks/selection-CrKkvo5N.js";
import { NamiSpinner as b } from "./spinner.js";
d("nami-spinner", b);
const t = class t extends a {
  constructor() {
    super(), l(this), this.label = "", this.disabled = !1, this.selected = !1, this.loading = !1;
  }
  updated() {
    c(this, {
      state: this.loading ? "loading" : p(this.selected),
      disabled: this.disabled,
      loading: this.loading
    });
  }
  handleClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault(), e.stopImmediatePropagation();
      return;
    }
    r(this, "nami-click", { sourceEvent: e, selected: this.selected });
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
          ${this.loading ? i`<nami-spinner size="sm" label=${n("Loading", { id: "nami.spinner.loading" })}></nami-spinner>` : i`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `;
  }
};
t.properties = {
  label: {},
  size: { reflect: !0 },
  disabled: { type: Boolean, reflect: !0 },
  selected: { type: Boolean, reflect: !0 },
  loading: { type: Boolean, reflect: !0 }
}, t.styles = [
  h,
  m,
  o`
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
let s = t;
export {
  s as NamiIconButton
};
