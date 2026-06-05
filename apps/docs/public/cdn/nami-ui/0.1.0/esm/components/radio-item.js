import { i as s, a as o, A as n, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { s as d, c } from "../chunks/selection-CrKkvo5N.js";
import { e as t } from "../chunks/events-DtyLzvDt.js";
import { c as l } from "../chunks/styles-C6m3uqJJ.js";
const a = class a extends s {
  constructor() {
    super(), this.handleKeydown = (e) => {
      e.key !== " " && e.key !== "Enter" || (e.preventDefault(), this.select(e));
    }, this.value = "", this.checked = !1, this.disabled = !1, this.description = "", this.groupDisabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = 0), this.addEventListener("keydown", this.handleKeydown);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this.handleKeydown), super.disconnectedCallback();
  }
  updated() {
    const e = this.effectiveDisabled;
    d(this, {
      state: c(this.checked),
      disabled: e
    }), this.setAttribute("role", "radio"), this.setAttribute("aria-checked", String(this.checked)), this.toggleAttribute("aria-disabled", e), e && (this.tabIndex = -1);
  }
  setGroupDisabled(e) {
    this.groupDisabled = e;
  }
  get effectiveDisabled() {
    return this.disabled || this.groupDisabled;
  }
  select(e) {
    this.effectiveDisabled || this.checked || (this.checked = !0, t(this, "nami-select", { checked: !0, value: this.value, sourceEvent: e }), t(this, "nami-change", { checked: !0, value: this.value, sourceEvent: e }));
  }
  render() {
    return i`
      <div class="base" part="base control" @click=${this.select}>
        <span class="indicator" part="indicator"></span>
        <span class="label" part="label">
          <slot></slot>
          ${this.description ? i`<span class="description" part="description"><slot name="description">${this.description}</slot></span>` : n}
        </span>
      </div>
    `;
  }
};
a.properties = {
  value: {},
  checked: { type: Boolean, reflect: !0 },
  disabled: { type: Boolean, reflect: !0 },
  description: {},
  groupDisabled: { state: !0 }
}, a.styles = [
  l,
  o`
      :host {
        display: block;
        outline: none;
      }

      .base {
        align-items: flex-start;
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: flex;
        gap: var(--nami-radio-item-gap, var(--nami-space-3, 10px));
        padding: var(--nami-radio-item-padding, 8px 0);
      }

      .indicator {
        align-items: center;
        background: var(--nami-radio-item-bg, transparent);
        border: var(--nami-radio-item-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-radio-item-border-color, var(--nami-border));
        border-radius: 50%;
        color: var(--nami-radio-item-indicator-color, var(--nami-color-primary));
        display: inline-flex;
        flex: 0 0 auto;
        height: var(--nami-radio-item-size, 20px);
        justify-content: center;
        margin-block-start: 0.1em;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: var(--nami-radio-item-size, 20px);
      }

      .indicator::before {
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: calc(var(--nami-radio-item-size, 20px) * 0.45);
        opacity: 0;
        transform: scale(0.75);
        transition:
          opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: calc(var(--nami-radio-item-size, 20px) * 0.45);
      }

      :host([checked]) .indicator {
        border-color: var(--nami-color-primary);
      }

      :host([checked]) .indicator::before {
        opacity: 1;
        transform: scale(1);
      }

      :host(:focus-visible) .indicator {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([data-disabled]) .base {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .label {
        display: grid;
        gap: var(--nami-space-1, 4px);
        line-height: 1.35;
      }

      .description {
        color: var(--nami-radio-item-description-color, var(--nami-text-muted));
        font-size: 0.875rem;
      }
    `
];
let r = a;
export {
  r as NamiRadioItem
};
