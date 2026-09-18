// Palimpsest — fold the app into one HTML file for the phone.
//
//   node build/single.mjs
//
// Runs the gates first (verify, colour audit, schedule simulation); any
// failure stops the build. Then: modules bundled by esbuild into one script,
// fonts inlined as data URIs (Latin and Latin Extended only — the questions
// need ’ and é, not Vietnamese), and the pack inlined so nothing is fetched.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = join(ROOT, 'app');
const run = (f) => execFileSync(process.execPath, [join(ROOT, 'build', f)], { stdio: 'inherit' });
run('bundle.mjs');          // runs verify.mjs itself
run('audit-colour.mjs');
run('test-schedule.mjs');

const js = (await build({
  entryPoints: [join(APP, 'js', 'app.js')], bundle: true, format: 'iife', write: false,
  minify: true, target: 'es2020', legalComments: 'none',
})).outputFiles[0].text;

let fonts = readFileSync(join(APP, 'fonts', 'fonts.css'), 'utf8')
  .split('\n').filter((l) => !/vietnamese/.test(l)).join('\n')
  .replace(/url\((([\w-]+)\.woff2)\)/g, (_, file) =>
    `url(data:font/woff2;base64,${readFileSync(join(APP, 'fonts', file)).toString('base64')})`);
const css = readFileSync(join(APP, 'styles.css'), 'utf8');
const data = readFileSync(join(APP, 'data', 'canada.json'), 'utf8');

const html = readFileSync(join(APP, 'index.html'), 'utf8')
  .replace('<link rel="stylesheet" href="fonts/fonts.css">', `<style>${fonts}</style>`)
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script type="module" src="js/app.js"></script>',
    `<script>window.__PALIMPSEST_DATA={canada:${data.replace(/<\/script/gi, '<\\/script')}};</script>\n<script>${js}</script>`);

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist', 'palimpsest.html'), html);
console.log(`wrote dist/palimpsest.html — ${(html.length / 1024).toFixed(0)} KB`);
