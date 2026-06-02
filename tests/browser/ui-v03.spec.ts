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

async function waitForNami(page: Page) {
  await page.waitForFunction(() => customElements.get('nami-button') && customElements.get('nami-card') && customElements.get('nami-page-transition'));
}

async function delayScripts(page: Page, delayMs = 1800) {
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'script') {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    await route.continue();
  });
}

async function readPreUpgradeState(page: Page) {
  return page.evaluate(() => {
    const transition = document.querySelector('nami-page-transition') as HTMLElement;
    const fallback = transition?.querySelector('[data-nami-transition-fallback]') as HTMLElement;
    const shell = document.querySelector('nami-app-shell') as HTMLElement;
    const rail = shell?.querySelector('[slot="rail"]') as HTMLElement;
    const top = shell?.querySelector('[slot="top"]') as HTMLElement;
    const bottom = shell?.querySelector('[slot="bottom"]') as HTMLElement;
    const main = shell?.querySelector('main') as HTMLElement;
    const button = shell?.querySelector('nami-button') as HTMLElement;
    const chip = shell?.querySelector('nami-chip') as HTMLElement;
    return {
      transitionDefined: Boolean(customElements.get('nami-page-transition')),
      appShellDefined: Boolean(customElements.get('nami-app-shell')),
      transitionDisplay: getComputedStyle(transition).display,
      transitionPosition: getComputedStyle(transition).position,
      fallbackDisplay: fallback ? getComputedStyle(fallback).display : '',
      railDisplay: rail ? getComputedStyle(rail).display : '',
      railPosition: rail ? getComputedStyle(rail).position : '',
      railWidth: rail ? getComputedStyle(rail).width : '',
      topDisplay: top ? getComputedStyle(top).display : '',
      bottomDisplay: bottom ? getComputedStyle(bottom).display : '',
      mainPaddingLeft: main ? getComputedStyle(main).paddingLeft : '',
      mainPaddingTop: main ? getComputedStyle(main).paddingTop : '',
      buttonDisplay: button ? getComputedStyle(button).display : '',
      buttonRadius: button ? getComputedStyle(button).borderRadius : '',
      chipDisplay: chip ? getComputedStyle(chip).display : ''
    };
  });
}

async function readThemeTokenState(page: Page) {
  return page.evaluate(() => {
    const theme = document.querySelector('nami-theme') as HTMLElement;
    const cardBase = document.querySelector('nami-card')?.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const buttonBase = document.querySelector('nami-button')?.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const themeStyle = getComputedStyle(theme);
    return {
      primary: themeStyle.getPropertyValue('--nami-color-primary').trim(),
      surface: themeStyle.getPropertyValue('--nami-surface').trim(),
      cardBg: getComputedStyle(cardBase).backgroundColor,
      buttonBg: getComputedStyle(buttonBase).backgroundColor
    };
  });
}

