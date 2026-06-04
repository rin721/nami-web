import { i as e, c as o, a as r, b as s } from "../chunks/styles-DgWJnXXm.js";
const t = class t extends e {
  constructor() {
    super(), this.railWidth = "", this.mobileBarHeight = "", this.breakpoint = "compact", this.sticky = !0, this.safeArea = !1;
  }
  updated() {
    this.railWidth ? this.style.setProperty("--nami-app-shell-rail-width", this.normalizeLength(this.railWidth)) : this.style.removeProperty("--nami-app-shell-rail-width"), this.mobileBarHeight ? this.style.setProperty("--nami-app-shell-mobile-bar-height", this.normalizeLength(this.mobileBarHeight)) : this.style.removeProperty("--nami-app-shell-mobile-bar-height");
  }
  normalizeLength(a) {
    return /^\d+(\.\d+)?$/.test(a) ? `${a}px` : a;
  }
  render() {
    return s`
      <div class="shell" part="base">
        <aside class="rail" part="rail"><slot name="rail"></slot></aside>
        <header class="top" part="top"><slot name="top"></slot></header>
        <main part="control"><slot></slot></main>
        <nav class="bottom" part="bottom"><slot name="bottom"></slot></nav>
      </div>
    `;
  }
};
t.properties = {
  railWidth: { attribute: "rail-width" },
  mobileBarHeight: { attribute: "mobile-bar-height" },
  breakpoint: { reflect: !0 },
  sticky: { type: Boolean, reflect: !0 },
  safeArea: { attribute: "safe-area", type: Boolean, reflect: !0 }
}, t.styles = [
  o,
  r`
      :host {
        display: block;
        min-height: 100dvh;
      }

      .shell {
        background: var(--nami-surface);
        background-image: var(--nami-style-background-pattern, none);
        background-size: var(--nami-style-background-size, auto);
        color: var(--nami-text);
        min-height: 100dvh;
      }

      .rail {
        background: var(--nami-surface-overlay);
        border-right: var(--nami-app-shell-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-border);
        box-shadow: var(--nami-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--nami-shadow-color), transparent 70%));
        bottom: 0;
        display: flex;
        flex-direction: column;
        left: 0;
        position: fixed;
        top: 0;
        width: var(--nami-app-shell-rail-width, 56px);
        z-index: 20;
      }

      :host(:not([sticky])) .rail {
        position: absolute;
      }

      .top,
      .bottom {
        display: none;
      }

      main {
        min-height: 100dvh;
        padding-left: var(--nami-app-shell-rail-width, 56px);
      }

      @media (width <= 639px) {
        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) .rail {
          display: none;
        }

        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) .top,
        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) .bottom {
          display: block;
        }

        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) main {
          padding: var(--nami-app-shell-mobile-bar-height, 56px) 0;
        }
      }

      @media (width <= 880px) {
        :host([breakpoint='medium']) .rail {
          display: none;
        }

        :host([breakpoint='medium']) .top,
        :host([breakpoint='medium']) .bottom {
          display: block;
        }

        :host([breakpoint='medium']) main {
          padding: var(--nami-app-shell-mobile-bar-height, 56px) 0;
        }
      }

      @media (width <= 1080px) {
        :host([breakpoint='wide']) .rail {
          display: none;
        }

        :host([breakpoint='wide']) .top,
        :host([breakpoint='wide']) .bottom {
          display: block;
        }

        :host([breakpoint='wide']) main {
          padding: var(--nami-app-shell-mobile-bar-height, 56px) 0;
        }
      }

      @media (width <= 1080px) {
        .top,
        .bottom {
          background: var(--nami-surface-overlay);
          border-color: var(--nami-border);
          box-shadow: var(--nami-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--nami-shadow-color), transparent 70%));
          height: var(--nami-app-shell-mobile-bar-height, 56px);
          left: 0;
          position: fixed;
          right: 0;
          z-index: 20;
        }

        .top {
          border-bottom: 1px solid var(--nami-border);
          top: 0;
        }

        .bottom {
          border-top: 1px solid var(--nami-border);
          bottom: 0;
        }

        :host([safe-area]) .top {
          height: calc(var(--nami-app-shell-mobile-bar-height, 56px) + env(safe-area-inset-top));
          padding-top: env(safe-area-inset-top);
        }

        :host([safe-area]) .bottom {
          height: calc(var(--nami-app-shell-mobile-bar-height, 56px) + env(safe-area-inset-bottom));
          padding-bottom: env(safe-area-inset-bottom);
        }
      }
    `
];
let i = t;
export {
  i as NamiAppShell
};
