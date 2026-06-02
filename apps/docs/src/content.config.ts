import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    group: z.string().default('Guide'),
    order: z.number().default(999),
    description: z.string().optional()
  })
});

export const collections = { docs };
