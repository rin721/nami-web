function o(e, t, n, u = {}) {
  return e.dispatchEvent(
    new CustomEvent(t, {
      bubbles: !0,
      composed: !0,
      ...u,
      detail: n
    })
  );
}
export {
  o as e
};
