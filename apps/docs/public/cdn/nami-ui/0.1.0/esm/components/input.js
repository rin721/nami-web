import { i as l, a as o, A as r, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { a as d, s as h, b as u } from "../chunks/form-associated-CbqAj2Is.js";
import { n as m } from "../chunks/ids-BBzulDVF.js";
import { e as s } from "../chunks/events-DtyLzvDt.js";
import { c } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends l {
  constructor() {
    super(), this.internals = d(this), this.metaId = `${m("nami-input")}-meta`, this.name = "", this.value = "", this.defaultValue = "", this.type = "text", this.placeholder = "", this.label = "", this.helperText = "", this.error = "", this.disabled = !1, this.required = !1;
  }
  get inputElement() {
    return this.renderRoot.querySelector("input");
  }
  updated() {
    h(this.internals, this.disabled ? null : this.value), u(this.internals, this.validityFlags, this.validityMessage, this.inputElement ?? void 0);
  }
  formResetCallback() {
    this.value = this.defaultValue;
  }
  focus() {
    this.inputElement?.focus();
  }
  checkValidity() {
    return this.inputElement?.checkValidity() ?? Object.keys(this.validityFlags).length === 0;
  }
  reportValidity() {
    return this.inputElement?.reportValidity() ?? this.checkValidity();
  }
  get validity() {
    return this.inputElement?.validity;
  }
  get validationMessage() {
    return this.error || this.inputElement?.validationMessage || "";
  }
  get willValidate() {
    return !this.disabled;
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
        <span class="control" part="control">
          <slot name="icon" part="icon"></slot>
          <input
            .value=${this.value}
            name=${this.name}
            type=${this.type}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.error ? "true" : "false"}
            aria-describedby=${a ? e : r}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <slot name="actions"></slot>
        </span>
      </label>
      ${a ? i`<div id=${e} class="meta ${this.error ? "error" : ""}" part=${this.error ? "error" : "description"}>${a}</div>` : r}
    `;
  }
};
t.formAssociated = !0, t.properties = {
  name: {},
  value: {},
  defaultValue: { attribute: "default-value" },
  type: {},
  placeholder: {},
  label: {},
  helperText: { attribute: "helper-text" },
  error: { reflect: !0, useDefault: !0 },
  disabled: { type: Boolean, reflect: !0 },
  required: { type: Boolean, reflect: !0 }
}, t.styles = [
  c,
  o`
      :host {
        display: block;
      }

      label {
        color: var(--nami-text);
        display: grid;
        gap: var(--nami-space-2, 6px);
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        align-items: center;
        background: var(--nami-input-bg, transparent);
        border: var(--nami-input-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-input-border, var(--nami-border));
        border-radius: var(--nami-input-radius, var(--nami-radius-surface, 6px));
        display: flex;
        min-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        padding: 0 var(--nami-control-padding-x, 10px);
        box-shadow: var(--nami-input-shadow, none);
        transition:
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      .control:focus-within {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([error]) .control {
        border-color: var(--nami-color-danger);
      }

      input {
        background: transparent;
        border: 0;
        color: var(--nami-style-on-paper, var(--nami-text));
        flex: 1 1 auto;
        font: inherit;
        font-size: var(--nami-control-font-size, 0.9375rem);
        min-width: 0;
        outline: none;
        padding: 0;
      }

      input::placeholder {
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

      ::slotted([slot='icon']),
      ::slotted([slot='actions']) {
        color: var(--nami-icon-color);
        flex: 0 0 auto;
      }
    `
];
let n = t;
export {
  n as NamiInput
};
