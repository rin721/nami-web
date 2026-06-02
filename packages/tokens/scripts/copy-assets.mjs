import { copyFile, mkdir } from 'node:fs/promises';

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await copyFile(
  new URL('../src/tokens.dtcg.json', import.meta.url),
  new URL('../dist/tokens.dtcg.json', import.meta.url)
);
