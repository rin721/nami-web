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
  await page.waitForFunction(() =>
    customElements.get('nami-button') &&
    customElements.get('nami-card') &&
    customElements.get('nami-page-transition') &&
    customElements.get('nami-top-progress')
  );
}

async function delayScripts(page: Page, delayMs = 1800) {
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'script') {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    await route.continue();
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

test('docs home uses Nami UI components and clean localized product copy', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/');
  await waitForNami(page);

  await expect(page.getByRole('heading', { name: 'Nami UI', exact: true })).toBeVisible();
  await expect(page.locator('[data-product-hero]')).toContainText('跨框架、可换肤的 Web Components UI 组件库');
  await expect(page.locator('body')).toContainText('组件库官网应从真实使用路径开始');
  await expect(page.locator('body')).not.toContainText('Astro + MDX');
  await expect(page.locator('body')).not.toContainText('成熟技术做官网');
  await expect(page.locator('body')).not.toContainText('???');
  await expect(page.locator('body')).not.toContainText('涓');
  await expect(page.locator('body')).not.toContainText('鈫');

  await expect(page.locator('#docs-page-transition')).toHaveAttribute('appearance', 'veil');
  await expect(page.locator('#docs-top-progress')).toHaveCount(1);
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => ({
    show: typeof (element as HTMLElement & { show?: unknown }).show === 'function',
    hide: typeof (element as HTMLElement & { hide?: unknown }).hide === 'function',
    waitFor: typeof (element as HTMLElement & { waitFor?: unknown }).waitFor === 'function'
  }))).toEqual({ show: true, hide: true, waitFor: true });
  await expect.poll(async () => page.locator('#docs-top-progress').evaluate((element) => ({
    show: typeof (element as HTMLElement & { show?: unknown }).show === 'function',
    finish: typeof (element as HTMLElement & { finish?: unknown }).finish === 'function',
    waitFor: typeof (element as HTMLElement & { waitFor?: unknown }).waitFor === 'function'
  }))).toEqual({ show: true, finish: true, waitFor: true });
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => element.hasAttribute('active'))).toBe(false);

  const thirdPartyVisibleShell = await page
    .locator('astro-dev-toolbar, astro-dev-toolbar-window, sl-button, sl-card, md-filled-button, .VPNav, .DocSearch, .theme-doc-sidebar-container')
    .count();
  expect(thirdPartyVisibleShell).toBe(0);
  expect(errors).toEqual([]);
});

