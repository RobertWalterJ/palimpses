// Palimpsest — package verified questions for the app.
//
//   node build/bundle.mjs      (runs verify first; refuses to write if it fails)
//
// Each question travels with everything the reveal card needs to show where it
// came from: the quoted words, the whole paragraph around them, the section's
// title and link, and the source's credit line. The app never has to look
// anything up, and never shows a claim without its citation.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, [join(ROOT, 'build', 'verify.mjs')], { stdio: 'inherit' });

const PARA = new Map();
const CHAPTER_OF = new Map();
for (const f of readdirSync(join(ROOT, 'corpus'))) {
  const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
  const cite = `${book.source.author}, ${book.source.title} (${book.source.publisher}, ${book.source.year}), ${book.source.licence}`;
  for (const c of book.chapters) for (const s of c.sections) for (const p of s.paras) {
    PARA.set(p.id, { text: p.text, sec: `${s.num} ${s.title}`, url: s.url, cite });
    CHAPTER_OF.set(p.id, c);
  }
}

const PACKS = [
  {
    id: 'canada', title: 'Canada', dir: 'content/canada',
    blurb: 'Fourteen thousand years deep. It starts with the nations, their records and their cities — not with Cartier.',
  },
];

// Our names for the chapters. The book's 2015 titles use "Aboriginal"; the app
// uses nations' own names in its questions and plain titles here. The book's
// own title is still carried (`book`) and shown with the citation.
const CHAPTER_TITLE = {
  'ch02-before-contact': 'Before contact',
};

const evOut = (e) => {
  const p = PARA.get(e.p);
  return { quote: e.q, para: p.text, sec: p.sec, url: p.url, cite: p.cite };
};

mkdirSync(join(ROOT, 'app', 'data'), { recursive: true });
for (const pack of PACKS) {
  const files = readdirSync(join(ROOT, pack.dir)).filter((f) => f.endsWith('.mjs')).sort();
  const questions = [];
  const chapters = [];
  for (const f of files) {
    const qs = (await import(pathToFileURL(join(ROOT, pack.dir, f)).href)).default;
    const firstP = qs[0].ev?.[0]?.p || qs[0].items?.[0]?.ev.p;
    const ch = CHAPTER_OF.get(firstP);
    const chId = f.replace(/\.mjs$/, '');
    chapters.push({ id: chId, title: CHAPTER_TITLE[chId] || (ch ? ch.title : chId), book: ch ? ch.title : null, n: ch?.n ?? null });
    for (const q of qs) {
      const base = { id: `${pack.id}/${q.id}`, ch: chId, kind: q.kind, prompt: q.prompt, lens: q.lens || [] };
      if (q.kind === 'order') {
        questions.push({ ...base, items: q.items.map((it) => ({ label: it.label, at: it.at, when: it.when || null, ev: evOut(it.ev) })) });
      } else {
        questions.push({ ...base, answer: q.answer, options: q.options, ev: q.ev.map(evOut) });
      }
    }
  }
  const out = { id: pack.id, title: pack.title, blurb: pack.blurb, chapters, questions };
  writeFileSync(join(ROOT, 'app', 'data', pack.id + '.json'), JSON.stringify(out));
  console.log(`wrote app/data/${pack.id}.json — ${questions.length} questions in ${chapters.length} chapter(s)`);
}
