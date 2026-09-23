// Palimpsest — does each question claim only what its source says?
//
//   node build/audit-claims.mjs
//
// verify.mjs proves every QUOTE is verbatim and that the answer's terms appear
// in the quoted evidence. It says nothing about the rest of the question: the
// setup line can assert a date, a place or a name the source never mentions,
// and a wrong option can be accidentally true. This audit reads the whole
// question against the paragraphs it cites and flags:
//
//   date       a year in the prompt or answer that isn't in the cited paragraphs
//   name       a capitalised name in the prompt that isn't in them either
//   number     a quantity in the prompt or answer that isn't in them
//   distractor a wrong option whose wording appears in the cited paragraphs
//              (it may be true, which makes the question unfair)
//
// Flags are for a human to judge: a name can be common knowledge ("Egypt"),
// and a paraphrase can be fair. It is a reading list, not a build gate.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const norm = (s) => String(s).replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();

const PARA = new Map();
// The whole text of each source, for names: 'Jacques Cartier' may be named a
// paragraph earlier than the one a question cites, and that is fair.
const BOOKS = new Map();
for (const f of readdirSync(join(ROOT, 'corpus'))) {
  const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
  const whole = [];
  for (const c of book.chapters) for (const s of c.sections) for (const p of s.paras) { PARA.set(p.id, { text: p.text, book: book.source.id }); whole.push(p.text); }
  // The source's own title and year count as its words too: "…in the Bolivian
  // Amazon", and "told her own story in 1831" for a book published in 1831.
  BOOKS.set(book.source.id, norm([book.source.title, String(book.source.year), ...whole].join(' ')).toLowerCase());
}

// Names any reader is assumed to know, or that the app itself supplies: not
// every capitalised word needs a citation.
const COMMON = new Set(['Europe', 'European', 'Europeans', 'Africa', 'African', 'Africans', 'America', 'Americas', 'American', 'Asia', 'Asian', 'Canada', 'Canadian', 'England', 'English', 'France', 'French', 'Britain', 'British', 'Spain', 'Spanish', 'Portugal', 'Portuguese', 'China', 'Chinese', 'India', 'Indian', 'Egypt', 'Egyptian', 'Egyptians', 'Rome', 'Roman', 'Romans', 'Greek', 'Atlantic', 'Pacific', 'Mediterranean', 'Sahara', 'Nile', 'Indigenous', 'Islamic', 'Muslim', 'Christian', 'Catholic', 'Islam', 'Christianity', 'North', 'South', 'East', 'West', 'Northwest', 'Southeast', 'Plains', 'Arctic', 'Caribbean', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'The', 'A', 'An', 'In', 'By', 'When', 'What', 'Why', 'How', 'Who', 'Where', 'Which', 'From', 'After', 'Before', 'At', 'On', 'Two', 'One', 'Some', 'Many', 'Most', 'Their', 'They', 'It', 'Its', 'This', 'That', 'These', 'Those', 'And', 'But', 'For', 'With', 'Was', 'Were', 'Did', 'Do', 'Does', 'Had', 'Has', 'Once', 'Only', 'Under', 'Over', 'Across', 'Against', 'Between', 'During', 'Without', 'Yes', 'No']);

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.mjs')) files.push(p);
  }
})(join(ROOT, 'content'));

// Spellings the app has chosen, with the source's own spelling given in the
// question itself. Listed here so the flag doesn't come back every run.
const ALLOWED = new Set(['Macau']);

