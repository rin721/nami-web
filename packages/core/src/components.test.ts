import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { componentTokens, seedTokens, semanticTokens } from '../../tokens/src/index';
import { namiComponentAnatomy } from './anatomy';
import './register';
import type { NamiBadge } from './components/badge';
import type { NamiButton } from './components/button';
import type { NamiCard } from './components/card';
import type { NamiChip } from './components/chip';
import type { NamiConfig } from './components/config';
import type { NamiDialog } from './components/dialog';
import type { NamiDrawer } from './components/drawer';
import type { NamiEmpty } from './components/empty';
import type { NamiIconButton } from './components/icon-button';
import type { NamiIllustration } from './components/illustration';
import type { NamiInput } from './components/input';
import type { NamiPageTransition } from './components/page-transition';
import type { NamiRadioCard } from './components/radio-card';
import type { NamiResult } from './components/result';
import type { NamiSwitch } from './components/switch';
import type { NamiTabBar } from './components/tab-bar';
import type { NamiTheme } from './components/theme';
import type { NamiToast } from './components/toast';
import type { NamiTopProgress } from './components/top-progress';
import { getLocale, setLocale } from './localize';
import { namiComponentMetadata } from './metadata';

describe('@nami/ui components', () => {
  it('applies accent seed tokens through nami-theme', async () => {
    const theme = document.createElement('nami-theme') as NamiTheme;
    theme.accent = '#22c55e';
    theme.stylePreset = 'illustration';
    document.body.append(theme);
    await theme.updateComplete;

    expect(theme.style.getPropertyValue('--nami-accent-50')).toBe('#22c55e');
    expect(theme.getAttribute('accent')).toBe('#22c55e');
    expect(theme.getAttribute('style-preset')).toBe('illustration');
    expect(theme.dataset.namiStyle).toBe('illustration');

    theme.remove();
  });

  it('reflects radius and contrast theme seeds', async () => {
    const theme = document.createElement('nami-theme') as NamiTheme;
    theme.radius = 'soft';
    theme.contrast = 'high';
    document.body.append(theme);
    await theme.updateComplete;

    expect(theme.getAttribute('radius')).toBe('soft');
    expect(theme.getAttribute('contrast')).toBe('high');
    expect(theme.dataset.namiRadius).toBe('soft');
    expect(theme.dataset.namiContrast).toBe('high');

    theme.remove();
  });

  it('maps ant illustration style preset alias to illustration data style', async () => {
    const theme = document.createElement('nami-theme') as NamiTheme;
    theme.stylePreset = 'ant-illustration';
    document.body.append(theme);
    await theme.updateComplete;

    expect(theme.getAttribute('style-preset')).toBe('ant-illustration');
    expect(theme.dataset.namiStyle).toBe('illustration');

    theme.remove();
  });

  it('configures runtime locale and localizes fallback component text', async () => {
    await setLocale('en-US');
    const config = document.createElement('nami-config') as NamiConfig;
    const empty = document.createElement('nami-empty') as NamiEmpty;
    const spinner = document.createElement('nami-spinner');
    const result = document.createElement('nami-result') as NamiResult;
    config.locale = 'zh-CN';
    const statusEvents: unknown[] = [];
    const changeEvents: unknown[] = [];
    const localeReady = new Promise<void>((resolve) => {
      window.addEventListener('lit-localize-status', ((event: CustomEvent) => {
        if (event.detail.status === 'ready' && event.detail.readyLocale === 'zh-CN') resolve();
      }) as EventListener);
    });
    config.addEventListener('nami-locale-status', (event) => statusEvents.push((event as CustomEvent).detail));
    config.addEventListener('nami-change', (event) => changeEvents.push((event as CustomEvent).detail));
    config.append(empty, spinner, result);
    document.body.append(config);
    await config.updateComplete;
    await localeReady;
    await Promise.resolve();
    await empty.updateComplete;
    await (spinner as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
    await result.updateComplete;

    expect(getLocale()).toBe('zh-CN');
    expect(statusEvents).toContainEqual({ status: 'ready', readyLocale: 'zh-CN' });
    expect(changeEvents.at(-1)).toMatchObject({ value: 'zh-CN', locale: 'zh-CN', dir: 'ltr' });
    expect(empty.shadowRoot?.textContent).toContain('暂无数据');
    expect(spinner.shadowRoot?.querySelector('[role="status"]')?.getAttribute('aria-label')).toBe('加载中');
    expect(result.shadowRoot?.querySelector('section')?.getAttribute('aria-label')).toBe('结果');

    empty.description = 'No data';
    await empty.updateComplete;
    expect(empty.shadowRoot?.textContent).toContain('No data');

    config.remove();
    await setLocale('en-US');
  });

  it('reflects boolean public API attributes consistently', async () => {
    const chip = document.createElement('nami-chip') as NamiChip;
    const input = document.createElement('nami-input') as NamiInput;
    const dialog = document.createElement('nami-dialog') as NamiDialog;
    document.body.append(chip, input, dialog);

    chip.checkbox = true;
    input.required = true;
    dialog.closeOnBackdrop = false;
    await chip.updateComplete;
    await input.updateComplete;
    await dialog.updateComplete;

    expect(chip.hasAttribute('checkbox')).toBe(true);
    expect(input.hasAttribute('required')).toBe(true);
    expect(dialog.hasAttribute('close-on-backdrop')).toBe(false);

    dialog.closeOnBackdrop = true;
    await dialog.updateComplete;
    expect(dialog.hasAttribute('close-on-backdrop')).toBe(true);

    chip.remove();
    input.remove();
    dialog.remove();
  });

  it('reflects drawer open state through property and attribute', async () => {
    const drawer = document.createElement('nami-drawer') as NamiDrawer;
    document.body.append(drawer);
    await drawer.updateComplete;

    const events: string[] = [];
    drawer.addEventListener('nami-open', () => events.push('open'));
    drawer.addEventListener('nami-close', () => events.push('close'));

    drawer.open = true;
    await drawer.updateComplete;

    expect(drawer.open).toBe(true);
    expect(drawer.hasAttribute('open')).toBe(true);
    expect(drawer.shadowRoot?.querySelector('aside')?.getAttribute('aria-hidden')).toBe('false');

    drawer.open = false;
    await drawer.updateComplete;

    expect(drawer.open).toBe(false);
    expect(drawer.hasAttribute('open')).toBe(false);
    expect(events).toEqual(['open', 'close']);

    drawer.remove();
  });

  it('reflects dialog open state without losing the public property', async () => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function close() {
      this.open = false;
    };

    const dialog = document.createElement('nami-dialog') as NamiDialog;
    document.body.append(dialog);
    await dialog.updateComplete;

    dialog.open = true;
    await dialog.updateComplete;

    const nativeDialog = dialog.shadowRoot?.querySelector('dialog');
    expect(dialog.open).toBe(true);
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(nativeDialog?.open).toBe(true);

    dialog.open = false;
    await dialog.updateComplete;

    expect(dialog.open).toBe(false);
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(nativeDialog?.open).toBe(false);

    dialog.remove();
  });

  it('toggles chip state and emits nami-change', async () => {
    const chip = document.createElement('nami-chip') as NamiChip;
    chip.checkbox = true;
    chip.value = 'tag';
    document.body.append(chip);
    await chip.updateComplete;

    let detail: unknown = null;
    chip.addEventListener('nami-change', (event) => {
      detail = (event as CustomEvent).detail;
    });

    chip.shadowRoot?.querySelector('button')?.click();
    await chip.updateComplete;

    expect(chip.selected).toBe(true);
    expect(detail).toMatchObject({ selected: true, value: 'tag' });

    chip.remove();
  });

  it('prevents button and icon button actions while loading', async () => {
    const button = document.createElement('nami-button') as NamiButton;
    const iconButton = document.createElement('nami-icon-button') as NamiIconButton;
    button.loading = true;
    iconButton.loading = true;
    document.body.append(button, iconButton);
    await button.updateComplete;
    await iconButton.updateComplete;

    let buttonClicks = 0;
    let iconClicks = 0;
    button.addEventListener('nami-click', () => buttonClicks += 1);
    iconButton.addEventListener('nami-click', () => iconClicks += 1);

    button.shadowRoot?.querySelector('button')?.click();
    iconButton.shadowRoot?.querySelector('button')?.click();

    expect(buttonClicks).toBe(0);
    expect(iconClicks).toBe(0);
    expect(button.shadowRoot?.querySelector('nami-spinner')).not.toBeNull();
    expect(iconButton.shadowRoot?.querySelector('nami-spinner')).not.toBeNull();

    button.remove();
    iconButton.remove();
  });

  it('keeps disabled controls from emitting changes', async () => {
    const chip = document.createElement('nami-chip') as NamiChip;
    const toggle = document.createElement('nami-switch') as NamiSwitch;
    chip.checkbox = true;
    chip.disabled = true;
    toggle.disabled = true;
    document.body.append(chip, toggle);
    await chip.updateComplete;
    await toggle.updateComplete;

    let changes = 0;
    chip.addEventListener('nami-change', () => changes += 1);
    toggle.addEventListener('nami-change', () => changes += 1);

    chip.shadowRoot?.querySelector('button')?.click();
    toggle.shadowRoot?.querySelector('button')?.click();

    expect(changes).toBe(0);
    expect(chip.selected).toBe(false);
    expect(toggle.checked).toBe(false);

    chip.remove();
    toggle.remove();
  });

  it('updates input error state and emits typed value changes', async () => {
    const input = document.createElement('nami-input') as NamiInput;
    input.label = 'Search';
    document.body.append(input);
    await input.updateComplete;

    expect(input.hasAttribute('error')).toBe(false);

    input.error = 'Required';
    await input.updateComplete;

    let detail: unknown = null;
    input.addEventListener('nami-change', (event) => {
      detail = (event as CustomEvent).detail;
    });

    const nativeInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    nativeInput.value = 'tokens';
    nativeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    nativeInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    await input.updateComplete;

    expect(input.hasAttribute('error')).toBe(true);
    expect(input.value).toBe('tokens');
    expect(detail).toMatchObject({ value: 'tokens' });

    input.remove();
  });

  it('selects radio cards and tab items with one change event', async () => {
    const card = document.createElement('nami-radio-card') as NamiRadioCard;
    const tabs = document.createElement('nami-tab-bar') as NamiTabBar;
    const firstTab = document.createElement('button');
    const secondTab = document.createElement('button');
    card.value = 'blue';
    firstTab.value = 'Overview';
    firstTab.textContent = 'Overview';
    secondTab.value = 'Tokens';
    secondTab.textContent = 'Tokens';
    tabs.append(firstTab, secondTab);
    document.body.append(card, tabs);
    await card.updateComplete;
    await tabs.updateComplete;

    const tabChanges: unknown[] = [];
    let cardDetail: unknown = null;
    let cardChanges = 0;
    card.addEventListener('nami-change', (event) => {
      cardChanges += 1;
      cardDetail = (event as CustomEvent).detail;
    });
    tabs.addEventListener('nami-change', (event) => {
      tabChanges.push((event as CustomEvent).detail);
    });

    card.shadowRoot?.querySelector('button')?.click();
    card.shadowRoot?.querySelector('button')?.click();
    secondTab.click();
    secondTab.click();

    expect(card.selected).toBe(true);
    expect(cardChanges).toBe(1);
    expect(cardDetail).toMatchObject({ selected: true, value: 'blue' });
    expect(tabs.value).toBe('Tokens');
    expect(tabChanges).toHaveLength(1);
    expect(tabChanges[0]).toMatchObject({ value: 'Tokens' });

    card.remove();
    tabs.remove();
  });

  it('skips disabled tab items during keyboard navigation', async () => {
    const tabs = document.createElement('nami-tab-bar') as NamiTabBar;
    const firstTab = document.createElement('button');
    const secondTab = document.createElement('button');
    const thirdTab = document.createElement('button');
    firstTab.value = 'One';
    firstTab.textContent = 'One';
    secondTab.value = 'Two';
    secondTab.textContent = 'Two';
    secondTab.disabled = true;
    thirdTab.value = 'Three';
    thirdTab.textContent = 'Three';
    tabs.append(firstTab, secondTab, thirdTab);
    document.body.append(tabs);
    await tabs.updateComplete;

    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await tabs.updateComplete;

    expect(secondTab.getAttribute('aria-disabled')).toBe('true');
    expect(secondTab.getAttribute('tabindex')).toBe('-1');
    expect(tabs.value).toBe('Three');
    expect(thirdTab.getAttribute('aria-selected')).toBe('true');

    tabs.remove();
  });

  it('emits toast open and close state changes', async () => {
    const toast = document.createElement('nami-toast') as NamiToast;
    toast.duration = 0;
    document.body.append(toast);
    await toast.updateComplete;

    const events: string[] = [];
    toast.addEventListener('nami-open', () => events.push('open'));
    toast.addEventListener('nami-close', () => events.push('close'));

    toast.open = true;
    await toast.updateComplete;
    toast.close();
    await toast.updateComplete;

    expect(events).toEqual(['open', 'close']);

    toast.remove();
  });

  it('renders illustration components with reflected API state', async () => {
    const illustration = document.createElement('nami-illustration') as NamiIllustration;
    const empty = document.createElement('nami-empty') as NamiEmpty;
    const result = document.createElement('nami-result') as NamiResult;
    illustration.name = 'search';
    illustration.size = 'lg';
    empty.title = 'No results';
    empty.description = 'Try another keyword';
    result.status = '404';
    result.title = 'Not found';
    result.subTitle = 'The route is missing';
    document.body.append(illustration, empty, result);
    await illustration.updateComplete;
    await empty.updateComplete;
    await result.updateComplete;

    expect(illustration.getAttribute('name')).toBe('search');
    expect(illustration.shadowRoot?.querySelector('svg')).not.toBeNull();
    expect(empty.shadowRoot?.querySelector('nami-illustration')?.getAttribute('name')).toBe('empty');
    expect(result.getAttribute('sub-title')).toBe('The route is missing');
    expect(result.shadowRoot?.querySelector('nami-illustration')?.getAttribute('name')).toBe('not-found');

    illustration.remove();
    empty.remove();
    result.remove();
  });

  it('renders card and badge with reflected variants, slots, and parts', async () => {
    const card = document.createElement('nami-card') as NamiCard;
    const badge = document.createElement('nami-badge') as NamiBadge;
    const header = document.createElement('h3');
    const action = document.createElement('button');
    header.slot = 'header';
    header.textContent = 'Card title';
    action.slot = 'actions';
    action.textContent = 'Action';
    card.variant = 'inset';
    badge.variant = 'primary';
    badge.tone = 'solid';
    badge.textContent = 'Stable';
    card.append(header, document.createTextNode('Card body'), action);
    document.body.append(card, badge);
    await card.updateComplete;
    await badge.updateComplete;

    expect(card.getAttribute('variant')).toBe('inset');
    expect(card.hasAttribute('has-header')).toBe(true);
    expect(card.hasAttribute('has-actions')).toBe(true);
    expect(card.shadowRoot?.querySelector('[part~="base"]')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('[part~="body"]')).not.toBeNull();
    expect(badge.getAttribute('variant')).toBe('primary');
    expect(badge.getAttribute('tone')).toBe('solid');
    expect(badge.shadowRoot?.querySelector('[part~="base"]')).not.toBeNull();

    card.remove();
    badge.remove();
  });

  it('renders page transition veil and panel appearances with hook methods, hidden default label, and localized aria', async () => {
    await setLocale('en-US');
    const transition = document.createElement('nami-page-transition') as NamiPageTransition;
    transition.active = true;
    transition.variant = 'inline';
    transition.tone = 'brand';
    transition.appearance = 'panel';
    transition.duration = 0;
    document.body.append(transition);
    await transition.updateComplete;

    expect(transition.hasAttribute('active')).toBe(true);
    expect(transition.getAttribute('variant')).toBe('inline');
    expect(transition.getAttribute('tone')).toBe('brand');
    expect(transition.getAttribute('appearance')).toBe('panel');
    expect(transition.getAttribute('duration')).toBe('0');
    expect(transition.shadowRoot?.querySelector('nami-spinner')).not.toBeNull();
    expect(transition.shadowRoot?.querySelector('[part~="base"]')?.getAttribute('aria-label')).toBe('Preparing interface');
    expect(transition.shadowRoot?.textContent).not.toContain('Loading');

    const icon = document.createElement('span');
    icon.slot = 'icon';
    icon.textContent = 'N';
    transition.append(icon);
    transition.append(document.createTextNode('Custom progress'));
    await transition.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await transition.updateComplete;

    const iconSlot = transition.shadowRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement;
    expect(iconSlot.assignedElements()).toHaveLength(1);
    expect(transition.shadowRoot?.querySelector('[part~="label"]')?.classList.contains('has-content')).toBe(true);

    transition.show({ appearance: 'veil', tone: 'brand' });
    await transition.updateComplete;
    expect(transition.getAttribute('appearance')).toBe('veil');
    expect(transition.shadowRoot?.querySelector('[part~="brand"]')).not.toBeNull();

    const result = await transition.waitFor(Promise.resolve('done'), { appearance: 'panel', duration: 0, minDuration: 0 });
    await transition.updateComplete;
    expect(result).toBe('done');
    expect(transition.getAttribute('appearance')).toBe('panel');
    expect(transition.hasAttribute('active')).toBe(false);
    expect(transition.shadowRoot?.querySelector('[part~="base"]')).toBeNull();

    await setLocale('zh-CN');
    transition.show({ appearance: 'panel', duration: 0 });
    await transition.updateComplete;
    expect(transition.shadowRoot?.querySelector('[part~="base"]')?.getAttribute('aria-label')).not.toBe('Preparing interface');

    await transition.hide({ duration: 0 });
    await transition.updateComplete;

    expect(transition.hasAttribute('active')).toBe(false);
    expect(transition.shadowRoot?.querySelector('[part~="base"]')).toBeNull();

    transition.remove();
    await setLocale('en-US');
  });

  it('renders top progress with determinate fill, hook methods, and reflected configuration', async () => {
    await setLocale('en-US');
    const progress = document.createElement('nami-top-progress') as NamiTopProgress;
    progress.active = true;
    progress.variant = 'inline';
    progress.progress = 64;
    progress.height = 16;
    progress.duration = 320;
    progress.effect = 'pulse';
    document.body.append(progress);
    await progress.updateComplete;

    expect(progress.hasAttribute('active')).toBe(true);
    expect(progress.getAttribute('variant')).toBe('inline');
    expect(progress.getAttribute('progress')).toBe('64');
    expect(progress.getAttribute('height')).toBe('16');
    expect(progress.getAttribute('duration')).toBe('320');
    expect(progress.getAttribute('effect')).toBe('pulse');
    expect(progress.style.getPropertyValue('--nami-top-progress-value')).toBe('64%');
    expect(progress.style.getPropertyValue('--nami-top-progress-height')).toBe('16px');
    expect(progress.style.getPropertyValue('--nami-top-progress-duration')).toBe('320ms');
    expect(progress.shadowRoot?.querySelector('[part~="track"]')?.getAttribute('aria-label')).toBe('Navigating');

    progress.show({ progress: 50, height: 10, duration: 180, effect: 'slide' });
    await progress.updateComplete;
    expect(progress.getAttribute('progress')).toBe('50');
    expect(progress.getAttribute('height')).toBe('10');
    expect(progress.getAttribute('duration')).toBe('180');
    expect(progress.getAttribute('effect')).toBe('slide');
    expect(progress.style.getPropertyValue('--nami-top-progress-value')).toBe('50%');
    expect(progress.style.getPropertyValue('--nami-top-progress-height')).toBe('10px');
    expect(progress.style.getPropertyValue('--nami-top-progress-duration')).toBe('180ms');

    progress.set(null);
    await progress.updateComplete;
    expect(progress.hasAttribute('progress')).toBe(false);
    expect(progress.style.getPropertyValue('--nami-top-progress-value')).toBe('');

    const result = await progress.waitFor(Promise.resolve('done'), { progress: 12, duration: 0, minDuration: 0 });
    await progress.updateComplete;
    expect(result).toBe('done');
    expect(progress.hasAttribute('active')).toBe(false);
    expect(progress.shadowRoot?.querySelector('[part~="base"]')).toBeNull();

    progress.remove();
  });

  it('publishes metadata for all registered public components', () => {
    const names = namiComponentMetadata.map((item) => item.name);
    const tokenNames = new Set<string>([...seedTokens, ...semanticTokens, ...componentTokens]);
    expect(names).toEqual([
      'nami-config',
      'nami-theme',
      'nami-spinner',
      'nami-page-transition',
      'nami-top-progress',
      'nami-illustration',
      'nami-empty',
      'nami-result',
      'nami-card',
      'nami-badge',
      'nami-button',
      'nami-icon-button',
      'nami-chip',
      'nami-input',
      'nami-switch',
      'nami-radio-card',
      'nami-tab-bar',
      'nami-dialog',
      'nami-drawer',
      'nami-toast',
      'nami-app-shell'
    ]);
    expect(namiComponentMetadata.every((item) => item.usage && item.parts && customElements.get(item.name))).toBe(true);
    expect(namiComponentMetadata.flatMap((item) => item.tokens).every((token) => tokenNames.has(token))).toBe(true);
    expect(namiComponentMetadata.every((item) => item.category && item.states.length > 0 && item.anatomy && item.styleHooks)).toBe(true);
    expect(namiComponentAnatomy).toHaveLength(namiComponentMetadata.length);
  });

  it('keeps declared CSS parts and seed-token boundaries honest', async () => {
    for (const item of namiComponentMetadata) {
      const element = document.createElement(item.name) as HTMLElement & { updateComplete?: Promise<unknown> };
      if (item.name === 'nami-empty') {
        (element as NamiEmpty).title = 'Empty';
        (element as NamiEmpty).description = 'No content';
      }
      if (item.name === 'nami-result') {
        (element as NamiResult).title = 'Done';
        (element as NamiResult).subTitle = 'Ready';
      }
      if (item.name === 'nami-input') {
        (element as NamiInput).label = 'Input';
        (element as NamiInput).helperText = 'Help';
      }
      if (item.name === 'nami-dialog') {
        (element as NamiDialog).label = 'Dialog';
      }
      if (item.name === 'nami-radio-card') {
        (element as NamiRadioCard).label = 'Radio';
        (element as NamiRadioCard).description = 'Description';
      }
      if (item.name === 'nami-button') {
        (element as NamiButton).loading = true;
      }
      if (item.name === 'nami-icon-button') {
        (element as NamiIconButton).loading = true;
      }
      if (item.name === 'nami-page-transition') {
        (element as NamiPageTransition).active = true;
        (element as NamiPageTransition).duration = 0;
      }
      if (item.name === 'nami-top-progress') {
        (element as NamiTopProgress).active = true;
        (element as NamiTopProgress).duration = 0;
        (element as NamiTopProgress).progress = 48;
      }
      document.body.append(element);
      await element.updateComplete;

      for (const part of item.parts) {
        let partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        if (!partElement && item.name === 'nami-button' && part === 'icon') {
          (element as NamiButton).loading = false;
          await element.updateComplete;
          partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        }
        if (!partElement && item.name === 'nami-button' && part === 'indicator') {
          (element as NamiButton).loading = true;
          await element.updateComplete;
          partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        }
        if (!partElement && item.name === 'nami-icon-button' && part === 'icon') {
          (element as NamiIconButton).loading = false;
          await element.updateComplete;
          partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        }
        if (!partElement && item.name === 'nami-icon-button' && part === 'indicator') {
          (element as NamiIconButton).loading = true;
          await element.updateComplete;
          partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        }
        if (!partElement && item.name === 'nami-input' && part === 'description') {
          (element as NamiInput).error = '';
          (element as NamiInput).helperText = 'Help';
          await element.updateComplete;
          partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        }
        if (!partElement && item.name === 'nami-input' && part === 'error') {
          (element as NamiInput).error = 'Error';
          await element.updateComplete;
          partElement = element.shadowRoot?.querySelector(`[part~="${part}"]`);
        }
        expect(partElement, `${item.name} should expose part="${part}"`).not.toBeNull();
      }

      element.remove();
    }

    const componentDir = join(process.cwd(), 'src', 'components');
    const componentFiles = readdirSync(componentDir).filter((file) => file.endsWith('.ts') && file !== 'theme.ts');
    for (const file of componentFiles) {
      const source = readFileSync(join(componentDir, file), 'utf8');
      expect(source, `${file} must not consume accent seed scale directly`).not.toMatch(/--nami-accent-(?:5|10|20|30|40|50|60|70|80|90)\b/);
    }
  });
});
