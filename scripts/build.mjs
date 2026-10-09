import { mkdir, copyFile, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
const output = path.resolve('public');
await mkdir(output, { recursive: true });
// Explicit public allowlist: server modules, API source, manifests and secrets never ship.
const files = ['index.html','app.js','theme.js','style.css','modern.css','modern.js','data.json','sw.js','SECURITY.md','admin-ui.js','admin-ui.css'];
for (const file of files) await copyFile(file, path.join(output, file));
for (const dir of ['documents','notes','assets']) {
  if (existsSync(dir)) await cp(dir, path.join(output, dir), { recursive: true });
}
await mkdir(path.join(output, 'ads'), { recursive: true });
await copyFile('ads/controller.js', path.join(output, 'ads/controller.js'));
console.log('Built public assets; backend source and private storage are excluded.');
