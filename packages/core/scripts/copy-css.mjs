import { copyFile, mkdir } from 'node:fs/promises';

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await copyFile(
  new URL('../src/critical.css', import.meta.url),
  new URL('../dist/critical.css', import.meta.url)
);
