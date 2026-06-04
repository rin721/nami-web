import { i as s, a as r, A as n, b as l } from "../chunks/lit-element-GeMXvhiH.js";
import { g as c, r as d, t as p } from "../chunks/focus-BSADow8U.js";
import { e as a } from "../chunks/events-DtyLzvDt.js";
import { c as h } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends s {
  constructor() {
    super(), this.previousActiveElement = null, this.open = !1, this.label = "", this.closeOnBackdrop = !0;
  }
  get dialogElement() {
    return this.renderRoot.querySelector("dialog");
  }
  get focusableElements() {
    return c(this.dialogElement);
  }
  updated(e) {
    if (!e.has("open")) return;
    const i = e.get("open") === !0;
    this.open && !this.dialogElement.open && (this.previousActiveElement = document.activeElement, this.dialogElement.showModal(), requestAnimationFrame(() => this.focusInitialElement()), a(this, "nami-open", void 0)), !this.open && this.dialogElement.open && this.dialogElement.close(), !this.open && i && (this.restoreFocus(), a(this, "nami-close", this.closeSourceEvent ? { sourceEvent: this.closeSourceEvent } : void 0), this.closeSourceEvent = void 0);
  }
  focusInitialElement() {
    this.focusableElements[0]?.focus();
  }
  restoreFocus() {
    d(this.previousActiveElement), this.previousActiveElement = null;
  }
  close(e) {
    this.open && (this.closeSourceEvent = e, this.open = !1);
  }
  handleCancel(e) {
    e.preventDefault(), this.close(e);
  }
  handleClick(e) {
    this.closeOnBackdrop && e.target === this.dialogElement && this.close(e);
  }
  handleNativeClose() {
    this.open && this.close();
  }
  handleKeydown(e) {
    this.open && p(e, this.dialogElement);
  }
  render() {
    return l`
      <dialog
        part="base"
        aria-label=${this.label || n}
        @cancel=${this.handleCancel}
        @click=${this.handleClick}
        @close=${this.handleNativeClose}
        @keydown=${this.handleKeydown}
      >
        <div class="panel" part="control">
          <header part="header">
            <h2 part="label"><slot name="label">${this.label}</slot></h2>
            <button class="close" type="button" aria-label="Close" part="actions" @click=${(e) => this.close(e)}>X</button>
          </header>
          <section part="description"><slot></slot></section>
          <footer part="footer"><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `;
  }
};
t.properties = {
  open: { type: Boolean, reflect: !0 },
  label: {},
  closeOnBackdrop: { attribute: "close-on-backdrop", type: Boolean, reflect: !0 }
}, t.styles = [
  h,
  r`
      dialog {
        background: var(--nami-dialog-bg, var(--nami-surface-raised));
        border: var(--nami-dialog-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-dialog-border-color, var(--nami-border));
        border-radius: var(--nami-dialog-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-dialog-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        margin: auto;
        max-width: min(560px, calc(100vw - 32px));
        min-width: min(420px, calc(100vw - 32px));
        padding: 0;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      dialog::backdrop {
        background: var(--nami-overlay-backdrop, color-mix(in oklab, #000, transparent 52%));
        backdrop-filter: blur(8px);
      }

      .panel {
        display: grid;
        gap: var(--nami-space-4, 16px);
        padding: var(--nami-space-5, 24px);
      }

      header {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      h2 {
        font-size: 1.125rem;
        line-height: 1.3;
        margin: 0;
      }

      .close {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-style-on-paper-muted, var(--nami-icon-color));
        cursor: pointer;
        height: 36px;
        width: 36px;
      }

      .close:hover {
        background: var(--nami-hover-overlay);
      }

      .close:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      footer {
        display: flex;
        gap: var(--nami-space-2, 6px);
        justify-content: flex-end;
      }
    `
];
let o = t;
export {
  o as NamiDialog
};
