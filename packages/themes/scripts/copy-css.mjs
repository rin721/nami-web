import { mkdir, copyFile } from 'node:fs/promises';

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await copyFile(
  new URL('../src/default.css', import.meta.url),
  new URL('../dist/default.css', import.meta.url)
);
await copyFile(
  new URL('../src/ant-illustration.css', import.meta.url),
  new URL('../dist/ant-illustration.css', import.meta.url)
);
