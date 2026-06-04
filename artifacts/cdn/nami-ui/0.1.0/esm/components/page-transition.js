import { i as l, c as p, a as d, A as c, b as h } from "../chunks/styles-DgWJnXXm.js";
import { m } from "../chunks/runtime-4rCsJ4EI.js";
import { u as v } from "../chunks/localized-controller-BapUPJ8o.js";
import { d as b } from "../chunks/define-BpqXLfIT.js";
import { NamiSpinner as u } from "./spinner.js";
b("nami-spinner", u);
const t = class t extends l {
  constructor() {
    super(), this.hideTimer = 0, this.shownAt = 0, v(this), this.active = !1, this.appearance = "veil", this.duration = 240, this.hasDefaultContent = !1, this.label = "", this.tone = "surface", this.variant = "screen", this.visible = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.active && (this.visible = !0, this.shownAt = Date.now());
  }
  disconnectedCallback() {
    window.clearTimeout(this.hideTimer), this.hideResolver?.(), super.disconnectedCallback();
  }
  updated(a) {
    if (!a.has("active")) return;
    if (window.clearTimeout(this.hideTimer), this.active) {
      this.hideResolver?.(), this.hideComplete = void 0, this.visible = !0, this.shownAt = Date.now();
      return;
    }
    const i = Date.now() - this.shownAt, e = Math.max(0, Number(this.duration) - i);
    this.hideComplete = new Promise((n) => {
      this.hideResolver = n;
    }), this.hideTimer = window.setTimeout(() => {
      this.active || (this.visible = !1), this.hideResolver?.(), this.hideResolver = void 0;
    }, e);
  }
  show(a = {}) {
    this.applyOptions(a), this.visible = !0, this.shownAt = Date.now(), this.active = !0;
  }
  async hide(a = {}) {
    this.applyOptions(a), this.active = !1, await this.updateComplete, this.hideComplete && await this.hideComplete;
  }
  async waitFor(a, i = {}) {
    const e = i.minDuration ?? i.duration ?? this.duration, n = Date.now();
    this.show(i);
    try {
      return await (typeof a == "function" ? a() : a);
    } finally {
      const r = Math.max(0, Number(e) - (Date.now() - n));
      r > 0 && await new Promise((o) => window.setTimeout(o, r)), await this.hide(i);
    }
  }
  applyOptions(a) {
    a.appearance && (this.appearance = a.appearance), a.duration !== void 0 && (this.duration = a.duration), a.label !== void 0 && (this.label = a.label), a.tone && (this.tone = a.tone), a.variant && (this.variant = a.variant);
  }
  handleSlotChange(a) {
    const i = a.target;
    this.hasDefaultContent = i.assignedNodes({ flatten: !0 }).some((e) => e.nodeType === Node.TEXT_NODE ? !!e.textContent?.trim() : !0);
  }
  get fallbackLabel() {
    return this.label || m("Preparing interface", { id: "nami.pageTransition.preparing" });
  }
  render() {
    return this.visible ? h`
      <div class="base" part="base" role="status" aria-live="polite" aria-busy=${this.active ? "true" : "false"} aria-label=${this.fallbackLabel} aria-hidden=${this.active ? "false" : "true"}>
        <div class="veil" aria-hidden="true">
          <span class="brand" part="brand">
            <svg viewBox="0 0 112 96" focusable="false" aria-hidden="true">
              <path class="brand-ink" d="M12 18h16v64H12zM27 18h16l42 56-3 18H66L35 50v32H27zM72 18h17L78 82H60z" />
              <path class="brand-accent" d="M72 4h12l-2 13H74zM91 4h12l-2 13H93z" />
            </svg>
          </span>
          <span class="veil-track" part="track"><span class="veil-indicator" part="indicator"></span></span>
        </div>
        <div class="panel" part="panel">
          <span class="indicator" part="indicator">
            <slot name="icon"><nami-spinner size="md" label=${this.fallbackLabel}></nami-spinner></slot>
          </span>
          <span class=${this.hasDefaultContent ? "label has-content" : "label"} part="label"><slot @slotchange=${this.handleSlotChange}></slot></span>
        </div>
      </div>
    ` : c;
  }
};
t.properties = {
  active: { type: Boolean, reflect: !0 },
  appearance: { reflect: !0 },
  duration: { type: Number, reflect: !0 },
  hasDefaultContent: { state: !0 },
  label: {},
  tone: { reflect: !0 },
  variant: { reflect: !0 },
  visible: { state: !0 }
}, t.styles = [
  p,
  d`
      :host {
        --page-transition-backdrop: color-mix(in oklab, var(--nami-surface), transparent 8%);
        --page-transition-brand-ink: color-mix(in oklab, var(--nami-color-primary), black 44%);
        --page-transition-panel-bg: var(--nami-surface-overlay);
        --page-transition-panel-fg: var(--nami-text);
        --page-transition-panel-border: var(--nami-border);
        --page-transition-panel-shadow: var(
          --nami-dialog-shadow,
          0 20px 60px color-mix(in oklab, var(--nami-shadow-color), transparent 68%)
        );
        --page-transition-progress-bg: color-mix(in oklab, var(--nami-color-primary), transparent 88%);
        --page-transition-progress-fg: color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%);
        --page-transition-progress-height: var(--nami-transition-progress-height, 4px);
        --page-transition-z-index: var(--nami-page-transition-z-index, 2147483646);
        color: var(--page-transition-panel-fg);
        display: contents;
      }

      :host([tone='brand']) {
        --page-transition-backdrop: color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 84%);
        --page-transition-panel-bg: color-mix(in oklab, var(--nami-color-primary), var(--nami-surface-overlay) 90%);
        --page-transition-panel-border: color-mix(in oklab, var(--nami-color-primary), var(--nami-border) 72%);
      }

      .base {
        align-items: center;
        background:
          var(--nami-style-background-pattern, none),
          var(--page-transition-backdrop);
        background-size: var(--nami-style-background-size, auto);
        box-sizing: border-box;
        color: var(--page-transition-panel-fg);
        display: flex;
        inset: 0;
        justify-content: center;
        opacity: 0;
        padding: 24px;
        pointer-events: none;
        position: fixed;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          visibility var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        visibility: hidden;
        z-index: var(--page-transition-z-index);
      }

      :host([variant='inline']) .base {
        border-radius: var(--nami-card-radius, var(--nami-radius-surface));
        position: absolute;
      }

      :host([active]) .base {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }

      .veil,
      .panel {
        display: none;
      }

      :host([appearance='veil']) .veil {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 18px;
        inline-size: min(72vw, 260px);
      }

      .brand {
        align-items: center;
        color: var(--page-transition-brand-ink);
        display: inline-flex;
        filter: drop-shadow(0 12px 28px color-mix(in oklab, var(--nami-color-primary), transparent 78%));
        justify-content: center;
      }

      .brand svg {
        block-size: 86px;
        display: block;
        inline-size: 108px;
      }

      .brand-ink {
        fill: currentColor;
      }

      .brand-accent {
        fill: var(--nami-color-primary);
      }

      .veil-track {
        background: var(--page-transition-progress-bg);
        border-radius: 999px;
        display: block;
        height: var(--page-transition-progress-height);
        inline-size: min(100%, 180px);
        overflow: hidden;
      }

      .veil-indicator {
        animation: nami-page-veil 1320ms var(--nami-ease-standard, ease) infinite;
        background: var(--page-transition-progress-fg);
        border-radius: inherit;
        display: block;
        height: 100%;
        transform: translateX(-52%) scaleX(0.44);
        transform-origin: left center;
        width: 64%;
      }

      :host([appearance='panel']) .panel {
        align-items: center;
        background: var(--page-transition-panel-bg);
        border: var(--nami-dialog-border-width, var(--nami-style-stroke-width, 1px)) solid var(--page-transition-panel-border);
        border-radius: var(--nami-dialog-radius, var(--nami-radius-surface));
        box-shadow: var(--page-transition-panel-shadow);
        display: inline-flex;
        gap: 12px;
        max-width: min(88vw, 360px);
        min-height: 56px;
        padding: 14px 18px;
        transform: translateY(8px) scale(0.98);
        transition: transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([active][appearance='panel']) .panel {
        transform: translateY(0) scale(1);
      }

      .indicator {
        align-items: center;
        color: var(--nami-color-primary);
        display: inline-flex;
        flex: 0 0 auto;
      }

      .label {
        color: var(--page-transition-panel-fg);
        display: none;
        font-size: 0.9375rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .label.has-content {
        display: inline;
      }

      @keyframes nami-page-veil {
        0% {
          transform: translateX(-56%) scaleX(0.36);
        }

        55% {
          transform: translateX(74%) scaleX(0.68);
        }

        100% {
          transform: translateX(158%) scaleX(0.32);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .base,
        .panel,
        .veil-indicator {
          transition-duration: 1ms;
        }

        .veil-indicator {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }

        .panel {
          transform: none;
        }
      }
    `
];
let s = t;
export {
  s as NamiPageTransition
};
