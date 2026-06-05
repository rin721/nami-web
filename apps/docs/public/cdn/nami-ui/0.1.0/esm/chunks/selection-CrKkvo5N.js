function a(e) {
  return e ? "checked" : "unchecked";
}
function d(e) {
  return e ? "selected" : "unselected";
}
function i(e) {
  return e ? "active" : "inactive";
}
function c(e, t) {
  e.dataset.state = t.state, t.disabled !== void 0 && e.toggleAttribute("data-disabled", t.disabled), t.invalid !== void 0 && e.toggleAttribute("data-invalid", t.invalid), t.loading !== void 0 && e.toggleAttribute("data-loading", t.loading);
}
export {
  d as a,
  i as b,
  a as c,
  c as s
};
