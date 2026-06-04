function f(t) {
  try {
    return t.attachInternals();
  } catch {
    return null;
  }
}
function i(t, a) {
  typeof t?.setFormValue == "function" && t.setFormValue(a);
}
function o(t, a, e, n) {
  typeof t?.setValidity == "function" && t.setValidity(a, e, n);
}
export {
  f as a,
  o as b,
  i as s
};
