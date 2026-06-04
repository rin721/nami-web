import { i as v, c as g, a as w, b as x } from "../chunks/styles-DgWJnXXm.js";
import { e as i } from "../chunks/events-DtyLzvDt.js";
import { a as p } from "../chunks/index-BWFPQd53.js";
import { r as k } from "../chunks/is-svg-element-uTjuI1PZ.js";
const M = {
  some: 0,
  all: 1
};
function C(u, e, { root: t, margin: d, amount: n = "some" } = {}) {
  const b = k(u), o = /* @__PURE__ */ new WeakMap(), y = (l) => {
    l.forEach((s) => {
      const h = o.get(s.target);
      if (s.isIntersecting !== !!h)
        if (s.isIntersecting) {
          const f = e(s.target, s);
          typeof f == "function" ? o.set(s.target, f) : c.unobserve(s.target);
        } else typeof h == "function" && (h(s), o.delete(s.target));
    });
  }, c = new IntersectionObserver(y, {
    root: t,
    rootMargin: d,
    threshold: typeof n == "number" ? n : M[n]
  });
  return b.forEach((l) => c.observe(l)), () => c.disconnect();
}
const a = {
  "fade-up": {
    initial: { opacity: 0, transform: "translateY(24px)" },
    visible: { opacity: 1, transform: "translateY(0)" }
  },
  "fade-in": {
    initial: { opacity: 0 },
    visible: { opacity: 1 }
  },
  "slide-left": {
    initial: { opacity: 0, transform: "translateX(32px)" },
    visible: { opacity: 1, transform: "translateX(0)" }
  },
  "slide-right": {
    initial: { opacity: 0, transform: "translateX(-32px)" },
    visible: { opacity: 1, transform: "translateX(0)" }
  },
  "scale-in": {
    initial: { opacity: 0, transform: "scale(0.96)" },
    visible: { opacity: 1, transform: "scale(1)" }
  },
  "line-expand": {
    initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" }
  }
}, r = class r extends v {
  constructor() {
    super(), this.effect = "fade-up", this.once = !0, this.amount = "some", this.margin = "0px 0px -10% 0px", this.delay = 0, this.duration = 420, this.inViewState = !1, this.revealed = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.updateComplete.then(() => this.setupObserver());
  }
  disconnectedCallback() {
    this.cleanup(), super.disconnectedCallback();
  }
  updated(e) {
    [...e.keys()].some((t) => ["amount", "margin", "once"].includes(String(t))) && this.isConnected && this.setupObserver();
  }
  reveal() {
    this.inViewState = !0, this.revealed = !0;
    const e = this.shadowRoot?.querySelector('[part~="base"]');
    if (!e || this.shouldReduceMotion()) {
      e?.style.removeProperty("opacity"), e?.style.removeProperty("transform"), e?.style.removeProperty("clip-path"), i(this, "nami-reveal", { effect: this.effect });
      return;
    }
    const t = a[this.effect] ?? a["fade-up"];
    this.playback?.stop?.();
    try {
      this.playback = p(e, t.visible, {
        duration: Math.max(0, Number(this.duration)) / 1e3,
        delay: Math.max(0, Number(this.delay)) / 1e3,
        ease: [0.25, 0.46, 0.45, 0.94]
      });
    } catch {
      Object.assign(e.style, t.visible);
    }
    i(this, "nami-reveal", { effect: this.effect });
  }
  hide() {
    if (this.once) return;
    this.inViewState = !1, this.revealed = !1;
    const e = this.shadowRoot?.querySelector('[part~="base"]');
    if (!e || this.shouldReduceMotion()) {
      i(this, "nami-hide", { effect: this.effect });
      return;
    }
    const t = a[this.effect] ?? a["fade-up"];
    this.playback?.stop?.();
    try {
      this.playback = p(e, t.initial, {
        duration: Math.max(0, Number(this.duration)) / 1e3,
        ease: [0.25, 0.46, 0.45, 0.94]
      });
    } catch {
      Object.assign(e.style, t.initial);
    }
    i(this, "nami-hide", { effect: this.effect });
  }
  setupObserver() {
    if (this.cleanup(), !this.isConnected) return;
    if (!("IntersectionObserver" in window)) {
      this.reveal();
      return;
    }
    const t = {
      amount: this.normalizedAmount,
      margin: this.margin || "0px"
    };
    try {
      this.stopInView = C(
        this,
        () => (this.reveal(), () => this.hide()),
        t
      );
    } catch {
      this.reveal();
    }
  }
  cleanup() {
    this.stopInView?.(), this.stopInView = void 0, this.playback?.stop?.(), this.playback?.cancel?.(), this.playback = void 0;
  }
  get normalizedAmount() {
    if (this.amount === "all" || this.amount === "some") return this.amount;
    const e = Number(this.amount);
    return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : "some";
  }
  shouldReduceMotion() {
    return getComputedStyle(this).getPropertyValue("--nami-motion-normal").trim() === "1ms" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }
  render() {
    return x`<div class="base" part="base"><slot></slot></div>`;
  }
};
r.properties = {
  effect: { reflect: !0 },
  once: { type: Boolean, reflect: !0 },
  amount: { reflect: !0 },
  margin: { reflect: !0 },
  delay: { type: Number, reflect: !0 },
  duration: { type: Number, reflect: !0 },
  inViewState: { attribute: "in-view", type: Boolean, reflect: !0 },
  revealed: { type: Boolean, reflect: !0 }
}, r.styles = [
  g,
  w`
      :host {
        display: block;
      }

      .base {
        opacity: 0;
        transform: translateY(24px);
        transform-origin: center;
        will-change: opacity, transform, clip-path;
      }

      :host([effect='fade-in']) .base {
        transform: none;
      }

      :host([effect='slide-left']) .base {
        transform: translateX(32px);
      }

      :host([effect='slide-right']) .base {
        transform: translateX(-32px);
      }

      :host([effect='scale-in']) .base {
        transform: scale(0.96);
      }

      :host([effect='line-expand']) .base {
        clip-path: inset(0 100% 0 0);
        transform: none;
      }

      :host([revealed]) .base {
        clip-path: inset(0 0 0 0);
        opacity: 1;
        transform: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .base {
          clip-path: none;
          opacity: 1;
          transform: none;
        }
      }
    `
];
let m = r;
export {
  m as NamiScrollReveal
};
