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
    customElements.get('nami-theme') &&
    customElements.get('nami-tab-bar') &&
    customElements.get('nami-docs-install-tabs')
  );
}

async function expectNoVisibleMojibake(page: Page) {
  const text = await page.locator('body').innerText();
  const sentinels = [
    String.fromCodePoint(0x9369),
    String.fromCodePoint(0x6d93),
    String.fromCodePoint(0x93c2),
    String.fromCodePoint(0xfffd),
    '?'.repeat(3)
  ];
  for (const sentinel of sentinels) {
    expect(text.includes(sentinel), `visible text includes sentinel ${sentinel.codePointAt(0)}`).toBe(false);
  }
}

async function expectDocsFrame(page: Page) {
  await expect(page.locator('.docs-side-nav')).toBeVisible();
  await expect(page.locator('.docs-toc')).toBeVisible();
  await expect(page.locator('.docs-article-content')).toBeVisible();
}

test('home exposes focused library entry points with real contributor and sponsor state', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/');
  await waitForNami(page);

  await expect(page.getByRole('heading', { name: 'Nami UI', exact: true })).toBeVisible();
  await expect(page.locator('[data-product-hero]')).toContainText('跨框架、可换肤的 Web Components UI 组件库');
  await expect(page.locator('body')).toContainText('npm install @nami/ui @nami/themes');
  await expect(page.locator('body')).toContainText('快速开始');
  await expect(page.locator('body')).toContainText('浏览组件');
  await expect(page.locator('body')).toContainText('kawaiirei0');
  await expect(page.locator('body')).toContainText('暂无赞助商配置');
  await expect(page.locator('.bottom-nav a')).toHaveCount(5);
  await expect(page.locator('.bottom-nav')).not.toContainText('设置');
  await expectNoVisibleMojibake(page);
  expect(errors).toEqual([]);
});

test('getting started reads like a docs tutorial', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/docs/getting-started/');
  await waitForNami(page);
  await expectDocsFrame(page);

  await expect(page.locator('.docs-toc')).toContainText('安装');
  await expect(page.locator('.docs-article-content')).toContainText('目标');
  await expect(page.locator('.docs-article-content')).toContainText('前置条件');
  await expect(page.locator('.docs-article-content')).toContainText('npm install @nami/ui @nami/themes');
  await expect(page.locator('.docs-article-content')).toContainText('pnpm add @nami/ui @nami/themes');
  await expect(page.locator('.docs-article-content')).toContainText('yarn add @nami/ui @nami/themes');
  await expect(page.locator('.docs-article-content')).toContainText('Hello Nami');
  await expect(page.locator('.docs-article-content')).toContainText("import '@nami/ui/register'");
  await expect(page.locator('.docs-article-content')).toContainText("import '@nami/ui/button'");
  await expect(page.locator('.docs-article-content')).toContainText('<nami-theme accent="#14b8a6" theme="dark" size="lg">');
  await expect(page.locator('.docs-article-content')).toContainText('<nami-config locale="zh-CN">');
  await expect(page.locator('.docs-article-content')).toContainText('常见错误');
  await expectNoVisibleMojibake(page);

  const zhHeadingCount = await page.locator('.docs-article-content h2').count();
  await page.goto('/en-US/docs/getting-started/');
  await waitForNami(page);
  await expect(page.locator('.docs-article-content h2')).toHaveCount(zhHeadingCount);
  await expectNoVisibleMojibake(page);
  expect(errors).toEqual([]);
});

test('theme docs cover tokens, algorithm, designer, and lab as documentation', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/theme/');
  await waitForNami(page);
  await expectDocsFrame(page);

  await expect(page.locator('.docs-article-content')).toContainText('density');
  await expect(page.locator('.docs-article-content')).toContainText('size');
  await expect(page.locator('.docs-article-content')).toContainText('radius');
  await expect(page.locator('.docs-article-content')).toContainText('contrast');
  await expect(page.locator('.docs-article-content')).toContainText('stylePreset');

  await page.goto('/zh-CN/theme/tokens/');
  await expectDocsFrame(page);
  await expect(page.locator('.docs-article-content')).toContainText('Reference');
  await expect(page.locator('.docs-article-content')).toContainText('Component');

  await page.goto('/zh-CN/theme/designer/');
  await expectDocsFrame(page);
  await expect(page.locator('.docs-article-content')).toContainText('Theme Designer 工作区');
  await expect(page.locator('nami-docs-code-block[data-generated-css]')).toContainText('--nami-control-height');

  await page.goto('/zh-CN/theme/lab/');
  await expectDocsFrame(page);
  await expect(page.locator('.docs-article-content')).toContainText('检查矩阵');
  await expectNoVisibleMojibake(page);
  expect(errors).toEqual([]);
});

