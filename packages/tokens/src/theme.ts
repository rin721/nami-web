export type RlThemeMode = 'light' | 'dark';
export type RlThemeStylePreset = 'default' | 'illustration';
export type RlThemeDensity = 'comfortable' | 'compact';
export type RlThemeMotion = 'normal' | 'reduced';
export type RlThemeRadius = 'sharp' | 'soft' | 'round';
export type RlThemeContrast = 'normal' | 'high';

export interface RlThemeSeed {
  accent?: string;
  mode?: RlThemeMode;
  stylePreset?: RlThemeStylePreset;
  density?: RlThemeDensity;
  motion?: RlThemeMotion;
  radius?: RlThemeRadius;
  contrast?: RlThemeContrast;
}

export interface RlResolvedThemeSeed {
  accent: string;
  mode: RlThemeMode;
  stylePreset: RlThemeStylePreset;
  density: RlThemeDensity;
  motion: RlThemeMotion;
  radius: RlThemeRadius;
  contrast: RlThemeContrast;
}

export interface RlThemeDiagnostic {
  code: string;
  message: string;
  path: keyof RlThemeSeed;
  severity: 'warning' | 'error';
}

export interface RlResolvedTheme {
  seed: RlResolvedThemeSeed;
  palette: Record<string, string>;
  semantic: Record<string, string>;
  component: Record<string, string>;
  style: Record<string, string>;
  cssVars: Record<string, string>;
  diagnostics: RlThemeDiagnostic[];
}

const DEFAULT_SEED: RlResolvedThemeSeed = {
  accent: '#3b82f6',
  mode: 'light',
  stylePreset: 'default',
  density: 'comfortable',
  motion: 'normal',
  radius: 'round',
  contrast: 'normal'
};

const HEX_COLOR_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

const enumValues = {
  mode: ['light', 'dark'],
  stylePreset: ['default', 'illustration'],
  density: ['comfortable', 'compact'],
  motion: ['normal', 'reduced'],
  radius: ['sharp', 'soft', 'round'],
  contrast: ['normal', 'high']
} as const;

function isOneOf<TValue extends string>(value: unknown, values: readonly TValue[]): value is TValue {
  return typeof value === 'string' && values.includes(value as TValue);
}

function invalidEnumDiagnostic(path: keyof RlThemeSeed, value: unknown): RlThemeDiagnostic {
  return {
    code: 'invalid-enum',
    message: `Unsupported ${String(path)} value "${String(value)}". Falling back to the default theme seed.`,
    path,
    severity: 'warning'
  };
}

export function validateThemeSeed(seed: RlThemeSeed): RlThemeDiagnostic[] {
  const diagnostics: RlThemeDiagnostic[] = [];

  if (seed.accent !== undefined && !HEX_COLOR_RE.test(seed.accent)) {
    diagnostics.push({
      code: 'invalid-accent',
      message: `Accent must be a 3 or 6 digit hex color. Received "${seed.accent}".`,
      path: 'accent',
      severity: 'warning'
    });
  }

  if (seed.mode !== undefined && !isOneOf(seed.mode, enumValues.mode)) diagnostics.push(invalidEnumDiagnostic('mode', seed.mode));
  if (seed.stylePreset !== undefined && !isOneOf(seed.stylePreset, enumValues.stylePreset)) diagnostics.push(invalidEnumDiagnostic('stylePreset', seed.stylePreset));
  if (seed.density !== undefined && !isOneOf(seed.density, enumValues.density)) diagnostics.push(invalidEnumDiagnostic('density', seed.density));
  if (seed.motion !== undefined && !isOneOf(seed.motion, enumValues.motion)) diagnostics.push(invalidEnumDiagnostic('motion', seed.motion));
  if (seed.radius !== undefined && !isOneOf(seed.radius, enumValues.radius)) diagnostics.push(invalidEnumDiagnostic('radius', seed.radius));
  if (seed.contrast !== undefined && !isOneOf(seed.contrast, enumValues.contrast)) diagnostics.push(invalidEnumDiagnostic('contrast', seed.contrast));

  return diagnostics;
}

