import { expect, test, type Page } from '@playwright/test';

function captureConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    const text = message.text();
    if (text.includes('Outdated Optimize Dep')) return;
    if (message.type() === 'error') errors.push(text);
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

async function openIsolated(page: Page, path = '/zh-CN/') {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto(path);
}

async function waitForRin(page: Page) {
  await page.waitForFunction(() => customElements.get('rl-button') && customElements.get('rl-card'));
}

async function readThemeTokenState(page: Page) {
  return page.evaluate(() => {
    const theme = document.querySelector('rl-theme') as HTMLElement;
    const cardBase = document.querySelector('rl-card')?.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const buttonBase = document.querySelector('rl-button')?.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const themeStyle = getComputedStyle(theme);
    return {
      primary: themeStyle.getPropertyValue('--rl-color-primary').trim(),
      surface: themeStyle.getPropertyValue('--rl-surface').trim(),
      cardBg: getComputedStyle(cardBase).backgroundColor,
      buttonBg: getComputedStyle(buttonBase).backgroundColor
    };
  });
}

test('Astro docs website has product IA, Rin UI surfaces, and clean localized copy', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/');
  await expect(page).toHaveURL(/\/zh-CN\/$/);
  await waitForRin(page);

  await expect(page.getByRole('heading', { name: 'Rin UI', exact: true })).toBeVisible();
  await expect(page.locator('[data-product-hero]')).toContainText('跨框架、可换肤的 Web Components UI 组件库');
  await expect(page.locator('body')).toContainText('一个组件库应当先解决真实使用路径');
  await expect(page.locator('body')).not.toContainText('成熟技术做官网');
  await expect(page.locator('body')).not.toContainText('Astro + MDX');
  await expect(page.locator('rin-docs-router')).toHaveCount(0);
  await expect(page.locator('#component-docs')).toHaveCount(0);
  await expect(page.locator('rl-card').first()).toBeVisible();
  await expect(page.locator('rl-badge').first()).toBeVisible();

  const thirdPartyVisibleShell = await page
    .locator('astro-dev-toolbar, astro-dev-toolbar-window, sl-button, sl-card, md-filled-button, .VPNav, .DocSearch, .theme-doc-sidebar-container')
    .count();
  expect(thirdPartyVisibleShell).toBe(0);

  await page.evaluate(() => {
    (window as Window & { __rinSoftNavMarker?: number }).__rinSoftNavMarker = 1;
  });
  await page.locator('a[href="/zh-CN/components/"]').first().click();
  await expect(page).toHaveURL(/\/zh-CN\/components\/$/);
  await expect.poll(async () =>
    page.evaluate(() => (window as Window & { __rinSoftNavMarker?: number }).__rinSoftNavMarker)
  ).toBe(1);
  await expect(page.locator('#component-docs')).toContainText('基础操作');
  await expect(page.locator('#component-docs')).toContainText('表单输入');
  await expect(page.locator('#component-docs')).toContainText('状态展示');

  const componentRouteTheme = await readThemeTokenState(page);
  expect(componentRouteTheme.primary).not.toBe('');
  expect(componentRouteTheme.surface).not.toBe('');
  expect(componentRouteTheme.cardBg).not.toBe('rgba(0, 0, 0, 0)');
  expect(componentRouteTheme.buttonBg).not.toBe('rgba(0, 0, 0, 0)');

  await page.goto('/#/docs/getting-started');
  await expect(page).toHaveURL(/\/zh-CN\/docs\/getting-started\/$/);
  await expect(page.locator('#doc-getting-started')).toContainText('注册全部组件');
  await expect(page.locator('rin-docs-live-demo').first()).toBeVisible();
  await expect(page.locator('rin-docs-live-demo rl-button').first()).toBeVisible();

  await page.goto('/en-US/docs/getting-started/');
  await expect(page.locator('#doc-getting-started')).toContainText('Register all components');

  await page.goto('/en-US/components/button/');
  await expect(page.locator('.section-heading h1')).toContainText('rl-button');
  await expect(page.locator('#component-docs')).toContainText('Attributes');
  await expect(page.locator('#component-docs')).toContainText('Events');
  await expect(page.locator('#component-docs')).toContainText('Slots');
  await expect(page.locator('#component-docs')).toContainText('CSS Parts');
  await expect(page.locator('#component-docs')).toContainText('Accessibility notes');
  await expect(page.locator('#component-docs')).toContainText('--rl-button-bg');

  await page.goto('/zh-CN/theme/');
  await expect(page.locator('body')).toContainText('主题系统');
  await expect(page.locator('body')).toContainText('风格预设');
  await expect(page.locator('body')).toContainText('开放主题算法');

  await page.goto('/zh-CN/theme/style-presets/');
  await expect(page.locator('[data-contract-stage="default-light"]')).toBeVisible();
  await expect(page.locator('[data-contract-stage="illustration-dark"]')).toBeVisible();

  await page.goto('/zh-CN/resources/quality/');
  await expect(page.locator('body')).toContainText('质量');
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toContain('lit-localize can only be configured once');
  expect(bodyText).not.toContain('???');
  expect(bodyText).not.toContain('涓');
  expect(bodyText).not.toContain('鈫');

  await page.goto('/en-US/tokens/');
  await expect(page.locator('body')).toContainText('Seed, Semantic, Component');
  expect(errors).toEqual([]);
});

