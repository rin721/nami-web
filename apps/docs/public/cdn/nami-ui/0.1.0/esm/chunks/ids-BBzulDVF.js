const e = /* @__PURE__ */ new Map();
function o(n) {
  const t = (e.get(n) ?? 0) + 1;
  return e.set(n, t), `${n}-${t}`;
}
export {
  o as n
};
