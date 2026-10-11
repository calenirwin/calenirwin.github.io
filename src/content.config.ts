import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publication = { title: z.string(), published: z.boolean().default(false), description: z.string().default('') };
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({ ...publication, date: z.coerce.date(), tags: z.array(z.string()).default([]), cover: z.string().default(''), coverAlt: z.string().default('') }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({ ...publication, order: z.number().default(0), status: z.string().default(''), github: z.union([z.url(), z.literal('')]).default(''), demo: z.union([z.url(), z.literal('')]).default(''), cover: z.string().default(''), coverAlt: z.string().default('') }),
});
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({ title: z.string(), description: z.string().default(''), portrait: z.string().default(''), portraitAlt: z.string().default(''), download: z.string().default('') }),
});
export const collections = { posts, projects, pages };
