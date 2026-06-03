import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docSchema = z.object({
  title: z.string(),
  group: z.string().default('Guide'),
  order: z.number().default(999),
  description: z.string().optional()
});

const start = defineCollection({
  loader: glob({ base: './src/content/start', pattern: '**/*.{md,mdx}' }),
  schema: docSchema
});

const theme = defineCollection({
  loader: glob({ base: './src/content/theme', pattern: '**/*.{md,mdx}' }),
  schema: docSchema
});

const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.{md,mdx}' }),
  schema: docSchema
});

export const collections = { start, theme, resources };