test('Astro docs website has product IA, Nami UI surfaces, and clean localized copy', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/');
  await expect(page).toHaveURL(/\/zh-CN\/$/);
  await waitForNami(page);

  await expect(page.getByRole('heading', { name: 'Nami UI', exact: true })).toBeVisible();
  await expect(page.locator('#docs-page-transition')).toHaveCount(1);
  await expect(page.locator('#docs-page-transition')).toHaveAttribute('appearance', 'veil');
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => ({
    show: typeof (element as HTMLElement & { show?: unknown }).show === 'function',
    hide: typeof (element as HTMLElement & { hide?: unknown }).hide === 'function',
    waitFor: typeof (element as HTMLElement & { waitFor?: unknown }).waitFor === 'function'
  }))).toEqual({ show: true, hide: true, waitFor: true });
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => element.hasAttribute('active'))).toBe(false);
  await expect(page.locator('#docs-page-transition')).not.toContainText('Loading');
  await expect(page.locator('[data-product-hero]')).toContainText('跨框架、可换肤的 Web Components UI 组件库');
  await expect(page.locator('body')).toContainText('组件库官网应从真实使用路径开始');
  await expect(page.locator('body')).not.toContainText('成熟技术做官网');
  await expect(page.locator('body')).not.toContainText('Astro + MDX');
  await expect(page.locator('nami-docs-router')).toHaveCount(0);
  await expect(page.locator('#component-docs')).toHaveCount(0);
  await expect(page.locator('nami-card').first()).toBeVisible();
  await expect(page.locator('nami-badge').first()).toBeVisible();

  const thirdPartyVisibleShell = await page
    .locator('astro-dev-toolbar, astro-dev-toolbar-window, sl-button, sl-card, md-filled-button, .VPNav, .DocSearch, .theme-doc-sidebar-container')
    .count();
  expect(thirdPartyVisibleShell).toBe(0);

  await page.evaluate(() => {
    type RouteTransitionSample = {
      active: boolean;
      appearance: string | null;
      progress: string | null;
      persisted: string | null;
      baseVisible: boolean;
      trackDisplay: string | null;
      trackHeight: number;
      indicatorHeight: number;
      trackBg: string | null;
      indicatorWidth: string | null;
      indicatorBg: string | null;
    };
    const transition = document.querySelector('#docs-page-transition') as HTMLElement & { __namiPersistProbe?: string } | null;
    if (transition) transition.__namiPersistProbe = 'persisted';
    const win = window as Window & { __namiSoftNavMarker?: number; __namiTransitionSamples?: RouteTransitionSample[]; __namiTransitionInterval?: number };
    win.__namiSoftNavMarker = 1;
    win.__namiTransitionSamples = [];
    const sample = () => {
      const transition = document.querySelector('#docs-page-transition') as HTMLElement | null;
      const root = transition?.shadowRoot;
      const base = root?.querySelector('.base') as HTMLElement | null;
      const track = root?.querySelector('.track') as HTMLElement | null;
      const indicator = root?.querySelector('.bar-indicator') as HTMLElement | null;
      win.__namiTransitionSamples?.push({
        active: Boolean(transition?.hasAttribute('active')),
        appearance: transition?.getAttribute('appearance') ?? null,
        progress: transition?.getAttribute('progress') ?? null,
        persisted: (transition as (HTMLElement & { __namiPersistProbe?: string }) | null)?.__namiPersistProbe ?? null,
        baseVisible: base ? getComputedStyle(base).visibility === 'visible' && Number(getComputedStyle(base).opacity) > 0 : false,
        trackDisplay: track ? getComputedStyle(track).display : null,
        trackHeight: track ? track.getBoundingClientRect().height : 0,
        indicatorHeight: indicator ? indicator.getBoundingClientRect().height : 0,
        trackBg: track ? getComputedStyle(track).backgroundColor : null,
        indicatorWidth: indicator ? getComputedStyle(indicator).width : null,
        indicatorBg: indicator ? getComputedStyle(indicator).backgroundColor : null
      });
    };
    sample();
    new MutationObserver(sample).observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['active', 'appearance', 'progress'] });
    win.__namiTransitionInterval = window.setInterval(sample, 25);
    window.setTimeout(() => window.clearInterval(win.__namiTransitionInterval), 1500);
  });
  await page.locator('a[href="/zh-CN/components/"]').first().click();
  await expect(page).toHaveURL(/\/zh-CN\/components\/$/);
  await expect.poll(async () =>
    page.evaluate(() => (window as Window & { __namiSoftNavMarker?: number }).__namiSoftNavMarker)
  ).toBe(1);
  await expect.poll(async () =>
    page.evaluate(() => (window as Window & { __namiTransitionSamples?: Array<{ active: boolean; appearance: string | null; progress: string | null; persisted: string | null; baseVisible: boolean; trackDisplay: string | null; trackHeight: number; indicatorHeight: number; trackBg: string | null; indicatorWidth: string | null; indicatorBg: string | null }> }).__namiTransitionSamples?.some((sample) => sample.active && sample.appearance === 'bar' && Number(sample.progress) > 0 && sample.persisted === 'persisted' && sample.baseVisible && sample.trackDisplay === 'block' && sample.trackHeight >= 12 && Math.abs(sample.trackHeight - sample.indicatorHeight) <= 1 && sample.trackBg !== 'rgba(0, 0, 0, 0)' && sample.trackBg !== sample.indicatorBg && Number.parseFloat(sample.indicatorWidth ?? '0') > 0))
  ).toBe(true);
  await expect.poll(async () =>
    page.evaluate(() => (document.querySelector('#docs-page-transition') as (HTMLElement & { __namiPersistProbe?: string }) | null)?.__namiPersistProbe)
  ).toBe('persisted');
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => element.hasAttribute('active'))).toBe(false);
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
  await expect(page.locator('nami-docs-live-demo').first()).toBeVisible();
  await expect(page.locator('nami-docs-live-demo nami-button').first()).toBeVisible();

  await page.goto('/en-US/docs/getting-started/');
  await expect(page.locator('#doc-getting-started')).toContainText('Register all components');

  await page.goto('/en-US/components/button/');
  await expect(page.locator('.section-heading h1')).toContainText('nami-button');
  await expect(page.locator('#component-docs')).toContainText('Attributes');
  await expect(page.locator('#component-docs')).toContainText('Events');
  await expect(page.locator('#component-docs')).toContainText('Slots');
  await expect(page.locator('#component-docs')).toContainText('CSS Parts');
  await expect(page.locator('#component-docs')).toContainText('Accessibility notes');
  await expect(page.locator('#component-docs')).toContainText('--nami-button-bg');

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
  const encodingSentinels = [String.fromCharCode(63, 63, 63), String.fromCharCode(0x6d93), String.fromCharCode(0x922b)];
  for (const sentinel of encodingSentinels) {
    expect(bodyText).not.toContain(sentinel);
  }

  await page.goto('/en-US/tokens/');
  await expect(page.locator('body')).toContainText('Seed, Semantic, Component');

  await page.goto('/zh-CN/settings/transition/');
  await expect(page.locator('.settings-heading')).toContainText('页面过渡');
  await expect(page.locator('.settings-section-list')).toContainText('外观');
  await expect(page.locator('nami-page-transition[data-docs-transition-preview]')).toHaveAttribute('bar-height', '12');
  await page.locator('[data-bar-height-mode] button[value="16"]').click();
  await expect(page.locator('#docs-page-transition')).toHaveAttribute('bar-height', '16');
  await expect(page.locator('nami-page-transition[data-docs-transition-preview]')).toHaveAttribute('bar-height', '16');

  await page.goto('/en-US/settings/appearance/');
  await expect(page.locator('.settings-heading')).toContainText('Appearance');
  expect(errors).toEqual([]);
});

