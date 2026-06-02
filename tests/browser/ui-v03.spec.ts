import { expect, test, type Page } from '@playwright/test';

const docsUrl = 'http://127.0.0.1:5173/';

function captureConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('docs website renders markdown tutorials, live demos, and generated API', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(docsUrl);
  await expect(page.getByRole('heading', { name: 'Markdown tutorials for a token-driven Web Components library.' })).toBeVisible();
  await expect(page.locator('#doc-index')).toContainText('Getting Started');
  await expect(page.locator('#doc-index')).toContainText('Quality');
  await expect(page.locator('#markdown-docs')).toContainText('Rendered from Markdown');
  await expect(page.locator('#doc-getting-started')).toContainText('Register all components');
  await expect(page.locator('#doc-theme')).toContainText('Token Layers');
  await expect(page.locator('#doc-frameworks')).toContainText('Vue');
  await expect(page.locator('#component-docs')).toContainText('rl-empty');
  await expect(page.locator('#component-docs')).toContainText('rl-result');

  const markdownState = await page.evaluate(async () => {
    await customElements.whenDefined('rl-button');
    await customElements.whenDefined('rl-chip');
    const liveExamples = Array.from(document.querySelectorAll<HTMLElement>('[data-live-example]'));
    const firstPreview = liveExamples[0]?.querySelector('.live-preview');
    const firstButton = firstPreview?.querySelector('rl-button');
    const firstChip = firstPreview?.querySelector('rl-chip');
    return {
      liveCount: liveExamples.length,
      buttonDefined: Boolean(firstButton?.shadowRoot?.querySelector('button')),
      chipDefined: Boolean(firstChip?.shadowRoot?.querySelector('button')),
      hasOrdinaryCode: Boolean(document.querySelector('#doc-style-presets pre code.language-html'))
    };
  });

  expect(markdownState.liveCount).toBeGreaterThanOrEqual(5);
  expect(markdownState.buttonDefined).toBe(true);
  expect(markdownState.chipDefined).toBe(true);
  expect(markdownState.hasOrdinaryCode).toBe(true);
  expect(errors).toEqual([]);
});

test('docs app shell is responsive and theme controls update the root contract', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(docsUrl);
  const defaultStyle = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    const button = document.querySelector('.hero-preview rl-button');
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

  await page.getByRole('button', { name: 'Theme controls' }).click();
  await expect(page.locator('#docs-theme-drawer')).toHaveAttribute('open', '');
  await page.locator('#drawer-theme-mode button[value="dark"]').click();
  await page.locator('#docs-theme-drawer button[data-accent="#14b8a6"]').click();
  await page.locator('#drawer-compact').click();
  await page.locator('#drawer-reduced-motion').click();
  await page.locator('#drawer-illustration-style').click();

  const themeState = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    const button = document.querySelector('.hero-preview rl-button');
    const control = button?.shadowRoot?.querySelector('button');
    const shell = document.querySelector('rl-app-shell')?.shadowRoot?.querySelector('.shell');
    return {
      theme: theme?.getAttribute('theme'),
      accent: theme?.getAttribute('accent'),
      density: theme?.getAttribute('density'),
      motion: theme?.getAttribute('motion'),
      stylePreset: theme?.getAttribute('style-preset'),
      dataStyle: theme?.getAttribute('data-rl-style'),
      accentVar: theme ? getComputedStyle(theme).getPropertyValue('--rl-accent-50').trim() : '',
      borderWidth: control ? getComputedStyle(control).borderTopWidth : '',
      transition: control ? getComputedStyle(control).transitionDuration : '',
      pattern: shell ? getComputedStyle(shell).backgroundImage : ''
    };
  });

  expect(themeState.theme).toBe('dark');
  expect(themeState.accent).toBe('#14b8a6');
  expect(themeState.density).toBe('compact');
  expect(themeState.motion).toBe('reduced');
  expect(themeState.stylePreset).toBe('illustration');
  expect(themeState.dataStyle).toBe('illustration');
  expect(themeState.accentVar).toBe('#14b8a6');
  expect(themeState.borderWidth).toBe('3px');
  expect(themeState.transition).toContain('0.001s');
  expect(themeState.pattern).not.toBe('none');
  expect(errors).toEqual([]);
});

