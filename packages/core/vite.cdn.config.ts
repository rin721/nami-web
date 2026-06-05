import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8')) as { version: string };
const cdnOutDir = resolve(__dirname, '../../artifacts/cdn/nami-ui', packageJson.version);

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

export default defineConfig(({ mode }) => {
  if (mode === 'cdn-esm') {
    return {
      build: {
        outDir: cdnOutDir,
        emptyOutDir: false,
        lib: {
          entry: entries,
          formats: ['es']
        },
        rollupOptions: {
          output: {
            entryFileNames: 'esm/[name].js',
            chunkFileNames: 'esm/chunks/[name]-[hash].js'
          }
        }
      }
    };
  }

  return {
    build: {
      outDir: cdnOutDir,
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'src/cdn.ts'),
        name: 'NamiUI',
        formats: ['iife'],
        fileName: () => 'nami-ui.global.js'
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true
        }
      }
    }
  };
});
