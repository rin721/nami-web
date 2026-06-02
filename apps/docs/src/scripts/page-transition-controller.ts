type NamiPageTransitionElement = HTMLElement & {
  active?: boolean;
  appearance?: 'bar' | 'veil' | 'panel';
  show?: (options?: { appearance?: 'bar' | 'veil' | 'panel'; duration?: number }) => void;
  hide?: (options?: { appearance?: 'bar' | 'veil' | 'panel'; duration?: number }) => Promise<void>;
};

const requiredElements = ['nami-config', 'nami-theme', 'nami-app-shell', 'nami-page-transition', 'nami-button', 'nami-card'];

function readTransition() {
  return document.querySelector('#docs-page-transition') as NamiPageTransitionElement | null;
}

function setTransition(active: boolean, options: { appearance?: 'bar' | 'veil' | 'panel'; duration?: number } = {}) {
  const transition = readTransition();
  if (!transition) return;
  if (active && transition.show) {
    transition.show(options);
    return;
  }
  if (!active && transition.hide) {
    void transition.hide(options);
    return;
  }
  if (options.appearance) {
    transition.appearance = options.appearance;
    transition.setAttribute('appearance', options.appearance);
  }
  if (active) {
    transition.active = true;
    transition.setAttribute('active', '');
  } else {
    transition.active = false;
    transition.removeAttribute('active');
  }
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
  if (token === readyToken) setTransition(false);
}

document.addEventListener('astro:before-preparation', () => {
  setTransition(true, { appearance: 'bar' });
});

document.addEventListener('astro:after-preparation', () => {
  setTransition(false, { appearance: 'bar' });
});

document.addEventListener('astro:after-swap', () => {
  void hideWhenReady();
});

document.addEventListener('astro:page-load', () => {
  void hideWhenReady();
});

void hideWhenReady();
