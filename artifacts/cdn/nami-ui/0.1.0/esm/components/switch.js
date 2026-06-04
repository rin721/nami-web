import { i as r, c as s, a as i, b as o } from "../chunks/styles-DgWJnXXm.js";
import { a as n, s as c } from "../chunks/form-associated-CbqAj2Is.js";
import { e as d } from "../chunks/events-DtyLzvDt.js";
const a = class a extends r {
  constructor() {
    super(), this.internals = n(this), this.name = "", this.value = "on", this.checked = !1, this.disabled = !1;
  }
  updated() {
    c(this.internals, !this.disabled && this.checked ? this.value : null);
  }
  formResetCallback() {
    this.checked = !1;
  }
  toggle(t) {
    this.disabled || (this.checked = !this.checked, d(this, "nami-change", { checked: this.checked, value: this.value, sourceEvent: t }));
  }
  render() {
    return o`
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
  s,
  i`
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
let e = a;
export {
  e as NamiSwitch
};
