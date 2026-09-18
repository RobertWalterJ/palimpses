// Palimpsest — the app.
//
// Three rules carried over from the other apps, because they are Robert's:
//   - no clocks, ever; nothing expires while you think;
//   - everything can be read aloud, by a button, and nothing speaks at you
//     unless you ask it to;
//   - nothing is claimed without its source: every reveal shows the words from
//     the book, the paragraph they sit in, and a link to the page.

import { State, Round, cardState, nextDueSentence, shuffle, now, DAY } from './schedule.js';
import { initSpeech, unlock, say, stop, setRate, onSpeaking, available as speechAvailable } from './speech.js';
import { setSound, primeSound, resetStreak, setSpeaking, press, right as soundRight, wrong as soundWrong, advance, fanfare } from './sound.js';

const $app = document.getElementById('app');
let PACK = null;
let IDS = [];
const Q = new Map();

const LENS = {
  'own-terms': 'on its own terms',
  'against-progress': 'against the progress story',
  economy: 'exchange and obligation',
  record: 'how the past was kept',
  contested: 'still argued',
};

// ── tiny DOM helper ─────────────────────────────────────────────────────
function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
}
const SPEAKER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
const sayBtn = (text, cls = 'icon', label = 'Read aloud') => (speechAvailable()
  ? h('button', { class: cls, 'aria-label': label, html: SPEAKER, onclick: (e) => { e.stopPropagation(); unlock(); say(text); } })
  : null);
const screen = (...kids) => { stop(); $app.replaceChildren(...kids); window.scrollTo(0, 0); };

// ── boot ────────────────────────────────────────────────────────────────
async function boot() {
  State.load();
  applySettings();
  initSpeech();
  onSpeaking(setSpeaking);
  document.addEventListener('pointerdown', () => { unlock(); primeSound(); }, { once: true });
  PACK = window.__PALIMPSEST_DATA?.canada || await (await fetch('data/canada.json')).json();
  for (const q of PACK.questions) Q.set(q.id, q);
  IDS = PACK.questions.map((q) => q.id);
  home();
}

