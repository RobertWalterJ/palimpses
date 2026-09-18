// Palimpsest — the reference library.
//
// Everything here is the books' own text: both volumes to read, the authors'
// glossaries, and entries on peoples and periods whose leads are verified
// quotes. Nothing is summarised by the app.
//
// Reading is built to the dyslexia audit's spec: body text at the reader's
// chosen size, spacing and measure; upright type; long paragraphs chunked at
// sentence boundaries; a sentence-by-sentence read-aloud bar; an optional
// one-paragraph focus; glossary terms marked and defined on tap.

import { h, esc, ICON, iconBtn, sayBtn, sheet, closeSheet, show, back, route, applyReading } from './ui.js';
import { Reader, sentences } from './reader.js';
import { setRate, getRate } from './speech.js';
import { State } from './schedule.js';

const LICENCE_URL = {
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-NC-SA 4.0': 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
};

let LIB = null;
let WHERE = null;           // para id → { book, chapter, section, para }
let TERMS = null;           // lowercased term → [glossary rows]
let TERM_RE = null;

export async function loadLibrary() {
  if (LIB) return LIB;
  LIB = window.__PALIMPSEST_LIB?.canada || await (await fetch('data/canada-library.json')).json();
  WHERE = new Map();
  for (const b of LIB.books) for (const c of b.chapters) for (const s of c.sections) for (const p of s.paras) {
    WHERE.set(p.id, { book: b, chapter: c, section: s, para: p });
  }
  TERMS = new Map();
  for (const g of LIB.glossary) {
    // "(the) Pill" → "Pill"; "Métis, métis" → "Métis"
    const name = g.term.replace(/^\(the\)\s*/i, '').split(/,\s*/)[0].replace(/[“”"]/g, '').trim();
    if (name.length < 4) continue;
    const k = name.toLowerCase();
    if (!TERMS.has(k)) TERMS.set(k, []);
    TERMS.get(k).push({ ...g, name });
  }
  const alts = [...TERMS.keys()].sort((a, b) => b.length - a.length).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  TERM_RE = new RegExp(`(?<![\\p{L}\\p{N}])(${alts.join('|')})(?![\\p{L}\\p{N}])`, 'giu');
  return LIB;
}
export const sectionOf = (paraId) => WHERE?.get(paraId) || null;

// ── marking up a paragraph: sentences, glossary terms, quoted words ─────
function markTerms(htmlText, seen) {
  if (!State.data.settings.reading?.terms) return htmlText;
  return htmlText.replace(TERM_RE, (m) => {
    const k = m.toLowerCase();
    if (seen.has(k)) return m;              // first mention in the section only
    seen.add(k);
    return `<span class="term" role="button" tabindex="0" data-t="${esc(k)}">${m}</span>`;
  });
}
function paraHtml(text, seen, quotes = []) {
  const ss = sentences(text);
  // The quoted words are marked by underlining the whole sentences they sit
  // in: a quote can start mid-sentence or run across two, and a glossary mark
  // inside it would break an exact-text match. A whole sentence is also
  // easier to find by eye than a fragment.
  const norm = (x) => x.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
  const qs = quotes.map(norm);
  return ss.map((s, i) => {
    const plain = norm(s);
    const hit = qs.some((q) => q.includes(plain) || plain.includes(q) || (q.length > 30 && plain.includes(q.slice(0, 30))) || (plain.length > 30 && q.includes(plain.slice(-30))));
    return `<span class="sn${hit ? ' quoted' : ''}" data-s="${i}">${markTerms(esc(s), seen)}</span>`;
  });
}
// Long paragraphs are split into chunks of roughly 70 words at sentence
// boundaries — visually separate, one citation.
function chunked(spans, text) {
  const words = text.split(/\s+/).length;
  if (words <= 120) return [`<p>${spans.join(' ')}</p>`];
  const out = [];
  let cur = [], n = 0;
  const ss = sentences(text);
  spans.forEach((sp, i) => {
    cur.push(sp); n += ss[i].split(/\s+/).length;
    if (n >= 70 && i < spans.length - 1) { out.push(`<p>${cur.join(' ')}</p>`); cur = []; n = 0; }
  });
  if (cur.length) out.push(`<p>${cur.join(' ')}</p>`);
  return out;
}

export function showTerm(key) {
  const rows = TERMS.get(key) || [];
  if (!rows.length) return;
  const entry = LIB.entries.find((e) => e.name.toLowerCase() === key || e.also.some((a) => a.toLowerCase() === key));
  sheet(
    h('div', { class: 'row' }, h('h2', { class: 't-title' }, rows[0].name), h('span', { class: 'spacer' }),
      sayBtn(() => rows[0].name + '. ' + rows[0].def, `Read the definition of ${rows[0].name} aloud`)),
    ...rows.map((g) => h('div', { class: 'stack', style: 'gap:6px;margin-top:10px' },
      h('p', { class: 'reading', style: 'margin:0' }, g.def),
      h('p', { class: 'cite' }, 'Glossary, §', g.sec, ' — ', g.book === 'pre' ? 'Pre-Confederation' : 'Post-Confederation'))),
    entry ? h('button', { class: 'btn wide', style: 'margin-top:14px', onclick: () => { closeSheet(); openEntry(entry.id); } }, `Open the entry: ${entry.name}`) : null,
  );
}

// ── the reader ──────────────────────────────────────────────────────────
export function openReader(sectionId, paraId = null, quotes = []) { show('reader', readerScreen, { arg: { sectionId, paraId, quotes } }); }
route('reader', readerScreen);

function findSection(id) {
  for (const b of LIB.books) for (const c of b.chapters) for (const s of c.sections) if (s.id === id) return { book: b, chapter: c, section: s };
  return null;
}
function neighbours(id) {
  const all = LIB.books.flatMap((b) => b.chapters.flatMap((c) => c.sections.map((s) => s.id)));
  const i = all.indexOf(id);
  return { prev: all[i - 1] || null, next: all[i + 1] || null };
}

function readerScreen({ sectionId, paraId, quotes = [] }) {
  const at = findSection(sectionId);
  if (!at) return [h('p', {}, 'Section not found.')];
  const { book, chapter, section } = at;
  const seen = new Set();
  const body = h('div', { class: 'reading' });
  const keyPoints = section.paras.filter((p) => p.k);
  let lastHead = null;
  for (const p of section.paras.filter((x) => !x.k)) {
    const spans = paraHtml(p.t, seen, p.id === paraId ? quotes : []);
    const card = h('article', { class: 'passage', id: `p-${p.id}`, 'data-p': p.id });
    if (p.h && p.h !== lastHead) card.append(h('h3', {}, p.h));
    lastHead = p.h;
    card.insertAdjacentHTML('beforeend', chunked(spans, p.t).join(''));
    const pid = h('div', { class: 'pid' }, `¶ ${p.id.split('-p').pop()}`);
    if (p.n?.length) {
      const btn = h('button', { class: 'disclose', type: 'button', 'aria-expanded': 'false' }, `Notes (${p.n.length})`);
      const list = h('ol', { class: 'notes', hidden: true }, p.n.map((n) => h('li', {}, n)));
      btn.onclick = () => { list.hidden = !list.hidden; btn.setAttribute('aria-expanded', String(!list.hidden)); };
      pid.append(btn);
      card.append(pid, list);
    } else card.append(pid);
    body.append(card);
  }
  if (keyPoints.length) {
    const box = h('div', { class: 'keybox', style: 'margin-top:18px' },
      h('p', { class: 't-label' }, 'Key points — the author’s summary'));
    const ul = h('ul', {});
    for (const k of keyPoints) {
      const li = h('li', { id: `p-${k.id}`, class: 'passage-k', 'data-p': k.id });
      li.innerHTML = paraHtml(k.t, seen, k.id === paraId ? quotes : []).join(' ');
      ul.append(li);
    }
    box.append(ul);
    body.append(box);
  }
  body.addEventListener('click', (e) => {
    const t = e.target.closest('.term');
    if (t) { e.stopPropagation(); showTerm(t.dataset.t); }
  });
  body.addEventListener('keydown', (e) => {
    const t = e.target.closest?.('.term');
    if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showTerm(t.dataset.t); }
  });

  // the player
  const reader = new Reader(body, { onChange: (r) => {
    playBtn.innerHTML = r.playing ? ICON.pause : ICON.play;
    playBtn.setAttribute('aria-label', r.playing ? 'Pause' : 'Read aloud from here');
    body.querySelectorAll('.passage.here').forEach((x) => x.classList.remove('here'));
    const cur = r.spans[r.i]?.closest('.passage');
    if (cur) cur.classList.add('here');
    if (cur && r.playing) {
      const rp = State.data.settings.readPos || (State.data.settings.readPos = {});
      rp[section.id] = cur.dataset.p; State.save();
    }
  } });
  const playBtn = iconBtn('play', 'Read aloud from here', () => reader.toggle(), 'icon big');
  const speedBtn = h('button', { class: 'icon speed', type: 'button', 'aria-label': 'Reading speed' }, `${getRate().toFixed(2).replace(/0$/, '')}×`);
  speedBtn.onclick = () => {
    const steps = [0.7, 0.8, 0.9, 0.97, 1.05, 1.15, 1.25];
    const cur = getRate();
    const nxt = steps.find((s) => s > cur + 0.001) || steps[0];
    setRate(nxt); State.data.settings.rate = nxt; State.save();
    speedBtn.textContent = `${nxt.toFixed(2).replace(/0$/, '')}×`;
  };
  const player = h('div', { class: 'player', role: 'toolbar', 'aria-label': 'Read aloud' },
    iconBtn('stop', 'Stop reading', () => reader.stop()),
    iconBtn('prev', 'Back one sentence', () => reader.prev()),
    playBtn,
    iconBtn('next', 'Forward one sentence', () => reader.next()),
    speedBtn);

  // start where asked, or where you left off
  const startAt = paraId || State.data.settings.readPos?.[section.id];
  if (startAt) {
    // A timer, not requestAnimationFrame: rAF is paused in a hidden tab, and
    // the jump must happen whenever the screen is drawn.
    setTimeout(() => {
      const el = document.getElementById(`p-${startAt}`);
      if (el) {
        (el.querySelector('.sn.quoted') || el).scrollIntoView({ block: el.querySelector('.sn.quoted') ? 'center' : 'start' });
        el.classList.add('here');
        const first = el.querySelector('.sn');
        if (first) reader.i = reader.spans.indexOf(first);
      }
    }, 30);
  }

  const focusBtn = iconBtn('focus', 'Focus on one paragraph at a time', () => {
    const on = body.classList.toggle('focus-one');
    focusBtn.setAttribute('aria-pressed', String(on));
  });
  focusBtn.setAttribute('aria-pressed', 'false');
  const { prev, next } = neighbours(section.id);
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('div', { class: 'spacer' }),
      focusBtn, iconBtn('aa', 'Text size and spacing', () => readingSheet())),
    h('div', { class: 'stack', style: 'gap:6px' },
      h('p', { class: 't-label' }, `${book.title.replace('Canadian History: ', '')} · Chapter ${chapter.n}: ${chapter.title}`),
      h('h1', { class: 't-title' }, `${section.num} ${section.title}`),
      h('p', { class: 't-small' }, 'Tap ', h('b', {}, '▶'), ' to hear it read, sentence by sentence. Dotted words have a definition — tap one.')),
    body,
    // CC BY 4.0 asks for four things: who, what, the licence (linked), and
    // what was changed. Sections with their own author are credited to them.
    h('p', { class: 'cite' },
      section.author ? `${section.author}, in ` : '',
      `${book.author}, ${book.title} (${book.year}). Used under `,
      h('a', { href: LICENCE_URL[book.licence] || '#', target: '_blank', rel: 'noopener' }, book.licence), '. ',
      'Adapted for reading here: footnotes moved to Notes; figures, image credits and reading lists left out; text split into sentences. ',
      h('a', { href: section.url, target: '_blank', rel: 'noopener' }, 'The original section')),
    h('div', { class: 'row' },
      prev ? h('button', { class: 'btn', onclick: () => show('reader', readerScreen, { arg: { sectionId: prev }, replace: true }) }, '← Previous') : null,
      h('span', { class: 'spacer' }),
      next ? h('button', { class: 'btn', onclick: () => show('reader', readerScreen, { arg: { sectionId: next }, replace: true }) }, 'Next section →') : null),
    player,
  ];
}

