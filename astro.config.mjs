import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://calenirwin.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx({ extendMarkdownConfig: false }), sitemap()],
  markdown: { processor: unified({ rehypePlugins: [rehypeSanitize] }) },
});
