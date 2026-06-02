import '@rin-labs/themes/default.css';
import '@rin-labs/themes/ant-illustration.css';
import '@rin-labs/ui/register';
import { RlToast } from '@rin-labs/ui';
import './styles.css';

const theme = document.querySelector('rl-theme');
const drawer = document.querySelector('rl-drawer');
const dialog = document.querySelector('rl-dialog');

function onComponentAction(selector: string, handler: () => void) {
  const element = document.querySelector(selector);
  element?.addEventListener('click', handler);
  element?.addEventListener('rl-click', handler);
}

onComponentAction('#toggle-theme', () => {
  if (!theme) return;
  theme.theme = theme.theme === 'dark' ? 'light' : 'dark';
});

onComponentAction('#notify', () => {
  RlToast.show({ message: 'Accent-driven state tokens are active.', variant: 'success' });
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

const densityToggle = document.querySelector('rl-chip#density-toggle') as (HTMLElement & { selected: boolean }) | null;
const motionToggle = document.querySelector('rl-switch#motion-toggle') as (HTMLElement & { checked: boolean }) | null;
const styleToggle = document.querySelector('rl-chip#style-toggle') as (HTMLElement & { selected: boolean }) | null;
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

densityToggle?.addEventListener('rl-change', (event) => {
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

motionToggle?.addEventListener('rl-change', (event) => {
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

styleToggle?.addEventListener('rl-change', (event) => {
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
