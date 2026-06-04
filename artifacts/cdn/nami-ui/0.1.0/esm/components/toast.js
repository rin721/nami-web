import { i, a as n, A as m, b as r } from "../chunks/lit-element-GeMXvhiH.js";
import { m as l } from "../chunks/runtime-4rCsJ4EI.js";
import { u as c } from "../chunks/localized-controller-BapUPJ8o.js";
import { e as o } from "../chunks/events-DtyLzvDt.js";
import { c as p } from "../chunks/styles-C6m3uqJJ.js";
const e = class e extends i {
  constructor() {
    super(), this.timer = 0, c(this), this.open = !1, this.message = "", this.variant = "neutral", this.placement = "top", this.duration = 3200;
  }
  static show(t) {
    const a = document.createElement("nami-toast");
    return a.message = t.message, a.variant = t.variant ?? "neutral", a.placement = t.placement ?? "top", a.duration = t.duration ?? 3200, document.body.append(a), requestAnimationFrame(() => {
      a.open = !0;
    }), a;
  }
  updated(t) {
    t.has("open") && (this.open ? (o(this, "nami-open", void 0), window.clearTimeout(this.timer), this.duration > 0 && (this.timer = window.setTimeout(() => this.close(), this.duration))) : t.get("open") === !0 && (window.clearTimeout(this.timer), o(this, "nami-close", this.closeSourceEvent ? { sourceEvent: this.closeSourceEvent } : void 0), this.closeSourceEvent = void 0));
  }
  disconnectedCallback() {
    window.clearTimeout(this.timer), super.disconnectedCallback();
  }
  close(t) {
    this.open && (this.closeSourceEvent = t, this.open = !1, window.setTimeout(() => this.remove(), 180));
  }
  render() {
    return r`
      <div class="base" part="base" role="status" aria-live="polite">
        <span class="indicator" part="indicator"><slot name="icon">${this.variant === "neutral" ? m : r`<span aria-hidden="true">*</span>`}</slot></span>
        <span part="label"><slot>${this.message}</slot></span>
        <button type="button" part="actions" aria-label=${l("Close", { id: "nami.toast.close" })} @click=${(t) => this.close(t)}>X</button>
      </div>
    `;
  }
};
e.properties = {
  open: { type: Boolean, reflect: !0 },
  message: {},
  variant: { reflect: !0 },
  placement: { reflect: !0 },
  duration: { type: Number }
}, e.styles = [
  p,
  n`
      :host {
        display: block;
        left: 50%;
        max-width: min(420px, calc(100vw - 32px));
        pointer-events: auto;
        position: fixed;
        transform: translateX(-50%) translateY(var(--toast-offset, -16px));
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: max-content;
        z-index: 70;
      }

      :host([placement='top']) {
        top: 16px;
        --toast-offset: -16px;
      }

      :host([placement='bottom']) {
        bottom: 16px;
        --toast-offset: 16px;
      }

      :host([open]) {
        transform: translateX(-50%) translateY(0);
      }

      .base {
        align-items: center;
        background: var(--nami-toast-bg, var(--nami-surface-raised));
        border: var(--nami-toast-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-toast-border-color, var(--nami-border));
        border-radius: var(--nami-toast-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-dialog-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        display: flex;
        gap: var(--nami-space-3, 10px);
        min-height: 44px;
        padding: 10px 12px;
      }

      :host([variant='success']) .indicator {
        color: var(--nami-color-primary);
      }

      :host([variant='danger']) .indicator {
        color: var(--nami-color-danger);
      }

      button {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-style-on-paper-muted, var(--nami-icon-color));
        cursor: pointer;
        height: 30px;
        width: 30px;
      }

      button:hover {
        background: var(--nami-hover-overlay);
      }
    `
];
let s = e;
export {
  s as NamiToast
};
