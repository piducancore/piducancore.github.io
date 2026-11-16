import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { home, downloads, escape } from '../src/render.mjs';
import { projects } from '../src/projects.mjs';
import { build } from '../scripts/build.mjs';
test('project pages and downloads stay on their independently deployed routes', () => {
  for (const slug of ['picadura','buffer-uppercut']) {
    const project = projects.find(p=>p.slug===slug);
    assert.equal(project.url, `https://piducan.dev/${slug}/`);
    assert.equal(project.downloads, `https://piducan.dev/${slug}/downloads/`);
    assert.ok(downloads().includes(project.downloads));
  }
  assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);
});
test('HTML escaping handles authored data safely', () => {
  assert.equal(escape('<img onerror="x"> & \'x\''),'&lt;img onerror=&quot;x&quot;&gt; &amp; &#39;x&#39;');
});
test('all projects remain available without JavaScript', () => {
  const html = home();
  assert.equal((html.match(/class="project-row"/g)||[]).length,projects.length);
  assert.ok(html.includes('aria-label="Filter projects" hidden'));
  assert.ok(!html.includes('class="project-row" hidden'));
});
test('root build preserves custom domain and never occupies project directories', async () => {
  await build();
  const files = await readdir('dist');
  for (const route of ['picadura','buffer-uppercut','orgdot-webfonts']) assert.ok(!files.includes(route));
  assert.equal(await readFile('dist/CNAME','utf8'),'piducan.dev\n');
  for (const page of ['index.html','downloads/index.html','404.html']) {
    const html = await readFile(`dist/${page}`,'utf8');
    for (const [,asset] of html.matchAll(/(?:href|src)="(\/assets\/[^\"]+)"/g)) await readFile(`dist${asset}`);
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  }
});
