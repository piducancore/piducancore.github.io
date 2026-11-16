import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { home, downloads, notFound } from '../src/render.mjs';
export async function build() {
  const out = new URL('../dist/', import.meta.url);
  await rm(out, { recursive: true, force: true });
  await mkdir(new URL('downloads/', out), { recursive: true });
  await cp(new URL('../public/', import.meta.url), out, { recursive: true });
  await Promise.all([
    writeFile(new URL('index.html', out), home()),
    writeFile(new URL('downloads/index.html', out), downloads()),
    writeFile(new URL('404.html', out), notFound()),
    writeFile(new URL('CNAME', out), 'piducan.dev\n'),
    writeFile(new URL('.nojekyll', out), ''),
    writeFile(new URL('robots.txt', out), 'User-agent: *\nAllow: /\nSitemap: https://piducan.dev/sitemap.xml\n'),
    writeFile(new URL('sitemap.xml', out), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://piducan.dev/</loc></url><url><loc>https://piducan.dev/downloads/</loc></url></urlset>')
  ]);
  console.log('Built homepage, downloads, and 404 into dist/.');
}
if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) await build();
