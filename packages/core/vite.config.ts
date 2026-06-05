import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const componentSlugs = [
  'config',
  'theme',
  'spinner',
  'page-transition',
  'top-progress',
  'scroll-smoother',
  'illustration',
  'empty',
  'result',
  'card',
  'badge',
  'button',
  'icon-button',
  'chip',
  'input',
  'switch',
  'radio-item',
  'radio-group',
  'radio-card',
  'tab-bar',
  'dialog',
  'drawer',
  'tooltip',
  'toast',
  'app-shell',
  'container',
  'stack',
  'cluster',
  'grid',
  'split',
  'divider',
  'checkbox',
  'textarea',
  'form-field',
  'alert',
  'skeleton',
  'progress'
];

const componentEntries = Object.fromEntries(
  componentSlugs.map((slug) => [`components/${slug}`, resolve(__dirname, `src/components/${slug}.ts`)])
);

const componentRegisterEntries = Object.fromEntries(
  componentSlugs.flatMap((slug) => [
    [slug, resolve(__dirname, `src/register/${slug}.ts`)],
    [`register/${slug}`, resolve(__dirname, `src/register/${slug}.ts`)]
  ])
);

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  events: resolve(__dirname, 'src/events.ts'),
  register: resolve(__dirname, 'src/register.ts'),
  themes: resolve(__dirname, 'src/themes.ts'),
  metadata: resolve(__dirname, 'src/metadata.ts'),
  anatomy: resolve(__dirname, 'src/anatomy.ts'),
  catalog: resolve(__dirname, 'src/catalog.ts'),
  localize: resolve(__dirname, 'src/localize.ts'),
  ...componentRegisterEntries,
  ...componentEntries
};

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js', '@lit/localize', '@nami-web/tokens/theme', '@nami-web/themes', 'lenis'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    }
  }
});
