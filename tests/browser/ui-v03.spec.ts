import { expect, test, type Page } from '@playwright/test';

const docsUrl = 'http://127.0.0.1:5173/';

function captureConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('docs website uses routed onion architecture instead of a one-page dump', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(docsUrl);
  await expect(page.getByRole('heading', { name: 'Rin UI' })).toBeVisible();
  await expect(page.locator('[data-product-hero]')).toContainText('面向可换肤应用的 Web Components UI 组件库。');
  await expect(page.locator('rin-docs-router')).toBeVisible();
  await expect(page.locator('#component-docs')).toHaveCount(0);
  await expect(page.locator('#doc-getting-started')).toHaveCount(0);

  const homeState = await page.evaluate(async () => {
    await customElements.whenDefined('rl-card');
    await customElements.whenDefined('rl-badge');
    return {
      cardDefined: Boolean(document.querySelector('rl-card')?.shadowRoot?.querySelector('[part~="base"]')),
      badgeDefined: Boolean(document.querySelector('rl-badge')?.shadowRoot?.querySelector('[part~="base"]')),
      route: location.hash,
      locale: document.querySelector('rl-config')?.getAttribute('locale')
    };
  });
  expect(homeState.cardDefined).toBe(true);
  expect(homeState.badgeDefined).toBe(true);
  expect(homeState.route).toBe('#/zh-CN/');
  expect(homeState.locale).toBe('zh-CN');

  await page.goto(`${docsUrl}#/docs/getting-started`);
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#/zh-CN/docs/getting-started');
  await expect(page.locator('#doc-getting-started')).toContainText('注册全部组件');
  await expect(page.locator('#component-docs')).toHaveCount(0);
  const markdownState = await page.evaluate(async () => {
    await customElements.whenDefined('rl-button');
    const liveExamples = Array.from(document.querySelectorAll<HTMLElement>('[data-live-example]'));
    const firstButton = liveExamples[0]?.querySelector('.live-preview rl-button');
    return {
      liveCount: liveExamples.length,
      buttonDefined: Boolean(firstButton?.shadowRoot?.querySelector('button')),
      ordinaryCodeBlocks: document.querySelectorAll('rin-docs-code-block').length
    };
  });
  expect(markdownState.liveCount).toBe(1);
  expect(markdownState.buttonDefined).toBe(true);
  expect(markdownState.ordinaryCodeBlocks).toBeGreaterThanOrEqual(2);

  await page.goto(`${docsUrl}#/en-US/docs/getting-started`);
  await expect(page.locator('#doc-getting-started')).toContainText('Register all components');

  await page.goto(`${docsUrl}#/en-US/components`);
  await expect(page.locator('#component-docs')).toContainText('rl-button');
  await expect(page.locator('#component-docs')).toContainText('rl-card');
  await expect(page.locator('[data-component-card="rl-badge"]')).toContainText('Compact status label');

  await page.goto(`${docsUrl}#/en-US/components/button`);
  await expect(page.locator('#component-docs')).toContainText('Primary command button');
  await expect(page.locator('#component-docs')).toContainText('Attributes');
  await expect(page.locator('#component-docs')).toContainText('--rl-button-bg');

  await page.goto(`${docsUrl}#/zh-CN/components/button`);
  await expect(page.locator('#component-docs')).toContainText('主要命令按钮');

  await page.goto(`${docsUrl}#/en-US/tokens`);
  await expect(page.locator('rin-docs-tokens-page')).toContainText('Seed, semantic, component');

  await page.goto(`${docsUrl}#/zh-CN/missing/route`);
  await expect(page.locator('rin-docs-router')).toContainText('路由不存在');
  expect(errors).toEqual([]);
});

test('docs app shell is responsive and theme controls persist across routes', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(docsUrl);
  const defaultStyle = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    const button = document.querySelector('.component-wall rl-button');
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

  await page.locator('#docs-open-theme').click();
  await expect(page.locator('#docs-theme-drawer')).toHaveAttribute('open', '');
  await page.locator('#docs-theme-drawer [data-theme-mode] button[value="dark"]').click();
  await page.locator('#docs-theme-drawer button[data-accent="#14b8a6"]').click();
  await page.locator('#docs-theme-drawer [data-density-toggle]').click();
  await page.locator('#docs-theme-drawer [data-motion-toggle]').click();
  await page.locator('#docs-theme-drawer [data-style-toggle]').click();
  await page.locator('#docs-theme-drawer [data-locale-mode] button[value="en-US"]').click();

  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#/en-US/');
  await expect(page.locator('[data-product-hero]')).toContainText('Web Components UI library for themeable apps.');

  await page.evaluate(() => {
    location.hash = '/en-US/components/button';
  });
  await expect(page.locator('rin-docs-component-page')).toContainText('rl-button');

  const themeState = await page.evaluate(() => {
    const theme = document.querySelector('rl-theme');
    const config = document.querySelector('rl-config');
    const button = document.querySelector('rin-docs-component-page rl-button');
    const control = button?.shadowRoot?.querySelector('button');
    return {
      locale: config?.getAttribute('locale'),
      hash: location.hash,
      theme: theme?.getAttribute('theme'),
      accent: theme?.getAttribute('accent'),
      density: theme?.getAttribute('density'),
      motion: theme?.getAttribute('motion'),
      stylePreset: theme?.getAttribute('style-preset'),
      dataStyle: theme?.getAttribute('data-rl-style'),
      accentVar: theme ? getComputedStyle(theme).getPropertyValue('--rl-accent-50').trim() : '',
      onPaper: theme ? getComputedStyle(theme).getPropertyValue('--rl-style-on-paper').trim() : '',
      paperBg: theme ? getComputedStyle(theme).getPropertyValue('--rl-style-control-bg').trim() : '',
      borderWidth: control ? getComputedStyle(control).borderTopWidth : '',
      transition: control ? getComputedStyle(control).transitionDuration : ''
    };
  });

  expect(themeState.locale).toBe('en-US');
  expect(themeState.hash).toBe('#/en-US/components/button');
  expect(themeState.theme).toBe('dark');
  expect(themeState.accent).toBe('#14b8a6');
  expect(themeState.density).toBe('compact');
  expect(themeState.motion).toBe('reduced');
  expect(themeState.stylePreset).toBe('illustration');
  expect(themeState.dataStyle).toBe('illustration');
  expect(themeState.accentVar).toBe('#14b8a6');
  expect(themeState.onPaper).toBe('#29221f');
  expect(themeState.paperBg).toContain('color-mix');
  expect(themeState.borderWidth).toBe('3px');
  expect(themeState.transition).toContain('0.001s');
  expect(errors).toEqual([]);
});

