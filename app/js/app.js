// Palimpsest — the app.
//
// Robert's standing rules, which every screen here keeps:
//   - no clocks, ever; nothing expires while you think;
//   - everything can be read aloud, by a button; nothing speaks unless asked;
//   - nothing is claimed without its source.
// The design and dyslexia audits (September 2026) shaped the rest: a hero
// built from the pack's own undertext, upright reading type at a size the
// reader chooses, options whose text the phone's own Look Up can reach, a
// verdict that takes focus, a round-end that lists what slipped, and real
// back-button behaviour.

import { VERSIONS } from './versions.js';
import { State, Round, cardState, isHolding, nextDueSentence, shuffle, now, DAY, dayKey } from './schedule.js';
import { initSpeech, unlock, say, setRate, onSpeaking } from './speech.js';
import { Reader, sentences } from './reader.js';
import * as S from './sound.js';
import { h, esc, ICON, iconBtn, sayBtn, sheet, closeSheet, show, back, route, setLeaveGuard, applyReading, READ_DEFAULTS } from './ui.js';
import { loadLibrary, openLibrary, openReader, openEntry, readingSheet, sectionOf } from './library.js';

let PACK = null;
let IDS = [];
const Q = new Map();

const LENS = {
  'own-terms': ['On its own terms', 'A society described by what it was, not by what it lacked.'],
  'against-progress': ['Beyond the myths', 'Myths in either direction — “primitive and unchanging”, or “peaceful and untouched” — set against the evidence.'],
  economy: ['Exchange and obligation', 'Trade, currency, gifts and what they bound people to.'],
  record: ['How the past is kept', 'Oral tradition, scrolls, wampum, landscape: the records that exist.'],
  contested: ['Still argued', 'The book itself says this is uncertain, so the question does too.'],
};

// ── boot ────────────────────────────────────────────────────────────────
async function boot() {
  State.load();
  const s = State.data.settings;
  s.reading = { ...READ_DEFAULTS, ...(s.reading || {}) };
  if (s.ambience == null) s.ambience = false;
  applySettings();
  initSpeech();
  onSpeaking(S.setSpeaking);
  document.addEventListener('pointerdown', () => { unlock(); S.primeSound(); if (s.sound && s.ambience) S.setAmbience(true); }, { once: true });
  PACK = window.__PALIMPSEST_DATA?.canada || await (await fetch('data/canada.json')).json();
  for (const q of PACK.questions) Q.set(q.id, q);
  IDS = PACK.questions.map((q) => q.id);
  await loadLibrary();
  State.snapshot(IDS);
  show('home', homeScreen, { replace: true });
}

