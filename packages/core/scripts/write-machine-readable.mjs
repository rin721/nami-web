import { mkdir, writeFile } from 'node:fs/promises';

const distUrl = new URL('../dist/', import.meta.url);
const { rlComponentAnatomy } = await import('../dist/anatomy.js');

const themeSeedSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://rin-labs.local/schemas/rin-ui.theme.schema.json',
  title: 'Rin UI Theme Seed',
  type: 'object',
  additionalProperties: false,
  properties: {
    accent: {
      type: 'string',
      pattern: '^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$',
      default: '#3b82f6'
    },
    mode: {
      type: 'string',
      enum: ['light', 'dark'],
      default: 'light'
    },
    stylePreset: {
      type: 'string',
      enum: ['default', 'illustration'],
      default: 'default'
    },
    density: {
      type: 'string',
      enum: ['comfortable', 'compact'],
      default: 'comfortable'
    },
    motion: {
      type: 'string',
      enum: ['normal', 'reduced'],
      default: 'normal'
    },
    radius: {
      type: 'string',
      enum: ['sharp', 'soft', 'round'],
      default: 'round'
    },
    contrast: {
      type: 'string',
      enum: ['normal', 'high'],
      default: 'normal'
    }
  }
};

await mkdir(distUrl, { recursive: true });
await writeFile(new URL('rin-ui.anatomy.json', distUrl), `${JSON.stringify(rlComponentAnatomy, null, 2)}\n`);
await writeFile(new URL('rin-ui.theme.schema.json', distUrl), `${JSON.stringify(themeSeedSchema, null, 2)}\n`);
