import { i as V, a as A, b as D } from "../chunks/lit-element-GeMXvhiH.js";
import { c as M } from "../chunks/styles-C6m3uqJJ.js";
const p = {
  accent: "#3b82f6",
  mode: "light",
  stylePreset: "default",
  density: "comfortable",
  size: "md",
  motion: "normal",
  radius: "round",
  contrast: "normal"
}, P = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, m = {
  mode: ["light", "dark"],
  stylePreset: ["default", "illustration"],
  density: ["comfortable", "compact"],
  size: ["sm", "md", "lg"],
  motion: ["normal", "reduced"],
  radius: ["sharp", "soft", "round"],
  contrast: ["normal", "high"]
};
function c(t, a) {
  return typeof t == "string" && a.includes(t);
}
function f(t, a) {
  return {
    code: "invalid-enum",
    message: `Unsupported ${String(t)} value "${String(a)}". Falling back to the default theme seed.`,
    path: t,
    severity: "warning"
  };
}
function R(t) {
  const a = [];
  return t.accent !== void 0 && !P.test(t.accent) && a.push({
    code: "invalid-accent",
    message: `Accent must be a 3 or 6 digit hex color. Received "${t.accent}".`,
    path: "accent",
    severity: "warning"
  }), t.mode !== void 0 && !c(t.mode, m.mode) && a.push(f("mode", t.mode)), t.stylePreset !== void 0 && !c(t.stylePreset, m.stylePreset) && a.push(f("stylePreset", t.stylePreset)), t.density !== void 0 && !c(t.density, m.density) && a.push(f("density", t.density)), t.size !== void 0 && !c(t.size, m.size) && a.push(f("size", t.size)), t.motion !== void 0 && !c(t.motion, m.motion) && a.push(f("motion", t.motion)), t.radius !== void 0 && !c(t.radius, m.radius) && a.push(f("radius", t.radius)), t.contrast !== void 0 && !c(t.contrast, m.contrast) && a.push(f("contrast", t.contrast)), a;
}
function E(t) {
  return {
    accent: t.accent && P.test(t.accent) ? t.accent : p.accent,
    mode: c(t.mode, m.mode) ? t.mode : p.mode,
    stylePreset: c(t.stylePreset, m.stylePreset) ? t.stylePreset : p.stylePreset,
    density: c(t.density, m.density) ? t.density : p.density,
    size: c(t.size, m.size) ? t.size : p.size,
    motion: c(t.motion, m.motion) ? t.motion : p.motion,
    radius: c(t.radius, m.radius) ? t.radius : p.radius,
    contrast: c(t.contrast, m.contrast) ? t.contrast : p.contrast
  };
}
function L(t) {
  return t.replace(/^--nami-/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[\s_.]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
function T(t) {
  return t.length === 1 && t[0].startsWith("--") ? t[0] : `--nami-${t.map(L).filter(Boolean).join("-")}`;
}
function g(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
function C(t) {
  return g(t) && "value" in t;
}
function B(t) {
  return String(C(t) ? t.value : t);
}
function d(t, a = []) {
  const r = {};
  if (!t)
    return r;
  for (const [i, n] of Object.entries(t)) {
    const o = i.startsWith("--") ? [i] : [...a, i];
    if (C(n) || typeof n == "string" || typeof n == "number") {
      r[T(o)] = B(n);
      continue;
    }
    g(n) && Object.assign(r, d(n, o));
  }
  return r;
}
function I(t) {
  const a = {};
  if (!t)
    return a;
  for (const [r, i] of Object.entries(t)) {
    const n = g(i) && "tokens" in i ? i.tokens : i;
    Object.assign(a, d(n, [r]));
  }
  return a;
}
function z(t) {
  return {
    ...d(t?.tokens),
    ...d(t?.semanticTokens),
    ...I(t?.components)
  };
}
function F(t, a) {
  const r = a.seed, i = t.cssVariablesResolver?.(a) ?? {};
  return {
    ...z(t),
    ...z(t.modes?.[r.mode]),
    ...d(t.density?.[r.density]),
    ...d(t.size?.[r.size]),
    ...d(t.motion?.[r.motion]),
    ...d(t.radius?.[r.radius]),
    ...d(t.contrast?.[r.contrast]),
    ...Object.fromEntries(Object.entries(i.variables ?? {}).map(([n, o]) => [n, String(o)])),
    ...Object.fromEntries(Object.entries(i[r.mode] ?? {}).map(([n, o]) => [n, String(o)]))
  };
}
function s(t, a, r) {
  return `color-mix(in oklab, ${t}, ${a} ${r}%)`;
}
function e(t, a) {
  return `color-mix(in oklab, ${t}, transparent ${a}%)`;
}
function Q(t) {
  const a = "var(--nami-accent-50)", r = t.mode === "dark";
  return {
    "--nami-accent-50": t.accent,
    "--nami-accent-90": s(a, r ? "#fff" : "#000", r ? 80 : 40),
    "--nami-accent-80": s(a, r ? "#fff" : "#000", r ? 60 : 30),
    "--nami-accent-70": s(a, r ? "#fff" : "#000", r ? 40 : 20),
    "--nami-accent-60": s(a, r ? "#fff" : "#000", r ? 20 : 10),
    "--nami-accent-40": s(a, r ? "#000" : "#fff", r ? 10 : 20),
    "--nami-accent-30": s(a, r ? "#000" : "#fff", r ? 20 : 40),
    "--nami-accent-20": s(a, r ? "#000" : "#fff", r ? 30 : 60),
    "--nami-accent-10": s(a, r ? "#000" : "#fff", r ? 40 : 80),
    "--nami-accent-5": s(a, r ? "#000" : "#fff", r ? 50 : 90),
    "--nami-neutral-10": s(a, "#b3b3b3", 84),
    "--nami-neutral-50": s(a, r ? "#eef2f7" : "#646a73", 94)
  };
}
function X(t) {
  return t.radius === "sharp" ? {
    "--nami-radius-control": "4px",
    "--nami-radius-surface": "4px",
    "--nami-radius-tight": "2px",
    "--nami-radius-round": "999px"
  } : t.radius === "soft" ? {
    "--nami-radius-control": "10px",
    "--nami-radius-surface": "8px",
    "--nami-radius-tight": "4px",
    "--nami-radius-round": "999px"
  } : {
    "--nami-radius-control": "999px",
    "--nami-radius-surface": "6px",
    "--nami-radius-tight": "4px",
    "--nami-radius-round": "999px"
  };
}
function U(t) {
  return t.density === "compact" ? {
    "--nami-control-height-sm": "28px",
    "--nami-control-height-md": "34px",
    "--nami-control-height-lg": "40px",
    "--nami-space-1": "2px",
    "--nami-space-2": "4px",
    "--nami-space-3": "8px",
    "--nami-space-4": "12px",
    "--nami-space-5": "16px",
    "--nami-icon-button-size": "36px",
    "--nami-layout-gutter": "12px"
  } : {
    "--nami-control-height-sm": "32px",
    "--nami-control-height-md": "40px",
    "--nami-control-height-lg": "48px",
    "--nami-space-1": "4px",
    "--nami-space-2": "6px",
    "--nami-space-3": "10px",
    "--nami-space-4": "16px",
    "--nami-space-5": "24px",
    "--nami-icon-button-size": "40px",
    "--nami-layout-gutter": "16px"
  };
}
function W(t) {
  const r = {
    sm: {
      height: "var(--nami-control-height-sm)",
      paddingX: "12px",
      fontSize: "0.875rem",
      iconSize: "16px"
    },
    md: {
      height: "var(--nami-control-height-md)",
      paddingX: "16px",
      fontSize: "0.9375rem",
      iconSize: "18px"
    },
    lg: {
      height: "var(--nami-control-height-lg)",
      paddingX: "20px",
      fontSize: "1rem",
      iconSize: "20px"
    }
  }[t.size];
  return {
    "--nami-control-height": r.height,
    "--nami-control-padding-x": r.paddingX,
    "--nami-control-font-size": r.fontSize,
    "--nami-icon-size": r.iconSize,
    "--nami-icon-button-size": "var(--nami-control-height)"
  };
}
function H() {
  return {
    "--nami-breakpoint-compact": "639px",
    "--nami-breakpoint-medium": "880px",
    "--nami-breakpoint-wide": "1080px",
    "--nami-container-sm": "720px",
    "--nami-container-md": "960px",
    "--nami-container-lg": "1240px",
    "--nami-app-shell-rail-width": "56px",
    "--nami-app-shell-mobile-bar-height": "56px",
    "--nami-app-shell-breakpoint": "639px"
  };
}
function K(t) {
  return t.motion === "reduced" ? {
    "--nami-motion-fast": "1ms",
    "--nami-motion-normal": "1ms",
    "--nami-motion-slow": "1ms",
    "--nami-motion-exit": "1ms",
    "--nami-ease-standard": "linear",
    "--nami-ease-emphasized": "linear"
  } : {
    "--nami-motion-fast": "120ms",
    "--nami-motion-normal": "250ms",
    "--nami-motion-slow": "700ms",
    "--nami-motion-exit": "150ms",
    "--nami-ease-standard": "cubic-bezier(0.19, 1, 0.22, 1)",
    "--nami-ease-emphasized": "cubic-bezier(0.1, 0.9, 0.2, 1)"
  };
}
function N(t) {
  const a = t.mode === "dark", r = t.contrast === "high";
  return {
    "--nami-color-primary": "var(--nami-accent-50)",
    "--nami-color-primary-hover": a ? "var(--nami-accent-60)" : "var(--nami-accent-40)",
    "--nami-color-primary-pressed": a ? "var(--nami-accent-40)" : "var(--nami-accent-60)",
    "--nami-color-primary-focus": "var(--nami-accent-30)",
    "--nami-color-primary-muted": "var(--nami-accent-10)",
    "--nami-color-danger": a ? "#ff7875" : "#dc2626",
    "--nami-surface": a ? "#151718" : "#ffffff",
    "--nami-surface-raised": a ? "#1c1f21" : "#ffffff",
    "--nami-surface-inset": a ? e("#fff", 94) : e("#000", 97),
    "--nami-surface-overlay": a ? e("#17191b", 16) : e("#fff", 18),
    "--nami-border": r ? a ? e("#fff", 70) : e("#000", 68) : a ? e("#fff", 86) : e("#000", 88),
    "--nami-border-strong": r ? e(a ? "#fff" : "#000", 54) : a ? e("#fff", 72) : e("#000", 76),
    "--nami-text": a ? "#f8fafc" : "#171717",
    "--nami-text-muted": r ? a ? "#d8dee8" : "#3f4652" : a ? "#a1a8b3" : "#666b74",
    "--nami-text-inverse": "#ffffff",
    "--nami-icon-color": "var(--nami-neutral-50)",
    "--nami-hover-overlay": a ? e("#fff", r ? 88 : 94) : e("#000", r ? 90 : 95),
    "--nami-ripple": a ? e("#fff", 84) : e("#000", 86),
    "--nami-overlay-backdrop": a ? e("#000", 38) : e("#000", 52),
    "--nami-accent-ripple": e("var(--nami-color-primary-pressed)", r ? 72 : 84),
    "--nami-accent-hover-overlay": e("var(--nami-color-primary-hover)", r ? 82 : 90),
    "--nami-focus-ring": r ? `0 0 0 4px ${e("var(--nami-color-primary-focus)", 20)}, 0 0 0 1px var(--nami-color-primary)` : `0 4px 4px ${e("var(--nami-color-primary)", 74)}, 0 0 0 3px ${e("var(--nami-color-primary-focus)", 46)}`
  };
}
function _(t) {
  return {
    "--nami-font-sans": 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    "--nami-font-mono": '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    "--nami-shadow-color": t.mode === "dark" ? "#000" : s("var(--nami-accent-50)", "#8a8f98", 80),
    "--nami-style-stroke-width": t.contrast === "high" ? "2px" : "1px",
    "--nami-style-stroke-color": "var(--nami-border)",
    "--nami-style-ink-color": "var(--nami-text)",
    "--nami-style-on-paper": "var(--nami-text)",
    "--nami-style-on-paper-muted": "var(--nami-text-muted)",
    "--nami-style-offset-shadow": "none",
    "--nami-style-control-bg": "transparent",
    "--nami-style-panel-bg": "var(--nami-surface-raised)",
    "--nami-style-paper-bg": "var(--nami-surface)",
    "--nami-style-border-radius": "var(--nami-radius-surface)",
    "--nami-style-background-pattern": "none",
    "--nami-style-doodle-opacity": "0",
    "--nami-style-paper-line-color": "var(--nami-border)",
    "--nami-style-focus-shadow": "var(--nami-focus-ring)"
  };
}
function q(t) {
  const a = t.mode === "dark", r = t.contrast === "high" ? "4px" : "3px";
  return {
    "--nami-font-sans": 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    "--nami-font-mono": '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    "--nami-shadow-color": a ? "#000" : "#2f2f2f",
    "--nami-style-stroke-width": r,
    "--nami-style-ink-color": a ? "#261f1f" : "#2f2f2f",
    "--nami-style-stroke-color": "var(--nami-style-ink-color)",
    "--nami-style-on-paper": a ? "#29221f" : "#2f2f2f",
    "--nami-style-on-paper-muted": a ? "#6b5f58" : "#62656b",
    "--nami-style-offset-shadow": a ? "6px 6px 0 #050506" : "5px 5px 0 var(--nami-style-ink-color)",
    "--nami-style-control-bg": a ? s("#fff8ea", "var(--nami-accent-50)", 5) : "#fffefe",
    "--nami-style-panel-bg": a ? s("#fff1f5", "var(--nami-accent-50)", 7) : s("#fff3f7", "#fff", 18),
    "--nami-style-paper-bg": a ? s("#fffdf3", "var(--nami-accent-50)", 4) : "#fff8fb",
    "--nami-style-border-radius": t.radius === "sharp" ? "8px" : t.radius === "soft" ? "14px" : "16px",
    "--nami-style-doodle-opacity": a ? "0.34" : "0.42",
    "--nami-style-paper-line-color": a ? "rgb(38 31 31 / 0.18)" : e("var(--nami-style-ink-color)", 84),
    "--nami-style-focus-shadow": a ? `0 0 0 4px ${e("var(--nami-color-primary)", 58)}, 4px 4px 0 #050506` : `0 0 0 4px ${e("var(--nami-color-primary)", 70)}, 4px 4px 0 var(--nami-style-ink-color)`,
    "--nami-style-background-pattern": a ? `radial-gradient(circle at 10% 18%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 14px, transparent 15px),
    radial-gradient(circle at 88% 14%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 10px, transparent 11px),
    radial-gradient(circle at 74% 80%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 20px, transparent 21px),
    linear-gradient(135deg, transparent 0 46%, ${e("#fff7ed", 82)} 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${e("var(--nami-accent-50)", 62)} 71% 73%, transparent 74%)` : `radial-gradient(circle at 12% 22%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 12px, transparent 13px),
    radial-gradient(circle at 86% 16%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 9px, transparent 10px),
    radial-gradient(circle at 72% 78%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 18px, transparent 19px),
    linear-gradient(135deg, transparent 0 46%, var(--nami-style-paper-line-color) 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${e("var(--nami-accent-50)", 82)} 71% 73%, transparent 74%)`
  };
}
function G(t) {
  const a = t.stylePreset === "illustration", r = a && t.mode === "dark", i = t.contrast === "high";
  return {
    "--nami-button-bg": "var(--nami-color-primary)",
    "--nami-button-fg": "#fff",
    "--nami-button-border": a ? "var(--nami-style-stroke-color)" : i ? "var(--nami-color-primary)" : "transparent",
    "--nami-button-border-width": a ? "var(--nami-style-stroke-width)" : i ? "2px" : "1px",
    "--nami-button-radius": "var(--nami-radius-control)",
    "--nami-button-shadow": a ? "var(--nami-style-offset-shadow)" : "none",
    "--nami-button-hover-bg": "var(--nami-color-primary-hover)",
    "--nami-card-bg": a ? "var(--nami-style-control-bg)" : "var(--nami-surface-raised)",
    "--nami-card-fg": a ? "var(--nami-style-on-paper)" : "var(--nami-text)",
    "--nami-card-inset-bg": a ? r ? "var(--nami-style-paper-bg)" : s("var(--nami-style-paper-bg)", "var(--nami-accent-50)", 5) : "var(--nami-surface-inset)",
    "--nami-card-border": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-card-border-width": "var(--nami-style-stroke-width)",
    "--nami-card-radius": a ? "var(--nami-style-border-radius)" : "var(--nami-radius-surface)",
    "--nami-card-shadow": a ? "var(--nami-style-offset-shadow)" : "none",
    "--nami-card-padding": "var(--nami-space-4)",
    "--nami-card-gap": "var(--nami-space-3)",
    "--nami-badge-bg": a ? r ? "var(--nami-style-control-bg)" : s("var(--nami-accent-50)", "#fff", 88) : "var(--nami-hover-overlay)",
    "--nami-badge-fg": a ? "var(--nami-style-on-paper)" : "var(--nami-text)",
    "--nami-badge-border": a ? "var(--nami-style-stroke-color)" : "transparent",
    "--nami-badge-border-width": "var(--nami-style-stroke-width)",
    "--nami-badge-radius": "var(--nami-radius-control)",
    "--nami-badge-height": "24px",
    "--nami-badge-font-size": "0.75rem",
    "--nami-badge-padding-x": "9px",
    "--nami-soft-control-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-soft-control-color": a ? "var(--nami-style-on-paper)" : "var(--nami-text)",
    "--nami-soft-control-border-width": a ? "var(--nami-style-stroke-width)" : "0",
    "--nami-soft-control-border-color": a ? "var(--nami-style-stroke-color)" : "transparent",
    "--nami-chip-bg": a ? r ? "var(--nami-style-control-bg)" : s("var(--nami-accent-50)", "#fff", 92) : "var(--nami-hover-overlay)",
    "--nami-chip-selected-bg": "var(--nami-color-primary)",
    "--nami-chip-border-width": a ? "var(--nami-style-stroke-width)" : "0",
    "--nami-chip-border-color": a ? "var(--nami-style-stroke-color)" : "transparent",
    "--nami-chip-radius": "var(--nami-radius-control)",
    "--nami-chip-shadow": a ? `3px 3px 0 ${r ? "#050506" : "#2f2f2f"}` : "none",
    "--nami-input-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-input-border": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-input-border-width": a ? "var(--nami-style-stroke-width)" : i ? "2px" : "1px",
    "--nami-input-radius": a ? "12px" : "var(--nami-radius-control)",
    "--nami-input-shadow": a ? `3px 3px 0 ${r ? "#050506" : "#2f2f2f"}` : "none",
    "--nami-switch-track-bg": a ? "var(--nami-style-control-bg)" : "var(--nami-hover-overlay)",
    "--nami-switch-border-width": "var(--nami-style-stroke-width)",
    "--nami-switch-border-color": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-switch-thumb-bg": a ? "var(--nami-style-paper-bg)" : "var(--nami-surface-raised)",
    "--nami-switch-thumb-shadow": a ? `2px 2px 0 ${r ? "#050506" : "var(--nami-style-ink-color)"}` : `0 1px 4px ${e("var(--nami-shadow-color)", 64)}`,
    "--nami-radio-card-bg": a ? "var(--nami-style-control-bg)" : "var(--nami-surface-raised)",
    "--nami-radio-card-border-width": a ? "var(--nami-style-stroke-width)" : i ? "2px" : "1px",
    "--nami-radio-card-border-color": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-radio-card-radius": a ? "var(--nami-style-border-radius)" : "var(--nami-radius-surface)",
    "--nami-radio-card-shadow": a ? "var(--nami-style-offset-shadow)" : "none",
    "--nami-radio-card-selected-shadow": a ? "0 0 0 2px var(--nami-color-primary), var(--nami-style-offset-shadow)" : "0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring)",
    "--nami-tab-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-tab-border-width": a ? "var(--nami-style-stroke-width)" : "0",
    "--nami-tab-border-color": a ? "var(--nami-style-stroke-color)" : "transparent",
    "--nami-tab-radius": a ? "12px" : "var(--nami-radius-control)",
    "--nami-dialog-bg": a ? "var(--nami-style-panel-bg)" : "var(--nami-surface-raised)",
    "--nami-dialog-border-width": a ? "var(--nami-style-stroke-width)" : "1px",
    "--nami-dialog-border-color": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-dialog-radius": a ? "18px" : "var(--nami-radius-surface)",
    "--nami-dialog-shadow": a ? "var(--nami-style-offset-shadow)" : `0 18px 50px ${e("var(--nami-shadow-color)", 54)}`,
    "--nami-drawer-bg": a ? "var(--nami-style-panel-bg)" : "var(--nami-surface-overlay)",
    "--nami-drawer-border-width": a ? "var(--nami-style-stroke-width)" : "1px",
    "--nami-drawer-border-color": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-drawer-shadow": a ? "var(--nami-style-offset-shadow)" : `0 8px 24px ${e("var(--nami-shadow-color)", 52)}`,
    "--nami-toast-bg": a ? "var(--nami-style-control-bg)" : "var(--nami-surface-raised)",
    "--nami-toast-border-width": a ? "var(--nami-style-stroke-width)" : "1px",
    "--nami-toast-border-color": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-toast-radius": a ? "14px" : "var(--nami-radius-surface)",
    "--nami-app-shell-border-width": a ? "var(--nami-style-stroke-width)" : "1px",
    "--nami-app-shell-shadow": a ? `4px 0 0 ${r ? "#050506" : "#2f2f2f"}` : "none",
    "--nami-spinner-track-color": e("currentColor", a ? 64 : 72),
    "--nami-transition-progress-height": a ? "5px" : "4px",
    "--nami-page-transition-z-index": "2147483646",
    "--nami-top-progress-height": "var(--nami-transition-progress-height)",
    "--nami-top-progress-duration": t.motion === "reduced" ? "1ms" : "260ms",
    "--nami-top-progress-ease": "var(--nami-ease-standard)",
    "--nami-top-progress-indeterminate-duration": t.motion === "reduced" ? "1ms" : "1280ms",
    "--nami-top-progress-track-bg": a ? r ? s("var(--nami-color-primary)", "var(--nami-style-panel-bg)", 68) : s("var(--nami-color-primary)", "#fff", 78) : "color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 72%)",
    "--nami-top-progress-fill-bg": a ? "var(--nami-color-primary)" : "color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%)",
    "--nami-top-progress-shadow": a ? `0 4px 0 ${r ? "#050506" : "var(--nami-style-ink-color)"}` : `0 8px 24px ${e("var(--nami-color-primary)", 78)}`,
    "--nami-top-progress-z-index": "2147483647",
    "--nami-illus-primary": "var(--nami-color-primary)",
    "--nami-illus-secondary": a ? s("var(--nami-color-primary)", "#fff", r ? 38 : 58) : "var(--nami-accent-20)",
    "--nami-illus-accent": r ? "#ffd166" : "#f5b84b",
    "--nami-illus-muted": a ? e("var(--nami-style-on-paper-muted)", r ? 24 : 44) : e("var(--nami-text-muted)", 48),
    "--nami-illus-line": a ? "var(--nami-style-stroke-color)" : e("var(--nami-text)", 36),
    "--nami-illus-bg": a ? e("var(--nami-color-primary)", r ? 84 : 90) : "var(--nami-color-primary-muted)",
    "--nami-illus-size-sm": "92px",
    "--nami-illus-size-md": "140px",
    "--nami-illus-size-lg": "184px",
    "--nami-empty-gap": "12px",
    "--nami-empty-title-color": a ? "var(--nami-style-on-paper)" : "var(--nami-text)",
    "--nami-empty-description-color": a ? "var(--nami-style-on-paper-muted)" : "var(--nami-text-muted)",
    "--nami-empty-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-empty-border-width": a ? "var(--nami-style-stroke-width)" : "0",
    "--nami-empty-border-color": a ? "var(--nami-style-stroke-color)" : "transparent",
    "--nami-empty-radius": a ? "var(--nami-style-border-radius)" : "var(--nami-radius-surface)",
    "--nami-empty-shadow": a ? "var(--nami-style-offset-shadow)" : "none",
    "--nami-result-title-size": "1.5rem",
    "--nami-result-subtitle-size": "0.95rem",
    "--nami-result-gap": "14px",
    "--nami-result-actions-margin": "10px 0 0",
    "--nami-result-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-result-border-width": a ? "var(--nami-style-stroke-width)" : "0",
    "--nami-result-border-color": a ? "var(--nami-style-stroke-color)" : "transparent",
    "--nami-result-radius": a ? "var(--nami-style-border-radius)" : "var(--nami-radius-surface)",
    "--nami-result-shadow": a ? "var(--nami-style-offset-shadow)" : "none",
    "--nami-container-max-width": "var(--nami-container-lg)",
    "--nami-container-padding": "var(--nami-layout-gutter)",
    "--nami-stack-gap": "var(--nami-space-3)",
    "--nami-cluster-gap": "var(--nami-space-2)",
    "--nami-grid-min": "16rem",
    "--nami-grid-gap": "var(--nami-layout-gutter)",
    "--nami-split-min": "18rem",
    "--nami-split-gap": "var(--nami-layout-gutter)",
    "--nami-checkbox-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-checkbox-border": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-checkbox-border-width": a ? "var(--nami-style-stroke-width)" : i ? "2px" : "1px",
    "--nami-checkbox-radius": t.radius === "round" ? "6px" : "var(--nami-radius-tight)",
    "--nami-checkbox-indicator-color": "#fff",
    "--nami-textarea-bg": a ? "var(--nami-style-control-bg)" : "transparent",
    "--nami-textarea-border": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-textarea-border-width": a ? "var(--nami-style-stroke-width)" : i ? "2px" : "1px",
    "--nami-textarea-radius": a ? "12px" : "var(--nami-radius-surface)",
    "--nami-textarea-shadow": a ? `3px 3px 0 ${r ? "#050506" : "#2f2f2f"}` : "none",
    "--nami-form-field-gap": "var(--nami-space-2)",
    "--nami-alert-bg": a ? "var(--nami-style-control-bg)" : "var(--nami-surface-raised)",
    "--nami-alert-border": a ? "var(--nami-style-stroke-color)" : "var(--nami-border)",
    "--nami-alert-border-width": a ? "var(--nami-style-stroke-width)" : i ? "2px" : "1px",
    "--nami-alert-radius": a ? "var(--nami-style-border-radius)" : "var(--nami-radius-surface)",
    "--nami-alert-shadow": a ? "var(--nami-style-offset-shadow)" : "none",
    "--nami-skeleton-bg": a ? e("var(--nami-style-on-paper-muted)", 82) : "var(--nami-hover-overlay)",
    "--nami-skeleton-highlight": a ? e("var(--nami-style-paper-bg)", 18) : e("#fff", r ? 82 : 18),
    "--nami-progress-track-bg": a ? r ? s("var(--nami-color-primary)", "var(--nami-style-panel-bg)", 72) : s("var(--nami-color-primary)", "#fff", 84) : "color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%)",
    "--nami-progress-fill-bg": "var(--nami-color-primary)",
    "--nami-progress-height": "8px",
    "--nami-progress-radius": "var(--nami-radius-control)"
  };
}
function Z(t = {}) {
  const a = E(t), r = R(t), i = Q(a), n = N(a), o = a.stylePreset === "illustration" ? q(a) : _(a), l = G(a), u = {
    ...i,
    ...X(a),
    ...H(),
    "--nami-contrast-level": a.contrast,
    ...U(a),
    ...W(a),
    ...K(a),
    ...n,
    ...o,
    ...l
  };
  return {
    seed: a,
    palette: i,
    semantic: n,
    component: l,
    style: o,
    cssVars: u,
    diagnostics: r
  };
}
function J(t) {
  return {
    ...t,
    seed: { ...t.seed },
    recipes: { ...t.recipes },
    slotRecipes: { ...t.slotRecipes },
    conditions: { ...t.conditions }
  };
}
function $(t) {
  return t.startsWith("--") ? t : T(t.split("."));
}
function Y(t) {
  return /^#|^rgb|^hsl|color-mix\(/.test(t) ? "color" : /^-?\d+(\.\d+)?(px|rem|em|%|dvh|dvw|vh|vw)$/.test(t) ? "dimension" : /^-?\d+(\.\d+)?m?s$/.test(t) ? "duration" : /^-?\d+(\.\d+)?$/.test(t) ? "number" : /cubic-bezier|linear/.test(t) ? "cubicBezier" : /shadow|0\s/.test(t) && t.includes(" ") ? "shadow" : "string";
}
function y(t) {
  return Object.fromEntries(Object.entries(t).map(([a, r]) => [
    a,
    {
      $type: Y(r),
      $value: r
    }
  ]));
}
function aa(t = {}) {
  const a = J(t), r = Z(a.seed ?? {}), i = {
    ...r.cssVars,
    ...F(a, r)
  }, n = {
    ...r,
    cssVars: i
  };
  return {
    ...n,
    config: a,
    conditions: a.conditions ?? {},
    recipes: a.recipes ?? {},
    slotRecipes: a.slotRecipes ?? {},
    token: (o, l = "") => i[$(o)] ?? l,
    tokenVar: (o, l = "") => {
      const u = $(o);
      return u in i ? `var(${u})` : l;
    },
    cssText: (o = ":root") => ta(n, o),
    dtcg: () => ra(n)
  };
}
function ta(t, a = ":root") {
  const r = Object.entries(t.cssVars).sort(([i], [n]) => i.localeCompare(n)).map(([i, n]) => `  ${i}: ${n};`).join(`
`);
  return `${a} {
${r}
}`;
}
function ra(t) {
  const a = Object.fromEntries(Object.entries(t.seed).map(([r, i]) => [
    r,
    {
      $type: r === "accent" ? "color" : "string",
      $value: i
    }
  ]));
  return {
    $schema: "https://www.designtokens.org/schemas/2025.10/tokens.json",
    $extensions: {
      "org.nami.theme": {
        generatedBy: "@nami-web/tokens",
        layers: ["seed", "palette", "semantic", "component", "style", "cssVars"]
      }
    },
    seed: a,
    palette: y(t.palette),
    semantic: y(t.semantic),
    component: y(t.component),
    style: y(t.style),
    cssVars: y(t.cssVars)
  };
}
const b = class b extends V {
  constructor() {
    super(), this.appliedThemeVars = /* @__PURE__ */ new Set(), this.systemQuery = null, this.handleSystemThemeChange = () => {
      this.theme === "system" && this.applyTheme();
    }, this.theme = "light", this.density = "comfortable", this.size = "md", this.motion = "normal", this.stylePreset = "default", this.radius = "round", this.contrast = "normal", this.accent = "", this.inherit = !0, this.config = null;
  }
  connectedCallback() {
    super.connectedCallback(), typeof window < "u" && typeof window.matchMedia == "function" && (this.systemQuery = window.matchMedia("(prefers-color-scheme: dark)"), this.systemQuery.addEventListener?.("change", this.handleSystemThemeChange));
  }
  disconnectedCallback() {
    this.systemQuery?.removeEventListener?.("change", this.handleSystemThemeChange), super.disconnectedCallback();
  }
  updated() {
    this.applyTheme();
  }
  get resolvedThemeMode() {
    return this.theme !== "system" ? this.theme : this.systemQuery?.matches ? "dark" : "light";
  }
  hasRuntimeThemeInput() {
    return !!(this.config || this.accent || this.hasAttribute("theme") || this.hasAttribute("density") || this.hasAttribute("size") || this.hasAttribute("motion") || this.hasAttribute("style-preset") || this.hasAttribute("radius") || this.hasAttribute("contrast"));
  }
  applyTheme() {
    const a = this.config?.seed ?? {}, r = this.stylePreset === "ant-illustration" ? "illustration" : this.stylePreset, i = this.hasAttribute("theme") ? this.resolvedThemeMode : a.mode ?? this.resolvedThemeMode, n = this.hasAttribute("style-preset") ? r : a.stylePreset ?? r, o = this.hasAttribute("density") ? this.density : a.density ?? this.density, l = this.hasAttribute("size") ? this.size : a.size ?? this.size, u = this.hasAttribute("motion") ? this.motion : a.motion ?? this.motion, x = this.hasAttribute("radius") ? this.radius : a.radius ?? this.radius, k = this.hasAttribute("contrast") ? this.contrast : a.contrast ?? this.contrast, j = {
      ...a,
      accent: this.accent || a.accent,
      mode: i,
      stylePreset: n,
      density: o,
      size: l,
      motion: u,
      radius: x,
      contrast: k
    };
    if (this.accent ? (this.style.setProperty("--nami-theme-accent", this.accent), this.style.setProperty("--nami-accent-50", this.accent)) : (this.style.removeProperty("--nami-theme-accent"), this.style.removeProperty("--nami-accent-50")), this.hasRuntimeThemeInput()) {
      const v = aa({
        ...this.config,
        seed: j
      }), w = new Set(Object.keys(v.cssVars));
      for (const h of this.appliedThemeVars)
        !w.has(h) && h !== "--nami-theme-accent" && h !== "--nami-accent-50" && this.style.removeProperty(h);
      for (const [h, O] of Object.entries(v.cssVars))
        this.style.setProperty(h, O);
      this.appliedThemeVars = w;
    } else {
      for (const v of this.appliedThemeVars)
        this.style.removeProperty(v);
      this.appliedThemeVars.clear();
    }
    this.dataset.namiTheme = i, this.dataset.namiThemeRequested = this.theme, this.dataset.namiDensity = o, this.dataset.namiSize = l, this.dataset.namiMotion = u, this.dataset.namiStyle = n, this.dataset.namiRadius = x, this.dataset.namiContrast = k;
  }
  render() {
    return D`<slot></slot>`;
  }
};
b.properties = {
  theme: { reflect: !0, useDefault: !0 },
  density: { reflect: !0, useDefault: !0 },
  size: { reflect: !0, useDefault: !0 },
  motion: { reflect: !0, useDefault: !0 },
  stylePreset: { attribute: "style-preset", reflect: !0, useDefault: !0 },
  radius: { reflect: !0, useDefault: !0 },
  contrast: { reflect: !0, useDefault: !0 },
  accent: { reflect: !0, useDefault: !0 },
  inherit: { type: Boolean, reflect: !0 },
  config: { attribute: !1 }
}, b.styles = [
  M,
  A`
      :host {
        display: block;
        min-height: 0;
      }

      :host([accent]) {
        --nami-accent-50: var(--nami-theme-accent);
      }

      :host([theme='light']) {
        color-scheme: light;
      }

      :host([theme='dark']) {
        color-scheme: dark;
      }

      :host([radius='sharp']) {
        --nami-radius-control: 4px;
        --nami-radius-surface: 4px;
        --nami-radius-tight: 2px;
      }

      :host([radius='soft']) {
        --nami-radius-control: 10px;
        --nami-radius-surface: 8px;
        --nami-radius-tight: 4px;
      }

      :host([radius='round']) {
        --nami-radius-control: 999px;
        --nami-radius-surface: 6px;
        --nami-radius-tight: 4px;
      }

      :host([contrast='high']) {
        --nami-contrast-level: high;
        --nami-style-stroke-width: max(2px, var(--nami-style-stroke-width, 1px));
      }
    `
];
let S = b;
export {
  S as NamiTheme
};