function normalizeSeed(seed: RlThemeSeed): RlResolvedThemeSeed {
  return {
    accent: seed.accent && HEX_COLOR_RE.test(seed.accent) ? seed.accent : DEFAULT_SEED.accent,
    mode: isOneOf(seed.mode, enumValues.mode) ? seed.mode : DEFAULT_SEED.mode,
    stylePreset: isOneOf(seed.stylePreset, enumValues.stylePreset) ? seed.stylePreset : DEFAULT_SEED.stylePreset,
    density: isOneOf(seed.density, enumValues.density) ? seed.density : DEFAULT_SEED.density,
    motion: isOneOf(seed.motion, enumValues.motion) ? seed.motion : DEFAULT_SEED.motion,
    radius: isOneOf(seed.radius, enumValues.radius) ? seed.radius : DEFAULT_SEED.radius,
    contrast: isOneOf(seed.contrast, enumValues.contrast) ? seed.contrast : DEFAULT_SEED.contrast
  };
}

function mix(color: string, target: string, amount: number) {
  return `color-mix(in oklab, ${color}, ${target} ${amount}%)`;
}

function transparent(color: string, amount: number) {
  return `color-mix(in oklab, ${color}, transparent ${amount}%)`;
}

function derivePalette(seed: RlResolvedThemeSeed) {
  const accent = 'var(--rl-accent-50)';
  const dark = seed.mode === 'dark';
  return {
    '--rl-accent-50': seed.accent,
    '--rl-accent-90': mix(accent, dark ? '#fff' : '#000', dark ? 80 : 40),
    '--rl-accent-80': mix(accent, dark ? '#fff' : '#000', dark ? 60 : 30),
    '--rl-accent-70': mix(accent, dark ? '#fff' : '#000', dark ? 40 : 20),
    '--rl-accent-60': mix(accent, dark ? '#fff' : '#000', dark ? 20 : 10),
    '--rl-accent-40': mix(accent, dark ? '#000' : '#fff', dark ? 10 : 20),
    '--rl-accent-30': mix(accent, dark ? '#000' : '#fff', dark ? 20 : 40),
    '--rl-accent-20': mix(accent, dark ? '#000' : '#fff', dark ? 30 : 60),
    '--rl-accent-10': mix(accent, dark ? '#000' : '#fff', dark ? 40 : 80),
    '--rl-accent-5': mix(accent, dark ? '#000' : '#fff', dark ? 50 : 90),
    '--rl-neutral-10': mix(accent, '#b3b3b3', 84),
    '--rl-neutral-50': mix(accent, dark ? '#eef2f7' : '#646a73', 94)
  };
}

function deriveRadius(seed: RlResolvedThemeSeed) {
  if (seed.radius === 'sharp') {
    return {
      '--rl-radius-control': '4px',
      '--rl-radius-surface': '4px',
      '--rl-radius-tight': '2px',
      '--rl-radius-round': '999px'
    };
  }
  if (seed.radius === 'soft') {
    return {
      '--rl-radius-control': '10px',
      '--rl-radius-surface': '8px',
      '--rl-radius-tight': '4px',
      '--rl-radius-round': '999px'
    };
  }
  return {
    '--rl-radius-control': '999px',
    '--rl-radius-surface': '6px',
    '--rl-radius-tight': '4px',
    '--rl-radius-round': '999px'
  };
}

