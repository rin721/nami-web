import { applyTopProgressElementSettings, readDocsSettings } from './docs-settings';

type PageAppearance = 'veil' | 'panel';
type PageTransitionOptions = { appearance?: PageAppearance; duration?: number };
type TopProgressEffect = 'flow' | 'slide' | 'pulse';
type TopProgressOptions = { duration?: number; effect?: TopProgressEffect; height?: number; progress?: number | null; variant?: 'fixed' | 'inline' };

type NamiPageTransitionElement = HTMLElement & {
  active?: boolean;
  appearance?: PageAppearance;
  show?: (options?: PageTransitionOptions) => void;
  hide?: (options?: PageTransitionOptions) => Promise<void>;
};

type NamiTopProgressElement = HTMLElement & {
  active?: boolean;
  duration?: number;
  effect?: TopProgressEffect;
  height?: number;
  progress?: number;
  show?: (options?: TopProgressOptions) => void;
  hide?: (options?: TopProgressOptions) => Promise<void>;
  finish?: (options?: TopProgressOptions) => Promise<void>;
};

const requiredElements = ['nami-config', 'nami-theme', 'nami-app-shell', 'nami-page-transition', 'nami-top-progress', 'nami-button', 'nami-card'];
const routeMinimumMs = 420;
const routeExitMs = 160;

function readPageTransition() {
  return document.querySelector('#docs-page-transition') as NamiPageTransitionElement | null;
}

function readTopProgress() {
  return document.querySelector('#docs-top-progress') as NamiTopProgressElement | null;
}

function syncFallbackActive(element: HTMLElement, active: boolean) {
  if (active) {
    (element as HTMLElement & { active?: boolean }).active = true;
    element.setAttribute('active', '');
  } else {
    (element as HTMLElement & { active?: boolean }).active = false;
    element.removeAttribute('active');
  }
}

function syncTopProgressOptions(progress: NamiTopProgressElement, options: TopProgressOptions) {
  const settings = readDocsSettings();
  const height = options.height ?? settings.transition.barHeight;
  const duration = options.duration ?? settings.transition.progressDuration;
  const effect = options.effect ?? settings.transition.progressEffect;
  progress.height = height;
  progress.duration = duration;
  progress.effect = effect;
  progress.setAttribute('height', String(height));
  progress.setAttribute('duration', String(duration));
  progress.setAttribute('effect', effect);
  progress.style.setProperty('--nami-transition-progress-height', `${height}px`);
  progress.style.setProperty('--nami-top-progress-height', `${height}px`);
  progress.style.setProperty('--nami-top-progress-duration', `${duration}ms`);
  if (options.variant) {
    progress.setAttribute('variant', options.variant);
  }
  if (options.progress !== undefined) {
    if (options.progress === null) {
      progress.progress = undefined;
      progress.removeAttribute('progress');
      progress.style.removeProperty('--nami-top-progress-value');
    } else {
      progress.progress = options.progress;
      progress.setAttribute('progress', String(options.progress));
      progress.style.setProperty('--nami-top-progress-value', `${Math.min(100, Math.max(0, options.progress))}%`);
    }
  }
}

function setPageTransition(active: boolean, options: PageTransitionOptions = {}) {
  const transition = readPageTransition();
  if (!transition) return;
  const settings = readDocsSettings();
  transition.style.setProperty('--nami-transition-progress-height', `${settings.transition.barHeight}px`);
  if (options.appearance) {
    transition.appearance = options.appearance;
    transition.setAttribute('appearance', options.appearance);
  }
  if (options.duration !== undefined) {
    transition.setAttribute('duration', String(options.duration));
  }

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

function setTopProgress(active: boolean, options: TopProgressOptions = {}) {
  const progress = readTopProgress();
  if (!progress) return;
  applyTopProgressElementSettings(progress);
  syncTopProgressOptions(progress, options);
  if (active && progress.show) {
    syncFallbackActive(progress, true);
    progress.show(options);
    return;
  }
  if (!active && progress.hide) {
    void progress.hide(options);
    return;
  }
  syncFallbackActive(progress, active);
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

let routeProgressTimer = 0;
let routeHideTimer = 0;
let routeActive = false;
let routeStartedAt = 0;
let initialRevealApplied = false;
let readyToken = 0;

async function hideWhenReady() {
  const token = ++readyToken;
  const settings = readDocsSettings();
  if (settings.transition.firstLoadAppearance !== 'none' && !routeActive && !initialRevealApplied) {
    initialRevealApplied = true;
    setPageTransition(true, { appearance: settings.transition.firstLoadAppearance === 'panel' ? 'panel' : 'veil' });
  }
  await waitForPageReady();
  if (token === readyToken) {
    document.documentElement.dataset.namiReady = 'true';
    if (routeActive) return;
    setPageTransition(false);
  }
}

document.addEventListener('astro:before-preparation', () => {
  const settings = readDocsSettings();
  if (!settings.transition.routeBar) {
    routeActive = false;
    setTopProgress(false, { progress: null });
    return;
  }
  window.clearTimeout(routeProgressTimer);
  window.clearTimeout(routeHideTimer);
  routeActive = true;
  routeStartedAt = performance.now();
  document.documentElement.dataset.namiReady = 'false';
  setTopProgress(true, { progress: 12, duration: settings.transition.progressDuration, height: settings.transition.barHeight });
  routeProgressTimer = window.setTimeout(() => {
    setTopProgress(true, { progress: 62, duration: settings.transition.progressDuration, height: settings.transition.barHeight });
  }, 120);
});

document.addEventListener('astro:after-preparation', () => {
  const settings = readDocsSettings();
  if (!settings.transition.routeBar) return;
  window.clearTimeout(routeProgressTimer);
  const elapsed = performance.now() - routeStartedAt;
  const hideDelay = Math.max(180, routeMinimumMs - elapsed);
  setTopProgress(true, { progress: 100, duration: settings.transition.progressDuration, height: settings.transition.barHeight });
  routeHideTimer = window.setTimeout(() => {
    routeActive = false;
    setTopProgress(false, { progress: null, duration: routeExitMs, height: settings.transition.barHeight });
  }, hideDelay);
});

document.addEventListener('astro:after-swap', () => {
  void hideWhenReady();
});

document.addEventListener('astro:page-load', () => {
  void hideWhenReady();
});

window.addEventListener('nami-docs-settings-change', () => {
  const progress = readTopProgress();
  if (progress) applyTopProgressElementSettings(progress);
});

void hideWhenReady();