// Reading preferences, with a live preview (dyslexia audit spec).
export function readingSheet(onChange) {
  const r = State.data.settings.reading;
  const apply = () => { State.save(); applyReading(r); onChange?.(); };
  const range = (key, label, min, max, step, fmt) => {
    const out = h('output', {}, fmt(r[key]));
    const input = h('input', { type: 'range', id: `rd-${key}`, min: String(min), max: String(max), step: String(step), value: String(r[key]),
      oninput: (e) => { r[key] = +e.target.value; out.textContent = fmt(r[key]); apply(); } });
    return h('div', { class: 'setting' }, h('label', { class: 'lbl', for: `rd-${key}` }, label, out), input);
  };
  const seg = (key, label, choices) => {
    const box = h('div', { class: 'seg', role: 'group', 'aria-label': label });
    const draw = () => box.replaceChildren(...choices.map(([v, l]) => h('button', { type: 'button', 'aria-pressed': String(r[key] === v),
      onclick: () => { r[key] = v; apply(); draw(); } }, l)));
    draw();
    return h('div', { class: 'setting' }, h('div', { class: 'lbl' }, label), box);
  };
  sheet(
    h('h2', { class: 't-title' }, 'Reading'),
    h('div', { class: 'preview reading' }, h('p', {}, 'Cahokia was a walled complex made up of 120 mounds that housed perhaps as many as 30,000 people, making it a very large city for its day.')),
    range('size', 'Text size', 16, 26, 1, (v) => `${v}px`),
    range('lh', 'Line spacing', 1.4, 2.0, 0.1, (v) => v.toFixed(1)),
    range('measure', 'Line length', 40, 75, 5, (v) => `${v} characters`),
    range('ls', 'Letter spacing', 0, 0.12, 0.02, (v) => (v ? `+${Math.round(v * 100)}%` : 'normal')),
    seg('font', 'Typeface', [['serif', 'Literata (serif)'], ['sans', 'Instrument (sans)']]),
    seg('tint', 'Page tint (light theme)', [['none', 'White'], ['cream', 'Cream'], ['grey', 'Grey'], ['blue', 'Blue']]),
    seg('terms', 'Mark glossary words', [[true, 'On'], [false, 'Off']]),
    h('button', { class: 'btn wide', style: 'margin-top:8px', onclick: closeSheet }, 'Done'),
  );
}

