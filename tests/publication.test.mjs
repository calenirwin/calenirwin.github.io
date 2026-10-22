import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { parse } from 'yaml';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

const root = process.cwd();
const read = p => readFileSync(join(root, p), 'utf8');
const build = () => execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, stdio: 'pipe' });
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(d => d.isDirectory() ? files(join(dir, d.name)) : [join(dir, d.name)]); }
const xml = path => {
  const source = read(path);
  assert.equal(XMLValidator.validate(source), true, path);
  return new XMLParser().parse(source);
};
const array = value => value === undefined ? [] : Array.isArray(value) ? value : [value];
const sitemapUrls = () => array(xml('dist/sitemap-0.xml').urlset.url).map(item => item.loc);
const frontmatter = path => parse(read(path).match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);

test('CMS content paths and publication fields match the site', () => {
  const config = parse(read('.pages.yml'));
  for (const entry of config.content) assert.ok(existsSync(entry.path), entry.path);
  for (const name of ['posts', 'projects']) {
    const collection = config.content.find(c => c.name === name);
    assert.equal(collection.fields.find(f => f.name === 'published').default, false);
    assert.equal(collection.fields.find(f => f.name === 'body').type, 'rich-text');
  }
  assert.equal(config.media.find(m => m.name === 'images').input, 'public/uploads');
  assert.equal(config.media.find(m => m.name === 'images').output, '/uploads');
  assert.equal(config.media.find(m => m.name === 'documents').output, '/files');
  for (const name of ['home', 'blog_page', 'projects_page', 'about', 'cv', 'settings']) {
    const file = config.content.find(c => c.name === name);
    assert.equal(file.operations.create, false);
    assert.equal(file.operations.delete, false);
  }
});

