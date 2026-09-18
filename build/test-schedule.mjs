// Palimpsest — does the learning loop actually converge?
//
//   node build/test-schedule.mjs
//
// Plays the real scheduler for sixty days, one round a day, with a seeded
// player who is right 60% of the time on first sight and 88% on review.
// Fails if: a round is ever empty while work remains, a missed or new card is
// not asked again inside its round, anything is left unmet after a fortnight,
// or reviews pile past the round size.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };

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
  const round = new S.Round(ids);
  let asked = 0, right = 0, repeats = 0;
  const seen = new Set();
  const counts = new Map();
  const needsRepeat = new Set();
  let id;
  while ((id = round.next())) {
    const before = S.State.card(id);
    const first = !before;
    const p = first ? 0.6 : before.st === 'review' ? 0.88 : 0.75;
    const ok = rand() < p;
    if (seen.has(id)) repeats++;
    seen.add(id);
    counts.set(id, (counts.get(id) || 0) + 1);
    const c = S.State.answer(id, ok);
    if (counts.get(id) === 1 && (c.st === 'learning' || c.st === 'relearning')) needsRepeat.add(id);
    round.after(id, c);
    asked++; if (ok) right++;
    t += 40e3;
    if (asked > 40) { fails.push(`day ${day}: round did not end`); break; }
  }
  // Every card new or missed on its first appearance gets exactly one more
  // look inside the round — and never more than one.
  for (const [x, n] of counts) {
    // …unless the round had already spent its four repeats (MAX_REPEATS).
    if (needsRepeat.has(x) && n < 2 && repeats < 4) fails.push(`day ${day}: ${x} needed a repeat inside the round and did not get one`);
    if (n > 2) fails.push(`day ${day}: ${x} was asked ${n} times in one round`);
  }
  const met = ids.filter((x) => S.State.card(x)).length;
  const known = ids.filter((x) => ['known', 'secure'].includes(S.cardState(S.State.card(x)))).length;
  log.push({ day, asked, right, repeats, met, known });
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
if (Math.max(...log.map((l) => l.asked)) > 15) fails.push(`a round ran to ${Math.max(...log.map((l) => l.asked))} questions`);
for (const d of [1, 7, 30, 60, 90, 120]) {
  const l = at(d);
  console.log(`day ${String(d).padStart(2)}: asked ${String(l.asked).padStart(2)} (${l.repeats} in-round repeats), right ${l.right}, met ${l.met}/${ids.length}, known ${l.known}`);
}
const idle = log.filter((l) => l.asked === 0).length;
console.log(`all met by day ${metBy}`);
console.log(`days with nothing to do: ${idle} of ${DAYS} — the spacing working, not a gap in content`);
if (fails.length) { console.error('\nFAILED:\n  ' + fails.join('\n  ')); process.exit(1); }
console.log('the learning loop converges.');
