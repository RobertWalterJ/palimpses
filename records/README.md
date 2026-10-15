# Records

Some of what this app asks about was never written as a sentence. A regnal
list, the span of a dynasty, the date a colony became a country: these are
records, and the honest thing is to show the record rather than hunt for a
paragraph that happens to contain the number.

Each file here is a **dated snapshot** of a public dataset, committed to the
repository so that every question can be checked against exactly the data it
was built from, offline, for ever. Nothing is fetched at build time.

## The shape of a file

```json
{
  "id": "english-monarchs",
  "title": "Monarchs of England and Britain",
  "source": "Wikidata",
  "licence": "CC0 1.0",
  "licenceUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
  "url": "https://query.wikidata.org/",
  "query": "the SPARQL that produced this, in full",
  "retrieved": "2026-10-14",
  "rows": [
    { "id": "Q80976", "name": "Henry VIII", "from": 1509, "to": 1547,
      "url": "https://www.wikidata.org/wiki/Q80976" }
  ]
}
```

`from` and `to` are years as integers, negative for BCE. Anything the source
leaves uncertain keeps its uncertainty: a row may carry `"circa": true`, and a
question built from it says so.

## Rules

1. **Never edit `rows` by hand.** Re-run the query and replace the file, so the
   snapshot always matches something a reader could reproduce. If a row is
   wrong at the source, drop it in `build/records.mjs` with a comment saying
   why — don't quietly correct it here.
2. **Record the licence.** The app shows it on the answer card. CC0 and CC BY
   are fine; anything NonDerivative is not usable.
3. **Date the snapshot.** `retrieved` is shown to the player.
4. **Keep the query.** A question is only as checkable as the thing that
   produced it.