// ── the library screens ─────────────────────────────────────────────────
route('library', libraryScreen);
route('entry', entryScreen);
export function openLibrary(tab = 'peoples') { show('library', libraryScreen, { arg: { tab } }); }
export function openEntry(id) { show('entry', entryScreen, { arg: { id } }); }

function libraryScreen({ tab = 'peoples' } = {}) {
  const tabs = [['peoples', 'Peoples & periods'], ['glossary', 'Glossary'], ['read', 'Read the books'], ['search', 'Search']];
  const bar = h('div', { class: 'tabs', role: 'tablist' }, tabs.map(([id, label]) =>
    h('button', { role: 'tab', 'aria-selected': String(tab === id), onclick: () => show('library', libraryScreen, { arg: { tab: id }, replace: true }) }, label)));
  const body = tab === 'glossary' ? glossaryTab() : tab === 'read' ? readTab() : tab === 'search' ? searchTab() : peoplesTab();
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('h1', { class: 't-title' }, 'Library')),
    h('p', { class: 't-body' }, 'The books themselves, their glossaries, and every passage about each people and period. Nothing here is paraphrased.'),
    bar, body,
  ];
}

function peoplesTab() {
  const groups = new Map();
  for (const e of LIB.entries) {
    if (!groups.has(e.group)) groups.set(e.group, []);
    groups.get(e.group).push(e);
  }
  const out = [];
  const periods = groups.get('Periods') || [];
  groups.delete('Periods');
  for (const [g, list] of groups) {
    out.push(h('h2', { class: 'group-title' }, g));
    out.push(h('div', { class: 'list' }, list.map((e) => h('button', { class: 'item', onclick: () => openEntry(e.id) },
      h('div', {}, h('b', {}, e.name), h('span', {}, [e.also.slice(0, 2).join(' · '), `${e.mentions.length} passage${e.mentions.length === 1 ? '' : 's'}`].filter(Boolean).join(' — '))),
      h('span', { html: ICON.chev })))));
  }
  if (periods.length) {
    out.push(h('h2', { class: 'group-title' }, 'Periods, oldest first'));
    out.push(h('div', { class: 'timeline card' }, periods.slice().sort((a, b) => a.at - b.at).map((e) => h('div', { class: 'tl' },
      h('button', { class: 'item', style: 'padding:6px 0', onclick: () => openEntry(e.id) },
        h('div', {}, h('b', {}, e.name), h('span', {}, e.when || '')), h('span', { html: ICON.chev }))))));
  }
  return h('div', { class: 'stack' }, out);
}