test('critical CSS protects slow-network pre-upgrade layout in Astro and standalone fixture', async ({ page, context }) => {
  const errors = captureConsoleErrors(page);
  await delayScripts(page);
  await page.setViewportSize({ width: 1280, height: 780 });
  await page.goto('/zh-CN/', { waitUntil: 'commit' });
  await page.locator('nami-page-transition[active]').waitFor({ state: 'attached' });
  await expect(page.locator('nami-page-transition[active] [data-nami-transition-fallback]')).toBeVisible();

  const desktopPreUpgrade = await readPreUpgradeState(page);
  expect(desktopPreUpgrade.transitionDefined).toBe(false);
  expect(desktopPreUpgrade.appShellDefined).toBe(false);
  expect(desktopPreUpgrade.transitionDisplay).toBe('flex');
  expect(desktopPreUpgrade.transitionPosition).toBe('fixed');
  expect(desktopPreUpgrade.fallbackDisplay).toBe('flex');
  expect(desktopPreUpgrade.railDisplay).toBe('flex');
  expect(desktopPreUpgrade.railPosition).toBe('fixed');
  expect(parseFloat(desktopPreUpgrade.railWidth)).toBeCloseTo(56, 0);
  expect(desktopPreUpgrade.topDisplay).toBe('none');
  expect(desktopPreUpgrade.bottomDisplay).toBe('none');
  expect(parseFloat(desktopPreUpgrade.mainPaddingLeft)).toBeGreaterThanOrEqual(56);
  expect(['inline-flex', 'flex']).toContain(desktopPreUpgrade.buttonDisplay);
  expect(['inline-flex', 'flex']).toContain(desktopPreUpgrade.chipDisplay);

  await waitForNami(page);
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => element.hasAttribute('active'))).toBe(false);

  const fixture = await context.newPage();
  const fixtureErrors = captureConsoleErrors(fixture);
  await delayScripts(fixture);
  await fixture.setViewportSize({ width: 520, height: 780 });
  await fixture.goto('/fixtures/nami-critical/', { waitUntil: 'commit' });
  await fixture.locator('nami-page-transition[active]').waitFor({ state: 'attached' });
  await expect(fixture.locator('nami-page-transition[active] [data-nami-transition-fallback]')).toBeVisible();

  const mobilePreUpgrade = await readPreUpgradeState(fixture);
  expect(mobilePreUpgrade.transitionDefined).toBe(false);
  expect(mobilePreUpgrade.appShellDefined).toBe(false);
  expect(mobilePreUpgrade.railDisplay).toBe('none');
  expect(mobilePreUpgrade.topDisplay).not.toBe('none');
  expect(mobilePreUpgrade.bottomDisplay).not.toBe('none');
  expect(parseFloat(mobilePreUpgrade.mainPaddingLeft)).toBeCloseTo(0, 0);
  expect(parseFloat(mobilePreUpgrade.mainPaddingTop)).toBeGreaterThanOrEqual(56);

  await waitForNami(fixture);
  await expect(fixture.locator('nami-app-shell')).toBeVisible();
  expect(errors).toEqual([]);
  expect(fixtureErrors).toEqual([]);
  await fixture.close();
});