function deriveDensity(seed: RlResolvedThemeSeed) {
  if (seed.density === 'compact') {
    return {
      '--rl-control-height-sm': '28px',
      '--rl-control-height-md': '34px',
      '--rl-control-height-lg': '40px',
      '--rl-space-1': '2px',
      '--rl-space-2': '4px',
      '--rl-space-3': '8px',
      '--rl-space-4': '12px',
      '--rl-space-5': '16px',
      '--rl-icon-button-size': '36px'
    };
  }
  return {
    '--rl-control-height-sm': '32px',
    '--rl-control-height-md': '40px',
    '--rl-control-height-lg': '48px',
    '--rl-space-1': '4px',
    '--rl-space-2': '6px',
    '--rl-space-3': '10px',
    '--rl-space-4': '16px',
    '--rl-space-5': '24px',
    '--rl-icon-button-size': '40px'
  };
}

function deriveMotion(seed: RlResolvedThemeSeed) {
  if (seed.motion === 'reduced') {
    return {
      '--rl-motion-fast': '1ms',
      '--rl-motion-normal': '1ms',
      '--rl-motion-slow': '1ms',
      '--rl-motion-exit': '1ms',
      '--rl-ease-standard': 'linear',
      '--rl-ease-emphasized': 'linear'
    };
  }
  return {
    '--rl-motion-fast': '120ms',
    '--rl-motion-normal': '250ms',
    '--rl-motion-slow': '700ms',
    '--rl-motion-exit': '150ms',
    '--rl-ease-standard': 'cubic-bezier(0.19, 1, 0.22, 1)',
    '--rl-ease-emphasized': 'cubic-bezier(0.1, 0.9, 0.2, 1)'
  };
}

function deriveSemantic(seed: RlResolvedThemeSeed): Record<string, string> {
  const dark = seed.mode === 'dark';
  const high = seed.contrast === 'high';
  const primary = 'var(--rl-accent-50)';
  return {
    '--rl-color-primary': primary,
    '--rl-color-primary-hover': dark ? 'var(--rl-accent-60)' : 'var(--rl-accent-40)',
    '--rl-color-primary-pressed': dark ? 'var(--rl-accent-40)' : 'var(--rl-accent-60)',
    '--rl-color-primary-focus': dark ? 'var(--rl-accent-30)' : 'var(--rl-accent-30)',
    '--rl-color-primary-muted': 'var(--rl-accent-10)',
    '--rl-color-danger': dark ? '#ff7875' : '#dc2626',
    '--rl-surface': dark ? '#151718' : '#ffffff',
    '--rl-surface-raised': dark ? '#1c1f21' : '#ffffff',
    '--rl-surface-inset': dark ? transparent('#fff', 94) : transparent('#000', 97),
    '--rl-surface-overlay': dark ? transparent('#17191b', 16) : transparent('#fff', 18),
    '--rl-border': high ? (dark ? transparent('#fff', 70) : transparent('#000', 68)) : (dark ? transparent('#fff', 86) : transparent('#000', 88)),
    '--rl-border-strong': high ? (dark ? transparent('#fff', 54) : transparent('#000', 54)) : (dark ? transparent('#fff', 72) : transparent('#000', 76)),
    '--rl-text': dark ? '#f8fafc' : '#171717',
    '--rl-text-muted': high ? (dark ? '#d8dee8' : '#3f4652') : (dark ? '#a1a8b3' : '#666b74'),
    '--rl-text-inverse': '#ffffff',
    '--rl-icon-color': dark ? 'var(--rl-neutral-50)' : 'var(--rl-neutral-50)',
    '--rl-hover-overlay': dark ? transparent('#fff', high ? 88 : 94) : transparent('#000', high ? 90 : 95),
    '--rl-ripple': dark ? transparent('#fff', 84) : transparent('#000', 86),
    '--rl-overlay-backdrop': dark ? transparent('#000', 38) : transparent('#000', 52),
    '--rl-accent-ripple': transparent('var(--rl-color-primary-pressed)', high ? 72 : 84),
    '--rl-accent-hover-overlay': transparent('var(--rl-color-primary-hover)', high ? 82 : 90),
    '--rl-focus-ring': high
      ? `0 0 0 4px ${transparent('var(--rl-color-primary-focus)', 20)}, 0 0 0 1px var(--rl-color-primary)`
      : `0 4px 4px ${transparent('var(--rl-color-primary)', 74)}, 0 0 0 3px ${transparent('var(--rl-color-primary-focus)', 46)}`
  };
}

