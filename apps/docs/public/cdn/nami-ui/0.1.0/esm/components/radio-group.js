import { i as m, a as f, A as n, b as o } from "../chunks/lit-element-GeMXvhiH.js";
import { a as v, s as g, b as p, c as d } from "../chunks/form-associated-BOUCekea.js";
import { g as y } from "../chunks/roving-tabindex-BIO4J81E.js";
import { s as b } from "../chunks/selection-CrKkvo5N.js";
import { e as h } from "../chunks/events-DtyLzvDt.js";
import { c as I } from "../chunks/styles-C6m3uqJJ.js";
const r = class r extends m {
  constructor() {
    super(), this.internals = v(this), this.handleItemSelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget, s = e.detail?.sourceEvent ?? e;
      this.selectItem(i, s);
    }, this.handleItemChange = (e) => {
      e.stopPropagation();
    }, this.handleItemKeydown = (e) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const i = e.currentTarget, s = this.enabledItems, a = s.indexOf(i);
      if (a < 0 || s.length === 0) return;
      const l = y(e.key, a, s.length, this.orientation), t = s[l];
      t?.focus(), t && this.selectItem(t, e);
    }, this.name = "", this.value = "", this.defaultValue = "", this.orientation = "vertical", this.disabled = !1, this.required = !1, this.error = "";
  }
  get items() {
    return Array.from(this.children).filter((e) => e.localName === "nami-radio-item");
  }
  get enabledItems() {
    return this.items.filter((e) => !e.effectiveDisabled);
  }
  firstUpdated() {
    this.syncItems();
  }
  updated() {
    this.syncItems();
    const e = !this.disabled && !!(this.error || this.required && !this.value);
    b(this, {
      state: this.value ? "selected" : "empty",
      disabled: this.disabled,
      invalid: e
    }), g(this.internals, this.disabled || !this.value ? null : this.value), p(this.internals, this.validityFlags, this.validityMessage);
  }
  formResetCallback() {
    this.value = this.defaultValue, this.syncItems();
  }
  checkValidity() {
    return Object.keys(this.validityFlags).length === 0;
  }
  reportValidity() {
    return this.checkValidity();
  }
  get validationMessage() {
    return this.validityMessage ?? "";
  }
  get validityFlags() {
    return this.disabled ? {} : this.error ? { customError: !0 } : this.required ? d(this.value, this.name || "Radio group").flags : {};
  }
  get validityMessage() {
    if (!this.disabled) {
      if (this.error) return this.error;
      if (this.required) return d(this.value, this.name || "Radio group").message;
    }
  }
  syncItems() {
    const e = this.items, i = !!this.value, s = e.filter((t) => !t.disabled && !this.disabled), l = s.find((t) => i && t.value === this.value) ?? s[0];
    e.forEach((t) => {
      const u = i && t.value === this.value;
      t.setGroupDisabled(this.disabled), t.checked = u, t.tabIndex = t === l ? 0 : -1, t.removeEventListener("nami-select", this.handleItemSelect), t.removeEventListener("nami-change", this.handleItemChange), t.removeEventListener("keydown", this.handleItemKeydown), t.addEventListener("nami-select", this.handleItemSelect), t.addEventListener("nami-change", this.handleItemChange), t.addEventListener("keydown", this.handleItemKeydown);
    });
  }
  selectItem(e, i) {
    if (this.disabled || e.effectiveDisabled || !e.value) return;
    const s = this.value;
    if (s === e.value) {
      this.syncItems();
      return;
    }
    this.value = e.value, this.syncItems();
    const a = { value: this.value, previousValue: s, item: e, sourceEvent: i };
    h(this, "nami-select", a), h(this, "nami-change", a);
  }
  render() {
    return o`
      <fieldset class="base" part="base">
        <legend class="label" part="label"><slot name="label">${n}</slot></legend>
        <div class="items" part="items" role="radiogroup" aria-orientation=${this.orientation} aria-invalid=${this.error ? "true" : "false"}>
          <slot @slotchange=${() => this.syncItems()}></slot>
        </div>
        ${this.error ? o`<div class="error" part="error">${this.error}</div>` : n}
      </fieldset>
    `;
  }
};
r.formAssociated = !0, r.properties = {
  name: {},
  value: {},
  defaultValue: { attribute: "default-value" },
  orientation: { reflect: !0 },
  disabled: { type: Boolean, reflect: !0 },
  required: { type: Boolean, reflect: !0 },
  error: { reflect: !0, useDefault: !0 }
}, r.styles = [
  I,
  f`
      :host {
        display: block;
      }

      .base {
        border: 0;
        display: grid;
        gap: var(--nami-radio-group-gap, var(--nami-space-2, 6px));
        margin: 0;
        min-inline-size: 0;
        padding: 0;
      }

      :host([orientation='horizontal']) .items {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-radio-group-gap, var(--nami-space-3, 10px));
      }

      :host([orientation='vertical']) .items {
        display: grid;
        gap: var(--nami-radio-group-gap, var(--nami-space-2, 6px));
      }

      .label {
        color: var(--nami-text);
        font-size: 0.875rem;
        font-weight: 600;
      }

      .error {
        color: var(--nami-color-danger);
        font-size: 0.8125rem;
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `
];
let c = r;
export {
  c as NamiRadioGroup
};