test('route navigation uses a filled top progress bar instead of a page-transition bar', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/');
  await waitForNami(page);

  await page.evaluate(() => {
    type ProgressSample = {
      active: boolean;
      progress: string | null;
      persisted: string | null;
      trackHeight: number;
      indicatorHeight: number;
      trackBg: string;
      indicatorBg: string;
      indicatorWidth: number;
    };
    const progress = document.querySelector('#docs-top-progress') as HTMLElement & { __namiPersistProbe?: string };
    progress.__namiPersistProbe = 'persisted';
    const win = window as Window & { __namiProgressSamples?: ProgressSample[]; __namiProgressInterval?: number };
    win.__namiProgressSamples = [];
    const sample = () => {
      const progress = document.querySelector('#docs-top-progress') as HTMLElement & { __namiPersistProbe?: string } | null;
      const root = progress?.shadowRoot;
      const track = root?.querySelector('[part~="track"]') as HTMLElement | null;
      const indicator = root?.querySelector('[part~="indicator"]') as HTMLElement | null;
      win.__namiProgressSamples?.push({
        active: Boolean(progress?.hasAttribute('active')),
        progress: progress?.getAttribute('progress') ?? null,
        persisted: progress?.__namiPersistProbe ?? null,
        trackHeight: track ? track.getBoundingClientRect().height : 0,
        indicatorHeight: indicator ? indicator.getBoundingClientRect().height : 0,
        trackBg: track ? getComputedStyle(track).backgroundColor : '',
        indicatorBg: indicator ? getComputedStyle(indicator).backgroundColor : '',
        indicatorWidth: indicator ? indicator.getBoundingClientRect().width : 0
      });
    };
    sample();
    new MutationObserver(sample).observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['active', 'progress'] });
    win.__namiProgressInterval = window.setInterval(sample, 16);
    window.setTimeout(() => window.clearInterval(win.__namiProgressInterval), 1500);
  });

  await page.locator('a[href="/zh-CN/components/"]').first().click();
  await expect(page).toHaveURL(/\/zh-CN\/components\/$/);
  await expect.poll(async () =>
    page.evaluate(() => (window as Window & { __namiProgressSamples?: Array<{ active: boolean; progress: string | null; persisted: string | null; trackHeight: number; indicatorHeight: number; trackBg: string; indicatorBg: string; indicatorWidth: number }> }).__namiProgressSamples?.some((sample) =>
      sample.active &&
      sample.persisted === 'persisted' &&
      Number(sample.progress) > 0 &&
      sample.trackHeight >= 3 &&
      Math.abs(sample.trackHeight - sample.indicatorHeight) <= 1 &&
      sample.trackBg !== 'rgba(0, 0, 0, 0)' &&
      sample.indicatorBg !== 'rgba(0, 0, 0, 0)' &&
      sample.trackBg !== sample.indicatorBg &&
      sample.indicatorWidth > 0
    ))
  ).toBe(true);

  await expect.poll(async () =>
    page.evaluate(() => (document.querySelector('#docs-top-progress') as (HTMLElement & { __namiPersistProbe?: string }) | null)?.__namiPersistProbe)
  ).toBe('persisted');
  await expect.poll(async () => page.locator('#docs-top-progress').evaluate((element) => element.hasAttribute('active'))).toBe(false);
  await expect(page.locator('#docs-page-transition')).not.toHaveAttribute('appearance', 'bar');
  await expect(page.locator('#component-docs')).toContainText('基础操作');
  await expect(page.locator('#component-docs')).toContainText('表单输入');
  await expect(page.locator('#component-docs')).toContainText('状态展示');

  const componentRouteTheme = await readThemeTokenState(page);
  expect(componentRouteTheme.primary).not.toBe('');
  expect(componentRouteTheme.surface).not.toBe('');
  expect(componentRouteTheme.cardBg).not.toBe('rgba(0, 0, 0, 0)');
  expect(componentRouteTheme.buttonBg).not.toBe('rgba(0, 0, 0, 0)');
  expect(errors).toEqual([]);
});

