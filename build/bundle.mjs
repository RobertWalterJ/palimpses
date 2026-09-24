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
// book id → its source record, for citing and for the About screen.
const BOOK = new Map();
const CHAPTER_OF = new Map();
// Every glossary definition in the corpus ("term: meaning", under Key Terms),
// with its section — the material for generated glossary questions.
const TERMS = [];
for (const f of readdirSync(join(ROOT, 'corpus'))) {
  const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
  const cite = `${book.source.author}, ${book.source.title} (${book.source.publisher}, ${book.source.year}), ${book.source.licence}`;
  BOOK.set(book.source.id, book.source);
  for (const c of book.chapters) for (const s of c.sections) for (const p of s.paras) {
    // A section with its own author is credited to them, within the book.
    PARA.set(p.id, { text: p.text, sec: `${s.num} ${s.title}`, url: s.url, cite: s.author ? `${s.author}, in ${cite}` : cite });
    CHAPTER_OF.set(p.id, c);
    if (p.under === 'Key Terms') {
      const m = p.text.match(/^([^:]{1,60}):\s+(.+)$/);
      if (m) TERMS.push({ id: p.id, term: m[1].trim(), meaning: m[2].trim().replace(/\.$/, ''), sec: s.id });
    }
  }
}

// Terms already asked, across every chapter: "caliph" appeared in both the
// Africa and the Islamic world chapters, with the same prompt and the same
// evidence. First chapter to reach it keeps it.
const ASKED = new Set();
// Every usable definition in the library, as the pool wrong options are drawn
// from. Short enough to read on a phone, and not so short as to be a label.
const DISTRACTORS = TERMS.filter((t) => {
  const n = t.meaning.trim().split(/\s+/).length;
  return n >= 3 && n <= 18 && t.term.length <= 40 && !t.meaning.toLowerCase().includes(t.term.toLowerCase());
});

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
  'ch06-north': 'The North, and the fur trade country',
  'ch04-new-france': 'New France, inside other worlds',
  'ch03-amazonia': 'Amazonia, a centre of its own',
  'th01-empire-trade': 'Trade, empire and abolition, 1488–1842',
  'w01-africa': 'Africa',
  'w02-atlantic': 'The Caribbean and the Atlantic',
  'w03-east-asia': 'China and East Asia',
  'w04-south-asia': 'South Asia and the Indian Ocean',
  'w05-islamic-world': 'The Islamic world',
  'w06-europe': 'Europe',
  'w07-exchange': 'Exchange and obligation',
};

const evOut = (e) => {
  const p = PARA.get(e.p);
  return { quote: e.q, p: e.p, para: p.text, sec: p.sec, url: p.url, cite: p.cite };
};

