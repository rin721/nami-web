import { i as r, a as s, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { a as o, s as n } from "../chunks/form-associated-CbqAj2Is.js";
import { e as c } from "../chunks/events-DtyLzvDt.js";
import { c as d } from "../chunks/styles-C6m3uqJJ.js";
const a = class a extends r {
  constructor() {
    super(), this.internals = o(this), this.name = "", this.value = "on", this.checked = !1, this.disabled = !1;
  }
  updated() {
    n(this.internals, !this.disabled && this.checked ? this.value : null);
  }
  formResetCallback() {
    this.checked = !1;
  }
  toggle(e) {
    this.disabled || (this.checked = !this.checked, c(this, "nami-change", { checked: this.checked, value: this.value, sourceEvent: e }));
  }
  render() {
    return i`
      <button
        part="base control"
        type="button"
        role="switch"
        aria-checked=${this.checked ? "true" : "false"}
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="track" part="indicator"><span class="thumb"></span></span>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
};
a.formAssociated = !0, a.properties = {
  name: {},
  value: {},
  checked: { type: Boolean, reflect: !0 },
  disabled: { type: Boolean, reflect: !0 }
}, a.styles = [
  d,
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

      .track {
        align-items: center;
        background: var(--nami-switch-track-bg, var(--nami-hover-overlay));
        border: var(--nami-switch-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-switch-border-color, var(--nami-border));
        border-radius: var(--nami-radius-control, 999px);
        display: inline-flex;
        height: 28px;
        padding: 2px;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 48px;
      }

      .thumb {
        background: var(--nami-switch-thumb-bg, var(--nami-surface-raised));
        border-radius: 50%;
        box-shadow: var(--nami-switch-thumb-shadow, 0 1px 4px color-mix(in oklab, var(--nami-shadow-color), transparent 64%));
        height: 22px;
        transform: translateX(0);
        transition: transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 22px;
      }

      :host([checked]) .track {
        background: var(--nami-color-primary);
        border-color: transparent;
      }

      :host([checked]) .thumb {
        transform: translateX(20px);
      }

      button:focus-visible .track {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      @media (prefers-reduced-motion: reduce) {
        .track,
        .thumb {
          transition-duration: 1ms;
        }
      }
    `
];
let t = a;
export {
  t as NamiSwitch
};
