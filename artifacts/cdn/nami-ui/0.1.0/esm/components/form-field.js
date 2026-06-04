import { i as a, c as i, a as l, A as n, b as t } from "../chunks/styles-DgWJnXXm.js";
import { n as d } from "../chunks/ids-BBzulDVF.js";
const e = class e extends a {
  constructor() {
    super(), this.metaId = `${d("nami-field")}-meta`, this.label = "", this.helperText = "", this.error = "", this.required = !1, this.disabled = !1;
  }
  updated() {
    this.dataset.state = this.error ? "invalid" : "valid", this.toggleAttribute("data-disabled", this.disabled), this.toggleAttribute("data-invalid", !!this.error);
  }
  focusControl() {
    this.renderRoot.querySelector("slot:not([name])")?.assignedElements({ flatten: !0 }).find((o) => "focus" in o)?.focus?.();
  }
  render() {
    const r = this.error || this.helperText;
    return t`
      <div class="base" part="base">
        ${this.label ? t`<span class="label" part="label" @click=${this.focusControl}>${this.label}${this.required ? " *" : ""}</span>` : n}
        <div class="control" part="control"><slot></slot></div>
        ${r ? t`<div id=${this.metaId} class="meta ${this.error ? "error" : ""}" part=${this.error ? "error" : "description"}>${r}</div>` : t`<slot name="description"></slot>`}
      </div>
    `;
  }
};
e.properties = {
  label: {},
  helperText: { attribute: "helper-text" },
  error: { reflect: !0, useDefault: !0 },
  required: { type: Boolean, reflect: !0 },
  disabled: { type: Boolean, reflect: !0 }
}, e.styles = [
  i,
  l`
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
let s = e;
export {
  s as NamiFormField
};
