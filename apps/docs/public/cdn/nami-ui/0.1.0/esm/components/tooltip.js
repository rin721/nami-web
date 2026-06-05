import { i as a, a as l, A as d, b as c } from "../chunks/lit-element-GeMXvhiH.js";
import { b as p, o as h, a as m, d as g } from "../chunks/overlay-s5986HiD.js";
import { n as v } from "../chunks/ids-BBzulDVF.js";
import { s as f } from "../chunks/selection-CrKkvo5N.js";
import { e as o } from "../chunks/events-DtyLzvDt.js";
import { c as u } from "../chunks/styles-C6m3uqJJ.js";
const n = class n extends a {
  constructor() {
    super(), this.contentId = v("nami-tooltip"), this.triggerElements = /* @__PURE__ */ new Set(), this.handleTriggerOpen = (e) => {
      this.openTooltip(e);
    }, this.handleTriggerClose = (e) => {
      this.close(e);
    }, this.handleTriggerKeydown = (e) => {
      p(e) && this.open && (e.stopPropagation(), this.close(e));
    }, this.open = !1, this.placement = "top", this.disabled = !1;
  }
  disconnectedCallback() {
    this.unsyncTriggers(), super.disconnectedCallback();
  }
  updated(e) {
    const i = this.open && !this.disabled, s = this.resolvedPlacement;
    if (f(this, {
      state: h(i),
      disabled: this.disabled
    }), this.dataset.placement = s, this.syncTriggerDescriptions(), this.disabled && this.open) {
      this.close();
      return;
    }
    !e.has("open") || e.get("open") === void 0 || (this.open ? o(this, "nami-open", void 0) : e.get("open") === !0 && (o(this, "nami-close", m(this.closeSourceEvent)), this.closeSourceEvent = void 0));
  }
  get resolvedPlacement() {
    const e = getComputedStyle(this).direction === "rtl" ? "rtl" : "ltr";
    return g(this.placement, e);
  }
  openTooltip(e) {
    this.disabled || this.open || (this.open = !0, this.closeSourceEvent = void 0, e.stopPropagation());
  }
  close(e) {
    this.open && (this.closeSourceEvent = e, this.open = !1);
  }
  handleTriggerSlotChange(e) {
    const i = e.target;
    this.unsyncTriggers();
    const s = i.assignedElements({ flatten: !0 }).filter((t) => t instanceof HTMLElement);
    this.triggerElements = new Set(s);
    for (const t of this.triggerElements)
      t.addEventListener("mouseenter", this.handleTriggerOpen), t.addEventListener("mouseleave", this.handleTriggerClose), t.addEventListener("focusin", this.handleTriggerOpen), t.addEventListener("focusout", this.handleTriggerClose), t.addEventListener("keydown", this.handleTriggerKeydown);
    this.syncTriggerDescriptions();
  }
  syncTriggerDescriptions() {
    for (const e of this.triggerElements)
      this.disabled ? e.removeAttribute("aria-describedby") : e.setAttribute("aria-describedby", this.contentId);
  }
  unsyncTriggers() {
    for (const e of this.triggerElements)
      e.removeEventListener("mouseenter", this.handleTriggerOpen), e.removeEventListener("mouseleave", this.handleTriggerClose), e.removeEventListener("focusin", this.handleTriggerOpen), e.removeEventListener("focusout", this.handleTriggerClose), e.removeEventListener("keydown", this.handleTriggerKeydown), e.removeAttribute("aria-describedby");
    this.triggerElements.clear();
  }
  render() {
    const e = this.open && !this.disabled, i = this.resolvedPlacement;
    return c`
      <span class="trigger" part="trigger"><slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot></span>
      <span
        id=${this.contentId}
        class="content"
        part="base content"
        role="tooltip"
        data-placement=${i}
        aria-hidden=${e ? "false" : "true"}
        ?hidden=${!e}
      >
        <slot name="content">${d}</slot>
      </span>
    `;
  }
};
n.properties = {
  open: { type: Boolean, reflect: !0 },
  placement: { reflect: !0 },
  disabled: { type: Boolean, reflect: !0 }
}, n.styles = [
  u,
  l`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: contents;
      }

      .content {
        background: var(--nami-tooltip-bg, var(--nami-text));
        border: var(--nami-tooltip-border-width, 0) solid var(--nami-tooltip-border-color, transparent);
        border-radius: var(--nami-tooltip-radius, var(--nami-radius-tight, 4px));
        box-shadow: var(--nami-tooltip-shadow, 0 8px 24px color-mix(in oklab, var(--nami-shadow-color, #000), transparent 72%));
        color: var(--nami-tooltip-fg, var(--nami-text-inverse));
        font-size: var(--nami-tooltip-font-size, 0.75rem);
        inset: auto auto auto 50%;
        line-height: 1.35;
        max-inline-size: min(240px, calc(100vw - 32px));
        padding: var(--nami-tooltip-padding-y, 6px) var(--nami-tooltip-padding-x, 8px);
        pointer-events: none;
        position: absolute;
        white-space: normal;
        width: max-content;
        z-index: var(--nami-tooltip-z-index, 80);
      }

      .content[hidden] {
        display: none;
      }

      .content[data-placement='top'] {
        bottom: calc(100% + var(--nami-tooltip-offset, 8px));
        left: 50%;
        transform: translateX(-50%);
      }

      .content[data-placement='bottom'] {
        left: 50%;
        top: calc(100% + var(--nami-tooltip-offset, 8px));
        transform: translateX(-50%);
      }

      .content[data-placement='left'] {
        right: calc(100% + var(--nami-tooltip-offset, 8px));
        top: 50%;
        transform: translateY(-50%);
      }

      .content[data-placement='right'] {
        left: calc(100% + var(--nami-tooltip-offset, 8px));
        top: 50%;
        transform: translateY(-50%);
      }
    `
];
let r = n;
export {
  r as NamiTooltip
};
