import { i as $, c as G, a as j, b as U } from "../chunks/styles-DgWJnXXm.js";
import { e as K } from "../chunks/events-DtyLzvDt.js";
import { i as J, r as q, a as Q, f as p, c as T, s as X, b as Z, p as _, v as ee, d as te, e as ne, g as se, w as re, n as F, h as ie } from "../chunks/is-svg-element-uTjuI1PZ.js";
function oe(e) {
  return J(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
const y = /* @__PURE__ */ new WeakMap();
let b;
const D = (e, t, s) => (n, r) => r && r[0] ? r[0][e + "Size"] : Q(n) && "getBBox" in n ? n.getBBox()[t] : n[s], ae = /* @__PURE__ */ D("inline", "width", "offsetWidth"), le = /* @__PURE__ */ D("block", "height", "offsetHeight");
function ce({ target: e, borderBoxSize: t }) {
  y.get(e)?.forEach((s) => {
    s(e, {
      get width() {
        return ae(e, t);
      },
      get height() {
        return le(e, t);
      }
    });
  });
}
function de(e) {
  e.forEach(ce);
}
function he() {
  typeof ResizeObserver > "u" || (b = new ResizeObserver(de));
}
function fe(e, t) {
  b || he();
  const s = q(e);
  return s.forEach((n) => {
    let r = y.get(n);
    r || (r = /* @__PURE__ */ new Set(), y.set(n, r)), r.add(t), b?.observe(n);
  }), () => {
    s.forEach((n) => {
      const r = y.get(n);
      r?.delete(t), r?.size || b?.unobserve(n);
    });
  };
}
const x = /* @__PURE__ */ new Set();
let u;
function ue() {
  u = () => {
    const e = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    x.forEach((t) => t(e));
  }, window.addEventListener("resize", u);
}
function me(e) {
  return x.add(e), u || ue(), () => {
    x.delete(e), !x.size && typeof u == "function" && (window.removeEventListener("resize", u), u = void 0);
  };
}
function ge(e, t) {
  return typeof e == "function" ? me(e) : fe(e, t);
}
function R(e, t) {
  let s;
  const n = () => {
    const { currentTime: r } = t, o = (r === null ? 0 : r.value) / 100;
    s !== o && e(o), s = o;
  };
  return p.preUpdate(n, !0), () => T(n);
}
function E(e) {
  return typeof window > "u" ? !1 : e ? X() : Z();
}
const pe = 50, z = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), ve = () => ({
  time: 0,
  x: z(),
  y: z()
}), we = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function H(e, t, s, n) {
  const r = s[t], { length: i, position: o } = we[t], a = r.current, d = s.time;
  r.current = Math.abs(e[`scroll${o}`]), r.scrollLength = e[`scroll${i}`] - e[`client${i}`], r.offset.length = 0, r.offset[0] = 0, r.offset[1] = r.scrollLength, r.progress = _(0, r.scrollLength, r.current);
  const l = n - d;
  r.velocity = l > pe ? 0 : ee(r.current - a, l);
}
function ye(e, t, s) {
  H(e, "x", t, s), H(e, "y", t, s), t.time = s;
}
function be(e, t) {
  const s = { x: 0, y: 0 };
  let n = e;
  for (; n && n !== t; )
    if (oe(n))
      s.x += n.offsetLeft, s.y += n.offsetTop, n = n.offsetParent;
    else if (n.tagName === "svg") {
      const r = n.getBoundingClientRect();
      n = n.parentElement;
      const i = n.getBoundingClientRect();
      s.x += r.left - i.left, s.y += r.top - i.top;
    } else if (n instanceof SVGGraphicsElement) {
      const { x: r, y: i } = n.getBBox();
      s.x += r, s.y += i;
      let o = null, a = n.parentNode;
      for (; !o; )
        a.tagName === "svg" && (o = a), a = n.parentNode;
      n = o;
    } else
      break;
  return s;
}
const W = {
  start: 0,
  center: 0.5,
  end: 1
};
function L(e, t, s = 0) {
  let n = 0;
  if (e in W && (e = W[e]), typeof e == "string") {
    const r = parseFloat(e);
    e.endsWith("px") ? n = r : e.endsWith("%") ? e = r / 100 : e.endsWith("vw") ? n = r / 100 * document.documentElement.clientWidth : e.endsWith("vh") ? n = r / 100 * document.documentElement.clientHeight : e = r;
  }
  return typeof e == "number" && (n = t * e), s + n;
}
const xe = [0, 0];
function Ee(e, t, s, n) {
  let r = Array.isArray(e) ? e : xe, i = 0, o = 0;
  return typeof e == "number" ? r = [e, e] : typeof e == "string" && (e = e.trim(), e.includes(" ") ? r = e.split(" ") : r = [e, W[e] ? e : "0"]), i = L(r[0], s, n), o = L(r[1], t), i - o;
}
const v = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
}, ke = { x: 0, y: 0 };
function Se(e) {
  return "getBBox" in e && e.tagName !== "svg" ? e.getBBox() : { width: e.clientWidth, height: e.clientHeight };
}
function Te(e, t, s) {
  const { offset: n = v.All } = s, { target: r = e, axis: i = "y" } = s, o = i === "y" ? "height" : "width", a = r !== e ? be(r, e) : ke, d = r === e ? { width: e.scrollWidth, height: e.scrollHeight } : Se(r), l = {
    width: e.clientWidth,
    height: e.clientHeight
  };
  t[i].offset.length = 0;
  let c = !t[i].interpolate;
  const m = n.length;
  for (let h = 0; h < m; h++) {
    const g = Ee(n[h], l[o], d[o], a[i]);
    !c && g !== t[i].interpolatorOffsets[h] && (c = !0), t[i].offset[h] = g;
  }
  c && (t[i].interpolate = te(t[i].offset, ne(n), { clamp: !1 }), t[i].interpolatorOffsets = [...t[i].offset]), t[i].progress = se(0, 1, t[i].interpolate(t[i].current));
}
function We(e, t = e, s) {
  if (s.x.targetOffset = 0, s.y.targetOffset = 0, t !== e) {
    let n = t;
    for (; n && n !== e; )
      s.x.targetOffset += n.offsetLeft, s.y.targetOffset += n.offsetTop, n = n.offsetParent;
  }
  s.x.targetLength = t === e ? t.scrollWidth : t.clientWidth, s.y.targetLength = t === e ? t.scrollHeight : t.clientHeight, s.x.containerLength = e.clientWidth, s.y.containerLength = e.clientHeight, process.env.NODE_ENV !== "production" && e && t && t !== e && e !== document.documentElement && e !== document.scrollingElement && e !== document.body && re(getComputedStyle(e).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function ze(e, t, s, n = {}) {
  return {
    measure: (r) => {
      We(e, n.target, s), ye(e, s, r), (n.offset || n.target) && Te(e, s, n);
    },
    notify: () => t(s)
  };
}
const f = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), w = /* @__PURE__ */ new WeakMap(), B = (e) => e === document.scrollingElement ? window : e;
function Y(e, { container: t = document.scrollingElement, trackContentSize: s = !1, ...n } = {}) {
  if (!t)
    return F;
  let r = S.get(t);
  r || (r = /* @__PURE__ */ new Set(), S.set(t, r));
  const i = ve(), o = ze(t, e, i, n);
  if (r.add(o), !f.has(t)) {
    const d = () => {
      for (const h of r)
        h.measure(ie.timestamp);
      p.preUpdate(l);
    }, l = () => {
      for (const h of r)
        h.notify();
    }, c = () => p.read(d);
    f.set(t, c);
    const m = B(t);
    window.addEventListener("resize", c), t !== document.documentElement && O.set(t, ge(t, c)), m.addEventListener("scroll", c), c();
  }
  if (s && !w.has(t)) {
    const d = f.get(t), l = {
      width: t.scrollWidth,
      height: t.scrollHeight
    };
    C.set(t, l);
    const c = () => {
      const h = t.scrollWidth, g = t.scrollHeight;
      (l.width !== h || l.height !== g) && (d(), l.width = h, l.height = g);
    }, m = p.read(c, !0);
    w.set(t, m);
  }
  const a = f.get(t);
  return p.read(a, !1, !0), () => {
    T(a);
    const d = S.get(t);
    if (!d || (d.delete(o), d.size))
      return;
    const l = f.get(t);
    f.delete(t), l && (B(t).removeEventListener("scroll", l), O.get(t)?.(), window.removeEventListener("resize", l));
    const c = w.get(t);
    c && (T(c), w.delete(t)), C.delete(t);
  };
}
const He = [
  [v.Enter, "entry"],
  [v.Exit, "exit"],
  [v.Any, "cover"],
  [v.All, "contain"]
], M = {
  start: 0,
  end: 1
};
function Le(e) {
  const t = e.trim().split(/\s+/);
  if (t.length !== 2)
    return;
  const s = M[t[0]], n = M[t[1]];
  if (!(s === void 0 || n === void 0))
    return [s, n];
}
function Oe(e) {
  if (e.length !== 2)
    return;
  const t = [];
  for (const s of e)
    if (Array.isArray(s))
      t.push(s);
    else if (typeof s == "string") {
      const n = Le(s);
      if (!n)
        return;
      t.push(n);
    } else
      return;
  return t;
}
function Ce(e, t) {
  const s = Oe(e);
  if (!s)
    return !1;
  for (let n = 0; n < 2; n++) {
    const r = s[n], i = t[n];
    if (r[0] !== i[0] || r[1] !== i[1])
      return !1;
  }
  return !0;
}
function I(e) {
  if (!e)
    return { rangeStart: "contain 0%", rangeEnd: "contain 100%" };
  for (const [t, s] of He)
    if (Ce(e, t))
      return { rangeStart: `${s} 0%`, rangeEnd: `${s} 100%` };
}
const N = /* @__PURE__ */ new Map();
function P(e) {
  const t = { value: 0 }, s = Y((n) => {
    t.value = n[e.axis].progress * 100;
  }, e);
  return { currentTime: t, cancel: s };
}
function V({ source: e, container: t, ...s }) {
  const { axis: n } = s;
  e && (t = e);
  let r = N.get(t);
  r || (r = /* @__PURE__ */ new Map(), N.set(t, r));
  const i = s.target ?? "self";
  let o = r.get(i);
  o || (o = {}, r.set(i, o));
  const a = n + (s.offset ?? []).join(",");
  return o[a] || (s.target && E(s.target) ? I(s.offset) ? o[a] = new ViewTimeline({
    subject: s.target,
    axis: n
  }) : o[a] = P({
    container: t,
    ...s
  }) : E() ? o[a] = new ScrollTimeline({
    source: t,
    axis: n
  }) : o[a] = P({
    container: t,
    ...s
  })), o[a];
}
function Be(e, t) {
  const s = V(t), n = t.target ? I(t.offset) : void 0, r = t.target ? E(t.target) && !!n : E();
  return e.attachTimeline({
    timeline: r ? s : void 0,
    ...n && r && {
      rangeStart: n.rangeStart,
      rangeEnd: n.rangeEnd
    },
    observe: (i) => (i.pause(), R((o) => {
      i.time = i.iterationDuration * o;
    }, s))
  });
}
function Me(e) {
  return e && (e.target || e.offset);
}
function Ne(e) {
  return e.length === 2;
}
function Pe(e, t) {
  return Ne(e) || Me(t) ? Y((s) => {
    e(s[t.axis].progress, s);
  }, t) : R(e, V(t));
}
function Ae(e, { axis: t = "y", container: s = document.scrollingElement, ...n } = {}) {
  if (!s)
    return F;
  const r = { axis: t, container: s, ...n };
  return typeof e == "function" ? Pe(e, r) : Be(e, r);
}
const k = class k extends $ {
  constructor() {
    super(), this.lastY = 0, this.stateSnapshot = "", this.handleNativeScroll = () => {
      this.syncFromScroll(this.readScrollY());
    }, this.threshold = 20, this.hideThreshold = 56, this.hidden = !1, this.elevated = !1, this.direction = "idle";
  }
  connectedCallback() {
    super.connectedCallback(), this.lastY = this.readScrollY(), this.syncFromScroll(this.lastY), window.addEventListener("scroll", this.handleNativeScroll, { passive: !0 });
    try {
      this.motionCancel = Ae((t, s) => {
        this.syncFromScroll(s.y.current, t);
      });
    } catch {
      this.motionCancel = void 0;
    }
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this.handleNativeScroll), this.motionCancel?.(), this.motionCancel = void 0, super.disconnectedCallback();
  }
  sync() {
    this.syncFromScroll(this.readScrollY());
  }
  readScrollY() {
    return Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
  }
  readProgress(t) {
    const s = document.documentElement, n = Math.max(1, s.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, t / n));
  }
  syncFromScroll(t, s = this.readProgress(t)) {
    const n = t > this.lastY ? "down" : t < this.lastY ? "up" : this.direction, r = t > Number(this.threshold), i = n === "down" && t > Number(this.hideThreshold);
    this.lastY = t, this.direction = n, this.elevated = r, this.hidden = i;
    const o = {
      scrollY: Math.round(t),
      progress: s,
      direction: this.direction,
      hidden: this.hidden,
      elevated: this.elevated
    }, a = JSON.stringify(o);
    a !== this.stateSnapshot && (this.stateSnapshot = a, K(this, "nami-scroll-state", o));
  }
  render() {
    return U`
      <div class="base" part="base">
        <div class="backdrop" part="backdrop" aria-hidden="true"></div>
        <div class="content" part="content"><slot></slot></div>
        <div class="edge" part="edge" aria-hidden="true"></div>
      </div>
    `;
  }
};
k.properties = {
  threshold: { type: Number, reflect: !0 },
  hideThreshold: { attribute: "hide-threshold", type: Number, reflect: !0 },
  hidden: { type: Boolean, reflect: !0 },
  elevated: { type: Boolean, reflect: !0 },
  direction: { reflect: !0 }
}, k.styles = [
  G,
  j`
      :host {
        --scroll-header-bg: var(--nami-scroll-header-bg, var(--nami-surface-overlay, color-mix(in oklab, #fff, transparent 18%)));
        --scroll-header-border: var(--nami-scroll-header-border, var(--nami-border, color-mix(in oklab, #000, transparent 88%)));
        --scroll-header-height: var(--nami-scroll-header-height, 56px);
        --scroll-header-shadow: var(
          --nami-scroll-header-shadow,
          0 12px 32px color-mix(in oklab, var(--nami-shadow-color, #64748b), transparent 78%)
        );
        --scroll-header-z-index: var(--nami-scroll-header-z-index, 40);
        display: block;
        position: sticky;
        top: var(--nami-scroll-header-top, 0);
        z-index: var(--scroll-header-z-index);
      }

      .base {
        color: var(--nami-text, #171717);
        min-height: var(--scroll-header-height);
        position: relative;
        transform: translateY(0);
        transition:
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        will-change: transform;
      }

      :host([hidden]) .base {
        transform: translateY(-100%);
      }

      .backdrop {
        background: var(--scroll-header-bg);
        inset: 0;
        opacity: 0;
        position: absolute;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          backdrop-filter var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([elevated]) .backdrop {
        -webkit-backdrop-filter: blur(20px) saturate(1.32);
        backdrop-filter: blur(20px) saturate(1.32);
        opacity: 1;
      }

      :host([elevated]) .base {
        box-shadow: var(--scroll-header-shadow);
      }

      .edge {
        background: linear-gradient(90deg, transparent, var(--scroll-header-border), var(--nami-color-primary, #3b82f6), var(--scroll-header-border), transparent);
        block-size: var(--nami-scroll-header-edge-height, 1px);
        inset-block-end: 0;
        inset-inline: 0;
        opacity: 0;
        position: absolute;
        transition: opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([elevated]) .edge {
        opacity: 1;
      }

      .content {
        align-items: center;
        display: flex;
        min-height: var(--scroll-header-height);
        position: relative;
        z-index: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .base,
        .backdrop,
        .edge {
          transition-duration: 1ms;
        }
      }
    `
];
let A = k;
export {
  A as NamiScrollHeader
};