test('theme contract matrix covers dark illustration, density, motion, and component tokens', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(docsUrl);
  const matrixState = await page.evaluate(async () => {
    await Promise.all([
      customElements.whenDefined('rl-theme'),
      customElements.whenDefined('rl-button'),
      customElements.whenDefined('rl-chip'),
      customElements.whenDefined('rl-switch'),
      customElements.whenDefined('rl-radio-card'),
      customElements.whenDefined('rl-spinner')
    ]);

    const theme = document.querySelector('rl-theme') as HTMLElement & {
      accent: string;
      density: string;
      motion: string;
      updateComplete: Promise<unknown>;
    };
    const stages = Array.from(document.querySelectorAll<HTMLElement>('[data-contract-stage]'));

    const waitForTheme = async () => {
      await theme.updateComplete;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    };

    const readStage = (stage: HTMLElement) => {
      const style = getComputedStyle(stage);
      const button = stage.querySelector('rl-button:not([loading])')!;
      const buttonControl = button.shadowRoot!.querySelector('button')!;
      const chip = stage.querySelector('rl-chip[selected]')!;
      const chipControl = chip.shadowRoot!.querySelector('button')!;
      const track = stage.querySelector('rl-switch')!.shadowRoot!.querySelector('.track')!;
      const radioControl = stage.querySelector('rl-radio-card')!.shadowRoot!.querySelector('button')!;
      const spinnerHost = stage.querySelector('rl-button[loading]')!.shadowRoot!.querySelector('rl-spinner')!;
      const spinnerIndicator = spinnerHost.shadowRoot!.querySelector('.indicator')!;

      return {
        name: stage.dataset.contractStage,
        accent: style.getPropertyValue('--rl-accent-50').trim(),
        primary: style.getPropertyValue('--rl-color-primary').trim(),
        surface: style.getPropertyValue('--rl-surface').trim(),
        text: style.getPropertyValue('--rl-text').trim(),
        pattern: getComputedStyle(stage).backgroundImage,
        borderWidth: getComputedStyle(buttonControl).borderTopWidth,
        buttonBg: getComputedStyle(buttonControl).backgroundColor,
        buttonHeight: getComputedStyle(buttonControl).height,
        buttonTransition: getComputedStyle(buttonControl).transitionDuration,
        chipBg: getComputedStyle(chipControl).backgroundColor,
        switchBg: getComputedStyle(track).backgroundColor,
        radioSelectedShadowToken: style.getPropertyValue('--rl-radio-card-selected-shadow').trim(),
        switchThumbShadowToken: style.getPropertyValue('--rl-switch-thumb-shadow').trim(),
        spinnerTrackToken: style.getPropertyValue('--rl-spinner-track-color').trim(),
        spinnerBorderColor: getComputedStyle(spinnerIndicator).borderLeftColor
      };
    };

    const readAccent = async (accent: string) => {
      theme.accent = accent;
      await waitForTheme();
      return Object.fromEntries(stages.map((stage) => [stage.dataset.contractStage, readStage(stage)]));
    };

    const blue = await readAccent('#3b82f6');
    const teal = await readAccent('#14b8a6');
    const violet = await readAccent('#8b5cf6');

    theme.density = 'compact';
    theme.motion = 'reduced';
    await waitForTheme();
    const compactReduced = Object.fromEntries(stages.map((stage) => [stage.dataset.contractStage, readStage(stage)]));

    return { blue, teal, violet, compactReduced };
  });

  for (const state of Object.values(matrixState.teal)) {
    expect(state.accent).toBe('#14b8a6');
    expect(state.primary).toBe('#14b8a6');
    expect(state.radioSelectedShadowToken).not.toBe('');
    expect(state.switchThumbShadowToken).not.toBe('');
    expect(state.spinnerTrackToken).not.toBe('');
    expect(state.spinnerBorderColor).not.toBe('');
  }

  expect(matrixState.teal['default-light'].surface).not.toBe(matrixState.teal['default-dark'].surface);
  expect(matrixState.teal['default-light'].text).not.toBe(matrixState.teal['default-dark'].text);
  expect(matrixState.teal['illustration-light'].surface).not.toBe(matrixState.teal['illustration-dark'].surface);
  expect(matrixState.teal['illustration-light'].text).not.toBe(matrixState.teal['illustration-dark'].text);
  expect(matrixState.teal['illustration-dark'].surface).not.toBe('#fffdf5');
  expect(matrixState.teal['illustration-dark'].text).not.toBe('#2f2f2f');

  expect(matrixState.teal['default-light'].borderWidth).toBe('1px');
  expect(matrixState.teal['illustration-light'].borderWidth).toBe('3px');
  expect(matrixState.teal['illustration-dark'].borderWidth).toBe('3px');
  expect(matrixState.teal['default-light'].pattern).toBe('none');
  expect(matrixState.teal['illustration-light'].pattern).not.toBe('none');
  expect(matrixState.teal['illustration-dark'].pattern).not.toBe('none');

  for (const name of Object.keys(matrixState.teal)) {
    expect(matrixState.blue[name].buttonBg).not.toBe(matrixState.teal[name].buttonBg);
    expect(matrixState.teal[name].buttonBg).not.toBe(matrixState.violet[name].buttonBg);
    expect(matrixState.blue[name].chipBg).not.toBe(matrixState.teal[name].chipBg);
    expect(matrixState.teal[name].switchBg).not.toBe(matrixState.violet[name].switchBg);
    expect(matrixState.compactReduced[name].buttonHeight).toBe('34px');
    expect(matrixState.compactReduced[name].buttonTransition).toContain('0.001s');
  }

  expect(errors).toEqual([]);
});

test('core controls support forms, keyboard navigation, and focus management', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(docsUrl);
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
