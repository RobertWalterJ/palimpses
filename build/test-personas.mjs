// Palimpsest — persona study: can a newcomer grow from general knowledge to
// advanced knowledge, and would they see it happening?
//
//   node build/test-personas.mjs            (a study, not a build gate)
//
// Drives the REAL scheduler (app/js/schedule.js) for 90 days per persona.
// What a persona knows is a model, stated here so it can be argued with:
//
//   first sight  p0 = persona's chance by the audit's familiarity rating
//                (1 commonly known, 2 school-level, 3 specialist), plus a
//                bonus on questions the audit found guessable for readers
//                who spot the "enlightened answer" pattern; never below the
//                chance of guessing (1 in 4; an order of 4–5 items is ~1 in 20).
//   memory       each answer card read lays down a trace of strength S days;
//                recall after t days = exp(-t / S). A right answer multiplies
//                S by 1 + 2.5 x (1 - recall): hard-won retrievals build the most
//                (the spacing effect); a miss resets S to 1.5.
//   SCHED=path   run a different scheduler build, to compare versions, e.g.
//                git show <commit>:app/js/schedule.js > build/_old.js;
//                SCHED=./_old.js node build/test-personas.mjs
//   answer       p = recall + (1 - recall) * p0.
//   transfer     each question learned raises p0 of others under the same
//                big question by 0.02 (cap +0.15) — the "bigger picture" card.
//
// Two orders are compared: the pack as shipped, and anchors first (the
// audit's proposal) — same questions, only the order new ones arrive in.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pack = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'canada.json'), 'utf8'));
const RATINGS = (await import(pathToFileURL(join(ROOT, 'audits', '2026-09-19-questions.mjs')).href)).default;
const R = new Map(RATINGS.map(([id, fam, role, issues]) => [id, { fam, role, issues }]));
// Questions written after the audit (the world chapters, the thread, and the
// generated glossary ones) carry their own level from the pack.
const rating = (q) => R.get(q.id.split('/')[1]) || { fam: q.level || 2, role: q.gen ? 'F' : 'D', issues: [] };
const QS = pack.questions.map((q) => ({ id: q.id, short: q.id.split('/')[1], big: q.ch + ':' + q.big, order: q.kind === 'order', ...rating(q) }));

const PERSONAS = {
  general: { name: 'General knowledge', p0: { 1: 0.55, 2: 0.30, 3: 0.25 }, guessBonus: 0.10, playsPerWeek: 4 },
  wellread: { name: 'Well read, not these sources', p0: { 1: 0.80, 2: 0.50, 3: 0.32 }, guessBonus: 0.25, playsPerWeek: 5 },
};
const ORDERS = {
  shipped: (qs) => qs.map((q) => q.id),
  anchorsFirst: (qs) => [...qs.filter((q) => q.role === 'A'), ...qs.filter((q) => q.role !== 'A')].map((q) => q.id),
};

async function run(personaKey, orderKey, seedBase) {
  const store = new Map();
  globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
  let mseed = seedBase;
  Math.random = () => ((mseed = (mseed * 16807) % 2147483647) / 2147483647);
  const S = await import((process.env.SCHED || '../app/js/schedule.js') + '?' + personaKey + orderKey + seedBase);
  let seed = seedBase * 31 + 7;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  let t = new Date(2026, 8, 1, 19, 0).getTime();
  S.__setClock(() => t);
  S.State.load();

  const P = PERSONAS[personaKey];
  const ids = ORDERS[orderKey](QS);
  const byId = new Map(QS.map((q) => [q.id, q]));
  const mem = new Map();           // id -> { S, last }
  const transfer = new Map();      // big -> bonus
  const learned = new Set();
  const days = [];
  const firstSight = { 1: [0, 0], 2: [0, 0], 3: [0, 0] };

  for (let day = 1; day <= 90; day++) {
    const plays = ((day * P.playsPerWeek) % 7) < P.playsPerWeek;   // spread evenly through the week
    const rec = { day, played: plays, asked: 0, right: 0, firstTry: 0, firstTryRight: 0, fresh: 0, freshRight: 0 };
    if (plays) {
      const round = new S.Round(ids);
      const counts = new Map();
      let id;
      while ((id = round.next())) {
        const q = byId.get(id);
        const chance = q.order ? 0.05 : 0.25;
        const p0 = Math.min(0.95, Math.max(chance, P.p0[q.fam] + (q.issues.includes('guess') ? P.guessBonus : 0) + (transfer.get(q.big) || 0)));
        const m = mem.get(id);
        const recall = m ? Math.exp(-((t - m.last) / 864e5) / m.S) : 0;
        const p = recall + (1 - recall) * p0;
        const ok = rand() < p;
        const firstSeen = !S.State.card(id);
        if (firstSeen) { firstSight[q.fam][0]++; if (ok) firstSight[q.fam][1]++; rec.fresh++; if (ok) rec.freshRight++; }
        counts.set(id, (counts.get(id) || 0) + 1);
        const c = S.State.answer(id, ok, { repeat: counts.get(id) > 1 });
        round.after(id, c);
        // The answer card is read either way: a trace is laid down.
        // The spacing effect: a retrieval builds more memory the closer it came
        // to being forgotten. A right answer minutes after seeing the card
        // (recall near 1) adds almost nothing; one after a real gap multiplies
        // strength by up to 3.5. A miss resets it.
        mem.set(id, { S: m ? (ok ? m.S * (1 + 2.5 * (1 - recall)) : 1.5) : (ok ? 3 : 1.5), last: t });
        if (ok && !learned.has(id) && m) { learned.add(id); transfer.set(q.big, Math.min(0.15, (transfer.get(q.big) || 0) + 0.02)); }
        rec.asked++; if (ok) rec.right++;
        if (counts.get(id) === 1 && !firstSeen) { rec.firstTry++; if (ok) rec.firstTryRight++; }
        t += 40e3;
      }
      t -= rec.asked * 40e3;
    }
    rec.met = ids.filter((x) => S.State.card(x)).length;
    rec.holding = ids.filter((x) => S.isHolding(S.State.card(x))).length;
    rec.known = ids.filter((x) => ['known', 'secure'].includes(S.cardState(S.State.card(x)))).length;
    // What they'd score if tested cold on everything today — the real
    // measure of knowledge, which the app itself never shows.
    let exp = 0;
    for (const q of QS) {
      const m = mem.get(q.id);
      const recall = m ? Math.exp(-((t - m.last) / 864e5) / m.S) : 0;
      const p0 = Math.max(q.order ? 0.05 : 0.25, P.p0[q.fam] + (transfer.get(q.big) || 0));
      exp += recall + (1 - recall) * p0;
    }
    rec.coldScore = exp / QS.length;
    days.push(rec);
    t += 864e5;
  }
  return { days, firstSight };
}

