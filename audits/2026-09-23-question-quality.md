# Palimpsest — question pool audit

**23 September 2026 · Canada pack · all 317 questions**

Read against the same brief as the 19 September audit (`audits/2026-09-19-questions.mjs`),
in the same vocabulary — **anchor**, **deepens**, **rethinks**, **detail**;
*guessable*, *unplaced name*, *unexplained term*, *weak option*, *tests a number*,
*tests a phrase*, *long* — and against the rules in `README.md`, `PLAN.md` and
`build/verify.mjs`.

---

## The short answer

The pool has grown from 118 questions to 317, and almost all of the growth is one
question asked 152 times. **Which of these describes "X"?** is now 48% of the pack,
and in five of the eleven chapters it is *the whole chapter*.

Two things make play feel repetitive, and neither is the scheduler.

**One: the generated questions are a closed loop.** Each chapter's glossary
questions draw their wrong options from each other's right answers. In
`w06-europe`, 62 questions fill 248 option slots from **62 distinct sentences** —
every definition is shown, on average, **four times**, some up to **eight times**.
There are **134 reciprocal pairs** in the pool, where two questions are literally
each other's wrong option. Answering one teaches you another by elimination, and the
same paragraph of prose keeps scrolling past in a new arrangement. This is invisible
to `app.js`'s own anti-repetition guards: `GROUP_OF` keeps two questions on the same
big question off *adjacent* slots, and `PARAS_OF` keeps same-paragraph questions
apart, but the glossary questions never share a paragraph and `w06-europe` has only
three big questions to spread 62 items across.

**Two: the written questions have a tell.** Five answers hedge ("Nobody knows…",
"Perhaps not…", "Probably both…"); **no wrong option anywhere in the pool hedges**.
Thirteen more answers are the only option in their question carrying a negation or
qualifier ("not", "never", "no", "rather than"). Thirty-six answers are exactly two
words longer than any wrong option — one word under the threshold at which
`verify.mjs` fails the build. **67 of the 308 four-option questions (22%) can be
narrowed or solved by shape alone**, without knowing any history.

And every specific fix the 19 September audit named is still unmade. All nine strings
it asked to be replaced are still in the shipped pack: *"fixed since the 1950s"*,
*"Exactly 500,000, from the first censuses"*, *"Nobody lived in most of it yet"*,
*"Nations hid themselves from the ships"*, *"Mostly by doing nothing: they despaired"*,
*"As messengers sent down from the spirit world"*, *"paved Inca-style mountain roads"*,
*"All of them"*, *"volumes on a shelf"*. Five of the seven anchors it asked for —
Columbus, Cabot, the Grand Banks fleets, Turtle Island, the Treaty of Utrecht — are
still unasked. Only the Hudson's Bay Company (`hbc-model`) and Cartier's voyages
were taken up.

---

## What the pool is, in numbers

| | |
|---|---|
| Questions | 317 — 165 written, 152 generated from glossaries |
| Shapes | 308 four-option choice · 8 ordering · 1 two-option (`innis-speech`) |
| Chapters | 11 · **34** big questions |
| Marked `depth: 'detail'` | 175 (55%) — 152 of them generated |
| Anchors | 19, all in `ch02` (7), `ch04` (5), `ch05` (7) |
| Level 1 ("commonly known") | 22, in the same three chapters |
| Lens `contested` | 9 |
| Questions whose subject is a woman | 9 of 317 |

---

## 1. Near-duplicates

**34 clusters. 93 questions I would cut — 79 generated, 14 written.**
The machine-readable list is at the end. The reasoning follows.

### 1a. Generated against generated: the closed loop

The strongest duplicates are not a matter of judgement. Two are literally the same
question filed in two chapters:

