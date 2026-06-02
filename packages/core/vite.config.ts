import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  events: resolve(__dirname, 'src/events.ts'),
  register: resolve(__dirname, 'src/register.ts'),
  themes: resolve(__dirname, 'src/themes.ts'),
  metadata: resolve(__dirname, 'src/metadata.ts'),
  'components/theme': resolve(__dirname, 'src/components/theme.ts'),
  'components/spinner': resolve(__dirname, 'src/components/spinner.ts'),
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
  'components/app-shell': resolve(__dirname, 'src/components/app-shell.ts')
};

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    }
  }
});
