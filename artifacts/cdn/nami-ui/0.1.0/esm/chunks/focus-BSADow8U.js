const n = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function a(t) {
  const r = [
    ...Array.from(t.querySelectorAll(n)),
    ...l(t)
  ];
  return Array.from(new Set(r)).filter(u);
}
function l(t) {
  return Array.from(t.querySelectorAll("slot")).flatMap((r) => r.assignedElements({ flatten: !0 }).flatMap((e) => e instanceof HTMLElement ? [
    ...e.matches(n) ? [e] : [],
    ...Array.from(e.querySelectorAll(n))
  ] : []));
}
function u(t) {
  return !t.hasAttribute("disabled") && t.tabIndex >= 0;
}
function c(t, r) {
  if (t.key !== "Tab") return;
  const e = a(r);
  if (e.length === 0) return;
  const s = e[0], o = e[e.length - 1];
  t.shiftKey && document.activeElement === s ? (t.preventDefault(), o.focus()) : !t.shiftKey && document.activeElement === o && (t.preventDefault(), s.focus());
}
function f(t) {
  t instanceof HTMLElement && t.focus();
}
export {
  a as g,
  f as r,
  c as t
};
