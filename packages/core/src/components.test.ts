import { describe, expect, it } from 'vitest';
import { componentTokens, seedTokens, semanticTokens } from '../../tokens/src/index';
import './register';
import type { RlBadge } from './components/badge';
import type { RlButton } from './components/button';
import type { RlCard } from './components/card';
import type { RlChip } from './components/chip';
import type { RlConfig } from './components/config';
import type { RlDialog } from './components/dialog';
import type { RlDrawer } from './components/drawer';
import type { RlEmpty } from './components/empty';
import type { RlIconButton } from './components/icon-button';
import type { RlIllustration } from './components/illustration';
import type { RlInput } from './components/input';
import type { RlRadioCard } from './components/radio-card';
import type { RlResult } from './components/result';
import type { RlSwitch } from './components/switch';
import type { RlTabBar } from './components/tab-bar';
import type { RlTheme } from './components/theme';
import type { RlToast } from './components/toast';
import { getLocale, setLocale } from './localize';
import { rlComponentMetadata } from './metadata';

describe('@rin-labs/ui components', () => {
  it('applies accent seed tokens through rl-theme', async () => {
    const theme = document.createElement('rl-theme') as RlTheme;
    theme.accent = '#22c55e';
    theme.stylePreset = 'illustration';
    document.body.append(theme);
    await theme.updateComplete;

    expect(theme.style.getPropertyValue('--rl-accent-50')).toBe('#22c55e');
    expect(theme.getAttribute('accent')).toBe('#22c55e');
    expect(theme.getAttribute('style-preset')).toBe('illustration');
    expect(theme.dataset.rlStyle).toBe('illustration');

    theme.remove();
  });

  it('maps ant illustration style preset alias to illustration data style', async () => {
    const theme = document.createElement('rl-theme') as RlTheme;
    theme.stylePreset = 'ant-illustration';
    document.body.append(theme);
    await theme.updateComplete;

    expect(theme.getAttribute('style-preset')).toBe('ant-illustration');
    expect(theme.dataset.rlStyle).toBe('illustration');

    theme.remove();
  });

  it('configures runtime locale and localizes fallback component text', async () => {
    await setLocale('en-US');
    const config = document.createElement('rl-config') as RlConfig;
    const empty = document.createElement('rl-empty') as RlEmpty;
    const spinner = document.createElement('rl-spinner');
    const result = document.createElement('rl-result') as RlResult;
    config.locale = 'zh-CN';
    const statusEvents: unknown[] = [];
    const changeEvents: unknown[] = [];
    const localeReady = new Promise<void>((resolve) => {
      window.addEventListener('lit-localize-status', ((event: CustomEvent) => {
        if (event.detail.status === 'ready' && event.detail.readyLocale === 'zh-CN') resolve();
      }) as EventListener);
    });
    config.addEventListener('rl-locale-status', (event) => statusEvents.push((event as CustomEvent).detail));
    config.addEventListener('rl-change', (event) => changeEvents.push((event as CustomEvent).detail));
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
    expect(empty.shadowRoot?.textContent).toContain('无数据');
    expect(spinner.shadowRoot?.querySelector('[role="status"]')?.getAttribute('aria-label')).toBe('加载中');
    expect(result.shadowRoot?.querySelector('section')?.getAttribute('aria-label')).toBe('结果');

    empty.description = 'No data';
    await empty.updateComplete;
    expect(empty.shadowRoot?.textContent).toContain('No data');

    config.remove();
    await setLocale('en-US');
  });

  it('reflects boolean public API attributes consistently', async () => {
    const chip = document.createElement('rl-chip') as RlChip;
    const input = document.createElement('rl-input') as RlInput;
    const dialog = document.createElement('rl-dialog') as RlDialog;
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
    const drawer = document.createElement('rl-drawer') as RlDrawer;
    document.body.append(drawer);
    await drawer.updateComplete;

    const events: string[] = [];
    drawer.addEventListener('rl-open', () => events.push('open'));
    drawer.addEventListener('rl-close', () => events.push('close'));

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

    const dialog = document.createElement('rl-dialog') as RlDialog;
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

  it('toggles chip state and emits rl-change', async () => {
    const chip = document.createElement('rl-chip') as RlChip;
    chip.checkbox = true;
    chip.value = 'tag';
    document.body.append(chip);
    await chip.updateComplete;

    let detail: unknown = null;
    chip.addEventListener('rl-change', (event) => {
      detail = (event as CustomEvent).detail;
    });

    chip.shadowRoot?.querySelector('button')?.click();
    await chip.updateComplete;

    expect(chip.selected).toBe(true);
    expect(detail).toMatchObject({ selected: true, value: 'tag' });

    chip.remove();
  });

  it('prevents button and icon button actions while loading', async () => {
    const button = document.createElement('rl-button') as RlButton;
    const iconButton = document.createElement('rl-icon-button') as RlIconButton;
    button.loading = true;
    iconButton.loading = true;
    document.body.append(button, iconButton);
    await button.updateComplete;
    await iconButton.updateComplete;

    let buttonClicks = 0;
    let iconClicks = 0;
    button.addEventListener('rl-click', () => buttonClicks += 1);
    iconButton.addEventListener('rl-click', () => iconClicks += 1);

    button.shadowRoot?.querySelector('button')?.click();
    iconButton.shadowRoot?.querySelector('button')?.click();

    expect(buttonClicks).toBe(0);
    expect(iconClicks).toBe(0);
    expect(button.shadowRoot?.querySelector('rl-spinner')).not.toBeNull();
    expect(iconButton.shadowRoot?.querySelector('rl-spinner')).not.toBeNull();

    button.remove();
    iconButton.remove();
  });

  it('keeps disabled controls from emitting changes', async () => {
    const chip = document.createElement('rl-chip') as RlChip;
    const toggle = document.createElement('rl-switch') as RlSwitch;
    chip.checkbox = true;
    chip.disabled = true;
    toggle.disabled = true;
    document.body.append(chip, toggle);
    await chip.updateComplete;
    await toggle.updateComplete;

    let changes = 0;
    chip.addEventListener('rl-change', () => changes += 1);
    toggle.addEventListener('rl-change', () => changes += 1);

    chip.shadowRoot?.querySelector('button')?.click();
    toggle.shadowRoot?.querySelector('button')?.click();

    expect(changes).toBe(0);
    expect(chip.selected).toBe(false);
    expect(toggle.checked).toBe(false);

    chip.remove();
    toggle.remove();
  });

  it('updates input error state and emits typed value changes', async () => {
    const input = document.createElement('rl-input') as RlInput;
    input.label = 'Search';
    input.error = 'Required';
    document.body.append(input);
    await input.updateComplete;

    let detail: unknown = null;
    input.addEventListener('rl-change', (event) => {
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
    const card = document.createElement('rl-radio-card') as RlRadioCard;
    const tabs = document.createElement('rl-tab-bar') as RlTabBar;
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
    card.addEventListener('rl-change', (event) => {
      cardChanges += 1;
      cardDetail = (event as CustomEvent).detail;
    });
    tabs.addEventListener('rl-change', (event) => {
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
    const tabs = document.createElement('rl-tab-bar') as RlTabBar;
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
    const toast = document.createElement('rl-toast') as RlToast;
    toast.duration = 0;
    document.body.append(toast);
    await toast.updateComplete;

    const events: string[] = [];
    toast.addEventListener('rl-open', () => events.push('open'));
    toast.addEventListener('rl-close', () => events.push('close'));

    toast.open = true;
    await toast.updateComplete;
    toast.close();
    await toast.updateComplete;

    expect(events).toEqual(['open', 'close']);

    toast.remove();
  });

  it('renders illustration components with reflected API state', async () => {
    const illustration = document.createElement('rl-illustration') as RlIllustration;
    const empty = document.createElement('rl-empty') as RlEmpty;
    const result = document.createElement('rl-result') as RlResult;
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
    expect(empty.shadowRoot?.querySelector('rl-illustration')?.getAttribute('name')).toBe('empty');
    expect(result.getAttribute('sub-title')).toBe('The route is missing');
    expect(result.shadowRoot?.querySelector('rl-illustration')?.getAttribute('name')).toBe('not-found');

    illustration.remove();
    empty.remove();
    result.remove();
  });

  it('renders card and badge with reflected variants, slots, and parts', async () => {
    const card = document.createElement('rl-card') as RlCard;
    const badge = document.createElement('rl-badge') as RlBadge;
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

  it('publishes metadata for all registered public components', () => {
    const names = rlComponentMetadata.map((item) => item.name);
    const tokenNames = new Set<string>([...seedTokens, ...semanticTokens, ...componentTokens]);
    expect(names).toEqual([
      'rl-config',
      'rl-theme',
      'rl-spinner',
      'rl-illustration',
      'rl-empty',
      'rl-result',
      'rl-card',
      'rl-badge',
      'rl-button',
      'rl-icon-button',
      'rl-chip',
      'rl-input',
      'rl-switch',
      'rl-radio-card',
      'rl-tab-bar',
      'rl-dialog',
      'rl-drawer',
      'rl-toast',
      'rl-app-shell'
    ]);
    expect(rlComponentMetadata.every((item) => item.usage && item.parts && customElements.get(item.name))).toBe(true);
    expect(rlComponentMetadata.flatMap((item) => item.tokens).every((token) => tokenNames.has(token))).toBe(true);
  });
});
