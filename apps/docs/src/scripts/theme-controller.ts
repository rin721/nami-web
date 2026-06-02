import { navigate } from 'astro:transitions/client';
import {
  applyTopProgressElementSettings,
  defaultDocsSettings,
  readDocsSettings,
  writeDocsSettings,
  type DocsSettingsState,
  type DocsVisualState
} from './docs-settings';

type ThemeController = {
  installed: boolean;
  settings: DocsSettingsState;
  apply: () => void;
  sync: () => void;
};

type DocsWindow = Window & {
  __namiDocsThemeController?: ThemeController;
};

const locales = ['zh-CN', 'en-US'] as const;

function currentLocale() {
  const value = location.pathname.split('/').filter(Boolean)[0];
  return locales.includes(value as (typeof locales)[number]) ? value : 'zh-CN';
}

function readRoot() {
  return document.querySelector('nami-theme') as HTMLElement & Partial<DocsVisualState> | null;
}

function initialSettings(): DocsSettingsState {
  const root = readRoot();
  const saved = readDocsSettings();
  return {
    ...saved,
    visual: {
      theme: saved.visual.theme || (root?.getAttribute('theme') as DocsVisualState['theme']) || defaultDocsSettings.visual.theme,
      accent: saved.visual.accent || root?.getAttribute('accent') || defaultDocsSettings.visual.accent,
      density: saved.visual.density || (root?.getAttribute('density') as DocsVisualState['density']) || defaultDocsSettings.visual.density,
      motion: saved.visual.motion || (root?.getAttribute('motion') as DocsVisualState['motion']) || defaultDocsSettings.visual.motion,
      stylePreset: saved.visual.stylePreset || (root?.getAttribute('style-preset') as DocsVisualState['stylePreset']) || defaultDocsSettings.visual.stylePreset,
      radius: saved.visual.radius || (root?.getAttribute('radius') as DocsVisualState['radius']) || defaultDocsSettings.visual.radius,
      contrast: saved.visual.contrast || (root?.getAttribute('contrast') as DocsVisualState['contrast']) || defaultDocsSettings.visual.contrast
    }
  };
}

function switchLocale(locale: string) {
  const parts = location.pathname.split('/').filter(Boolean);
  if (locales.includes(parts[0] as (typeof locales)[number])) {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }
  const target = `/${parts.join('/')}/${location.search}`;
  void navigate(target);
}

function syncControlValue(selector: string, value: string) {
  document.querySelectorAll<HTMLElement>(selector).forEach((control) => {
    (control as HTMLElement & { value: string }).value = value;
    control.setAttribute('value', value);
  });
}

function syncControlSelected(selector: string, selected: boolean) {
  document.querySelectorAll<HTMLElement>(selector).forEach((control) => {
    (control as HTMLElement & { selected: boolean }).selected = selected;
  });
}

function syncControlChecked(selector: string, checked: boolean) {
  document.querySelectorAll<HTMLElement>(selector).forEach((control) => {
    (control as HTMLElement & { checked: boolean }).checked = checked;
  });
}

