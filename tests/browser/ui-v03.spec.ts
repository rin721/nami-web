import { expect, test } from '@playwright/test';

test('playground renders core controls and responsive style presets', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('http://127.0.0.1:5173/');
  await expect(page.getByRole('heading', { name: 'Soft Controls' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ant Illustration States' })).toHaveCount(0);

  const defaultStyle = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    const button = document.querySelector('rl-button');
    const control = button?.shadowRoot?.querySelector('button');
    return {
      preset: theme?.getAttribute('style-preset'),
      dataStyle: theme?.getAttribute('data-rl-style'),
      borderWidth: control ? getComputedStyle(control).borderTopWidth : '',
      shadow: control ? getComputedStyle(control).boxShadow : ''
    };
  });
  expect(defaultStyle.preset).toBe('default');

  await page.setViewportSize({ width: 1280, height: 820 });
  const desktopShell = await page.evaluate(() => {
    const shell = document.querySelector('rl-app-shell')?.shadowRoot;
    return {
      rail: getComputedStyle(shell?.querySelector('.rail') as Element).display,
      top: getComputedStyle(shell?.querySelector('.top') as Element).display,
      bottom: getComputedStyle(shell?.querySelector('.bottom') as Element).display
    };
  });
  expect(desktopShell).toEqual({ rail: 'flex', top: 'none', bottom: 'none' });

  await page.setViewportSize({ width: 600, height: 820 });
  const mobileShell = await page.evaluate(() => {
    const shell = document.querySelector('rl-app-shell')?.shadowRoot;
    return {
      rail: getComputedStyle(shell?.querySelector('.rail') as Element).display,
      top: getComputedStyle(shell?.querySelector('.top') as Element).display,
      bottom: getComputedStyle(shell?.querySelector('.bottom') as Element).display
    };
  });
  expect(mobileShell).toEqual({ rail: 'none', top: 'block', bottom: 'block' });

  await page.locator('#open-drawer-mobile').click();
  await expect(page.locator('#drawer')).toHaveAttribute('open', '');
  await page.getByRole('checkbox', { name: 'Illustration style' }).click();
  const illustrationStyle = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    const button = document.querySelector('rl-button');
    const control = button?.shadowRoot?.querySelector('button');
    const shell = document.querySelector('rl-app-shell')?.shadowRoot?.querySelector('.shell');
    return {
      preset: theme?.getAttribute('style-preset'),
      dataStyle: theme?.getAttribute('data-rl-style'),
      borderWidth: control ? getComputedStyle(control).borderTopWidth : '',
      shadow: control ? getComputedStyle(control).boxShadow : '',
      backgroundImage: shell ? getComputedStyle(shell).backgroundImage : ''
    };
  });
  expect(illustrationStyle.preset).toBe('illustration');
  expect(illustrationStyle.dataStyle).toBe('illustration');
  expect(illustrationStyle.borderWidth).toBe('3px');
  expect(illustrationStyle.shadow).not.toBe(defaultStyle.shadow);
  expect(illustrationStyle.backgroundImage).not.toBe('none');
  expect(errors).toEqual([]);
});

test('illustration style keeps accent-driven colors in sync', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('http://127.0.0.1:5173/');
  const syncState = await page.evaluate(async () => {
    await customElements.whenDefined('rl-theme');
    await customElements.whenDefined('rl-button');
    await customElements.whenDefined('rl-chip');
    const theme = document.querySelector('rl-theme') as HTMLElement & { accent: string; stylePreset: string; updateComplete: Promise<unknown> };
    const button = document.querySelector('.toolbar rl-button')!;
    const selectedChip = document.querySelector('.section-title rl-chip[selected]')!;
    const shell = document.querySelector('rl-app-shell')?.shadowRoot?.querySelector('.shell') as HTMLElement | null;

    const readState = () => {
      const themeStyle = getComputedStyle(theme);
      const buttonControl = button.shadowRoot!.querySelector('button')!;
      const chipControl = selectedChip.shadowRoot!.querySelector('button')!;
      return {
        accentAttr: theme.getAttribute('accent'),
        accentVar: themeStyle.getPropertyValue('--rl-accent-50').trim(),
        primaryVar: themeStyle.getPropertyValue('--rl-color-primary').trim(),
        buttonBg: getComputedStyle(buttonControl).backgroundColor,
        chipBg: getComputedStyle(chipControl).backgroundColor,
        borderWidth: getComputedStyle(buttonControl).borderTopWidth,
        shadow: getComputedStyle(buttonControl).boxShadow,
        pattern: shell ? getComputedStyle(shell).backgroundImage : ''
      };
    };

    theme.motion = 'reduced';
    theme.stylePreset = 'illustration';
    theme.accent = '#14b8a6';
    await theme.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 20));
    const teal = readState();

    theme.accent = '#8b5cf6';
    await theme.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 20));
    const violet = readState();

    return { teal, violet };
  });

  expect(syncState.teal.accentAttr).toBe('#14b8a6');
  expect(syncState.teal.accentVar).toBe('#14b8a6');
  expect(syncState.teal.primaryVar).toBe('#14b8a6');
  expect(syncState.violet.accentAttr).toBe('#8b5cf6');
  expect(syncState.violet.accentVar).toBe('#8b5cf6');
  expect(syncState.violet.primaryVar).toBe('#8b5cf6');
  expect(syncState.teal.buttonBg).not.toBe(syncState.violet.buttonBg);
  expect(syncState.teal.chipBg).not.toBe(syncState.violet.chipBg);
  expect(syncState.teal.borderWidth).toBe('3px');
  expect(syncState.violet.borderWidth).toBe('3px');
  expect(syncState.teal.shadow).not.toBe('none');
  expect(syncState.violet.shadow).not.toBe('none');
  expect(syncState.teal.pattern).not.toBe(syncState.violet.pattern);
  expect(errors).toEqual([]);
});