const pct = (a, b) => (b ? Math.round((a / b) * 100) + '%' : '—');
const results = {};
for (const pk of Object.keys(PERSONAS)) for (const ok of Object.keys(ORDERS)) {
  // Average five seeds so one lucky run doesn't decide anything.
  const runs = [];
  for (const s of [3, 7, 11, 19, 23]) runs.push(await run(pk, ok, s));
  results[pk + '/' + ok] = runs;
}

const avg = (runs, f) => runs.reduce((t, r) => t + f(r), 0) / runs.length;
const firstPlayed = (r, k) => r.days.filter((d) => d.played).slice(0, k);
for (const [key, runs] of Object.entries(results)) {
  const [pk, ok] = key.split('/');
  console.log(`\n## ${PERSONAS[pk].name} · ${ok === 'shipped' ? 'order as shipped' : 'anchors first'}`);
  const r1 = avg(runs, (r) => { const d = firstPlayed(r, 1)[0]; return d.freshRight / d.fresh; });
  const r3 = avg(runs, (r) => { const ds = firstPlayed(r, 3); return ds.reduce((a, d) => a + d.freshRight, 0) / ds.reduce((a, d) => a + d.fresh, 0); });
  console.log(`  new questions right on first sight — round 1: ${Math.round(r1 * 100)}%, first three rounds: ${Math.round(r3 * 100)}%`);
  const hard = avg(runs, (r) => { const ds = r.days.filter((d) => d.played && d.day <= 30); return ds.filter((d) => d.right / d.asked < 0.5).length / ds.length; });
  console.log(`  rounds under 50% right in the first month: ${Math.round(hard * 100)}%`);
  const fs = { 1: [0, 0], 2: [0, 0], 3: [0, 0] };
  for (const r of runs) for (const k of [1, 2, 3]) { fs[k][0] += r.firstSight[k][0]; fs[k][1] += r.firstSight[k][1]; }
  console.log(`  first sight right — known subjects ${pct(fs[1][1], fs[1][0])}, school-level ${pct(fs[2][1], fs[2][0])}, specialist ${pct(fs[3][1], fs[3][0])}`);
  const ft = avg(runs, (r) => { const ds = r.days.filter((d) => d.day > 14); return ds.reduce((a, d) => a + d.firstTryRight, 0) / Math.max(1, ds.reduce((a, d) => a + d.firstTry, 0)); });
  console.log(`  first-try reviews right after week 2: ${Math.round(ft * 100)}%  (target 80–85%)`);
  const firstKnown = avg(runs, (r) => r.days.find((d) => d.known > 0)?.day || 91);
  console.log(`  first "known" appears on day ${Math.round(firstKnown)}`);
  for (const d of [1, 7, 30, 60, 90]) {
    const g = (f) => Math.round(avg(runs, (r) => f(r.days[d - 1])));
    console.log(`  day ${String(d).padStart(2)}: met ${String(g((x) => x.met)).padStart(3)} · holding ${String(g((x) => x.holding)).padStart(3)} · known ${String(g((x) => x.known)).padStart(3)} · cold-test score ${g((x) => x.coldScore * 100)}%`);
  }
}

// Day-by-day averages for the report's chart.
if (process.argv.includes('--json')) {
  const { writeFileSync } = await import('node:fs');
  const out = {};
  for (const [key, runs] of Object.entries(results)) {
    out[key] = runs[0].days.map((_, i) => ({
      day: i + 1,
      cold: Math.round(avg(runs, (r) => r.days[i].coldScore) * 1000) / 10,
      met: Math.round(avg(runs, (r) => r.days[i].met)),
      holding: Math.round(avg(runs, (r) => r.days[i].holding)),
      known: Math.round(avg(runs, (r) => r.days[i].known)),
    }));
  }
  writeFileSync(join(ROOT, 'audits', 'personas.json'), JSON.stringify(out));
  console.log('\nwrote audits/personas.json');
}
