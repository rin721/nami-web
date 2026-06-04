const a = "#3b82f6";
function n(t) {
  const e = t.stylePreset ?? "default";
  return {
    "data-nami-theme": t.theme ?? "light",
    "data-nami-density": t.density ?? "comfortable",
    "data-nami-motion": t.motion ?? "normal",
    "data-nami-style": e === "ant-illustration" ? "illustration" : e
  };
}
export {
  a as defaultAccent,
  n as themeAttributes
};
