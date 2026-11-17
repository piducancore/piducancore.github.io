import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { build } from './build.mjs';
const root = resolve('dist');
const production = process.argv.includes('--production');
await build();
const types = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8','.xml':'application/xml' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!production && (pathname === '/' || pathname === '/downloads/' || pathname === '/404.html')) await promisify(execFile)(process.execPath, ['scripts/build.mjs']);
    let path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(path)).isDirectory()) path = resolve(path,'index.html');
    const body = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });res.end(body);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));
  }
}).listen(4321,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4321'));
