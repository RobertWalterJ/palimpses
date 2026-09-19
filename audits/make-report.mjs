// Renders the question audit as one HTML page (audits/<date>-questions.html).
//   node audits/make-report.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import RATINGS, { GAPS } from './2026-09-19-questions.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pack = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'canada.json'), 'utf8'));
const Q = new Map(pack.questions.map((q) => [q.id.split('/')[1], q]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ROLE = { A: 'Anchor', D: 'Deepens', R: 'Rethinks', F: 'Detail' };
const FAM = { 1: 'Commonly known', 2: 'School-level', 3: 'Specialist' };
const ISSUE = { guess: 'Guessable', context: 'Unplaced name', jargon: 'Unexplained term', weak: 'Weak option', number: 'Tests a number', recall: 'Tests a phrase', long: 'Long' };

const count = (f) => RATINGS.reduce((m, r) => { for (const k of [].concat(f(r))) m[k] = (m[k] || 0) + 1; return m; }, {});
const fam = count((r) => r[1]), role = count((r) => r[2]), issues = count((r) => r[3]);
const opening = pack.questions.slice(0, 5).map((q) => q.id.split('/')[1]);
const anchors = RATINGS.filter((r) => r[2] === 'A');

const row = (r) => {
  const [id, f, ro, iss, fix] = r;
  const q = Q.get(id);
  const ask = q.kind === 'order' ? 'Put in order: ' + q.items.map((i) => i.label).slice(0, 2).join('; ') + '…' : q.prompt;
  return `<li class="q" data-role="${ro}" data-fam="${f}" data-issues="${iss.join(' ')}">
    <div class="qtop"><span class="role r${ro}">${ROLE[ro]}</span><span class="fam f${f}" title="${FAM[f]}"><i></i><i></i><i></i> ${FAM[f]}</span></div>
    <p class="ask">${esc(ask)}</p>
    ${q.answer ? `<p class="ans">${esc(q.answer)}</p>` : ''}
    ${iss.length ? `<p class="chips">${iss.map((i) => `<span class="chip">${ISSUE[i]}</span>`).join('')}</p>` : ''}
    <p class="fix">${esc(fix)}</p>
  </li>`;
};

const byChapter = pack.chapters.map((ch) => {
  const rs = RATINGS.filter((r) => Q.get(r[0]).ch === ch.id);
  return `<section class="chap"><h3>${esc(ch.title)} <span>${rs.length}</span></h3><ol class="qs">${rs.map(row).join('')}</ol></section>`;
}).join('');

const bar = (obj, keys, labels, cls) => {
  const total = RATINGS.length;
  return `<div class="stack-bar" role="img" aria-label="${keys.map((k) => `${labels[k]} ${obj[k] || 0}`).join(', ')}">${keys.map((k) => `<span class="${cls}${k}" style="flex:${obj[k] || 0}"></span>`).join('')}</div>
  <dl class="legend">${keys.map((k) => `<div><dt><i class="${cls}${k}"></i>${labels[k]}</dt><dd>${obj[k] || 0}</dd></div>`).join('')}</dl>`;
};

const html = `<title>Palimpsest question audit</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400..700&family=Literata:opsz,wght@7..72,400..600&display=swap">
<style>
:root {
  --ground: #F5F4F8; --surface: #FFFFFF; --surface-2: #ECEAF2; --line: #E2DFEA;
  --ink: #1B1726; --ink-2: #4D4860; --ink-3: #6A6580;
  --accent: #7A2A8C; --accent-2: #4B3AA8; --accent-soft: #F1E8F6;
  --anchor: #0e7061; --deep: #4B3AA8; --rethink: #7A2A8C; --detail: #8a8599;
  --warn-bg: #fff1e0; --warn: #8a4b00;
  --display: 'Bricolage Grotesque', 'Instrument Sans', system-ui, sans-serif;
  --ui: 'Instrument Sans', system-ui, sans-serif;
  --read: 'Literata', Georgia, serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --ground: #121019; --surface: #1B1824; --surface-2: #252131; --line: #2E2940;
  --ink: #EEEBF5; --ink-2: #BDB7CC; --ink-3: #9C96AD;
  --accent: #C58BD6; --accent-2: #A99BF0; --accent-soft: #2A1F36;
  --anchor: #5CC9B3; --deep: #A99BF0; --rethink: #C58BD6; --detail: #7d7890;
  --warn-bg: #3a2a14; --warn: #f0b765;
} }
:root[data-theme="dark"] {
  --ground: #121019; --surface: #1B1824; --surface-2: #252131; --line: #2E2940;
  --ink: #EEEBF5; --ink-2: #BDB7CC; --ink-3: #9C96AD;
  --accent: #C58BD6; --accent-2: #A99BF0; --accent-soft: #2A1F36;
  --anchor: #5CC9B3; --deep: #A99BF0; --rethink: #C58BD6; --detail: #7d7890;
  --warn-bg: #3a2a14; --warn: #f0b765;
}
* { box-sizing: border-box; }
body { background: var(--ground); color: var(--ink); font: 400 16px/1.55 var(--ui); margin: 0; }
.wrap { max-width: 760px; margin: 0 auto; padding-inline: 18px; padding-block: 28px 64px; display: grid; gap: 28px; }
h1 { font: 800 clamp(1.9rem, 6vw, 2.7rem)/1.05 var(--display); margin: 0; letter-spacing: -.01em; text-wrap: balance; }
h1 span { background: linear-gradient(90deg, var(--accent), var(--accent-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
h2 { font: 700 1.35rem/1.25 var(--display); margin: 0 0 10px; text-wrap: balance; }
h3 { font: 700 1.08rem/1.3 var(--display); margin: 0; display: flex; justify-content: space-between; align-items: baseline; }
h3 span { font: 500 .85rem var(--ui); color: var(--ink-3); font-variant-numeric: tabular-nums; }
.eyebrow { font: 600 .78rem/1 var(--ui); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); margin: 0 0 10px; }
.lede { font: 400 1.12rem/1.6 var(--read); color: var(--ink-2); margin: 10px 0 0; max-width: 60ch; }
p { margin: 0; }
.panel { background: var(--surface); border-radius: 18px; padding: 20px; display: grid; gap: 12px; }
.verdict { background: var(--accent-soft); }
.verdict p:not(.eyebrow) { font: 400 1.05rem/1.6 var(--read); }
.stack-bar { display: flex; height: 14px; border-radius: 99px; overflow: hidden; gap: 2px; }
.legend { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 0; }
.legend div { display: flex; gap: 6px; align-items: baseline; }
.legend dt { display: flex; gap: 6px; align-items: center; color: var(--ink-2); font-size: .92rem; }
.legend dd { margin: 0; font-weight: 700; font-variant-numeric: tabular-nums; }
.legend i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
.rA { background: var(--anchor); } .rD { background: var(--deep); } .rR { background: var(--rethink); } .rF { background: var(--detail); }
.f1 i:nth-child(-n+1), .f2 i:nth-child(-n+2), .f3 i:nth-child(-n+3) { background: var(--ink-2); }
.famb1 { background: var(--anchor); } .famb2 { background: var(--deep); } .famb3 { background: var(--detail); }
.findings { display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; counter-reset: f; }
.findings li { display: grid; gap: 4px; padding-left: 38px; position: relative; }
.findings li::before { counter-increment: f; content: counter(f); position: absolute; left: 0; top: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--accent); color: var(--surface); font: 700 .9rem/26px var(--ui); text-align: center; }
.findings b { font: 650 1rem/1.4 var(--ui); }
.findings span { color: var(--ink-2); }
.ladder { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ladder div { border-radius: 14px; padding: 14px; display: grid; gap: 6px; background: var(--surface-2); }
.ladder b { font: 700 1rem var(--display); }
.ladder div:nth-child(1) b { color: var(--anchor); } .ladder div:nth-child(2) b { color: var(--deep); } .ladder div:nth-child(3) b { color: var(--rethink); }
.ladder p { font-size: .92rem; color: var(--ink-2); }
.ladder em { font-style: normal; font-family: var(--read); color: var(--ink); }
@media (max-width: 560px) { .ladder { grid-template-columns: 1fr; } }
.round { margin: 0; padding-left: 1.3em; display: grid; gap: 8px; font-family: var(--read); }
.round small { display: block; font: 400 .86rem var(--ui); color: var(--ink-3); }
.gaps { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.gaps li { display: grid; gap: 2px; border-top: 1px solid var(--line); padding-top: 10px; }
.gaps b { font-weight: 650; }
.gaps span { color: var(--ink-2); font-size: .95rem; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; position: sticky; top: env(safe-area-inset-top, 0px); background: var(--ground); padding-block: 10px; z-index: 2; }
.filters button { font: 600 .9rem var(--ui); border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); border-radius: 99px; padding: 8px 14px; min-height: 40px; cursor: pointer; }
.filters button[aria-pressed="true"] { background: var(--ink); color: var(--ground); border-color: var(--ink); }
.filters button:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
.chap { display: grid; gap: 10px; }
.qs { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.q { background: var(--surface); border-radius: 14px; padding: 14px 16px; display: grid; gap: 6px; }
.qtop { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.role { font: 700 .74rem/1 var(--ui); letter-spacing: .06em; text-transform: uppercase; color: var(--surface); padding: 5px 8px; border-radius: 6px; }
.fam { display: flex; align-items: center; gap: 3px; font-size: .8rem; color: var(--ink-3); }
.fam i { width: 7px; height: 7px; border-radius: 50%; background: var(--line); display: inline-block; }
.ask { font: 400 1rem/1.5 var(--read); }
.ans { font-size: .9rem; color: var(--ink-3); }
.ans::before { content: 'Answer: '; font-weight: 600; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font: 600 .78rem/1 var(--ui); background: var(--warn-bg); color: var(--warn); padding: 5px 8px; border-radius: 6px; }
.fix { font-size: .93rem; color: var(--ink-2); border-left: 3px solid var(--line); padding-left: 10px; }
.q[hidden], .chap[hidden] { display: none; }
footer { color: var(--ink-3); font-size: .88rem; }
@media (prefers-reduced-motion: no-preference) { .filters button { transition: background .15s, color .15s; } }
</style>
<div class="wrap">
<header>
  <p class="eyebrow">Palimpsest · Canada pack · 19 September 2026</p>
  <h1>Question <span>audit</span></h1>
  <p class="lede">All ${RATINGS.length} questions, read as someone opening the app for the first time: do they know what it’s about, does it stand alone, does it teach, and where does it sit in the bigger picture?</p>
</header>

<section class="panel verdict">
  <p class="eyebrow">The short answer</p>
  <p>Most questions are sound history, but the app asks them in the wrong order and pitches too many at specialists. Only <b>${role.A}</b> of ${RATINGS.length} are anchors: things an ordinary player already knows, like Cortés, potatoes, Cartier, scurvy or the fur trade. The first round today opens with <b>${opening.length} questions that challenge a story</b> the player hasn’t been told yet, starting with how reliable oral history is.</p>
  <p>The fix is a ladder: <b>anchor, then deepen, then rethink</b>. Open on what people know, then build on it.</p>
</section>

<section class="panel">
  <h2>What kind of question each one is</h2>
  ${bar(role, ['A', 'D', 'R', 'F'], ROLE, 'r')}
  <h2 style="margin-top:8px">How much the player needs to know already</h2>
  ${bar(fam, [1, 2, 3], FAM, 'famb')}
</section>

<section class="panel">
  <h2>Findings</h2>
  <ol class="findings">
    <li><b>The opening is back to front.</b><span>The first round rethinks stories the player hasn’t heard yet. Rethinking works only after the anchor it pushes against.</span></li>
    <li><b>${issues.guess} questions can be answered by picking the most enlightened-sounding option.</b><span>When the counter-myth is always right, players learn the pattern, not the history. Every rethink question needs one wrong option that also sounds revisionist.</span></li>
    <li><b>${(issues.context || 0) + (issues.jargon || 0)} questions use a name or term the player hasn’t met.</b><span>Pays d’en Haut, Five Nations, Mourning Wars, “virgin soil”, matrilineal, Stadacona. Rule: the first time a name appears, the question says in a clause what it is.</span></li>
    <li><b>Sources were leaking into questions.</b><span>“In Belshaw’s view” and similar (17 questions) are fixed in 1.2.1. Rule: the question is about the past, never about the book; the answer card says where it comes from.</span></li>
    <li><b>${issues.weak} questions have options nobody would pick, and ${issues.number} test a number rather than an idea.</b><span>Numbers are kept where the number is the point (fewer than 70 French residents in the 1620s).</span></li>
    <li><b>Well-known facts that should anchor chapters aren’t asked at all.</b><span>Columbus, the Norse, Cabot, the Hudson’s Bay Company. The sources state them; see the list below.</span></li>
  </ol>
</section>

<section class="panel">
  <h2>The ladder</h2>
  <div class="ladder">
    <div><b>Anchor</b><p>Something the player knows, with one new fact in the question itself.</p><p><em>“Cartier’s crew were dying of scurvy at Stadacona, today’s Quebec City. What saved them?”</em></p></div>
    <div><b>Deepen</b><p>What was going on behind it, using the anchor they now hold.</p><p><em>“Why did Donnacona try to stop Cartier leaving?”</em></p></div>
    <div><b>Rethink</b><p>What the school version leaves out, now that it has been set up.</p><p><em>“You may have learned Cartier explored a new land. What does the record show?”</em></p></div>
  </div>
</section>

<section class="panel">
  <h2>A first round from what’s already here</h2>
  <ol class="round">
    <li>Potatoes and maize: what did they do to the rest of the world? <small>crops-population · anchor</small></li>
    <li>Cortés was driven out of Tenochtitlan. What turned it? <small>tenochtitlan-fell · anchor that rethinks</small></li>
    <li>Cartier’s crew and scurvy: who saved them? <small>scurvy-cure · anchor</small></li>
    <li>The Haudenosaunee League: older than Canada, the US and the UK? <small>league-older · anchor</small></li>
    <li>Why did the Americas look like a “vacant land”? <small>vacant-land · anchor</small></li>
  </ol>
  <p style="color:var(--ink-2)">There are ${anchors.length} anchors in all, enough for the first three or four rounds while new anchors are written: ${anchors.map((a) => esc(a[0])).join(', ')}.</p>
</section>

<section class="panel">
  <h2>Anchors to add</h2>
  <p style="color:var(--ink-2)">Commonly known, stated plainly in the sources, not yet asked.</p>
  <ul class="gaps">${GAPS.map(([t, p, why]) => `<li><b>${esc(t)}</b><span>${esc(why)}</span><span style="color:var(--ink-3);font-size:.82rem">Source paragraph ${esc(p)}</span></li>`).join('')}</ul>
</section>

<section>
  <h2>Every question</h2>
  <div class="filters" role="group" aria-label="Show">
    <button type="button" data-f="all" aria-pressed="true">All ${RATINGS.length}</button>
    <button type="button" data-f="role:A" aria-pressed="false">Anchors ${role.A}</button>
    <button type="button" data-f="issue:guess" aria-pressed="false">Guessable ${issues.guess}</button>
    <button type="button" data-f="issue:unplaced" aria-pressed="false">Unexplained ${(issues.context || 0) + (issues.jargon || 0)}</button>
    <button type="button" data-f="fam:3" aria-pressed="false">Specialist ${fam[3]}</button>
  </div>
  <div style="display:grid;gap:22px">${byChapter}</div>
</section>

<footer>Ratings are judgements against the brief, made by reading every question; counts are computed from them. Source file: audits/2026-09-19-questions.mjs.</footer>
</div>
<script>
(() => {
  const btns = [...document.querySelectorAll('.filters button')];
  const qs = [...document.querySelectorAll('.q')];
  const show = (f) => {
    for (const b of btns) b.setAttribute('aria-pressed', String(b.dataset.f === f));
    for (const q of qs) {
      const iss = q.dataset.issues.split(' ');
      q.hidden = f === 'all' ? false
        : f === 'role:A' ? q.dataset.role !== 'A'
        : f === 'issue:guess' ? !iss.includes('guess')
        : f === 'issue:unplaced' ? !(iss.includes('context') || iss.includes('jargon'))
        : f === 'fam:3' ? q.dataset.fam !== '3' : false;
    }
    for (const c of document.querySelectorAll('.chap')) c.hidden = ![...c.querySelectorAll('.q')].some((q) => !q.hidden);
  };
  for (const b of btns) b.addEventListener('click', () => show(b.dataset.f));
})();
</script>
`;
writeFileSync(join(ROOT, 'audits', '2026-09-19-questions.html'), html);
console.log('wrote audits/2026-09-19-questions.html', (html.length / 1024).toFixed(0), 'KB');
