import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const workspaceRoot = process.cwd();
const version = '0.1.0';
const cdnRoot = join(workspaceRoot, 'artifacts/cdn/nami-ui', version);
const docsPublicCdnRoot = join(workspaceRoot, 'apps/docs/public/cdn/nami-ui', version);
const cdnBase = `http://127.0.0.1:5173/cdn/nami-ui/${version}`;

test.describe.configure({ mode: 'serial', timeout: 120_000 });

test.beforeAll(() => {
  execSync('npm run build:cdn', { cwd: workspaceRoot, stdio: 'pipe' });
});

function collectJsFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) return collectJsFiles(path);
    return path.endsWith('.js') ? [path] : [];
  });
}

async function serveCdnArtifacts(page: Page) {
  await page.route('**/cdn/nami-ui/**', async (route) => {
    const url = new URL(route.request().url());
    const relativePath = url.pathname.replace(`/cdn/nami-ui/${version}/`, '').replace(/\//g, '\\');
    const filePath = join(cdnRoot, relativePath);
    if (!existsSync(filePath)) {
      await route.fulfill({ status: 404, body: 'Not found' });
      return;
    }

    const contentType = filePath.endsWith('.css')
      ? 'text/css'
      : filePath.endsWith('.json')
        ? 'application/json'
        : 'text/javascript';
    await route.fulfill({ path: filePath, contentType });
  });
}

test('build:cdn emits global, ESM, CSS, and manifest artifacts without bare imports', () => {
  const requiredFiles = [
    'nami-ui.global.js',
    'esm/register.js',
    'esm/components/button.js',
    'esm/components/input.js',
    'css/default.css',
    'css/ant-illustration.css',
    'css/critical.css',
    'manifest.json'
  ];

  for (const file of requiredFiles) {
    expect(existsSync(join(cdnRoot, file)), file).toBe(true);
  }

  const manifest = JSON.parse(readFileSync(join(cdnRoot, 'manifest.json'), 'utf8'));
  expect(manifest).toMatchObject({
    name: '@nami/ui',
    version,
    basePath: `cdn/nami-ui/${version}/`,
    publicBaseUrl: `https://aoi-wen.iqwq.com/cdn/nami-ui/${version}/`,
    files: {
      global: 'nami-ui.global.js',
      esmRegister: 'esm/register.js'
    }
  });

  expect(existsSync(join(docsPublicCdnRoot, 'manifest.json'))).toBe(true);
  expect(existsSync(join(docsPublicCdnRoot, 'nami-ui.global.js'))).toBe(true);
  expect(existsSync(join(docsPublicCdnRoot, 'esm/register.js'))).toBe(true);
  expect(existsSync(join(docsPublicCdnRoot, 'css/default.css'))).toBe(true);

  for (const file of collectJsFiles(cdnRoot)) {
    const source = readFileSync(file, 'utf8');
    expect(source, file).not.toMatch(/\bfrom\s*["'](?:lit|@lit\/localize|@nami\/)/);
    expect(source, file).not.toMatch(/\bimport\s*\(\s*["'](?:lit|@lit\/localize|@nami\/)/);
  }
});

test('global CDN script registers components and applies default theme CSS', async ({ page }) => {
  await serveCdnArtifacts(page);
  await page.setContent(`
    <link rel="stylesheet" href="${cdnBase}/css/default.css" />
    <script src="${cdnBase}/nami-ui.global.js"></script>
    <nami-button>Hello Nami</nami-button>
  `);

  await page.waitForFunction(() => customElements.get('nami-button') && customElements.get('nami-theme'));
  await expect(page.locator('nami-button')).toBeVisible();

  const state = await page.evaluate(() => {
    const button = document.querySelector('nami-button');
    return {
      hasGlobal: Boolean((window as Window & { NamiUI?: unknown }).NamiUI),
      registered: Boolean(customElements.get('nami-button')),
      primary: getComputedStyle(document.documentElement).getPropertyValue('--nami-color-primary').trim(),
      buttonDisplay: button ? getComputedStyle(button).display : ''
    };
  });

  expect(state).toEqual({
    hasGlobal: true,
    registered: true,
    primary: '#3b82f6',
    buttonDisplay: 'inline-flex'
  });
});

test('ESM CDN register entry defines the component set', async ({ page }) => {
  await serveCdnArtifacts(page);
  await page.setContent(`
    <link rel="stylesheet" href="${cdnBase}/css/default.css" />
    <script type="module" src="${cdnBase}/esm/register.js"></script>
    <nami-button>Hello ESM</nami-button>
  `);

  await page.waitForFunction(() =>
    customElements.get('nami-button') &&
    customElements.get('nami-card') &&
    customElements.get('nami-theme') &&
    customElements.get('nami-input')
  );

  await expect(page.locator('nami-button')).toBeVisible();
  await expect(page.locator('nami-button')).toContainText('Hello ESM');
});
