import { i as r, a as i, A as e, b as o } from "../chunks/lit-element-GeMXvhiH.js";
import { m as s } from "../chunks/runtime-4rCsJ4EI.js";
import { u as l } from "../chunks/localized-controller-BapUPJ8o.js";
import { e as m } from "../chunks/events-DtyLzvDt.js";
import { d } from "../chunks/define-BpqXLfIT.js";
import { c as u } from "../chunks/styles-C6m3uqJJ.js";
import { NamiSpinner as c } from "./spinner.js";
d("nami-spinner", c);
const a = class a extends r {
  constructor() {
    super(), l(this), this.variant = "solid", this.disabled = !1, this.loading = !1, this.type = "button";
  }
  handleClick(t) {
    if (this.disabled || this.loading) {
      t.preventDefault(), t.stopImmediatePropagation();
      return;
    }
    if (!m(this, "nami-click", { sourceEvent: t }, { cancelable: !0 })) {
      t.preventDefault();
      return;
    }
    this.runFormAction();
  }
  runFormAction() {
    const t = this.closest("form");
    t && (this.type === "submit" ? t.requestSubmit() : this.type === "reset" && t.reset());
  }
  render() {
    return o`
      <button
        part="base control"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? "true" : "false"}
        @click=${this.handleClick}
      >
        ${this.loading ? o`<nami-spinner size="sm" label=${s("Loading", { id: "nami.spinner.loading" })} part="indicator"></nami-spinner>` : o`<slot name="icon" part="icon"></slot>`}
        <span part="label"><slot></slot></span>
        ${this.loading ? e : o`<slot name="actions"></slot>`}
      </button>
    `;
  }
};
a.properties = {
  variant: { reflect: !0 },
  size: { reflect: !0 },
  disabled: { type: Boolean, reflect: !0 },
  loading: { type: Boolean, reflect: !0 },
  type: {}
}, a.styles = [
  u,
  i`
      :host {
        --button-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        --button-padding: var(--nami-control-padding-x, 16px);
        display: inline-flex;
      }

      button {
        align-items: center;
        background: var(--nami-button-bg, var(--nami-color-primary));
        border: var(--nami-button-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-button-border, transparent);
        border-radius: var(--nami-button-radius, var(--nami-radius-control, 999px));
        color: var(--nami-button-fg, var(--nami-text-inverse));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-weight: 600;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
        min-height: var(--button-height);
        min-width: var(--button-height);
        padding: 0 var(--button-padding);
        font-size: var(--nami-control-font-size, 0.9375rem);
        position: relative;
        box-shadow: var(--nami-button-shadow, none);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        user-select: none;
      }

      :host([size='sm']) {
        --button-height: var(--nami-control-height-sm, 32px);
        --button-padding: 12px;
        --nami-control-font-size: 0.875rem;
      }

      :host([size='md']) {
        --button-height: var(--nami-control-height-md, 40px);
        --button-padding: 16px;
        --nami-control-font-size: 0.9375rem;
      }

      :host([size='lg']) {
        --button-height: var(--nami-control-height-lg, 48px);
        --button-padding: 20px;
        --nami-control-font-size: 1rem;
      }

      :host([variant='soft']) button {
        background: var(--nami-accent-hover-overlay, var(--nami-color-primary-muted));
        color: var(--nami-color-primary);
      }

      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--nami-border, currentColor);
        color: var(--nami-text);
      }

      :host([variant='ghost']) button {
        background: transparent;
        color: var(--nami-text);
      }

      button:hover:not(:disabled) {
        background: var(--nami-button-hover-bg, var(--nami-color-primary-hover));
      }

      :host([variant='soft']) button:hover:not(:disabled),
      :host([variant='ghost']) button:hover:not(:disabled),
      :host([variant='outline']) button:hover:not(:disabled) {
        background: var(--nami-hover-overlay);
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

      nami-spinner {
        color: currentColor;
      }

      ::slotted([slot='icon']) {
        flex: 0 0 auto;
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          transition-duration: 1ms;
        }

        button:active:not(:disabled) {
          transform: none;
        }
      }
    `
];
let n = a;
export {
  n as NamiButton
};
