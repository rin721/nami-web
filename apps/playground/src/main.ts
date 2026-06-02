import '@nami/themes/default.css';
import '@nami/themes/ant-illustration.css';
import '@nami/ui/register';
import { NamiToast } from '@nami/ui';
import './styles.css';

const theme = document.querySelector('nami-theme');
const drawer = document.querySelector('nami-drawer');
const dialog = document.querySelector('nami-dialog');

function onComponentAction(selector: string, handler: () => void) {
  const element = document.querySelector(selector);
  element?.addEventListener('click', handler);
  element?.addEventListener('nami-click', handler);
}

onComponentAction('#toggle-theme', () => {
  if (!theme) return;
  theme.theme = theme.theme === 'dark' ? 'light' : 'dark';
});

onComponentAction('#notify', () => {
  NamiToast.show({ message: 'Accent-driven state tokens are active.', variant: 'success' });
});

onComponentAction('#open-drawer', () => {
  if (drawer) drawer.open = true;
});

onComponentAction('#open-drawer-mobile', () => {
  if (drawer) drawer.open = true;
});

document.querySelectorAll<HTMLButtonElement>('[data-accent]').forEach((button) => {
  button.addEventListener('click', () => {
    if (theme) {
      const accent = button.dataset.accent ?? '#3b82f6';
      theme.accent = accent;
      theme.setAttribute('accent', accent);
    }
    if (drawer) drawer.open = false;
    window.requestAnimationFrame(() => {
      if (!dialog) return;
      dialog.open = true;
      dialog.setAttribute('open', '');
    });
  });
});

document.querySelector('#close-dialog')?.addEventListener('click', () => {
  if (dialog) dialog.open = false;
});

const densityToggle = document.querySelector('nami-chip#density-toggle') as (HTMLElement & { selected: boolean }) | null;
const motionToggle = document.querySelector('nami-switch#motion-toggle') as (HTMLElement & { checked: boolean }) | null;
const styleToggle = document.querySelector('nami-chip#style-toggle') as (HTMLElement & { selected: boolean }) | null;
let densityChanged = false;
let motionChanged = false;
let styleChanged = false;

function syncDensity(selected: boolean) {
  if (!theme || !densityToggle) return;
  densityToggle.selected = selected;
  theme.density = selected ? 'compact' : 'comfortable';
}

function syncPlaygroundMotion(checked: boolean) {
  if (!theme || !motionToggle) return;
  motionToggle.checked = checked;
  theme.motion = checked ? 'reduced' : 'normal';
}

function syncPlaygroundStyle(selected: boolean) {
  if (!theme || !styleToggle) return;
  styleToggle.selected = selected;
  theme.stylePreset = selected ? 'illustration' : 'default';
}

densityToggle?.addEventListener('nami-change', (event) => {
  densityChanged = true;
  const selected = Boolean((event as CustomEvent<{ selected: boolean }>).detail.selected);
  syncDensity(selected);
});

densityToggle?.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (!densityChanged) syncDensity(!densityToggle.selected);
    densityChanged = false;
  });
});

motionToggle?.addEventListener('nami-change', (event) => {
  motionChanged = true;
  const checked = Boolean((event as CustomEvent<{ checked: boolean }>).detail.checked);
  syncPlaygroundMotion(checked);
});

motionToggle?.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (!motionChanged) syncPlaygroundMotion(!motionToggle.checked);
    motionChanged = false;
  });
});

styleToggle?.addEventListener('nami-change', (event) => {
  styleChanged = true;
  const selected = Boolean((event as CustomEvent<{ selected: boolean }>).detail.selected);
  syncPlaygroundStyle(selected);
});

styleToggle?.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (!styleChanged) syncPlaygroundStyle(!styleToggle.selected);
    styleChanged = false;
  });
});
