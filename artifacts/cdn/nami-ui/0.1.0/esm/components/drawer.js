import { i as s, c as i, a as l, b as c } from "../chunks/styles-DgWJnXXm.js";
import { g as n, t as d, r as p } from "../chunks/focus-BSADow8U.js";
import { e as o } from "../chunks/events-DtyLzvDt.js";
const a = class a extends s {
  constructor() {
    super(), this.previousActiveElement = null, this.handleKeydown = (e) => {
      e.key === "Escape" && this.open && this.close(e);
    }, this.open = !1, this.placement = "left";
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this.handleKeydown);
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleKeydown), super.disconnectedCallback();
  }
  close(e) {
    this.open && (this.closeSourceEvent = e, this.open = !1);
  }
  updated(e) {
    if (!e.has("open")) return;
    const t = e.get("open") === !0;
    this.open ? (this.previousActiveElement = document.activeElement, requestAnimationFrame(() => this.focusInitialElement()), o(this, "nami-open", void 0)) : t && (this.restoreFocus(), o(this, "nami-close", this.closeSourceEvent ? { sourceEvent: this.closeSourceEvent } : void 0), this.closeSourceEvent = void 0);
  }
  get panelElement() {
    return this.renderRoot.querySelector(".panel");
  }
  focusInitialElement() {
    const e = this.panelElement;
    if (!e) return;
    (n(e)[0] ?? e).focus();
  }
  handlePanelKeydown(e) {
    const t = this.panelElement;
    if (t) {
      if (e.key === "Tab" && n(t).length === 0) {
        e.preventDefault(), t.focus();
        return;
      }
      d(e, t);
    }
  }
  restoreFocus() {
    p(this.previousActiveElement), this.previousActiveElement = null;
  }
  render() {
    return c`
      <div class="backdrop" part="backdrop" @click=${(e) => this.close(e)}></div>
      <aside
        class="panel"
        part="base control"
        role="dialog"
        aria-modal=${this.open ? "true" : "false"}
        aria-hidden=${this.open ? "false" : "true"}
        tabindex=${this.open ? "0" : "-1"}
        ?inert=${!this.open}
        @keydown=${this.handlePanelKeydown}
      >
        <slot name="label" part="label"></slot>
        <slot></slot>
        <slot name="actions"></slot>
      </aside>
    `;
  }
};
a.properties = {
  open: { type: Boolean, reflect: !0 },
  placement: { reflect: !0 }
}, a.styles = [
  i,
  l`
      :host {
        display: contents;
      }

      .backdrop {
        background: var(--nami-overlay-backdrop, color-mix(in oklab, #000, transparent 55%));
        backdrop-filter: blur(8px);
        inset: 0;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        transition: opacity var(--nami-motion-exit, 150ms) var(--nami-ease-standard, ease);
        z-index: 50;
      }

      .panel {
        background: var(--nami-drawer-bg, var(--nami-surface-overlay));
        border: var(--nami-drawer-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-drawer-border-color, var(--nami-border));
        box-shadow: var(--nami-drawer-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        max-height: 100dvh;
        max-width: 100dvw;
        overflow: auto;
        padding: var(--nami-space-5, 24px);
        pointer-events: none;
        position: fixed;
        transition: transform var(--nami-motion-slow, 700ms) var(--nami-ease-emphasized, ease);
        visibility: hidden;
        z-index: 51;
      }

      :host([placement='left']) .panel {
        border-radius: 0 var(--nami-radius-surface, 6px) var(--nami-radius-surface, 6px) 0;
        bottom: 0;
        left: 0;
        top: 0;
        transform: translateX(-105%);
        width: min(320px, calc(100vw - 48px));
      }

      :host([placement='right']) .panel {
        border-radius: var(--nami-radius-surface, 6px) 0 0 var(--nami-radius-surface, 6px);
        bottom: 0;
        right: 0;
        top: 0;
        transform: translateX(105%);
        width: min(320px, calc(100vw - 48px));
      }

      :host([placement='bottom']) .panel {
        border-radius: var(--nami-radius-surface, 6px) var(--nami-radius-surface, 6px) 0 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(105%);
      }

      :host([open]) .backdrop {
        opacity: 1;
        pointer-events: auto;
        transition-duration: var(--nami-motion-normal, 250ms);
      }

      :host([open]) .panel {
        pointer-events: auto;
        transform: translate(0);
        visibility: visible;
      }

      @media (prefers-reduced-motion: reduce) {
        .backdrop,
        .panel {
          transition-duration: 1ms;
        }
      }
    `
];
let r = a;
export {
  r as NamiDrawer
};
