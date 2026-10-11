import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';

export default defineConfig({
  site: 'https://calenirwin.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx({ extendMarkdownConfig: false })],
  markdown: { processor: unified({ rehypePlugins: [rehypeSanitize] }) },
});
