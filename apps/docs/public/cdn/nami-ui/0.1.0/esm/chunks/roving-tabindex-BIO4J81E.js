function i(r) {
  return r.getAttribute("value") || r.dataset.value || r.textContent?.trim() || "";
}
function s(r, e, t, n) {
  const o = n === "vertical" ? ["ArrowDown"] : ["ArrowRight"], u = n === "vertical" ? ["ArrowUp"] : ["ArrowLeft"];
  return r === "Home" ? 0 : r === "End" ? t - 1 : o.includes(r) ? (e + 1) % t : u.includes(r) ? (e - 1 + t) % t : e;
}
export {
  i as a,
  s as g
};
