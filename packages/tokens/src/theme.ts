export type NamiThemeMode = 'light' | 'dark';
export type NamiThemeStylePreset = 'default' | 'illustration';
export type NamiThemeDensity = 'comfortable' | 'compact';
export type NamiThemeMotion = 'normal' | 'reduced';
export type NamiThemeRadius = 'sharp' | 'soft' | 'round';
export type NamiThemeContrast = 'normal' | 'high';

export interface NamiThemeSeed {
  accent?: string;
  mode?: NamiThemeMode;
  stylePreset?: NamiThemeStylePreset;
  density?: NamiThemeDensity;
  motion?: NamiThemeMotion;
  radius?: NamiThemeRadius;
  contrast?: NamiThemeContrast;
}

export type NamiThemeTokenPrimitive = string | number;

export interface NamiThemeTokenLeaf {
  value: NamiThemeTokenPrimitive;
  description?: string;
}

export interface NamiThemeTokenTree {
  [token: string]: NamiThemeTokenPrimitive | NamiThemeTokenLeaf | NamiThemeTokenTree;
}

export interface NamiThemeCssVariableGroups {
  variables?: Record<string, NamiThemeTokenPrimitive>;
  light?: Record<string, NamiThemeTokenPrimitive>;
  dark?: Record<string, NamiThemeTokenPrimitive>;
}

export interface NamiThemeRecipeConfig {
  base?: NamiThemeTokenTree;
  variants?: Record<string, Record<string, NamiThemeTokenTree>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, unknown> & { style?: NamiThemeTokenTree }>;
}

export interface NamiThemeSlotRecipeConfig {
  slots: string[];
  base?: Record<string, NamiThemeTokenTree>;
  variants?: Record<string, Record<string, Record<string, NamiThemeTokenTree>>>;
  defaultVariants?: Record<string, string>;
}

export interface NamiThemeModeConfig {
  tokens?: NamiThemeTokenTree;
  semanticTokens?: NamiThemeTokenTree;
  components?: Record<string, NamiThemeTokenTree | { tokens?: NamiThemeTokenTree }>;
}

export interface NamiThemeConfig extends NamiThemeModeConfig {
  seed?: NamiThemeSeed;
  recipes?: Record<string, NamiThemeRecipeConfig>;
  slotRecipes?: Record<string, NamiThemeSlotRecipeConfig>;
  conditions?: Record<string, string>;
  modes?: Partial<Record<NamiThemeMode, NamiThemeModeConfig>>;
  density?: Partial<Record<NamiThemeDensity, NamiThemeTokenTree>>;
  motion?: Partial<Record<NamiThemeMotion, NamiThemeTokenTree>>;
  radius?: Partial<Record<NamiThemeRadius, NamiThemeTokenTree>>;
  contrast?: Partial<Record<NamiThemeContrast, NamiThemeTokenTree>>;
  cssVariablesResolver?: (theme: NamiResolvedTheme) => NamiThemeCssVariableGroups;
}

export interface NamiResolvedThemeSeed {
  accent: string;
  mode: NamiThemeMode;
  stylePreset: NamiThemeStylePreset;
  density: NamiThemeDensity;
  motion: NamiThemeMotion;
  radius: NamiThemeRadius;
  contrast: NamiThemeContrast;
}

export interface NamiThemeDiagnostic {
  code: string;
  message: string;
  path: keyof NamiThemeSeed;
  severity: 'warning' | 'error';
}

export interface NamiResolvedTheme {
  seed: NamiResolvedThemeSeed;
  palette: Record<string, string>;
  semantic: Record<string, string>;
  component: Record<string, string>;
  style: Record<string, string>;
  cssVars: Record<string, string>;
  diagnostics: NamiThemeDiagnostic[];
}

export interface NamiThemeSystem extends NamiResolvedTheme {
  config: NamiThemeConfig;
  conditions: Record<string, string>;
  recipes: Record<string, NamiThemeRecipeConfig>;
  slotRecipes: Record<string, NamiThemeSlotRecipeConfig>;
  token: (name: string, fallback?: string) => string;
  tokenVar: (name: string, fallback?: string) => string;
  cssText: (selector?: string) => string;
  dtcg: () => NamiThemeDtcgDocument;
}

export interface NamiThemeDtcgToken {
  $type: string;
  $value: NamiThemeTokenPrimitive;
  $description?: string;
}

export interface NamiThemeDtcgDocument {
  $schema: string;
  $extensions: {
    'org.nami.theme': {
      generatedBy: string;
      layers: string[];
    };
  };
  seed: Record<string, NamiThemeDtcgToken>;
  palette: Record<string, NamiThemeDtcgToken>;
  semantic: Record<string, NamiThemeDtcgToken>;
  component: Record<string, NamiThemeDtcgToken>;
  style: Record<string, NamiThemeDtcgToken>;
  cssVars: Record<string, NamiThemeDtcgToken>;
}