mkdirSync(join(ROOT, 'app', 'data'), { recursive: true });
for (const pack of PACKS) {
  const files = readdirSync(join(ROOT, pack.dir)).filter((f) => f.endsWith('.mjs') && f !== 'voices.mjs' && f !== 'anchors.mjs' && f !== 'placement.mjs').sort();
  const questions = [];
  const chapters = [];
  let entries = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(ROOT, pack.dir, f)).href);
    const qs = mod.default;
    if (qs.length && qs[0].lead) { entries = qs; continue; }   // the library, not questions
    const firstP = qs[0]?.ev?.[0]?.p || qs[0]?.items?.[0]?.ev.p || mod.BIG?.[0]?.ev[0].p;
    const ch = CHAPTER_OF.get(firstP);
    const chId = f.replace(/\.mjs$/, '');
    chapters.push({ id: chId, title: CHAPTER_TITLE[chId] || (ch ? ch.title : chId), book: ch ? ch.title : null, n: ch?.n ?? null,
      big: (mod.BIG || []).map((b) => ({ id: b.id, q: b.q, ev: b.ev.map(evOut) })),
      group: chId.startsWith('th') ? 'thread' : chId.startsWith('w') ? 'world' : 'canada',
      era: mod.ERA || null,
      // A thread (file name th…) crosses chapters and regions, with a timeline
      // in lanes; it is listed apart from the chapters.
      ...(chId.startsWith('th') ? { thread: true, lanes: mod.LANES || [], timeline: (mod.TIMELINE || []).map((e) => ({ lane: e.lane, at: e.at, label: e.label, ev: evOut(e.ev) })).sort((a, b) => a.at - b.at) } : {}) });
    // Significant questions first, the details after: new questions are
    // introduced in this order, so a chapter opens on what matters most.
    const ordered = [...qs.filter((q) => q.depth !== 'detail'), ...qs.filter((q) => q.depth === 'detail')];
    const generated = glossaryQuestions(pack, chId, mod);
    for (const q of [...ordered, ...generated]) {
      if (q.gen) { questions.push(q); continue; }
      const base = { id: `${pack.id}/${q.id}`, ch: chId, kind: q.kind, prompt: q.prompt, lens: q.lens || [], big: q.big, ...(q.depth ? { depth: q.depth } : {}), ...(q.at != null ? { at: q.at } : {}),
        // Whose history the question asks about, where the chapter title is too
        // broad: a thread lane ('China and Asia'), or a people named outright.
        ...(q.lane ? { lane: q.lane } : {}), ...(q.who ? { who: q.who } : {}) };
      if (q.kind === 'order') {
        questions.push({ ...base, items: q.items.map((it) => ({ label: it.label, at: it.at, when: it.when || null, ev: evOut(it.ev) })) });
      } else {
        questions.push({ ...base, answer: q.answer, options: q.options, ev: q.ev.map(evOut) });
      }
    }
  }
  // The order new questions are introduced in: the anchors first (the
  // opening rounds), then each chapter, significant before detail.
  const anchors = (await import(pathToFileURL(join(ROOT, pack.dir, 'anchors.mjs')).href)).default.map((a) => `${pack.id}/${a}`);
  const rank = new Map(anchors.map((a, i) => [a, i]));
  questions.sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
  for (const q of questions) if (rank.has(q.id)) q.anchor = true;
  // How much a newcomer is likely to know about each question's subject
  // (1 commonly known, 2 school-level, 3 specialist), from the question audit.
  // The placement check samples across these levels.
  const LEVEL = new Map((await import(pathToFileURL(join(ROOT, 'audits', '2026-09-19-questions.mjs')).href)).default.map(([id, fam]) => [id, fam]));
  for (const q of questions) q.level = LEVEL.get(q.id.split('/')[1]) ?? q.level ?? 2;
  const placement = (await import(pathToFileURL(join(ROOT, pack.dir, 'placement.mjs')).href)).default.map((a) => `${pack.id}/${a}`);
  // Every book the questions draw on, with its licence — carried in the pack
  // itself so About can never drift out of date with what is actually cited.
  // (A hand-written list had gone three versions without crediting OpenStax,
  // which its licence requires.)
  const bookOf = (pid) => [...BOOK.keys()].find((id) => pid.startsWith(id + '-'));
  const cited = new Set(questions.flatMap((q) => (q.ev || q.items?.flatMap((i) => i.ev) || []).map((e) => bookOf(e.p))).filter(Boolean));
  const sources = [...cited].map((id) => {
    const b = BOOK.get(id);
    return { id, title: b.title, author: b.author, publisher: b.publisher, year: b.year, licence: b.licence, web: b.web };
  }).sort((x, y) => x.year - y.year);
  const voices = await loadVoices(pack);
  // "Who said this?" — the app is named for its voices and had never asked
  // about one. Only the voices whose words sit in the corpus can be asked
  // (the rest are read from their own scans), but every speaker can be a
  // wrong option.
  questions.push(...whoSaidQuestions(pack, voices, chapters));
  // "Oldest first" across regions, from the threads' own dated events. Three
  // at a time, never all from one region, so the answer is a sense of when
  // things happened beside each other rather than within one story.
  questions.push(...orderQuestions(pack, chapters));
  questions.push(...gapQuestions(pack, chapters, questions));
  // New questions are introduced in this order, so anything appended to the
  // end is never reached. The shapes that are not four-option choices —
  // ordering, and "who said this?" — are spread evenly through it instead, so
  // a round has a fair chance of holding one.
  const shapedAll = questions.filter((q) => q.kind === 'order' || q.gen === 'voice' || q.gen === 'gap');
  // Round-robin by type, or the player meets eight ordering questions, then
  // four "who said this", then the gaps — the point is that no two days in a
  // row set the same task.
  const byType = new Map();
  for (const q of shapedAll) { const t = q.gen || q.kind; byType.set(t, [...(byType.get(t) || []), q]); }
  const shaped = [];
  for (let i = 0; shaped.length < shapedAll.length; i++) for (const list of byType.values()) if (list[i]) shaped.push(list[i]);
  if (shaped.length) {
    const inShaped = new Set(shaped);
    const rest = questions.filter((q) => !inShaped.has(q));
    const every = Math.max(4, Math.floor(rest.length / (shaped.length + 1)));
    const mixed = [];
    let next = 0;
    rest.forEach((q, i) => {
      mixed.push(q);
      if (i > 6 && (i - 6) % every === 0 && next < shaped.length) mixed.push(shaped[next++]);
    });
    questions.length = 0;
    questions.push(...mixed, ...shaped.slice(next));
  }
  const out = { id: pack.id, title: pack.title, blurb: pack.blurb, chapters, questions, placement, sources, voices };
  writeFileSync(join(ROOT, 'app', 'data', pack.id + '.json'), JSON.stringify(out));
  console.log(`wrote app/data/${pack.id}.json — ${questions.length} questions in ${chapters.length} chapter(s), ${questions.filter((q) => q.gen).length} of them generated from glossaries`);
  writeLibrary(pack, entries);
}

