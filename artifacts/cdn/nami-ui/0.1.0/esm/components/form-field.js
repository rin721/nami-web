import { i, a, A as l, b as e } from "../chunks/lit-element-GeMXvhiH.js";
import { n } from "../chunks/ids-BBzulDVF.js";
import { s as d } from "../chunks/selection-CrKkvo5N.js";
import { c } from "../chunks/styles-C6m3uqJJ.js";
const r = class r extends i {
  constructor() {
    super(), this.metaId = `${n("nami-field")}-meta`, this.label = "", this.helperText = "", this.error = "", this.required = !1, this.disabled = !1;
  }
  updated() {
    const t = !this.disabled && !!this.error;
    d(this, {
      state: t ? "invalid" : "valid",
      disabled: this.disabled,
      invalid: t
    });
  }
  focusControl() {
    this.renderRoot.querySelector("slot:not([name])")?.assignedElements({ flatten: !0 }).find((o) => "focus" in o)?.focus?.();
  }
  render() {
    const t = this.error || this.helperText;
    return e`
      <div class="base" part="base">
        ${this.label ? e`<span class="label" part="label" @click=${this.focusControl}>${this.label}${this.required ? " *" : ""}</span>` : l}
        <div class="control" part="control"><slot></slot></div>
        ${t ? e`<div id=${this.metaId} class="meta ${this.error ? "error" : ""}" part=${this.error ? "error" : "description"}>${t}</div>` : e`<slot name="description"></slot>`}
      </div>
    `;
  }
};
r.properties = {
  label: {},
  helperText: { attribute: "helper-text" },
  error: { reflect: !0, useDefault: !0 },
  required: { type: Boolean, reflect: !0 },
  disabled: { type: Boolean, reflect: !0 }
}, r.styles = [
  c,
  a`
      :host {
        color: var(--nami-text);
        display: block;
      }

      .base {
        display: grid;
        gap: var(--nami-form-field-gap, var(--nami-space-2, 6px));
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        min-width: 0;
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
        line-height: 1.45;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `
];
let s = r;
export {
  s as NamiFormField
};