- `w01-africa/g-caliph` and `w05-islamic-world/g-caliph` — **identical prompt,
  identical answer, identical evidence quote** ("An Islamic title designating a
  spiritual and secular leader"). Keep the one in its home chapter.
- `ch04-new-france/g-chattel-slavery` ("Ownership of a human being as a piece of
  property") and `w02-atlantic/g-chattel-slavery` ("A form of slavery in which one
  person is owned by another as a piece of property") — the same term, two
  paraphrases, two chapters. Keep the Atlantic one, where slavery is the subject.
- `w03-east-asia/g-mamluk-sultanate` and `w06-europe/g-mamluks` — both turn on
  "educated, formerly enslaved men".

Then the symmetric pairs, where the generator has made each question the other's
distractor and the two definitions differ by a word:

- **`ch02-before-contact/g-before-the-common-era-bce` and
  `…/g-common-era-ce`.** The first's answer is *"This term, along with CE, align
  exactly with the Christian dating system, dividing time approximately 2,000 years
  ago"*; the second's is *"This term, along with BCE, aligns exactly with…"* — and
  each is offered as a wrong option in the other. The player is not being asked what
  BCE means. They are being asked to spot which acronym the sentence names *second*.
  Cut both.
- `w06-europe/g-labor-union` ("workers of all kinds, both skilled and unskilled") and
  `…/g-trade-union` ("workers in a particular craft or industry") — mutual
  distractors, interchangeable to anyone who does not already know. Keep one.
- `w06-europe/g-deductive-reasoning` and `…/g-inductive-reasoning` — a symmetric
  pair, mutual distractors.
- `w02-atlantic/g-creoles` ("American-born White people of European descent") and
  `…/g-peninsulares` ("European-born White people from Spain") — the same.
- `w06-europe/g-optimates` and `…/g-populares`; `w06-europe/g-patron` and
  `…/g-clients` (each definition names the other's term);
  `w06-europe/g-hellenistic` and `…/g-hellenism`;
  `w05-islamic-world/g-caliph` and `…/g-caliphate` ("an area under the control of a
  Muslim ruler called a caliph" — the answer hands you the neighbouring question);
  `ch04-new-france/g-vinland` and `…/g-l-anse-aux-meadows`.
- Three definitions of factions of one club: `w06-europe/g-girondins` ("a moderate
  faction of the Jacobin political club"), `…/g-jacobins`, `…/g-mountain` ("a radical
  faction of the Jacobin club"). Keep `g-jacobins`.
- Three date-range labels that are mutually each other's wrong options:
  `ch02-before-contact/g-archaic-period` (10,000–3,000 BPE), `…/g-woodland-period`
  (1000 BCE–1000 CE), `…/g-paleo-indian` (until about 8000 BPE).

### 1b. Generated against written: the glossary re-teaching a question already asked

Eight glossary questions define something a written question has already taught, in
some cases with the written question's own answer text giving the definition away:

| Cluster | Written | Generated duplicate |
|---|---|---|
| The land bridge | `how-people-came` | `ch02-before-contact/g-beringia` |
| Ice Age giants | `giant-beaver` | `ch02-before-contact/g-megafauna` |
| Buffalo jumps | `head-smashed-in` (stem: *"Head-Smashed-In, the buffalo jump near Lethbridge"*) | `ch02-before-contact/g-buffalo-jumps` |
| Oolichan | `grease-trails` (answer: *"Freight-bearers carried oolichan grease, a fish oil, along them"*) | `ch02-before-contact/g-oolichan` |
| Hochelaga | `hochelaga-walls`, `hochelaga-fate` | `ch04-new-france/g-hochelaga` |
| Stadacona | `scurvy-cure` (stem: *"Stadacona, a town of the St. Lawrence Iroquois"*) | `ch04-new-france/g-stadacona` |
| The Columbian Exchange | `most-pivotal` (stem lists what crossed) | `w02-atlantic/g-columbian-exchange` |
| The hajj | `musa-pilgrimage` | `w05-islamic-world/g-hajj` |

In each case the written question is worth keeping: it asks what the thing *did*,
and the glossary one asks only what word goes with what sentence.

### 1c. Written against written

Twelve clusters, most of them shipping a fact twice from one paragraph.

**`nd-amazon-made` — the strongest case in the pool.** Four questions in a
ten-question chapter make the same argument:
`casarabe-made-landscape` (*"Canals and reservoirs completed the Casarabe settlement
system. In what kind of landscape?"* → "One shaped and modified by people"),
`casarabe-canal` (*"What does it show?"* → "The scale of landscape management and
labour"), `casarabe-urbanism`, and `amazon-sparse`. The 19 September audit already
said of `casarabe-made-landscape`: *"Duplicates made-landscapes' idea; merge or
link."* It was not merged, and a fifth question in `ch02` — `made-landscapes` — makes
the same point about the Pacific Northwest. Keep `amazon-sparse` (the lidar hook, the
sharpest counter-myth) and `made-landscapes` (a different region, a different
misconception); cut the two Casarabe restatements.

**`nd-casarabe-numbers`.** `casarabe-when` (about 500–1400 CE), `casarabe-pyramids`
(up to 22 m), `cotoca-tiwanaku` (ten times the Akapana) — three *tests a number*
questions from one paper, and `cotoca-tiwanaku` measures against a site the player
has never heard of, which the previous audit also flagged. Keep `casarabe-when`; it
dates the culture and feeds `order-long-past`.

**`nd-simcoe`.** `simcoe-first`, `simcoe-limits` and `act-and-effect` all cite
`pre-7.7-p6`. `simcoe-first` asks *"What made it a first?"* and answers *"The first
limit on slavery in the British Empire"* — the answer restates the stem. Keep
`simcoe-limits` (the rethink: it stopped imports and freed no one) and
`act-and-effect` (when slavery actually ended).

**`nd-fox-wars`.** `fox-wars` and `fox-wars-allies` share `pre-4.9-p5`. `fox-wars`'
stem already says the French waged war until a few hundred Meskwaki survived; its
answer is *"French relations with the nations weren't all benign."* The previous audit
said "the answer restates the stem. Rewrite." Cut it; `fox-wars-allies` carries the
real point — the French could not have done it without their allies.

**`nd-order-prehistory`.** `order-long-past` and `order-hemisphere` share **three of
their four items** — the Maritime Archaic (c. 7000 BCE), Keatley Creek (c. 2800 BCE),
and the Haudenosaunee League (c. 1450), with only Cahokia swapped for the Casarabe.
The item labels are even near-identical ("The Maritime Archaic **begins trading**
along the Atlantic coast" / "The Maritime Archaic **trade** along the Atlantic
coast"). Cut `order-hemisphere`.

**`nd-macau`.** `macau-two-dates` and `macau-permission` share `wh2-2.3-p31`.
`macau-two-dates` asks *"Two sources give the year. What do they say?"* — the last
question in the pack that is about the record rather than the past, and unanswerable
by anyone who has not read both. The 1557/1577 disagreement already lives in the
`th01` timeline, where it belongs. Cut it.

The rest: `nd-cahokia-scale` (`cahokia-woodhenge` / `cahokia-lisbon`, one paragraph;
the Lisbon comparison belongs on the woodhenge answer card), `nd-colony-dependence`
(`french-seventy` / `no-permission`), `nd-trade-protocol` (`terms-of-trade` /
`before-trade` / `newcomers-understood`), `nd-wendat-approach` (`wendat-approached` /
`visit-1609`), `nd-wendat-deaths` (`elders-lost` / `wendat-deaths-two-figures` — the
latter already marked for retirement in September), `nd-opium-push`
(`why-opium` / `opium-ban`, one paragraph).

### 1d. Keep both, but never in one round

Twelve clusters share evidence or an argument and should be spaced, not cut. The
app's `PARAS_OF` guard already handles the paragraph-sharing ones *within a round*;
what it cannot see is `league-older`, `order-long-past` and `order-contact` all
carrying "the Haudenosaunee League comes together, c.1450", or `farming-independent`
and `iron-independent` sharing a rhetorical move and an answer word. The full list is
in the JSON block as `space_do_not_cut`. `stable-prices` / `stable-prices-counter` is
the one pair that should always appear **together**: the disagreement is the lesson.

---

## 2. Unfair or guessable

### The hedge tell

| Question | Answer |
|---|---|
| `how-people-came` | Probably both, over a long span — and neither is proven |
| `population-peak` | Perhaps not — it may have been higher centuries earlier |
| `population-1400s` | Nobody knows: estimates run from 200,000 to 2 million |
| `hochelaga-fate` | Nobody knows: war, disease, or a planned move |
| `catholic-mikmaq` | Perhaps about the same |

**Not one wrong option in the whole pool hedges.** Two of these are anchors and
`how-people-came` opens the pack's origins thread. A player learns in three rounds:
when in doubt, pick the one that sounds unsure. Every one of these also needs a
second plausible hedged option — "We may never know: the record was destroyed",
"Estimates vary, but all are above two million" — so that hedging costs something.

### The negation tell

Thirteen questions where the answer is the only option carrying *not / never / no /
rather than / instead*: `no-atlantic-roots`, `keatley-creek`, `consensus`,
`jesuit-approach`, `guests`, `fox-wars`, `european-food-crops`,
`not-always-consensual`, `macartney`, `simcoe-limits`, and three generated
(`w01-africa/g-drystone`, `w06-europe/g-linear-a`, `w06-europe/g-sultan`).

### The length tell, just under the rule

`verify.mjs` fails the build when the answer is three or more words longer than the
longest wrong option. **Thirty-six questions sit at exactly two.** Among them are the
pack's opening anchors — `league-older`, `vacant-land`, `used-pelts`,
`how-people-came`, `giant-beaver`, `wampum-record`. The rule should be tightened to
two, or made relative (no more than 25% longer).

### The prompt-echo tell

The answer is the only option repeating a proper noun the prompt has already named:

- **`scurvy-cure`** — *"Cartier's men spent a bitter winter at **Stadacona**…"* →
  "A cure the **Stadaconans** gave them". This is the pack's flagship anchor and it is
  solvable by pattern-matching.
- **`canton-system`** — *"China ran its trade under the **Canton** system"* →
  "Trade only at Guangzhou (**Canton**), through its guild".
- **`thanadelthur`** — the only option naming a person, and the only one naming the
  **Chipewyan** from the stem. Flagged in September; unchanged.
- `piye`, `iron-independent`, `written-record-ignored`, and four generated
  (`ch04-new-france/g-english-reformation`, `w02-atlantic/g-cadiz-cortes`,
  `w02-atlantic/g-grito-do-ipiranga`, `w04-south-asia/g-undang-undang-laut-melaka` —
  where the term *"Undang-Undang Laut Melaka"* is answered by *"part of the
  Undang-Undang Melaka"*).

### Word-matching in the generated set

**18 of the 152 generated questions can be answered by matching a word of the term to
a word of the definition**, with no wrong option carrying it. The generator guards
against the term appearing *whole* in its definition
(`t.meaning.toLowerCase().includes(k)`) but not against a word of it:
`g-english-reformation` → "the **English** break with Catholic Rome";
`g-triple-alliance` → "an **alliance** formed in 1428";
`g-balance-of-power` → "equal military **power**";
`g-economic-imperialism` → "dominating a foreign country **economically**";
`g-imperial-cult` → "the religious **cult** that venerated";
`g-natural-rights` → "universal and inalienable **rights**";
`g-real-wages` → "**Wages** measured in terms of";
`g-penal-labor` → "Forced **labor** assigned as punishment";
`g-social-democrat` → "a **social**ist society through **democrat**ic means";
plus `g-british-raj`, `g-sepoys`, `g-chattel-slavery`, `g-cadiz-cortes`,
`g-grito-do-ipiranga`, `g-mamluk-sultanate`, `g-historical-climatology`,
`g-estates-general`, `g-contract-labor`. This is a one-line fix in
`glossaryQuestions`: reject a term whose content words appear in its own definition.

### The weak options the September audit asked to be replaced

All still shipping, so the questions that carry them are effectively three-option:
`arrival-earlier` ("They have been fixed since the 1950s"), `population-1400s`
("Exactly 500,000, from the first censuses"), `population-peak` ("Nobody lived in
most of it yet"), `vacant-land` ("Nations hid themselves from the ships"),
`epidemic-responses` ("Mostly by doing nothing: they despaired"),
`newcomers-understood` ("As messengers sent down from the spirit world"),
`casarabe-causeways` ("paved Inca-style mountain roads" — in a floodplain),
`everyone-traded` (answer: "All of them").

### Unanswerable without the source

- **`macau-two-dates`** — asks what two accounts say, of a player who has read
  neither. Cut (see §1c).
- **`cotoca-tiwanaku`** — measures Cotoca against the Akapana at Tiwanaku, a site
  named nowhere else in the pack.
- **`wickwire-fraser`** — needs Simon Fraser, who appears in no other question.
- **`great-peacemaker`** — "Where did he come from?" → "The Wendat villages of the
  north" is knowable only from the source.
- **`innis-speech`** — two options, and the stem's own gloss ("ideas that last through
  time") points straight at "Time-biased: it lasts". The previous audit said
  "Consider retiring."
- **The specialist glossary terms with nothing to hold on to**: `g-deffufa`,
  `g-kentake`, `g-cabotage`, `g-dynatoi`, `g-lanista`, `g-annona`, `g-publicani`,
  `g-centuriation`, `g-timar`, `g-sudanic`, `g-norte-chico`, `g-intendancy-system`,
  `g-cadiz-cortes`, `g-llaneros`, `g-people-of-the-felt-walls`.

### The context line does not do its job for 118 questions

The rule is that every question shows whose history it asks about. `contextLine(q)` in
`app.js` uses the question's own year where it has one, and otherwise the chapter's
era. **No generated question has an `at` value.** So a question about the Reign of
Terror, one about Roman tax-farming and one about the Great Schism of 1054 all carry
the same line: *"Europe, ancient times to the 1900s"*. The rule is met in form and
not in substance. Glossary terms whose definition contains a year or a century
(`g-twelve-tables`, `g-great-schism-of-1054`, `g-medieval-warm-period`,
`g-hangul`, `g-british-raj`, `g-hellenistic`, `g-triple-alliance`) could have `at`
set for free.

### Two build-side bugs worth fixing before any content work

1. **`level` is silently overwritten.** `glossaryQuestions` sets `level: 3`, but
   `bundle.mjs` then does `q.level = LEVEL.get(q.id.split('/')[1]) ?? 2` against the
   September audit's ratings map, which contains no generated ids. **All 152 generated
   questions ship as level 2, "school-level."** `g-lanista` and `g-deffufa` are
   presented to the scheduler as no harder than `wampum-record`.
2. **Every generated question is filed under the wrong big question in `ch02` and
   `ch04`.** `glossaryQuestions` matches a term's section against each big question's
   `src`, and falls back to `mod.BIG[0]`. The Belshaw glossaries live in the chapter
   *summary* sections (`pre-2.6`, `pre-3.7`, `pre-4.10`), which no `src` covers — so
   **all 15 `ch02` terms fall into `records` ("How do we know a past that kept no
   archives?")** including *teosinte*, *buffalo jumps*, *oolichan* and *matriarchy*,
   and **all 8 `ch04` terms fall into `first-visits`** including *censitaires*
   (seigneurial tenants) and the *English Reformation*. Elsewhere the `src` matching
   works but the source chapters are mismatched: `w02-atlantic/slavery` ("What did the
   Atlantic slave trade take, and from whom?") is answered by *Luddites*, *Marxism*,
   *mechanization*, *socialism*, *British Raj*, *sepoys* and *balance of power*;
   `w03-east-asia/song` ("What did Song China build?") by *Peking Man*;
   `w03-east-asia/silk` ("How did the Silk Roads tie China to the West?") by *Ring of
   Fire*; `w05-islamic-world/empires` by the *Renaissance*.

---

## 3. Trivial

**Roughly half the generated set carries a fact worth knowing: I would keep 73 of the
152.** Of the 79 I would cut, 33 are the duplicates in §1a–1b and 46 are trivial or
misplaced outright.

The test I applied, in order:

1. Does the definition state a **relation, mechanism or turning point**, or is it a
   label? *"polis: a city-state in Ancient Greece"* is a label. *"latifundia: large
   agricultural estates in the countryside, worked by enslaved people to produce
   profit"* answers the chapter's own big question, "on whose labour".
2. Does anything else in the pack **use** the term? *"Sudanic"*, *"Maghreb"*,
   *"biome"*, *"savanna"*, *"asceticism"* appear nowhere else and lead nowhere.
3. Is it **word-matchable** (see §2)?
4. Does a **written question already teach it** (see §1b)?
5. Is it in the **right chapter**?

Kept, by chapter: `ch02` 6 of 15 · `ch04` 3 of 8 · `w01-africa` 4 of 11 ·
`w02-atlantic` 7 of 24 · `w03-east-asia` 9 of 14 · `w04-south-asia` 4 of 5 ·
`w05-islamic-world` 8 of 13 · `w06-europe` 33 of 62.

The keepers are the ones that carry history rather than vocabulary:
`g-latifundia`, `g-gladiator` ("an enslaved professional fighter paid to battle before
an audience"), `g-publicani` ("bid for the right to collect taxes and profited from
the excess"), `g-annona` ("distribution of grain to the population, which was also a
political tool"), `g-paterfamilias`, `g-vestal-virgins`, `g-clients`, `g-dictator`
(a Republican office for emergencies — the word's history is the surprise),
`g-centuriation` (which rhymes with `made-landscapes`), `g-serfs`, `g-sultan`,
`g-cluniac-reform`, `g-dhimmi` and `g-timar` (how the Ottomans actually governed and
paid), `g-ulama`, `g-kurultai` and `g-people-of-the-felt-walls` (which cut against the
horde stereotype), `g-mandarins`, `g-hangul`, `g-red-turbans`, `g-triple-alliance`
(the Aztec "empire" was three city-states — it complicates `tenochtitlan-fell`),
`g-indentured-servants` against `g-chattel-slavery`, `g-charter` (which
`hbc-model` and `eic-pivot` both turn on), `g-viceroyalty`, `g-dhow` and
`g-lateen-sail` (the technology behind `swahili-winds`), `g-drystone` (behind
`great-zimbabwe`), `g-kentake`, `g-censitaires`, `g-l-anse-aux-meadows`,
`g-teosinte`, `g-winter-counts`, `g-pictographs`, `g-diffusion`.

**But none of the 73 is worth keeping in its present shape.** "Which of these
describes X?" with three other definitions beside it is a vocabulary quiz whatever
the vocabulary. The fix is not to cut more but to change the question: *"Roman
landowners ran large estates in the countryside for profit. Who worked them?"* —
same evidence, same paragraph, same verification, a historical question. That
rewriting is per-term work, which is why the shapes below matter more.

---

## 4. Shape

**308 of 317 questions are the same four-option multiple choice** (97%); 8 are
ordering; one, `innis-speech`, has two options. Everything below can be generated or
written from evidence the corpus already verifies, and — except where noted — renders
in the existing `choiceScreen` with **no app change at all**, because a question is
just `{prompt, answer, options, ev}`.

### a. True or false, against a common myth — *cheapest*

Two options. `choiceScreen` already renders a short option list (`innis-speech`
ships with one). No new screen, no new `kind`, no new verify rule beyond what exists.
It also kills the "only enlightened-sounding option" problem outright: there is no
list to scan for the humane answer.

> **True or false:** the peoples of the Americas kept no written records before
> Europeans arrived.
> — **False.** *"they had a written record, which the Europeans chose to ignore or
> attempt to destroy where it challenged their own media."* (`pre-2.2-p5`, the
> evidence already cited by `written-record-ignored`)

A second, from `pre-5.4-p21`, already cited by `terms-of-trade`:

> **True or false:** European traders set the terms of the fur trade.
> — **False.** *"The terms and protocols of trade were set by Aboriginal participants
> and Europeans had to conform."*

Source: any question with the `against-progress` lens, and the `BIG` evidence quotes
(every chapter's big question already carries verbatim-checked summary lines). The
generator writes the myth as the false statement and the source sentence as the
verdict. **Build cost: one function in `bundle.mjs` and a `truth` flag; roughly a day.**

### b. Which came first — *next cheapest*

Two options, rendered as a choice. The material is already there and already
verified: the `th01-empire-trade` `TIMELINE` has **21 dated events**, each with a
quote that `verify.mjs` checks *contains its own year*; the 8 ordering questions
supply **30 more** dated, quoted events.

> **Which came first?**
> — Haiti declares independence · Parliament ends the legal slave trade
> — **Haiti, 1804.** Parliament acted in 1807, three years after the enslaved people
> of Saint-Domingue had taken their freedom. (`wh2-7.3-p45`, `pre-11.15-p1`)

That pairing is a historical argument, not a date drill — which is the difference
between this and `casarabe-when`. Others available immediately: the Hudson's Bay
Company (1670) before China's opium ban (1729); Mansa Musa's pilgrimage (1324) before
Cartier at Tadoussac (1535); the Haudenosaunee League (c. 1450) before Port-Royal
(1605). **Build cost: a generator over `TIMELINE` + order items, with a rule that the
two dates be far enough apart to be a question and close enough to be a surprise.
A day or two.** It also relieves the ordering questions, which currently repeat their
items across chapters.

### c. Who said this — *cheap, and the pack's best unused asset*

Four options, rendered as a choice. `content/canada/voices.mjs` holds **11 voices**,
each verified verbatim against a scan or a corpus paragraph, each with `who`, `when`
and `recorded`. **Not one of them is asked as a question.**

> *"This Mony is the Father of Luxury, Lasciviousness, Intrigues, Tricks, Lying,
> Treachery, Falseness, and in a word, of all the mischief in the World."*
> Who said it?
> — **Adario, taken to be the Wendat statesman Kandiaronk, in 1703**
> — Bartolomé de las Casas, a Spanish priest in the Caribbean
> — George Copway (Kahgegagahbowh), an Ojibwe writer
> — Mary Prince, enslaved in Bermuda and Antigua

All four are real voices in the pack, so nothing is invented, and the answer card can
carry the thing that matters most — that a Frenchman, Lahontan, wrote it down, and
what that does to the quote. Eleven voices give eleven questions today, and the
`recorded` field gives a second shape for free: *"who wrote it down?"* **Build cost:
a generator over `voices`, with the `who` strings length-matched. A day.**

### d. Fill the missing words of a quote — *cheap as a choice, expensive as typing*

As a four-option choice, no app change:

> *"Smallpox was the real ______ in Mexico; Cortés and his small army simply ______."*
> — **conquistadore … mopped up** (`pre-5.3-p6`)
> — soldier … withdrew · disease … prevailed · terror … arrived

Every evidence quote in the pack is already verbatim-verified, so the blanks are
free. The care needed is in the distractors: they must be plausible completions that
are *not* claims the source makes elsewhere, or the question starts teaching a
falsehood. As a **typed** fill-in it needs a new screen, a new `kind`, keyboard
handling on a phone, and an answer-matching rule — and it fights the dyslexia
findings. Recommend the choice version only.

### e. Which nation, which place — *free, but use sparingly*

The written pool already has one (`birchbark-scrolls`), and the September audit was
right that nation names a newcomer cannot tell apart are pure guessing. Worth having
as a **second-encounter** shape only — asked after the nation has been met, never as
a first meeting.

### f. Odd one out, and match-the-record — *most expensive, do last*

"Three of these were kept by memory, one was written down." A matching grid over
`ch02`'s records material — wampum belts, birchbark scrolls, winter counts, grease-trail
cairns — would be the strongest teaching shape in the pack, and it needs a new
screen, a new `kind`, a new verify rule and drag-or-tap interaction. Park it.

**Order I would build them: (a) true-or-false, (b) which came first, (c) who said
this, (d) fill the quote as a choice.** The first three are generators over data that
already exists and passes `verify.mjs`; together they would take the four-option
share from 97% to somewhere near 70% without a single new source being read.

---

## 5. Coverage

### The pool is two packs wearing one coat

| Chapter | Questions | Written | Generated | Anchors | Level 1 | `detail` |
|---|---|---|---|---|---|---|
| ch02 Before contact | 48 | 33 | 15 | 7 | 8 | 24 |
| ch03 Amazonia | 10 | 10 | 0 | 0 | 0 | 2 |
| ch04 New France | 39 | 31 | 8 | 5 | 6 | 12 |
| ch05 Contact | 44 | 44 | 0 | 7 | 8 | 8 |
| th01 Trade, empire, abolition | 24 | 24 | 0 | 0 | 0 | 0 |
| w01 Africa | 34 | 23 | 11 | 0 | 0 | 11 |
| **w02 The Caribbean and the Atlantic** | 24 | **0** | 24 | 0 | 0 | 24 |
| **w03 China and East Asia** | 14 | **0** | 14 | 0 | 0 | 14 |
| **w04 South Asia and the Indian Ocean** | 5 | **0** | 5 | 0 | 0 | 5 |
| **w05 The Islamic world** | 13 | **0** | 13 | 0 | 0 | 13 |
| **w06 Europe** | 62 | **0** | 62 | 0 | 0 | 62 |

**118 questions — 37% of the pack — sit in five chapters that contain no written
question at all.** Every one is marked `depth: 'detail'`, every one has the `record`
lens and no other, and every one is "Which of these describes X?". A player who opens
the Europe chapter meets 62 vocabulary definitions and not one question about
anything that happened.

**13 of the 34 big questions have no question that is not a glossary definition:**

| Big question | Questions, all glossary |
|---|---|
| `w06-europe/revolutions` — "What did Europe's revolutions and industries change, and for whom?" | 31 |
| `w06-europe/ancient` — "What did Greece and Rome build — and on whose labour?" | 24 |
| `w02-atlantic/slavery` — "What did the Atlantic slave trade take, and from whom?" | 11 |
| `w02-atlantic/revolutions` | 8 |
| `w05-islamic-world/caliphates` | 8 |
| `w06-europe/faith` | 7 |
| `w02-atlantic/crossing`, `w03-east-asia/song`, `w03-east-asia/steppe`, `w05-islamic-world/empires` | 5 each |
| `w03-east-asia/silk` | 4 |
| `w04-south-asia/india` | 3 |
| `w04-south-asia/ocean` | 2 |

"What did the Atlantic slave trade take, and from whom?" is currently answered by
*Luddites*, *Marxism*, *mechanization*, *socialism*, *the British Raj*, *sepoys* and
*balance of power*. That is not a thin chapter; it is the wrong chapter.

### Thin even where the questions are written

- **`ch03-amazonia`: 10 questions, one 2022 paper, no anchor, no level-1 question.**
  After the duplicate cuts it is 5. It needs one anchor a general player already has
  — the Amazon as "untouched rainforest" — before any of the Casarabe detail.
- **`th01-empire-trade`: 24 questions, no anchor, no level-1.** It carries the pack's
  only timeline and its best modern hooks (Hong Kong, the Opium Wars, abolition) and
  opens on none of them. `wars` has 3 questions.
- **`ch04-new-france/faith`: 3 questions**, two of which share a paragraph
  (`jesuit-relations`, `jesuit-approach`). The missions are a third of what New France
  was.
- **`ch02-before-contact/origins`: 4 questions**, and one of the pack's two best
  threads.
- **`w01-africa`** is the one world chapter with real written questions (23), and it
  still has no anchor and no level-1 question — despite `musa-pilgrimage`,
  `great-zimbabwe` and `timbuktu` being exactly the commonly-known hooks the ladder
  wants.

### Lopsided in three more ways

- **All 19 anchors and all 22 level-1 questions are in three chapters.** Seven
  chapters — 173 questions — open cold.
- **Nine questions of 317 have a woman as their subject**: `league-women`,
  `thanadelthur`, `captives-marched`, `not-always-consensual`, `prince-salt`,
  `prince-verdict`, `cleopatra`, `g-kentake`, `g-vestal-virgins`. `PLAN.md` item 5
  ("Questions on women, Inuit and Métis") is unstarted: **the Inuit appear nowhere in
  the pool**, and the Métis appear once, incidentally, inside `war-of-1812-part`.
- **Nine questions carry the `contested` lens**, and the rule is that contested claims
  are asked as contested. Four more should: `oral-standard` (that oral traditions are
  "as reliable as written primary sources" is itself a historiographical position, and
  the September audit flagged it as *guessable*), `amazon-sparse` (one 2022 paper's
  "put to rest"), and the pair `farming-independent` / `iron-independent`, whose own
  sources say "appears to have emerged independently" and "scholars now generally
  agree" — both of which hedge in ways the questions do not.

### Anchors still missing, from the September list

Columbus (1492), Cabot and the Grand Banks fleets, Turtle Island, the Treaty of
Utrecht (1713) — all still unasked, all still stated plainly in the corpus. The Norse
now appear only as glossary distractor fodder (`g-vinland`, `g-l-anse-aux-meadows`).
Four of these are in the `th01` timeline already, which makes them free under
shape (b).

---

## What I would do, in order

1. **Fix the two build bugs** (§2): the `level` overwrite and the big-question
   fallback. Ten lines, and they change what the scheduler is choosing from.
2. **Cut the 93** in the block below. The pool goes 317 → 224, and `w06-europe`
   goes 62 → 33.
3. **Tighten `verify.mjs`**: option-length margin from 3 words to 2; fail if the
   answer is the only hedged or only negated option; fail if a generated term's own
   content words appear in its definition.
4. **Build true-or-false and which-came-first.** They are generators over verified
   data, they need no app change, and between them they can carry the anchors that
   are missing.
5. **Then** write the anchors: Columbus, Cabot, Turtle Island, the Amazon-as-wilderness,
   and one each for Africa, the Islamic world and Europe.

---

```json
{
  "generated": "2026-09-23",
  "pool": {
    "total": 317,
    "written": 165,
    "generated": 152,
    "after_cuts": 224
  },
  "near_duplicate_clusters": [
    {
      "id": "nd-amazon-made",
      "what": "The Amazon was shaped and settled by people",
      "keep": ["amazon-sparse", "made-landscapes"],
      "cut": ["casarabe-made-landscape", "casarabe-canal"],
      "trim": ["casarabe-urbanism"]
    },
    {
      "id": "nd-casarabe-numbers",
      "what": "How big, how tall, how old the Casarabe mounds were",
      "keep": ["casarabe-when"],
      "cut": ["casarabe-pyramids", "cotoca-tiwanaku"]
    },
    {
      "id": "nd-cahokia-scale",
      "what": "Cahokia as a big city (one paragraph, pre-2.4-p6)",
      "keep": ["cahokia-woodhenge"],
      "cut": ["cahokia-lisbon"]
    },
    {
      "id": "nd-colony-dependence",
      "what": "New France could not get furs without the nations",
      "keep": ["french-seventy"],
      "cut": ["no-permission"]
    },
    {
      "id": "nd-trade-protocol",
      "what": "Trade ran on Indigenous terms",
      "keep": ["terms-of-trade", "before-trade", "facon-du-pays"],
      "cut": ["newcomers-understood"]
    },
    {
      "id": "nd-wendat-approach",
      "what": "The Wendat came to the French, not the reverse",
      "keep": ["wendat-approached"],
      "cut": ["visit-1609"]
    },
    {
      "id": "nd-fox-wars",
      "what": "The Fox Wars (one paragraph, pre-4.9-p5)",
      "keep": ["fox-wars-allies"],
      "cut": ["fox-wars"]
    },
    {
      "id": "nd-wendat-deaths",
      "what": "What the smallpox took from the Wendat (one paragraph, pre-5.6-p7)",
      "keep": ["elders-lost"],
      "cut": ["wendat-deaths-two-figures"]
    },
    {
      "id": "nd-simcoe",
      "what": "Upper Canada 1793 slavery law (one paragraph, pre-7.7-p6)",
      "keep": ["simcoe-limits", "act-and-effect"],
      "cut": ["simcoe-first"]
    },
    {
      "id": "nd-macau",
      "what": "How the Portuguese got Macau (one paragraph, wh2-2.3-p31)",
      "keep": ["macau-permission"],
      "cut": ["macau-two-dates"]
    },
    {
      "id": "nd-opium-push",
      "what": "Why Britain pushed opium (one paragraph, wh2-6.2-p51)",
      "keep": ["why-opium", "silver"],
      "cut": ["opium-ban"]
    },
    {
      "id": "nd-order-prehistory",
      "what": "Two ordering questions sharing three of four items",
      "keep": ["order-long-past"],
      "cut": ["order-hemisphere"]
    },
    {
      "id": "nd-caliph",
      "what": "The same glossary question in two chapters, identical prompt and answer",
      "keep": ["w05-islamic-world/g-caliph"],
      "cut": ["w01-africa/g-caliph"]
    },
    {
      "id": "nd-chattel",
      "what": "chattel slavery defined twice, in two chapters",
      "keep": ["w02-atlantic/g-chattel-slavery"],
      "cut": ["ch04-new-france/g-chattel-slavery"]
    },
    {
      "id": "nd-mamluk",
      "what": "Mamluks defined twice, in two chapters",
      "keep": ["w06-europe/g-mamluks"],
      "cut": ["w03-east-asia/g-mamluk-sultanate"]
    },
    {
      "id": "nd-bce-ce",
      "what": "BCE and CE: two definitions differing only in which acronym they name, each the other's wrong option",
      "keep": [],
      "cut": ["ch02-before-contact/g-before-the-common-era-bce", "ch02-before-contact/g-common-era-ce"]
    },
    {
      "id": "nd-era-labels",
      "what": "Three date-range labels, mutually each other's wrong options",
      "keep": [],
      "cut": ["ch02-before-contact/g-archaic-period", "ch02-before-contact/g-woodland-period", "ch02-before-contact/g-paleo-indian"]
    },
    {
      "id": "nd-unions",
      "what": "labor union and trade union: near-identical definitions, each the other's wrong option",
      "keep": ["w06-europe/g-trade-union"],
      "cut": ["w06-europe/g-labor-union"]
    },
    {
      "id": "nd-jacobin-factions",
      "what": "Three definitions of factions of the same Jacobin club",
      "keep": ["w06-europe/g-jacobins"],
      "cut": ["w06-europe/g-girondins", "w06-europe/g-mountain"]
    },
    {
      "id": "nd-reasoning",
      "what": "Deductive and inductive reasoning: a symmetric pair, each the other's wrong option",
      "keep": ["w06-europe/g-inductive-reasoning"],
      "cut": ["w06-europe/g-deductive-reasoning"]
    },
    {
      "id": "nd-castas",
      "what": "creoles and peninsulares: a symmetric pair, each the other's wrong option",
      "keep": ["w02-atlantic/g-creoles"],
      "cut": ["w02-atlantic/g-peninsulares"]
    },
    {
      "id": "nd-caliphate",
      "what": "caliphate is defined as the area ruled by a caliph, the other question's own term",
      "keep": ["w05-islamic-world/g-caliph"],
      "cut": ["w05-islamic-world/g-caliphate"]
    },
    {
      "id": "nd-hellenic",
      "what": "Hellenistic and Hellenism: two labels for one thing",
      "keep": [],
      "cut": ["w06-europe/g-hellenistic", "w06-europe/g-hellenism"]
    },
    {
      "id": "nd-patron-client",
      "what": "patron and clients define each other",
      "keep": ["w06-europe/g-clients"],
      "cut": ["w06-europe/g-patron"]
    },
    {
      "id": "nd-optimates",
      "what": "optimates and populares: a symmetric pair, each the other's wrong option",
      "keep": ["w06-europe/g-populares"],
      "cut": ["w06-europe/g-optimates"]
    },
    {
      "id": "nd-vinland",
      "what": "Vinland and L'Anse aux Meadows: the same Norse fact, each the other's wrong option",
      "keep": ["ch04-new-france/g-l-anse-aux-meadows"],
      "cut": ["ch04-new-france/g-vinland"]
    },
    {
      "id": "nd-beringia",
      "what": "The land bridge: a written question and a glossary definition",
      "keep": ["how-people-came"],
      "cut": ["ch02-before-contact/g-beringia"]
    },
    {
      "id": "nd-megafauna",
      "what": "Ice Age giants: the giant-beaver question already teaches the idea",
      "keep": ["giant-beaver"],
      "cut": ["ch02-before-contact/g-megafauna"]
    },
    {
      "id": "nd-buffalo-jumps",
      "what": "Buffalo jumps: the Head-Smashed-In question names and explains one",
      "keep": ["head-smashed-in"],
      "cut": ["ch02-before-contact/g-buffalo-jumps"]
    },
    {
      "id": "nd-oolichan",
      "what": "Oolichan: the grease-trails answer already says 'oolichan grease, a fish oil'",
      "keep": ["grease-trails"],
      "cut": ["ch02-before-contact/g-oolichan"]
    },
    {
      "id": "nd-hochelaga",
      "what": "Hochelaga: two written questions already place and describe it",
      "keep": ["hochelaga-walls", "hochelaga-fate"],
      "cut": ["ch04-new-france/g-hochelaga"]
    },
    {
      "id": "nd-stadacona",
      "what": "Stadacona: the scurvy-cure stem already says what it is",
      "keep": ["scurvy-cure"],
      "cut": ["ch04-new-france/g-stadacona"]
    },
    {
      "id": "nd-columbian-exchange",
      "what": "The Columbian Exchange: the most-pivotal stem already lists what crossed",
      "keep": ["most-pivotal", "crops-population"],
      "cut": ["w02-atlantic/g-columbian-exchange"]
    },
    {
      "id": "nd-hajj",
      "what": "The hajj: Mansa Musa's pilgrimage already teaches it",
      "keep": ["musa-pilgrimage"],
      "cut": ["w05-islamic-world/g-hajj"]
    }
  ],
  "space_do_not_cut": [
    { "ids": ["stable-prices", "stable-prices-counter"], "why": "A deliberate contested pair: the point is that they disagree. Keep both, together or not at all." },
    { "ids": ["league-older", "order-long-past", "order-contact"], "why": "All three carry the Haudenosaunee League coming together, c.1450." },
    { "ids": ["swahili-united", "swahili-winds"], "why": "Two facts pulled from one sentence-pair (wh2-3.3-p20)." },
    { "ids": ["farming-independent", "iron-independent"], "why": "Same rhetorical move, same answer word (independently). Reword one." },
    { "ids": ["wendake-half", "wendat-tolls", "longhouse-warehouse"], "why": "Three angles on Wendat control of the fur routes." },
    { "ids": ["renewal", "consensus"], "why": "One paragraph (pre-4.4-p1), two different claims." },
    { "ids": ["jesuit-relations", "jesuit-approach"], "why": "One paragraph (pre-4.7-p2), two different claims." },
    { "ids": ["opium-war", "nanjing"], "why": "One paragraph (wh2-6.2-p52), cause then consequence." },
    { "ids": ["birchbark-scrolls", "midewiwin"], "why": "One paragraph (pre-2.2-p13)." },
    { "ids": ["trade-language-wendat", "chinook-before"], "why": "One paragraph (pre-5.2-p1)." },
    { "ids": ["horses-plains", "cayuse"], "why": "One paragraph (pre-5.2-p13)." },
    { "ids": ["donnacona", "mikmaq-canoes"], "why": "One paragraph (pre-5.4-p4)." }
  ],
  "cut": [
    "casarabe-made-landscape",
    "casarabe-canal",
    "casarabe-pyramids",
    "cotoca-tiwanaku",
    "cahokia-lisbon",
    "no-permission",
    "newcomers-understood",
    "visit-1609",
    "fox-wars",
    "wendat-deaths-two-figures",
    "simcoe-first",
    "macau-two-dates",
    "opium-ban",
    "order-hemisphere",
    "w01-africa/g-caliph",
    "ch04-new-france/g-chattel-slavery",
    "w03-east-asia/g-mamluk-sultanate",
    "ch02-before-contact/g-before-the-common-era-bce",
    "ch02-before-contact/g-common-era-ce",
    "ch02-before-contact/g-archaic-period",
    "ch02-before-contact/g-woodland-period",
    "ch02-before-contact/g-paleo-indian",
    "w06-europe/g-labor-union",
    "w06-europe/g-girondins",
    "w06-europe/g-mountain",
    "w06-europe/g-deductive-reasoning",
    "w02-atlantic/g-peninsulares",
    "w05-islamic-world/g-caliphate",
    "w06-europe/g-hellenistic",
    "w06-europe/g-hellenism",
    "w06-europe/g-patron",
    "w06-europe/g-optimates",
    "ch04-new-france/g-vinland",
    "ch02-before-contact/g-beringia",
    "ch02-before-contact/g-megafauna",
    "ch02-before-contact/g-buffalo-jumps",
    "ch02-before-contact/g-oolichan",
    "ch04-new-france/g-hochelaga",
    "ch04-new-france/g-stadacona",
    "w02-atlantic/g-columbian-exchange",
    "w05-islamic-world/g-hajj",
    "ch04-new-france/g-english-reformation",
    "ch04-new-france/g-hundred-years-war",
    "w01-africa/g-biome",
    "w01-africa/g-savanna",
    "w01-africa/g-deffufa",
    "w01-africa/g-maghreb",
    "w01-africa/g-asceticism",
    "w01-africa/g-sudanic",
    "w02-atlantic/g-norte-chico",
    "w02-atlantic/g-conquistadors",
    "w02-atlantic/g-balance-of-power",
    "w02-atlantic/g-british-raj",
    "w02-atlantic/g-economic-imperialism",
    "w02-atlantic/g-sepoys",
    "w02-atlantic/g-luddites",
    "w02-atlantic/g-marxism",
    "w02-atlantic/g-mechanization",
    "w02-atlantic/g-socialism",
    "w02-atlantic/g-cadiz-cortes",
    "w02-atlantic/g-intendancy-system",
    "w02-atlantic/g-juntas",
    "w02-atlantic/g-llaneros",
    "w02-atlantic/g-grito-do-ipiranga",
    "w03-east-asia/g-peking-man",
    "w03-east-asia/g-ring-of-fire",
    "w03-east-asia/g-cabotage",
    "w03-east-asia/g-janissaries",
    "w04-south-asia/g-undang-undang-laut-melaka",
    "w05-islamic-world/g-quran",
    "w05-islamic-world/g-islamization",
    "w05-islamic-world/g-renaissance",
    "w06-europe/g-polis",
    "w06-europe/g-mystery-religions",
    "w06-europe/g-proletariat",
    "w06-europe/g-domus",
    "w06-europe/g-colosseum",
    "w06-europe/g-lanista",
    "w06-europe/g-legion",
    "w06-europe/g-imperial-cult",
    "w06-europe/g-dynatoi",
    "w06-europe/g-sufism",
    "w06-europe/g-historical-climatology",
    "w06-europe/g-natural-rights",
    "w06-europe/g-committee-of-public-safety",
    "w06-europe/g-estates-general",
    "w06-europe/g-germanic-confederation",
    "w06-europe/g-risorgimento",
    "w06-europe/g-real-wages",
    "w06-europe/g-realism",
    "w06-europe/g-contract-labor",
    "w06-europe/g-anarchism",
    "w06-europe/g-social-democrat"
  ]
}
```

*Every id above was checked against `app/data/canada.json`; none is missing. Counts
are computed from the pack, not estimated. Judgements — which of a cluster to keep,
which glossary terms carry history — are mine, made by reading all 317.*
