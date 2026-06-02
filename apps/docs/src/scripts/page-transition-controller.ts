type TransitionAppearance = 'bar' | 'veil' | 'panel';
type TransitionOptions = { appearance?: TransitionAppearance; duration?: number; progress?: number | null };

type NamiPageTransitionElement = HTMLElement & {
  active?: boolean;
  appearance?: TransitionAppearance;
  progress?: number;
  show?: (options?: TransitionOptions) => void;
  hide?: (options?: TransitionOptions) => Promise<void>;
};

const requiredElements = ['nami-config', 'nami-theme', 'nami-app-shell', 'nami-page-transition', 'nami-button', 'nami-card'];

function readTransition() {
  return document.querySelector('#docs-page-transition') as NamiPageTransitionElement | null;
}

let routeProgressTimer = 0;
let routeHideTimer = 0;

function syncTransitionOptions(transition: NamiPageTransitionElement, options: TransitionOptions) {
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
  await waitForPageReady();
  if (token === readyToken) {
    document.documentElement.dataset.namiReady = 'true';
    setTransition(false, { progress: null });
  }
}

document.addEventListener('astro:before-preparation', () => {
  window.clearTimeout(routeProgressTimer);
  window.clearTimeout(routeHideTimer);
  document.documentElement.dataset.namiReady = 'false';
  setTransition(true, { appearance: 'bar', progress: 18 });
  routeProgressTimer = window.setTimeout(() => {
    setTransition(true, { appearance: 'bar', progress: 58 });
  }, 120);
});

document.addEventListener('astro:after-preparation', () => {
  window.clearTimeout(routeProgressTimer);
  setTransition(true, { appearance: 'bar', progress: 92 });
  routeHideTimer = window.setTimeout(() => {
    setTransition(false, { appearance: 'bar', progress: null });
  }, 90);
});

document.addEventListener('astro:after-swap', () => {
  void hideWhenReady();
});

document.addEventListener('astro:page-load', () => {
  void hideWhenReady();
});

void hideWhenReady();
