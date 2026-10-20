import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Koamishin Collective'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    /** Optional interactive embed rendered after the markdown body. */
    showcase: z.enum(['opensinop']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
