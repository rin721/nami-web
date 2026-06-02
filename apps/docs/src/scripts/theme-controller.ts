import { navigate } from 'astro:transitions/client';

type DocsVisualState = {
  theme: 'light' | 'dark';
  accent: string;
  density: 'comfortable' | 'compact';
  motion: 'normal' | 'reduced';
  stylePreset: 'default' | 'illustration';
  radius: 'sharp' | 'soft' | 'round';
  contrast: 'normal' | 'high';
};

type ThemeController = {
  installed: boolean;
  state: DocsVisualState;
  apply: () => void;
  sync: () => void;
};

type DocsWindow = Window & {
  __namiDocsThemeController?: ThemeController;
};

const storageKey = 'nami-docs-visual-state';
const locales = ['zh-CN', 'en-US'] as const;

function currentLocale() {
  const value = location.pathname.split('/').filter(Boolean)[0];
  return locales.includes(value as (typeof locales)[number]) ? value : 'zh-CN';
}

function readSavedState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<DocsVisualState>;
  } catch {
    return {};
  }
}

function readRoot() {
  return document.querySelector('nami-theme') as HTMLElement & Partial<DocsVisualState> | null;
}

function initialState(): DocsVisualState {
  const root = readRoot();
  const saved = readSavedState();
  return {
    theme: saved.theme || (root?.getAttribute('theme') as DocsVisualState['theme']) || 'light',
    accent: saved.accent || root?.getAttribute('accent') || '#3b82f6',
    density: saved.density || (root?.getAttribute('density') as DocsVisualState['density']) || 'comfortable',
    motion: saved.motion || (root?.getAttribute('motion') as DocsVisualState['motion']) || 'normal',
    stylePreset: saved.stylePreset || (root?.getAttribute('style-preset') as DocsVisualState['stylePreset']) || 'default',
    radius: saved.radius || (root?.getAttribute('radius') as DocsVisualState['radius']) || 'round',
    contrast: saved.contrast || (root?.getAttribute('contrast') as DocsVisualState['contrast']) || 'normal'
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

function createController(): ThemeController {
  const controller: ThemeController = {
    installed: false,
    state: initialState(),
    apply: () => {
      const root = readRoot();
      if (!root) return;
      root.theme = controller.state.theme;
      root.accent = controller.state.accent;
      root.density = controller.state.density;
      root.motion = controller.state.motion;
      root.stylePreset = controller.state.stylePreset;
      root.radius = controller.state.radius;
      root.contrast = controller.state.contrast;
      localStorage.setItem(storageKey, JSON.stringify(controller.state));
    },
    sync: () => {
      syncControlValue('[data-theme-mode]', controller.state.theme);
      syncControlSelected('[data-style-toggle]', controller.state.stylePreset === 'illustration');
      syncControlValue('[data-radius-mode]', controller.state.radius);
      syncControlSelected('[data-contrast-toggle]', controller.state.contrast === 'high');
      syncControlSelected('[data-density-toggle]', controller.state.density === 'compact');
      syncControlChecked('[data-motion-toggle]', controller.state.motion === 'reduced');
      syncControlValue('[data-locale-mode]', currentLocale());
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
      docsController.state.accent = accentButton.dataset.accent ?? '#3b82f6';
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
      docsController.state.theme = docsController.state.theme === 'dark' ? 'light' : 'dark';
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
    if (target.matches('[data-theme-mode]')) docsController.state.theme = event.detail.value === 'dark' ? 'dark' : 'light';
    if (target.matches('[data-style-toggle]')) docsController.state.stylePreset = event.detail.selected ? 'illustration' : 'default';
    if (target.matches('[data-radius-mode]')) {
      const value = event.detail.value;
      docsController.state.radius = value === 'sharp' || value === 'soft' ? value : 'round';
    }
    if (target.matches('[data-contrast-toggle]')) docsController.state.contrast = event.detail.selected ? 'high' : 'normal';
    if (target.matches('[data-density-toggle]')) docsController.state.density = event.detail.selected ? 'compact' : 'comfortable';
    if (target.matches('[data-motion-toggle]')) docsController.state.motion = event.detail.checked ? 'reduced' : 'normal';
    docsController.apply();
    docsController.sync();
  }) as EventListener);
}

function setupThemeController() {
  installDocumentListeners();
  const docsController = controller();
  docsController.apply();
  docsController.sync();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupThemeController, { once: true });
} else {
  setupThemeController();
}

document.addEventListener('astro:page-load', setupThemeController);
