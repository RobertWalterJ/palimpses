// Palimpsest — questions built from the dated records in records/.
//
// Called by bundle.mjs. Nothing here touches the network: it reads the
// committed snapshots, so a question can always be checked against exactly the
// data it was built from (build/fetch-records.mjs takes the snapshots).
//
// Four things to be asked, and they are the point of the exercise:
//
//   order        three rulers or dynasties, oldest first
//   next         who came immediately after whom
//   year         in what year did a reign or dynasty begin  (CE, 1000 on)
//   meanwhile    who was ruling HERE when that happened THERE
//
// The last one is why any of this exists: the owner wanted to stop learning
// English kings and Chinese dynasties as two unrelated lists.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BCE = (y) => (y < 0 ? `${-y} BCE` : String(y));
// A span as the record card prints it: "1509-1547", "1952-2022", "960-1279".
const span = (r) => (r.to == null ? `${BCE(r.from)} —` : `${BCE(r.from)}–${BCE(r.to)}`);

export function loadRecords(root) {
  const dir = join(root, 'records');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));
}

// The evidence card for a row: the record itself, its source and its licence.
const evOf = (set, r, fields) => ({
  record: { title: r.name, rows: fields },
  cite: `${set.source}, ${set.licence} — snapshot of ${set.retrieved}`,
  url: r.url || set.url,
});

const reignEv = (set, r) => evOf(set, r, [
  [set.kind === 'events' ? 'Date' : (set.id.includes('dynast') ? 'Ruled' : 'In office'), span(r)],
  ['In', set.title],
]);

// Three wrong answers from the same list, as close in time as the list allows:
// the six nearest, shuffled, so they vary between rebuilds of the same pack but
// never stray a century from the question.
function near(rows, year, keep, exclude, rnd) {
  const names = [];
  for (const x of rows.filter(keep).sort((p, q) => Math.abs(p.from - year) - Math.abs(q.from - year))) {
    if (!exclude.includes(x.name) && !names.includes(x.name)) names.push(x.name);
    if (names.length >= 6) break;
  }
  return names.sort(() => rnd() - 0.5).slice(0, 3);
}

// A seeded shuffle, so a rebuild produces the same questions.
function seeded(key) {
  let h = 2166136261;
  for (const c of String(key)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);
}

