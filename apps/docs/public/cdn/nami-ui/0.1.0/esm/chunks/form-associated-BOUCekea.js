function s(e) {
  try {
    return e.attachInternals();
  } catch {
    return null;
  }
}
function n(e, t) {
  typeof e?.setFormValue == "function" && e.setFormValue(t);
}
function r(e, t, i, a) {
  typeof e?.setValidity == "function" && e.setValidity(t, i, a);
}
function u(e, t = "Field") {
  const i = e.length === 0;
  return {
    flags: i ? { valueMissing: !0 } : {},
    message: i ? `${t} is required` : void 0
  };
}
function f(e, t = "This field is required") {
  return {
    flags: e ? {} : { valueMissing: !0 },
    message: e ? void 0 : t
  };
}
export {
  s as a,
  r as b,
  u as c,
  f as r,
  n as s
};