test('Theme Designer exposes deterministic algorithm output and semantic customization controls', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/en-US/playground/theme-designer/');
  await waitForRin(page);

  await expect(page.locator('[data-theme-designer]')).toContainText('Theme Designer');
  await expect(page.locator('[data-theme-designer]')).toContainText('Generated CSS');

  const designerRoot = page.locator('[data-theme-designer]');
  await designerRoot.locator('[data-theme-mode] button[value="dark"]').click();
  await designerRoot.locator('[data-accent="#14b8a6"]').click();
  await designerRoot.locator('[data-radius-mode] button[value="soft"]').click();
  await designerRoot.locator('[data-style-toggle]').click();
  await designerRoot.locator('[data-contrast-toggle]').click();

  await expect.poll(async () => page.locator('#docs-theme').evaluate((theme) => ({
    theme: theme.getAttribute('theme'),
    accent: theme.getAttribute('accent'),
    radius: theme.getAttribute('radius'),
    contrast: theme.getAttribute('contrast'),
    stylePreset: theme.getAttribute('style-preset')
  }))).toEqual({
    theme: 'dark',
    accent: '#14b8a6',
    radius: 'soft',
    contrast: 'high',
    stylePreset: 'illustration'
  });

  const designer = await page.locator('rin-docs-theme-designer').evaluate(() => {
    const root = document.querySelector('rl-theme') as HTMLElement;
    const preview = document.querySelector('[data-designer-preview]') as HTMLElement;
    const button = preview.querySelector('rl-button') as HTMLElement;
    const buttonBase = button.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const tokenTree = document.querySelector('[data-derived-token-tree]')?.textContent ?? '';
    const css = document.querySelector('rin-docs-code-block[data-generated-css]')?.textContent ?? '';
    const affected = document.querySelector('[data-affected-components]')?.textContent ?? '';
    return {
      rootAccent: root.getAttribute('accent'),
      rootStyle: root.getAttribute('style-preset'),
      previewTheme: preview.dataset.rlTheme,
      previewStyle: preview.dataset.rlStyle,
      previewRadius: preview.dataset.rlRadius,
      previewContrast: preview.dataset.rlContrast,
      primary: getComputedStyle(preview).getPropertyValue('--rl-color-primary').trim(),
      contrastToken: getComputedStyle(preview).getPropertyValue('--rl-contrast-level').trim(),
      buttonBorderWidth: getComputedStyle(buttonBase).borderTopWidth,
      buttonShadow: getComputedStyle(buttonBase).boxShadow,
      tokenTree,
      css,
      affected
    };
  });

  expect(designer.rootAccent).toBe('#14b8a6');
  expect(designer.rootStyle).toBe('illustration');
  expect(designer.previewTheme).toBe('dark');
  expect(designer.previewStyle).toBe('illustration');
  expect(designer.previewRadius).toBe('soft');
  expect(designer.previewContrast).toBe('high');
  expect(designer.primary).toContain('#14b8a6');
  expect(designer.contrastToken).toBe('high');
  expect(parseFloat(designer.buttonBorderWidth)).toBeGreaterThanOrEqual(3);
  expect(designer.buttonShadow).not.toBe('none');
  expect(designer.tokenTree).toContain('#14b8a6');
  expect(designer.css).toContain('.my-rin-theme');
  expect(designer.css).toContain('--rl-contrast-level: high');
  expect(designer.affected).toContain('rl-button');
  expect(errors).toEqual([]);
});

