export type DocsThemeMode = 'light' | 'dark';
export type DocsDensity = 'comfortable' | 'compact';
export type DocsMotion = 'normal' | 'reduced';
export type DocsStylePreset = 'default' | 'illustration';
export type DocsRadius = 'sharp' | 'soft' | 'round';
export type DocsContrast = 'normal' | 'high';
export type DocsInitialTransition = 'veil' | 'panel' | 'none';

export type DocsVisualState = {
  theme: DocsThemeMode;
  accent: string;
  density: DocsDensity;
  motion: DocsMotion;
  stylePreset: DocsStylePreset;
  radius: DocsRadius;
  contrast: DocsContrast;
};

export type DocsTransitionState = {
  firstLoadAppearance: DocsInitialTransition;
  routeBar: boolean;
  barHeight: number;
  progressDuration: number;
};

export type DocsPreferenceState = {
  rememberTheme: boolean;
  compactDocs: boolean;
};

export type DocsSettingsState = {
  visual: DocsVisualState;
  transition: DocsTransitionState;
  preferences: DocsPreferenceState;
};

export const docsSettingsStorageKey = 'nami-docs-settings:v2';
const legacyVisualStorageKey = 'nami-docs-visual-state';

export const defaultDocsSettings: DocsSettingsState = {
  visual: {
    theme: 'light',
    accent: '#3b82f6',
    density: 'comfortable',
    motion: 'normal',
    stylePreset: 'default',
    radius: 'round',
    contrast: 'normal'
  },
  transition: {
    firstLoadAppearance: 'veil',
    routeBar: true,
    barHeight: 4,
    progressDuration: 220
  },
  preferences: {
    rememberTheme: true,
    compactDocs: false
  }
};

function readJson<T>(key: string): Partial<T> {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '{}') as Partial<T>;
  } catch {
    return {};
  }
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? value as T : fallback;
}

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function normalizeVisual(value: Partial<DocsVisualState> = {}): DocsVisualState {
  return {
    theme: oneOf(value.theme, ['light', 'dark'] as const, defaultDocsSettings.visual.theme),
    accent: typeof value.accent === 'string' && value.accent ? value.accent : defaultDocsSettings.visual.accent,
    density: oneOf(value.density, ['comfortable', 'compact'] as const, defaultDocsSettings.visual.density),
    motion: oneOf(value.motion, ['normal', 'reduced'] as const, defaultDocsSettings.visual.motion),
    stylePreset: oneOf(value.stylePreset, ['default', 'illustration'] as const, defaultDocsSettings.visual.stylePreset),
    radius: oneOf(value.radius, ['sharp', 'soft', 'round'] as const, defaultDocsSettings.visual.radius),
    contrast: oneOf(value.contrast, ['normal', 'high'] as const, defaultDocsSettings.visual.contrast)
  };
}

function normalizeTransition(value: Partial<DocsTransitionState> = {}): DocsTransitionState {
  return {
    firstLoadAppearance: oneOf(value.firstLoadAppearance, ['veil', 'panel', 'none'] as const, defaultDocsSettings.transition.firstLoadAppearance),
    routeBar: typeof value.routeBar === 'boolean' ? value.routeBar : defaultDocsSettings.transition.routeBar,
    barHeight: numberInRange(value.barHeight, defaultDocsSettings.transition.barHeight, 2, 16),
    progressDuration: numberInRange(value.progressDuration, defaultDocsSettings.transition.progressDuration, 1, 900)
  };
}

function normalizePreferences(value: Partial<DocsPreferenceState> = {}): DocsPreferenceState {
  return {
    rememberTheme: typeof value.rememberTheme === 'boolean' ? value.rememberTheme : defaultDocsSettings.preferences.rememberTheme,
    compactDocs: typeof value.compactDocs === 'boolean' ? value.compactDocs : defaultDocsSettings.preferences.compactDocs
  };
}

export function readDocsSettings(): DocsSettingsState {
  const current = readJson<DocsSettingsState>(docsSettingsStorageKey);
  const legacyVisual = readJson<DocsVisualState>(legacyVisualStorageKey);
  return {
    visual: normalizeVisual({ ...legacyVisual, ...current.visual }),
    transition: normalizeTransition(current.transition),
    preferences: normalizePreferences(current.preferences)
  };
}

export function writeDocsSettings(settings: DocsSettingsState) {
  localStorage.setItem(docsSettingsStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('nami-docs-settings-change', { detail: settings }));
}

export function updateDocsSettings(updater: (settings: DocsSettingsState) => DocsSettingsState) {
  const next = updater(readDocsSettings());
  writeDocsSettings(next);
  return next;
}

export function applyTopProgressElementSettings(element: HTMLElement | null, settings = readDocsSettings()) {
  if (!element) return;
  element.setAttribute('height', String(settings.transition.barHeight));
  element.setAttribute('duration', String(settings.transition.progressDuration));
  element.style.setProperty('--nami-transition-progress-height', `${settings.transition.barHeight}px`);
  element.style.setProperty('--nami-top-progress-height', `${settings.transition.barHeight}px`);
  element.style.setProperty('--nami-top-progress-duration', `${settings.transition.progressDuration}ms`);
}
