import { i as s, a as r, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { e as t } from "../chunks/events-DtyLzvDt.js";
import { c as n } from "../chunks/styles-C6m3uqJJ.js";
const e = class e extends s {
  constructor() {
    super(), this.value = "", this.selected = !1, this.checkbox = !1, this.disabled = !1;
  }
  handleClick(a) {
    this.disabled || (this.checkbox && (this.selected = !this.selected), t(this, "nami-change", { selected: this.selected, value: this.value, sourceEvent: a }), t(this, "nami-select", { selected: this.selected, value: this.value, sourceEvent: a }));
  }
  render() {
    return i`
      <button
        part="base control"
        type="button"
        role=${this.checkbox ? "checkbox" : "button"}
        aria-checked=${this.checkbox ? String(this.selected) : void 0}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot name="icon" part="icon"></slot>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
};
e.properties = {
  value: {},
  selected: { type: Boolean, reflect: !0 },
  checkbox: { type: Boolean, reflect: !0 },
  disabled: { type: Boolean, reflect: !0 }
}, e.styles = [
  n,
  r`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: var(--nami-chip-bg, var(--nami-hover-overlay));
        border: var(--nami-chip-border-width, 0) solid var(--nami-chip-border-color, transparent);
        border-radius: var(--nami-chip-radius, var(--nami-radius-control, 999px));
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-2, 6px);
        min-height: 31px;
        padding: 0 12px;
        box-shadow: var(--nami-chip-shadow, none);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      :host([selected]) button {
        background: var(--nami-chip-selected-bg, var(--nami-color-primary));
        color: var(--nami-text-inverse);
      }

      button:hover:not(:disabled) {
        background: var(--nami-accent-hover-overlay, var(--nami-hover-overlay));
      }

      :host([selected]) button:hover:not(:disabled) {
        background: var(--nami-color-primary-hover);
      }

      button:active:not(:disabled) {
        transform: scale(0.98);
      }

      button:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }
    `
];
let o = e;
export {
  o as NamiChip
};