function deriveDefaultStyle(seed: RlResolvedThemeSeed) {
  return {
    '--rl-font-sans': 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    '--rl-font-mono': '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    '--rl-shadow-color': seed.mode === 'dark' ? '#000' : mix('var(--rl-accent-50)', '#8a8f98', 80),
    '--rl-style-stroke-width': seed.contrast === 'high' ? '2px' : '1px',
    '--rl-style-stroke-color': 'var(--rl-border)',
    '--rl-style-ink-color': 'var(--rl-text)',
    '--rl-style-on-paper': 'var(--rl-text)',
    '--rl-style-on-paper-muted': 'var(--rl-text-muted)',
    '--rl-style-offset-shadow': 'none',
    '--rl-style-control-bg': 'transparent',
    '--rl-style-panel-bg': 'var(--rl-surface-raised)',
    '--rl-style-paper-bg': 'var(--rl-surface)',
    '--rl-style-border-radius': 'var(--rl-radius-surface)',
    '--rl-style-background-pattern': 'none',
    '--rl-style-doodle-opacity': '0',
    '--rl-style-paper-line-color': 'var(--rl-border)',
    '--rl-style-focus-shadow': 'var(--rl-focus-ring)'
  };
}

function deriveIllustrationStyle(seed: RlResolvedThemeSeed) {
  const dark = seed.mode === 'dark';
  const stroke = seed.contrast === 'high' ? '4px' : '3px';
  return {
    '--rl-font-sans': 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    '--rl-font-mono': '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    '--rl-shadow-color': dark ? '#000' : '#2f2f2f',
    '--rl-style-stroke-width': stroke,
    '--rl-style-ink-color': dark ? '#261f1f' : '#2f2f2f',
    '--rl-style-stroke-color': 'var(--rl-style-ink-color)',
    '--rl-style-on-paper': dark ? '#29221f' : '#2f2f2f',
    '--rl-style-on-paper-muted': dark ? '#6b5f58' : '#62656b',
    '--rl-style-offset-shadow': dark ? '6px 6px 0 #050506' : '5px 5px 0 var(--rl-style-ink-color)',
    '--rl-style-control-bg': dark ? mix('#fff8ea', 'var(--rl-accent-50)', 5) : '#fffefe',
    '--rl-style-panel-bg': dark ? mix('#fff1f5', 'var(--rl-accent-50)', 7) : mix('#fff3f7', '#fff', 18),
    '--rl-style-paper-bg': dark ? mix('#fffdf3', 'var(--rl-accent-50)', 4) : '#fff8fb',
    '--rl-style-border-radius': seed.radius === 'sharp' ? '8px' : seed.radius === 'soft' ? '14px' : '16px',
    '--rl-style-doodle-opacity': dark ? '0.34' : '0.42',
    '--rl-style-paper-line-color': dark ? 'rgb(38 31 31 / 0.18)' : transparent('var(--rl-style-ink-color)', 84),
    '--rl-style-focus-shadow': dark
      ? `0 0 0 4px ${transparent('var(--rl-color-primary)', 58)}, 4px 4px 0 #050506`
      : `0 0 0 4px ${transparent('var(--rl-color-primary)', 70)}, 4px 4px 0 var(--rl-style-ink-color)`,
    '--rl-style-background-pattern': dark
      ? `radial-gradient(circle at 10% 18%, rgb(142 217 255 / var(--rl-style-doodle-opacity)) 0 14px, transparent 15px),
    radial-gradient(circle at 88% 14%, rgb(255 216 93 / var(--rl-style-doodle-opacity)) 0 10px, transparent 11px),
    radial-gradient(circle at 74% 80%, rgb(255 183 208 / var(--rl-style-doodle-opacity)) 0 20px, transparent 21px),
    linear-gradient(135deg, transparent 0 46%, ${transparent('#fff7ed', 82)} 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${transparent('var(--rl-accent-50)', 62)} 71% 73%, transparent 74%)`
      : `radial-gradient(circle at 12% 22%, rgb(142 217 255 / var(--rl-style-doodle-opacity)) 0 12px, transparent 13px),
    radial-gradient(circle at 86% 16%, rgb(255 216 93 / var(--rl-style-doodle-opacity)) 0 9px, transparent 10px),
    radial-gradient(circle at 72% 78%, rgb(255 183 208 / var(--rl-style-doodle-opacity)) 0 18px, transparent 19px),
    linear-gradient(135deg, transparent 0 46%, var(--rl-style-paper-line-color) 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${transparent('var(--rl-accent-50)', 82)} 71% 73%, transparent 74%)`
  };
}

