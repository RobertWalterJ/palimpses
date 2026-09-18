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
  'ch05-contact': 'Contact, on the nations’ terms',
  'ch04-new-france': 'New France, inside other worlds',
};

const evOut = (e) => {
  const p = PARA.get(e.p);
  return { quote: e.q, p: e.p, para: p.text, sec: p.sec, url: p.url, cite: p.cite };
};

mkdirSync(join(ROOT, 'app', 'data'), { recursive: true });
for (const pack of PACKS) {
  const files = readdirSync(join(ROOT, pack.dir)).filter((f) => f.endsWith('.mjs')).sort();
  const questions = [];
  const chapters = [];
  let entries = [];
  for (const f of files) {
    const qs = (await import(pathToFileURL(join(ROOT, pack.dir, f)).href)).default;
    if (qs.length && qs[0].lead) { entries = qs; continue; }   // the library, not questions
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
  writeLibrary(pack, entries);
}

// ── the reference library ────────────────────────────────────────────────
// Both books in full, reading order; the authors' own glossary; and the
// peoples-and-periods entries with every passage that mentions each. Entries
// carry paragraph ids only — the app looks the text up in the books — so the
// text is stored once.
function writeLibrary(pack, entries) {
  const books = [];
  const glossary = [];
  for (const f of ['pre.json', 'post.json']) {
    const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
    const src = book.source;
    books.push({
      id: src.id, title: src.title, author: src.author, year: src.year, licence: src.licence, web: src.web.replace(/chapter\/$/, ''),
      chapters: book.chapters.map((c) => ({
        n: c.n, title: c.title,
        sections: c.sections.map((s) => ({
          id: s.id, num: s.num, title: s.title, url: s.url,
          paras: s.paras.filter((p) => p.under !== 'Key Terms').map((p) => ({ id: p.id, t: p.text, h: p.under || null, k: p.key ? 1 : 0, ...(p.notes ? { n: p.notes } : {}) })),
        })).filter((s) => s.paras.length),
      })),
    });
    for (const c of book.chapters) for (const s of c.sections) for (const p of s.paras) {
      if (p.under !== 'Key Terms') continue;
      const m = p.text.match(/^([^:]{1,70}):\s+(.+)$/);
      if (m) glossary.push({ term: m[1].trim(), def: m[2].trim(), id: p.id, book: src.id, sec: `${s.num} ${s.title}`, url: s.url });
    }
  }
  // The same term is defined in several chapters; keep every definition, since
  // they differ with context (potlatch is defined three times).
  glossary.sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));

  const where = new Map();
  for (const b of books) for (const c of b.chapters) for (const s of c.sections) for (const p of s.paras) {
    where.set(p.id, { book: b.id, ch: c.n, sec: s.id, t: p.t });
  }
  const outEntries = entries.map((e) => {
    const re = new RegExp(e.match, 'i');
    const mentions = [];
    for (const [id, w] of where) if (re.test(w.t)) mentions.push(id);
    return {
      id: e.id, name: e.name, also: e.also || [], group: e.group, kind: e.kind, when: e.when || null, at: e.at ?? null,
      lead: e.lead.map((l) => ({ quote: l.q, ...(({ sec, url, cite }) => ({ sec, url, cite }))(PARA.get(l.p)), p: l.p })),
      mentions,
    };
  });
  const lib = { books, glossary, entries: outEntries };
  const json = JSON.stringify(lib);
  writeFileSync(join(ROOT, 'app', 'data', pack.id + '-library.json'), json);
  console.log(`wrote app/data/${pack.id}-library.json — ${books.length} books, ${glossary.length} glossary terms, `
    + `${outEntries.length} entries (${(json.length / 1024 / 1024).toFixed(1)} MB)`);
}
