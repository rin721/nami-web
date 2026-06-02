import { applyTransitionElementSettings, readDocsSettings } from './docs-settings';

type TransitionAppearance = 'bar' | 'veil' | 'panel';
type TransitionOptions = { appearance?: TransitionAppearance; duration?: number; progress?: number | null; barHeight?: number; progressDuration?: number };

type NamiPageTransitionElement = HTMLElement & {
  active?: boolean;
  appearance?: TransitionAppearance;
  progress?: number;
  barHeight?: number;
  progressDuration?: number;
  show?: (options?: TransitionOptions) => void;
  hide?: (options?: TransitionOptions) => Promise<void>;
};

const requiredElements = ['nami-config', 'nami-theme', 'nami-app-shell', 'nami-page-transition', 'nami-button', 'nami-card'];
const routeBarMinimumMs = 420;
const routeBarExitMs = 160;

function readTransition() {
  return document.querySelector('#docs-page-transition') as NamiPageTransitionElement | null;
}

let routeProgressTimer = 0;
let routeHideTimer = 0;
let routeActive = false;
let routeStartedAt = 0;
let initialRevealApplied = false;

function syncTransitionOptions(transition: NamiPageTransitionElement, options: TransitionOptions) {
  const settings = readDocsSettings();
  const barHeight = options.barHeight ?? settings.transition.barHeight;
  const progressDuration = options.progressDuration ?? settings.transition.progressDuration;
  transition.barHeight = barHeight;
  transition.progressDuration = progressDuration;
  transition.setAttribute('bar-height', String(barHeight));
  transition.setAttribute('progress-duration', String(progressDuration));
  transition.style.setProperty('--nami-page-transition-bar-height', `${barHeight}px`);
  transition.style.setProperty('--nami-page-transition-progress-duration', `${progressDuration}ms`);
  if (options.appearance) {
    transition.appearance = options.appearance;
    transition.setAttribute('appearance', options.appearance);
  }
  if (options.progress !== undefined) {
    if (options.progress === null) {
      transition.progress = undefined;
      transition.removeAttribute('progress');
      transition.style.removeProperty('--nami-page-transition-progress');
    } else {
      transition.progress = options.progress;
      transition.setAttribute('progress', String(options.progress));
      transition.style.setProperty('--nami-page-transition-progress', `${Math.min(100, Math.max(0, options.progress))}%`);
    }
  }
}

function syncFallbackActive(transition: NamiPageTransitionElement, active: boolean) {
  if (active) {
    transition.active = true;
    transition.setAttribute('active', '');
  } else {
    transition.active = false;
    transition.removeAttribute('active');
  }
}

function setTransition(active: boolean, options: TransitionOptions = {}) {
  const transition = readTransition();
  if (!transition) return;

  applyTransitionElementSettings(transition);
  syncTransitionOptions(transition, options);

  if (active && transition.show) {
    syncFallbackActive(transition, true);
    transition.show(options);
    return;
  }
  if (!active && transition.hide) {
    void transition.hide(options);
    return;
  }

  syncFallbackActive(transition, active);
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

function domReady() {
  if (document.readyState !== 'loading') return Promise.resolve();
  return new Promise<void>((resolve) => document.addEventListener('DOMContentLoaded', () => resolve(), { once: true }));
}

async function waitForPageReady() {
  await domReady();
  await Promise.all(requiredElements.map((name) => customElements.whenDefined(name)));
  await nextFrame();
  await nextFrame();
}

let readyToken = 0;

async function hideWhenReady() {
  const token = ++readyToken;
  const settings = readDocsSettings();
  const transition = readTransition();
  if (transition && settings.transition.firstLoadAppearance !== 'none' && !routeActive && !initialRevealApplied) {
    initialRevealApplied = true;
    const appearance = settings.transition.firstLoadAppearance === 'panel' ? 'panel' : 'veil';
    setTransition(true, { appearance, progress: null });
  }
  await waitForPageReady();
  if (token === readyToken) {
    document.documentElement.dataset.namiReady = 'true';
    if (routeActive) return;
    setTransition(false, { progress: null });
  }
}

document.addEventListener('astro:before-preparation', () => {
  const settings = readDocsSettings();
  if (!settings.transition.routeBar) {
    routeActive = false;
    setTransition(false, { appearance: 'bar', progress: null });
    return;
  }
  window.clearTimeout(routeProgressTimer);
  window.clearTimeout(routeHideTimer);
  routeActive = true;
  routeStartedAt = performance.now();
  document.documentElement.dataset.namiReady = 'false';
  setTransition(true, { appearance: 'bar', progress: 18, duration: routeBarExitMs, barHeight: settings.transition.barHeight, progressDuration: settings.transition.progressDuration });
  routeProgressTimer = window.setTimeout(() => {
    setTransition(true, { appearance: 'bar', progress: 58, duration: routeBarExitMs, barHeight: settings.transition.barHeight, progressDuration: settings.transition.progressDuration });
  }, 120);
});

document.addEventListener('astro:after-preparation', () => {
  const settings = readDocsSettings();
  if (!settings.transition.routeBar) return;
  window.clearTimeout(routeProgressTimer);
  const elapsed = performance.now() - routeStartedAt;
  const hideDelay = Math.max(180, routeBarMinimumMs - elapsed);
  setTransition(true, { appearance: 'bar', progress: 100, duration: routeBarExitMs, barHeight: settings.transition.barHeight, progressDuration: settings.transition.progressDuration });
  routeHideTimer = window.setTimeout(() => {
    routeActive = false;
    setTransition(false, { appearance: 'bar', progress: null, duration: routeBarExitMs, barHeight: settings.transition.barHeight, progressDuration: settings.transition.progressDuration });
  }, hideDelay);
});

document.addEventListener('astro:after-swap', () => {
  void hideWhenReady();
});

document.addEventListener('astro:page-load', () => {
  void hideWhenReady();
});

window.addEventListener('nami-docs-settings-change', () => {
  const transition = readTransition();
  if (transition) applyTransitionElementSettings(transition);
});

void hideWhenReady();
