import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@nami/tokens/theme': fileURLToPath(new URL('../tokens/src/theme.ts', import.meta.url)),
      '@nami/tokens': fileURLToPath(new URL('../tokens/src/index.ts', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom'
  }
});
