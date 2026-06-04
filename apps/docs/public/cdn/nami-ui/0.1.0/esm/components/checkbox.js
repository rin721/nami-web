import { i as r, c as i, a as s, b as o } from "../chunks/styles-DgWJnXXm.js";
import { a as n, s as d, b as l } from "../chunks/form-associated-CbqAj2Is.js";
import { e as c } from "../chunks/events-DtyLzvDt.js";
const e = class e extends r {
  constructor() {
    super(), this.internals = n(this), this.name = "", this.value = "on", this.checked = !1, this.defaultChecked = !1, this.disabled = !1, this.required = !1, this.error = "";
  }
  updated() {
    this.dataset.state = this.checked ? "checked" : "unchecked", this.toggleAttribute("data-disabled", this.disabled), this.toggleAttribute("data-invalid", !!(this.error || this.required && !this.checked)), d(this.internals, !this.disabled && this.checked ? this.value : null), l(this.internals, this.validityFlags, this.validationMessage || void 0);
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
    return this.disabled ? "" : this.error ? this.error : this.required && !this.checked ? "This field is required" : "";
  }
  get validityFlags() {
    return this.disabled ? {} : this.error ? { customError: !0 } : this.required && !this.checked ? { valueMissing: !0 } : {};
  }
  toggle(a) {
    this.disabled || (this.checked = !this.checked, c(this, "nami-change", { checked: this.checked, value: this.value, sourceEvent: a }));
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
  i,
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
let t = e;
export {
  t as NamiCheckbox
};
