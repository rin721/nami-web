import { i as e, c as i, a as r, b as s } from "../chunks/styles-DgWJnXXm.js";
const a = class a extends e {
  constructor() {
    super(), this.variant = "text", this.animated = !0;
  }
  updated() {
    this.dataset.state = this.animated ? "loading" : "idle";
  }
  render() {
    return s`<span class="base" part="base" aria-hidden="true"><slot></slot></span>`;
  }
};
a.properties = {
  variant: { reflect: !0 },
  animated: { type: Boolean, reflect: !0 }
}, a.styles = [
  i,
  r`
      :host {
        display: block;
      }

      .base {
        background:
          linear-gradient(90deg, transparent, var(--nami-skeleton-highlight, rgb(255 255 255 / 0.48)), transparent),
          var(--nami-skeleton-bg, var(--nami-hover-overlay));
        background-size: 220% 100%, auto;
        border-radius: var(--nami-radius-surface, 6px);
        display: block;
        min-height: 1rem;
        overflow: hidden;
      }

      :host([variant='text']) .base {
        border-radius: var(--nami-radius-control, 999px);
        min-height: 0.875rem;
        width: 100%;
      }

      :host([variant='circle']) .base {
        aspect-ratio: 1;
        border-radius: 50%;
      }

      :host([animated]) .base {
        animation: nami-skeleton var(--nami-motion-slow, 700ms) linear infinite;
      }

      @keyframes nami-skeleton {
        from {
          background-position: 120% 0, 0 0;
        }
        to {
          background-position: -120% 0, 0 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([animated]) .base {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `
];
let t = a;
export {
  t as NamiSkeleton
};