test('docs are driven by metadata and theme controls update tokens', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('#component-docs')).toContainText('rl-empty');
  await expect(page.locator('#component-docs')).toContainText('rl-result');
  await expect(page.locator('#style-presets')).toContainText('Same components, different skins');
  await expect(page.locator('.preset-stage').first()).toContainText('Default style');
  await expect(page.locator('.preset-stage.rl-theme-illustration')).toContainText('Illustration style');

  await page.getByRole('button', { name: 'Theme controls' }).click();
  await expect(page.locator('#docs-theme-drawer')).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'Teal' }).click();
  await page.getByRole('checkbox', { name: 'Compact density' }).click();
  await page.getByRole('switch', { name: 'Reduced motion' }).click();
  await page.getByRole('checkbox', { name: 'Illustration style' }).click();

  const themeState = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    return {
      accent: theme?.getAttribute('accent'),
      density: theme?.getAttribute('density'),
      motion: theme?.getAttribute('motion'),
      stylePreset: theme?.getAttribute('style-preset'),
      dataStyle: theme?.getAttribute('data-rl-style'),
      accentVar: theme ? getComputedStyle(theme).getPropertyValue('--rl-accent-50').trim() : ''
    };
  });
  expect(themeState).toEqual({
    accent: '#14b8a6',
    density: 'compact',
    motion: 'reduced',
    stylePreset: 'illustration',
    dataStyle: 'illustration',
    accentVar: '#14b8a6'
  });
  expect(errors).toEqual([]);
});

