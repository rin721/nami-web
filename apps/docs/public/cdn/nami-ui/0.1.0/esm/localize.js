import { c as e } from "./chunks/runtime-4rCsJ4EI.js";
const t = "en-US", n = [
  "zh-CN"
], a = [
  "en-US",
  "zh-CN"
], l = {
  "zh-CN": () => import("./chunks/zh-CN-BjYLvTzv.js")
}, i = globalThis, c = i.__namiLocalization ??= e({
  sourceLocale: t,
  targetLocales: n,
  loadLocale: (o) => l[o]()
}), u = c.getLocale;
function r(o) {
  return a.includes(o);
}
function s(o) {
  return o && r(o) ? o : t;
}
function z(o) {
  return c.setLocale(s(o));
}
export {
  a as allLocales,
  u as getLocale,
  r as isSupportedLocale,
  s as normalizeLocale,
  z as setLocale,
  t as sourceLocale,
  n as targetLocales
};
