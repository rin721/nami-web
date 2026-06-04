import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const coreRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const workspaceRoot = resolve(coreRoot, '../..');
const corePackage = JSON.parse(await readFile(resolve(coreRoot, 'package.json'), 'utf8'));
const version = corePackage.version;
const cdnRoot = resolve(workspaceRoot, 'artifacts/cdn/nami-ui', version);

const files = {
  global: 'nami-ui.global.js',
  esmRegister: 'esm/register.js',
  css: {
    default: 'css/default.css',
    antIllustration: 'css/ant-illustration.css',
    critical: 'css/critical.css'
  }
};

const copies = [
  [resolve(workspaceRoot, 'packages/themes/dist/default.css'), resolve(cdnRoot, files.css.default)],
  [resolve(workspaceRoot, 'packages/themes/dist/ant-illustration.css'), resolve(cdnRoot, files.css.antIllustration)],
  [resolve(coreRoot, 'src/critical.css'), resolve(cdnRoot, files.css.critical)]
];

for (const [, destination] of copies) {
  await mkdir(dirname(destination), { recursive: true });
}

for (const [source, destination] of copies) {
  await copyFile(source, destination);
}

const basePath = `nami-ui/${version}/`;
const manifest = {
  name: '@nami/ui',
  version,
  basePath,
  files,
  usage: {
    global: {
      css: `${basePath}${files.css.default}`,
      script: `${basePath}${files.global}`
    },
    globalWithCriticalCss: {
      criticalCss: `${basePath}${files.css.critical}`,
      css: `${basePath}${files.css.default}`,
      script: `${basePath}${files.global}`
    },
    esm: {
      css: `${basePath}${files.css.default}`,
      script: `${basePath}${files.esmRegister}`
    }
  }
};

await writeFile(resolve(cdnRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