function deriveComponent(seed: RlResolvedThemeSeed): Record<string, string> {
  const illustration = seed.stylePreset === 'illustration';
  const darkIllustration = illustration && seed.mode === 'dark';
  const high = seed.contrast === 'high';

  return {
    '--rl-button-bg': 'var(--rl-color-primary)',
    '--rl-button-fg': '#fff',
    '--rl-button-border': illustration ? 'var(--rl-style-stroke-color)' : high ? 'var(--rl-color-primary)' : 'transparent',
    '--rl-button-border-width': illustration ? 'var(--rl-style-stroke-width)' : high ? '2px' : '1px',
    '--rl-button-radius': illustration ? 'var(--rl-radius-control)' : 'var(--rl-radius-control)',
    '--rl-button-shadow': illustration ? 'var(--rl-style-offset-shadow)' : 'none',
    '--rl-button-hover-bg': 'var(--rl-color-primary-hover)',
    '--rl-card-bg': illustration ? 'var(--rl-style-control-bg)' : 'var(--rl-surface-raised)',
    '--rl-card-fg': illustration ? 'var(--rl-style-on-paper)' : 'var(--rl-text)',
    '--rl-card-inset-bg': illustration ? (darkIllustration ? 'var(--rl-style-paper-bg)' : mix('var(--rl-style-paper-bg)', 'var(--rl-accent-50)', 5)) : 'var(--rl-surface-inset)',
    '--rl-card-border': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-card-border-width': 'var(--rl-style-stroke-width)',
    '--rl-card-radius': illustration ? 'var(--rl-style-border-radius)' : 'var(--rl-radius-surface)',
    '--rl-card-shadow': illustration ? 'var(--rl-style-offset-shadow)' : 'none',
    '--rl-card-padding': 'var(--rl-space-4)',
    '--rl-card-gap': 'var(--rl-space-3)',
    '--rl-badge-bg': illustration ? (darkIllustration ? 'var(--rl-style-control-bg)' : mix('var(--rl-accent-50)', '#fff', 88)) : 'var(--rl-hover-overlay)',
    '--rl-badge-fg': illustration ? 'var(--rl-style-on-paper)' : 'var(--rl-text)',
    '--rl-badge-border': illustration ? 'var(--rl-style-stroke-color)' : 'transparent',
    '--rl-badge-border-width': 'var(--rl-style-stroke-width)',
    '--rl-badge-radius': 'var(--rl-radius-control)',
    '--rl-badge-height': '24px',
    '--rl-badge-font-size': '0.75rem',
    '--rl-badge-padding-x': '9px',
    '--rl-soft-control-bg': illustration ? 'var(--rl-style-control-bg)' : 'transparent',
    '--rl-soft-control-color': illustration ? 'var(--rl-style-on-paper)' : 'var(--rl-text)',
    '--rl-soft-control-border-width': illustration ? 'var(--rl-style-stroke-width)' : '0',
    '--rl-soft-control-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'transparent',
    '--rl-chip-bg': illustration ? (darkIllustration ? 'var(--rl-style-control-bg)' : mix('var(--rl-accent-50)', '#fff', 92)) : 'var(--rl-hover-overlay)',
    '--rl-chip-selected-bg': 'var(--rl-color-primary)',
    '--rl-chip-border-width': illustration ? 'var(--rl-style-stroke-width)' : '0',
    '--rl-chip-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'transparent',
    '--rl-chip-radius': 'var(--rl-radius-control)',
    '--rl-chip-shadow': illustration ? `3px 3px 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--rl-input-bg': illustration ? 'var(--rl-style-control-bg)' : 'transparent',
    '--rl-input-border': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-input-border-width': illustration ? 'var(--rl-style-stroke-width)' : high ? '2px' : '1px',
    '--rl-input-radius': illustration ? '12px' : 'var(--rl-radius-control)',
    '--rl-input-shadow': illustration ? `3px 3px 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--rl-switch-track-bg': illustration ? 'var(--rl-style-control-bg)' : 'var(--rl-hover-overlay)',
    '--rl-switch-border-width': 'var(--rl-style-stroke-width)',
    '--rl-switch-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-switch-thumb-bg': illustration ? 'var(--rl-style-paper-bg)' : 'var(--rl-surface-raised)',
    '--rl-switch-thumb-shadow': illustration ? `2px 2px 0 ${darkIllustration ? '#050506' : 'var(--rl-style-ink-color)'}` : `0 1px 4px ${transparent('var(--rl-shadow-color)', 64)}`,
    '--rl-radio-card-bg': illustration ? 'var(--rl-style-control-bg)' : 'var(--rl-surface-raised)',
    '--rl-radio-card-border-width': illustration ? 'var(--rl-style-stroke-width)' : high ? '2px' : '1px',
    '--rl-radio-card-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-radio-card-radius': illustration ? 'var(--rl-style-border-radius)' : 'var(--rl-radius-surface)',
    '--rl-radio-card-shadow': illustration ? 'var(--rl-style-offset-shadow)' : 'none',
    '--rl-radio-card-selected-shadow': illustration ? '0 0 0 2px var(--rl-color-primary), var(--rl-style-offset-shadow)' : '0 0 0 1px var(--rl-color-primary), var(--rl-focus-ring)',
    '--rl-tab-bg': illustration ? 'var(--rl-style-control-bg)' : 'transparent',
    '--rl-tab-border-width': illustration ? 'var(--rl-style-stroke-width)' : '0',
    '--rl-tab-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'transparent',
    '--rl-tab-radius': illustration ? '12px' : 'var(--rl-radius-control)',
    '--rl-dialog-bg': illustration ? 'var(--rl-style-panel-bg)' : 'var(--rl-surface-raised)',
    '--rl-dialog-border-width': illustration ? 'var(--rl-style-stroke-width)' : '1px',
    '--rl-dialog-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-dialog-radius': illustration ? '18px' : 'var(--rl-radius-surface)',
    '--rl-dialog-shadow': illustration ? 'var(--rl-style-offset-shadow)' : `0 18px 50px ${transparent('var(--rl-shadow-color)', 54)}`,
    '--rl-drawer-bg': illustration ? 'var(--rl-style-panel-bg)' : 'var(--rl-surface-overlay)',
    '--rl-drawer-border-width': illustration ? 'var(--rl-style-stroke-width)' : '1px',
    '--rl-drawer-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-drawer-shadow': illustration ? 'var(--rl-style-offset-shadow)' : `0 8px 24px ${transparent('var(--rl-shadow-color)', 52)}`,
    '--rl-toast-bg': illustration ? 'var(--rl-style-control-bg)' : 'var(--rl-surface-raised)',
    '--rl-toast-border-width': illustration ? 'var(--rl-style-stroke-width)' : '1px',
    '--rl-toast-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'var(--rl-border)',
    '--rl-toast-radius': illustration ? '14px' : 'var(--rl-radius-surface)',
    '--rl-app-shell-border-width': illustration ? 'var(--rl-style-stroke-width)' : '1px',
    '--rl-app-shell-shadow': illustration ? `4px 0 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--rl-spinner-track-color': transparent('currentColor', illustration ? 64 : 72),
    '--rl-illus-primary': 'var(--rl-color-primary)',
    '--rl-illus-secondary': illustration ? mix('var(--rl-color-primary)', '#fff', darkIllustration ? 38 : 58) : 'var(--rl-accent-20)',
    '--rl-illus-accent': darkIllustration ? '#ffd166' : '#f5b84b',
    '--rl-illus-muted': illustration ? transparent('var(--rl-style-on-paper-muted)', darkIllustration ? 24 : 44) : transparent('var(--rl-text-muted)', 48),
    '--rl-illus-line': illustration ? 'var(--rl-style-stroke-color)' : transparent('var(--rl-text)', 36),
    '--rl-illus-bg': illustration ? transparent('var(--rl-color-primary)', darkIllustration ? 84 : 90) : 'var(--rl-color-primary-muted)',
    '--rl-illus-size-sm': '92px',
    '--rl-illus-size-md': '140px',
    '--rl-illus-size-lg': '184px',
    '--rl-empty-gap': '12px',
    '--rl-empty-title-color': illustration ? 'var(--rl-style-on-paper)' : 'var(--rl-text)',
    '--rl-empty-description-color': illustration ? 'var(--rl-style-on-paper-muted)' : 'var(--rl-text-muted)',
    '--rl-empty-bg': illustration ? 'var(--rl-style-control-bg)' : 'transparent',
    '--rl-empty-border-width': illustration ? 'var(--rl-style-stroke-width)' : '0',
    '--rl-empty-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'transparent',
    '--rl-empty-radius': illustration ? 'var(--rl-style-border-radius)' : 'var(--rl-radius-surface)',
    '--rl-empty-shadow': illustration ? 'var(--rl-style-offset-shadow)' : 'none',
    '--rl-result-title-size': '1.5rem',
    '--rl-result-subtitle-size': '0.95rem',
    '--rl-result-gap': '14px',
    '--rl-result-actions-margin': '10px 0 0',
    '--rl-result-bg': illustration ? 'var(--rl-style-control-bg)' : 'transparent',
    '--rl-result-border-width': illustration ? 'var(--rl-style-stroke-width)' : '0',
    '--rl-result-border-color': illustration ? 'var(--rl-style-stroke-color)' : 'transparent',
    '--rl-result-radius': illustration ? 'var(--rl-style-border-radius)' : 'var(--rl-radius-surface)',
    '--rl-result-shadow': illustration ? 'var(--rl-style-offset-shadow)' : 'none'
  };
}

export function deriveRinTheme(seed: RlThemeSeed = {}): RlResolvedTheme {
  const normalized = normalizeSeed(seed);
  const diagnostics = validateThemeSeed(seed);
  const palette = derivePalette(normalized);
  const semantic = deriveSemantic(normalized);
  const style = normalized.stylePreset === 'illustration' ? deriveIllustrationStyle(normalized) : deriveDefaultStyle(normalized);
  const component = deriveComponent(normalized);
  const cssVars = {
    ...palette,
    ...deriveRadius(normalized),
    '--rl-contrast-level': normalized.contrast,
    ...deriveDensity(normalized),
    ...deriveMotion(normalized),
    ...semantic,
    ...style,
    ...component
  };

  return {
    seed: normalized,
    palette,
    semantic,
    component,
    style,
    cssVars,
    diagnostics
  };
}

export function themeToCssVars(theme: RlResolvedTheme): Record<string, string> {
  return { ...theme.cssVars };
}

export function themeToCssText(theme: RlResolvedTheme, selector = ':root'): string {
  const declarations = Object.entries(theme.cssVars)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([token, value]) => `  ${token}: ${value};`)
    .join('\n');
  return `${selector} {\n${declarations}\n}`;
}
