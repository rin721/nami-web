import '@rin-labs/themes/default.css';
import '@rin-labs/themes/ant-illustration.css';
import '@rin-labs/ui/register';
import { RlToast, rlComponentMetadata } from '@rin-labs/ui';
import './styles.css';

const theme = document.querySelector('rl-theme');
const drawer = document.querySelector('rl-drawer');
const componentDocs = document.querySelector('#component-docs');

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderList(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'none';
}

componentDocs?.replaceChildren(
  ...rlComponentMetadata.map((item) => {
    const article = document.createElement('article');
    article.className = 'component-entry';
    article.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <pre><code>${escapeHtml(item.usage)}</code></pre>
      <dl>
        <dt>Attributes</dt><dd>${renderList(item.attributes)}</dd>
        <dt>Properties</dt><dd>${renderList(item.properties)}</dd>
        <dt>Events</dt><dd>${renderList(item.events)}</dd>
        <dt>Slots</dt><dd>${renderList(item.slots)}</dd>
        <dt>Parts</dt><dd>${renderList(item.parts)}</dd>
        <dt>CSS custom properties</dt><dd>${renderList(item.tokens)}</dd>
      </dl>
    `;
    return article;
  })
);

document.querySelector('#docs-open-theme')?.addEventListener('click', () => {
  if (drawer) drawer.open = true;
});

document.querySelector('#docs-toggle-theme')?.addEventListener('rl-click', () => {
  if (!theme) return;
  theme.theme = theme.theme === 'dark' ? 'light' : 'dark';
});

document.querySelector('#docs-show-toast')?.addEventListener('rl-click', () => {
  RlToast.show({ message: 'Docs theme tokens are active.', variant: 'success' });
});

document.querySelector('#docs-theme-mode')?.addEventListener('rl-change', (event) => {
  if (!theme) return;
  const value = (event as CustomEvent<{ value: 'light' | 'dark' }>).detail.value;
  theme.theme = value ?? 'light';
});

document.querySelectorAll<HTMLButtonElement>('[data-accent]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!theme) return;
    theme.accent = button.dataset.accent ?? '#3b82f6';
  });
});

const compactControl = document.querySelector('rl-chip#docs-compact') as (HTMLElement & { selected: boolean }) | null;
const motionControl = document.querySelector('rl-switch#docs-reduced-motion') as (HTMLElement & { checked: boolean }) | null;
const styleControl = document.querySelector('rl-chip#docs-illustration-style') as (HTMLElement & { selected: boolean }) | null;
let compactChanged = false;
let motionChanged = false;
let styleChanged = false;

function syncCompactDensity(selected: boolean) {
  if (!theme || !compactControl) return;
  compactControl.selected = selected;
  theme.density = selected ? 'compact' : 'comfortable';
}

function syncMotion(checked: boolean) {
  if (!theme || !motionControl) return;
  motionControl.checked = checked;
  theme.motion = checked ? 'reduced' : 'normal';
}

function syncStylePreset(selected: boolean) {
  if (!theme || !styleControl) return;
  styleControl.selected = selected;
  theme.stylePreset = selected ? 'illustration' : 'default';
}

compactControl?.addEventListener('rl-change', (event) => {
  compactChanged = true;
  const selected = Boolean((event as CustomEvent<{ selected: boolean }>).detail.selected);
  syncCompactDensity(selected);
});

compactControl?.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (!compactChanged) syncCompactDensity(!compactControl.selected);
    compactChanged = false;
  });
});

motionControl?.addEventListener('rl-change', (event) => {
  motionChanged = true;
  const checked = Boolean((event as CustomEvent<{ checked: boolean }>).detail.checked);
  syncMotion(checked);
});

motionControl?.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (!motionChanged) syncMotion(!motionControl.checked);
    motionChanged = false;
  });
});

styleControl?.addEventListener('rl-change', (event) => {
  styleChanged = true;
  const selected = Boolean((event as CustomEvent<{ selected: boolean }>).detail.selected);
  syncStylePreset(selected);
});

styleControl?.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (!styleChanged) syncStylePreset(!styleControl.selected);
    styleChanged = false;
  });
});