test('critical CSS protects slow-network pre-upgrade layout', async ({ page, context }) => {
  const errors = captureConsoleErrors(page);
  await delayScripts(page);
  await page.setViewportSize({ width: 1280, height: 780 });
  await page.goto('/zh-CN/', { waitUntil: 'commit' });
  await page.locator('nami-page-transition[active]').waitFor({ state: 'attached' });
  await expect(page.locator('nami-page-transition[active] [data-nami-transition-fallback]')).toBeVisible();

  const desktopPreUpgrade = await page.evaluate(() => {
    const transition = document.querySelector('nami-page-transition') as HTMLElement;
    const fallback = transition?.querySelector('[data-nami-transition-fallback]') as HTMLElement;
    const shell = document.querySelector('nami-app-shell') as HTMLElement;
    const rail = shell?.querySelector('[slot="rail"]') as HTMLElement;
    const top = shell?.querySelector('[slot="top"]') as HTMLElement;
    const bottom = shell?.querySelector('[slot="bottom"]') as HTMLElement;
    const main = shell?.querySelector('main') as HTMLElement;
    const button = shell?.querySelector('nami-button') as HTMLElement;
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
      buttonDisplay: button ? getComputedStyle(button).display : ''
    };
  });

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

  await waitForNami(page);
  await expect.poll(async () => page.locator('#docs-page-transition').evaluate((element) => element.hasAttribute('active'))).toBe(false);

  const fixture = await context.newPage();
  const fixtureErrors = captureConsoleErrors(fixture);
  await delayScripts(fixture);
  await fixture.setViewportSize({ width: 520, height: 780 });
  await fixture.goto('/fixtures/nami-critical/', { waitUntil: 'commit' });
  await fixture.locator('nami-page-transition[active]').waitFor({ state: 'attached' });
  await expect(fixture.locator('nami-page-transition[active] [data-nami-transition-fallback]')).toBeVisible();

  const mobilePreUpgrade = await fixture.evaluate(() => {
    const shell = document.querySelector('nami-app-shell') as HTMLElement;
    const rail = shell?.querySelector('[slot="rail"]') as HTMLElement;
    const top = shell?.querySelector('[slot="top"]') as HTMLElement;
    const bottom = shell?.querySelector('[slot="bottom"]') as HTMLElement;
    const main = shell?.querySelector('main') as HTMLElement;
    return {
      transitionDefined: Boolean(customElements.get('nami-page-transition')),
      appShellDefined: Boolean(customElements.get('nami-app-shell')),
      railDisplay: rail ? getComputedStyle(rail).display : '',
      topDisplay: top ? getComputedStyle(top).display : '',
      bottomDisplay: bottom ? getComputedStyle(bottom).display : '',
      mainPaddingLeft: main ? getComputedStyle(main).paddingLeft : '',
      mainPaddingTop: main ? getComputedStyle(main).paddingTop : ''
    };
  });

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

test('settings transition route configures top progress preview and persisted route bar options', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/settings/transition/');
  await waitForNami(page);

  await expect(page.locator('.settings-heading')).toContainText('页面过渡');
  await expect(page.locator('.settings-section-list')).toContainText('外观');
  await expect(page.locator('nami-top-progress[data-docs-top-progress-preview]')).toHaveAttribute('height', '4');
  await expect(page.locator('nami-top-progress[data-docs-top-progress-preview]')).toHaveAttribute('effect', 'flow');
  await expect(page.locator('nami-top-progress[data-docs-top-progress-preview]')).toHaveAttribute('progress', '68');
  await page.locator('[data-progress-height-input]').evaluate((element) => {
    (element as HTMLElement & { value: string }).value = '6';
    element.dispatchEvent(new CustomEvent('nami-change', { bubbles: true, composed: true, detail: { value: '6' } }));
  });
  await page.locator('[data-progress-effect-mode] button[value="pulse"]').click();
  await page.locator('[data-progress-duration-input]').evaluate((element) => {
    (element as HTMLElement & { value: string }).value = '420';
    element.dispatchEvent(new CustomEvent('nami-change', { bubbles: true, composed: true, detail: { value: '420' } }));
  });
  await expect(page.locator('#docs-top-progress')).toHaveAttribute('height', '6');
  await expect(page.locator('#docs-top-progress')).toHaveAttribute('effect', 'pulse');
  await expect(page.locator('#docs-top-progress')).toHaveAttribute('duration', '420');
  await expect(page.locator('nami-top-progress[data-docs-top-progress-preview]')).toHaveAttribute('height', '6');
  await expect(page.locator('nami-top-progress[data-docs-top-progress-preview]')).toHaveAttribute('effect', 'pulse');
  await expect(page.locator('nami-top-progress[data-docs-top-progress-preview]')).toHaveAttribute('duration', '420');

  const preview = await page.locator('nami-top-progress[data-docs-top-progress-preview]').evaluate((element) => {
    const track = element.shadowRoot?.querySelector('[part~="track"]') as HTMLElement;
    const indicator = element.shadowRoot?.querySelector('[part~="indicator"]') as HTMLElement;
    return {
      trackHeight: track.getBoundingClientRect().height,
      indicatorHeight: indicator.getBoundingClientRect().height,
      trackBg: getComputedStyle(track).backgroundColor,
      indicatorBg: getComputedStyle(indicator).backgroundColor
    };
  });
  expect(preview.trackHeight).toBeGreaterThanOrEqual(6);
  expect(Math.abs(preview.trackHeight - preview.indicatorHeight)).toBeLessThanOrEqual(1);
  expect(preview.trackBg).not.toBe(preview.indicatorBg);
  expect(errors).toEqual([]);
});

test('theme designer and responsive shell remain compatible with Nami components', async ({ page }) => {
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
    labels: Array.from(nav.querySelectorAll('a')).map((item) => ({
      aria: item.getAttribute('aria-label'),
      data: item.getAttribute('data-label'),
      title: item.getAttribute('title')
    }))
  }));
  expect(railNav.text).toBe('');
  expect(railNav.svgCount).toBe(7);
  expect(railNav.labels[0]).toEqual({ aria: '首页', data: '首页', title: '首页' });
  expect(railNav.labels.at(-1)).toEqual({ aria: '设置', data: '设置', title: '设置' });

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