test('core controls support forms, keyboard navigation, and focus management', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('http://127.0.0.1:5173/');
  const formState = await page.evaluate(async () => {
    await Promise.all([
      customElements.whenDefined('rl-button'),
      customElements.whenDefined('rl-input'),
      customElements.whenDefined('rl-switch')
    ]);

    const fixture = document.createElement('div');
    fixture.innerHTML = `
      <form id="contract-form">
        <rl-input id="contract-input" name="query" label="Query" required default-value="seed"></rl-input>
        <rl-switch id="contract-switch" name="enabled" value="yes" checked>Enabled</rl-switch>
        <rl-button id="contract-submit" type="submit">Submit</rl-button>
        <rl-button id="contract-reset" type="reset">Reset</rl-button>
        <rl-button id="contract-cancel" type="submit">Cancel submit</rl-button>
      </form>
    `;
    document.body.append(fixture);

    const form = fixture.querySelector<HTMLFormElement>('#contract-form')!;
    const input = fixture.querySelector('rl-input') as HTMLElement & { value: string; updateComplete: Promise<unknown> };
    const submit = fixture.querySelector('#contract-submit') as HTMLElement;
    const reset = fixture.querySelector('#contract-reset') as HTMLElement;
    const cancel = fixture.querySelector('#contract-cancel') as HTMLElement;
    await Promise.all([
      input.updateComplete,
      (fixture.querySelector('rl-switch') as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete,
      (submit as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete,
      (reset as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete,
      (cancel as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete
    ]);

    let submitCount = 0;
    let submittedEntries: [string, FormDataEntryValue][] = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitCount += 1;
      submittedEntries = Array.from(new FormData(form).entries());
    });
    cancel.addEventListener('rl-click', (event) => event.preventDefault());

    const invalidBeforeValue = form.checkValidity();
    const nativeInput = input.shadowRoot!.querySelector('input')!;
    nativeInput.value = 'tokens';
    nativeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await input.updateComplete;
    const validAfterValue = form.checkValidity();

    submit.shadowRoot!.querySelector('button')!.click();
    cancel.shadowRoot!.querySelector('button')!.click();

    nativeInput.value = 'changed';
    nativeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await input.updateComplete;
    reset.shadowRoot!.querySelector('button')!.click();
    await input.updateComplete;

    return {
      invalidBeforeValue,
      validAfterValue,
      submitCount,
      submittedEntries,
      valueAfterReset: input.value
    };
  });

  expect(formState.invalidBeforeValue).toBe(false);
  expect(formState.validAfterValue).toBe(true);
  expect(formState.submitCount).toBe(1);
  expect(formState.submittedEntries).toEqual([
    ['query', 'tokens'],
    ['enabled', 'yes']
  ]);
  expect(formState.valueAfterReset).toBe('seed');

  const interactionState = await page.evaluate(async () => {
    await Promise.all([
      customElements.whenDefined('rl-dialog'),
      customElements.whenDefined('rl-drawer'),
      customElements.whenDefined('rl-tab-bar')
    ]);

    const fixture = document.createElement('div');
    fixture.innerHTML = `
      <button id="focus-opener">Open</button>
      <rl-dialog id="contract-dialog" label="Contract dialog">
        Dialog content
        <button slot="actions" id="dialog-action">Action</button>
      </rl-dialog>
      <rl-drawer id="contract-drawer">
        <h2 slot="label">Drawer</h2>
        <button id="drawer-action">Drawer action</button>
      </rl-drawer>
      <rl-tab-bar id="contract-tabs" value="One">
        <button value="One">One</button>
        <button value="Two" disabled>Two</button>
        <button value="Three">Three</button>
      </rl-tab-bar>
    `;
    document.body.append(fixture);
    const opener = fixture.querySelector<HTMLButtonElement>('#focus-opener')!;
    const dialog = fixture.querySelector('rl-dialog') as HTMLElement & { open: boolean; updateComplete: Promise<unknown>; shadowRoot: ShadowRoot };
    const drawer = fixture.querySelector('rl-drawer') as HTMLElement & { open: boolean; updateComplete: Promise<unknown>; shadowRoot: ShadowRoot };
    const tabs = fixture.querySelector('rl-tab-bar') as HTMLElement & { value: string; updateComplete: Promise<unknown> };
    await Promise.all([dialog.updateComplete, drawer.updateComplete, tabs.updateComplete]);

    dialog.open = true;
    await dialog.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const dialogInitialFocus = dialog.shadowRoot.activeElement?.classList.contains('close') ?? false;
    const dialogAction = fixture.querySelector<HTMLButtonElement>('#dialog-action')!;
    dialogAction.focus();
    dialogAction.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
    const dialogWrappedFocus = dialog.shadowRoot.activeElement?.classList.contains('close') ?? false;
    dialog.open = false;
    await dialog.updateComplete;

    opener.focus();
    drawer.open = true;
    await drawer.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const drawerActionFocused = document.activeElement?.id === 'drawer-action';
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await drawer.updateComplete;
    const drawerClosed = !drawer.open;
    const drawerFocusRestored = document.activeElement?.id === 'focus-opener';

    const firstTab = tabs.querySelector<HTMLButtonElement>('button[value="One"]')!;
    const secondTab = tabs.querySelector<HTMLButtonElement>('button[value="Two"]')!;
    const thirdTab = tabs.querySelector<HTMLButtonElement>('button[value="Three"]')!;
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await tabs.updateComplete;

    return {
      dialogInitialFocus,
      dialogWrappedFocus,
      drawerActionFocused,
      drawerClosed,
      drawerFocusRestored,
      disabledTabIndex: secondTab.getAttribute('tabindex'),
      selectedTab: tabs.value,
      thirdSelected: thirdTab.getAttribute('aria-selected')
    };
  });

  expect(interactionState).toEqual({
    dialogInitialFocus: true,
    dialogWrappedFocus: true,
    drawerActionFocused: true,
    drawerClosed: true,
    drawerFocusRestored: true,
    disabledTabIndex: '-1',
    selectedTab: 'Three',
    thirdSelected: 'true'
  });
  expect(errors).toEqual([]);
});