test('theme lab route covers dark illustration, density, motion, and component tokens', async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await page.goto(`${docsUrl}#/en-US/playground/theme-lab`);
  await expect(page.locator('rin-docs-theme-lab')).toContainText('Stress-test the full contract');
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
        surfaceRaised: style.getPropertyValue('--rl-surface-raised').trim(),
        text: style.getPropertyValue('--rl-text').trim(),
        ink: style.getPropertyValue('--rl-style-ink-color').trim(),
        onPaper: style.getPropertyValue('--rl-style-on-paper').trim(),
        doodleOpacity: style.getPropertyValue('--rl-style-doodle-opacity').trim(),
        paperLine: style.getPropertyValue('--rl-style-paper-line-color').trim(),
        paperBg: style.getPropertyValue('--rl-style-control-bg').trim(),
        pattern: getComputedStyle(stage).backgroundImage,
        borderWidth: getComputedStyle(buttonControl).borderTopWidth,
        buttonBg: getComputedStyle(buttonControl).backgroundColor,
        buttonHeight: getComputedStyle(buttonControl).height,
        buttonTransition: getComputedStyle(buttonControl).transitionDuration,
        chipBg: getComputedStyle(chipControl).backgroundColor,
        switchBg: getComputedStyle(track).backgroundColor,
        radioBg: getComputedStyle(radioControl).backgroundColor,
        radioColor: getComputedStyle(radioControl).color,
        cardBgToken: style.getPropertyValue('--rl-card-bg').trim(),
        badgeBgToken: style.getPropertyValue('--rl-badge-bg').trim(),
        radioSelectedShadowToken: style.getPropertyValue('--rl-radio-card-selected-shadow').trim(),
        softControlColorToken: style.getPropertyValue('--rl-soft-control-color').trim(),
        switchThumbBgToken: style.getPropertyValue('--rl-switch-thumb-bg').trim(),
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
    expect(state.ink).not.toBe('');
    expect(state.onPaper).not.toBe('');
    expect(state.paperLine).not.toBe('');
    expect(state.cardBgToken).not.toBe('');
    expect(state.badgeBgToken).not.toBe('');
    expect(state.radioSelectedShadowToken).not.toBe('');
    expect(state.switchThumbShadowToken).not.toBe('');
    expect(state.spinnerTrackToken).not.toBe('');
    expect(state.spinnerBorderColor).not.toBe('');
  }

  expect(matrixState.teal['default-light'].surface).not.toBe(matrixState.teal['default-dark'].surface);
  expect(matrixState.teal['default-light'].text).not.toBe(matrixState.teal['default-dark'].text);
  expect(matrixState.teal['illustration-light'].surface).not.toBe(matrixState.teal['illustration-dark'].surface);
  expect(matrixState.teal['illustration-light'].text).not.toBe(matrixState.teal['illustration-dark'].text);
  expect(matrixState.teal['illustration-dark'].surface).toBe('#131119');
  expect(matrixState.teal['illustration-dark'].surfaceRaised).toBe('#211d29');
  expect(matrixState.teal['illustration-dark'].ink).toBe('#261f1f');
  expect(matrixState.teal['illustration-dark'].onPaper).toBe('#29221f');
  expect(matrixState.teal['illustration-dark'].doodleOpacity).toBe('0.34');
  expect(matrixState.teal['illustration-dark'].paperBg).toContain('color-mix');
  expect(matrixState.teal['illustration-dark'].radioColor).not.toBe(matrixState.teal['illustration-dark'].text);
  expect(matrixState.teal['illustration-dark'].radioBg).not.toBe(matrixState.teal['default-dark'].radioBg);
  expect(matrixState.teal['illustration-dark'].softControlColorToken).toBe('#29221f');
  expect(matrixState.teal['illustration-dark'].switchThumbBgToken).toContain('color-mix');

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
