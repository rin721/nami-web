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
