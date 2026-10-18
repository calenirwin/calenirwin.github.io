import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getEntry } from 'astro:content';
import { publishedPosts } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const page = (await getEntry('pages', 'blog'))!;
  return rss({
    title: page.data.title,
    description: page.data.description,
    site: site!,
    items: (await publishedPosts()).map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-ca</language>',
  });
};