test('Theme Designer exposes deterministic algorithm output and semantic customization controls', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/en-US/playground/theme-designer/');
  await waitForNami(page);

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

  const designer = await page.locator('nami-docs-theme-designer').evaluate(() => {
    const root = document.querySelector('nami-theme') as HTMLElement;
    const preview = document.querySelector('[data-designer-preview]') as HTMLElement;
    const button = preview.querySelector('nami-button') as HTMLElement;
    const buttonBase = button.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const tokenTree = document.querySelector('[data-derived-token-tree]')?.textContent ?? '';
    const css = document.querySelector('nami-docs-code-block[data-generated-css]')?.textContent ?? '';
    const affected = document.querySelector('[data-affected-components]')?.textContent ?? '';
    return {
      rootAccent: root.getAttribute('accent'),
      rootStyle: root.getAttribute('style-preset'),
      previewTheme: preview.dataset.namiTheme,
      previewStyle: preview.dataset.namiStyle,
      previewRadius: preview.dataset.namiRadius,
      previewContrast: preview.dataset.namiContrast,
      primary: getComputedStyle(preview).getPropertyValue('--nami-color-primary').trim(),
      contrastToken: getComputedStyle(preview).getPropertyValue('--nami-contrast-level').trim(),
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
  expect(designer.css).toContain('.my-nami-theme');
  expect(designer.css).toContain('--nami-contrast-level: high');
  expect(designer.affected).toContain('nami-button');
  expect(errors).toEqual([]);
});

test('Astro shell keeps visual state across static routes and uses responsive app shell slots', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/');
  await waitForNami(page);

  const readShellSlots = async () => page.locator('nami-app-shell').evaluate((shell) => {
      const rail = shell.shadowRoot?.querySelector('[part="rail"]') as HTMLElement;
      const top = shell.shadowRoot?.querySelector('[part="top"]') as HTMLElement;
      const bottom = shell.shadowRoot?.querySelector('[part="bottom"]') as HTMLElement;
      const control = shell.shadowRoot?.querySelector('[part="control"]') as HTMLElement;
      return {
        rail: getComputedStyle(rail).display,
        railWidth: getComputedStyle(rail).width,
        controlPaddingLeft: getComputedStyle(control).paddingLeft,
        top: getComputedStyle(top).display,
        bottom: getComputedStyle(bottom).display
      };
  });

  await page.setViewportSize({ width: 1280, height: 780 });
  const desktop = await readShellSlots();
  await page.setViewportSize({ width: 520, height: 780 });
  const mobile = await readShellSlots();

  expect(desktop.rail).not.toBe('none');
  expect(parseFloat(desktop.railWidth)).toBeCloseTo(56, 0);
  expect(parseFloat(desktop.controlPaddingLeft)).toBeCloseTo(56, 0);
  expect(desktop.top).toBe('none');
  expect(desktop.bottom).toBe('none');
  expect(mobile.rail).toBe('none');
  expect(mobile.top).not.toBe('none');
  expect(mobile.bottom).not.toBe('none');

  await page.setViewportSize({ width: 1280, height: 780 });
  const railNav = await page.locator('.rail-stack').evaluate((nav) => ({
    text: nav.textContent?.trim() ?? '',
    svgCount: nav.querySelectorAll('svg.lucide').length,
    labelCount: nav.querySelectorAll('.rail-label').length,
    labels: Array.from(nav.querySelectorAll('a')).map((item) => ({
      aria: item.getAttribute('aria-label'),
      data: item.getAttribute('data-label'),
      title: item.getAttribute('title')
    }))
  }));
  expect(railNav.text).toBe('');
  expect(railNav.svgCount).toBe(7);
  expect(railNav.labelCount).toBe(0);
  expect(railNav.labels[0]).toEqual({ aria: '首页', data: '首页', title: '首页' });
  expect(railNav.labels.at(-1)).toEqual({ aria: '设置', data: '设置', title: '设置' });

  await page.locator('.rail-stack a[aria-label="首页"]').hover();
  await expect.poll(async () => page.locator('.rail-stack a[aria-label="首页"]').evaluate((item) => ({
    content: getComputedStyle(item, '::after').content,
    opacity: getComputedStyle(item, '::after').opacity
  }))).toEqual({ content: '"首页"', opacity: '1' });

  await page.locator('.rail-secondary a[aria-label="设置"]').hover();
  await expect.poll(async () => page.locator('.rail-secondary a[aria-label="设置"]').evaluate((item) => ({
    content: getComputedStyle(item, '::after').content,
    opacity: getComputedStyle(item, '::after').opacity
  }))).toEqual({ content: '"设置"', opacity: '1' });

  await page.goto('/en-US/');
  await page.locator('.rail-stack a[aria-label="Home"]').hover();
  await expect.poll(async () => page.locator('.rail-stack a[aria-label="Home"]').evaluate((item) => ({
    content: getComputedStyle(item, '::after').content,
    opacity: getComputedStyle(item, '::after').opacity
  }))).toEqual({ content: '"Home"', opacity: '1' });

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
  await waitForNami(page);

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
    const liveButton = document.querySelector('.theme-live-surface nami-button') as HTMLElement;
    const liveButtonBase = liveButton.shadowRoot?.querySelector('[part~="base"]') as HTMLElement;
    const illustrationDark = document.querySelector('[data-contract-stage="illustration-dark"]') as HTMLElement;
    const darkButton = illustrationDark.querySelector('nami-button') as HTMLElement;
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