export function recordQuestions(pack, chId, sets, bigFor) {
  const out = [];
  const add = (q) => { out.push({ ...q, ch: chId, lens: ['record'], gen: 'record' }); };

  for (const set of sets) {
    const rows = set.rows.filter((r) => r.from != null || r.at != null).map((r) => ({ ...r, from: r.from ?? r.at }));
    if (rows.length < 6) continue;
    rows.sort((a, b) => a.from - b.from);
    const big = bigFor(set);
    const rnd = seeded(set.id);
    const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // ── who came next ────────────────────────────────────────────────────
    // Only where the list really is a sequence: the next row must start no
    // earlier than this one ended, so overlapping dynasties are left alone.
    for (const [i, r] of rows.entries()) {
      const next = rows[i + 1];
      if (!next || out.filter((q) => q.id.includes('/next-')).length >= 8) continue;
      if (r.to != null && next.from < r.to - 1) continue;
      // Unique NAMES, not unique rows: Mackenzie King held the office three
      // times and would otherwise be offered as three different answers. And
      // the wrong ones are the nearest in time, so the question is "who came
      // next" and not "which of these four is from the right century".
      const wrong = near(rows, next.from, (x) => x !== r && x !== next, [next.name, r.name], rnd);
      if (wrong.length < 3) continue;
      add({
        // The year is in the id because a person can hold an office twice:
        // Macdonald and Mackenzie King each come round again.
        id: `${pack.id}/${chId}/next-${slug(set.id)}-${slug(r.name)}-${r.from}`,
        kind: 'choice', big, level: 2, at: next.from,
        prompt: `${r.name}: ${span(r)}. Who came next?`,
        answer: next.name, options: wrong,
        ev: [reignEv(set, next), reignEv(set, r)],
      });
    }

    // ── in what year ─────────────────────────────────────────────────────
    // Only from 1000 CE on. Before that the sources themselves disagree by a
    // year or two — the Qin here begin in 220 BCE, most books say 221 — and a
    // question with four year options would be asking which database you read.
    const datable = rows.filter((r) => r.from >= 1000);
    for (const r of datable) {
      if (out.filter((q) => q.id.includes('/year-')).length >= 6) break;
      // Within a lifetime of the right answer: a decoy eighty years out is
      // not a decoy, it is a hint.
      const wrong = [...new Set(datable.filter((x) => x.from !== r.from && Math.abs(x.from - r.from) <= 60).map((x) => x.from))]
        .sort((p, q) => Math.abs(p - r.from) - Math.abs(q - r.from)).slice(0, 6)
        .sort(() => rnd() - 0.5).slice(0, 3);
      if (wrong.length < 3) continue;
      const what = set.verb || (set.kind === 'events' ? 'happen' : 'begin');
      add({
        id: `${pack.id}/${chId}/year-${slug(set.id)}-${slug(r.name)}-${r.from}`,
        kind: 'choice', big, level: 3, at: r.from, depth: 'detail',
        prompt: `In what year did ${r.name} ${what}?`,
        answer: String(r.from), options: wrong.map(String),
        ev: [reignEv(set, r)],
      });
    }
  }

  // ── meanwhile: two lists, one year ─────────────────────────────────────
  // "Who sat on the English throne when the Ming dynasty began?" Asked only
  // where exactly one row of the other list contains the year, and contains it
  // with room to spare — a year that falls on the join between two reigns
  // would have two defensible answers.
  const holders = (set, year) => set.rows.filter((r) => {
    const from = r.from ?? r.at;
    const to = r.to ?? (set.kind === 'events' ? from : null);
    return from != null && to != null && year > from && year < to;
  });
  // One question per answer, across every pairing: every prime minister from
  // 1867 to 1911 was in office under the Qing, and so was every premier, so
  // without this the chapter asks "which dynasty?" eight times for one answer.
  const used = new Set();
  for (const a of sets) {
    for (const b of sets) {
      if (a === b || a.lane === b.lane) continue;
      let made = 0;
      for (const r of a.rows) {
        if (made >= 4) break;
        const year = r.from ?? r.at;
        if (year == null || year < 800) continue;        // both lists must reach back that far
        const who = holders(b, year);
        if (who.length !== 1) continue;
        const them = who[0];
        const shuffle = seeded(r.name + b.id);
        const wrong = near(b.rows.map((x) => ({ ...x, from: x.from ?? x.at })), year, (x) => x.name !== them.name, [them.name], shuffle);
        if (wrong.length < 3 || used.has(b.id + them.name)) continue;
        used.add(b.id + them.name);
        made++;
        out.push({
          // 1936 had two kings, so the id carries the subject as well as the year.
          id: `${pack.id}/${chId}/meanwhile-${a.id}-${b.id}-${String(year)}-${r.name}`.replace(/[^a-z0-9/-]/gi, ''),
          ch: chId, kind: 'choice', lens: ['record'], gen: 'record', big: bigFor(b), level: 3, at: year,
          prompt: `In ${BCE(year)}, ${r.name} ${a.past || 'began'}. ${b.asks || 'Who was ruling'} that year?`,
          answer: them.name,
          options: wrong,
          ev: [reignEv(b, them), reignEv(a, r)],
        });
      }
    }
  }

  // The same rules verify.mjs applies to written questions, for questions it
  // never sees: distinct options, no option repeating the answer, and every
  // claimed year present in the snapshot it came from.
  const years = new Set(sets.flatMap((s) => s.rows.flatMap((r) => [r.from, r.to, r.at])).filter((y) => y != null).map(String));
  const ids = new Set();
  for (const q of out) {
    const opts = [q.answer, ...q.options].map((x) => String(x).toLowerCase());
    if (new Set(opts).size !== opts.length) throw new Error(`record question ${q.id}: duplicate options`);
    if (ids.has(q.id)) throw new Error(`record question ${q.id}: duplicate id`);
    ids.add(q.id);
    if (/^\d+$/.test(q.answer) && !years.has(q.answer)) throw new Error(`record question ${q.id}: ${q.answer} is not in any snapshot`);
    if (!q.ev[0].record) throw new Error(`record question ${q.id}: no record evidence`);
  }
  return out;
}

// The thread's timeline, built from the same records: one entry per reign or
// dynasty, in its own lane, so the thread screen and "Meanwhile" work exactly
// as they do for a hand-written thread.
export function recordTimeline(sets) {
  const out = [];
  for (const set of sets) {
    for (const r of set.rows) {
      const at = r.from ?? r.at;
      if (at == null) continue;
      out.push({
        lane: set.lane,
        at,
        label: set.kind === 'events' ? r.name : `${r.name} (${span(r)})`,
        ev: reignEv(set, r),
      });
    }
  }
  return out.sort((a, b) => a.at - b.at);
}
