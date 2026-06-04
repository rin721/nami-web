import { i as r, a as i, A as s, b as n } from "../chunks/lit-element-GeMXvhiH.js";
import { c as o } from "../chunks/styles-C6m3uqJJ.js";
const e = class e extends r {
  constructor() {
    super(), this.value = 0, this.max = 100, this.label = "", this.indeterminate = !1;
  }
  updated() {
    const a = this.max > 0 ? Math.min(100, Math.max(0, this.value / this.max * 100)) : 0;
    this.style.setProperty("--nami-progress-value", `${a}%`), this.dataset.state = this.indeterminate ? "indeterminate" : "determinate";
  }
  render() {
    const a = this.max > 0 ? Math.min(this.max, Math.max(0, this.value)) : 0;
    return this.max > 0 && a / this.max * 100, n`
      <div
        class="track"
        part="base track"
        role="progressbar"
        aria-label=${this.label || "Progress"}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? s : a}
      >
        <div class="fill" part="indicator"></div>
      </div>
    `;
  }
};
e.properties = {
  value: { type: Number, reflect: !0 },
  max: { type: Number, reflect: !0 },
  label: {},
  indeterminate: { type: Boolean, reflect: !0 }
}, e.styles = [
  o,
  i`
      :host {
        display: block;
      }

      .track {
        background: var(--nami-progress-track-bg, color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%));
        border-radius: var(--nami-progress-radius, var(--nami-radius-control, 999px));
        height: var(--nami-progress-height, 8px);
        overflow: hidden;
        position: relative;
      }

      .fill {
        background: var(--nami-progress-fill-bg, var(--nami-color-primary));
        border-radius: inherit;
        height: 100%;
        transform-origin: left center;
        transition: width var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: var(--nami-progress-value, 0%);
      }

      :host([indeterminate]) .fill {
        animation: nami-progress-indeterminate 1180ms var(--nami-ease-standard, ease) infinite;
        width: 48%;
      }

      @keyframes nami-progress-indeterminate {
        0% {
          transform: translateX(-110%) scaleX(0.56);
        }
        55% {
          transform: translateX(92%) scaleX(0.92);
        }
        100% {
          transform: translateX(210%) scaleX(0.56);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .fill {
          transition-duration: 1ms;
        }

        :host([indeterminate]) .fill {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `
];
let t = e;
export {
  t as NamiProgress
};