test('publishing, unpublishing, MDX, Markdown sanitization, and clean exported links', () => {
  const fixtures = {
    'content/blog/verification-published.md': '---\ntitle: Published fixture\npublished: true\ndate: "2026-10-11"\n---\n\nVisible article fixture.\n\n**Strong text**\n\n![Image](/favicon.svg)\n\n<script>alert("UNSAFE_SCRIPT")</script>\n',
    'content/blog/verification-draft.md': '---\ntitle: DRAFT_SENTINEL_724\npublished: false\ndate: "2026-10-11"\n---\n\nDRAFT_SENTINEL_724\n',
    'content/blog/verification-default.md': '---\ntitle: DEFAULT_DRAFT_SENTINEL_724\ndate: "2026-10-11"\n---\n\nDEFAULT_DRAFT_SENTINEL_724\n',
    'content/blog/verification-mdx.mdx': '---\ntitle: MDX fixture\npublished: true\ndate: "2026-10-11"\n---\n\nexport const total = 6 * 7;\n\nThe answer is {total}.\n',
    'content/blog/verification-xml.md': '---\ntitle: "XML & <escaping>"\npublished: true\ndate: "2026-10-18"\ndescription: "A summary with & and <markup>."\n---\n\nAn XML escaping fixture.\n',
    'content/projects/verification-project.md': '---\ntitle: PROJECT_DRAFT_SENTINEL_724\npublished: false\n---\n\nPROJECT_DRAFT_SENTINEL_724\n',
  };
  for (const path of Object.keys(fixtures)) assert.ok(!existsSync(path), `Test fixture already exists: ${path}`);
  try {
    for (const [path, content] of Object.entries(fixtures)) writeFileSync(path, content);
    build();
    const article = read('dist/blog/verification-published/index.html');
    assert.match(article, /href="\/blog\/" aria-current="location"/);
    assert.match(read('dist/blog/index.html'), /href="\/blog\/" aria-current="page"/);
    assert.match(article, /<strong>Strong text<\/strong>/);
    assert.match(article, /src="\/favicon.svg"/);
    assert.doesNotMatch(article, /UNSAFE_SCRIPT/);
    assert.match(read('dist/blog/verification-mdx/index.html'), /The answer is 42/);
    assert.doesNotMatch(read('dist/index.html'), /Published fixture/);
    assert.match(read('dist/blog/index.html'), /Published fixture/);
    const feed = xml('dist/rss.xml').rss.channel;
    const items = array(feed.item);
    assert.equal(feed.title, frontmatter('content/pages/blog.md').title);
    const escapedItem = items.find(item => item.link.endsWith('/verification-xml/'));
    assert.equal(escapedItem.title, 'XML & <escaping>');
    assert.equal(escapedItem.description, 'A summary with & and <markup>.');
    for (let i = 1; i < items.length; i++) assert.ok(Date.parse(items[i - 1].pubDate) >= Date.parse(items[i].pubDate));
    assert.ok(items.some(item => item.link === 'https://calenirwin.com/blog/verification-published/'));
    assert.ok(items.some(item => item.link === 'https://calenirwin.com/blog/verification-mdx/'));
    assert.ok(sitemapUrls().includes('https://calenirwin.com/blog/verification-published/'));
    assert.match(article, /property="og:type" content="article"/);
    assert.match(article, /property="article:published_time" content="2026-10-11T00:00:00.000Z"/);
    for (const slug of ['verification-draft', 'verification-default']) assert.ok(!existsSync(`dist/blog/${slug}/index.html`));
    assert.ok(!existsSync('dist/projects/verification-project/index.html'));
    for (const f of files('dist').filter(f => /\.(html|js|json|xml|txt)$/.test(f))) {
      assert.doesNotMatch(readFileSync(f, 'utf8'), /DRAFT_SENTINEL_724|verification-draft|verification-default|verification-project/);
    }
  } finally {
    for (const path of Object.keys(fixtures)) if (existsSync(path)) unlinkSync(path);
    build();
  }
  // A clean rebuild also proves a formerly published route is removed.
  assert.ok(!existsSync('dist/blog/verification-published/index.html'));
  assert.ok(!existsSync('dist/blog/lorem-ipsum/index.html'));
  const cleanItems = array(xml('dist/rss.xml').rss.channel.item);
  const expectedLinks = readdirSync('content/blog').filter(file => /\.(md|mdx)$/.test(file))
    .filter(file => frontmatter(`content/blog/${file}`).published === true)
    .map(file => `https://calenirwin.com/blog/${file.replace(/\.(md|mdx)$/, '')}/`);
  assert.deepEqual(cleanItems.map(item => item.link).sort(), expectedLinks.sort());
  const locations = sitemapUrls();
  for (const link of expectedLinks) assert.ok(locations.includes(link));
  for (const location of locations) {
    assert.equal(new URL(location).origin, 'https://calenirwin.com');
    assert.ok(existsSync(join('dist', new URL(location).pathname, 'index.html')));
  }
  assert.ok(!locations.some(location => /404|lorem-ipsum|verification-/.test(location)));
  assert.match(read('dist/robots.txt'), /Sitemap: https:\/\/calenirwin.com\/sitemap-index.xml/);
  for (const f of files('dist').filter(f => /\.(html|js|json|xml|txt)$/.test(f))) {
    assert.doesNotMatch(readFileSync(f, 'utf8'), /verification-/);
  }
  for (const f of files('dist').filter(f => f.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    assert.match(html, /class="skip-link" href="#main"/);
    assert.match(html, /<main id="main" tabindex="-1">/);
    assert.doesNotMatch(html, /Published fixture|MDX fixture|Research data scientist|The Unreasonable Effectiveness/);
    assert.match(html, /rel="alternate" type="application\/rss\+xml"/);
    assert.match(html, /rel="canonical" href="https:\/\/calenirwin.com\//);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"\s]*"/g)) {
      if (match[1].startsWith('//')) continue;
      const target = resolve('dist', '.' + decodeURI(match[1]));
      assert.ok(existsSync(target) || existsSync(join(target, 'index.html')), `${f}: ${match[1]}`);
    }
  }
});
