import { describe, expect, it } from 'vitest';
import './register';
import type { RlButton } from './components/button';
import type { RlChip } from './components/chip';
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
    card.addEventListener('rl-change', (event) => {
      cardDetail = (event as CustomEvent).detail;
    });
    tabs.addEventListener('rl-change', (event) => {
      tabChanges.push((event as CustomEvent).detail);
    });

    card.shadowRoot?.querySelector('button')?.click();
    secondTab.click();
    secondTab.click();

    expect(card.selected).toBe(true);
    expect(cardDetail).toMatchObject({ selected: true, value: 'blue' });
    expect(tabs.value).toBe('Tokens');
    expect(tabChanges).toHaveLength(1);
    expect(tabChanges[0]).toMatchObject({ value: 'Tokens' });

    card.remove();
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

  it('publishes metadata for all registered public components', () => {
    const names = rlComponentMetadata.map((item) => item.name);
    expect(names).toContain('rl-illustration');
    expect(names).toContain('rl-empty');
    expect(names).toContain('rl-result');
    expect(rlComponentMetadata.every((item) => item.usage && item.parts)).toBe(true);
  });
});
