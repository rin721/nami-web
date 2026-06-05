import { i as l, a as h, A as o, b as m } from "../chunks/lit-element-GeMXvhiH.js";
import { m as c } from "../chunks/runtime-4rCsJ4EI.js";
import { u } from "../chunks/localized-controller-BapUPJ8o.js";
import { s as g, b as d } from "../chunks/selection-CrKkvo5N.js";
import { c as f } from "../chunks/styles-C6m3uqJJ.js";
const t = class t extends l {
  constructor() {
    super(), this.enterTimer = 0, this.hideTimer = 0, this.shownAt = 0, u(this), this.active = !1, this.appear = !0, this.appearDuration = 360, this.duration = 220, this.effect = "flow", this.entering = !1, this.height = 4, this.label = "", this.progress = void 0, this.variant = "fixed", this.visible = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.active && (this.visible = !0, this.shownAt = Date.now(), this.beginEnter());
  }
  disconnectedCallback() {
    window.clearTimeout(this.enterTimer), window.clearTimeout(this.hideTimer), this.hideResolver?.(), super.disconnectedCallback();
  }
  updated(e) {
    if (g(this, {
      state: d(this.active),
      loading: this.active
    }), e.has("progress") && this.syncProgressStyle(), e.has("appear") && !this.appear && (window.clearTimeout(this.enterTimer), this.entering = !1), e.has("appearDuration") && this.syncAppearDurationStyle(), e.has("height") && this.syncHeightStyle(), e.has("duration") && this.syncDurationStyle(), !e.has("active")) return;
    if (window.clearTimeout(this.hideTimer), this.active) {
      this.hideResolver?.(), this.hideComplete = void 0, this.visible = !0, this.shownAt = Date.now(), this.beginEnter();
      return;
    }
    window.clearTimeout(this.enterTimer), this.entering = !1;
    const r = Date.now() - this.shownAt, a = Math.max(0, Number(this.duration) - r);
    this.hideComplete = new Promise((i) => {
      this.hideResolver = i;
    }), this.hideTimer = window.setTimeout(() => {
      this.active || (this.visible = !1), this.hideResolver?.(), this.hideResolver = void 0;
    }, a);
  }
  show(e = {}) {
    const r = !this.visible;
    this.applyOptions(e), this.visible = !0, this.shownAt = Date.now(), this.active = !0, r && this.beginEnter();
  }
  start(e = {}) {
    this.show(e);
  }
  set(e) {
    this.progress = e ?? void 0;
  }
  async finish(e = {}) {
    this.applyOptions({ ...e, progress: e.progress ?? 100 }), this.active = !0, await this.updateComplete, await new Promise((r) => window.setTimeout(r, Number(e.minDuration ?? this.duration))), await this.hide({ ...e, progress: null });
  }
  async hide(e = {}) {
    this.applyOptions(e), this.active = !1, await this.updateComplete, this.hideComplete && await this.hideComplete;
  }
  async waitFor(e, r = {}) {
    const a = r.minDuration ?? this.duration, i = Date.now();
    this.show(r);
    try {
      return await (typeof e == "function" ? e() : e);
    } finally {
      const s = Math.max(0, Number(a) - (Date.now() - i));
      s > 0 && await new Promise((p) => window.setTimeout(p, s)), await this.finish(r);
    }
  }
  applyOptions(e) {
    e.appear !== void 0 && (this.appear = e.appear), e.appearDuration !== void 0 && (this.appearDuration = e.appearDuration), e.duration !== void 0 && (this.duration = e.duration), e.effect && (this.effect = e.effect), e.height !== void 0 && (this.height = e.height), e.label !== void 0 && (this.label = e.label), e.variant && (this.variant = e.variant), e.progress !== void 0 && this.set(e.progress);
  }
  beginEnter() {
    if (window.clearTimeout(this.enterTimer), !this.appear) {
      this.entering = !1;
      return;
    }
    this.entering = !0;
    const e = Number.isFinite(Number(this.appearDuration)) ? Math.max(0, Number(this.appearDuration)) : 360;
    this.enterTimer = window.setTimeout(() => {
      this.entering = !1;
    }, e + 40);
  }
  syncProgressStyle() {
    if (this.progress === void 0 || this.progress === null || Number.isNaN(Number(this.progress))) {
      this.style.removeProperty("--nami-top-progress-value");
      return;
    }
    const e = Math.min(100, Math.max(0, Number(this.progress)));
    this.style.setProperty("--nami-top-progress-value", `${e}%`);
  }
  syncHeightStyle() {
    if (!Number.isFinite(Number(this.height)) || Number(this.height) <= 0) {
      this.style.removeProperty("--nami-top-progress-height");
      return;
    }
    this.style.setProperty("--nami-top-progress-height", `${Number(this.height)}px`);
  }
  syncAppearDurationStyle() {
    if (!Number.isFinite(Number(this.appearDuration)) || Number(this.appearDuration) < 0) {
      this.style.removeProperty("--nami-top-progress-appear-duration");
      return;
    }
    this.style.setProperty("--nami-top-progress-appear-duration", `${Number(this.appearDuration)}ms`);
  }
  syncDurationStyle() {
    if (!Number.isFinite(Number(this.duration)) || Number(this.duration) < 0) {
      this.style.removeProperty("--nami-top-progress-duration");
      return;
    }
    this.style.setProperty("--nami-top-progress-duration", `${Number(this.duration)}ms`);
  }
  get fallbackLabel() {
    return this.label || c("Navigating", { id: "nami.topProgress.navigating" });
  }
  render() {
    if (!this.visible) return o;
    const e = this.progress !== void 0 && this.progress !== null && !Number.isNaN(Number(this.progress));
    return m`
      <div class="base" part="base">
        <span
          class="track"
          part="track"
          role="progressbar"
          aria-label=${this.fallbackLabel}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${e ? String(Math.round(Number(this.progress))) : o}
        >
          <span class="indicator" part="indicator"></span>
        </span>
      </div>
    `;
  }
};
t.properties = {
  active: { type: Boolean, reflect: !0 },
  appear: {
    converter: {
      fromAttribute: (e) => e !== null && e !== "false" && e !== "0" && e !== "none",
      toAttribute: (e) => e ? "true" : "false"
    },
    reflect: !0
  },
  appearDuration: { type: Number, attribute: "appear-duration", reflect: !0 },
  duration: { type: Number, reflect: !0 },
  effect: { reflect: !0 },
  entering: { type: Boolean, reflect: !0 },
  height: { type: Number, reflect: !0 },
  label: {},
  progress: { type: Number, reflect: !0 },
  variant: { reflect: !0 },
  visible: { state: !0 }
}, t.styles = [
  f,
  h`
      :host {
        --top-progress-height: var(--nami-top-progress-height, var(--nami-transition-progress-height, 4px));
        --top-progress-duration: var(--nami-top-progress-duration, 220ms);
        --top-progress-ease: var(--nami-top-progress-ease, var(--nami-ease-standard, cubic-bezier(0.19, 1, 0.22, 1)));
        --top-progress-appear-duration: var(--nami-top-progress-appear-duration, 360ms);
        --top-progress-appear-ease: var(
          --nami-top-progress-appear-ease,
          var(--nami-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1))
        );
        --top-progress-indeterminate-duration: var(--nami-top-progress-indeterminate-duration, 1280ms);
        --top-progress-track-bg: var(
          --nami-top-progress-track-bg,
          color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 78%)
        );
        --top-progress-fill-bg: var(
          --nami-top-progress-fill-bg,
          color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 10%)
        );
        --top-progress-shadow: var(
          --nami-top-progress-shadow,
          0 8px 24px color-mix(in oklab, var(--nami-color-primary), transparent 78%)
        );
        --top-progress-z-index: var(--nami-top-progress-z-index, 2147483647);
        display: contents;
      }

      .base {
        box-sizing: border-box;
        inset-block-start: 0;
        inset-inline: 0 -4px;
        pointer-events: none;
        position: fixed;
        z-index: var(--top-progress-z-index);
      }

      :host([variant='inline']) .base {
        inset: 0;
        position: absolute;
      }

      .track {
        background: var(--top-progress-track-bg);
        block-size: var(--top-progress-height);
        box-shadow: var(--top-progress-shadow);
        display: block;
        inline-size: 100%;
        overflow: clip;
        position: relative;
        transform: scaleY(0);
        transform-origin: center top;
        transition: transform var(--top-progress-duration) var(--top-progress-ease);
      }

      :host([active]) .track {
        transform: scaleY(1);
      }

      :host([entering]) .track {
        animation: nami-top-progress-appear-track var(--top-progress-appear-duration) var(--top-progress-appear-ease) both;
        transform-origin: left top;
      }

      :host([variant='inline']) .track {
        border-radius: var(--nami-radius-control, 999px);
        box-shadow: none;
      }

      .indicator {
        animation: nami-top-progress-flow var(--top-progress-indeterminate-duration) var(--top-progress-ease) infinite;
        background-color: var(--top-progress-fill-bg);
        background-image: linear-gradient(
          90deg,
          var(--top-progress-fill-bg) 0%,
          color-mix(in oklab, var(--top-progress-fill-bg), white 18%) 56%,
          var(--top-progress-fill-bg) 100%
        );
        block-size: 100%;
        border-radius: 0 999px 999px 0;
        box-shadow:
          inset 0 0 0 1px color-mix(in oklab, var(--nami-color-primary), white 24%),
          0 0 18px color-mix(in oklab, var(--nami-color-primary), transparent 52%);
        display: block;
        inline-size: 46%;
        overflow: hidden;
        position: relative;
        transform: translateX(-62%) scaleX(0.44);
        transform-origin: left center;
        will-change: inline-size, transform, filter;
      }

      .indicator::after {
        animation: nami-top-progress-sheen var(--top-progress-indeterminate-duration) var(--top-progress-ease) infinite;
        background: linear-gradient(
          90deg,
          transparent 0%,
          color-mix(in oklab, white, transparent 52%) 48%,
          transparent 100%
        );
        content: '';
        inset: 0;
        opacity: 0.72;
        position: absolute;
        transform: translateX(-130%);
      }

      :host([progress]) .indicator {
        animation: none;
        inline-size: var(--nami-top-progress-value, 0%);
        transform: none;
        transition:
          inline-size var(--top-progress-duration) var(--top-progress-ease),
          filter var(--top-progress-duration) var(--top-progress-ease);
      }

      :host([entering][progress]) .indicator {
        animation: nami-top-progress-appear-indicator var(--top-progress-appear-duration) var(--top-progress-appear-ease)
          both;
      }

      :host([effect='slide']) .indicator {
        animation-name: nami-top-progress-slide;
        background-image: none;
      }

      :host([effect='slide']) .indicator::after {
        display: none;
      }

      :host([effect='pulse']) .indicator {
        animation-name: nami-top-progress-pulse;
        background-image: none;
        inline-size: 50%;
      }

      :host([effect='pulse']) .indicator::after {
        animation-name: nami-top-progress-sheen-soft;
        opacity: 0.38;
      }

      :host([progress][effect='pulse']) .indicator {
        animation: nami-top-progress-breathe 940ms ease-in-out infinite;
      }

      @keyframes nami-top-progress-flow {
        0% {
          transform: translateX(-64%) scaleX(0.34);
        }

        42% {
          transform: translateX(34%) scaleX(0.82);
        }

        72% {
          transform: translateX(92%) scaleX(0.58);
        }

        100% {
          transform: translateX(166%) scaleX(0.3);
        }
      }

      @keyframes nami-top-progress-appear-track {
        0% {
          opacity: 0;
          transform: translateX(-10px) scaleX(0.08) scaleY(1);
        }

        42% {
          opacity: 1;
        }

        100% {
          opacity: 1;
          transform: translateX(0) scaleX(1) scaleY(1);
        }
      }

      @keyframes nami-top-progress-appear-indicator {
        0% {
          filter: brightness(1.08) saturate(1.08);
          transform: scaleX(0.08);
        }

        100% {
          filter: brightness(1) saturate(1);
          transform: scaleX(1);
        }
      }

      @keyframes nami-top-progress-slide {
        0% {
          transform: translateX(-72%) scaleX(0.42);
        }

        55% {
          transform: translateX(80%) scaleX(0.66);
        }

        100% {
          transform: translateX(168%) scaleX(0.38);
        }
      }

      @keyframes nami-top-progress-pulse {
        0% {
          filter: brightness(0.98) saturate(0.96);
          transform: translateX(-54%) scaleX(0.28);
        }

        46% {
          filter: brightness(1.12) saturate(1.18);
          transform: translateX(64%) scaleX(0.74);
        }

        100% {
          filter: brightness(1) saturate(1);
          transform: translateX(152%) scaleX(0.34);
        }
      }

      @keyframes nami-top-progress-sheen {
        0% {
          transform: translateX(-130%);
        }

        55% {
          transform: translateX(86%);
        }

        100% {
          transform: translateX(150%);
        }
      }

      @keyframes nami-top-progress-sheen-soft {
        0%,
        24% {
          transform: translateX(-130%);
        }

        72% {
          transform: translateX(96%);
        }

        100% {
          transform: translateX(150%);
        }
      }

      @keyframes nami-top-progress-breathe {
        0%,
        100% {
          filter: brightness(1) saturate(1);
        }

        50% {
          filter: brightness(1.12) saturate(1.14);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .track,
        .indicator {
          transition-duration: 1ms;
        }

        .track,
        .indicator,
        .indicator::after {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `
];
let n = t;
export {
  n as NamiTopProgress
};