function applySettings() {
  const s = State.data.settings;
  S.setSound(s.sound);
  setRate(s.rate);
  if (s.theme === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', s.theme);
  applyReading(s.reading);
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

const evOf = (q) => q.ev || q.items.map((i) => i.ev);

// ── growth ──────────────────────────────────────────────────────────────
// What changed, in words: "Up 6 this week", from the day snapshots.
// `lead`: start with the count itself (the round-end card); off where the
// count is already shown beside it.
function growthLine(lead = true) {
  const can = State.canAnswer(IDS);
  const then = State.snapAt(now() - 7 * DAY);
  const up = then ? can - then.can : null;
  const turned = turnedAround().length;
  const parts = lead ? [`You can answer ${can} of ${IDS.length}`] : [];
  if (up != null && up > 0) parts.push(`up ${up} on a week ago`);
  if (turned) parts.push(`${turned} turned around`);
  if (!parts.length) return 'Questions you get right show up here, and climb as you learn.';
  const txt = parts.join(' · ') + '.';
  return txt[0].toUpperCase() + txt.slice(1);
}
// Questions missed at first sight and later answered right, on a later day.
function turnedAround() {
  return IDS.map((id) => [id, State.card(id)]).filter(([, k]) => k && k.turnedAt).sort((a, b) => b[1].turnedAt - a[1].turnedAt);
}
const shortDate = (t) => new Date(t).toLocaleDateString('en-CA', { day: 'numeric', month: 'short' });

// A small line chart of the day snapshots: what you can answer (solid) and
// what's known (dotted). Drawn only once there are two or more days.
function growthChart() {
  const snaps = Object.entries(State.data.days).filter(([, v]) => v.snap).sort().slice(-60);
  if (snaps.length < 2) return h('p', { class: 't-body' }, 'The line starts after your second day of playing.');
  // Scaled to what's been met so far (rounded up to ten), not the whole pack:
  // against 118, a climb from 3 to 25 looks flat.
  const top = Math.max(...snaps.map(([, v]) => Math.max(v.snap.met, v.snap.can)));
  const W = 320, H = 130, L = 30, Rm = 8, T = 10, B = 22, max = Math.max(10, Math.ceil(top / 10) * 10);
  const x = (i) => L + (i / (snaps.length - 1)) * (W - L - Rm);
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const path = (f) => snaps.map(([, v], i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(f(v.snap)).toFixed(1)}`).join('');
  const last = snaps[snaps.length - 1][1].snap;
  const label = `From ${snaps[0][1].snap.can} to ${last.can} questions you can answer, over ${snaps.length} days played; ${last.known} known.`;
  return h('div', { class: 'growth', html: `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
    ${[0, Math.round(max / 2), max].map((v) => `<line x1="${L}" x2="${W - Rm}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" class="ax">${v}</text>`).join('')}
    <text x="${L}" y="${H - 6}" class="ax">${shortDate(snaps[0][0] + 'T12:00:00')}</text>
    <text x="${W - Rm}" y="${H - 6}" text-anchor="end" class="ax">${shortDate(snaps[snaps.length - 1][0] + 'T12:00:00')}</text>
    <path d="${path((s) => s.known)}" class="gk"/><path d="${path((s) => s.can)}" class="gc"/>
    <circle cx="${x(snaps.length - 1)}" cy="${y(last.can)}" r="4" class="gd"/></svg>` });
}

// ── threads ─────────────────────────────────────────────────────────────
// A thread lines up events across regions: a timeline in lanes, and its own
// questions. Opened from Home; its questions can be played on their own.
const threads = () => PACK.chapters.filter((c) => c.thread);
function threadsCard() {
  const ts = threads();
  if (!ts.length) return null;
  return h('section', { class: 'card stack' }, h('p', { class: 't-label' }, 'Threads across the world'),
    ...ts.map((t) => {
      const ids = chapterIds(t.id);
      const c = counts(ids);
      return h('button', { class: 'chrow', type: 'button', onclick: () => { S.press(); show('thread', () => threadScreen(t.id)); } },
        h('span', { class: 'chtop' }, h('b', {}, t.title), h('span', { class: 't-small num' }, `${c.known + c.met} of ${ids.length}`)),
        h('span', { class: 't-small' }, `${t.timeline.length} dated events in ${t.lanes.length} regions · ${ids.length} questions`));
    }));
}
function threadScreen(id) {
  const t = PACK.chapters.find((c) => c.id === id);
  const ids = chapterIds(id);
  const laneName = new Map(t.lanes.map((l) => [l.id, l.name]));
  let only = null;
  const list = h('ol', { class: 'lanes' });
  const draw = () => list.replaceChildren(...t.timeline.filter((e) => !only || e.lane === only).map((e) => {
    const w = sectionOf(e.ev.p);
    return h('li', { class: `lane-row lane-${e.lane}` },
      h('b', { class: 'num yr' }, String(e.at)),
      h('div', {}, h('span', { class: 'lane-tag' }, laneName.get(e.lane)), h('p', { class: 'lane-label' }, e.label),
        w ? h('button', { class: 'disclose', style: 'padding:2px 0;min-height:32px', onclick: () => openReader(w.section.id, e.ev.p, [e.ev.quote]) }, 'Where this comes from')
          : h('p', { class: 'cite' }, e.ev.cite)));
  }));
  draw();
  const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Show a region' },
    [{ id: null, name: 'All regions' }, ...t.lanes].map((l) => {
      const b = h('button', { class: 'chip', type: 'button', 'aria-pressed': String(l.id === only) }, l.name);
      b.onclick = () => { only = l.id; for (const x of chips.children) x.setAttribute('aria-pressed', String(x === b)); draw(); };
      return b;
    }));
  const due = State.dueIds(ids).length, fresh = ids.filter((x) => !State.card(x)).length;
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('h1', { class: 't-title' }, 'Thread')),
    h('h2', { class: 'thread-title' }, t.title),
    h('p', { class: 't-body' }, 'The same years, seen from China, Europe, North America and the Caribbean. Every date is quoted from its source.'),
    h('button', { class: 'btn primary wide', onclick: () => play(!(due || fresh), ids) }, due || fresh ? `Play this thread · ${fresh} new${due ? `, ${due} to revisit` : ''}` : 'Recall test on this thread'),
    h('section', { class: 'card stack' }, h('p', { class: 't-label' }, 'The big questions'), h('ul', { class: 'bigs' }, t.big.map((b) => h('li', {}, b.q)))),
    h('section', { class: 'card stack' }, h('p', { class: 't-label' }, 'Timeline'), chips, list),
  ];
}
route('thread', homeScreen);
// "Meanwhile": events in other regions within fifteen years of a dated
// question, from the thread timelines — the world at the same moment.
function meanwhile(q) {
  if (q.at == null) return null;
  const own = PACK.chapters.find((c) => c.id === q.ch);
  const pool = threads().flatMap((t) => t.timeline.map((e) => ({ ...e, laneName: t.lanes.find((l) => l.id === e.lane)?.name })));
  // Leave out only the question's own region (its own event that year).
  const ownLanes = new Set(own?.timeline?.filter((e) => e.at === q.at).map((e) => e.lane) || []);
  const near = pool.filter((e) => Math.abs(e.at - q.at) <= 15 && e.at !== q.at && !ownLanes.has(e.lane))
    .sort((a, b) => Math.abs(a.at - q.at) - Math.abs(b.at - q.at));
  const seen = new Set(), pick = [];
  for (const e of near) if (!seen.has(e.lane) && pick.length < 2) { seen.add(e.lane); pick.push(e); }
  if (!pick.length) return null;
  return h('section', { class: 'meanwhile' },
    h('p', { class: 't-label' }, `Meanwhile, around ${q.at}`),
    ...pick.map((e) => h('p', { class: 'mw' }, h('b', { class: 'num' }, String(e.at)), ` · ${e.laneName}: ${e.label}`)));
}

// ── chapters ────────────────────────────────────────────────────────────
// Progress by chapter, and a round from one chapter. New questions come in
// the order the chapter tells its story, so a chapter round reads as one.
// A question named in a list: an order question by what it orders.
function listTitle(q) {
  if (q.kind === 'order') return 'In order: ' + q.items.slice(0, 2).map((i) => i.label).join('; ') + '…';
  const ask = splitPrompt(q.prompt).ask;
  return ask.length < 45 ? q.prompt : ask;
}
function chapterIds(chId) { return PACK.questions.filter((q) => q.ch === chId).map((q) => q.id); }
function chapterStats(withThreads = false) {
  return PACK.chapters.filter((ch) => withThreads || !ch.thread).map((ch) => {
    const ids = chapterIds(ch.id);
    const c = counts(ids);
    return { ch, ids, n: ids.length, ...c, due: State.dueIds(ids).length, fresh: ids.filter((id) => !State.card(id)).length };
  });
}
function kbar(b) {
  return h('div', { class: 'bar', role: 'img', 'aria-label': `${b.known} known, ${b.met} met, of ${b.n}` },
    h('i', { class: 'k', style: `width:${(b.known / b.n) * 100}%` }), h('i', { class: 'm', style: `width:${(b.met / b.n) * 100}%` }));
}
function chapterRows(stats) {
  return h('div', { class: 'chapters' }, stats.map((s) => {
    const todo = s.due + s.fresh;
    const note = todo ? (s.due ? `${s.due} to revisit` : `${s.fresh} new`) : s.unseen === 0 ? 'All met — take a recall test' : 'Up to date';
    return h('button', { class: 'chrow', type: 'button', onclick: () => { S.press(); play(!todo, s.ids); } },
      h('span', { class: 'chtop' }, h('b', {}, s.ch.title), h('span', { class: 't-small num' }, `${s.known + s.met} of ${s.n}`)),
      kbar(s),
      h('span', { class: 't-small' }, note));
  }));
}
// The pool the hero and "passage of the day" draw from: every verified quote.
function passages() {
  const seen = new Set(), out = [];
  for (const q of PACK.questions) for (const e of evOf(q)) if (!seen.has(e.quote)) { seen.add(e.quote); out.push(e); }
  return out;
}
function dayIndex(n) { let x = 0; for (const ch of dayKey()) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x % n; }

function hero() {
  // Three voices from the past, faint and cropped — three different people,
  // none of them today's voice, changing once a day.
  const voices = PACK.voices?.length ? PACK.voices : passages();
  const today = todaysVoice();
  const i0 = dayIndex(voices.length);
  const pool = [];
  for (const v of [...voices.slice(i0 + 1), ...voices.slice(0, i0 + 1)]) {
    if (pool.length < 3 && v !== today && !(today && v.who === today.who) && !pool.some((p) => p.who && p.who === v.who)) pool.push(v);
  }
  const under = h('div', { class: 'undertext', 'aria-hidden': 'true' }, pool.map((p) => h('p', {}, p.quote)));
  // The pack's own centres on a line of years, from the first people here
  // ("at least 14,000 years ago", pre-2.2-p6) to the Haudenosaunee League,
  // c. 1450. It ends on a nation's own founding, not on Europe's arrival.
  // Fourteen thousand years on a linear line would crowd everything after
  // 1 CE into the last tenth, so the scale is compressed (log of years
  // before 1500) and the caption says so.
  const x = (y) => 100 - 100 * Math.log(1 + (1500 - y) / 100) / Math.log(1 + 13500 / 100);
  const centres = [
    { name: 'Maritime Archaic', when: 'c. 7000 BCE', at: -7000, go: () => openEntry('maritime-archaic') },
    { name: 'Keatley Creek', when: 'c. 2800 BCE', at: -2800, go: () => { const w = sectionOf('pre-2.4-p8'); if (w) openReader(w.section.id, 'pre-2.4-p8'); } },
    { name: 'Cahokia', when: 'c. 600 CE', at: 600, go: () => openEntry('mississippian') },
    { name: 'Haudenosaunee League', when: 'c. 1450', at: 1450, go: () => openEntry('haudenosaunee') },
  ];
  const last = centres.length - 1;
  const strip = h('div', { class: 'strip' },
    h('div', { class: 'rail' },
      centres.map((c) => h('button', { class: 'dot', style: `left:${x(c.at)}%;cursor:pointer;padding:0`, 'aria-label': `${c.name}, ${c.when} — open`, title: c.name, onclick: c.go }))),
    h('div', { class: 'labels', 'aria-hidden': 'true' },
      ...centres.map((c, i) => h('span', { class: [i === last ? 'r' : i === 0 ? 'l' : '', i % 2 ? 'lo' : ''].join(' ').trim(), style: `left:${i === last ? 100 : x(c.at)}%` }, c.name, h('small', {}, c.when)))),
    h('p', { class: 'caption' }, 'From the first people here, 14,000 years ago, to the League. Older years are squeezed to fit.'));
  return h('header', { class: 'hero' }, under,
    h('h1', { class: 'wordmark' }, 'Palim', h('span', {}, 'psest')),
    h('p', { class: 'tagline' }, 'History has many voices.'),
    strip);
}

// ── voices ──────────────────────────────────────────────────────────────
// One a day on Home; all of them, named, on their own screen at the foot of
// Home — the details are there to browse, not in the way.
function todaysVoice() {
  const v = PACK.voices || [];
  return v.length ? v[(dayIndex(997) * 7) % v.length] : null;
}
function voiceSource(v) {
  return v.p && sectionOf(v.p)
    ? h('button', { class: 'disclose', style: 'padding:2px 0', onclick: () => openReader(sectionOf(v.p).section.id, v.p, [v.quote]) }, `Read the passage — ${v.sec}`)
    : h('p', { class: 'cite' }, h('a', { href: v.url, target: '_blank', rel: 'noopener' }, 'The scanned book'), ' — ', v.cite);
}
function voiceOfTheDay() {
  const v = todaysVoice();
  if (!v) return null;
  return h('section', { class: 'card voice-day' },
    h('div', { class: 'src-head' }, h('p', { class: 't-label' }, 'Today’s voice'), h('span', { class: 'spacer' }), sayBtn(v.quote, 'Read today’s voice aloud')),
    h('blockquote', { class: 'vq' }, v.quote),
    h('p', { class: 'vwho' }, v.who),
    h('p', { class: 't-small' }, `${v.when[0].toUpperCase() + v.when.slice(1)}. ${v.recorded}.${v.note ? ' ' + v.note : ''}`));
}
function voicesScreen() {
  const today = todaysVoice();
  const card = (v) => h('section', { class: 'voice stack' },
    h('div', { class: 'q-head' }, h('blockquote', { class: 'quote' }, v.quote), sayBtn(v.quote, 'Read these words aloud')),
    h('p', { class: 't-body' }, h('b', {}, v.who), `, ${v.when}.`),
    h('p', { class: 't-small' }, v.recorded + '.' + (v.note ? ' ' + v.note : '')),
    voiceSource(v));
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('h1', { class: 't-title' }, 'Voices')),
    h('p', { class: 't-body' }, 'People of the past in their own words, checked word for word against the source. Most Indigenous words from before 1800 survive only as a European wrote them down; each says who.'),
    h('section', { class: 'card' }, today ? card(today) : null,
      ...PACK.voices.filter((v) => v !== today).map(card)),
  ];
}
route('voices', voicesScreen);

function ring(c, total) {
  const R = 40, C = 2 * Math.PI * R;
  const k = (c.known / total) * C, m = (c.met / total) * C;
  return h('div', { html: `<svg class="ring" viewBox="0 0 96 96" role="img" aria-label="${c.known} known and ${c.met} met, of ${total}">
    <circle class="track" cx="48" cy="48" r="${R}"/>
    <circle class="met" cx="48" cy="48" r="${R}" stroke-dasharray="${k + m} ${C}" transform="rotate(-90 48 48)"/>
    <circle class="known" cx="48" cy="48" r="${R}" stroke-dasharray="${k} ${C}" transform="rotate(-90 48 48)"/>
    <text x="48" y="51" text-anchor="middle">${c.known + c.met}/${total}</text>
    <text class="sub" x="48" y="65" text-anchor="middle">met</text></svg>` });
}

function homeScreen() {
  const c = counts(IDS);
  const total = IDS.length;
  const due = State.dueIds(IDS).length;
  const fresh = IDS.filter((id) => !State.card(id)).length;
  const run = State.runOfDays();
  const first = c.unseen === total;
  const next = !due && !fresh ? State.nextDue(IDS) : null;

  const mode = (cls, icon, title, sub, go) => h('button', { class: `mode ${cls}`, onclick: () => { S.press(); go(); } },
    h('span', { class: 'ic', html: ICON[icon] }), h('span', {}, h('b', {}, title), h('span', { class: 't-small' }, sub)),
    h('span', { html: ICON.chev.replace('<svg', '<svg class="chev"') }));
  const learnSub = first ? 'Five questions, each with its source.'
    : due ? `${due} to revisit${fresh ? ', then new questions' : ''}` : `${Math.min(fresh, 5)} new questions waiting`;

  return [
    hero(),
    first && !State.data.placement && PACK.placement?.length
      ? mode('primary', 'learn', 'Where do you start?', 'Eight quick questions, easy to hard. Then your first round.', () => startPlacement())
      : null,
    first && !State.data.placement && PACK.placement?.length
      ? h('button', { class: 'disclose', style: 'justify-self:center', onclick: () => play(false) }, 'Skip it and start learning')
      : due || fresh ? mode('primary', 'learn', due ? 'Revisit and learn' : 'Learn', learnSub, () => play(false))
      : h('section', { class: 'card stack' }, h('p', { class: 't-title' }, 'You’re up to date.'), next ? h('p', { class: 't-body' }, nextDueSentence(next)) : null),
    voiceOfTheDay(),
    first ? h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'How it works'),
      h('p', { class: 't-body' }, 'Each question comes from an open source: John Douglas Belshaw’s textbooks on Canadian history, and new archaeology published openly. After you answer, you see the exact passage — and you can read the whole section, or have it read to you.'),
      h('p', { class: 't-body' }, h('b', {}, 'Met'), ' means you’ve seen a question. ', h('b', {}, 'Known'), ' means you still had it after three weeks away. There’s no timer anywhere.')) : null,
    !first ? h('section', { class: 'card ring-row' }, ring(c, total),
      h('div', { class: 'stack', style: 'gap:10px' },
        h('div', { class: 'stats' },
          h('div', { class: 'stat' }, h('b', { class: 'num' }, String(State.canAnswer(IDS))), h('span', {}, 'can answer')),
          h('div', { class: 'stat' }, h('b', { class: 'num' }, String(c.known)), h('span', {}, h('i', { style: 'background:var(--ink)' }), 'known')),
          h('div', { class: 'stat' }, h('b', { class: 'num' }, String(run)), h('span', {}, run === 1 ? 'day' : 'days running'))),
        h('p', { class: 't-small' }, growthLine(false)))) : null,
    !first ? h('section', { class: 'card stack' }, h('p', { class: 't-label' }, 'Chapters'), chapterRows(chapterStats())) : null,
    threadsCard(),
    !first ? mode('', 'practise', 'Recall test', 'Questions you’ve met, the ones you’re likeliest to have forgotten first. Won’t change your review dates.', () => play(true)) : null,
    h('nav', { class: 'tiles', 'aria-label': 'More' },
      h('button', { class: 'tile', onclick: () => { S.press(); openLibrary(); } }, h('span', { html: ICON.library }), 'Library'),
      h('button', { class: 'tile', onclick: () => { S.press(); show('progress', progressScreen); } }, h('span', { html: ICON.progress }), 'Progress'),
      h('button', { class: 'tile', onclick: () => { S.press(); show('settings', settingsScreen); } }, h('span', { html: ICON.settings }), 'Settings')),
    h('nav', { class: 'foot-links', 'aria-label': 'Browse and about' },
      PACK.voices?.length ? h('button', { class: 'disclose', type: 'button', onclick: () => show('voices', voicesScreen) }, 'All the voices') : null,
      h('button', { class: 'disclose', type: 'button', onclick: () => show('about', aboutScreen) }, 'About, sources and licences'),
      h('span', { class: 't-small num' }, versionText())),
  ];
}
route('home', homeScreen);

// A link into the library at the quoted paragraph.
function citeLine(e) {
  const w = e.p ? sectionOf(e.p) : null;
  return h('p', { class: 'cite' },
    w ? h('button', { class: 'disclose', style: 'padding:2px 0', onclick: () => openReader(w.section.id, e.p, [e.quote]) }, `Read this section — §${e.sec}`) : `§${e.sec}`);
}

// ── a round ─────────────────────────────────────────────────────────────
let round = null;
let tally = null;

// Everything asked since the app was opened: never asked again in the same
// session, in any round or in practice.
const sessionAsked = new Set();
// Similar questions: the same big question, or evidence from the same
// paragraph. Kept apart within a round.
const GROUP_OF = (id) => { const q = Q.get(id); return q ? q.ch + ':' + q.big : null; };
const PARAS_OF = (id) => { const q = Q.get(id); return q ? [...new Set(evOf(q).map((e) => e.p))] : []; };
function play(practice, ids = IDS) {
  round = new Round(ids, { practice, exclude: sessionAsked, pace: State.data.placement?.pace || null, groupOf: GROUP_OF, parasOf: PARAS_OF });
  round.scope = ids;
  round.heldBefore = IDS.filter((id) => isHolding(State.card(id))).length;
  // Which chapters were still unfinished, to mark the ones this round finishes.
  round.openBefore = new Set(chapterStats().filter((s) => s.unseen).map((s) => s.ch.id));
  tally = { n: 0, right: 0, streak: 0, missed: [] };
  S.resetStreak();
  if (round.empty) { sheet(h('p', { class: 't-body' }, 'Nothing to ask here yet.'), h('button', { class: 'btn primary wide', style: 'margin-top:14px', onclick: closeSheet }, 'OK')); return; }
  round.total = round.queue.length;
  setLeaveGuard(() => {
    if (!round || round.finished) return false;
    leaveSheet();
    return true;
  });
  nextQuestion(true);
}
// "Where do you start?" — a short, quick round: a one-line answer after
// each question, no source card, and a result that sets the pace.
const LEVELS = [
  { min: 0, name: 'Starting out', pace: { newPerRound: 4, newPerDay: 10 }, say: 'Four new questions a round, so each one has room to settle.' },
  { min: 4, name: 'Some grounding', pace: { newPerRound: 5, newPerDay: 12 }, say: 'Five new questions a round.' },
  { min: 6, name: 'Well read', pace: { newPerRound: 7, newPerDay: 18 }, say: 'Seven new questions a round: you’ll get through the pack faster.' },
];
function levelFor(score) { return [...LEVELS].reverse().find((l) => score >= l.min); }
function startPlacement() {
  const ids = (PACK.placement || []).filter((id) => !State.card(id));
  round = { placement: true, practice: false, queue: ids.slice(), total: ids.length, scope: IDS, openBefore: new Set(), heldBefore: 0,
    next() { return this.queue.shift() || null; }, after() {}, isRepeat() { return false; } };
  tally = { n: 0, right: 0, streak: 0, missed: [] };
  S.resetStreak();
  if (!ids.length) return;
  setLeaveGuard(() => { if (!round || round.finished) return false; leaveSheet(); return true; });
  nextQuestion(true);
}
function placementDone() {
  round.finished = true;
  setLeaveGuard(null);
  const score = tally.right, n = tally.n;
  const lv = levelFor(Math.round((score / Math.max(1, n)) * 8));
  State.data.placement = { at: now(), score, n, ids: PACK.placement, level: lv.name, pace: lv.pace };
  State.save();
  State.snapshot(IDS);
  show('done', () => [
    h('div', { class: 'topbar' }),
    h('h1', { class: 't-title', style: 'font-size:1.8rem' }, 'Where you start'),
    h('section', { class: 'card stack' },
      h('p', { class: 'answer num' }, `${score} of ${n}`),
      h('p', { class: 't-body' }, h('b', {}, lv.name), '. ', lv.say),
      h('p', { class: 't-body' }, 'The questions ran from widely known to specialist. You’ll meet these eight again in your rounds, and Progress will show how you do on them from here.')),
    h('div', { class: 'stack' },
      h('button', { class: 'btn primary wide', onclick: () => play(false) }, 'Start your first round'),
      h('button', { class: 'btn wide', onclick: () => show('home', homeScreen, { replace: true }) }, 'Home')),
  ], { replace: true });
}

function leaveSheet() {
  sheet(h('h2', { class: 't-title' }, 'Leave this round?'),
    h('p', { class: 't-body', style: 'margin:8px 0 16px' }, 'Your answers so far are saved.'),
    h('div', { class: 'row' },
      h('button', { class: 'btn wide', onclick: closeSheet }, 'Keep going'),
      h('button', { class: 'btn primary wide', onclick: () => { round.finished = true; setLeaveGuard(null); closeSheet(); show('home', homeScreen, { replace: true }); } }, 'Leave')));
}
function nextQuestion(firstOne = false) {
  const id = round.next();
  if (!id) return finish();
  const q = Q.get(id);
  show('round', q.kind === 'order' ? () => orderScreen(q) : () => choiceScreen(q), { replace: !firstOne });
}
route('round', () => [h('p', { class: 't-body', style: 'padding-top:40px' }, 'That round has ended.'),
  h('button', { class: 'btn primary wide', onclick: () => show('home', homeScreen, { replace: true }) }, 'Home')]);

function topBar() {
  const done = tally.n;
  const total = round.total;          // exact now that nothing is re-queued
  return h('div', { class: 'topbar' },
    iconBtn('back', 'Leave the round', () => leaveSheet(), 'icon plain'),
    h('div', { class: 'meter', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(total), 'aria-valuenow': String(done) },
      h('i', { style: `width:${(done / total) * 100}%` })),
    h('span', { class: 't-small num' }, `${done + 1} of ${total}`),
    round.practice ? h('span', { class: 'chip' }, 'recall test') : round.placement ? h('span', { class: 'chip' }, 'where you start') : null);
}

// "Setting. Question?" → the setting in a lighter line, the question on its
// own in bold (dyslexia audit).
function splitPrompt(p) {
  const parts = p.match(/[^.?!]+[.?!]+[”"’]?\s*/g) || [p];
  if (parts.length < 2) return { setup: null, ask: p };
  return { setup: parts.slice(0, -1).join('').trim(), ask: parts[parts.length - 1].trim() };
}
function questionHead(prompt) {
  const { setup, ask } = splitPrompt(prompt);
  return h('div', { class: 'q-head' },
    h('div', {}, setup ? h('p', { class: 'setup' }, setup) : null, h('h2', { class: 'ask' }, ask)),
    sayBtn(prompt, 'Read the question aloud'));
}

function afterAnswer(reveal) {
  const v = reveal.querySelector('.verdict');
  v.focus({ preventScroll: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => v.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }));
}

function choiceScreen(q) {
  const opts = shuffle([q.answer, ...q.options]);
  const reveal = h('div', { class: 'stack' });
  const foot = h('div', { class: 'foot' });
  const rows = opts.map((label) => {
    const b = h('button', { class: 'opt', type: 'button', onclick: () => choose(label) }, h('span', { class: 'mk', 'aria-hidden': 'true' }), h('span', {}, label));
    return { label, b, row: h('div', { class: 'optrow' }, b, sayBtn(label, `Read “${label}” aloud`)) };
  });

  function choose(label) {
    if (rows[0].b.disabled) return;
    const ok = label === q.answer;
    for (const r of rows) {
      r.b.disabled = true;
      if (r.label === q.answer) { r.b.classList.add('right'); r.b.querySelector('.mk').textContent = '✓'; r.b.setAttribute('aria-label', `${r.label} — the right answer`); }
      else if (r.label === label) { r.b.classList.add('wrong'); r.b.querySelector('.mk').textContent = '✗'; r.b.setAttribute('aria-label', `${r.label} — your answer, not right`); }
      else r.b.classList.add('faded');
    }
    grade(q, ok);
    reveal.replaceChildren(...(round.placement
      ? [h('p', { class: `verdict ${ok ? 'good' : 'bad'}`, tabindex: '-1' }, ok ? '✓ Right.' : `✗ It was: ${q.answer}`)]
      : revealCard(q, ok)));
    foot.replaceChildren(h('button', { class: 'btn primary wide', onclick: () => { S.advance(); nextQuestion(); } }, 'Next'));
    afterAnswer(reveal);
    if (State.data.settings.readAloud === 'auto') say((ok ? 'Right. ' : `Not quite. The answer is: ${q.answer}. `) + q.ev[0].quote);
  }

  if (State.data.settings.readAloud === 'auto') setTimeout(() => say(q.prompt), 250);
  return [topBar(), questionHead(q.prompt), h('div', { class: 'opts' }, rows.map((r) => r.row)), reveal, foot];
}

function orderScreen(q) {
  const items = shuffle(q.items);
  const picked = [];
  const reveal = h('div', { class: 'stack' });
  const checkBtn = h('button', { class: 'btn primary', style: 'flex:1', disabled: true, onclick: () => settle() }, 'Check the order');
  const clearBtn = h('button', { class: 'btn', onclick: () => { picked.length = 0; draw(); } }, 'Clear');
  const foot = h('div', { class: 'foot' }, h('div', { class: 'row' }, clearBtn, checkBtn));
  const rows = items.map((it) => {
    const b = h('button', { class: 'opt', type: 'button', onclick: () => tap(it) }, h('span', { class: 'mk' }), h('span', {}, it.label));
    return { it, b, row: h('div', { class: 'optrow' }, b, sayBtn(it.label)) };
  });
  function draw() {
    for (const r of rows) {
      const n = picked.indexOf(r.it);
      const mk = r.b.firstChild;
      mk.className = n >= 0 ? 'n' : 'mk';
      mk.textContent = n >= 0 ? String(n + 1) : '';
      r.b.setAttribute('aria-label', n >= 0 ? `${r.it.label}, placed ${n + 1}` : r.it.label);
    }
    checkBtn.disabled = picked.length !== items.length;
  }
  function tap(it) {
    if (rows[0].b.disabled) return;
    S.press();
    const i = picked.indexOf(it);
    if (i >= 0) picked.splice(i, 1); else picked.push(it);
    draw();
  }
  function settle() {
    const truth = q.items.slice().sort((a, b) => a.at - b.at);
    const ok = picked.every((it, i) => it === truth[i]);
    for (const r of rows) {
      r.b.disabled = true;
      const right = truth[picked.indexOf(r.it)] === r.it;
      r.b.classList.add(right ? 'right' : 'wrong');
      r.b.firstChild.className = 'mk';
      r.b.firstChild.textContent = right ? '✓' : '✗';
    }
    grade(q, ok);
    reveal.replaceChildren(
      h('p', { class: `verdict ${ok ? 'good' : 'bad'}`, tabindex: '-1' }, ok ? '✓ In order.' : '✗ Not quite. Oldest first:'),
      h('ol', { class: 'order-truth' }, truth.map((it) => h('li', {}, h('b', { class: 'num' }, it.when), ' ', it.label))),
      (() => {
        const box = h('div', { class: 'stack', hidden: true }, ...truth.map((it) => h('div', { class: 'stack', style: 'gap:6px' },
          h('div', { class: 'q-head' }, h('blockquote', { class: 'quote' }, it.ev.quote), sayBtn(`${it.when}. ${it.label}. ${it.ev.quote}`)),
          citeLine(it.ev))));
        const t = h('button', { class: 'disclose', type: 'button', 'aria-expanded': 'false' }, 'Where each date comes from');
        t.onclick = () => { box.hidden = !box.hidden; t.setAttribute('aria-expanded', String(!box.hidden)); };
        return h('section', { class: 'card stack' }, t, box);
      })(),
      bigPicture(q),
      lensChips(q));
    foot.replaceChildren(h('button', { class: 'btn primary wide', onclick: () => { S.advance(); nextQuestion(); } }, 'Next'));
    afterAnswer(reveal);
  }
  return [topBar(), questionHead('Put these in order, oldest first.'),
    h('p', { class: 't-small' }, 'Tap them in order. Tap one again to take it back.'),
    h('div', { class: 'opts' }, rows.map((r) => r.row)), reveal, foot];
}

function grade(q, ok) {
  sessionAsked.add(q.id);
  const c = State.answer(q.id, ok, { practice: round.practice, repeat: false });
  round.after(q.id, c);
  tally.n++;
  if (ok) { tally.right++; tally.streak++; S.right(tally.streak); } else { tally.streak = 0; tally.missed.push(q.id); S.wrong(); }
  setTimeout(() => S.reveal(ok), 180);
}

// The bigger picture: which of the chapter's big questions this one serves,
// summed up in the author's own Key Points (verified like everything else).
function bigOf(q) {
  const ch = PACK.chapters.find((c) => c.id === q.ch);
  return ch?.big?.find((b) => b.id === q.big) || null;
}
function bigPicture(q) {
  // One line, "Part of: <the big question>", that opens the author's summary.
  // It used to be a full card on every answer: the answer card ran to about
  // a hundred words (learning-journeys review, 18 Sept 2026).
  const b = bigOf(q);
  if (!b) return null;
  const ch = PACK.chapters.find((c) => c.id === q.ch);
  const n = ch.big.indexOf(b) + 1;
  const seen = evOf(q).map((x) => x.quote);
  const fresh = b.ev.filter((x) => !seen.some((y) => y.includes(x.quote) || x.quote.includes(y)));
  const e = (fresh[0] || b.ev[0]);
  const w = sectionOf(e.p);
  const box = h('div', { class: 'bp-more', hidden: true },
    fresh.length ? h('div', { class: 'q-head' }, h('p', { class: 'bk' }, fresh.map((x) => x.quote).join(' ')), sayBtn(fresh.map((x) => x.quote).join(' '), 'Read the summary aloud')) : null,
    w ? h('button', { class: 'disclose', style: 'padding:2px 0', onclick: () => openReader(w.section.id, e.p, b.ev.filter((x) => x.p === e.p).map((x) => x.quote)) }, `The author’s summary — §${e.sec}`) : null);
  const btn = h('button', { class: 'part-of', type: 'button', 'aria-expanded': 'false' },
    h('span', { class: 't-label' }, `Part of · ${n} of ${ch.big.length}`), h('span', { class: 'bq' }, b.q));
  btn.onclick = () => { box.hidden = !box.hidden; btn.setAttribute('aria-expanded', String(!box.hidden)); };
  return h('section', { class: 'big-picture' }, btn, box);
}

function lensChips(q) {
  if (!(q.lens || []).length) return null;
  return h('div', { class: 'chips' }, q.lens.map((l) => h('button', { class: 'chip', type: 'button',
    onclick: () => sheet(h('h2', { class: 't-title' }, LENS[l][0]), h('p', { class: 't-body', style: 'margin-top:8px' }, LENS[l][1])) }, LENS[l]?.[0] || l)));
}

// Where it came from: the quoted words, then the whole paragraph (readable,
// and read aloud in place), then the way into the full section.
// The answer card, kept short: the verdict, the key sentence and where it's
// from, and one line naming the big question. Everything else — the other
// quotes, the whole paragraph read aloud, the full credit, the threads — is
// one tap away under "More from the source". Target: under 60 words.
function revealCard(q, ok) {
  const out = [h('p', { class: `verdict ${ok ? 'good' : 'bad'}`, tabindex: '-1' }, ok ? '✓ Right.' : '✗ Not quite.')];
  if (!ok) out.push(h('div', { class: 'q-head' }, h('p', { class: 'answer' }, q.answer), sayBtn(q.answer, 'Read the right answer aloud')));
  const key = q.ev[0];
  const more = h('div', { class: 'stack', hidden: true });
  const toggle = h('button', { class: 'disclose', type: 'button', 'aria-expanded': 'false' }, 'More from the source');
  toggle.onclick = () => {
    more.hidden = !more.hidden;
    toggle.setAttribute('aria-expanded', String(!more.hidden));
    toggle.textContent = more.hidden ? 'More from the source' : 'Less';
    if (!more.hidden && !more.firstChild) {
      const byPara = new Map();
      for (const e of q.ev) { if (!byPara.has(e.p)) byPara.set(e.p, { ...e, quotes: [] }); byPara.get(e.p).quotes.push(e.quote); }
      const rest = q.ev.slice(1).filter((e) => e.quote !== key.quote);
      if ((q.lens || []).includes('contested')) more.append(h('p', { class: 't-body' }, 'The source itself says this is uncertain — which is the point of the question.'));
      if (rest.length) more.append(h('blockquote', { class: 'quote' }, rest.map((e) => e.quote).join(' … ')));
      for (const e of byPara.values()) more.append(paragraphWithPlayer(e.para, e.quotes), citeLine({ ...e, quote: e.quotes[0] }), h('p', { class: 'cite' }, e.cite));
      const chips = lensChips(q);
      if (chips) more.append(chips);
    }
  };
  out.push(h('section', { class: 'card stack key-card' },
    h('div', { class: 'q-head' }, h('blockquote', { class: 'quote' }, key.quote), sayBtn(key.quote, 'Read the key sentence aloud')),
    h('p', { class: 'cite' }, `§${key.sec}`),
    toggle, more));
  out.push(bigPicture(q), meanwhile(q));
  return out;
}

// One paragraph, sentence-marked, with a compact player.
function paragraphWithPlayer(text, quotes) {
  const passage = h('div', { class: 'passage reading' });
  passage.innerHTML = '<p>' + sentences(text).map((s, i) => {
    let inner = esc(s);
    for (const q of quotes) { const eq = esc(q); if (inner.includes(eq)) inner = inner.replace(eq, `<span class="quoted">${eq}</span>`); }
    return `<span class="sn" data-s="${i}">${inner}</span>`;
  }).join(' ') + '</p>';
  let r = null;
  const btn = iconBtn('play', 'Read the paragraph aloud', () => r.toggle());
  r = new Reader(passage, { onChange: (x) => { btn.innerHTML = x.playing ? ICON.pause : ICON.play; btn.setAttribute('aria-label', x.playing ? 'Pause' : 'Read the paragraph aloud'); } });
  return h('div', { class: 'stack' },
    h('div', { class: 'row' }, btn, iconBtn('stop', 'Stop reading', () => r.stop()), h('span', { class: 't-small' }, 'Read aloud, sentence by sentence.')),
    passage);
}

function finish() {
  if (round.placement) return placementDone();
  round.finished = true;
  setLeaveGuard(null);
  if (tally.n && tally.right === tally.n) S.fanfare();
  const due = State.dueIds(IDS).length;
  const fresh = IDS.filter((id) => !State.card(id)).length;
  const next = State.nextDue(IDS);
  const missed = [...new Set(tally.missed)].map((id) => Q.get(id));
  const practice = round.practice;
  const scope = round.scope;
  const scoped = scope !== IDS;
  const sDue = State.dueIds(scope).length, sFresh = scope.filter((id) => !State.card(id)).length;
  const finished = practice ? [] : chapterStats().filter((s) => round.openBefore.has(s.ch.id) && !s.unseen);
  State.snapshot(IDS);
  const turnedToday = practice ? [] : turnedAround().filter(([, k]) => dayKey(k.turnedAt) === dayKey());
  const heldBefore = round.heldBefore ?? null;
  const heldNow = IDS.filter((id) => isHolding(State.card(id))).length;
  if (finished.length && !(tally.n && tally.right === tally.n)) setTimeout(() => S.fanfare(), 400);
  show('done', () => [
    h('div', { class: 'topbar' }),
    h('h1', { class: 't-title', style: 'font-size:1.8rem' }, practice ? 'Recall test done' : 'Round done'),
    h('section', { class: 'card stack' },
      h('p', { class: 'answer' }, `${tally.right} of ${tally.n} right.`),
      practice && tally.n ? h('p', { class: 't-body' }, 'These were the questions you were likeliest to have forgotten.') : null,
      practice && round.early ? h('p', { class: 't-small' }, `${round.early} came back sooner than usual: you’ve been through everything you’ve met in the last few hours. Learn brings new questions.`) : null,
      practice ? h('p', { class: 't-body' }, 'Recall tests don’t change your review dates.') : null,
      !practice ? h('p', { class: 't-body' }, growthLine()) : null,
      turnedToday.length ? h('p', { class: 't-body' }, h('b', {}, `${turnedToday.length} turned around today`), ': missed the first time, right now.') : null,
      !practice && heldBefore != null && heldNow > heldBefore ? h('p', { class: 't-body' }, h('b', {}, `${heldNow - heldBefore} more holding`), ': right after a week or more away.') : null,
      !due && next ? h('p', { class: 't-body' }, nextDueSentence(next)) : null),
    ...finished.map((s) => {
      const q0 = s.ids.map((id) => Q.get(id)).find((q) => q.ev) || Q.get(s.ids[0]);
      const e = evOf(q0)[0];
      const w = sectionOf(e.p);
      return h('section', { class: 'card stack chapter-done' },
        h('p', { class: 't-label' }, 'Chapter met'),
        h('p', { class: 'answer' }, `You’ve met every question in “${s.ch.title}”.`),
        s.ch.big?.length ? h('p', { class: 't-body' }, 'The questions it asked:') : null,
        s.ch.big?.length ? h('ul', { class: 'bigs' }, s.ch.big.map((b) => h('li', {}, b.q))) : null,
        h('p', { class: 't-body' }, 'Next it moves to known: each question counts once you get it right after three weeks away.'),
        w ? h('button', { class: 'btn wide', onclick: () => openReader(w.section.id, e.p) }, 'Read where the chapter starts') : null);
    }),
    missed.length ? h('h2', { class: 'group-title' }, 'What slipped — read it again') : null,
    missed.length ? h('div', { class: 'list' }, missed.map((q) => {
      const e = evOf(q)[0];
      const w = sectionOf(e.p);
      return h('button', { class: 'item', onclick: () => w && openReader(w.section.id, e.p, [e.quote]) },
        h('div', {}, h('b', {}, listTitle(q)), h('span', {}, `§${e.sec}`)), h('span', { html: ICON.chev }));
    })) : null,
    h('div', { class: 'stack' },
      practice ? h('button', { class: 'btn primary wide', onclick: () => play(true, scope) }, 'Another recall test')
        : scoped && (sDue || sFresh) ? h('button', { class: 'btn primary wide', onclick: () => play(false, scope) }, 'Another round from this chapter')
          : due || fresh ? h('button', { class: 'btn primary wide', onclick: () => play(false) }, 'Another round') : null,
      h('button', { class: `btn wide${practice || due || fresh ? '' : ' primary'}`, onclick: () => show('home', homeScreen, { replace: true }) }, 'Home')),
  ], { replace: true });
}
route('done', homeScreen);

// ── progress ────────────────────────────────────────────────────────────
function dayLabel(key) {
  if (key === dayKey()) return 'Today';
  if (key === dayKey(now() - DAY)) return 'Yesterday';
  return new Date(key + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'short', day: 'numeric', month: 'short' });
}
function progressScreen() {
  const c = counts(IDS);
  const total = IDS.length;
  const byLens = {};
  for (const q of PACK.questions) for (const l of q.lens) {
    const b = byLens[l] || (byLens[l] = { n: 0, known: 0, met: 0 });
    b.n++;
    const st = cardState(State.card(q.id));
    if (st === 'known' || st === 'secure') b.known++; else if (st === 'met') b.met++;
  }
  const days = Object.entries(State.data.days).sort().slice(-14).reverse();
  const week = IDS.filter((id) => { const k = State.card(id); return k && k.st !== 'new' && k.due > now() && k.due < now() + 7 * DAY; }).length;
  const bar = kbar;
  const holding = IDS.filter((id) => isHolding(State.card(id))).length;
  // First-try reviews over the last two weeks: the number the 80–85% target
  // is about. New questions and in-round repeats would flatter or sink it.
  let rn = 0, rr = 0;
  for (const [, v] of days) { rn += v.rn || 0; rr += v.rr || 0; }
  const acc = rn ? Math.round((rr / rn) * 100) : null;
  const accNote = rn < 10 ? `Not enough reviews yet to judge: ${rn} so far, and it needs about ten.`
    : acc > 90 ? 'Above the sweet spot of 80–85%. Reviews are coming easily.'
      : acc >= 78 ? 'In the sweet spot of 80–85%: hard enough to stick, easy enough to keep going.'
        : 'Below the sweet spot of 80–85%. Missed questions come back tomorrow; a day with fewer new ones helps.';
  const slipping = IDS.map((id) => [id, State.card(id)]).filter(([, k]) => k && k.st === 'relearning')
    .sort((a, b) => b[1].last - a[1].last).slice(0, 8).map(([id]) => Q.get(id));
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('h1', { class: 't-title' }, 'Progress')),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'What you can answer'),
      h('p', { class: 'answer num' }, `${State.canAnswer(IDS)}`, h('span', { class: 't-small' }, ` of ${total}`)),
      h('p', { class: 't-body' }, growthLine(false)),
      growthChart(),
      h('p', { class: 'key-line t-small' }, h('i', { class: 'kc' }), 'can answer: right the last time it was asked', h('i', { class: 'kk' }), 'known: right after three weeks away')),
    State.data.placement ? (() => {
      const pl = State.data.placement;
      const nowCan = State.canAnswer(pl.ids);
      return h('section', { class: 'card stack' },
        h('p', { class: 't-label' }, 'Where you started'),
        h('div', { class: 'then-now' },
          h('div', {}, h('b', { class: 'num' }, `${pl.score}/${pl.n}`), h('span', { class: 't-small' }, shortDate(pl.at))),
          h('span', { class: 'arrow', 'aria-hidden': 'true' }, '→'),
          h('div', {}, h('b', { class: 'num' }, `${nowCan}/${pl.ids.length}`), h('span', { class: 't-small' }, 'now'))),
        h('p', { class: 't-body' }, `The same eight questions, easy to hard. You started as “${pl.level}”.`));
    })() : null,
    (() => {
      const t = turnedAround();
      return h('section', { class: 'card stack' },
        h('p', { class: 't-label' }, 'Then and now'),
        t.length ? h('p', { class: 't-body' }, `${t.length} question${t.length === 1 ? '' : 's'} you missed the first time, and have since got right.`)
          : h('p', { class: 't-body' }, 'Questions you miss the first time and get right on a later day will show here. That’s the clearest sign of learning.'),
        t.length ? h('div', { class: 'list' }, t.slice(0, 8).map(([id, k]) => {
          const q = Q.get(id);
          const e = evOf(q)[0];
          const w = sectionOf(e.p);
          return h('button', { class: 'item', onclick: () => w && openReader(w.section.id, e.p, [e.quote]) },
            h('div', {}, h('b', {}, listTitle(q)), h('span', {}, `Missed ${shortDate(k.firstAt)} · right ${shortDate(k.turnedAt)}`)), h('span', { html: ICON.chev }));
        })) : null);
    })(),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'The big questions'),
      h('p', { class: 't-small' }, 'How much of each you can answer.'),
      ...PACK.chapters.map((ch) => h('div', { class: 'bigmap' },
        h('p', { class: 'bm-ch' }, ch.title),
        ...(ch.big || []).map((b) => {
          const ids = PACK.questions.filter((q) => q.ch === ch.id && q.big === b.id).map((q) => q.id);
          const can = State.canAnswer(ids);
          return h('div', { class: 'bm-row' },
            h('div', { class: 'row' }, h('span', { class: 'bm-q' }, b.q), h('span', { class: 't-small num' }, `${can}/${ids.length}`)),
            h('div', { class: 'bar', role: 'img', 'aria-label': `${can} of ${ids.length}` }, h('i', { class: 'k', style: `width:${(can / ids.length) * 100}%` })));
        })))),
    h('section', { class: 'card ring-row' }, ring(c, total),
      h('div', { class: 'stack', style: 'gap:6px' },
        h('p', { class: 't-body' }, h('b', {}, `${c.known} known`), ' — you still had them after three weeks away.'),
        h('p', { class: 't-body' }, h('b', {}, `${c.met} met`), ' — seen, and still being learned.'),
        holding ? h('p', { class: 't-body' }, h('b', {}, `${holding} holding`), ' — right after a week or more, on the way to known.') : null,
        h('p', { class: 't-small' }, `${c.unseen} not met yet · ${week} come round in the next seven days.`))),
    h('section', { class: 'card stack' }, h('p', { class: 't-label' }, 'By chapter'), chapterRows(chapterStats())),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Reviews, first try, last two weeks'),
      rn >= 10 ? h('p', { class: 'answer num' }, `${acc}%`, h('span', { class: 't-small' }, ` of ${rn}`)) : null,
      h('p', { class: 't-body' }, accNote)),
    slipping.length ? h('h2', { class: 'group-title' }, 'Slipping — missed on review, worth a reread') : null,
    slipping.length ? h('div', { class: 'list' }, slipping.map((q) => {
      const e = evOf(q)[0];
      const w = sectionOf(e.p);
      return h('button', { class: 'item', onclick: () => w && openReader(w.section.id, e.p, [e.quote]) },
        h('div', {}, h('b', {}, listTitle(q)), h('span', {}, `§${e.sec}`)), h('span', { html: ICON.chev }));
    })) : null,
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'By thread'),
      Object.entries(byLens).map(([l, b]) => h('div', { class: 'stack', style: 'gap:6px' },
        h('div', { class: 'row' }, h('b', {}, LENS[l]?.[0] || l), h('span', { class: 'spacer' }), h('span', { class: 't-small num' }, `${b.known + b.met} of ${b.n} met`)),
        bar(b)))),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Recent days'),
      days.length ? days.map(([d, v]) => h('div', { class: 'row' },
        h('span', {}, dayLabel(d)), h('span', { class: 'spacer' }),
        h('span', { class: 't-small num' }, `${v.n} answered · ${Math.round((v.right / v.n) * 100)}% right`)))
        : h('p', { class: 't-body' }, 'Nothing yet. Your first round will show here.')),
  ];
}
route('progress', progressScreen);

// ── settings ────────────────────────────────────────────────────────────
function settingsScreen() {
  const s = State.data.settings;
  const seg = (key, label, choices, after) => {
    const box = h('div', { class: 'seg', role: 'group', 'aria-label': label });
    const draw = () => box.replaceChildren(...choices.map(([v, l]) => h('button', { type: 'button', 'aria-pressed': String(s[key] === v),
      onclick: () => { s[key] = v; State.save(); applySettings(); after?.(v); draw(); } }, l)));
    draw();
    return h('div', { class: 'setting' }, h('div', { class: 'lbl' }, label), box);
  };
  const out = h('output', {}, `${s.rate.toFixed(2)}×`);
  const rate = h('input', { type: 'range', id: 'set-rate', min: '0.6', max: '1.3', step: '0.05', value: String(s.rate),
    oninput: (e) => { s.rate = +e.target.value; setRate(s.rate); out.textContent = `${s.rate.toFixed(2)}×`; State.save(); } });
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('h1', { class: 't-title' }, 'Settings')),
    h('section', { class: 'card' },
      seg('readAloud', 'Read questions aloud', [['manual', 'When I tap'], ['auto', 'Automatically']]),
      h('div', { class: 'setting' }, h('label', { class: 'lbl', for: 'set-rate' }, 'Reading speed', out), rate,
        h('button', { class: 'btn', onclick: () => { unlock(); say('This is how fast I will read to you.'); } }, 'Try it')),
      h('div', { class: 'setting' }, h('div', { class: 'lbl' }, 'Reading text'),
        h('p', { class: 't-small' }, 'Size, spacing, line length, typeface and page tint.'),
        h('button', { class: 'btn', onclick: () => readingSheet() }, 'Adjust reading')),
      seg('sound', 'Sound effects', [[true, 'On'], [false, 'Off']], (v) => { if (!v) S.setAmbience(false); }),
      seg('ambience', 'Room tone while you read', [[true, 'On'], [false, 'Off']], (v) => S.setAmbience(v && s.sound)),
      seg('theme', 'Theme', [['system', 'Phone'], ['light', 'Light'], ['dark', 'Dark']])),
    h('button', { class: 'item', onclick: () => show('about', aboutScreen) },
      h('div', {}, h('b', {}, 'About, sources and licences'), h('span', {}, versionText())), h('span', { html: ICON.chev })),
  ];
}
route('settings', settingsScreen);

// ── about ───────────────────────────────────────────────────────────────
const BUILD = window.__PALIMPSEST_BUILD || { v: 'dev', commit: 'unbuilt', date: '' };
const longDate = (iso) => iso ? new Date(iso + 'T12:00:00').toLocaleDateString('en-CA', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
function versionText() { return `v${BUILD.v} · ${BUILD.commit}${BUILD.date ? ' · ' + longDate(BUILD.date) : ''}`; }
const link = (href, text) => h('a', { href, target: '_blank', rel: 'noopener' }, text);
const CC_BY = 'https://creativecommons.org/licenses/by/4.0/';

function aboutScreen() {
  // One entry per primary source behind the voices, from the pack itself.
  const voiceBooks = [];
  for (const v of PACK.voices || []) if (!v.p && !voiceBooks.some((b) => b.cite === v.cite)) voiceBooks.push(v);
  const date = BUILD.date ? new Date(BUILD.date + 'T12:00:00').toLocaleDateString('en-CA', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  return [
    h('div', { class: 'topbar' }, iconBtn('back', 'Back', back), h('h1', { class: 't-title' }, 'About')),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Version'),
      h('p', { class: 'answer num' }, `Palimpsest ${BUILD.v}`),
      h('p', { class: 't-small num' }, `Build ${BUILD.commit}${date ? ', ' + date : ''}. ${IDS.length} questions, ${(PACK.voices || []).length} voices, ${PACK.chapters.length} chapters.`),
      h('p', { class: 't-body' }, 'Your progress is kept on this device only. Nothing is sent anywhere.')),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Versions'),
      h('ol', { class: 'versions' }, VERSIONS.map((x, i) => h('li', {},
        h('p', { class: 'vhead num' }, h('b', {}, x.v), ` · ${longDate(i === 0 && BUILD.v === x.v ? BUILD.date || x.date : x.date)} · `, h('code', {}, i === 0 && BUILD.v === x.v ? BUILD.commit : x.code || '')),
        h('p', { class: 't-small' }, x.notes))))),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'How it’s checked'),
      h('p', { class: 't-body' }, 'Every question and every voice is checked word for word against the source it cites before the app can be built. If a quotation isn’t in the source, the build fails.')),
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Sources for the questions and library'),
      h('p', { class: 't-body' }, 'John Douglas Belshaw, ', link('https://opentextbc.ca/preconfederation/', 'Canadian History: Pre-Confederation'),
        ' (BCcampus, 2015) and ', link('https://opentextbc.ca/postconfederation/', 'Canadian History: Post-Confederation'),
        ' (BCcampus, 2016), with sections by contributing historians credited where they appear. ', link(CC_BY, 'CC BY 4.0'), '.'),
      h('p', { class: 't-body' }, 'Heiko Prümers, Carla Jaimes Betancourt, José Iriarte, Mark Robinson and Martin Schaich, ',
        link('https://www.nature.com/articles/s41586-022-04780-4', 'Lidar reveals pre-Hispanic low-density urbanism in the Bolivian Amazon'),
        ', Nature 606 (2022). ', link(CC_BY, 'CC BY 4.0'), '.'),
      h('p', { class: 't-small' }, 'Adapted: footnotes and citation markers moved or removed; figures, image credits and reading lists left out; text split into sentences for reading aloud. Texts as retrieved 18 September 2026.')),
    voiceBooks.length ? h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Sources for the voices'),
      ...voiceBooks.map((v) => h('p', { class: 't-body' }, v.cite, '. ', link(v.url, 'The scan'), '.')),
      h('p', { class: 't-small' }, 'Two further voices are quoted within Belshaw’s books, cited to the paragraph. Old spellings are kept; only the long s is printed as a modern s.')) : null,
    h('section', { class: 'card stack' },
      h('p', { class: 't-label' }, 'Licences'),
      h('p', { class: 't-body' }, h('b', {}, 'Questions, explanations and library entries: '), link('https://creativecommons.org/licenses/by-nc-sa/4.0/', 'CC BY-NC-SA 4.0'), '. Share and adapt them, with credit, not for sale, under the same licence.'),
      h('p', { class: 't-body' }, h('b', {}, 'Code: '), 'MIT licence.'),
      h('p', { class: 't-body' }, h('b', {}, 'Quoted text: '), 'stays under its own licence, above. The voices are public domain.'),
      h('p', { class: 't-body' }, h('b', {}, 'Typefaces: '), 'Bricolage Grotesque, Instrument Sans and Literata, under the ', link('https://openfontlicense.org/', 'SIL Open Font License'), '.'),
      h('p', { class: 't-body' }, 'Source code: ', link('https://github.com/RobertWalterJ/palimpses', 'github.com/RobertWalterJ/palimpses'), '.'),
      h('p', { class: 't-small' }, 'Made by Robert Walter-Joseph. Not for sale. There’s no timer anywhere in it.')),
  ];
}
route('about', aboutScreen);


boot();
