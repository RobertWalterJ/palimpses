// Palimpsest — take a dated snapshot of a public dataset.
//
//   node build/fetch-records.mjs english-monarchs
//   node build/fetch-records.mjs --all
//
// Queries live in build/queries/<id>.rq with a header comment giving the
// snapshot's title and the columns to keep. The result is written to
// records/<id>.json and COMMITTED, so every question can be checked against
// exactly the data it was built from, offline, for ever. Nothing here runs at
// build time: `npm run build` never touches the network.
//
// Wikidata asks for a descriptive User-Agent with a way to contact the person
// running the query, and throttles anonymous bursts; one query at a time, with
// a pause between, is both polite and plenty.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const Q_DIR = join(ROOT, 'build', 'queries');
const OUT = join(ROOT, 'records');
const ENDPOINT = 'https://query.wikidata.org/sparql';
const UA = 'Palimpsest/1.0 (personal history-learning app; https://github.com/RobertWalterJ/palimpses)';

// The header of a .rq file: lines like "#! title: Monarchs of England".
function header(text) {
  const out = {};
  for (const m of text.matchAll(/^#!\s*([a-z]+):\s*(.+)$/gm)) out[m[1]] = m[2].trim();
  return out;
}

// A Wikidata time literal is an ISO string with a + or - and a precision we
// are not told here; the year is the only part these questions use, and a
// year before 1 CE comes back as -0300-01-01T00:00:00Z. Returns a signed
// integer year, or null if the value isn't a time at all.
function yearOf(binding) {
  if (!binding) return null;
  const m = String(binding.value).match(/^([+-]?)(\d{1,6})-/);
  if (!m) return null;
  const y = Number(m[2]);
  return m[1] === '-' ? -y : y;
}

const ask = async (query) => {
  const res = await fetch(ENDPOINT + '?format=json&query=' + encodeURIComponent(query), {
    headers: { 'User-Agent': UA, Accept: 'application/sparql-results+json' },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).results.bindings;
};

const args = process.argv.slice(2);
const ids = args.includes('--all')
  ? readdirSync(Q_DIR).filter((f) => f.endsWith('.rq')).map((f) => f.replace(/\.rq$/, ''))
  : args;
if (!ids.length) { console.log('usage: node build/fetch-records.mjs <id> | --all'); process.exit(1); }
mkdirSync(OUT, { recursive: true });

for (const id of ids) {
  const file = join(Q_DIR, id + '.rq');
  if (!existsSync(file)) throw new Error(`no query at ${file}`);
  const query = readFileSync(file, 'utf8');
  const head = header(query);
  process.stdout.write(`${id}… `);
  const bindings = await ask(query);
  const rows = bindings.map((b) => {
    const row = {};
    for (const [k, v] of Object.entries(b)) {
      if (k.endsWith('Date') || k === 'from' || k === 'to' || k === 'at') row[k] = yearOf(v);
      else if (k === 'item') row.url = v.value, row.id = v.value.split('/').pop();
      else row[k] = v.value;
    }
    return row;
  });
  const snapshot = {
    id,
    title: head.title || id,
    lane: head.lane || null,
    // How a question about this list is worded, from the query's header.
    asks: head.asks || null,
    verb: head.verb || null,
    past: head.past || null,
    kind: head.kind || 'reigns',
    source: head.source || 'Wikidata',
    licence: head.licence || 'CC0 1.0',
    licenceUrl: head.licenceurl || 'https://creativecommons.org/publicdomain/zero/1.0/',
    url: head.url || 'https://query.wikidata.org/',
    retrieved: new Date().toISOString().slice(0, 10),
    query: query.trim(),
    rows,
  };
  writeFileSync(join(OUT, id + '.json'), JSON.stringify(snapshot, null, 1));
  console.log(`${rows.length} rows → records/${id}.json`);
  // Polite spacing between queries.
  if (ids.length > 1) await new Promise((r) => setTimeout(r, 2000));
}