// ── generated questions: the glossaries ─────────────────────────────────
// "Which of these describes 'Kilwa'?" The right answer is the source's own
// definition, verbatim (so the evidence holds by construction); the wrong
// ones are other definitions from the same region, close in length, so the
// answer can't be spotted by its size. Every generated question is checked
// against the same rules as a written one, and the build stops if one fails.
// Declared as functions so they exist before the chapter loop above runs.
function seeded(str) { let h = 2166136261; for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296); }
function words(s) { return s.split(/\s+/).length; }
function cap(s) { return s[0].toUpperCase() + s.slice(1); }
// The kind of thing a definition describes, from its head noun: "An Islamic
// title…" → person-title; "A grassy plain…" → place. Crude, but enough to
// keep a region's wrong options from being a different kind of thing.
function kindOf(meaning) {
  const KINDS = [
    ['person', /\b(ruler|king|queen|emperor|leader|title|sultan|general|priest|merchant|scholar|founder|chief|person|people|group|dynasty|family|class|politicians)\b/],
    ['place', /\b(region|city|kingdom|empire|state|island|river|plain|area|zone|belt|coast|capital|territory|port|land)\b/],
    ['belief', /\b(religion|belief|faith|practice|ritual|doctrine|philosophy|school|movement|church|god|goddess|worship)\b/],
    ['thing', /\b(tax|treaty|law|code|system|tool|weapon|structure|building|trade|currency|document|war|battle|policy|type|script|method)\b/],
  ];
  const head = meaning.toLowerCase().split(/\s+/).slice(0, 6).join(' ');
  return KINDS.find(([, re]) => re.test(head))?.[0] || null;
}
function inPrefix(sec, prefixes) { return prefixes.some((pr) => sec === pr || sec.startsWith(pr + '.')); }
// One question per voice whose words are in the corpus: the quote, and four
// speakers to choose between. The quote is already checked verbatim by
// verify.mjs, so nothing new can slip in here.
function whoSaidQuestions(pack, voices, chapters) {
  const speakers = [...new Set(voices.map((v) => v.short).filter(Boolean))];
  const out = [];
  for (const v of voices) {
    if (!v.ask || !v.p || !v.short) continue;
    if (!chapters.some((c) => c.id === v.ask.ch && c.big?.some((b) => b.id === v.ask.big))) throw new Error(`voice ${v.id}: no big question ${v.ask.ch}/${v.ask.big}`);
    const rnd = seeded('who' + v.id);
    const wrong = speakers.filter((n) => n !== v.short).sort(() => rnd() - 0.5).slice(0, 3);
    if (wrong.length < 3) continue;
    // A quote long enough to fill a phone screen is cut at a sentence end.
    const quote = v.quote.length > 180 ? v.quote.slice(0, v.quote.lastIndexOf(' ', 170)) + '…' : v.quote;
    // Not if the quote names the speaker: "…the independence of Hayti" beside
    // "The state of Hayti" answers itself.
    const said = quote.toLowerCase();
    if (v.short.toLowerCase().split(/[^a-zà-ÿ]+/).some((w) => w.length > 4 && said.includes(w))) continue;
    out.push({
      id: `${pack.id}/${v.ask.ch}/who-${v.id}`, ch: v.ask.ch, kind: 'choice', gen: 'voice', lens: ['record'],
      big: v.ask.big, level: 2,
      prompt: `“${quote}” Who said this?`,
      answer: v.short, options: wrong,
      ev: [{ p: v.p, quote: v.quote, sec: v.sec, url: v.url, cite: v.cite }],
    });
  }
  return out;
}

