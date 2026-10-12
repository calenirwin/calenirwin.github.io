import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
const read = p => readFileSync(join(root, p), 'utf8');
const build = () => execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, stdio: 'pipe' });
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(d => d.isDirectory() ? files(join(dir, d.name)) : [join(dir, d.name)]); }

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
    'content/projects/verification-project.md': '---\ntitle: PROJECT_DRAFT_SENTINEL_724\npublished: false\n---\n\nPROJECT_DRAFT_SENTINEL_724\n',
  };
  for (const path of Object.keys(fixtures)) assert.ok(!existsSync(path), `Test fixture already exists: ${path}`);
  try {
    for (const [path, content] of Object.entries(fixtures)) writeFileSync(path, content);
    build();
    const article = read('dist/blog/verification-published/index.html');
    assert.match(article, /<strong>Strong text<\/strong>/);
    assert.match(article, /src="\/favicon.svg"/);
    assert.doesNotMatch(article, /UNSAFE_SCRIPT/);
    assert.match(read('dist/blog/verification-mdx/index.html'), /The answer is 42/);
    assert.doesNotMatch(read('dist/index.html'), /Published fixture/);
    assert.match(read('dist/blog/index.html'), /Published fixture/);
    for (const slug of ['verification-draft', 'verification-default']) assert.ok(!existsSync(`dist/blog/${slug}/index.html`));
    assert.ok(!existsSync('dist/projects/verification-project/index.html'));
    for (const f of files('dist').filter(f => /\.(html|js|json|xml|txt)$/.test(f))) assert.doesNotMatch(readFileSync(f, 'utf8'), /DRAFT_SENTINEL_724/);
  } finally {
    for (const path of Object.keys(fixtures)) if (existsSync(path)) unlinkSync(path);
    build();
  }
  // A clean rebuild also proves a formerly published route is removed.
  assert.ok(!existsSync('dist/blog/verification-published/index.html'));
  assert.ok(!existsSync('dist/blog/lorem-ipsum/index.html'));
  for (const f of files('dist').filter(f => f.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    assert.doesNotMatch(html, /Published fixture|MDX fixture|Research data scientist|The Unreasonable Effectiveness/);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"\s]*"/g)) {
      if (match[1].startsWith('//')) continue;
      const target = resolve('dist', '.' + decodeURI(match[1]));
      assert.ok(existsSync(target) || existsSync(join(target, 'index.html')), `${f}: ${match[1]}`);
    }
  }
});
