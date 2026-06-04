import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8')) as { version: string };
const cdnOutDir = resolve(__dirname, '../../artifacts/cdn/nami-ui', packageJson.version);

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  events: resolve(__dirname, 'src/events.ts'),
  register: resolve(__dirname, 'src/register.ts'),
  themes: resolve(__dirname, 'src/themes.ts'),
  metadata: resolve(__dirname, 'src/metadata.ts'),
  anatomy: resolve(__dirname, 'src/anatomy.ts'),
  catalog: resolve(__dirname, 'src/catalog.ts'),
  localize: resolve(__dirname, 'src/localize.ts'),
  'register/button': resolve(__dirname, 'src/register/button.ts'),
  'components/config': resolve(__dirname, 'src/components/config.ts'),
  'components/theme': resolve(__dirname, 'src/components/theme.ts'),
  'components/spinner': resolve(__dirname, 'src/components/spinner.ts'),
  'components/page-transition': resolve(__dirname, 'src/components/page-transition.ts'),
  'components/top-progress': resolve(__dirname, 'src/components/top-progress.ts'),
  'components/scroll-header': resolve(__dirname, 'src/components/scroll-header.ts'),
  'components/scroll-reveal': resolve(__dirname, 'src/components/scroll-reveal.ts'),
  'components/hero-stage': resolve(__dirname, 'src/components/hero-stage.ts'),
  'components/illustration': resolve(__dirname, 'src/components/illustration.ts'),
  'components/empty': resolve(__dirname, 'src/components/empty.ts'),
  'components/result': resolve(__dirname, 'src/components/result.ts'),
  'components/card': resolve(__dirname, 'src/components/card.ts'),
  'components/badge': resolve(__dirname, 'src/components/badge.ts'),
  'components/button': resolve(__dirname, 'src/components/button.ts'),
  'components/icon-button': resolve(__dirname, 'src/components/icon-button.ts'),
  'components/chip': resolve(__dirname, 'src/components/chip.ts'),
  'components/input': resolve(__dirname, 'src/components/input.ts'),
  'components/switch': resolve(__dirname, 'src/components/switch.ts'),
  'components/radio-card': resolve(__dirname, 'src/components/radio-card.ts'),
  'components/tab-bar': resolve(__dirname, 'src/components/tab-bar.ts'),
  'components/dialog': resolve(__dirname, 'src/components/dialog.ts'),
  'components/drawer': resolve(__dirname, 'src/components/drawer.ts'),
  'components/toast': resolve(__dirname, 'src/components/toast.ts'),
  'components/app-shell': resolve(__dirname, 'src/components/app-shell.ts'),
  'components/container': resolve(__dirname, 'src/components/container.ts'),
  'components/stack': resolve(__dirname, 'src/components/stack.ts'),
  'components/cluster': resolve(__dirname, 'src/components/cluster.ts'),
  'components/grid': resolve(__dirname, 'src/components/grid.ts'),
  'components/split': resolve(__dirname, 'src/components/split.ts'),
  'components/checkbox': resolve(__dirname, 'src/components/checkbox.ts'),
  'components/textarea': resolve(__dirname, 'src/components/textarea.ts'),
  'components/form-field': resolve(__dirname, 'src/components/form-field.ts'),
  'components/alert': resolve(__dirname, 'src/components/alert.ts'),
  'components/skeleton': resolve(__dirname, 'src/components/skeleton.ts'),
  'components/progress': resolve(__dirname, 'src/components/progress.ts')
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