// Ordering questions built from a thread's timeline: every event is already
// quoted and checked, so these cost nothing but combinations. One per trio,
// capped, and never two questions on the same three events.
function orderQuestions(pack, chapters) {
  const out = [];
  for (const ch of chapters.filter((c) => c.thread && c.timeline?.length > 5)) {
    const rnd = seeded('order' + ch.id);
    const byLane = new Map();
    for (const e of ch.timeline) byLane.set(e.lane, [...(byLane.get(e.lane) || []), e]);
    const lanes = [...byLane.keys()];
    const seen = new Set();
    for (let tries = 0; tries < 400 && out.length < 12; tries++) {
      // Three lanes, one event each: the point is the comparison across them.
      const pick = [...lanes].sort(() => rnd() - 0.5).slice(0, 3);
      if (pick.length < 3) break;
      const items = pick.map((l) => { const es = byLane.get(l); return es[Math.floor(rnd() * es.length)]; });
      const years = items.map((e) => e.at);
      if (new Set(years).size !== 3) continue;
      // Far enough apart to be a question about history rather than a coin toss.
      if (Math.min(...years.map((y, i) => Math.min(...years.filter((_, j) => j !== i).map((z) => Math.abs(y - z))))) < 15) continue;
      const key = items.map((e) => e.at).sort().join('-');
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        id: `${pack.id}/${ch.id}/order-gen-${key}`, ch: ch.id, kind: 'order', gen: 'timeline', lens: ['record'],
        big: ch.big[0].id, level: 2, prompt: 'Oldest first.',
        items: items.map((e) => ({ label: e.label, at: e.at, when: String(e.at), ev: e.ev[0] || e.ev })),
      });
    }
  }
  return out;
}

// "Which word belongs in the gap?" — a sentence the player has already been
// shown as evidence, with one name, place or number taken out. The wrong
// options are names and numbers from the same chapter, so the question is
// recall of the passage rather than a guess at register. Only proper nouns and
// numbers are ever blanked: a common noun would leave a gap several words
// could honestly fill.
function gapQuestions(pack, chapters, questions) {
  const STOP = new Set(['The', 'This', 'That', 'These', 'Those', 'There', 'Their', 'They', 'When', 'While', 'Where', 'What', 'Which', 'After', 'Before', 'Some', 'Many', 'Most', 'Both', 'Each', 'Every', 'Under', 'During', 'Between', 'Although', 'Because', 'However', 'Instead', 'Within', 'Without', 'Among', 'Since', 'Until', 'Nevertheless', 'Despite', 'Indigenous', 'European', 'Europeans']);
  const out = [];
  for (const ch of chapters) {
    const mine = questions.filter((q) => q.ch === ch.id && !q.gen && q.ev?.length);
    if (mine.length < 6) continue;
    // Every candidate word in the chapter, so the wrong options come from the
    // same world as the right one.
    const pool = new Set();
    for (const q of mine) for (const e of q.ev) for (const w of properNouns(e.quote)) if (!STOP.has(w)) pool.add(w);
    const words = [...pool];
    if (words.length < 8) continue;
    const rnd = seeded('gap' + ch.id);
    // Sentences any question in this chapter already quotes, so a gap never
    // lands on ground that is already asked about; and the answers used so
    // far, so one chapter doesn't ask for "Casarabe" three times.
    const taken = new Set(mine.flatMap((q) => q.ev.map((e) => e.quote.trim())));
    const usedAnswers = new Set();
    let made = 0;
    for (const q of mine) {
      if (made >= 4) break;
      const e = q.ev[0];
      // NOT the sentence its source question already quotes — that made two
      // questions on one sentence, which is the repetition this app is trying
      // to get rid of. A neighbouring sentence of the same paragraph is new
      // material and is source text by construction.
      const others = sentencesOf(e.para).filter((t) => !taken.has(t.trim())
        && ![...taken].some((u) => u.includes(t) || t.includes(u)));
      const sentence = others.find((t) => {
        const n = t.split(/\s+/).length;
        return n >= 8 && n <= 34 && properNouns(t).some((w) => !STOP.has(w) && !usedAnswers.has(w));
      });
      if (!sentence) continue;
      const cands = properNouns(sentence).filter((w) => !STOP.has(w) && !usedAnswers.has(w)
        && sentence.split(w).length === 2                    // appears exactly once
        && !sentence.startsWith(w));                         // not the first word
      if (!cands.length) continue;
      const answer = cands[Math.floor(rnd() * cands.length)];
      taken.add(sentence.trim());
      usedAnswers.add(answer);
      // A wrong option must not be a version of the right one: "Casarabe" and
      // "Casarabe-culture" are the same answer twice.
      const wrong = words.filter((w) => w !== answer && !sentence.includes(w)
        && !w.includes(answer) && !answer.includes(w)).sort(() => rnd() - 0.5).slice(0, 3);
      if (wrong.length < 3) continue;
      if (!e.para.includes(sentence)) throw new Error(`gap ${q.id}: sentence not in its paragraph`);
      const gapped = sentence.replace(w_re(answer), '_____');
      out.push({
        id: `${pack.id}/${ch.id}/gap-${q.id.split('/').pop()}`, ch: ch.id, kind: 'choice', gen: 'gap',
        lens: ['record'], big: q.big, level: 3,
        prompt: `“${gapped}” Which word belongs in the gap?`,
        answer, options: wrong,
        ev: [{ ...e, quote: sentence }],
      });
      made++;
    }
  }
  return out;
}
// The word to blank out, matched whole. A function declaration, not a const:
// the chapter loop above runs before any const further down is initialised —
// this is the third time that has caught us in this file.
// A paragraph's sentences. Abbreviations ("St. Lawrence", "c. 1450") are the
// reason this is not a plain split on full stops: a sentence ends at a stop
// followed by a space and a capital, and not after a one- or two-letter word.
function sentencesOf(text) {
  return String(text || '')
    .split(/(?<![A-Z][a-z]?)(?<!\b[A-Z])\.\s+(?=[“"A-Z])/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (/[.?!”"]$/.test(t) ? t : t + '.'));
}