test('Astro shell keeps visual state across static routes and uses responsive app shell slots', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/');
  await waitForRin(page);

  const readShellSlots = async () => page.locator('rl-app-shell').evaluate((shell) => {
      const rail = shell.shadowRoot?.querySelector('[part="rail"]') as HTMLElement;
      const top = shell.shadowRoot?.querySelector('[part="top"]') as HTMLElement;
      const bottom = shell.shadowRoot?.querySelector('[part="bottom"]') as HTMLElement;
      return {
        rail: getComputedStyle(rail).display,
        railWidth: getComputedStyle(rail).width,
        top: getComputedStyle(top).display,
        bottom: getComputedStyle(bottom).display
      };
  });

  await page.setViewportSize({ width: 1280, height: 780 });
  const desktop = await readShellSlots();
  await page.setViewportSize({ width: 520, height: 780 });
  const mobile = await readShellSlots();

  expect(desktop.rail).not.toBe('none');
  expect(parseFloat(desktop.railWidth)).toBeGreaterThanOrEqual(180);
  expect(desktop.top).toBe('none');
  expect(desktop.bottom).toBe('none');
  expect(mobile.rail).toBe('none');
  expect(mobile.top).not.toBe('none');
  expect(mobile.bottom).not.toBe('none');

  await page.goto('/zh-CN/playground/theme-designer/');
  const designerRoot = page.locator('[data-theme-designer]');
  await designerRoot.locator('[data-theme-mode] button[value="dark"]').click();
  await designerRoot.locator('[data-accent="#14b8a6"]').click();
  await designerRoot.locator('[data-density-toggle]').click();
  await designerRoot.locator('[data-motion-toggle]').click();
  await designerRoot.locator('[data-style-toggle]').click();
  await designerRoot.locator('[data-radius-mode] button[value="soft"]').click();
  await designerRoot.locator('[data-contrast-toggle]').click();

  await page.goto('/en-US/components/button/');
  await expect.poll(async () => page.locator('#docs-theme').evaluate((theme) => ({
    theme: theme.getAttribute('theme'),
    accent: theme.getAttribute('accent'),
    density: theme.getAttribute('density'),
    motion: theme.getAttribute('motion'),
    stylePreset: theme.getAttribute('style-preset'),
    radius: theme.getAttribute('radius'),
    contrast: theme.getAttribute('contrast')
  }))).toEqual({
    theme: 'dark',
    accent: '#14b8a6',
    density: 'compact',
    motion: 'reduced',
    stylePreset: 'illustration',
    radius: 'soft',
    contrast: 'high'
  });
  expect(errors).toEqual([]);
});

test('Theme Lab route preserves the default and illustration theme matrix', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/en-US/playground/theme-lab/');
  await waitForRin(page);

  await expect(page.locator('[data-contract-stage="default-light"]')).toBeVisible();
  await expect(page.locator('[data-contract-stage="default-dark"]')).toBeVisible();
  await expect(page.locator('[data-contract-stage="illustration-light"]')).toBeVisible();
  await expect(page.locator('[data-contract-stage="illustration-dark"]')).toBeVisible();

  await page.locator('[data-accent="#8b5cf6"]').first().click();
  await page.locator('[data-style-toggle]').first().click();
  await page.locator('[data-density-toggle]').first().click();
  await page.locator('[data-motion-toggle]').first().click();

  const matrix = await page.evaluate(() => {
    const root = document.querySelector('#docs-theme') as HTMLElement;
    const liveButton = document.querySelector('.theme-live-surface rl-button') as HTMLElement;
    const liveButtonBase = liveButton.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const illustrationDark = document.querySelector('[data-contract-stage="illustration-dark"]') as HTMLElement;
    const darkButton = illustrationDark.querySelector('rl-button') as HTMLElement;
    const darkButtonBase = darkButton.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    return {
      rootAccent: root.getAttribute('accent'),
      rootStyle: root.getAttribute('style-preset'),
      rootDensity: root.getAttribute('density'),
      rootMotion: root.getAttribute('motion'),
      liveHeight: getComputedStyle(liveButtonBase).minHeight || getComputedStyle(liveButtonBase).height,
      liveDuration: getComputedStyle(liveButtonBase).transitionDuration,
      darkBorderWidth: getComputedStyle(darkButtonBase).borderTopWidth,
      darkShadow: getComputedStyle(darkButtonBase).boxShadow,
      darkPattern: getComputedStyle(illustrationDark).backgroundImage
    };
  });

  expect(matrix.rootAccent).toBe('#8b5cf6');
  expect(matrix.rootStyle).toBe('illustration');
  expect(matrix.rootDensity).toBe('compact');
  expect(matrix.rootMotion).toBe('reduced');
  expect(parseFloat(matrix.liveHeight)).toBeLessThanOrEqual(38);
  expect(matrix.liveDuration).toContain('0.001s');
  expect(parseFloat(matrix.darkBorderWidth)).toBeGreaterThanOrEqual(3);
  expect(matrix.darkShadow).not.toBe('none');
  expect(matrix.darkPattern).not.toBe('none');
  expect(errors).toEqual([]);
});