function glossaryTab() {
  const input = h('input', { class: 'search', type: 'search', id: 'gl-q', placeholder: 'Filter terms', 'aria-label': 'Filter glossary terms' });
  const list = h('div', { class: 'list' });
  const draw = () => {
    const q = input.value.trim().toLowerCase();
    const rows = LIB.glossary.filter((g) => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)).slice(0, 120);
    list.replaceChildren(...rows.map((g) => h('button', { class: 'item', onclick: () => {
      const key = g.term.replace(/^\(the\)\s*/i, '').split(/,\s*/)[0].replace(/[“”"]/g, '').trim().toLowerCase();
      if (TERMS.has(key)) showTerm(key);
      else sheet(h('h2', { class: 't-title' }, g.term), h('p', { class: 'reading' }, g.def), h('p', { class: 'cite' }, 'Glossary, §', g.sec));
    } }, h('div', {}, h('b', {}, g.term), h('span', {}, g.def.length > 90 ? g.def.slice(0, g.def.lastIndexOf(' ', 90)) + '…' : g.def)))));
    if (!rows.length) list.replaceChildren(h('p', { class: 't-body', style: 'padding:16px' }, 'No term matches that.'));
  };
  input.addEventListener('input', draw);
  draw();
  return h('div', { class: 'stack' }, input, h('p', { class: 't-small' }, `${LIB.glossary.length} definitions, from the chapter summaries of both books.`), list);
}

function readTab() {
  return h('div', { class: 'stack' }, LIB.books.map((b) => h('div', { class: 'stack' },
    h('h2', { class: 'group-title' }, b.title.replace('Canadian History: ', ''), h('span', { class: 't-small' }, ` — ${b.author}, ${b.year}`)),
    h('div', { class: 'list' }, b.chapters.filter((c) => c.n != null).map((c) => {
      const row = h('button', { class: 'item', 'aria-expanded': 'false' },
        h('div', {}, h('b', {}, `${c.n}. ${c.title}`), h('span', {}, `${c.sections.length} sections`)), h('span', { html: ICON.chev }));
      const secs = h('div', { hidden: true }, c.sections.map((s) => h('button', { class: 'item', style: 'padding-left:28px', onclick: () => openReader(s.id) },
        h('div', {}, h('b', {}, `${s.num} ${s.title}`)), h('span', { html: ICON.chev }))));
      row.onclick = () => { secs.hidden = !secs.hidden; row.setAttribute('aria-expanded', String(!secs.hidden)); };
      return h('div', {}, row, secs);
    })))));
}

function snippet(text, re) {
  const ss = sentences(text);
  return ss.find((s) => re.test(s)) || ss[0];
}
function markMatch(s, re) {
  return esc(s).replace(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'), (m) => `<mark>${m}</mark>`);
}

function searchTab() {
  const input = h('input', { class: 'search', type: 'search', id: 'lib-q', placeholder: 'Search the books, glossary and entries', 'aria-label': 'Search the library' });
  const out = h('div', { class: 'stack' });
  let t = null;
  const run = () => {
    const q = input.value.trim();
    if (q.length < 3) { out.replaceChildren(h('p', { class: 't-small' }, 'Type at least three letters.')); return; }
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const ents = LIB.entries.filter((e) => re.test(e.name) || e.also.some((a) => re.test(a)));
    const gl = LIB.glossary.filter((g) => re.test(g.term)).slice(0, 8);
    const paras = [];
    for (const [id, w] of WHERE) { if (re.test(w.para.t)) paras.push(w); if (paras.length >= 40) break; }
    out.replaceChildren(
      ents.length ? h('div', { class: 'list' }, ents.map((e) => h('button', { class: 'item', onclick: () => openEntry(e.id) }, h('div', {}, h('b', {}, e.name), h('span', {}, e.group)), h('span', { html: ICON.chev })))) : null,
      gl.length ? h('div', { class: 'list' }, gl.map((g) => h('button', { class: 'item', onclick: () => {
        const key = g.term.replace(/^\(the\)\s*/i, '').split(/,\s*/)[0].replace(/[“”"]/g, '').trim().toLowerCase();
        if (TERMS.has(key)) showTerm(key); else sheet(h('h2', { class: 't-title' }, g.term), h('p', { class: 'reading' }, g.def));
      } }, h('div', {}, h('b', {}, g.term), h('span', {}, 'Glossary'))))) : null,
      h('p', { class: 't-label' }, paras.length >= 40 ? 'First 40 passages' : `${paras.length} passage${paras.length === 1 ? '' : 's'}`),
      ...paras.map((w) => h('button', { class: 'mention', onclick: () => openReader(w.section.id, w.para.id) },
        h('span', { class: 't-small' }, `${w.book.id === 'pre' ? 'Pre' : 'Post'}-Confederation · §${w.section.num} ${w.section.title}`),
        h('p', { html: markMatch(snippet(w.para.t, re), re) }))),
    );
  };
  input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 180); });
  run();
  requestAnimationFrame(() => input.focus());
  return h('div', { class: 'stack' }, input, out);
}

function entryScreen({ id }) {
  const e = LIB.entries.find((x) => x.id === id);
  if (!e) return [h('p', {}, 'Not found.')];
  const re = new RegExp(e.name.split(/[ (]/)[0].replace(/[’']/g, '.'), 'i');
  const byChapter = new Map();
  for (const pid of e.mentions) {
    const w = WHERE.get(pid);
    if (!w) continue;
    const k = `${w.book.id}-${w.chapter.n}`;
    if (!byChapter.has(k)) byChapter.set(k, { w, list: [] });
    byChapter.get(k).list.push(w);
  }
  const mentionRe = new RegExp(`${e.name.split(/[ (]/)[0].replace(/[’']/g, '.')}|${e.also.map((a) => a.split(/[ (]/)[0]).filter((a) => a.length > 3).join('|') || 'ZZZZ'}`, 'i');
  const gloss = TERMS.get(e.name.toLowerCase()) || e.also.map((a) => TERMS.get(a.toLowerCase())).find(Boolean) || [];
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back)),
    h('div', { class: 'stack', style: 'gap:6px' },
      h('p', { class: 't-label' }, e.group + (e.when ? ` · ${e.when}` : '')),
      h('h1', { class: 't-title', style: 'font-size:1.7rem' }, e.name),
      e.also.length ? h('p', { class: 't-small' }, 'Also: ', e.also.join(' · ')) : null),
    h('section', { class: 'card stack' },
      h('div', { class: 'src-head' }, h('p', { class: 't-label' }, 'In the books’ words'), h('span', { class: 'spacer' }),
        sayBtn(() => e.lead.map((l) => l.quote).join(' '), `Read about ${e.name} aloud`)),
      ...e.lead.map((l) => h('div', { class: 'stack', style: 'gap:6px' },
        h('blockquote', { class: 'quote' }, l.quote),
        h('p', { class: 'cite' }, h('button', { class: 'disclose', style: 'padding:4px 0', onclick: () => openReader(WHERE.get(l.p)?.section.id, l.p, [l.quote]) }, `Read it in context — §${l.sec}`)))),
      gloss.length ? h('p', { class: 't-small' }, 'Glossary: ', gloss[0].def) : null),
    h('h2', { class: 'group-title' }, `Where the books mention ${e.name.split(' (')[0]} (${e.mentions.length})`),
    ...[...byChapter.values()].map(({ w, list }) => h('div', { class: 'stack', style: 'gap:8px' },
      h('p', { class: 't-label' }, `${w.book.id === 'pre' ? 'Pre' : 'Post'}-Confederation · Chapter ${w.chapter.n}: ${w.chapter.title}`),
      ...list.slice(0, 6).map((x) => h('button', { class: 'mention', onclick: () => openReader(x.section.id, x.para.id) },
        h('span', { class: 't-small' }, `§${x.section.num} ${x.section.title}`),
        h('p', { html: markMatch(snippet(x.para.t, mentionRe), mentionRe) }))),
      list.length > 6 ? h('p', { class: 't-small' }, `…and ${list.length - 6} more in this chapter.`) : null)),
  ];
}
