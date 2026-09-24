// Palimpsest — which questions are really the same question?
//
//   node build/audit-duplicates.mjs
//
// Repetition has two causes. One is the scheduler bringing a question back too
// soon (build/audit-variety.mjs measures that). The other is the pack holding
// two questions that test the same thing, so play feels repetitive even when
// the spacing is right. This finds the second kind, three ways:
//
//   evidence   two questions whose key quote is the same sentence
//   answer     two questions with the same answer inside one big question
//   term       a generated definition and a written question on the same word
//
// It prints clusters for a human to judge; it is not a build gate.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pack = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'canada.json'), 'utf8'));
const qs = pack.questions;
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const key = (q) => (q.ev?.[0]?.quote ? norm(q.ev[0].quote).slice(0, 90) : null);
const short = (q) => q.id.split('/').slice(1).join('/');
const line = (q) => `${short(q).padEnd(34)} ${(q.prompt || '').replace(/\s+/g, ' ').slice(0, 76)}`;

const clusters = [];
const group = (name, fn) => {
  const by = new Map();
  for (const q of qs) {
    const k = fn(q);
    if (!k) continue;
    by.set(k, [...(by.get(k) || []), q]);
  }
  for (const [k, list] of by) if (list.length > 1) clusters.push({ kind: name, k, list });
};

// The same sentence quoted as the key evidence for more than one question.
group('evidence', key);
// The same answer, inside one big question — two ways of asking one fact.
group('answer', (q) => (q.answer ? `${q.ch}:${q.big}:${norm(q.answer)}` : null));
// A written question and a generated definition on the same term.
const terms = new Map();
for (const q of qs) if (q.gen === 'glossary') {
  const m = q.prompt.match(/[“"]([^”"]+)[”"]/);
  if (m) terms.set(norm(m[1]), q);
}
for (const q of qs) {
  if (q.gen) continue;
  // The term has to be what the question asks for — its answer — not a word
  // that happens to appear in the setup. "…most samurai had no interest in
  // becoming Roman Catholics" is not a question about what a samurai is.
  const hit = [...terms.entries()].find(([t]) => t.length > 5 && norm(q.answer).includes(t));
  if (hit) clusters.push({ kind: 'term', k: hit[0], list: [q, hit[1]] });
}

const byKind = {};
for (const c of clusters) (byKind[c.kind] ||= []).push(c);
console.log(`${qs.length} questions: ${clusters.length} clusters where two or more test the same thing\n`);
for (const [kind, list] of Object.entries(byKind)) {
  console.log(`## ${kind} — ${list.length} cluster(s), ${list.reduce((n, c) => n + c.list.length - 1, 0)} question(s) could go\n`);
  for (const c of list.slice(0, 40)) {
    console.log(`  ${c.kind === 'evidence' ? 'same sentence' : c.kind === 'answer' ? 'same answer' : 'same term'}: ${c.k.slice(0, 70)}`);
    for (const q of c.list) console.log(`    ${line(q)}`);
    console.log('');
  }
}
if (!clusters.length) console.log('no two questions test the same thing.');
