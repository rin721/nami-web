import {
  createNamiThemeSystem,
  defineNamiTheme,
  themeToCssText,
  type NamiThemeConfig,
  type NamiThemeSystem
} from './theme';

export interface NamiThemeStudioOptions {
  selector?: string;
}

export interface NamiThemeStudioDiagnostic {
  label: string;
  ratio: number | null;
  state: 'pass' | 'review' | 'unknown';
}

export interface NamiThemeStudioTokenGroup {
  label: string;
  values: Record<string, unknown>;
}

export interface NamiThemeStudioResult {
  system: NamiThemeSystem;
  cssText: string;
  dtcgJson: string;
  tsConfig: string;
  diagnostics: NamiThemeStudioDiagnostic[];
  tokenTree: NamiThemeStudioTokenGroup[];
}

function hexToRgb(value: string) {
  const hex = value.trim().replace(/^#/, '');
  const normalized = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex;
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  const number = Number.parseInt(normalized, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255
  };
}

export function contrastRatio(foreground: string, background: string) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return null;
  const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const channels = [r, g, b].map((channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const light = Math.max(luminance(fg), luminance(bg));
  const dark = Math.min(luminance(fg), luminance(bg));
  return (light + 0.05) / (dark + 0.05);
}

export function readDtcgCssVars(document: unknown) {
  const vars: Record<string, string> = {};
  if (!document || typeof document !== 'object') return vars;
  const groups = ['cssVars', 'palette', 'semantic', 'component', 'style'];
  for (const group of groups) {
    const tokens = (document as Record<string, unknown>)[group];
    if (!tokens || typeof tokens !== 'object') continue;
    for (const [token, value] of Object.entries(tokens as Record<string, unknown>)) {
      if (!token.startsWith('--nami-') || !value || typeof value !== 'object' || !('$value' in value)) continue;
      vars[token] = String((value as { $value: unknown }).$value);
    }
  }
  return vars;
}

function diagnostic(label: string, ratio: number | null): NamiThemeStudioDiagnostic {
  return {
    label,
    ratio,
    state: ratio === null ? 'unknown' : ratio >= 4.5 ? 'pass' : 'review'
  };
}

export function createNamiThemeStudio(config: NamiThemeConfig = {}, options: NamiThemeStudioOptions = {}): NamiThemeStudioResult {
  const normalizedConfig = defineNamiTheme(config);
  const system = createNamiThemeSystem(normalizedConfig);
  const selector = options.selector ?? '.my-nami-theme';
  const dtcg = system.dtcg();
  return {
    system,
    cssText: themeToCssText(system, selector),
    dtcgJson: JSON.stringify(dtcg, null, 2),
    tsConfig: `import { defineNamiTheme } from '@nami-web/tokens/theme';\n\nexport default defineNamiTheme(${JSON.stringify(normalizedConfig, null, 2)});\n`,
    diagnostics: [
      diagnostic('Text / surface', contrastRatio(system.cssVars['--nami-text'], system.cssVars['--nami-surface'])),
      diagnostic('Accent / surface', contrastRatio(system.cssVars['--nami-accent-50'], system.cssVars['--nami-surface']))
    ],
    tokenTree: [
      { label: 'Seed', values: { ...system.seed } },
      { label: 'Palette', values: system.palette },
      { label: 'Semantic', values: system.semantic },
      { label: 'Style', values: system.style },
      { label: 'Component', values: system.component }
    ]
  };
}
