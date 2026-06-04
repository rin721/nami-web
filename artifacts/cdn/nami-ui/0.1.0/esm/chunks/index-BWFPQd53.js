import { n as vt, j as J, h as pt, M as Q, c as Mt, f as L, g as ot, k as Lt, v as Pe, e as Be, d as Pn, l as Bn, m as On, o as $t, q as f, t as In, b as Kn, u as $, x as Nn, w as Oe, y as Ie, z as Ln, A as G, B as $n, C as Wn, D as jn, E as ce, F as At, G as ft, H as K, I as _n, J as he, K as Gn, a as Ke, L as Ne, N as Le, r as Un, O as Yn, p as zn } from "./is-svg-element-uTjuI1PZ.js";
function Xn(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Wt(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const $e = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), We = (e) => /^0[^.\s]+$/u.test(e);
class je {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Xn(this.subscriptions, t), () => Wt(this.subscriptions, t);
  }
  notify(t, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](t, n, i);
      else
        for (let r = 0; r < s; r++) {
          const a = this.subscriptions[r];
          a && a(t, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const P = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, qn = (e, t, n) => {
  const i = t - e;
  return ((n - e) % i + i) % i + e;
}, _e = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, Hn = 1e-7, Zn = 12;
function Jn(e, t, n, i, s) {
  let r, a, o = 0;
  do
    a = t + (n - t) / 2, r = _e(a, i, s) - e, r > 0 ? n = a : t = a;
  while (Math.abs(r) > Hn && ++o < Zn);
  return a;
}
// @__NO_SIDE_EFFECTS__
function ct(e, t, n, i) {
  if (e === t && n === i)
    return vt;
  const s = (r) => Jn(r, 0, 1, e, n);
  return (r) => r === 0 || r === 1 ? r : _e(s(r), t, i);
}
const Ge = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, jt = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), Ue = /* @__PURE__ */ ct(0.33, 1.53, 0.69, 0.99), _t = /* @__PURE__ */ jt(Ue), Ye = /* @__PURE__ */ Ge(_t), ze = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? 0.5 * _t(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), Gt = (e) => 1 - Math.sin(Math.acos(e)), Qn = /* @__PURE__ */ jt(Gt), Xe = /* @__PURE__ */ Ge(Gt), ti = /* @__PURE__ */ ct(0.42, 0, 1, 1), ei = /* @__PURE__ */ ct(0, 0, 0.58, 1), qe = /* @__PURE__ */ ct(0.42, 0, 0.58, 1), He = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
// @__NO_SIDE_EFFECTS__
function Ze(e, t) {
  return /* @__PURE__ */ He(e) ? e[qn(0, e.length, t)] : e;
}
const Je = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", fe = {
  linear: vt,
  easeIn: ti,
  easeInOut: qe,
  easeOut: ei,
  circIn: Gt,
  circInOut: Xe,
  circOut: Qn,
  backIn: _t,
  backInOut: Ye,
  backOut: Ue,
  anticipate: ze
}, ni = (e) => typeof e == "string", de = (e) => {
  if (/* @__PURE__ */ Je(e)) {
    J(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, n, i, s] = e;
    return /* @__PURE__ */ ct(t, n, i, s);
  } else if (ni(e))
    return J(fe[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), fe[e];
  return e;
};
let dt;
function ii() {
  dt = void 0;
}
const R = {
  now: () => (dt === void 0 && R.set(pt.isProcessing || Q.useManualTiming ? pt.timestamp : performance.now()), dt),
  set: (e) => {
    dt = e, queueMicrotask(ii);
  }
}, si = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => L.update(t, n),
    stop: () => Mt(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => pt.isProcessing ? pt.timestamp : R.now()
  };
}, Qe = (e, t, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(t / n), 2);
  for (let r = 0; r < s; r++)
    i += Math.round(e(r / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, mt = 2e4;
function Ut(e) {
  let t = 0;
  const n = 50;
  let i = e.next(t);
  for (; !i.done && t < mt; )
    t += n, i = e.next(t);
  return t >= mt ? 1 / 0 : t;
}
function tn(e, t = 100, n) {
  const i = n({ ...e, keyframes: [0, t] }), s = Math.min(Ut(i), mt);
  return {
    type: "keyframes",
    ease: (r) => i.next(s * r).value / t,
    duration: /* @__PURE__ */ N(s)
  };
}
const C = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function wt(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const ri = 12;
function ai(e, t, n) {
  let i = n;
  for (let s = 1; s < ri; s++)
    i = i - e(i) / t(i);
  return i;
}
const bt = 1e-3;
function oi({ duration: e = C.duration, bounce: t = C.bounce, velocity: n = C.velocity, mass: i = C.mass }) {
  let s, r;
  Lt(e <= /* @__PURE__ */ P(C.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let a = 1 - t;
  a = ot(C.minDamping, C.maxDamping, a), e = ot(C.minDuration, C.maxDuration, /* @__PURE__ */ N(e)), a < 1 ? (s = (h) => {
    const l = h * a, u = l * e, d = l - n, p = wt(h, a), T = Math.exp(-u);
    return bt - d / p * T;
  }, r = (h) => {
    const u = h * a * e, d = u * n + n, p = Math.pow(a, 2) * Math.pow(h, 2) * e, T = Math.exp(-u), g = wt(Math.pow(h, 2), a);
    return (-s(h) + bt > 0 ? -1 : 1) * ((d - p) * T) / g;
  }) : (s = (h) => {
    const l = Math.exp(-h * e), u = (h - n) * e + 1;
    return -bt + l * u;
  }, r = (h) => {
    const l = Math.exp(-h * e), u = (n - h) * (e * e);
    return l * u;
  });
  const o = 5 / e, c = ai(s, r, o);
  if (e = /* @__PURE__ */ P(e), isNaN(c))
    return {
      stiffness: C.stiffness,
      damping: C.damping,
      duration: e
    };
  {
    const h = Math.pow(c, 2) * i;
    return {
      stiffness: h,
      damping: a * 2 * Math.sqrt(i * h),
      duration: e
    };
  }
}
const li = ["duration", "bounce"], ui = ["stiffness", "damping", "mass"];
function pe(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function ci(e) {
  let t = {
    velocity: C.velocity,
    stiffness: C.stiffness,
    damping: C.damping,
    mass: C.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!pe(e, ui) && pe(e, li))
    if (t.velocity = 0, e.visualDuration) {
      const n = e.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, r = 2 * ot(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(s);
      t = {
        ...t,
        mass: C.mass,
        stiffness: s,
        damping: r
      };
    } else {
      const n = oi({ ...e, velocity: 0 });
      t = {
        ...t,
        ...n,
        mass: C.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function lt(e = C.visualDuration, t = C.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: i, restDelta: s } = n;
  const r = n.keyframes[0], a = n.keyframes[n.keyframes.length - 1], o = { done: !1, value: r }, { stiffness: c, damping: h, mass: l, duration: u, velocity: d, isResolvedFromDuration: p } = ci({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), T = d || 0, g = h / (2 * Math.sqrt(c * l)), m = a - r, y = /* @__PURE__ */ N(Math.sqrt(c / l)), A = Math.abs(m) < 5;
  i || (i = A ? C.restSpeed.granular : C.restSpeed.default), s || (s = A ? C.restDelta.granular : C.restDelta.default);
  let D, x, b, w, F, S;
  if (g < 1)
    b = wt(y, g), w = (T + g * y * m) / b, D = (v) => {
      const M = Math.exp(-g * y * v);
      return a - M * (w * Math.sin(b * v) + m * Math.cos(b * v));
    }, F = g * y * w + m * b, S = g * y * m - w * b, x = (v) => Math.exp(-g * y * v) * (F * Math.sin(b * v) + S * Math.cos(b * v));
  else if (g === 1) {
    D = (M) => a - Math.exp(-y * M) * (m + (T + y * m) * M);
    const v = T + y * m;
    x = (M) => Math.exp(-y * M) * (y * v * M - T);
  } else {
    const v = y * Math.sqrt(g * g - 1);
    D = (O) => {
      const W = Math.exp(-g * y * O), j = Math.min(v * O, 300);
      return a - W * ((T + g * y * m) * Math.sinh(j) + v * m * Math.cosh(j)) / v;
    };
    const M = (T + g * y * m) / v, B = g * y * M - m * v, E = g * y * m - M * v;
    x = (O) => {
      const W = Math.exp(-g * y * O), j = Math.min(v * O, 300);
      return W * (B * Math.sinh(j) + E * Math.cosh(j));
    };
  }
  const V = {
    calculatedDuration: p && u || null,
    velocity: (v) => /* @__PURE__ */ P(x(v)),
    next: (v) => {
      if (!p && g < 1) {
        const B = Math.exp(-g * y * v), E = Math.sin(b * v), O = Math.cos(b * v), W = a - B * (w * E + m * O), j = /* @__PURE__ */ P(B * (F * E + S * O));
        return o.done = Math.abs(j) <= i && Math.abs(a - W) <= s, o.value = o.done ? a : W, o;
      }
      const M = D(v);
      if (p)
        o.done = v >= u;
      else {
        const B = /* @__PURE__ */ P(x(v));
        o.done = Math.abs(B) <= i && Math.abs(a - M) <= s;
      }
      return o.value = o.done ? a : M, o;
    },
    toString: () => {
      const v = Math.min(Ut(V), mt), M = Qe((B) => V.next(v * B).value, v, 30);
      return v + "ms " + M;
    },
    toTransition: () => {
    }
  };
  return V;
}
lt.applyToOptions = (e) => {
  const t = tn(e, 100, lt);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ P(t.duration), e.type = "keyframes", e;
};
const hi = 5;
function en(e, t, n) {
  const i = Math.max(t - hi, 0);
  return Pe(n - e(i), t - i);
}
function xt({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: r = 500, modifyTarget: a, min: o, max: c, restDelta: h = 0.5, restSpeed: l }) {
  const u = e[0], d = {
    done: !1,
    value: u
  }, p = (S) => o !== void 0 && S < o || c !== void 0 && S > c, T = (S) => o === void 0 ? c : c === void 0 || Math.abs(o - S) < Math.abs(c - S) ? o : c;
  let g = n * t;
  const m = u + g, y = a === void 0 ? m : a(m);
  y !== m && (g = y - u);
  const A = (S) => -g * Math.exp(-S / i), D = (S) => y + A(S), x = (S) => {
    const V = A(S), v = D(S);
    d.done = Math.abs(V) <= h, d.value = d.done ? y : v;
  };
  let b, w;
  const F = (S) => {
    p(d.value) && (b = S, w = lt({
      keyframes: [d.value, T(d.value)],
      velocity: en(D, S, d.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: r,
      restDelta: h,
      restSpeed: l
    }));
  };
  return F(0), {
    calculatedDuration: null,
    next: (S) => {
      let V = !1;
      return !w && b === void 0 && (V = !0, x(S), F(S)), b !== void 0 && S >= b ? w.next(S - b) : (!V && x(S), d);
    }
  };
}
function fi(e, t) {
  return e.map((n) => n * t);
}
function di(e, t) {
  return e.map(() => t || qe).splice(0, e.length - 1);
}
function Z({ duration: e = 300, keyframes: t, times: n, ease: i = "easeInOut" }) {
  const s = /* @__PURE__ */ He(i) ? i.map(de) : de(i), r = {
    done: !1,
    value: t[0]
  }, a = fi(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : Be(t),
    e
  ), o = Pn(a, t, {
    ease: Array.isArray(s) ? s : di(t, s)
  });
  return {
    calculatedDuration: e,
    next: (c) => (r.value = o(c), r.done = c >= e, r)
  };
}
const pi = (e) => e !== null;
function Tt(e, { repeat: t, repeatType: n = "loop" }, i, s = 1) {
  const r = e.filter(pi), o = s < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !o || i === void 0 ? r[o] : i;
}
const mi = {
  decay: xt,
  inertia: xt,
  tween: Z,
  keyframes: Z,
  spring: lt
};
function nn(e) {
  typeof e.type == "string" && (e.type = mi[e.type]);
}
class Yt {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const gi = (e) => e / 100;
class gt extends Yt {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== R.now() && this.tick(R.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    nn(t);
    const { type: n = Z, repeat: i = 0, repeatDelay: s = 0, repeatType: r, velocity: a = 0 } = t;
    let { keyframes: o } = t;
    const c = n || Z;
    process.env.NODE_ENV !== "production" && c !== Z && J(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), c !== Z && typeof o[0] != "number" && (this.mixKeyframes = Bn(gi, On(o[0], o[1])), o = [0, 100]);
    const h = c({ ...t, keyframes: o });
    r === "mirror" && (this.mirroredGenerator = c({
      ...t,
      keyframes: [...o].reverse(),
      velocity: -a
    })), h.calculatedDuration === null && (h.calculatedDuration = Ut(h));
    const { calculatedDuration: l } = h;
    this.calculatedDuration = l, this.resolvedDuration = l + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = h;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: r, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: c } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: h = 0, keyframes: l, repeat: u, repeatType: d, repeatDelay: p, type: T, onUpdate: g, finalKeyframe: m } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - s / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const y = this.currentTime - h * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? y < 0 : y > s;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let D = this.currentTime, x = i;
    if (u) {
      const S = Math.min(this.currentTime, s) / o;
      let V = Math.floor(S), v = S % 1;
      !v && S >= 1 && (v = 1), v === 1 && V--, V = Math.min(V, u + 1), V % 2 && (d === "reverse" ? (v = 1 - v, p && (v -= p / o)) : d === "mirror" && (x = a)), D = ot(0, 1, v) * o;
    }
    let b;
    A ? (this.delayState.value = l[0], b = this.delayState) : b = x.next(D), r && !A && (b.value = r(b.value));
    let { done: w } = b;
    !A && c !== null && (w = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const F = this.holdTime === null && (this.state === "finished" || this.state === "running" && w);
    return F && T !== xt && (b.value = Tt(l, this.options, m, this.speed)), g && g(b.value), F && this.finish(), b;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ N(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ N(t);
  }
  get time() {
    return /* @__PURE__ */ N(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ P(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = t, this.tick(t));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const t = this.currentTime;
    if (t <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(t);
    const n = this.generator.next(t).value;
    return en((i) => this.generator.next(i).value, t, n);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    n && this.driver && this.updateTime(R.now()), this.playbackSpeed = t, n && this.driver && (this.time = /* @__PURE__ */ N(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = si, startTime: n } = this.options;
    this.driver || (this.driver = t((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(R.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t.observe(this);
  }
}
function yi(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const z = (e) => e * 180 / Math.PI, Ct = (e) => {
  const t = z(Math.atan2(e[1], e[0]));
  return Dt(t);
}, vi = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: Ct,
  rotateZ: Ct,
  skewX: (e) => z(Math.atan(e[1])),
  skewY: (e) => z(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Dt = (e) => (e = e % 360, e < 0 && (e += 360), e), me = Ct, ge = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), ye = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), Ti = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ge,
  scaleY: ye,
  scale: (e) => (ge(e) + ye(e)) / 2,
  rotateX: (e) => Dt(z(Math.atan2(e[6], e[5]))),
  rotateY: (e) => Dt(z(Math.atan2(-e[2], e[0]))),
  rotateZ: me,
  rotate: me,
  skewX: (e) => z(Math.atan(e[4])),
  skewY: (e) => z(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Ft(e) {
  return e.includes("scale") ? 1 : 0;
}
function kt(e, t) {
  if (!e || e === "none")
    return Ft(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = Ti, s = n;
  else {
    const o = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = vi, s = o;
  }
  if (!s)
    return Ft(t);
  const r = i[t], a = s[1].split(",").map(Si);
  return typeof r == "function" ? r(a) : a[r];
}
const bi = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return kt(n, t);
};
function Si(e) {
  return parseFloat(e.trim());
}
const et = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], nt = /* @__PURE__ */ new Set([...et, "pathRotation"]), ve = (e) => e === $t || e === f, Vi = /* @__PURE__ */ new Set(["x", "y", "z"]), Mi = et.filter((e) => !Vi.has(e));
function Ai(e) {
  const t = [];
  return Mi.forEach((n) => {
    const i = e.getValue(n);
    i !== void 0 && (t.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const Y = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: i }) => {
    const s = e.max - e.min;
    return i === "border-box" ? s : s - parseFloat(t) - parseFloat(n);
  },
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: i }) => {
    const s = e.max - e.min;
    return i === "border-box" ? s : s - parseFloat(t) - parseFloat(n);
  },
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => kt(t, "x"),
  y: (e, { transform: t }) => kt(t, "y")
};
Y.translateX = Y.x;
Y.translateY = Y.y;
const X = /* @__PURE__ */ new Set();
let Et = !1, Rt = !1, Pt = !1;
function sn() {
  if (Rt) {
    const e = Array.from(X).filter((i) => i.needsMeasurement), t = new Set(e.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const s = Ai(i);
      s.length && (n.set(i, s), i.render());
    }), e.forEach((i) => i.measureInitialState()), t.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([r, a]) => {
        i.getValue(r)?.set(a);
      });
    }), e.forEach((i) => i.measureEndState()), e.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Rt = !1, Et = !1, X.forEach((e) => e.complete(Pt)), X.clear();
}
function rn() {
  X.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Rt = !0);
  });
}
function wi() {
  Pt = !0, rn(), sn(), Pt = !1;
}
class zt {
  constructor(t, n, i, s, r, a = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = i, this.motionValue = s, this.element = r, this.isAsync = a;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (X.add(this), Et || (Et = !0, L.read(rn), L.resolveKeyframes(sn))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: i, motionValue: s } = this;
    if (t[0] === null) {
      const r = s?.get(), a = t[t.length - 1];
      if (r !== void 0)
        t[0] = r;
      else if (i && n) {
        const o = i.readValue(n, a);
        o != null && (t[0] = o);
      }
      t[0] === void 0 && (t[0] = a), s && r === void 0 && s.set(t[0]);
    }
    yi(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), X.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (X.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const xi = (e) => e.startsWith("--");
function an(e, t, n) {
  xi(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const on = /* @__PURE__ */ In(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), at = ([e, t, n, i]) => `cubic-bezier(${e}, ${t}, ${n}, ${i})`, Te = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ at([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ at([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ at([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ at([0.33, 1.53, 0.69, 0.99])
};
function ln(e, t) {
  if (e)
    return typeof e == "function" ? on() ? Qe(e, t) : "ease-out" : /* @__PURE__ */ Je(e) ? at(e) : Array.isArray(e) ? e.map((n) => ln(n, t) || Te.easeOut) : Te[e];
}
function Ci(e, t, n, { delay: i = 0, duration: s = 300, repeat: r = 0, repeatType: a = "loop", ease: o = "easeOut", times: c } = {}, h = void 0) {
  const l = {
    [t]: n
  };
  c && (l.offset = c);
  const u = ln(o, s);
  Array.isArray(u) && (l.easing = u);
  const d = {
    delay: i,
    duration: s,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: r + 1,
    direction: a === "reverse" ? "alternate" : "normal"
  };
  return h && (d.pseudoElement = h), e.animate(l, d);
}
function Xt(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function Di({ type: e, ...t }) {
  return Xt(e) && on() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class un extends Yt {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: r, allowFlatten: a = !1, finalKeyframe: o, onComplete: c } = t;
    this.isPseudoElement = !!r, this.allowFlatten = a, this.options = t, J(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const h = Di(t);
    this.animation = Ci(n, i, s, h, r), h.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const l = Tt(s, this.options, o, this.speed);
        this.updateMotionValue && this.updateMotionValue(l), an(n, i, l), this.animation.cancel();
      }
      c?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const t = this.options?.element;
    !this.isPseudoElement && t?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const t = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ N(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ N(t);
  }
  get time() {
    return /* @__PURE__ */ N(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ P(t), n && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(t) {
    this.manualStartTime = this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, rangeStart: n, rangeEnd: i, observe: s }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && Kn() ? (this.animation.timeline = t, n && (this.animation.rangeStart = n), i && (this.animation.rangeEnd = i), vt) : s(this);
  }
}
const cn = {
  anticipate: ze,
  backInOut: Ye,
  circInOut: Xe
};
function Fi(e) {
  return e in cn;
}
function ki(e) {
  typeof e.ease == "string" && Fi(e.ease) && (e.ease = cn[e.ease]);
}
const St = 10;
class Ei extends un {
  constructor(t) {
    ki(t), nn(t), super(t), t.startTime !== void 0 && t.autoplay !== !1 && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: r, ...a } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const o = new gt({
      ...a,
      autoplay: !1
    }), c = Math.max(St, R.now() - this.startTime), h = ot(0, St, c - St), l = o.sample(c).value, { name: u } = this.options;
    r && u && an(r, u, l), n.setWithVelocity(o.sample(Math.max(0, c - h)).value, l, h), o.stop();
  }
}
const be = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
($.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function Ri(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function Pi(e, t, n, i) {
  const s = e[0];
  if (s === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = e[e.length - 1], a = be(s, t), o = be(r, t);
  return Lt(a === o, `You are trying to animate ${t} from "${s}" to "${r}". "${a ? r : s}" is not an animatable value.`, "value-not-animatable"), !a || !o ? !1 : Ri(e) || (n === "spring" || Xt(n)) && i;
}
function Bt(e) {
  e.duration = 0, e.type = "keyframes";
}
const hn = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), Bi = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Oi(e) {
  for (let t = 0; t < e.length; t++)
    if (typeof e[t] == "string" && Bi.test(e[t]))
      return !0;
  return !1;
}
const Ii = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), Ki = /* @__PURE__ */ Nn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ni(e) {
  const { motionValue: t, name: n, repeatDelay: i, repeatType: s, damping: r, type: a, keyframes: o } = e;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: h, transformTemplate: l } = t.owner.getProps();
  return Ki() && n && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (hn.has(n) || Ii.has(n) && Oi(o)) && (n !== "transform" || !l) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !h && !i && s !== "mirror" && r !== 0 && a !== "inertia";
}
const Li = 40;
class $i extends Yt {
  constructor({ autoplay: t = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: a = "loop", keyframes: o, name: c, motionValue: h, element: l, ...u }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = R.now();
    const d = {
      autoplay: t,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: r,
      repeatType: a,
      name: c,
      motionValue: h,
      element: l,
      ...u
    }, p = l?.KeyframeResolver || zt;
    this.keyframeResolver = new p(o, (T, g, m) => this.onKeyframesResolved(T, g, d, !m), c, h, l), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: r, type: a, velocity: o, delay: c, isHandoff: h, onUpdate: l } = i;
    this.resolvedAt = R.now();
    let u = !0;
    Pi(t, r, a, o) || (u = !1, (Q.instantAnimations || !c) && l?.(Tt(t, i, n)), t[0] = t[t.length - 1], Bt(i), i.repeat = 0);
    const p = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > Li ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: t
    }, T = u && !h && Ni(p), g = p.motionValue?.owner?.current;
    let m;
    if (T)
      try {
        m = new Ei({
          ...p,
          element: g
        });
      } catch {
        m = new gt(p);
      }
    else
      m = new gt(p);
    m.finished.then(() => {
      this.notifyFinished();
    }).catch(vt), this.pendingTimeline && (this.stopTimeline = m.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = m;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), wi()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
class Wi {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => t.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let i = 0; i < this.animations.length; i++)
      this.animations[i][t] = n;
  }
  attachTimeline(t) {
    const n = this.animations.map((i) => i.attachTimeline(t));
    return () => {
      n.forEach((i, s) => {
        i && i(), this.animations[s].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return Se(this.animations, "duration");
  }
  get iterationDuration() {
    return Se(this.animations, "iterationDuration");
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function Se(e, t) {
  let n = 0;
  for (let i = 0; i < e.length; i++) {
    const s = e[i][t];
    s !== null && s > n && (n = s);
  }
  return n;
}
class ji extends Wi {
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const Ve = 30, _i = (e) => !isNaN(parseFloat(e));
class Gi {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = R.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const r of this.dependents)
          r.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = R.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = _i(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return process.env.NODE_ENV !== "production" && Oe(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new je());
    const i = this.events[t].add(n);
    return t === "change" ? () => {
      i(), L.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = R.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Ve)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ve);
    return Pe(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function tt(e, t) {
  return new Gi(e, t);
}
function fn(e, t) {
  if (e?.inherit && t) {
    const { inherit: n, ...i } = e;
    return { ...t, ...i };
  }
  return e;
}
function dn(e, t) {
  const n = e?.[t] ?? e?.default ?? e;
  return n !== e ? fn(n, e) : n;
}
const Ui = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Yi = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), zi = {
  type: "keyframes",
  duration: 0.8
}, Xi = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, qi = (e, { keyframes: t }) => t.length > 2 ? zi : nt.has(e) ? e.startsWith("scale") ? Yi(t[1]) : Ui : Xi, Hi = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function Zi(e) {
  for (const t in e)
    if (!Hi.has(t))
      return !0;
  return !1;
}
const pn = (e, t, n, i = {}, s, r) => (a) => {
  const o = dn(i, e) || {}, c = o.delay || i.delay || 0;
  let { elapsed: h = 0 } = i;
  h = h - /* @__PURE__ */ P(c);
  const l = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...o,
    delay: -h,
    onUpdate: (d) => {
      t.set(d), o.onUpdate && o.onUpdate(d);
    },
    onComplete: () => {
      a(), o.onComplete && o.onComplete();
    },
    name: e,
    motionValue: t,
    element: r ? void 0 : s
  };
  Zi(o) || Object.assign(l, qi(e, l)), l.duration && (l.duration = /* @__PURE__ */ P(l.duration)), l.repeatDelay && (l.repeatDelay = /* @__PURE__ */ P(l.repeatDelay)), l.from !== void 0 && (l.keyframes[0] = l.from);
  let u = !1;
  if ((l.type === !1 || l.duration === 0 && !l.repeatDelay) && (Bt(l), l.delay === 0 && (u = !0)), (Q.instantAnimations || Q.skipAnimations || s?.shouldSkipAnimations || o.skipAnimations) && (u = !0, Bt(l), l.delay = 0), l.allowFlatten = !o.type && !o.ease, u && !r && t.get() !== void 0) {
    const d = Tt(l.keyframes, o);
    if (d !== void 0) {
      L.update(() => {
        l.onUpdate(d), l.onComplete();
      });
      return;
    }
  }
  return o.isSync ? new gt(l) : new $i(l);
}, Ji = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Qi(e) {
  const t = Ji.exec(e);
  if (!t)
    return [,];
  const [, n, i, s] = t;
  return [`--${n ?? i}`, s];
}
const ts = 4;
function mn(e, t, n = 1) {
  J(n <= ts, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, s] = Qi(e);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const a = r.trim();
    return $e(a) ? parseFloat(a) : a;
  }
  return Ie(s) ? mn(s, t, n + 1) : s;
}
function Me(e) {
  const t = [{}, {}];
  return e?.values.forEach((n, i) => {
    t[0][i] = n.get(), t[1][i] = n.getVelocity();
  }), t;
}
function gn(e, t, n, i) {
  if (typeof t == "function") {
    const [s, r] = Me(i);
    t = t(n !== void 0 ? n : e.custom, s, r);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [s, r] = Me(i);
    t = t(n !== void 0 ? n : e.custom, s, r);
  }
  return t;
}
function es(e, t, n) {
  const i = e.getProps();
  return gn(i, t, i.custom, e);
}
const yn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...et
]), ns = (e) => Array.isArray(e);
function is(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, tt(n));
}
function ss(e) {
  return ns(e) ? e[e.length - 1] || 0 : e;
}
function rs(e, t) {
  const n = es(e, t);
  let { transitionEnd: i = {}, transition: s = {}, ...r } = n || {};
  r = { ...r, ...i };
  for (const a in r) {
    const o = ss(r[a]);
    is(e, a, o);
  }
}
const k = (e) => !!(e && e.getVelocity);
function as(e) {
  return !!(k(e) && e.add);
}
function os(e, t) {
  const n = e.getValue("willChange");
  if (as(n))
    return n.add(t);
  if (!n && Q.WillChange) {
    const i = new Q.WillChange("auto");
    e.addValue("willChange", i), i.add(t);
  }
}
function qt(e) {
  return e.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const ls = "framerAppearId", us = "data-" + qt(ls);
function cs(e) {
  return e.props[us];
}
function hs({ protectedKeys: e, needsAnimating: t }, n) {
  const i = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, i;
}
function fs(e, t, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: r, transitionEnd: a, ...o } = t;
  const c = e.getDefaultTransition();
  r = r ? fn(r, c) : c;
  const h = r?.reduceMotion, l = r?.skipAnimations;
  i && (r = i);
  const u = [], d = s && e.animationState && e.animationState.getState()[s], p = r?.path;
  p && p.animateVisualElement(e, o, r, n, u);
  for (const T in o) {
    const g = e.getValue(T, e.latestValues[T] ?? null), m = o[T];
    if (m === void 0 || d && hs(d, T))
      continue;
    const y = {
      delay: n,
      ...dn(r || {}, T)
    };
    l && (y.skipAnimations = !0);
    const A = g.get();
    if (A !== void 0 && !g.isAnimating() && !Array.isArray(m) && m === A && !y.velocity) {
      L.update(() => g.set(m));
      continue;
    }
    let D = !1;
    if (window.MotionHandoffAnimation) {
      const w = cs(e);
      if (w) {
        const F = window.MotionHandoffAnimation(w, T, L);
        F !== null && (y.startTime = F, D = !0);
      }
    }
    os(e, T);
    const x = h ?? e.shouldReduceMotion;
    g.start(pn(T, g, m, x && yn.has(T) ? { type: !1 } : y, e, D));
    const b = g.animation;
    b && u.push(b);
  }
  if (a) {
    const T = () => L.update(() => {
      a && rs(e, a);
    });
    u.length ? Promise.all(u).then(T) : T();
  }
  return u;
}
const ds = {
  test: (e) => e === "auto",
  parse: (e) => e
}, vn = (e) => (t) => t.test(e), Tn = [$t, f, Ln, G, $n, Wn, ds], Ae = (e) => Tn.find(vn(e));
function ps(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || We(e) : !0;
}
const ms = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function gs(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [i] = n.match(jn) || [];
  if (!i)
    return e;
  const s = n.replace(i, "");
  let r = ms.has(t) ? 1 : 0;
  return i !== n && (r *= 100), t + "(" + r + s + ")";
}
const ys = /\b([a-z-]*)\(.*?\)/gu, Ot = {
  ...$,
  getAnimatableNone: (e) => {
    const t = e.match(ys);
    return t ? t.map(gs).join(" ") : e;
  }
}, It = {
  ...$,
  getAnimatableNone: (e) => {
    const t = $.parse(e);
    return $.createTransformer(e)(t.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, we = {
  ...$t,
  transform: Math.round
}, vs = {
  rotate: G,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: G,
  rotateX: G,
  rotateY: G,
  rotateZ: G,
  scale: ft,
  scaleX: ft,
  scaleY: ft,
  scaleZ: ft,
  skew: G,
  skewX: G,
  skewY: G,
  distance: f,
  translateX: f,
  translateY: f,
  translateZ: f,
  x: f,
  y: f,
  z: f,
  perspective: f,
  transformPerspective: f,
  opacity: At,
  originX: ce,
  originY: ce,
  originZ: f
}, yt = {
  // Border props
  borderWidth: f,
  borderTopWidth: f,
  borderRightWidth: f,
  borderBottomWidth: f,
  borderLeftWidth: f,
  borderRadius: f,
  borderTopLeftRadius: f,
  borderTopRightRadius: f,
  borderBottomRightRadius: f,
  borderBottomLeftRadius: f,
  // Positioning props
  width: f,
  maxWidth: f,
  height: f,
  maxHeight: f,
  top: f,
  right: f,
  bottom: f,
  left: f,
  inset: f,
  insetBlock: f,
  insetBlockStart: f,
  insetBlockEnd: f,
  insetInline: f,
  insetInlineStart: f,
  insetInlineEnd: f,
  // Spacing props
  padding: f,
  paddingTop: f,
  paddingRight: f,
  paddingBottom: f,
  paddingLeft: f,
  paddingBlock: f,
  paddingBlockStart: f,
  paddingBlockEnd: f,
  paddingInline: f,
  paddingInlineStart: f,
  paddingInlineEnd: f,
  margin: f,
  marginTop: f,
  marginRight: f,
  marginBottom: f,
  marginLeft: f,
  marginBlock: f,
  marginBlockStart: f,
  marginBlockEnd: f,
  marginInline: f,
  marginInlineStart: f,
  marginInlineEnd: f,
  // Typography
  fontSize: f,
  // Misc
  backgroundPositionX: f,
  backgroundPositionY: f,
  ...vs,
  zIndex: we,
  // SVG
  fillOpacity: At,
  strokeOpacity: At,
  numOctaves: we
}, Ts = {
  ...yt,
  // Color props
  color: K,
  backgroundColor: K,
  outlineColor: K,
  fill: K,
  stroke: K,
  // Border props
  borderColor: K,
  borderTopColor: K,
  borderRightColor: K,
  borderBottomColor: K,
  borderLeftColor: K,
  filter: Ot,
  WebkitFilter: Ot,
  mask: It,
  WebkitMask: It
}, bn = (e) => Ts[e], bs = /* @__PURE__ */ new Set([Ot, It]);
function Sn(e, t) {
  let n = bn(e);
  return bs.has(n) || (n = $), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const Ss = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Vs(e, t, n) {
  let i = 0, s;
  for (; i < e.length && !s; ) {
    const r = e[i];
    typeof r == "string" && !Ss.has(r) && _n(r).values.length && (s = e[i]), i++;
  }
  if (s && n)
    for (const r of t)
      e[r] = Sn(n, s);
}
class Ms extends zt {
  constructor(t, n, i, s, r) {
    super(t, n, i, s, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && (u = u.trim(), Ie(u))) {
        const d = mn(u, n.current);
        d !== void 0 && (t[l] = d), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !yn.has(i) || t.length !== 2)
      return;
    const [s, r] = t, a = Ae(s), o = Ae(r), c = he(s), h = he(r);
    if (c !== h && Y[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (a !== o)
      if (ve(a) && ve(o))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else Y[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, i = [];
    for (let s = 0; s < t.length; s++)
      (t[s] === null || ps(t[s])) && i.push(s);
    i.length && Vs(t, i, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Y[i](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && t.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: t, name: n, unresolvedKeyframes: i } = this;
    if (!t || !t.current)
      return;
    const s = t.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const r = i.length - 1, a = i[r];
    i[r] = Y[n](t.measureViewportBox(), window.getComputedStyle(t.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([o, c]) => {
      t.getValue(o).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const Kt = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: As } = /* @__PURE__ */ Gn(queueMicrotask, !1);
function ws(e) {
  return Ke(e) && e.tagName === "svg";
}
const xs = [...Tn, K, $], Cs = (e) => xs.find(vn(e)), xe = () => ({ min: 0, max: 0 }), Ht = () => ({
  x: xe(),
  y: xe()
}), ut = /* @__PURE__ */ new WeakMap();
function Ds(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Fs(e) {
  return typeof e == "string" || Array.isArray(e);
}
const ks = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Es = ["initial", ...ks];
function Vn(e) {
  return Ds(e.animate) || Es.some((t) => Fs(e[t]));
}
function Rs(e) {
  return !!(Vn(e) || e.variants);
}
function Ps(e, t, n) {
  for (const i in t) {
    const s = t[i], r = n[i];
    if (k(s))
      e.addValue(i, s);
    else if (k(r))
      e.addValue(i, tt(s, { owner: e }));
    else if (r !== s)
      if (e.hasValue(i)) {
        const a = e.getValue(i);
        a.liveStyle === !0 ? a.jump(s) : a.hasAnimated || a.set(s);
      } else {
        const a = e.getStaticValue(i);
        e.addValue(i, tt(a !== void 0 ? a : s, { owner: e }));
      }
  }
  for (const i in n)
    t[i] === void 0 && e.removeValue(i);
  return t;
}
const Nt = { current: null }, Mn = { current: !1 }, Bs = typeof window < "u";
function Os() {
  if (Mn.current = !0, !!Bs)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => Nt.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      Nt.current = !1;
}
const Ce = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let De = {};
class An {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, i) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: i, reducedMotionConfig: s, skipAnimations: r, blockInitialAnimation: a, visualState: o }, c = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = zt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const p = R.now();
      this.renderScheduledAt < p && (this.renderScheduledAt = p, L.render(this.render, !1, !0));
    };
    const { latestValues: h, renderState: l } = o;
    this.latestValues = h, this.baseTarget = { ...h }, this.initialValues = n.initial ? { ...h } : {}, this.renderState = l, this.parent = t, this.props = n, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = s, this.skipAnimationsConfig = r, this.options = c, this.blockInitialAnimation = !!a, this.isControllingVariants = Vn(n), this.isVariantNode = Rs(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const p in d) {
      const T = d[p];
      h[p] !== void 0 && k(T) && T.set(h[p]);
    }
  }
  mount(t) {
    if (this.hasBeenMounted)
      for (const n in this.initialValues)
        this.values.get(n)?.jump(this.initialValues[n]), this.latestValues[n] = this.initialValues[n];
    this.current = t, ut.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Mn.current || Os(), this.shouldReduceMotion = Nt.current), process.env.NODE_ENV !== "production" && Oe(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Mt(this.notifyUpdate), Mt(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), n.accelerate && hn.has(t) && this.current instanceof HTMLElement) {
      const { factory: a, keyframes: o, times: c, ease: h, duration: l } = n.accelerate, u = new un({
        element: this.current,
        name: t,
        keyframes: o,
        times: c,
        ease: h,
        duration: /* @__PURE__ */ P(l)
      }), d = a(u);
      this.valueSubscriptions.set(t, () => {
        d(), u.cancel();
      });
      return;
    }
    const i = nt.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (a) => {
      this.latestValues[t] = a, this.props.onUpdate && L.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      s(), r && r();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in De) {
      const n = De[t];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[t] && s && i(this.props) && (this.features[t] = new s(this)), this.features[t]) {
        const r = this.features[t];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ht();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < Ce.length; i++) {
      const s = Ce[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const r = "on" + s, a = t[r];
      a && (this.propEventSubscriptions[s] = this.on(s, a));
    }
    this.prevMotionValues = Ps(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const i = this.values.get(t);
    n !== i && (i && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let i = this.values.get(t);
    return i === void 0 && n !== void 0 && (i = tt(n === null ? void 0 : n, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && ($e(i) || We(i)) ? i = parseFloat(i) : !Cs(i) && $.test(n) && (i = Sn(t, n)), this.setBaseTarget(t, k(i) ? i.get() : i)), k(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const r = gn(this.props, n, this.presenceContext?.custom);
      r && (i = r[t]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !k(s) ? s : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new je()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    As.render(this.render);
  }
}
class wn extends An {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ms;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    const i = t.style;
    return i ? i[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: i }) {
    delete n[t], delete i[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    k(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Is({ top: e, left: t, right: n, bottom: i }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: i }
  };
}
function Ks(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), i = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function Ns(e, t) {
  return Is(Ks(e.getBoundingClientRect(), t));
}
const Ls = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, $s = et.length;
function Ws(e, t, n) {
  let i = "", s = !0;
  for (let a = 0; a < $s; a++) {
    const o = et[a], c = e[o];
    if (c === void 0)
      continue;
    let h = !0;
    if (typeof c == "number")
      h = c === (o.startsWith("scale") ? 1 : 0);
    else {
      const l = parseFloat(c);
      h = o.startsWith("scale") ? l === 1 : l === 0;
    }
    if (!h || n) {
      const l = Kt(c, yt[o]);
      if (!h) {
        s = !1;
        const u = Ls[o] || o;
        i += `${u}(${l}) `;
      }
      n && (t[o] = l);
    }
  }
  const r = e.pathRotation;
  return r && (s = !1, i += `rotate(${Kt(r, yt.pathRotation)}) `), i = i.trim(), n ? i = n(t, s ? "" : i) : s && (i = "none"), i;
}
function xn(e, t, n) {
  const { style: i, vars: s, transformOrigin: r } = e;
  let a = !1, o = !1;
  for (const c in t) {
    const h = t[c];
    if (nt.has(c)) {
      a = !0;
      continue;
    } else if (Ne(c)) {
      s[c] = h;
      continue;
    } else {
      const l = Kt(h, yt[c]);
      c.startsWith("origin") ? (o = !0, r[c] = l) : i[c] = l;
    }
  }
  if (t.transform || (a || n ? i.transform = Ws(t, e.transform, n) : i.transform && (i.transform = "none")), o) {
    const { originX: c = "50%", originY: h = "50%", originZ: l = 0 } = r;
    i.transformOrigin = `${c} ${h} ${l}`;
  }
}
function Cn(e, { style: t, vars: n }, i, s) {
  const r = e.style;
  let a;
  for (a in t)
    r[a] = t[a];
  s?.applyProjectionStyles(r, i);
  for (a in n)
    r.setProperty(a, n[a]);
}
function Fe(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const rt = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (f.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = Fe(e, t.target.x), i = Fe(e, t.target.y);
    return `${n}% ${i}%`;
  }
}, js = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const i = e, s = $.parse(e);
    if (s.length > 5)
      return i;
    const r = $.createTransformer(e), a = typeof s[0] != "number" ? 1 : 0, o = n.x.scale * t.x, c = n.y.scale * t.y;
    s[0 + a] /= o, s[1 + a] /= c;
    const h = Le(o, c, 0.5);
    return typeof s[2 + a] == "number" && (s[2 + a] /= h), typeof s[3 + a] == "number" && (s[3 + a] /= h), r(s);
  }
}, _s = {
  borderRadius: {
    ...rt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: rt,
  borderTopRightRadius: rt,
  borderBottomLeftRadius: rt,
  borderBottomRightRadius: rt,
  boxShadow: js
};
function Gs(e, { layout: t, layoutId: n }) {
  return nt.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!_s[e] || e === "opacity");
}
function Dn(e, t, n) {
  const i = e.style, s = t?.style, r = {};
  if (!i)
    return r;
  for (const a in i)
    (k(i[a]) || s && k(s[a]) || Gs(a, e) || n?.getValue(a)?.liveStyle !== void 0) && (r[a] = i[a]);
  return r;
}
function Us(e) {
  return window.getComputedStyle(e);
}
class Ys extends wn {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Cn;
  }
  readValueFromInstance(t, n) {
    if (nt.has(n))
      return this.projection?.isProjecting ? Ft(n) : bi(t, n);
    {
      const i = Us(t), s = (Ne(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Ns(t, n);
  }
  build(t, n, i) {
    xn(t, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return Dn(t, n, i);
  }
}
function zs(e, t) {
  return e in t;
}
class Xs extends An {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, n) {
    if (zs(n, t)) {
      const i = t[n];
      if (typeof i == "string" || typeof i == "number")
        return i;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, n) {
    delete n.output[t];
  }
  measureInstanceViewportBox() {
    return Ht();
  }
  build(t, n) {
    Object.assign(t.output, n);
  }
  renderInstance(t, { output: n }) {
    Object.assign(t, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const qs = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Hs = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Zs(e, t, n = 1, i = 0, s = !0) {
  e.pathLength = 1;
  const r = s ? qs : Hs;
  e[r.offset] = `${-i}`, e[r.array] = `${t} ${n}`;
}
const Js = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Qs(e, {
  attrX: t,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: r = 1,
  pathOffset: a = 0,
  // This is object creation, which we try to avoid per-frame.
  ...o
}, c, h, l) {
  if (xn(e, o, h), c) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: u, style: d } = e;
  u.transform && (d.transform = u.transform, delete u.transform), (d.transform || u.transformOrigin) && (d.transformOrigin = u.transformOrigin ?? "50% 50%", delete u.transformOrigin), d.transform && (d.transformBox = l?.transformBox ?? "fill-box", delete u.transformBox);
  for (const p of Js)
    u[p] !== void 0 && (d[p] = u[p], delete u[p]);
  t !== void 0 && (u.x = t), n !== void 0 && (u.y = n), i !== void 0 && (u.scale = i), s !== void 0 && Zs(u, s, r, a, !1);
}
const Fn = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), tr = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function er(e, t, n, i) {
  Cn(e, t, void 0, i);
  for (const s in t.attrs)
    e.setAttribute(Fn.has(s) ? s : qt(s), t.attrs[s]);
}
function nr(e, t, n) {
  const i = Dn(e, t, n);
  for (const s in e)
    if (k(e[s]) || k(t[s])) {
      const r = et.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[r] = e[s];
    }
  return i;
}
class ir extends wn {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ht;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (nt.has(n)) {
      const i = bn(n);
      return i && i.default || 0;
    }
    return n = Fn.has(n) ? n : qt(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return nr(t, n, i);
  }
  build(t, n, i) {
    Qs(t, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, n, i, s) {
    er(t, n, i, s);
  }
  mount(t) {
    this.isSVGTag = tr(t.tagName), super.mount(t);
  }
}
function sr(e, t, n) {
  const i = k(e) ? e : tt(e);
  return i.start(pn("", i, t, n)), i.animation;
}
function Zt(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function kn(e, t, n, i) {
  return e == null ? [] : typeof e == "string" && Zt(t) ? Un(e, n, i) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((s) => s != null) : [e];
}
function rr(e, t, n) {
  return e * (t + 1) + n * t;
}
function ke(e, t, n, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : i.get(t) ?? e;
}
function ar(e, t, n) {
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    s.at > t && s.at < n && (Wt(e, s), i--);
  }
}
function or(e, t, n, i, s, r) {
  ar(e, s, r);
  for (let a = 0; a < t.length; a++)
    e.push({
      value: t[a],
      at: Le(s, r, i[a]),
      easing: /* @__PURE__ */ Ze(n, a)
    });
}
function lr(e, t, n = 0) {
  const i = t + 1 + t * n;
  for (let s = 0; s < e.length; s++)
    e[s] = e[s] / i;
}
function ur(e, t) {
  return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
const cr = "easeInOut", Vt = 20;
function hr(e, { defaultTransition: t = {}, ...n } = {}, i, s) {
  const r = t.duration || 0.3, a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), c = {}, h = /* @__PURE__ */ new Map();
  let l = 0, u = 0, d = 0;
  for (let p = 0; p < e.length; p++) {
    const T = e[p];
    if (typeof T == "string") {
      h.set(T, u);
      continue;
    } else if (!Array.isArray(T)) {
      h.set(T.name, ke(u, T.at, l, h));
      continue;
    }
    let [g, m, y = {}] = T;
    y.at !== void 0 && (u = ke(u, y.at, l, h));
    let A = 0;
    const D = (x, b, w, F = 0, S = 0) => {
      const V = fr(x), { delay: v = 0, times: M = Be(V), type: B = t.type || "keyframes", repeat: E, repeatType: O, repeatDelay: W = 0, ...j } = b;
      let { ease: _ = t.ease || "easeOut", duration: I } = b;
      const Jt = typeof v == "function" ? v(F, S) : v, Qt = V.length, te = Xt(B) ? B : s?.[B || "keyframes"];
      if (Qt <= 2 && te) {
        let q = 100;
        if (Qt === 2 && mr(V)) {
          const it = V[1] - V[0];
          q = Math.abs(it);
        }
        const H = {
          ...t,
          ...j
        };
        I !== void 0 && (H.duration = /* @__PURE__ */ P(I));
        const ht = tn(H, q, te);
        _ = ht.ease, I = ht.duration;
      }
      I ?? (I = r);
      const ee = u + Jt;
      M.length === 1 && M[0] === 0 && (M[1] = 1);
      const ne = M.length - V.length;
      if (ne > 0 && Yn(M, ne), V.length === 1 && V.unshift(null), E && Lt(E < Vt, `Sequence segments can't repeat ${E} times — ignoring repeat option. Use a value below ${Vt} or apply repeat at the sequence level instead.`), E && E < Vt) {
        const q = I > 0 ? W / I : 0;
        I = rr(I, E, W);
        const H = [...V], ht = [...M];
        _ = Array.isArray(_) ? [..._] : [_];
        const it = [..._], se = O === "reverse" || O === "mirror";
        let re = H, ae = it;
        se && (re = [...H].reverse(), O === "reverse" && (ae = [...it].reverse().map((U) => typeof U == "function" ? /* @__PURE__ */ jt(U) : U)));
        for (let U = 0; U < E; U++) {
          const oe = se && U % 2 === 0, le = oe ? re : H, Rn = oe ? ae : it, ue = (U + 1) * (1 + q);
          q > 0 && (V.push(V[V.length - 1]), M.push(ue), _.push("linear")), V.push(...le);
          for (let st = 0; st < le.length; st++)
            M.push(ht[st] + ue), _.push(st === 0 ? "linear" : /* @__PURE__ */ Ze(Rn, st - 1));
        }
        lr(M, E, q);
      }
      const ie = ee + I;
      or(w, V, _, M, ee, ie), A = Math.max(Jt + I, A), d = Math.max(ie, d);
    };
    if (k(g)) {
      const x = Ee(g, o);
      D(m, y, Re("default", x));
    } else {
      const x = kn(g, m, i, c), b = x.length;
      for (let w = 0; w < b; w++) {
        m = m, y = y;
        const F = x[w], S = Ee(F, o);
        for (const V in m)
          D(m[V], dr(y, V), Re(V, S), w, b);
      }
    }
    l = u, u += A;
  }
  return o.forEach((p, T) => {
    for (const g in p) {
      const m = p[g];
      m.sort(ur);
      const y = [], A = [], D = [];
      for (let F = 0; F < m.length; F++) {
        const { at: S, value: V, easing: v } = m[F];
        y.push(V), A.push(zn(0, d, S)), D.push(v || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), y.unshift(y[0]), D.unshift(cr)), A[A.length - 1] !== 1 && (A.push(1), y.push(null)), a.has(T) || a.set(T, {
        keyframes: {},
        transition: {}
      });
      const x = a.get(T);
      x.keyframes[g] = y;
      const { type: b, ...w } = t;
      x.transition[g] = {
        ...w,
        duration: d,
        ease: D,
        times: A,
        ...n
      };
    }
  }), a;
}
function Ee(e, t) {
  return !t.has(e) && t.set(e, {}), t.get(e);
}
function Re(e, t) {
  return t[e] || (t[e] = []), t[e];
}
function fr(e) {
  return Array.isArray(e) ? e : [e];
}
function dr(e, t) {
  return e && e[t] ? {
    ...e,
    ...e[t]
  } : { ...e };
}
const pr = (e) => typeof e == "number", mr = (e) => e.every(pr);
function gr(e) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, n = Ke(e) && !ws(e) ? new ir(t) : new Ys(t);
  n.mount(e), ut.set(e, n);
}
function yr(e) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Xs(t);
  n.mount(e), ut.set(e, n);
}
function vr(e, t) {
  return k(e) || typeof e == "number" || typeof e == "string" && !Zt(t);
}
function En(e, t, n, i) {
  const s = [];
  if (vr(e, t))
    s.push(sr(e, Zt(t) && t.default || t, n && (n.default || n)));
  else {
    if (e == null)
      return s;
    const r = kn(e, t, i), a = r.length;
    J(!!a, "No valid elements provided.", "no-valid-elements");
    for (let o = 0; o < a; o++) {
      const c = r[o], h = c instanceof Element ? gr : yr;
      ut.has(c) || h(c);
      const l = ut.get(c), u = { ...n };
      "delay" in u && typeof u.delay == "function" && (u.delay = u.delay(o, a)), s.push(...fs(l, { ...t, transition: u }, {}));
    }
  }
  return s;
}
function Tr(e, t, n) {
  const i = [], s = e.map((a) => {
    if (Array.isArray(a) && typeof a[0] == "function") {
      const o = a[0], c = tt(0);
      return c.on("change", o), a.length === 1 ? [c, [0, 1]] : a.length === 2 ? [c, [0, 1], a[1]] : [c, a[1], a[2]];
    }
    return a;
  });
  return hr(s, t, n, { spring: lt }).forEach(({ keyframes: a, transition: o }, c) => {
    i.push(...En(c, a, o));
  }), i;
}
function br(e) {
  return Array.isArray(e) && e.some(Array.isArray);
}
function Sr(e = {}) {
  const { scope: t, reduceMotion: n, skipAnimations: i } = e;
  function s(r, a, o) {
    let c = [], h;
    const l = {};
    if (n !== void 0 && (l.reduceMotion = n), i !== void 0 && (l.skipAnimations = i), br(r)) {
      const { onComplete: d, ...p } = a || {};
      typeof d == "function" && (h = d), c = Tr(r, { ...l, ...p }, t);
    } else {
      const { onComplete: d, ...p } = o || {};
      typeof d == "function" && (h = d), c = En(r, a, { ...l, ...p }, t);
    }
    const u = new ji(c);
    return h && u.finished.then(h), t && (t.animations.push(u), u.finished.then(() => {
      Wt(t.animations, u);
    })), u;
  }
  return s;
}
const Mr = Sr();
export {
  Mr as a
};
