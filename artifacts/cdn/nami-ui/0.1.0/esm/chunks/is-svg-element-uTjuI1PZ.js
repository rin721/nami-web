const I = (e, t, n) => n > t ? t : n < e ? e : n;
function M(e, t) {
  return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
let P = () => {
}, j = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (P = (e, t, n) => {
  !e && typeof console < "u" && console.warn(M(t, n));
}, j = (e, t, n) => {
  if (!e)
    throw new Error(M(t, n));
});
const L = {}, ce = (e) => typeof e == "object" && e !== null;
// @__NO_SIDE_EFFECTS__
function le(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const D = /* @__NO_SIDE_EFFECTS__ */ (e) => e, z = (...e) => e.reduce((t, n) => (s) => n(t(s))), Z = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const s = t - e;
  return s ? (n - e) / s : 1;
}, De = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? e * (1e3 / t) : 0, U = /* @__PURE__ */ new Set();
function ze(e, t, n) {
  e || U.has(t) || (console.warn(M(t, n)), U.add(t));
}
const F = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function ue(e, t) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), r = !1, o = !1;
  const a = /* @__PURE__ */ new WeakSet();
  let i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    a.has(c) && (m.schedule(c), e()), c(i);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, b = !1) => {
      const A = b && r ? n : s;
      return u && a.add(c), A.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      s.delete(c), a.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (i = c, r) {
        o = !0;
        return;
      }
      r = !0;
      const u = n;
      n = s, s = u, n.forEach(l), n.clear(), r = !1, o && (o = !1, m.process(c));
    }
  };
  return m;
}
const fe = 40;
function pe(e, t) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, a = F.reduce((p, f) => (p[f] = ue(o), p), {}), { setup: i, read: l, resolveKeyframes: m, preUpdate: c, update: u, preRender: b, render: W, postRender: A } = a, k = () => {
    const p = L.useManualTiming, f = p ? r.timestamp : performance.now();
    n = !1, p || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(f - r.timestamp, fe), 1)), r.timestamp = f, r.isProcessing = !0, i.process(r), l.process(r), m.process(r), c.process(r), u.process(r), b.process(r), W.process(r), A.process(r), r.isProcessing = !1, n && t && (s = !1, e(k));
  }, re = () => {
    n = !0, s = !0, r.isProcessing || e(k);
  };
  return { schedule: F.reduce((p, f) => {
    const se = a[f];
    return p[f] = (oe, ae = !1, ie = !1) => (n || re(), se.schedule(oe, ae, ie)), p;
  }, {}), cancel: (p) => {
    for (let f = 0; f < F.length; f++)
      a[F[f]].cancel(p);
  }, state: r, steps: a };
}
const { schedule: Ze, cancel: He, state: Je } = /* @__PURE__ */ pe(typeof requestAnimationFrame < "u" ? requestAnimationFrame : D, !0), H = (e) => (t) => typeof t == "string" && t.startsWith(e), Qe = /* @__PURE__ */ H("--"), de = /* @__PURE__ */ H("var(--"), me = (e) => de(e) ? he.test(e.split("/*")[0].trim()) : !1, he = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Xe(e) {
  return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--");
}
const $ = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, J = {
  ...$,
  transform: (e) => I(0, 1, e)
}, Ye = {
  ...$,
  default: 1
}, x = (e) => Math.round(e * 1e5) / 1e5, Q = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ge(e) {
  return e == null;
}
const be = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, B = (e, t) => (n) => !!(typeof n == "string" && be.test(n) && n.startsWith(e) || t && !ge(n) && Object.prototype.hasOwnProperty.call(n, t)), X = (e, t, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, o, a, i] = s.match(Q);
  return {
    [e]: parseFloat(r),
    [t]: parseFloat(o),
    [n]: parseFloat(a),
    alpha: i !== void 0 ? parseFloat(i) : 1
  };
}, xe = (e) => I(0, 255, e), S = {
  ...$,
  transform: (e) => Math.round(xe(e))
}, h = {
  test: /* @__PURE__ */ B("rgb", "red"),
  parse: /* @__PURE__ */ X("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: s = 1 }) => "rgba(" + S.transform(e) + ", " + S.transform(t) + ", " + S.transform(n) + ", " + x(J.transform(s)) + ")"
};
function ye(e) {
  let t = "", n = "", s = "", r = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), s = e.substring(5, 7), r = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), s = e.substring(3, 4), r = e.substring(4, 5), t += t, n += n, s += s, r += r), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const V = {
  test: /* @__PURE__ */ B("#"),
  parse: ye,
  transform: h.transform
}, w = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), ve = /* @__PURE__ */ w("deg"), y = /* @__PURE__ */ w("%"), et = /* @__PURE__ */ w("px"), tt = /* @__PURE__ */ w("vh"), nt = /* @__PURE__ */ w("vw"), rt = {
  ...y,
  parse: (e) => y.parse(e) / 100,
  transform: (e) => y.transform(e * 100)
}, g = {
  test: /* @__PURE__ */ B("hsl", "hue"),
  parse: /* @__PURE__ */ X("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(e) + ", " + y.transform(x(t)) + ", " + y.transform(x(n)) + ", " + x(J.transform(s)) + ")"
}, d = {
  test: (e) => h.test(e) || V.test(e) || g.test(e),
  parse: (e) => h.test(e) ? h.parse(e) : g.test(e) ? g.parse(e) : V.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? h.transform(e) : g.transform(e),
  getAnimatableNone: (e) => {
    const t = d.parse(e);
    return t.alpha = 0, d.transform(t);
  }
}, Te = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function we(e) {
  return isNaN(e) && typeof e == "string" && (e.match(Q)?.length || 0) + (e.match(Te)?.length || 0) > 0;
}
const Y = "number", v = "color", Fe = "var", Ne = "var(", q = "${}", Re = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function T(e) {
  const t = e.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let o = 0;
  const i = t.replace(Re, (l) => (d.test(l) ? (s.color.push(o), r.push(v), n.push(d.parse(l))) : l.startsWith(Ne) ? (s.var.push(o), r.push(Fe), n.push(l)) : (s.number.push(o), r.push(Y), n.push(parseFloat(l))), ++o, q)).split(q);
  return { values: n, split: i, indexes: s, types: r };
}
function Ae(e) {
  return T(e).values;
}
function ee({ split: e, types: t }) {
  const n = e.length;
  return (s) => {
    let r = "";
    for (let o = 0; o < n; o++)
      if (r += e[o], s[o] !== void 0) {
        const a = t[o];
        a === Y ? r += x(s[o]) : a === v ? r += d.transform(s[o]) : r += s[o];
      }
    return r;
  };
}
function Se(e) {
  return ee(T(e));
}
const Ce = (e) => typeof e == "number" ? 0 : d.test(e) ? d.getAnimatableNone(e) : e, Ee = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : Ce(e);
function Me(e) {
  const t = T(e);
  return ee(t)(t.values.map((s, r) => Ee(s, t.split[r])));
}
const Ve = {
  test: we,
  parse: Ae,
  createTransformer: Se,
  getAnimatableNone: Me
};
function C(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Oe({ hue: e, saturation: t, lightness: n, alpha: s }) {
  e /= 360, t /= 100, n /= 100;
  let r = 0, o = 0, a = 0;
  if (!t)
    r = o = a = n;
  else {
    const i = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - i;
    r = C(l, i, e + 1 / 3), o = C(l, i, e), a = C(l, i, e - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(o * 255),
    blue: Math.round(a * 255),
    alpha: s
  };
}
function N(e, t) {
  return (n) => n > 0 ? t : e;
}
const R = (e, t, n) => e + (t - e) * n, E = (e, t, n) => {
  const s = e * e, r = n * (t * t - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, Ie = [V, h, g], Pe = (e) => Ie.find((t) => t.test(e));
function G(e) {
  const t = Pe(e);
  if (P(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let n = t.parse(e);
  return t === g && (n = Oe(n)), n;
}
const _ = (e, t) => {
  const n = G(e), s = G(t);
  if (!n || !s)
    return N(e, t);
  const r = { ...n };
  return (o) => (r.red = E(n.red, s.red, o), r.green = E(n.green, s.green, o), r.blue = E(n.blue, s.blue, o), r.alpha = R(n.alpha, s.alpha, o), h.transform(r));
}, O = /* @__PURE__ */ new Set(["none", "hidden"]);
function $e(e, t) {
  return O.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Be(e, t) {
  return (n) => R(e, t, n);
}
function K(e) {
  return typeof e == "number" ? Be : typeof e == "string" ? me(e) ? N : d.test(e) ? _ : ke : Array.isArray(e) ? te : typeof e == "object" ? d.test(e) ? _ : Ke : N;
}
function te(e, t) {
  const n = [...e], s = n.length, r = e.map((o, a) => K(o)(o, t[a]));
  return (o) => {
    for (let a = 0; a < s; a++)
      n[a] = r[a](o);
    return n;
  };
}
function Ke(e, t) {
  const n = { ...e, ...t }, s = {};
  for (const r in n)
    e[r] !== void 0 && t[r] !== void 0 && (s[r] = K(e[r])(e[r], t[r]));
  return (r) => {
    for (const o in s)
      n[o] = s[o](r);
    return n;
  };
}
function We(e, t) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < t.values.length; r++) {
    const o = t.types[r], a = e.indexes[o][s[o]], i = e.values[a] ?? 0;
    n[r] = i, s[o]++;
  }
  return n;
}
const ke = (e, t) => {
  const n = Ve.createTransformer(t), s = T(e), r = T(t);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? O.has(e) && !r.values.length || O.has(t) && !s.values.length ? $e(e, t) : z(te(We(s, r), r.values), n) : (P(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), N(e, t));
};
function Ue(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? R(e, t, n) : K(e)(e, t);
}
function qe(e, t, n) {
  const s = [], r = n || L.mix || Ue, o = e.length - 1;
  for (let a = 0; a < o; a++) {
    let i = r(e[a], e[a + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[a] || D : t;
      i = z(l, i);
    }
    s.push(i);
  }
  return s;
}
function st(e, t, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const o = e.length;
  if (j(o === t.length, "Both input and output ranges must be the same length", "range-length"), o === 1)
    return () => t[0];
  if (o === 2 && t[0] === t[1])
    return () => t[1];
  const a = e[0] === e[1];
  e[0] > e[o - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const i = qe(t, s, r), l = i.length, m = (c) => {
    if (a && c < e[0])
      return t[0];
    let u = 0;
    if (l > 1)
      for (; u < e.length - 2 && !(c < e[u + 1]); u++)
        ;
    const b = /* @__PURE__ */ Z(e[u], e[u + 1], c);
    return i[u](b);
  };
  return n ? (c) => m(I(e[0], e[o - 1], c)) : m;
}
function Ge(e, t) {
  const n = e[e.length - 1];
  for (let s = 1; s <= t; s++) {
    const r = /* @__PURE__ */ Z(0, t, s);
    e.push(R(n, 1, r));
  }
}
function ot(e) {
  const t = [0];
  return Ge(t, e.length - 1), t;
}
const _e = {};
function ne(e, t) {
  const n = /* @__PURE__ */ le(e);
  return () => _e[t] ?? n();
}
const at = /* @__PURE__ */ ne(() => window.ScrollTimeline !== void 0, "scrollTimeline"), it = /* @__PURE__ */ ne(() => window.ViewTimeline !== void 0, "viewTimeline");
function ct(e, t, n) {
  if (e == null)
    return [];
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let s = document;
    t && (s = t.current);
    const r = n?.[e] ?? s.querySelectorAll(e);
    return r ? Array.from(r) : [];
  }
  return Array.from(e).filter((s) => s != null);
}
function lt(e) {
  return ce(e) && "ownerSVGElement" in e;
}
export {
  ve as A,
  nt as B,
  tt as C,
  Q as D,
  rt as E,
  J as F,
  Ye as G,
  d as H,
  T as I,
  Xe as J,
  pe as K,
  Qe as L,
  L as M,
  R as N,
  Ge as O,
  lt as a,
  at as b,
  He as c,
  st as d,
  ot as e,
  Ze as f,
  I as g,
  Je as h,
  ce as i,
  j,
  P as k,
  z as l,
  Ue as m,
  D as n,
  $ as o,
  Z as p,
  et as q,
  ct as r,
  it as s,
  ne as t,
  Ve as u,
  De as v,
  ze as w,
  le as x,
  me as y,
  y as z
};
