import { i, a as s, b as o } from "../chunks/lit-element-GeMXvhiH.js";
import { a as n, s as d, b as c, r as t } from "../chunks/form-associated-BOUCekea.js";
import { s as l, c as h } from "../chunks/selection-CrKkvo5N.js";
import { e as u } from "../chunks/events-DtyLzvDt.js";
import { c as m } from "../chunks/styles-C6m3uqJJ.js";
const e = class e extends i {
  constructor() {
    super(), this.internals = n(this), this.name = "", this.value = "on", this.checked = !1, this.defaultChecked = !1, this.disabled = !1, this.required = !1, this.error = "";
  }
  updated() {
    const a = !this.disabled && !!(this.error || this.required && !this.checked);
    l(this, {
      state: h(this.checked),
      disabled: this.disabled,
      invalid: a
    }), d(this.internals, !this.disabled && this.checked ? this.value : null), c(this.internals, this.validityFlags, this.validationMessage || void 0);
  }
  formResetCallback() {
    this.checked = this.defaultChecked;
  }
  checkValidity() {
    return Object.keys(this.validityFlags).length === 0;
  }
  reportValidity() {
    return this.checkValidity();
  }
  get validationMessage() {
    return this.disabled ? "" : this.error ? this.error : this.required ? t(this.checked).message ?? "" : "";
  }
  get validityFlags() {
    return this.disabled ? {} : this.error ? { customError: !0 } : this.required ? t(this.checked).flags : {};
  }
  toggle(a) {
    this.disabled || (this.checked = !this.checked, u(this, "nami-change", { checked: this.checked, value: this.value, sourceEvent: a }));
  }
  render() {
    return o`
      <button
        part="base control"
        type="button"
        role="checkbox"
        aria-checked=${this.checked ? "true" : "false"}
        aria-invalid=${this.error ? "true" : "false"}
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="box" part="indicator"><span class="mark" aria-hidden="true">${"✓"}</span></span>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
};
e.formAssociated = !0, e.properties = {
  name: {},
  value: {},
  checked: { type: Boolean, reflect: !0 },
  defaultChecked: { attribute: "default-checked", type: Boolean },
  disabled: { type: Boolean, reflect: !0 },
  required: { type: Boolean, reflect: !0 },
  error: { reflect: !0, useDefault: !0 }
}, e.styles = [
  m,
  s`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: transparent;
        border: 0;
        color: var(--nami-text);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-3, 10px);
        padding: 0;
      }

      .box {
        align-items: center;
        background: var(--nami-checkbox-bg, transparent);
        border: var(--nami-checkbox-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-checkbox-border, var(--nami-border));
        border-radius: var(--nami-checkbox-radius, var(--nami-radius-tight, 4px));
        box-sizing: border-box;
        color: var(--nami-checkbox-indicator-color, #fff);
        display: inline-flex;
        height: 20px;
        justify-content: center;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 20px;
      }

      :host([checked]) .box {
        background: var(--nami-color-primary);
        border-color: var(--nami-color-primary);
      }

      :host([error]) .box {
        border-color: var(--nami-color-danger);
      }

      button:focus-visible .box {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .mark {
        display: inline-block;
        font-size: 0.9rem;
        line-height: 1;
        opacity: 0;
        transform: scale(0.82);
        transition:
          opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      :host([checked]) .mark {
        opacity: 1;
        transform: scale(1);
      }
    `
];
let r = e;
export {
  r as NamiCheckbox
};
