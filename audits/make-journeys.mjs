// Renders the learning-journeys review (audits/2026-09-19-journeys.html)
// from the persona study (build/test-personas.mjs --json → personas.json).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = JSON.parse(readFileSync(join(ROOT, 'audits', 'personas.json'), 'utf8'));
const TOTAL = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'canada.json'), 'utf8')).questions.length;
const g = P['general/shipped'], w = P['wellread/shipped'];
for (const rows of [g, w]) for (const r of rows) r.cold = Math.round(r.cold);

// ── chart: what they really know vs what the app shows ─────────────────
const W = 640, H = 300, L = 44, Rm = 34, T = 16, B = 36;
const x = (d) => L + ((d - 1) / 89) * (W - L - Rm);
const y = (v) => T + (1 - v / 100) * (H - T - B);
const line = (rows, f) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(r.day).toFixed(1)},${y(f(r)).toFixed(1)}`).join('');
const grid = [0, 25, 50, 75, 100].map((v) => `<line x1="${L}" x2="${W - Rm}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" class="ax">${v}%</text>`).join('');
const ticks = [1, 30, 60, 90].map((d) => `<text x="${x(d)}" y="${H - 12}" text-anchor="middle" class="ax">day ${d}</text>`).join('');
const end = (rows, f, cls, label) => { const r = rows[rows.length - 1]; return `<circle cx="${x(r.day)}" cy="${y(f(r))}" r="4" class="${cls}"/>`; };
const chart = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Over 90 days the general player's cold-test score rises from ${g[0].cold}% to ${g[89].cold}% and the well-read player's from ${w[0].cold}% to ${w[89].cold}%, while the share the app calls known rises only to ${Math.round(g[89].known / TOTAL * 100)}% and ${Math.round(w[89].known / TOTAL * 100)}%, starting around day 46.">
  ${grid}${ticks}
  <path d="${line(w, (r) => r.cold)}" class="lw"/><path d="${line(g, (r) => r.cold)}" class="lg"/>
  <path d="${line(w, (r) => (r.known / TOTAL) * 100)}" class="lw dash"/><path d="${line(g, (r) => (r.known / TOTAL) * 100)}" class="lg dash"/>
  ${end(w, (r) => r.cold, 'dw')}${end(g, (r) => r.cold, 'dg')}
</svg>`;