// Capitalised words that are really names, not words a sentence happened to
// start with. "Boys" and "Consequently" opened sentences; "Tenochtitlan" and
// "Canada" did not. The word must follow a lowercase letter, a comma or a
// semicolon, which is what mid-sentence looks like.
function properNouns(text) {
  return [...text.matchAll(/[a-zà-ÿ,;]\s+([A-Z][a-zà-ÿ’'-]{3,})\b/g)]
    .map((m) => m[1])
    .filter((w) => !/ly$|ing$/.test(w));
}

function w_re(w) {
  const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, (c) => '\\' + c);
  return new RegExp(String.raw`\b` + escaped + String.raw`\b`);
}

function glossaryQuestions(pack, chId, mod) {
  const from = mod.GLOSSARY_FROM || [];
  if (!from.length) return [];
  const seen = ASKED;
  const pool = TERMS.filter((t) => inPrefix(t.sec, from)).filter((t) => {
    const k = t.term.toLowerCase();
    const n = words(t.meaning);
    // Usable: not a duplicate, not too long to read on a phone, and the
    // definition doesn't contain the term (that would answer itself).
    if (seen.has(k) || n < 3 || n > 18 || t.term.length > 40 || t.meaning.toLowerCase().includes(k)) return false;
    seen.add(k);
    return true;
  });
  // A term already answered by a written question in this chapter is not
  // asked again as a definition: "generalized reciprocity" was both.
  const answered = new Set((mod.default || []).map((q) => String(q.answer || '').toLowerCase()));
  const out = [];
  for (const t of pool) {
    if (answered.has(t.term.toLowerCase())) continue;
    const rnd = seeded(chId + t.term);
    const n = words(t.meaning);
    // Wrong options of the same KIND come first — a title against titles, a
    // place against places — so the answer can't be picked by topic alone
    // ("biome" beside "an Islamic title"); then closeness in length.
    const kind = kindOf(t.meaning);
    // Drawn from every glossary in the library rather than this chapter's own
    // answers. Drawing from the chapter made a closed loop: each definition
    // came round as three other questions' wrong options, so a chapter of 20
    // terms felt like the same four sentences over and over.
    const cands = DISTRACTORS.filter((o) => o.term.toLowerCase() !== t.term.toLowerCase() && o.meaning !== t.meaning
      && Math.abs(words(o.meaning) - n) <= Math.max(3, Math.round(n * 0.4)))
      .map((o) => ({ o, r: (kind && kindOf(o.meaning) === kind ? 0 : 6) + Math.abs(words(o.meaning) - n) + rnd() * 3 })).sort((a, b) => a.r - b.r).map((x) => x.o);
    const wrong = [];
    for (const o of cands) if (wrong.length < 3 && !wrong.some((w) => w.meaning === o.meaning)) wrong.push(o);
    if (wrong.length < 3) continue;
    if (n - Math.max(...wrong.map((w) => words(w.meaning))) >= 3) continue;
    // A term whose section belongs to none of the chapter's big questions is
    // left out rather than filed under the first one. The app groups a round
    // by big question, so a mis-filed term breaks the grouping and the
    // "bigger picture" card tells the player something untrue.
    const big = (mod.BIG || []).find((b) => inPrefix(t.sec, b.src || []));
    if (!big) continue;
    const slug = t.term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    // Half the questions run the other way — the meaning given, the word
    // asked for. Same evidence, a different thing to do with it, and four
    // short options instead of four long ones.
    const reversed = rnd() < 0.5 && wrong.every((w) => w.term.length <= 28);
    out.push(reversed ? {
      id: `${pack.id}/${chId}/g-${slug}`, ch: chId, kind: 'choice', gen: 'glossary', lens: ['record'], big: big.id, depth: 'detail', level: 3,
      prompt: `Which word means “${t.meaning.replace(/\.$/, '')}”?`,
      answer: t.term, options: wrong.map((w) => w.term),
      ev: [evOut({ p: t.id, q: t.meaning })],
    } : {
      id: `${pack.id}/${chId}/g-${slug}`, ch: chId, kind: 'choice', gen: 'glossary', lens: ['record'], big: big.id, depth: 'detail', level: 3,
      prompt: `Which of these describes “${t.term}”?`,
      answer: cap(t.meaning), options: wrong.map((w) => cap(w.meaning)),
      ev: [evOut({ p: t.id, q: t.meaning })],
    });
  }
  // The same rules as verify.mjs, for questions verify never sees.
  const ids = new Set();
  for (const q of out) {
    const opts = [q.answer, ...q.options].map((x) => x.toLowerCase());
    if (new Set(opts).size !== 4) throw new Error(`generated ${q.id}: duplicate options`);
    if (ids.has(q.id)) throw new Error(`generated ${q.id}: duplicate id`);
    ids.add(q.id);
    if (!PARA.get(q.ev[0].p).text.includes(q.ev[0].quote)) throw new Error(`generated ${q.id}: definition not verbatim`);
  }
  return out;
}

// ── voices ──────────────────────────────────────────────────────────────
// People of the past in their own words (verified in verify.mjs), each with
// who said it, who wrote it down, and the source's credit and link.
async function loadVoices(pack) {
  const f = join(ROOT, pack.dir, 'voices.mjs');
  let mod;
  try { mod = await import(pathToFileURL(f).href); } catch { return []; }
  return mod.default.map((v) => {
    const base = { id: v.id, quote: v.q, who: v.who, when: v.when, recorded: v.recorded, note: v.note || null, short: v.short || null, ask: v.ask || null };
    if (v.p) { const p = PARA.get(v.p); return { ...base, p: v.p, sec: p.sec, url: p.url, cite: p.cite }; }
    const s = mod.VOICE_SOURCES[v.src];
    return { ...base, url: s.url, cite: `${s.author}, ${s.title} (${s.publisher}, ${s.year}), ${s.licence}` };
  });
}

// ── the reference library ────────────────────────────────────────────────
// Both books in full, reading order; the authors' own glossary; and the
// peoples-and-periods entries with every passage that mentions each. Entries
// carry paragraph ids only — the app looks the text up in the books — so the
// text is stored once.
function writeLibrary(pack, entries) {
  const books = [];
  const glossary = [];
  // Ljungstedt's OCR is left out of the reader (a single quotation is used,
  // shown in full on its question); the others are readable in full.
  for (const f of ['pre.json', 'post.json', 'prumers2022.json', 'wh1.json', 'wh2.json', 'anth.json', 'prince1831.json', 'haytian1816.json']) {
    const book = JSON.parse(readFileSync(join(ROOT, 'corpus', f), 'utf8'));
    const src = book.source;
    books.push({
      id: src.id, title: src.title, author: src.author, year: src.year, licence: src.licence, web: src.web.replace(/chapter\/$/, ''),
      chapters: book.chapters.map((c) => ({
        n: c.n, title: c.title,
        sections: c.sections.map((s) => ({
          id: s.id, num: s.num, title: s.title, url: s.url, author: s.author || null,
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
