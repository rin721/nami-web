const x = "lit-localize-status";
const j = (e) => typeof e != "string" && "strTag" in e, _ = (e, t, r) => {
  let n = e[0];
  for (let s = 1; s < e.length; s++)
    n += t[r ? r[s - 1] : s - 1], n += e[s];
  return n;
};
const M = ((e) => j(e) ? _(e.strings, e.values) : e);
let m = M, L = !1;
function P(e) {
  if (L)
    throw new Error("lit-localize can only be configured once");
  m = e, L = !0;
}
class p {
  constructor() {
    this.settled = !1, this.promise = new Promise((t, r) => {
      this._resolve = t, this._reject = r;
    });
  }
  resolve(t) {
    this.settled = !0, this._resolve(t);
  }
  reject(t) {
    this.settled = !0, this._reject(t);
  }
}
const i = [];
for (let e = 0; e < 256; e++)
  i[e] = (e >> 4 & 15).toString(16) + (e & 15).toString(16);
function A(e) {
  let t = 0, r = 8997, n = 0, s = 33826, o = 0, a = 40164, g = 0, c = 52210;
  for (let h = 0; h < e.length; h++)
    r ^= e.charCodeAt(h), t = r * 435, n = s * 435, o = a * 435, g = c * 435, o += r << 8, g += s << 8, n += t >>> 16, r = t & 65535, o += n >>> 16, s = n & 65535, c = g + (o >>> 16) & 65535, a = o & 65535;
  return i[c >> 8] + i[c & 255] + i[a >> 8] + i[a & 255] + i[s >> 8] + i[s & 255] + i[r >> 8] + i[r & 255];
}
const R = "", z = "h", C = "s";
function H(e, t) {
  return (t ? z : C) + A(typeof e == "string" ? e : e.join(R));
}
const S = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new Map();
function b(e, t, r) {
  if (e) {
    const n = r?.id ?? q(t), s = e[n];
    if (s) {
      if (typeof s == "string")
        return s;
      if ("strTag" in s)
        return _(
          s.strings,
          // Cast `template` because its type wasn't automatically narrowed (but
          // we know it must be the same type as `localized`).
          t.values,
          s.values
        );
      {
        let o = S.get(s);
        return o === void 0 && (o = s.values, S.set(s, o)), {
          ...s,
          values: o.map((a) => t.values[a])
        };
      }
    }
  }
  return M(t);
}
function q(e) {
  const t = typeof e == "string" ? e : e.strings;
  let r = T.get(t);
  return r === void 0 && (r = H(t, typeof e != "string" && !("strTag" in e)), T.set(t, r)), r;
}
function v(e) {
  window.dispatchEvent(new CustomEvent(x, { detail: e }));
}
let d = "", E, y, f, I, w, l = new p();
l.resolve();
let u = 0;
const N = (e) => (P(((t, r) => b(w, t, r))), d = y = e.sourceLocale, f = new Set(e.targetLocales), f.add(e.sourceLocale), I = e.loadLocale, { getLocale: D, setLocale: F }), D = () => d, F = (e) => {
  if (e === (E ?? d))
    return l.promise;
  if (!f || !I)
    throw new Error("Internal error");
  if (!f.has(e))
    throw new Error("Invalid locale code");
  u++;
  const t = u;
  return E = e, l.settled && (l = new p()), v({ status: "loading", loadingLocale: e }), (e === y ? (
    // We could switch to the source locale synchronously, but we prefer to
    // queue it on a microtask so that switching locales is consistently
    // asynchronous.
    Promise.resolve({ templates: void 0 })
  ) : I(e)).then((n) => {
    u === t && (d = e, E = void 0, w = n.templates, v({ status: "ready", readyLocale: e }), l.resolve());
  }, (n) => {
    u === t && (v({
      status: "error",
      errorLocale: e,
      errorMessage: n.toString()
    }), l.reject(n));
  }), l.promise;
};
export {
  x as L,
  N as c,
  m
};