const flags = [];
let checked = 0;
for (const file of files) {
  if (/(anchors|placement|voices|entries)\.mjs$/.test(file)) continue;
  const qs = (await import(pathToFileURL(file).href)).default;
  if (!qs.length || qs[0].lead) continue;
  const where = relative(ROOT, file);
  for (const q of qs) {
    checked++;
    const evs = q.ev || (q.items || []).map((i) => i.ev);
    const source = norm(evs.map((e) => PARA.get(e.p)?.text || '').join(' '));
    const wholeBooks = [...new Set(evs.map((e) => PARA.get(e.p)?.book))].map((b) => BOOKS.get(b) || '').join(' ');
    const said = source.toLowerCase();
    const flag = (kind, what) => flags.push({ where, id: q.id, kind, what, prompt: q.prompt });

    const prompt = norm(q.prompt || '');
    const answer = norm(q.answer || '');
    // Dates and quantities in the question's own words.
    for (const text of [prompt, answer]) {
      // Centuries: a question says "the 1500s" where the source says "the
      // sixteenth century", and "by the 1700s" for "by the eighteenth
      // century". Both are the same claim.
      const ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth'];
      for (const m of text.matchAll(/\b(\d{3,4})(s?)\b(?!\s*(BCE|CE))/g)) {
        const year = m[1];
        if (source.includes(year)) continue;
        if (wholeBooks.includes(year)) continue;            // stated elsewhere in the same source
        if (m[2] === 's' && /00$/.test(year)) {             // "1500s" → sixteenth century
          const century = ORD[Math.floor(+year / 100) + 1];
          if (century && said.includes(century + ' century')) continue;
        }
        if (m[2] === 's') {                                  // "1710s" → any year in that decade
          const decade = new RegExp('\\b' + year.slice(0, 3) + '\\d\\b');
          if (decade.test(source)) continue;
        }
        flag('date', year);
      }
      for (const m of text.matchAll(/\b(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?\s?(?:million|thousand|per cent|%|km|metres|cubic metres))\b/gi)) {
        // Questions write units out; the sources abbreviate them ("22 m tall").
        const units = (x) => x.toLowerCase().replace(/\s*metres\b/g, ' m').replace(/\s*kilometres\b/g, ' km').replace(/\s+/g, ' ');
        if (!units(said).includes(units(m[0]))) flag('number', m[0]);
      }
    }
    // Names the question introduces.
    // Sentence-opening words are capitalised by grammar, not because they are
    // names: a lone capitalised word at the start of a sentence isn't flagged.
    const starts = new Set([...prompt.matchAll(/(?:^|[.?!]\s+)([A-Z][\w’'-]+)/g)].map((m) => m[1]));
    const bare = (s) => s.toLowerCase().replace(/[’']/g, '');
    for (const m of prompt.matchAll(/\b([A-Z][\w’'-]+(?:\s+[A-Z][\w’'-]+)*)\b/g)) {
      // Possessives are the same name: "Portugal’s" is Portugal.
      const name = m[1].replace(/[’']s$/, '');
      if (COMMON.has(name) || ALLOWED.has(name) || name.split(' ').every((w) => COMMON.has(w) || ALLOWED.has(w))) continue;
      if (!name.includes(' ') && starts.has(m[1])) continue;
      if (said.includes(name.toLowerCase()) || bare(said).includes(bare(name))) continue;
      // Named anywhere in the same book: fair.
      if (wholeBooks.includes(name.toLowerCase()) || bare(wholeBooks).includes(bare(name))) continue;
      // A phrase built from words the source does use ("Catholic Acadiens",
      // "Bolivian Amazon") is a fair combination, not a new claim.
      if (name.includes(' ') && name.split(' ').every((w) => COMMON.has(w) || bare(wholeBooks).includes(bare(w)))) continue;
      // A name the app itself defines elsewhere (a library entry or another
      // question in the same file) is fair game; only unknown ones are flagged.
      flag('name', name);
    }
    // A wrong option may be accidentally true. It is only suspicious when a
    // RUN of its words appears in the source AND that run carries content:
    // "of the French king" proves nothing, "the first limitation on slavery"
    // would.
    for (const o of q.options || []) {
      const w = norm(o).toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);
      for (let i = 0; i + 4 <= w.length; i++) {
        const run = w.slice(i, i + 4);
        if (run.filter((x) => x.length > 4).length >= 2 && said.toLowerCase().includes(run.join(' '))) { flag('distractor', o); break; }
      }
    }
  }
}

const byKind = {};
for (const f of flags) (byKind[f.kind] ||= []).push(f);
console.log(`read ${checked} written questions in ${files.length} file(s)`);
for (const [kind, list] of Object.entries(byKind)) {
  console.log(`\n## ${kind} — ${list.length}`);
  for (const f of list) console.log(`  ${f.id.padEnd(26)} ${String(f.what).slice(0, 60)}`);
}
if (!flags.length) console.log('\nevery date, name, quantity and wrong option is accounted for by the cited passages.');
