import { i as o, c as n, a as d, A as r, b as i } from "../chunks/styles-DgWJnXXm.js";
import { a as h, s as u, b as m } from "../chunks/form-associated-CbqAj2Is.js";
import { n as c } from "../chunks/ids-BBzulDVF.js";
import { e as s } from "../chunks/events-DtyLzvDt.js";
const t = class t extends o {
  constructor() {
    super(), this.internals = h(this), this.metaId = `${c("nami-textarea")}-meta`, this.name = "", this.value = "", this.defaultValue = "", this.placeholder = "", this.label = "", this.helperText = "", this.error = "", this.disabled = !1, this.required = !1, this.rows = 4;
  }
  get textareaElement() {
    return this.renderRoot.querySelector("textarea");
  }
  updated() {
    this.dataset.state = this.error ? "invalid" : "valid", this.toggleAttribute("data-disabled", this.disabled), this.toggleAttribute("data-invalid", !!this.error), u(this.internals, this.disabled ? null : this.value), m(this.internals, this.validityFlags, this.validityMessage, this.textareaElement ?? void 0);
  }
  formResetCallback() {
    this.value = this.defaultValue;
  }
  focus() {
    this.textareaElement?.focus();
  }
  checkValidity() {
    return this.textareaElement?.checkValidity() ?? Object.keys(this.validityFlags).length === 0;
  }
  reportValidity() {
    return this.textareaElement?.reportValidity() ?? this.checkValidity();
  }
  get validityFlags() {
    return this.disabled ? {} : this.error ? { customError: !0 } : this.required && !this.value ? { valueMissing: !0 } : {};
  }
  get validityMessage() {
    if (!this.disabled) {
      if (this.error) return this.error;
      if (this.required && !this.value) return `${this.label || this.name || "Field"} is required`;
    }
  }
  handleInput(e) {
    this.value = e.target.value, s(this, "nami-input", { value: this.value, sourceEvent: e });
  }
  handleChange(e) {
    s(this, "nami-change", { value: this.value, sourceEvent: e });
  }
  render() {
    const e = this.id ? `${this.id}-meta` : this.metaId, a = this.error || this.helperText;
    return i`
      <label part="base">
        ${this.label ? i`<span class="label" part="label">${this.label}${this.required ? " *" : ""}</span>` : r}
        <textarea
          part="control"
          .value=${this.value}
          name=${this.name}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error ? "true" : "false"}
          aria-describedby=${a ? e : r}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </label>
      ${a ? i`<div id=${e} class="meta ${this.error ? "error" : ""}" part=${this.error ? "error" : "description"}>${a}</div>` : r}
    `;
  }
};
t.formAssociated = !0, t.properties = {
  name: {},
  value: {},
  defaultValue: { attribute: "default-value" },
  placeholder: {},
  label: {},
  helperText: { attribute: "helper-text" },
  error: { reflect: !0, useDefault: !0 },
  disabled: { type: Boolean, reflect: !0 },
  required: { type: Boolean, reflect: !0 },
  rows: { type: Number, reflect: !0 }
}, t.styles = [
  n,
  d`
      :host {
        display: block;
      }

      label {
        color: var(--nami-text);
        display: grid;
        gap: var(--nami-form-field-gap, var(--nami-space-2, 6px));
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      textarea {
        background: var(--nami-textarea-bg, transparent);
        border: var(--nami-textarea-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-textarea-border, var(--nami-border));
        border-radius: var(--nami-textarea-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-textarea-shadow, none);
        box-sizing: border-box;
        color: var(--nami-style-on-paper, var(--nami-text));
        font: inherit;
        line-height: 1.5;
        min-height: calc(var(--nami-control-height, var(--nami-control-height-md, 40px)) * 2);
        min-width: 0;
        outline: none;
        padding: var(--nami-space-3, 10px) var(--nami-control-padding-x, 12px);
        resize: vertical;
        transition:
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 100%;
      }

      textarea:focus-visible {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([error]) textarea {
        border-color: var(--nami-color-danger);
      }

      textarea::placeholder {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `
];
let l = t;
export {
  l as NamiTextarea
};