function clampNumber(value: unknown, fallback: number, min: number, max: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function createController(): ThemeController {
  const controller: ThemeController = {
    installed: false,
    settings: initialSettings(),
    apply: () => {
      const root = readRoot();
      if (!root) return;
      const { visual } = controller.settings;
      root.theme = visual.theme;
      root.accent = visual.accent;
      root.density = visual.density;
      root.motion = visual.motion;
      root.stylePreset = visual.stylePreset;
      root.radius = visual.radius;
      root.contrast = visual.contrast;
      const progressHeight = `${controller.settings.transition.barHeight}px`;
      root.style.setProperty('--nami-transition-progress-height', progressHeight);
      document.documentElement.dataset.namiDocsDensity = controller.settings.preferences.compactDocs ? 'compact' : 'comfortable';
      document.querySelector<HTMLElement>('#docs-page-transition')?.style.setProperty('--nami-transition-progress-height', progressHeight);
      applyTopProgressElementSettings(document.querySelector('#docs-top-progress'), controller.settings);
      document.querySelectorAll<HTMLElement>('nami-top-progress[data-docs-top-progress-preview]').forEach((element) => {
        applyTopProgressElementSettings(element, controller.settings);
      });
      writeDocsSettings(controller.settings);
    },
    sync: () => {
      const { visual, transition, preferences } = controller.settings;
      syncControlValue('[data-theme-mode]', visual.theme);
      syncControlSelected('[data-style-toggle]', visual.stylePreset === 'illustration');
      syncControlValue('[data-style-preset-mode]', visual.stylePreset);
      syncControlValue('[data-radius-mode]', visual.radius);
      syncControlSelected('[data-contrast-toggle]', visual.contrast === 'high');
      syncControlValue('[data-contrast-mode]', visual.contrast);
      syncControlSelected('[data-density-toggle]', visual.density === 'compact');
      syncControlValue('[data-density-mode]', visual.density);
      syncControlChecked('[data-motion-toggle]', visual.motion === 'reduced');
      syncControlValue('[data-motion-mode]', visual.motion);
      syncControlValue('[data-locale-mode]', currentLocale());
      syncControlValue('[data-initial-transition-mode]', transition.firstLoadAppearance);
      syncControlChecked('[data-route-bar-toggle]', transition.routeBar);
      syncControlValue('[data-progress-height-input]', String(transition.barHeight));
      syncControlValue('[data-progress-duration-mode]', String(transition.progressDuration));
      syncControlChecked('[data-remember-theme-toggle]', preferences.rememberTheme);
      syncControlChecked('[data-compact-docs-toggle]', preferences.compactDocs);
    }
  };
  return controller;
}

function controller() {
  const win = window as DocsWindow;
  win.__namiDocsThemeController ??= createController();
  return win.__namiDocsThemeController;
}

function installDocumentListeners() {
  const docsController = controller();
  if (docsController.installed) return;
  docsController.installed = true;

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const accentButton = target.closest<HTMLButtonElement>('[data-accent]');
    if (accentButton) {
      docsController.settings.visual.accent = accentButton.dataset.accent ?? defaultDocsSettings.visual.accent;
      docsController.apply();
      docsController.sync();
    }
  });

  document.addEventListener('nami-click', ((event: CustomEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === 'docs-open-theme') {
      const drawer = document.querySelector('#docs-theme-drawer') as HTMLElement & { open?: boolean } | null;
      if (drawer) drawer.open = true;
    }
    if (target.id === 'docs-toggle-theme') {
      docsController.settings.visual.theme = docsController.settings.visual.theme === 'dark' ? 'light' : 'dark';
      docsController.apply();
      docsController.sync();
    }
  }) as EventListener);

  document.addEventListener('nami-change', ((event: CustomEvent<Record<string, unknown>>) => {
    const target = event.target as HTMLElement;
    if (target.matches('[data-locale-mode]')) {
      switchLocale(String(event.detail.value ?? currentLocale()));
      return;
    }
    if (target.matches('[data-theme-mode]')) docsController.settings.visual.theme = event.detail.value === 'dark' ? 'dark' : 'light';
    if (target.matches('[data-style-toggle]')) docsController.settings.visual.stylePreset = event.detail.selected ? 'illustration' : 'default';
    if (target.matches('[data-style-preset-mode]')) docsController.settings.visual.stylePreset = event.detail.value === 'illustration' ? 'illustration' : 'default';
    if (target.matches('[data-radius-mode]')) {
      const value = event.detail.value;
      docsController.settings.visual.radius = value === 'sharp' || value === 'soft' ? value : 'round';
    }
    if (target.matches('[data-contrast-toggle]')) docsController.settings.visual.contrast = event.detail.selected ? 'high' : 'normal';
    if (target.matches('[data-contrast-mode]')) docsController.settings.visual.contrast = event.detail.value === 'high' ? 'high' : 'normal';
    if (target.matches('[data-density-toggle]')) docsController.settings.visual.density = event.detail.selected ? 'compact' : 'comfortable';
    if (target.matches('[data-density-mode]')) docsController.settings.visual.density = event.detail.value === 'compact' ? 'compact' : 'comfortable';
    if (target.matches('[data-motion-toggle]')) docsController.settings.visual.motion = event.detail.checked ? 'reduced' : 'normal';
    if (target.matches('[data-motion-mode]')) docsController.settings.visual.motion = event.detail.value === 'reduced' ? 'reduced' : 'normal';
    if (target.matches('[data-initial-transition-mode]')) {
      const value = String(event.detail.value ?? 'veil');
      docsController.settings.transition.firstLoadAppearance = value === 'panel' || value === 'none' ? value : 'veil';
    }
    if (target.matches('[data-route-bar-toggle]')) docsController.settings.transition.routeBar = Boolean(event.detail.checked);
    if (target.matches('[data-progress-height-input]')) {
      docsController.settings.transition.barHeight = clampNumber(event.detail.value, defaultDocsSettings.transition.barHeight, 2, 16);
    }
    if (target.matches('[data-progress-duration-mode]')) docsController.settings.transition.progressDuration = Number(event.detail.value ?? 220);
    if (target.matches('[data-remember-theme-toggle]')) docsController.settings.preferences.rememberTheme = Boolean(event.detail.checked);
    if (target.matches('[data-compact-docs-toggle]')) docsController.settings.preferences.compactDocs = Boolean(event.detail.checked);
    docsController.apply();
    docsController.sync();
  }) as EventListener);
}

function setupThemeController() {
  installDocumentListeners();
  const docsController = controller();
  docsController.settings = readDocsSettings();
  docsController.apply();
  docsController.sync();
}

window.addEventListener('nami-docs-settings-change', ((event: CustomEvent<DocsSettingsState>) => {
  const docsController = controller();
  docsController.settings = event.detail;
  docsController.sync();
}) as EventListener);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupThemeController, { once: true });
} else {
  setupThemeController();
}

document.addEventListener('astro:page-load', setupThemeController);