const html = `<title>Palimpsest learning journeys</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400..700&family=Literata:opsz,wght@7..72,400..600&display=swap">
<style>
:root {
  --ground: #F5F4F8; --surface: #FFFFFF; --surface-2: #ECEAF2; --line: #E2DFEA;
  --ink: #1B1726; --ink-2: #4D4860; --ink-3: #6A6580;
  --accent: #7A2A8C; --accent-2: #4B3AA8; --accent-soft: #F1E8F6;
  --gen: #4B3AA8; --well: #0e7061; --warn-bg: #fff1e0; --warn: #8a4b00; --ok-bg: #e6f5f1; --ok: #0e6152;
  --display: 'Bricolage Grotesque', 'Instrument Sans', system-ui, sans-serif;
  --ui: 'Instrument Sans', system-ui, sans-serif;
  --read: 'Literata', Georgia, serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --ground: #121019; --surface: #1B1824; --surface-2: #252131; --line: #2E2940;
  --ink: #EEEBF5; --ink-2: #BDB7CC; --ink-3: #9C96AD;
  --accent: #C58BD6; --accent-2: #A99BF0; --accent-soft: #2A1F36;
  --gen: #A99BF0; --well: #5CC9B3; --warn-bg: #3a2a14; --warn: #f0b765; --ok-bg: #16302a; --ok: #7ad9c4;
} }
:root[data-theme="dark"] {
  --ground: #121019; --surface: #1B1824; --surface-2: #252131; --line: #2E2940;
  --ink: #EEEBF5; --ink-2: #BDB7CC; --ink-3: #9C96AD;
  --accent: #C58BD6; --accent-2: #A99BF0; --accent-soft: #2A1F36;
  --gen: #A99BF0; --well: #5CC9B3; --warn-bg: #3a2a14; --warn: #f0b765; --ok-bg: #16302a; --ok: #7ad9c4;
}
* { box-sizing: border-box; }
body { background: var(--ground); color: var(--ink); font: 400 16px/1.55 var(--ui); margin: 0; }
.wrap { max-width: 780px; margin: 0 auto; padding-inline: 18px; padding-block: 28px 64px; display: grid; gap: 26px; }
h1 { font: 800 clamp(1.9rem, 6vw, 2.7rem)/1.05 var(--display); margin: 0; letter-spacing: -.01em; text-wrap: balance; }
h1 span { background: linear-gradient(90deg, var(--accent), var(--accent-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
h2 { font: 700 1.35rem/1.25 var(--display); margin: 0; text-wrap: balance; }
h3 { font: 700 1.05rem/1.3 var(--display); margin: 0; }
p { margin: 0; }
.eyebrow { font: 600 .78rem/1 var(--ui); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); margin: 0 0 10px; }
.lede { font: 400 1.12rem/1.6 var(--read); color: var(--ink-2); margin-top: 10px; max-width: 62ch; }
.panel { background: var(--surface); border-radius: 18px; padding: 20px; display: grid; gap: 12px; }
.verdict { background: var(--accent-soft); }
.verdict p:not(.eyebrow) { font: 400 1.05rem/1.6 var(--read); }
.muted { color: var(--ink-2); }
.small { font-size: .88rem; color: var(--ink-3); }
.chart svg { width: 100%; height: auto; display: block; }
.gl { stroke: var(--line); stroke-width: 1; }
.ax { fill: var(--ink-3); font: 500 12px var(--ui); }
.lg, .lw { fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.lg { stroke: var(--gen); } .lw { stroke: var(--well); }
.dash { stroke-dasharray: 2 7; stroke-width: 3; }
.dg { fill: var(--gen); } .dw { fill: var(--well); }
.key { display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: .9rem; color: var(--ink-2); }
.key span { display: inline-flex; align-items: center; gap: 8px; }
.key i { width: 22px; height: 0; border-top: 3px solid; display: inline-block; }
.key .dsh { border-top-style: dotted; }
table { border-collapse: collapse; width: 100%; font-variant-numeric: tabular-nums; }
.tbl { overflow-x: auto; }
th, td { text-align: left; padding: 9px 10px 9px 0; border-bottom: 1px solid var(--line); vertical-align: top; font-size: .95rem; }
th { font: 600 .8rem var(--ui); color: var(--ink-3); letter-spacing: .04em; text-transform: uppercase; }
td b { font-weight: 700; }
.journey { display: grid; gap: 0; }
.stage { display: grid; grid-template-columns: 92px 1fr; gap: 14px; padding: 14px 0; border-top: 1px solid var(--line); }
.stage:first-child { border-top: 0; padding-top: 0; }
.when { font: 700 .95rem/1.3 var(--display); color: var(--accent); }
.stage .now, .stage .next { font-size: .95rem; }
.now::before { content: 'Today: '; font-weight: 700; color: var(--warn); }
.next::before { content: 'Proposed: '; font-weight: 700; color: var(--ok); }
.stage div { display: grid; gap: 6px; }
.fixes { display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; }
.fixes li { display: grid; gap: 4px; padding: 14px 16px; background: var(--surface-2); border-radius: 14px; }
.fixes b { font: 700 1.02rem/1.35 var(--display); }
.fixes span { color: var(--ink-2); font-size: .95rem; }
.fixes em { font-style: normal; font-family: var(--read); color: var(--ink); }
.tag { justify-self: start; font: 700 .72rem/1 var(--ui); letter-spacing: .06em; text-transform: uppercase; padding: 5px 8px; border-radius: 6px; background: var(--accent); color: var(--surface); }
.order { margin: 0; padding-left: 1.3em; display: grid; gap: 8px; }
@media (max-width: 520px) { .stage { grid-template-columns: 1fr; gap: 4px; } }
</style>
<div class="wrap">
<header>
  <p class="eyebrow">Palimpsest · design review · 18 September 2026</p>
  <h1>Two learners, <span>three months</span></h1>
  <p class="lede">Can someone with general knowledge, or someone well read who has never met these sources, grow into real knowledge of this history, enjoy getting there, and see themselves improve? I tested it two ways: I played the opening rounds on a phone-sized screen, and I simulated 90 days for each person using the app’s real scheduler.</p>
</header>

<section class="panel" style="border:2px solid var(--accent)">
  <p class="eyebrow">Corrected, 18 September 2026</p>
  <p>The first version of this page overstated how much players learn. Its memory model gave a right answer minutes after seeing a card the same boost as one recalled days later, which flattered the in-round repeats. The model now follows the spacing effect: a retrieval builds more memory the closer it came to being forgotten. The figures below are re-run on the version reviewed (1.2.2). The findings and recommendations stand. One changed: reviews were not too easy, they were a little too hard for the general player.</p>
  <p class="muted"><b>Since then, version 1.3.0</b> has no repeats inside a session, puts familiar history first, and brings new questions every round. On the same model, at day 90 the general player scores 61% cold (was 57%) and has met 71 questions (was 56); the well-read player scores 83% (was 81%) and has met 94 (was 84). The cost is that “known” first appears later, around day 60, which is why showing growth is next.</p>
</section>

<section class="panel verdict">
  <p class="eyebrow">The answer</p>
  <p><b>The learning works. The first hour and the feedback don’t, yet.</b> In the simulation the general player goes from ${g[0].cold}% to ${g[89].cold}% on a cold test of every question in three months, and the well-read player from ${w[0].cold}% to ${w[89].cold}%. That growth is real but invisible: nothing in the app measures it, the word “known” first appears around day 46, and the first round opened on four abstract questions.</p>
  <p>Two changes matter most: <b>start from what people know</b>, and <b>show them how much they’ve learned</b>. Nearly everything below serves one of those.</p>
</section>

<section class="panel chart">
  <h2>What they really know, and what the app shows them</h2>
  ${chart}
  <div class="key">
    <span><i style="border-color:var(--gen)"></i>General: cold-test score</span>
    <span><i class="dsh" style="border-color:var(--gen)"></i>General: share called “known”</span>
    <span><i style="border-color:var(--well)"></i>Well read: cold-test score</span>
    <span><i class="dsh" style="border-color:var(--well)"></i>Well read: share called “known”</span>
  </div>
  <p class="muted">The solid lines are what each person would score if tested cold on all ${TOTAL} questions that day. The dotted lines are the only long-term measure the app shows: flat at zero for about six weeks, then small. The gap between the lines is progress the player never sees.</p>
</section>

<section class="panel">
  <h2>What the test found</h2>
  <div class="tbl"><table>
    <tr><th></th><th>General knowledge</th><th>Well read</th></tr>
    <tr><td>New questions right on first sight, first rounds</td><td><b>54%</b></td><td><b>75%</b></td></tr>
    <tr><td>First sight right, by subject: known · school · specialist</td><td>57 · 41 · 32%</td><td>—</td></tr>
    <tr><td>Reviews right on first try after week 2 (target 80–85%)</td><td>70%, a little hard</td><td>80%</td></tr>
    <tr><td>Day the first “known” appears</td><td>47</td><td>45</td></tr>
    <tr><td>Questions met by day 90</td><td>${g[89].met} of ${TOTAL}</td><td>${w[89].met} of ${TOTAL}</td></tr>
    <tr><td>Cold-test score, day 1 → 30 → 90</td><td>${g[0].cold} → ${g[29].cold} → ${g[89].cold}%</td><td>${w[0].cold} → ${w[29].cold} → ${w[89].cold}%</td></tr>
  </table></div>
  <p class="muted"><b>Played on a phone:</b> each question takes about 45 words to read, then about 100 more on the answer card, roughly two screens each and over 1,300 words for a nine-question round. A player guessing blind got 2 of 9. The round was billed “1 of about 5” and ran to 9, and the same four abstract questions came twice. Colour, type, read-aloud and sound all worked well.</p>
</section>

<section class="panel">
  <h2>The journey, stage by stage</h2>
  <div class="journey">
    <div class="stage"><p class="when">First five minutes</p><div>
      <p class="now">Four abstract rethinks (how reliable is oral history; were cities declining), about one right in two, then two screens of reading after each.</p>
      <p class="next">A two-minute “Where do you start?” of eight quick questions, easy to hard, then a first round of anchors: potatoes, Cortés, Cartier and scurvy, the Haudenosaunee League older than Canada. Each teaches one new fact in the question itself. Aim for two in three right.</p></div></div>
    <div class="stage"><p class="when">First week</p><div>
      <p class="now">“Met” climbs; nothing else moves. The bigger-picture card repeats on every answer.</p>
      <p class="next">Ladders: an anchor, then its deeper question, then its rethink, unlocked in that order. A “map” of the chapter’s big questions fills in as you go. Short “myth or record?” questions, two options and one line, break up the reading.</p></div></div>
    <div class="stage"><p class="when">First month</p><div>
      <p class="now">“Holding” appears, but nothing says “you now know more than you did”.</p>
      <p class="next">A monthly check-in re-asks a sample, including questions you missed on first sight, and shows <em>then vs now</em>: “You got this wrong on 19 Sept. Right today.” A line of your cold-test score, the solid line above, goes on Progress.</p></div></div>
    <div class="stage"><p class="when">Month three</p><div>
      <p class="now">Reviews run below target for the general player, and the pace is the same for both players.</p>
      <p class="next">The pace adapts: above 90% on reviews, more new questions arrive and reviews switch to harder forms (fill the quote, which came first). Below 75%, fewer new ones arrive. Chapters earn levels, from Informed to Expert, by big questions answered at every rung.</p></div></div>
  </div>
</section>

<section class="panel">
  <h2>Design changes</h2>
  <ul class="fixes">
    <li><span class="tag">Questions</span><b>Anchor, deepen, rethink</b><span>Every big question gets a ladder that starts from the school version. Rethinks unlock only after their anchor, so the challenge lands, and nobody is asked to overturn a story they haven’t been told.</span></li>
    <li><span class="tag">Questions</span><b>Teach in the question</b><span>The setup line carries one new fact from the cited paragraph: <em>“In 1535 Cartier’s crew were dying of scurvy at Stadacona. What saved them?”</em> A wrong answer still teaches who, when and where.</span></li>
    <li><span class="tag">Questions</span><b>No free marks for sounding enlightened</b><span>Every rethink has a wrong option that also sounds revisionist, so players learn the history, not the pattern. Some myths are partly true, and should be asked that way.</span></li>
    <li><span class="tag">Questions</span><b>New question types, lighter to read</b><span><em>Myth or record?</em> (two options). <em>Which came first?</em> (two events, across regions). <em>Who said it?</em> (the voices). <em>Fill the quote</em> (for reviews). These vary the rhythm and cut reading.</span></li>
    <li><span class="tag">Flow</span><b>Start where the player is</b><span>A two-minute placement sets the starting rung and pace. Rounds are five to seven questions, and the count shown is the real count.</span></li>
    <li><span class="tag">Flow</span><b>Pace that adapts</b><span>Keep first-try reviews at 80–85%: more and harder when it’s easy, fewer new and more review when it’s hard. The well-read player moves faster, and the general player isn’t buried.</span></li>
    <li><span class="tag">Answer card</span><b>A shorter answer card</b><span>Verdict, the one key sentence and read-aloud; the full passage and the bigger picture a tap away. The bigger picture shows once per big question per round, when it has something new to say. Target: under 60 words.</span></li>
    <li><span class="tag">Progress</span><b>Show the growth</b><span>A cold-test line on Progress; a monthly check-in with <em>then vs now</em>; a big-questions map per chapter; and “holding” counted as progress from week one instead of waiting 44 days for “known”.</span></li>
    <li><span class="tag">Picture</span><b>Fit it together</b><span>Later: the “meanwhile, elsewhere” layer from an open world history, a parallel-lanes timeline, and <em>which came first</em> across regions. It builds the map of when things happened across the world.</span></li>
  </ul>
</section>

<section class="panel">
  <h2>Suggested build order</h2>
  <ol class="order">
    <li><b>The first hour:</b> placement, anchors first, teach-in-the-question rewrites for the first twenty questions, true round counts.</li>
    <li><b>The answer card diet:</b> under 60 words, detail on tap.</li>
    <li><b>Showing growth:</b> cold-test line, then vs now, the chapter map.</li>
    <li><b>Ladders and tell-proofing</b> across all 118, plus the missing anchors (Columbus, the Norse, Cabot, the Hudson’s Bay Company).</li>
    <li><b>Adaptive pace</b> and harder review forms.</li>
    <li><b>New quick question types</b>, then the world layer.</li>
  </ol>
</section>

<section class="panel">
  <h2>How much to trust this</h2>
  <p class="muted">The scheduler is the app’s real code; the people are models. Their starting knowledge comes from the audit’s familiarity ratings (general: 55%, 30% and 25% on known, school-level and specialist subjects; well read: 80%, 50% and 32%), and memory follows a standard forgetting curve. Five seeded runs are averaged. The model can’t tell whether something is fun, and it may flatter transfer between related questions. It is good at showing timing, pace, and what the app does and doesn’t show. The real test is a few people playing it; the placement and check-in above would also measure that from inside the app.</p>
  <p class="small">Sources: build/test-personas.mjs (run with --json), audits/personas.json, audits/2026-09-19-questions.mjs.</p>
</section>
</div>
`;
writeFileSync(join(ROOT, 'audits', '2026-09-19-journeys.html'), html);
console.log('wrote audits/2026-09-19-journeys.html');
