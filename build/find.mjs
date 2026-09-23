// Palimpsest — find a passage to build a question on.
//
//   node build/find.mjs "slave trade" wh2-6         # search, optionally in one section prefix
//   node build/find.mjs --p wh2-6.1-p12             # print one paragraph whole
//   node build/find.mjs --key wh2-8                 # the authors' own summaries in a chapter
//
// Everything a question claims has to come from a paragraph in corpus/, so the
// writing always starts here rather than from memory.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const paras = [];
for (const f of readdirSync(join(ROOT, 'corpus'))) {
  const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
  for (const c of book.chapters) for (const s of c.sections) for (const p of s.paras) paras.push({ ...p, sec: s.title, ch: c.title, book: book.source.id });
}

const args = process.argv.slice(2);
const mode = args[0]?.startsWith('--') ? args.shift() : '';
const [term, prefix] = args;
const show = (p, n) => console.log(`\n── ${p.id}  (${p.book} · ${p.ch} › ${p.sec})${p.key ? '  ★key' : ''}\n${n ? p.text.slice(0, n) : p.text}`);

if (mode === '--p') {
  for (const id of args) { const p = paras.find((x) => x.id === id); p ? show(p) : console.log(`${id}: not found`); }
} else if (mode === '--key') {
  for (const p of paras) if (p.key && p.id.startsWith(term)) show(p, 600);
} else {
  const rx = new RegExp(term, 'i');
  let n = 0;
  for (const p of paras) {
    if (prefix && !p.id.startsWith(prefix)) continue;
    if (!rx.test(p.text)) continue;
    if (++n > 30) { console.log('\n… more matches; narrow the search'); break; }
    show(p, 700);
  }
  if (!n) console.log('nothing found');
}