function applySettings() {
  const s = State.data.settings;
  setSound(s.sound);
  setRate(s.rate);
  if (s.theme === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', s.theme);
}

// ── home ────────────────────────────────────────────────────────────────
function counts(ids) {
  const c = { unseen: 0, met: 0, known: 0 };
  for (const id of ids) {
    const st = cardState(State.card(id));
    if (st === 'unseen') c.unseen++; else if (st === 'met') c.met++; else c.known++;
  }
  return c;
}

function home() {
  const c = counts(IDS);
  const due = State.dueIds(IDS).length;
  const fresh = IDS.filter((id) => !State.card(id)).length;
  const run = State.runOfDays();
  const total = IDS.length;
  const pct = (n) => `${(n / total) * 100}%`;

  const status = due ? `${due} to revisit today.`
    : fresh ? (c.unseen === total ? 'Nothing met yet.' : 'Up to date. There are new questions waiting.')
      : null;
  const next = !due && !fresh ? State.nextDue(IDS) : null;

  screen(
    h('header', {},
      h('h1', { class: 'brand' }, 'Palimpsest',
        h('small', {}, 'History from more than one centre. Every answer shows where it came from.'))),
    h('section', { class: 'card stack' },
      h('div', { class: 'eyebrow' }, PACK.title),
      h('h2', {}, PACK.chapters.map((ch) => ch.title).join(' · ')),
      h('p', { class: 'lede' }, PACK.blurb),
      h('div', { class: 'bar', role: 'img', 'aria-label': `${c.known} known, ${c.met} met, ${c.unseen} not yet met, of ${total}` },
        h('i', { class: 'k', style: `width:${pct(c.known)}` }), h('i', { class: 'm', style: `width:${pct(c.met)}` })),
      h('div', { class: 'cite' }, `${c.known} known · ${c.met} met · ${c.unseen} not yet met`),
      status ? h('p', { class: 'lede' }, status) : null,
      next ? h('p', { class: 'lede' }, nextDueSentence(next)) : null,
      run >= 2 ? h('p', { class: 'cite' }, `${run} days running.`) : null),
    h('div', { class: 'stack' },
      due || fresh
        ? h('button', { class: 'btn primary wide', onclick: () => { press(); play(false); } }, due ? 'Revisit and learn' : 'Learn')
        : null,
      c.unseen < total
        ? h('button', { class: 'btn wide', onclick: () => { press(); play(true); } }, 'Practise — does not move the schedule')
        : null,
      h('div', { class: 'row' },
        h('button', { class: 'btn quiet', onclick: progress }, 'Progress'),
        h('span', { class: 'spacer' }),
        h('button', { class: 'btn quiet', onclick: settings }, 'Settings'),
        h('button', { class: 'btn quiet', onclick: about }, 'Sources'))),
  );
}

// ── a round ─────────────────────────────────────────────────────────────
let round = null;
let tally = { n: 0, right: 0, streak: 0 };

function play(practice) {
  round = new Round(IDS, { practice });
  tally = { n: 0, right: 0, streak: 0 };
  resetStreak();
  if (round.empty) return home();
  ask();
}

function ask() {
  const id = round.next();
  if (!id) return finish();
  const q = Q.get(id);
  if (q.kind === 'order') return askOrder(q);

  const opts = shuffle([q.answer, ...q.options]);
  const optEls = opts.map((label) => {
    const b = h('button', { class: 'opt', onclick: () => choose(label) }, label, sayBtn(label, 'icon say', `Read “${label}” aloud`));
    b.dataset.label = label;
    return b;
  });
  const reveal = h('div', { class: 'stack' });
  const foot = h('div', { class: 'foot' });

  function choose(label) {
    const ok = label === q.answer;
    for (const b of optEls) {
      b.disabled = true;
      if (b.dataset.label === q.answer) b.classList.add('right');
      else if (b.dataset.label === label) b.classList.add('wrong');
      else b.classList.add('faded');
    }
    grade(q, ok);
    reveal.replaceChildren(...revealCard(q, ok));
    foot.replaceChildren(h('button', { class: 'btn primary wide', onclick: () => { advance(); ask(); } }, 'Next'));
    reveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (State.data.settings.readAloud === 'auto') say((ok ? 'Right. ' : 'Not quite. ') + q.answer + '. ' + q.ev[0].quote);
  }

  screen(topBar(), h('div', { class: 'row' }, h('p', { class: 'prompt' }, q.prompt), sayBtn(q.prompt)),
    h('div', { class: 'stack' }, optEls), reveal, foot);
  if (State.data.settings.readAloud === 'auto') say(q.prompt);
}

function askOrder(q) {
  const items = shuffle(q.items);
  const picked = [];
  const reveal = h('div', { class: 'stack' });
  const foot = h('div', { class: 'foot' });
  const els = items.map((it) => {
    const b = h('button', { class: 'opt', onclick: () => tap(it, b) }, h('span', { class: 'label' }, it.label), sayBtn(it.label, 'icon say', 'Read aloud'));
    return b;
  });

  function draw() {
    els.forEach((b, i) => {
      const at = picked.indexOf(items[i]);
      const old = b.querySelector('.n');
      if (old) old.remove();
      if (at >= 0) b.prepend(h('span', { class: 'n' }, String(at + 1)));
    });
  }
  function tap(it) {
    if (picked.length === items.length) return;   // settled
    press();
    const i = picked.indexOf(it);
    if (i >= 0) picked.splice(i, 1); else picked.push(it);
    draw();
    if (picked.length === items.length) settle();
  }
  function settle() {
    const truth = q.items.slice().sort((a, b) => a.at - b.at);
    const ok = picked.every((it, i) => it === truth[i]);
    els.forEach((b, i) => {
      b.disabled = true;
      const pos = picked.indexOf(items[i]);
      b.classList.add(truth[pos] === items[i] ? 'right' : 'wrong');
    });
    grade(q, ok);
    reveal.replaceChildren(
      h('div', { class: `verdict ${ok ? 'good' : 'bad'}` }, ok ? '✓ In order.' : '✗ Not quite. Oldest first:'),
      ...truth.map((it) => h('div', { class: 'card stack' },
        h('div', { class: 'answer' }, `${it.when || fmtYear(it.at)} — ${it.label}`),
        h('blockquote', { class: 'quote' }, it.ev.quote),
        h('div', { class: 'cite' }, h('a', { href: it.ev.url, target: '_blank', rel: 'noopener' }, it.ev.sec)))),
      chips(q),
    );
    foot.replaceChildren(h('button', { class: 'btn primary wide', onclick: () => { advance(); ask(); } }, 'Next'));
  }

  screen(topBar(), h('div', { class: 'row' }, h('p', { class: 'prompt' }, q.prompt + ' Tap them in order.'), sayBtn(q.prompt)),
    h('div', { class: 'stack' }, els), reveal, foot);
}

const fmtYear = (y) => (y < 0 ? `${-y} BCE` : y < 1000 ? `${y} CE` : String(y));

function grade(q, ok) {
  const c = State.answer(q.id, ok, { practice: round.practice });
  round.after(q.id, c);
  tally.n++;
  if (ok) { tally.right++; tally.streak++; soundRight(); } else { tally.streak = 0; soundWrong(); }
}

function chips(q) {
  return (q.lens || []).length ? h('div', { class: 'chips' }, q.lens.map((l) => h('span', { class: 'chip' }, LENS[l] || l))) : null;
}

// Where it came from. The quoted words first, then — one tap away — the whole
// paragraph with those words marked, then the link to the page itself.
function revealCard(q, ok) {
  const out = [];
  out.push(h('div', { class: `verdict ${ok ? 'good' : 'bad'}` }, ok ? '✓ Right.' : '✗ Not quite.'));
  out.push(h('div', { class: 'row' }, h('p', { class: 'answer' }, q.answer), sayBtn(q.answer)));
  if ((q.lens || []).includes('contested')) {
    out.push(h('p', { class: 'lede' }, 'The book itself says this is uncertain — which is the point of the question.'));
  }
  const bySection = new Map();
  for (const e of q.ev) {
    if (!bySection.has(e.para)) bySection.set(e.para, { ...e, quotes: [] });
    bySection.get(e.para).quotes.push(e.quote);
  }
  for (const e of bySection.values()) {
    const card = h('div', { class: 'card stack' },
      h('div', { class: 'eyebrow' }, 'From the book'),
      h('div', { class: 'row' }, h('blockquote', { class: 'quote' }, e.quotes.join(' … ')), sayBtn(e.quotes.join('. '))),
      h('details', {},
        h('summary', {}, 'The whole paragraph'),
        h('p', { class: 'para', html: markQuotes(e.para, e.quotes) })),
      h('div', { class: 'cite' }, h('a', { href: e.url, target: '_blank', rel: 'noopener' }, `§${e.sec}`), ' — ', e.cite));
    out.push(card);
  }
  out.push(chips(q));
  return out;
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const normQ = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
function markQuotes(para, quotes) {
  let html = esc(para);
  for (const q of quotes) {
    const target = esc(q);
    const at = normQ(html).indexOf(normQ(target));
    if (at >= 0) html = html.slice(0, at) + '<mark>' + html.slice(at, at + target.length) + '</mark>' + html.slice(at + target.length);
  }
  return html;
}

function topBar() {
  const done = tally.n;
  const left = round.queue.length;
  const total = done + left + 1;
  return h('div', { class: 'row' },
    h('button', { class: 'icon', 'aria-label': 'Stop and go home', onclick: home, html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' }),
    h('div', { class: 'pips', 'aria-label': `Question ${done + 1} of about ${total}` },
      Array.from({ length: Math.min(total, 16) }, (_, i) => h('i', { class: i < done ? 'on' : i === done ? 'now' : '' }))),
    h('span', { class: 'spacer' }),
    round.practice ? h('span', { class: 'chip' }, 'practice') : null);
}

function finish() {
  if (tally.n && tally.right === tally.n) fanfare();
  const due = State.dueIds(IDS).length;
  const next = State.nextDue(IDS);
  screen(
    h('h1', { class: 'brand' }, round.practice ? 'Practice done' : 'Round done'),
    h('div', { class: 'card stack' },
      h('p', { class: 'answer' }, `${tally.right} of ${tally.n} right.`),
      round.practice ? h('p', { class: 'lede' }, 'Practice does not move the schedule.') : null,
      !due && next ? h('p', { class: 'lede' }, nextDueSentence(next)) : null),
    h('button', { class: 'btn primary wide', onclick: home }, 'Home'));
}

// ── progress ────────────────────────────────────────────────────────────
function progress() {
  const byLens = {};
  for (const q of PACK.questions) for (const l of q.lens) {
    const b = byLens[l] || (byLens[l] = { n: 0, known: 0, met: 0 });
    b.n++;
    const st = cardState(State.card(q.id));
    if (st === 'known' || st === 'secure') b.known++; else if (st === 'met') b.met++;
  }
  const days = Object.entries(State.data.days).sort().slice(-14);
  screen(
    h('div', { class: 'row' }, h('button', { class: 'icon', 'aria-label': 'Back', onclick: home, html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' }), h('h2', {}, 'Progress')),
    h('p', { class: 'lede' }, '“Known” means you had it after at least three weeks away. “Met” means you have seen it and are still learning it.'),
    h('div', { class: 'card stack' },
      h('div', { class: 'eyebrow' }, 'By thread'),
      Object.entries(byLens).map(([l, b]) => h('div', { class: 'stack', style: 'gap:6px' },
        h('div', { class: 'row' }, h('span', {}, LENS[l] || l), h('span', { class: 'spacer' }), h('span', { class: 'cite' }, `${b.known} known · ${b.met} met · of ${b.n}`)),
        h('div', { class: 'bar' }, h('i', { class: 'k', style: `width:${(b.known / b.n) * 100}%` }), h('i', { class: 'm', style: `width:${(b.met / b.n) * 100}%` }))))),
    h('div', { class: 'card stack' },
      h('div', { class: 'eyebrow' }, 'Recent days'),
      days.length ? days.reverse().map(([d, v]) => h('div', { class: 'row' }, h('span', {}, d), h('span', { class: 'spacer' }), h('span', { class: 'cite' }, `${v.right} of ${v.n} right`)))
        : h('p', { class: 'lede' }, 'Nothing yet.')));
}

// ── settings ────────────────────────────────────────────────────────────
function settings() {
  const s = State.data.settings;
  const seg = (key, choices) => h('div', { class: 'seg' }, choices.map(([v, label]) =>
    h('button', { 'aria-pressed': String(s[key] === v), onclick: () => { s[key] = v; State.save(); applySettings(); settings(); } }, label)));
  const rate = h('input', { type: 'range', min: '0.6', max: '1.3', step: '0.05', value: String(s.rate), 'aria-label': 'Reading speed',
    oninput: (e) => { s.rate = +e.target.value; setRate(s.rate); State.save(); }, onchange: () => say('This is the reading speed.') });
  screen(
    h('div', { class: 'row' }, h('button', { class: 'icon', 'aria-label': 'Back', onclick: home, html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' }), h('h2', {}, 'Settings')),
    h('div', { class: 'card' },
      h('div', { class: 'setting' }, h('label', {}, 'Read aloud'), seg('readAloud', [['manual', 'When I tap'], ['auto', 'Automatically']])),
      h('div', { class: 'setting' }, h('label', {}, 'Reading speed'), rate),
      h('div', { class: 'setting' }, h('label', {}, 'Sound'), seg('sound', [[true, 'On'], [false, 'Off']])),
      h('div', { class: 'setting' }, h('label', {}, 'Theme'), seg('theme', [['system', 'Phone'], ['light', 'Light'], ['dark', 'Dark']]))),
    h('p', { class: 'cite' }, 'There is no timer anywhere in this app.'));
}

function about() {
  screen(
    h('div', { class: 'row' }, h('button', { class: 'icon', 'aria-label': 'Back', onclick: home, html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' }), h('h2', {}, 'Sources')),
    h('div', { class: 'card stack' },
      h('p', { class: 'lede' }, 'Every question is built from openly licensed text and checked, word for word, against the paragraph it cites before it can ship.'),
      h('p', {}, 'John Douglas Belshaw, ', h('a', { href: 'https://opentextbc.ca/preconfederation/', target: '_blank', rel: 'noopener' }, 'Canadian History: Pre-Confederation'),
        ' (BCcampus, 2015) and ', h('a', { href: 'https://opentextbc.ca/postconfederation/', target: '_blank', rel: 'noopener' }, 'Canadian History: Post-Confederation'),
        ' (BCcampus, 2016). CC BY 4.0.'),
      h('p', { class: 'cite' }, 'This app’s questions and explanations: CC BY-NC-SA 4.0. Not for sale.')));
}

boot();