const DEFAULT_SEED: NamiResolvedThemeSeed = {
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

function invalidEnumDiagnostic(path: keyof NamiThemeSeed, value: unknown): NamiThemeDiagnostic {
  return {
    code: 'invalid-enum',
    message: `Unsupported ${String(path)} value "${String(value)}". Falling back to the default theme seed.`,
    path,
    severity: 'warning'
  };
}

export function validateThemeSeed(seed: NamiThemeSeed): NamiThemeDiagnostic[] {
  const diagnostics: NamiThemeDiagnostic[] = [];

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

function normalizeSeed(seed: NamiThemeSeed): NamiResolvedThemeSeed {
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

function toKebab(value: string) {
  return value
    .replace(/^--nami-/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toCssVarName(path: string[]) {
  if (path.length === 1 && path[0].startsWith('--')) return path[0];
  return `--nami-${path.map(toKebab).filter(Boolean).join('-')}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isTokenLeaf(value: unknown): value is NamiThemeTokenLeaf {
  return isPlainObject(value) && 'value' in value;
}

function tokenPrimitive(value: NamiThemeTokenPrimitive | NamiThemeTokenLeaf) {
  return String(isTokenLeaf(value) ? value.value : value);
}

function flattenTokenTree(tree: NamiThemeTokenTree | undefined, path: string[] = []): Record<string, string> {
  const vars: Record<string, string> = {};
  if (!tree) return vars;

  for (const [key, value] of Object.entries(tree)) {
    const nextPath = key.startsWith('--') ? [key] : [...path, key];
    if (isTokenLeaf(value) || typeof value === 'string' || typeof value === 'number') {
      vars[toCssVarName(nextPath)] = tokenPrimitive(value);
      continue;
    }
    if (isPlainObject(value)) {
      Object.assign(vars, flattenTokenTree(value as NamiThemeTokenTree, nextPath));
    }
  }

  return vars;
}

function flattenComponentTokenConfig(components: NamiThemeConfig['components']): Record<string, string> {
  const vars: Record<string, string> = {};
  if (!components) return vars;

  for (const [componentName, config] of Object.entries(components)) {
    const tree = isPlainObject(config) && 'tokens' in config ? (config.tokens as NamiThemeTokenTree | undefined) : config as NamiThemeTokenTree;
    Object.assign(vars, flattenTokenTree(tree, [componentName]));
  }

  return vars;
}

function flattenModeConfig(config: NamiThemeModeConfig | undefined) {
  return {
    ...flattenTokenTree(config?.tokens),
    ...flattenTokenTree(config?.semanticTokens),
    ...flattenComponentTokenConfig(config?.components)
  };
}

function resolveConfigCssVars(config: NamiThemeConfig, theme: NamiResolvedTheme): Record<string, string> {
  const seed = theme.seed;
  const resolverGroups = config.cssVariablesResolver?.(theme) ?? {};
  return {
    ...flattenModeConfig(config),
    ...flattenModeConfig(config.modes?.[seed.mode]),
    ...flattenTokenTree(config.density?.[seed.density]),
    ...flattenTokenTree(config.motion?.[seed.motion]),
    ...flattenTokenTree(config.radius?.[seed.radius]),
    ...flattenTokenTree(config.contrast?.[seed.contrast]),
    ...Object.fromEntries(Object.entries(resolverGroups.variables ?? {}).map(([token, value]) => [token, String(value)])),
    ...Object.fromEntries(Object.entries(resolverGroups[seed.mode] ?? {}).map(([token, value]) => [token, String(value)]))
  };
}

function mix(color: string, target: string, amount: number) {
  return `color-mix(in oklab, ${color}, ${target} ${amount}%)`;
}

function transparent(color: string, amount: number) {
  return `color-mix(in oklab, ${color}, transparent ${amount}%)`;
}

function derivePalette(seed: NamiResolvedThemeSeed) {
  const accent = 'var(--nami-accent-50)';
  const dark = seed.mode === 'dark';
  return {
    '--nami-accent-50': seed.accent,
    '--nami-accent-90': mix(accent, dark ? '#fff' : '#000', dark ? 80 : 40),
    '--nami-accent-80': mix(accent, dark ? '#fff' : '#000', dark ? 60 : 30),
    '--nami-accent-70': mix(accent, dark ? '#fff' : '#000', dark ? 40 : 20),
    '--nami-accent-60': mix(accent, dark ? '#fff' : '#000', dark ? 20 : 10),
    '--nami-accent-40': mix(accent, dark ? '#000' : '#fff', dark ? 10 : 20),
    '--nami-accent-30': mix(accent, dark ? '#000' : '#fff', dark ? 20 : 40),
    '--nami-accent-20': mix(accent, dark ? '#000' : '#fff', dark ? 30 : 60),
    '--nami-accent-10': mix(accent, dark ? '#000' : '#fff', dark ? 40 : 80),
    '--nami-accent-5': mix(accent, dark ? '#000' : '#fff', dark ? 50 : 90),
    '--nami-neutral-10': mix(accent, '#b3b3b3', 84),
    '--nami-neutral-50': mix(accent, dark ? '#eef2f7' : '#646a73', 94)
  };
}

function deriveRadius(seed: NamiResolvedThemeSeed) {
  if (seed.radius === 'sharp') {
    return {
      '--nami-radius-control': '4px',
      '--nami-radius-surface': '4px',
      '--nami-radius-tight': '2px',
      '--nami-radius-round': '999px'
    };
  }
  if (seed.radius === 'soft') {
    return {
      '--nami-radius-control': '10px',
      '--nami-radius-surface': '8px',
      '--nami-radius-tight': '4px',
      '--nami-radius-round': '999px'
    };
  }
  return {
    '--nami-radius-control': '999px',
    '--nami-radius-surface': '6px',
    '--nami-radius-tight': '4px',
    '--nami-radius-round': '999px'
  };
}

function deriveDensity(seed: NamiResolvedThemeSeed) {
  if (seed.density === 'compact') {
    return {
      '--nami-control-height-sm': '28px',
      '--nami-control-height-md': '34px',
      '--nami-control-height-lg': '40px',
      '--nami-space-1': '2px',
      '--nami-space-2': '4px',
      '--nami-space-3': '8px',
      '--nami-space-4': '12px',
      '--nami-space-5': '16px',
      '--nami-icon-button-size': '36px',
      '--nami-layout-gutter': '12px'
    };
  }
  return {
    '--nami-control-height-sm': '32px',
    '--nami-control-height-md': '40px',
    '--nami-control-height-lg': '48px',
    '--nami-space-1': '4px',
    '--nami-space-2': '6px',
    '--nami-space-3': '10px',
    '--nami-space-4': '16px',
    '--nami-space-5': '24px',
    '--nami-icon-button-size': '40px',
    '--nami-layout-gutter': '16px'
  };
}

function deriveLayout() {
  return {
    '--nami-breakpoint-compact': '639px',
    '--nami-breakpoint-medium': '880px',
    '--nami-breakpoint-wide': '1080px',
    '--nami-container-sm': '720px',
    '--nami-container-md': '960px',
    '--nami-container-lg': '1240px',
    '--nami-app-shell-rail-width': '56px',
    '--nami-app-shell-mobile-bar-height': '56px',
    '--nami-app-shell-breakpoint': '639px'
  };
}

function deriveMotion(seed: NamiResolvedThemeSeed) {
  if (seed.motion === 'reduced') {
    return {
      '--nami-motion-fast': '1ms',
      '--nami-motion-normal': '1ms',
      '--nami-motion-slow': '1ms',
      '--nami-motion-exit': '1ms',
      '--nami-ease-standard': 'linear',
      '--nami-ease-emphasized': 'linear'
    };
  }
  return {
    '--nami-motion-fast': '120ms',
    '--nami-motion-normal': '250ms',
    '--nami-motion-slow': '700ms',
    '--nami-motion-exit': '150ms',
    '--nami-ease-standard': 'cubic-bezier(0.19, 1, 0.22, 1)',
    '--nami-ease-emphasized': 'cubic-bezier(0.1, 0.9, 0.2, 1)'
  };
}

function deriveSemantic(seed: NamiResolvedThemeSeed): Record<string, string> {
  const dark = seed.mode === 'dark';
  const high = seed.contrast === 'high';
  const primary = 'var(--nami-accent-50)';
  return {
    '--nami-color-primary': primary,
    '--nami-color-primary-hover': dark ? 'var(--nami-accent-60)' : 'var(--nami-accent-40)',
    '--nami-color-primary-pressed': dark ? 'var(--nami-accent-40)' : 'var(--nami-accent-60)',
    '--nami-color-primary-focus': dark ? 'var(--nami-accent-30)' : 'var(--nami-accent-30)',
    '--nami-color-primary-muted': 'var(--nami-accent-10)',
    '--nami-color-danger': dark ? '#ff7875' : '#dc2626',
    '--nami-surface': dark ? '#151718' : '#ffffff',
    '--nami-surface-raised': dark ? '#1c1f21' : '#ffffff',
    '--nami-surface-inset': dark ? transparent('#fff', 94) : transparent('#000', 97),
    '--nami-surface-overlay': dark ? transparent('#17191b', 16) : transparent('#fff', 18),
    '--nami-border': high ? (dark ? transparent('#fff', 70) : transparent('#000', 68)) : (dark ? transparent('#fff', 86) : transparent('#000', 88)),
    '--nami-border-strong': high ? (dark ? transparent('#fff', 54) : transparent('#000', 54)) : (dark ? transparent('#fff', 72) : transparent('#000', 76)),
    '--nami-text': dark ? '#f8fafc' : '#171717',
    '--nami-text-muted': high ? (dark ? '#d8dee8' : '#3f4652') : (dark ? '#a1a8b3' : '#666b74'),
    '--nami-text-inverse': '#ffffff',
    '--nami-icon-color': dark ? 'var(--nami-neutral-50)' : 'var(--nami-neutral-50)',
    '--nami-hover-overlay': dark ? transparent('#fff', high ? 88 : 94) : transparent('#000', high ? 90 : 95),
    '--nami-ripple': dark ? transparent('#fff', 84) : transparent('#000', 86),
    '--nami-overlay-backdrop': dark ? transparent('#000', 38) : transparent('#000', 52),
    '--nami-accent-ripple': transparent('var(--nami-color-primary-pressed)', high ? 72 : 84),
    '--nami-accent-hover-overlay': transparent('var(--nami-color-primary-hover)', high ? 82 : 90),
    '--nami-focus-ring': high
      ? `0 0 0 4px ${transparent('var(--nami-color-primary-focus)', 20)}, 0 0 0 1px var(--nami-color-primary)`
      : `0 4px 4px ${transparent('var(--nami-color-primary)', 74)}, 0 0 0 3px ${transparent('var(--nami-color-primary-focus)', 46)}`
  };
}

function deriveDefaultStyle(seed: NamiResolvedThemeSeed) {
  return {
    '--nami-font-sans': 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    '--nami-font-mono': '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    '--nami-shadow-color': seed.mode === 'dark' ? '#000' : mix('var(--nami-accent-50)', '#8a8f98', 80),
    '--nami-style-stroke-width': seed.contrast === 'high' ? '2px' : '1px',
    '--nami-style-stroke-color': 'var(--nami-border)',
    '--nami-style-ink-color': 'var(--nami-text)',
    '--nami-style-on-paper': 'var(--nami-text)',
    '--nami-style-on-paper-muted': 'var(--nami-text-muted)',
    '--nami-style-offset-shadow': 'none',
    '--nami-style-control-bg': 'transparent',
    '--nami-style-panel-bg': 'var(--nami-surface-raised)',
    '--nami-style-paper-bg': 'var(--nami-surface)',
    '--nami-style-border-radius': 'var(--nami-radius-surface)',
    '--nami-style-background-pattern': 'none',
    '--nami-style-doodle-opacity': '0',
    '--nami-style-paper-line-color': 'var(--nami-border)',
    '--nami-style-focus-shadow': 'var(--nami-focus-ring)'
  };
}

function deriveIllustrationStyle(seed: NamiResolvedThemeSeed) {
  const dark = seed.mode === 'dark';
  const stroke = seed.contrast === 'high' ? '4px' : '3px';
  return {
    '--nami-font-sans': 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    '--nami-font-mono': '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    '--nami-shadow-color': dark ? '#000' : '#2f2f2f',
    '--nami-style-stroke-width': stroke,
    '--nami-style-ink-color': dark ? '#261f1f' : '#2f2f2f',
    '--nami-style-stroke-color': 'var(--nami-style-ink-color)',
    '--nami-style-on-paper': dark ? '#29221f' : '#2f2f2f',
    '--nami-style-on-paper-muted': dark ? '#6b5f58' : '#62656b',
    '--nami-style-offset-shadow': dark ? '6px 6px 0 #050506' : '5px 5px 0 var(--nami-style-ink-color)',
    '--nami-style-control-bg': dark ? mix('#fff8ea', 'var(--nami-accent-50)', 5) : '#fffefe',
    '--nami-style-panel-bg': dark ? mix('#fff1f5', 'var(--nami-accent-50)', 7) : mix('#fff3f7', '#fff', 18),
    '--nami-style-paper-bg': dark ? mix('#fffdf3', 'var(--nami-accent-50)', 4) : '#fff8fb',
    '--nami-style-border-radius': seed.radius === 'sharp' ? '8px' : seed.radius === 'soft' ? '14px' : '16px',
    '--nami-style-doodle-opacity': dark ? '0.34' : '0.42',
    '--nami-style-paper-line-color': dark ? 'rgb(38 31 31 / 0.18)' : transparent('var(--nami-style-ink-color)', 84),
    '--nami-style-focus-shadow': dark
      ? `0 0 0 4px ${transparent('var(--nami-color-primary)', 58)}, 4px 4px 0 #050506`
      : `0 0 0 4px ${transparent('var(--nami-color-primary)', 70)}, 4px 4px 0 var(--nami-style-ink-color)`,
    '--nami-style-background-pattern': dark
      ? `radial-gradient(circle at 10% 18%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 14px, transparent 15px),
    radial-gradient(circle at 88% 14%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 10px, transparent 11px),
    radial-gradient(circle at 74% 80%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 20px, transparent 21px),
    linear-gradient(135deg, transparent 0 46%, ${transparent('#fff7ed', 82)} 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${transparent('var(--nami-accent-50)', 62)} 71% 73%, transparent 74%)`
      : `radial-gradient(circle at 12% 22%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 12px, transparent 13px),
    radial-gradient(circle at 86% 16%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 9px, transparent 10px),
    radial-gradient(circle at 72% 78%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 18px, transparent 19px),
    linear-gradient(135deg, transparent 0 46%, var(--nami-style-paper-line-color) 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${transparent('var(--nami-accent-50)', 82)} 71% 73%, transparent 74%)`
  };
}

function deriveComponent(seed: NamiResolvedThemeSeed): Record<string, string> {
  const illustration = seed.stylePreset === 'illustration';
  const darkIllustration = illustration && seed.mode === 'dark';
  const high = seed.contrast === 'high';

  return {
    '--nami-button-bg': 'var(--nami-color-primary)',
    '--nami-button-fg': '#fff',
    '--nami-button-border': illustration ? 'var(--nami-style-stroke-color)' : high ? 'var(--nami-color-primary)' : 'transparent',
    '--nami-button-border-width': illustration ? 'var(--nami-style-stroke-width)' : high ? '2px' : '1px',
    '--nami-button-radius': illustration ? 'var(--nami-radius-control)' : 'var(--nami-radius-control)',
    '--nami-button-shadow': illustration ? 'var(--nami-style-offset-shadow)' : 'none',
    '--nami-button-hover-bg': 'var(--nami-color-primary-hover)',
    '--nami-card-bg': illustration ? 'var(--nami-style-control-bg)' : 'var(--nami-surface-raised)',
    '--nami-card-fg': illustration ? 'var(--nami-style-on-paper)' : 'var(--nami-text)',
    '--nami-card-inset-bg': illustration ? (darkIllustration ? 'var(--nami-style-paper-bg)' : mix('var(--nami-style-paper-bg)', 'var(--nami-accent-50)', 5)) : 'var(--nami-surface-inset)',
    '--nami-card-border': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-card-border-width': 'var(--nami-style-stroke-width)',
    '--nami-card-radius': illustration ? 'var(--nami-style-border-radius)' : 'var(--nami-radius-surface)',
    '--nami-card-shadow': illustration ? 'var(--nami-style-offset-shadow)' : 'none',
    '--nami-card-padding': 'var(--nami-space-4)',
    '--nami-card-gap': 'var(--nami-space-3)',
    '--nami-badge-bg': illustration ? (darkIllustration ? 'var(--nami-style-control-bg)' : mix('var(--nami-accent-50)', '#fff', 88)) : 'var(--nami-hover-overlay)',
    '--nami-badge-fg': illustration ? 'var(--nami-style-on-paper)' : 'var(--nami-text)',
    '--nami-badge-border': illustration ? 'var(--nami-style-stroke-color)' : 'transparent',
    '--nami-badge-border-width': 'var(--nami-style-stroke-width)',
    '--nami-badge-radius': 'var(--nami-radius-control)',
    '--nami-badge-height': '24px',
    '--nami-badge-font-size': '0.75rem',
    '--nami-badge-padding-x': '9px',
    '--nami-soft-control-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-soft-control-color': illustration ? 'var(--nami-style-on-paper)' : 'var(--nami-text)',
    '--nami-soft-control-border-width': illustration ? 'var(--nami-style-stroke-width)' : '0',
    '--nami-soft-control-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'transparent',
    '--nami-chip-bg': illustration ? (darkIllustration ? 'var(--nami-style-control-bg)' : mix('var(--nami-accent-50)', '#fff', 92)) : 'var(--nami-hover-overlay)',
    '--nami-chip-selected-bg': 'var(--nami-color-primary)',
    '--nami-chip-border-width': illustration ? 'var(--nami-style-stroke-width)' : '0',
    '--nami-chip-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'transparent',
    '--nami-chip-radius': 'var(--nami-radius-control)',
    '--nami-chip-shadow': illustration ? `3px 3px 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--nami-input-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-input-border': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-input-border-width': illustration ? 'var(--nami-style-stroke-width)' : high ? '2px' : '1px',
    '--nami-input-radius': illustration ? '12px' : 'var(--nami-radius-control)',
    '--nami-input-shadow': illustration ? `3px 3px 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--nami-switch-track-bg': illustration ? 'var(--nami-style-control-bg)' : 'var(--nami-hover-overlay)',
    '--nami-switch-border-width': 'var(--nami-style-stroke-width)',
    '--nami-switch-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-switch-thumb-bg': illustration ? 'var(--nami-style-paper-bg)' : 'var(--nami-surface-raised)',
    '--nami-switch-thumb-shadow': illustration ? `2px 2px 0 ${darkIllustration ? '#050506' : 'var(--nami-style-ink-color)'}` : `0 1px 4px ${transparent('var(--nami-shadow-color)', 64)}`,
    '--nami-radio-card-bg': illustration ? 'var(--nami-style-control-bg)' : 'var(--nami-surface-raised)',
    '--nami-radio-card-border-width': illustration ? 'var(--nami-style-stroke-width)' : high ? '2px' : '1px',
    '--nami-radio-card-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-radio-card-radius': illustration ? 'var(--nami-style-border-radius)' : 'var(--nami-radius-surface)',
    '--nami-radio-card-shadow': illustration ? 'var(--nami-style-offset-shadow)' : 'none',
    '--nami-radio-card-selected-shadow': illustration ? '0 0 0 2px var(--nami-color-primary), var(--nami-style-offset-shadow)' : '0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring)',
    '--nami-tab-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-tab-border-width': illustration ? 'var(--nami-style-stroke-width)' : '0',
    '--nami-tab-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'transparent',
    '--nami-tab-radius': illustration ? '12px' : 'var(--nami-radius-control)',
    '--nami-dialog-bg': illustration ? 'var(--nami-style-panel-bg)' : 'var(--nami-surface-raised)',
    '--nami-dialog-border-width': illustration ? 'var(--nami-style-stroke-width)' : '1px',
    '--nami-dialog-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-dialog-radius': illustration ? '18px' : 'var(--nami-radius-surface)',
    '--nami-dialog-shadow': illustration ? 'var(--nami-style-offset-shadow)' : `0 18px 50px ${transparent('var(--nami-shadow-color)', 54)}`,
    '--nami-drawer-bg': illustration ? 'var(--nami-style-panel-bg)' : 'var(--nami-surface-overlay)',
    '--nami-drawer-border-width': illustration ? 'var(--nami-style-stroke-width)' : '1px',
    '--nami-drawer-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-drawer-shadow': illustration ? 'var(--nami-style-offset-shadow)' : `0 8px 24px ${transparent('var(--nami-shadow-color)', 52)}`,
    '--nami-toast-bg': illustration ? 'var(--nami-style-control-bg)' : 'var(--nami-surface-raised)',
    '--nami-toast-border-width': illustration ? 'var(--nami-style-stroke-width)' : '1px',
    '--nami-toast-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-toast-radius': illustration ? '14px' : 'var(--nami-radius-surface)',
    '--nami-app-shell-border-width': illustration ? 'var(--nami-style-stroke-width)' : '1px',
    '--nami-app-shell-shadow': illustration ? `4px 0 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--nami-spinner-track-color': transparent('currentColor', illustration ? 64 : 72),
    '--nami-transition-progress-height': illustration ? '5px' : '4px',
    '--nami-page-transition-z-index': '2147483646',
    '--nami-top-progress-height': 'var(--nami-transition-progress-height)',
    '--nami-top-progress-duration': seed.motion === 'reduced' ? '1ms' : '260ms',
    '--nami-top-progress-ease': 'var(--nami-ease-standard)',
    '--nami-top-progress-indeterminate-duration': seed.motion === 'reduced' ? '1ms' : '1280ms',
    '--nami-top-progress-track-bg': illustration
      ? (darkIllustration ? mix('var(--nami-color-primary)', 'var(--nami-style-panel-bg)', 68) : mix('var(--nami-color-primary)', '#fff', 78))
      : 'color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 72%)',
    '--nami-top-progress-fill-bg': illustration ? 'var(--nami-color-primary)' : 'color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%)',
    '--nami-top-progress-shadow': illustration
      ? `0 4px 0 ${darkIllustration ? '#050506' : 'var(--nami-style-ink-color)'}`
      : `0 8px 24px ${transparent('var(--nami-color-primary)', 78)}`,
    '--nami-top-progress-z-index': '2147483647',
    '--nami-illus-primary': 'var(--nami-color-primary)',
    '--nami-illus-secondary': illustration ? mix('var(--nami-color-primary)', '#fff', darkIllustration ? 38 : 58) : 'var(--nami-accent-20)',
    '--nami-illus-accent': darkIllustration ? '#ffd166' : '#f5b84b',
    '--nami-illus-muted': illustration ? transparent('var(--nami-style-on-paper-muted)', darkIllustration ? 24 : 44) : transparent('var(--nami-text-muted)', 48),
    '--nami-illus-line': illustration ? 'var(--nami-style-stroke-color)' : transparent('var(--nami-text)', 36),
    '--nami-illus-bg': illustration ? transparent('var(--nami-color-primary)', darkIllustration ? 84 : 90) : 'var(--nami-color-primary-muted)',
    '--nami-illus-size-sm': '92px',
    '--nami-illus-size-md': '140px',
    '--nami-illus-size-lg': '184px',
    '--nami-empty-gap': '12px',
    '--nami-empty-title-color': illustration ? 'var(--nami-style-on-paper)' : 'var(--nami-text)',
    '--nami-empty-description-color': illustration ? 'var(--nami-style-on-paper-muted)' : 'var(--nami-text-muted)',
    '--nami-empty-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-empty-border-width': illustration ? 'var(--nami-style-stroke-width)' : '0',
    '--nami-empty-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'transparent',
    '--nami-empty-radius': illustration ? 'var(--nami-style-border-radius)' : 'var(--nami-radius-surface)',
    '--nami-empty-shadow': illustration ? 'var(--nami-style-offset-shadow)' : 'none',
    '--nami-result-title-size': '1.5rem',
    '--nami-result-subtitle-size': '0.95rem',
    '--nami-result-gap': '14px',
    '--nami-result-actions-margin': '10px 0 0',
    '--nami-result-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-result-border-width': illustration ? 'var(--nami-style-stroke-width)' : '0',
    '--nami-result-border-color': illustration ? 'var(--nami-style-stroke-color)' : 'transparent',
    '--nami-result-radius': illustration ? 'var(--nami-style-border-radius)' : 'var(--nami-radius-surface)',
    '--nami-result-shadow': illustration ? 'var(--nami-style-offset-shadow)' : 'none',
    '--nami-container-max-width': 'var(--nami-container-lg)',
    '--nami-container-padding': 'var(--nami-layout-gutter)',
    '--nami-stack-gap': 'var(--nami-space-3)',
    '--nami-cluster-gap': 'var(--nami-space-2)',
    '--nami-grid-min': '16rem',
    '--nami-grid-gap': 'var(--nami-layout-gutter)',
    '--nami-split-min': '18rem',
    '--nami-split-gap': 'var(--nami-layout-gutter)',
    '--nami-checkbox-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-checkbox-border': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-checkbox-border-width': illustration ? 'var(--nami-style-stroke-width)' : high ? '2px' : '1px',
    '--nami-checkbox-radius': seed.radius === 'round' ? '6px' : 'var(--nami-radius-tight)',
    '--nami-checkbox-indicator-color': '#fff',
    '--nami-textarea-bg': illustration ? 'var(--nami-style-control-bg)' : 'transparent',
    '--nami-textarea-border': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-textarea-border-width': illustration ? 'var(--nami-style-stroke-width)' : high ? '2px' : '1px',
    '--nami-textarea-radius': illustration ? '12px' : 'var(--nami-radius-surface)',
    '--nami-textarea-shadow': illustration ? `3px 3px 0 ${darkIllustration ? '#050506' : '#2f2f2f'}` : 'none',
    '--nami-form-field-gap': 'var(--nami-space-2)',
    '--nami-alert-bg': illustration ? 'var(--nami-style-control-bg)' : 'var(--nami-surface-raised)',
    '--nami-alert-border': illustration ? 'var(--nami-style-stroke-color)' : 'var(--nami-border)',
    '--nami-alert-border-width': illustration ? 'var(--nami-style-stroke-width)' : high ? '2px' : '1px',
    '--nami-alert-radius': illustration ? 'var(--nami-style-border-radius)' : 'var(--nami-radius-surface)',
    '--nami-alert-shadow': illustration ? 'var(--nami-style-offset-shadow)' : 'none',
    '--nami-skeleton-bg': illustration ? transparent('var(--nami-style-on-paper-muted)', 82) : 'var(--nami-hover-overlay)',
    '--nami-skeleton-highlight': illustration ? transparent('var(--nami-style-paper-bg)', 18) : transparent('#fff', darkIllustration ? 82 : 18),
    '--nami-progress-track-bg': illustration
      ? (darkIllustration ? mix('var(--nami-color-primary)', 'var(--nami-style-panel-bg)', 72) : mix('var(--nami-color-primary)', '#fff', 84))
      : 'color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%)',
    '--nami-progress-fill-bg': 'var(--nami-color-primary)',
    '--nami-progress-height': '8px',
    '--nami-progress-radius': 'var(--nami-radius-control)'
  };
}

export function deriveNamiTheme(seed: NamiThemeSeed = {}): NamiResolvedTheme {
  const normalized = normalizeSeed(seed);
  const diagnostics = validateThemeSeed(seed);
  const palette = derivePalette(normalized);
  const semantic = deriveSemantic(normalized);
  const style = normalized.stylePreset === 'illustration' ? deriveIllustrationStyle(normalized) : deriveDefaultStyle(normalized);
  const component = deriveComponent(normalized);
  const cssVars = {
    ...palette,
    ...deriveRadius(normalized),
    ...deriveLayout(),
    '--nami-contrast-level': normalized.contrast,
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

export function defineNamiTheme(config: NamiThemeConfig): NamiThemeConfig {
  return {
    ...config,
    seed: { ...config.seed },
    recipes: { ...config.recipes },
    slotRecipes: { ...config.slotRecipes },
    conditions: { ...config.conditions }
  };
}

function tokenLookupKey(name: string) {
  if (name.startsWith('--')) return name;
  return toCssVarName(name.split('.'));
}

function inferDtcgType(value: string): string {
  if (/^#|^rgb|^hsl|color-mix\(/.test(value)) return 'color';
  if (/^-?\d+(\.\d+)?(px|rem|em|%|dvh|dvw|vh|vw)$/.test(value)) return 'dimension';
  if (/^-?\d+(\.\d+)?m?s$/.test(value)) return 'duration';
  if (/^-?\d+(\.\d+)?$/.test(value)) return 'number';
  if (/cubic-bezier|linear/.test(value)) return 'cubicBezier';
  if (/shadow|0\s/.test(value) && value.includes(' ')) return 'shadow';
  return 'string';
}

function toDtcgTokens(values: Record<string, string>): Record<string, NamiThemeDtcgToken> {
  return Object.fromEntries(Object.entries(values).map(([token, value]) => [
    token,
    {
      $type: inferDtcgType(value),
      $value: value
    }
  ]));
}

export function createNamiThemeSystem(config: NamiThemeConfig = {}): NamiThemeSystem {
  const normalizedConfig = defineNamiTheme(config);
  const baseTheme = deriveNamiTheme(normalizedConfig.seed ?? {});
  const cssVars = {
    ...baseTheme.cssVars,
    ...resolveConfigCssVars(normalizedConfig, baseTheme)
  };
  const theme: NamiResolvedTheme = {
    ...baseTheme,
    cssVars
  };

  return {
    ...theme,
    config: normalizedConfig,
    conditions: normalizedConfig.conditions ?? {},
    recipes: normalizedConfig.recipes ?? {},
    slotRecipes: normalizedConfig.slotRecipes ?? {},
    token: (name: string, fallback = '') => cssVars[tokenLookupKey(name)] ?? fallback,
    tokenVar: (name: string, fallback = '') => {
      const key = tokenLookupKey(name);
      return key in cssVars ? `var(${key})` : fallback;
    },
    cssText: (selector = ':root') => themeToCssText(theme, selector),
    dtcg: () => themeToDtcg(theme)
  };
}

export function themeToCssVars(theme: Pick<NamiResolvedTheme, 'cssVars'>): Record<string, string> {
  return { ...theme.cssVars };
}

export function themeToCssText(theme: Pick<NamiResolvedTheme, 'cssVars'>, selector = ':root'): string {
  const declarations = Object.entries(theme.cssVars)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([token, value]) => `  ${token}: ${value};`)
    .join('\n');
  return `${selector} {\n${declarations}\n}`;
}

export function themeToDtcg(theme: NamiResolvedTheme): NamiThemeDtcgDocument {
  const seed = Object.fromEntries(Object.entries(theme.seed).map(([token, value]) => [
    token,
    {
      $type: token === 'accent' ? 'color' : 'string',
      $value: value
    }
  ]));

  return {
    $schema: 'https://www.designtokens.org/schemas/2025.10/tokens.json',
    $extensions: {
      'org.nami.theme': {
        generatedBy: '@nami/tokens',
        layers: ['seed', 'palette', 'semantic', 'component', 'style', 'cssVars']
      }
    },
    seed,
    palette: toDtcgTokens(theme.palette),
    semantic: toDtcgTokens(theme.semantic),
    component: toDtcgTokens(theme.component),
    style: toDtcgTokens(theme.style),
    cssVars: toDtcgTokens(theme.cssVars)
  };
}
