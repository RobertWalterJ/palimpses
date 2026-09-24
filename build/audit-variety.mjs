// Palimpsest — does a fortnight of play feel the same every day?
//
//   node build/audit-variety.mjs
//
// Robert: "still very repetitive… it isn't like we make progress with some
// repetition built in." This plays the REAL scheduler for fourteen days (two
// rounds a day, as he plays) and measures what the days actually look like:
//
//   shape      how many questions are the same four-option multiple choice
//   source     how many are generated glossary questions rather than written
//   places     how many different chapters or regions a day touches
//   sameness   how alike two consecutive days are — the share of a day's
//              questions whose big question was also asked the day before
//   new        how much of each day is material never seen before
//
// It prints a table, not a verdict: what counts as "too samey" is a judgement.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
let mseed = 11;
Math.random = () => ((mseed = (mseed * 16807) % 2147483647) / 2147483647);
const S = await import('../app/js/schedule.js');
const pack = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'canada.json'), 'utf8'));
const Q = new Map(pack.questions.map((q) => [q.id, q]));
const ids = pack.questions.map((q) => q.id);
const groupOf = (id) => Q.get(id).ch + ':' + Q.get(id).big;
const parasOf = (id) => { const q = Q.get(id); return [...new Set((q.ev || q.items.map((i) => i.ev)).map((e) => e.p))]; };

let seed = 5;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
let t = new Date(2026, 8, 1, 8, 0).getTime();
S.__setClock(() => t);
S.State.load();

const days = [];
for (let day = 1; day <= 14; day++) {
  const session = new Set();
  const asked = [];
  for (let r = 0; r < 2; r++) {                       // morning and evening
    const round = new S.Round(ids, { exclude: session, groupOf, parasOf });
    let id;
    while ((id = round.next())) {
      session.add(id);
      asked.push({ id, fresh: !S.State.card(id) });
      S.State.answer(id, rand() < (S.State.card(id) ? 0.85 : 0.55));
      t += 40e3;
    }
    t += 6 * 3600e3;                                   // hours apart
  }
  days.push({ day, asked });
  t += 864e5 - 12 * 3600e3 - asked.length * 40e3;
}

// How often the SAME question comes back — Robert's actual complaint.
const seen = new Map();
for (const d of days) for (const { id } of d.asked) seen.set(id, [...(seen.get(id) || []), d.day]);
const times = [...seen.values()].map((v) => v.length);
const hist = {};
for (const n of times) hist[n] = (hist[n] || 0) + 1;
console.log(`
distinct questions seen in 14 days: ${seen.size}; asked once ${hist[1] || 0}, twice ${hist[2] || 0}, three times ${hist[3] || 0}, four ${hist[4] || 0}, five or more ${times.filter((n) => n >= 5).length}`);
const worst = [...seen.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 8);
for (const [id, dayList] of worst) console.log(`  ${dayList.length}× on days ${dayList.join(', ')} — ${Q.get(id).prompt.slice(0, 54)}`);
const backToBack = [...seen.values()].reduce((n, v) => n + v.filter((d, i) => i && d === v[i - 1] + 1).length, 0);
console.log(`asks that came the very next day after the last one: ${backToBack} of ${days.reduce((n, d) => n + d.asked.length, 0)}`);

const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
console.log('day   asked  new   choice  generated  chapters  same big question as yesterday');
let prevBigs = new Set();
const totals = { asked: 0, gen: 0, choice: 0, repeatBig: 0 };
for (const d of days) {
  const kinds = d.asked.map(({ id }) => Q.get(id).kind);
  const gen = d.asked.filter(({ id }) => Q.get(id).gen).length;
  const shapes = new Set(d.asked.map(({ id }) => Q.get(id).gen || Q.get(id).kind));
  const choice = kinds.filter((k) => k === 'choice').length;
  const bigs = new Set(d.asked.map(({ id }) => groupOf(id)));
  const chapters = new Set(d.asked.map(({ id }) => Q.get(id).ch));
  const repeats = d.asked.filter(({ id }) => prevBigs.has(groupOf(id))).length;
  totals.asked += d.asked.length; totals.gen += gen; totals.choice += choice; totals.repeatBig += repeats;
  console.log(`${String(d.day).padStart(3)}  ${String(d.asked.length).padStart(6)}  ${String(d.asked.filter((x) => x.fresh).length).padStart(3)}  ${String(pct(choice, d.asked.length) + '%').padStart(7)}  ${String(pct(gen, d.asked.length) + '%').padStart(9)}  ${String(chapters.size).padStart(8)}  ${String(pct(repeats, d.asked.length) + '%').padStart(10)}`);
  prevBigs = bigs;
}
// What the fortnight felt like, by the task the player was actually set: a
// fill-the-gap and a four-option question are both `kind: 'choice'`, but they
// are not the same thing to do.
const SHAPE = { glossary: 'match a definition', gap: 'fill the gap', voice: 'who said this', timeline: 'oldest first' };
const shapes = {};
for (const d of days) for (const { id } of d.asked) {
  const q = Q.get(id);
  const s = SHAPE[q.gen] || (q.kind === 'order' ? 'oldest first' : 'four-option question');
  shapes[s] = (shapes[s] || 0) + 1;
}
console.log(`\nover the fortnight: ${totals.asked} questions asked, ${pct(totals.repeatBig, totals.asked)}% on a big question also asked the day before.`);
console.log('what you were asked to do: ' + Object.entries(shapes).sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `${k} ${pct(v, totals.asked)}%`).join(' · '));
const kinds = {};
for (const q of pack.questions) kinds[q.gen ? 'generated ' + q.gen : q.kind] = (kinds[q.gen ? 'generated ' + q.gen : q.kind] || 0) + 1;
console.log('the pack itself:', Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(' · '));
