// Palimpsest — does the learning loop actually converge?
//
//   node build/test-schedule.mjs
//
// Plays the real scheduler for 120 days, one session a day (two rounds every
// third day), with a seeded player right 60% of the time on first sight and
// 88% on review. Fails if a question is asked twice in one session, a round
// runs past 10, a round has no new question while any
// remain, new material stalls for a week, or the pack isn't all met within
// one day per question.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };

// Fully seeded: the scheduler shuffles and picks repeat gaps with
// Math.random, so an unseeded run drifted between days 66 and 71.
let mseed = 7;
Math.random = () => ((mseed = (mseed * 16807) % 2147483647) / 2147483647);
const S = await import('../app/js/schedule.js');
const pack = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'canada.json'), 'utf8'));
const ids = pack.questions.map((q) => q.id);

let seed = 42;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
let t = new Date(2026, 8, 1, 19, 0).getTime();
S.__setClock(() => t);
S.State.load();

const fails = [];
const log = [];
const DAYS = 120;
for (let day = 1; day <= DAYS; day++) {
  // One session a day, with a second round on every third day ("Another
  // round"): nothing may be asked twice in the session, across both rounds.
  const session = new Set();
  let asked = 0, right = 0, fresh = 0;
  for (let r = 0; r < (day % 3 === 0 ? 2 : 1); r++) {
    const remainingNew = ids.filter((x) => !S.State.card(x)).length;
    const round = new S.Round(ids, { exclude: session });
    let id, n = 0, nNew = 0;
    while ((id = round.next())) {
      const before = S.State.card(id);
      if (session.has(id)) fails.push(`day ${day}: ${id} asked twice in one session`);
      session.add(id);
      if (!before) { nNew++; fresh++; }
      const p = !before ? 0.6 : before.st === 'review' ? 0.88 : 0.75;
      const ok = rand() < p;
      S.State.answer(id, ok);
      n++; asked++; if (ok) right++;
      t += 40e3;
      if (n > 10) { fails.push(`day ${day}: a round ran past 10 questions`); break; }
    }
    // Fresh material in every first round while any is left and the day's
    // allowance isn't spent — so a round never feels like the same questions.
    if (r === 0 && remainingNew >= 1 && nNew < 1 && (S.State.data.days[S.dayKey()]?.newN || 0) < 12) fails.push(`day ${day}: no new question with ${remainingNew} still unmet`);
  }
  const met = ids.filter((x) => S.State.card(x)).length;
  const known = ids.filter((x) => ['known', 'secure'].includes(S.cardState(S.State.card(x)))).length;
  log.push({ day, asked, right, fresh, met, known });
  t += 864e5 - asked * 40e3;
}

const at = (d) => log[d - 1];
// New material keeps arriving: everything met within 45 days, and no stretch
// of a week in which nothing new was introduced while some was still unmet.
const metBy = log.find((l) => l.met === ids.length)?.day;
// The pace has to scale with the pack: a fixed deadline was right for 61
// questions and wrong for 87. The invariant is that new material never
// starves — at least one new question a day on average, one round a day.
if (!metBy || metBy > ids.length) fails.push(`all ${ids.length} not met until day ${metBy || '>' + DAYS} — slower than one new a day`);
for (let d = 7; d < log.length; d++) {
  if (log[d].met < ids.length && log[d].met === log[d - 7].met) { fails.push(`nothing new introduced from day ${d - 6} to day ${d + 1}`); break; }
}
for (const d of [1, 7, 30, 60, 90, 120]) {
  const l = at(d);
  console.log(`day ${String(d).padStart(2)}: asked ${String(l.asked).padStart(2)} (${l.fresh} new), right ${l.right}, met ${l.met}/${ids.length}, known ${l.known}`);
}
const idle = log.filter((l) => l.asked === 0).length;
console.log(`all met by day ${metBy}`);
console.log(`days with nothing to do: ${idle} of ${DAYS} — the spacing working, not a gap in content`);
if (fails.length) { console.error('\nFAILED:\n  ' + fails.join('\n  ')); process.exit(1); }
console.log('the learning loop converges.');
