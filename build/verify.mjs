// Palimpsest — no question ships unless the book says so.
//
//   node build/verify.mjs
//
// For every question in content/:
//   1. every evidence quote is found VERBATIM in the paragraph it cites
//      (typographic quotes and dashes are normalised; nothing else is);
//   2. the answer is supported: each term in `must` (default: the answer
//      itself) appears in the quoted evidence, so the question cannot claim
//      more than the quotes carry;
//   3. options are distinct and none of them is the answer;
//   4. an ordering question has distinct dates, each of which appears in its
//      own quote.
// Any failure exits non-zero.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const norm = (s) => String(s)
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
const low = (s) => norm(s).toLowerCase();

const PARA = new Map();
for (const f of readdirSync(join(ROOT, 'corpus'))) {
  const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
  for (const c of book.chapters) for (const s of c.sections) for (const p of s.paras) {
    PARA.set(p.id, { text: p.text, section: s, source: book.source });
  }
}

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.mjs')) files.push(p);
  }
})(join(ROOT, 'content'));

const fails = [];
let n = 0, entries = 0, voices = 0;
const lensCount = {};
for (const file of files) {
  const qs = (await import(pathToFileURL(file).href)).default;
  const where = relative(ROOT, file);
  const ids = new Set();
  // Voices: each line verbatim in its scan's OCR text, or in a Belshaw
  // paragraph. The OCR is normalised only for what scanning adds and the page
  // did not say: words hyphenated across a line end, bracketed original-page
  // numbers ("[80]"), and the space OCR puts before punctuation.
  if (file.endsWith('voices.mjs')) {
    const mod = await import(pathToFileURL(file).href);
    const texts = {};
    const ocr = (t) => norm(t.replace(/-\s*\n\s*/g, '').replace(/\s*\[\d+\]\s*/g, ' ')).replace(/\s+([;:,.?!])/g, '$1');
    for (const v of qs) {
      voices++;
      const bad = (m) => fails.push(`${where} · ${v.id}: ${m}`);
      if (ids.has(v.id)) bad('duplicate id');
      ids.add(v.id);
      if (!v.who || !v.when || !v.recorded) bad('needs who, when and recorded');
      if (v.p) {
        const para = PARA.get(v.p);
        if (!para) bad(`cites ${v.p}, which is not in the corpus`);
        else if (!norm(para.text).includes(norm(v.q))) bad(`not found in ${v.p}: "${v.q.slice(0, 60)}…"`);
        continue;
      }
      const src = mod.VOICE_SOURCES[v.src];
      if (!src) { bad(`unknown source ${v.src}`); continue; }
      texts[v.src] ??= ocr(readFileSync(join(ROOT, src.file), 'utf8'));
      let pat = norm(v.q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (src.longS) pat = pat.replace(/s/g, '[sf]');
      if (!new RegExp(pat).test(texts[v.src])) bad(`not found verbatim in ${src.file}: "${v.q.slice(0, 60)}…"`);
    }
    continue;
  }
  // The reference library's entries: every lead quote verbatim, and the match
  // pattern must find the lead's own paragraph (else it indexes the wrong thing).
  if (qs.length && qs[0].lead) {
    for (const e of qs) {
      entries++;
      const bad = (m) => fails.push(`${where} · ${e.id}: ${m}`);
      let re;
      try { re = new RegExp(e.match, 'i'); } catch { bad('match is not a valid pattern'); continue; }
      for (const ev of e.lead) {
        const para = PARA.get(ev.p);
        if (!para) { bad(`cites ${ev.p}, which is not in the corpus`); continue; }
        if (!norm(para.text).includes(norm(ev.q))) bad(`lead quote not found in ${ev.p}: "${ev.q.slice(0, 70)}…"`);
      }
      const hits = [...PARA.values()].filter((p) => re.test(p.text)).length;
      if (!hits) bad('match finds no passage at all');
      // At least one lead paragraph must be one the pattern finds — a glossary
      // lead's paragraph begins with the term itself, so it qualifies.
      if (!e.lead.some((ev) => re.test(PARA.get(ev.p)?.text || ''))) bad('match does not find its own lead paragraph');
    }
    continue;
  }
  for (const q of qs) {
    n++;
    const bad = (m) => fails.push(`${where} · ${q.id}: ${m}`);
    if (ids.has(q.id)) bad('duplicate id');
    ids.add(q.id);
    for (const l of q.lens || []) lensCount[l] = (lensCount[l] || 0) + 1;

    const quoteOk = (ev) => {
      const para = PARA.get(ev.p);
      if (!para) { bad(`cites ${ev.p}, which is not in the corpus`); return false; }
      if (!norm(para.text).includes(norm(ev.q))) { bad(`quote not found in ${ev.p}: "${ev.q.slice(0, 70)}…"`); return false; }
      return true;
    };

    if (q.kind === 'order') {
      const ats = q.items.map((it) => it.at);
      if (new Set(ats).size !== ats.length) bad('two items share a date');
      for (const it of q.items) {
        if (!quoteOk(it.ev)) continue;
        if (!norm(it.ev.q).includes(String(Math.abs(it.at)))) bad(`"${it.label}": its quote does not contain ${Math.abs(it.at)}`);
      }
      continue;
    }

    const evs = q.ev || [];
    if (!evs.length) { bad('no evidence'); continue; }
    const allOk = evs.map(quoteOk).every(Boolean);
    const said = low(evs.map((e) => e.q).join(' '));
    for (const term of q.must || [q.answer]) {
      if (!said.includes(low(term))) bad(`answer not supported: "${term}" is not in the quoted evidence`);
    }
    const opts = (q.options || []).map(low);
    if (new Set(opts).size !== opts.length) bad('duplicate options');
    if (opts.includes(low(q.answer))) bad('the answer is also listed as a wrong option');
    // A right answer that is conspicuously the longest can be picked without
    // knowing anything (the dyslexia audit found nine). Keep lengths within 3 words.
    const words = (x) => x.split(/\s+/).length;
    const longestWrong = Math.max(...(q.options || []).map(words));
    if (q.options?.length > 1 && words(q.answer) - longestWrong >= 3) bad(`the answer is ${words(q.answer) - longestWrong} words longer than any wrong option — it gives itself away`);
    if (!allOk) continue;
  }
}

console.log(`${n} questions, ${entries} library entries and ${voices} voices in ${files.length} file(s)`);
console.log('by lens: ' + Object.entries(lensCount).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '));
if (fails.length) {
  console.error(`\nverify FAILED — ${fails.length} problem(s):`);
  for (const f of fails) console.error('  x ' + f);
  process.exit(1);
}
console.log('every quote found verbatim; every answer supported by its evidence.');