test('component catalog and reference pages are driven by catalog plus metadata', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/components/');
  await waitForNami(page);

  await expect(page.getByRole('heading', { name: '组件总览' })).toBeVisible();
  await expect(page.locator('.component-overview-sidebar')).toBeVisible();
  await expect(page.locator('[data-component-search-input]')).toBeVisible();
  await expect(page.locator('#component-docs')).toContainText('通用');
  await expect(page.locator('#component-docs')).toContainText('布局');
  await expect(page.locator('#component-docs')).toContainText('导航');
  await expect(page.locator('#component-docs')).toContainText('数据录入');
  await expect(page.locator('#component-docs')).toContainText('数据展示');
  await expect(page.locator('#component-docs')).toContainText('反馈');
  await expect(page.locator('#component-docs')).toContainText('系统');
  await expect(page.locator('a[data-component-card="nami-button"]')).toContainText('Button 按钮');
  await expect(page.locator('[data-component-card="nami-radio-group"]')).toContainText('规划中');
  await expect(page.locator('a[data-component-card="nami-button"]')).toHaveAttribute('href', /\/zh-CN\/components\/button\//);
  await expect(page.locator('article[data-component-card="nami-radio-group"]')).toHaveAttribute('aria-disabled', 'true');

  await page.locator('[data-component-search-input]').fill('button');
  await expect(page.locator('a[data-component-card="nami-button"]')).toBeVisible();
  await expect(page.locator('[data-component-card="nami-input"]')).toBeHidden();
  await page.locator('[data-component-search-input]').fill('选择器');
  await expect(page.locator('[data-component-card="nami-select"]')).toBeVisible();
  await expect(page.locator('[data-component-card="nami-select"]')).toContainText('规划中');
  await page.locator('[data-component-search-input]').fill('zzzz-no-match');
  await expect(page.locator('[data-component-empty]')).toBeVisible();
  await page.locator('[data-component-search-input]').fill('');

  await page.goto('/zh-CN/components/button/');
  await waitForNami(page);
  await expectDocsFrame(page);
  await expect(page.locator('h1')).toHaveText('Button 按钮');
  await expect(page.locator('.docs-side-nav')).toContainText('RadioGroup 单选组');
  await expect(page.locator('.docs-side-nav .docs-nav-disabled').filter({ hasText: 'RadioGroup 单选组' })).toContainText('规划中');
  for (const id of ['overview', 'install', 'examples', 'api', 'events', 'slots', 'parts', 'tokens', 'anatomy', 'accessibility', 'related']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(page.locator('#overview')).toContainText('可用');
  await expect(page.locator('#examples')).toContainText('基础示例');
  await expect(page.locator('#examples')).toContainText('进阶示例');
  await expect(page.locator('#parts')).toContainText('CSS Parts');
  await expect(page.locator('#tokens')).toContainText('--nami-button-bg');
  await expect(page.locator('nami-docs-code-block[data-framework-example="html"]')).toBeVisible();
  await expectNoVisibleMojibake(page);
  expect(errors).toEqual([]);
});

test('resources are structured references and legacy scattered routes stay removed', async ({ page, request }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/resources/design/');
  await waitForNami(page);
  await expectDocsFrame(page);
  await expect(page.locator('.docs-article-content')).toContainText('色彩');
  await expect(page.locator('.docs-article-content')).toContainText('排版');

  await page.goto('/zh-CN/resources/changelog/');
  await expectDocsFrame(page);
  await expect(page.locator('.docs-article-content')).toContainText('0.1.0');

  await page.goto('/zh-CN/resources/faq/');
  await expectDocsFrame(page);
  await expect(page.locator('.docs-article-content')).toContainText('暂未提供');
  await expect(page.locator('.docs-article-content')).toContainText('kawaiirei0');
  await expectNoVisibleMojibake(page);

  for (const route of [
    '/zh-CN/playground/theme-designer/',
    '/zh-CN/playground/theme-lab/',
    '/zh-CN/tokens/',
    '/zh-CN/docs/components/',
    '/zh-CN/docs/quality/',
    '/zh-CN/docs/i18n/',
    '/zh-CN/docs/semantic-anatomy/'
  ]) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(404);
  }

  expect(errors).toEqual([]);
});

test('settings controls global size, code preference, and theme config export', async ({ page }) => {
  const errors = captureConsoleErrors(page);
  await openIsolated(page, '/zh-CN/settings/appearance/');
  await waitForNami(page);

  await page.locator('.settings-content [data-size-mode] button[value="lg"]').click();
  await expect(page.locator('#docs-theme')).toHaveAttribute('size', 'lg');
  await page.locator('[data-accent-input]').evaluate((element) => {
    (element as HTMLInputElement).value = '#f97316';
    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  });
  await expect(page.locator('#docs-theme')).toHaveAttribute('accent', '#f97316');

  await page.goto('/zh-CN/settings/preferences/');
  await page.locator('[data-code-example-mode] button[value="react"]').click();
  await page.goto('/zh-CN/components/button/');
  await expect(page.locator('nami-docs-code-block[data-framework-example="react"]')).toBeVisible();
  await expect(page.locator('nami-docs-code-block[data-framework-example="html"]')).toBeHidden();

  await page.goto('/zh-CN/settings/config/');
  await expect(page.locator('nami-docs-code-block[data-generated-css]')).toContainText('--nami-control-height');
  await expect(page.locator('nami-docs-code-block[data-generated-json]')).toContainText('"cssVars"');
  await expect(page.locator('nami-docs-code-block[data-generated-ts]')).toContainText('defineNamiTheme');
  await expect(page.locator('[data-theme-diagnostics]')).toContainText('Text / surface');

  await page.goto('/zh-CN/settings/about/');
  await expect(page.locator('body')).toContainText('kawaiirei0');
  await expect(page.locator('body')).toContainText('暂无赞助商配置');
  await expectNoVisibleMojibake(page);
  expect(errors).toEqual([]);
});
