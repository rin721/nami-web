const n = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function s(t) {
  const e = [
    ...Array.from(t.querySelectorAll(n)),
    ...u(t)
  ];
  return Array.from(new Set(e)).filter(l);
}
function u(t) {
  return Array.from(t.querySelectorAll("slot")).flatMap((e) => e.assignedElements({ flatten: !0 }).flatMap((r) => r instanceof HTMLElement ? [
    ...r.matches(n) ? [r] : [],
    ...Array.from(r.querySelectorAll(n))
  ] : []));
}
function l(t) {
  return !t.hasAttribute("disabled") && t.tabIndex >= 0;
}
function i(t, e) {
  if (t.key !== "Tab") return;
  const r = s(e);
  if (r.length === 0) return;
  const a = r[0], o = r[r.length - 1];
  t.shiftKey && document.activeElement === a ? (t.preventDefault(), o.focus()) : !t.shiftKey && document.activeElement === o && (t.preventDefault(), a.focus());
}
function c(t) {
  t instanceof HTMLElement && t.focus();
}
function f(t) {
  return t ? "open" : "closed";
}
function d() {
  return document.activeElement;
}
function b(t) {
  c(t);
}
function y(t) {
  return t ? { sourceEvent: t } : void 0;
}
function m(t) {
  return t.key === "Escape";
}
function E(t, e) {
  return t.target === e;
}
function p(t, e = "ltr") {
  return t === "start" ? e === "rtl" ? "right" : "left" : t === "end" ? e === "rtl" ? "left" : "right" : t;
}
export {
  y as a,
  m as b,
  d as c,
  p as d,
  s as g,
  E as i,
  f as o,
  b as r,
  i as t
};
