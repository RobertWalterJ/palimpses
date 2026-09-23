# Source hunt — 23 September 2026

New sources for Palimpsest, hunted against the iron rule: every question quotes a
verbatim passage from an openly licensed source, and the licence must permit
redistributing those quotes in a free app. Bias towards university and scholarly
publishers. Priorities in order: the Caribbean and the Atlantic world; China and
East Asia, South Asia and the Indian Ocean, the Islamic world, Europe; Africa
beyond OpenStax; Indigenous North America on Indigenous terms, and economic
anthropology in the Graeber vein.

Every licence below was checked by fetching a page, not inferred from the words
"open access". Every fetch pattern below was tested with `curl` and the HTTP
status recorded. Nothing in this file has been added to the repository.

---

## How the licences were verified (method worth keeping)

Two techniques did most of the work and should become standing practice.

**Crossref's `license` field.** For any journal, `https://api.crossref.org/journals/<ISSN>/works?select=title,license,DOI`
returns the publisher's own machine-readable licence URL per article. This is how
NWIG was confirmed CC BY 4.0 article by article, and how the Cambridge journals
were found to have flipped predominantly to CC BY 4.0. It is faster and more
reliable than reading a publisher's "open access" marketing page, and it
distinguishes the CC BY articles from the all-rights-reserved ones inside the
same hybrid journal.

**A browser User-Agent on `curl`.** Several sites that "block scripts" only block
the default `curl` UA. Sending
`-A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"`
is enough for brill.com, docsouth.unc.edu, books.openbookpublishers.com,
cambridge.org/core, and — see below — opentextbc.ca. It is *not* enough for
Cloudflare Turnstile, Vercel's checkpoint, or Anubis proof-of-work.

**Every Pressbooks book has a single-file XHTML export.** This is the most
useful thing in the audit and it was not obvious. Appending
`/open/download?type=xhtml` to any Pressbooks book URL returns the whole book as
one XHTML file with **exactly the markup `extract.mjs`'s Belshaw branch already
parses** — `div.part` with `.part-title`, `div.chapter` with `.chapter-title` and
`id="slug-…"`, and inline `span.footnote`. That is not a coincidence: it is the
same export Belshaw's two books came from. Tested today:

| Book | Export | Size |
|---|---|---|
| *Histories of Indigenous Peoples and Canada* (TRU) | 200 | 706 KB — 25 parts, 110 chapters, 190 footnotes |
| *Pulling Together: Foundations Guide* (opentextbc.ca) | 200 | 225 KB |
| *Movement Towards Reconciliation* (eCampusOntario) | 200 | 370 KB |
| ***Canadian History: Pre-Confederation*, 2nd edition (2020)** | **200** | **2.38 MB** |
| *Knowing Home* (pressbooks.bccampus.ca) | 500 | use the REST route instead |

Where the export 500s, every Pressbooks site also exposes a REST API:
`/wp-json/pressbooks/v2/toc` (the full table of contents with slugs) and
`/wp-json/pressbooks/v2/chapters?per_page=100` (chapter content as JSON — 1.5 MB
for the TRU book). Between the two, no Pressbooks book needs slug-guessing or
page-by-page scraping, and the earlier finding that guessed chapter slugs 404
stops mattering.

**PLAN.md item 7 is solved.** PLAN.md says "opentextbc.ca blocks scripts" and
plans to swap in the 2020 second edition of *Pre-Confederation* through the
browser pane. It does not block scripts. With a browser User-Agent,
`https://opentextbc.ca/preconfederation/` returns the real page body (HTTP 200,
113 KB, correct `og:title`, carrying the notice that points at
`/preconfederation2e/`), and
`https://opentextbc.ca/preconfederation2e/open/download?type=xhtml` returns the
complete second edition as a 2,377,618-byte XHTML export in the format
`extract.mjs` already reads. No browser pane required.

One caveat, found the hard way: **opentextbc.ca rate-limits hard.** A repeat
request within the same minute came back as a Cloudflare "Just a moment"
interstitial (HTTP 429, 5.7 KB). Fetch each book once, save it under `sources/`,
and back off — which is what the project does anyway.

---

## Ranked table

Rank weighs, in order: licence certainty, fit to the priority regions, machine
readability, and scholarly quality. "NC" flags a NonCommercial licence — fine
here, since this project's own content is already CC BY-NC-SA 4.0 and the app is
never sold, but it permanently forecloses ever selling it.

| # | Source | Publisher / author | Licence | Format | Fetchable | Priority |
|---|---|---|---|---|---|---|
| 1 | Voices of formerly Enslaved Corpus (pilot v0.1) | Elmerot, Olsson & Rönnbäck, Univ. of Gothenburg / Språkbanken Text, 2026 | **CC BY-SA 4.0** (underlying texts public domain) | XML, 10.3M tokens, 405k sentences | yes (GitLab tarball) | 1 |
| 2 | *Haytian Papers* (1816), ed. Prince Saunders | W. Reed, London, 1816 | **Public domain** | plain text (IA `_djvu.txt`), clean OCR | yes | 1 |
| 3 | NWIG — *New West Indian Guide* | Brill for KITLV, 1919– | **CC BY 4.0** per article | full-text HTML | yes (browser UA) | 1 |
| 4 | Olaudah Equiano, *Interesting Narrative* (1789) | Project Gutenberg #15399 | **Public domain** | plain text, 479 KB | yes | 1 |
| 5 | Thomas Clarkson, *Abolition of the African Slave-Trade* (1808), vols I–II | Gutenberg #12428, #12507 | **Public domain** | plain text | yes | 1 |
| 6 | Marcus Rainsford, *Black Empire of Hayti* (1805) | Internet Archive `historicalaccoun00rain_0` | **Public domain** | plain text (`_djvu.txt`), 938 KB | yes | 1 |
| 7 | OpenStax *Introduction to Anthropology* | Kottak et al., OpenStax / Rice Univ., 2022 | **CC BY-NC-SA 4.0** (NC) | CNXML, 121 modules | yes (GitHub) | 4 |
| 8 | Cambridge CC BY articles (*Journal of Global History*, *Itinerario*, *The Historical Journal*) | Cambridge University Press | **CC BY 4.0** (per article, Crossref-verified) | full-text HTML via `core-reader` | yes | 2 / 1 |
| 9 | J. G. Stedman, *Narrative of a Five Years Expedition … Surinam* (1796), vols 1–2 | Gutenberg #65715, #69441 | **Public domain** | plain text | yes | 1 |
| 10 | *The European Experience: A Multi-Perspective History of Modern Europe, 1500–2000* | Hansen, Hung, Ira et al., Open Book Publishers, 2023 | **CC BY-NC 4.0** (NC) | XHTML chapters | yes (`books.` subdomain only) | 2 |
| 11 | *The American Yawp* (1st ed., archived) | Locke & Wright, eds., Stanford University Press | **CC BY-SA 4.0** | HTML chapters, clean `<p>` | yes | 1 |
| 12 | DocSouth *North American Slave Narratives* | Univ. of North Carolina Libraries | underlying texts **public domain**; transcription rights **not stated** | corrected machine-readable text + bulk 49 MB zip | yes | 1 |
| 13 | Harriet Jacobs *Incidents* (1861) #11030; Frederick Douglass *Narrative* (1845) #23 | Project Gutenberg | **Public domain** | plain text | yes | 1 |
| 14 | MIT OpenCourseWare | MIT | **CC BY-NC-SA 4.0** (NC) | HTML, but mostly syllabi/problem sets | yes | low |

### Indigenous North America, and Africa beyond OpenStax

Verified in a parallel pass; the two strongest licence claims in each group
(candidates 15 and 21) were then re-fetched and confirmed independently.

| # | Source | Publisher / author | Licence | Format | Fetchable | Priority |
|---|---|---|---|---|---|---|
| 15 | *Histories of Indigenous Peoples and Canada* | John Douglas Belshaw, **Sarah Nickel** (Tk'emlúps te Secwépemc) & Chelsea Horton; Thompson Rivers University Open Press / BCcampus, 1st ed. | **CC BY 4.0** | Pressbooks HTML, ~29 chapters | yes | 3 |
| 16 | Project Gutenberg Indigenous-authored cluster — Black Hawk (Sauk) #7097; William Apess (Pequot) #12486; Simon Pokagon (Potawatomi) #66563, #44729; Charles A. Eastman / Ohiyesa (Santee Dakota) #337, #340, #336, #27448, #339; Zitkala-Ša (Yankton Dakota) #10376, #338 | 1833–1918 | **Public domain** | plain text + HTML | yes | 3 |
| 17 | *Oral Literature in Africa* | Ruth Finnegan, Open Book Publishers, 2012 (reissue of Oxford 1970) | **CC BY 3.0 Unported** — commercial use and adaptation explicitly permitted | XHTML chapters `ch1`–`ch15` | yes | 3 |
| 18 | Sarah Winnemucca Hopkins (Northern Paiute), *Life Among the Piutes* (1883) | ed. Mary Tyler Peabody Mann | **Public domain**; proofread Wikisource transcription | HTML via MediaWiki API | yes | 3 |
| 19 | *Pulling Together: Foundations Guide* | **Kory Wilson** (Kwakwaka'wakw) with Dianne Biin; BCcampus, 2018 | **CC BY-NC 4.0** (NC) | Pressbooks HTML | yes | 3 |
| 20 | *Historical and Contemporary Realities: Movement Towards Reconciliation* | **Susan Manitowabi** (Anishinaabe, Wiikwemkoong), Laurentian Univ. / eCampusOntario, 2018 | **CC BY-NC 4.0** (NC) | Pressbooks HTML, 6 chapters | yes | 3 |
| 21 | *Historia* (Historical Association of South Africa) | UP Journals, on SciELO South Africa, current | **CC BY 4.0** | full-text HTML | yes | 3 |
| 22 | *Knowing Home: Braiding Indigenous Science with Western Science*, Books 1–2 | Gloria Snively & **Wanosts'a7 Lorna Williams** (Lil'wat), eds.; Univ. of Victoria / BCcampus, 2016 & 2018 | **CC BY-NC-SA 4.0** (NC) | Pressbooks HTML, 15+ chapters | yes | 3 |
| 23 | *Studia Historiae Ecclesiasticae* | Church History Society of Southern Africa / UNISA Press, on SciELO ZA | **CC BY-SA 4.0** | full-text HTML | yes | 3 |

---

## The top candidates, and what each would let the app teach

### 1. Voices of formerly Enslaved Corpus — the single best find

Irene Elmerot, Leif-Jöran Olsson and Klas Rönnbäck (University of Gothenburg),
*Voices of formerly Enslaved Corpus* (pilot v0.1, updated 12 March 2026),
distributed by Språkbanken Text, DOI `10.23695/p5hw-dr52`. 10,323,284 tokens and
405,274 sentences of transcribed, annotated first-person narrative by formerly
enslaved people in the United States and the Caribbean, drawn from the Federal
Writers' Project interviews (1930s, published 1941) and from UNC's Documenting
the American South. Described in a peer-reviewed data paper: Elmerot, Olsson &
Rönnbäck, "Voices of formerly enslaved: A new text corpus of narratives by
formerly enslaved persons", *Scientific Data* 13, article 682 (30 April 2026),
DOI `10.1038/s41597-026-07340-x`.

**Licence.** The corpus is **CC BY-SA 4.0**, stated in Språkbanken's own
machine-readable metadata as `{"license":{"id":"CC-BY-SA-4.0"}}` at
`https://ws.spraakbanken.gu.se/ws/metadata/v3/?resource=votfe-pilot`, and in the
paper's Data Availability section: the authors chose share-alike explicitly
"since the data are part of the public domain and human cultural heritage". The
*paper* describing it is separately **CC BY 4.0**.

**What it teaches.** This is the thing the app most conspicuously lacks: the
Atlantic world in the words of the people who were enslaved in it, at a scale
where the app can ask about patterns rather than about one famous narrator.
Mary Prince is one voice; this is thousands, with occupations, food, punishment,
kinship, sale, emancipation and its aftermath all annotated. It also directly
serves the Graeber thread — the corpus keywords include "economical history",
"occupations" and "power relations", and its compiler Rönnbäck is an economic
historian, so the same body of text supports questions about work and value as
well as about slavery.

**How to fetch it.** One tarball:
`https://gitlab.com/krieljo/voices-of-formerly-enslaved-corpus/-/archive/Pilot-v0.1/voices-of-formerly-enslaved-corpus-Pilot-v0.1.tar.bz2`
(format XML). The article that describes it goes through the *existing* Europe
PMC article pipeline unchanged:
`https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13133344/fullTextXML`
(tested, HTTP 200, 48.9 KB JATS XML) — same shape as the Prümers 2022 source.

**Caveat worth thinking about before building on it.** The WPA interviews were
taken down in the 1930s by mostly white interviewers, in a rendered "vernacular"
orthography that is itself a historical artefact of the interviewer, not a
transcript of the speaker. If the app quotes these verbatim it must say so —
this is exactly the kind of "how the past is kept" lens the historiography audit
already established.

### 2. *Haytian Papers* (1816), edited by Prince Saunders

A collection of proclamations, laws and state documents of Haiti under Henry
Christophe, assembled and prefaced in English by Prince Saunders, a Black
American educator acting as agent for the Haitian government, printed in London
in 1816. Public domain by age. Internet Archive identifier `haytianpaperscol00henr`;
OCR fetched and inspected today at
`https://archive.org/download/haytianpaperscol00henr/haytianpaperscol00henr_djvu.txt`
(HTTP 200, 250 KB). OCR quality is good — comparable to the Ljungstedt 1836 text
already in the corpus, clean in the body prose, with occasional title-case errors
("HAYTL" for "HAYTI") that the existing `PLAIN` pipeline's cleanup already
handles.

**What it teaches.** Haiti describing itself, in its own official words, in
English, at the moment other states refused to recognise it. The app currently
has nothing on the Haitian Revolution at all, and the obvious secondary sources
are all in copyright. This sidesteps that: a constitution, a royal accession
narrative, and proclamations, edited by a Black abolitionist for an
English-speaking audience. It pairs naturally with Mary Prince (1831) — the same
Atlantic, one voice from below and one from a Black state — and lets the app ask
what a state that had abolished slavery said about itself.

**How to fetch it.** The existing `PLAIN` source list, one entry, Internet
Archive `_djvu.txt`, exactly as Ljungstedt is done.

### 3. NWIG — *New West Indian Guide* (Brill, for the KITLV)

The oldest scholarly journal on the Caribbean, continuously published since 1919,
published by Brill for the Royal Netherlands Institute of Southeast Asian and
Caribbean Studies. Diamond open access: no article processing charge, subvented
by the KITLV.

**Licence: CC BY 4.0.** Stated on the journal overview page
`https://brill.com/view/journals/nwig/nwig-overview.xml`, which links
`creativecommons.org/licenses/by/4.0/` 58 times, and confirmed independently
per-article through Crossref: all 40 of the most recent NWIG works carry
`https://creativecommons.org/licenses/by/4.0/` in their Crossref licence field,
with no exceptions. This is the cleanest licence position of any scholarly
Caribbean source found.

**What it teaches.** Current Caribbean scholarship, much of it by Caribbean
scholars, on exactly the ground the app is missing: plantation society,
creolisation, sovereignty, memory, the aftermath of slavery, Dutch and Hispanic
as well as British Caribbean. It is the source that lets the Caribbean pack be
built from scholarship rather than only from nineteenth-century primary texts.

**How to fetch it.** Article full-text HTML at
`https://brill.com/view/journals/nwig/<vol>/<issue>/article-p<page>_<n>.xml` —
tested `…/nwig/100/1-2/article-p153_18.xml` (HTTP 200, 292 KB, 14 body paragraphs
over 250 characters, prose present in `<p>` tags). Requires a browser
User-Agent. Discover articles and confirm each one's licence first via
`https://api.crossref.org/journals/2213-4360/works`.

### 7. OpenStax *Introduction to Anthropology* — the Graeber thread, ready to build

Already named in PLAN.md item 8, and it checks out completely. **CC BY-NC-SA
4.0**, stated both in the repository LICENSE file and, machine-readably, inside
the collection XML itself:
`<md:license url="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</md:license>`.
121 CNXML modules at `https://github.com/openstax/osbooks-introduction-anthropology`,
with `collections/introduction-anthropology.collection.xml` and `modules/` laid
out identically to the two World History volumes — meaning `extract.mjs`'s
existing `OPENSTAX` loop needs a new entry and nothing else.

Its twenty chapters include **7. Work, Life, and Value: Economic Anthropology**,
**8. Authority, Decisions, and Power: Political Anthropology**, **9. Social
Inequalities**, **11. Forming Family through Kinship** and **19. Indigenous
Anthropology**. That is the barter/credit/debt/state cross-cutting thread the
plan already wants, plus a chapter that serves priority 4's other half.

### 8. Cambridge CC BY articles — the highest-quality route into every region

The finding that matters most for priorities 2 and 3: Cambridge University Press's
history journals have flipped predominantly to CC BY 4.0 under read-and-publish
agreements. Of the 40 most recent works in each, Crossref reports:

- *Journal of Global History* (ISSN 1740-0228): 32 CC BY 4.0, 5 CC BY-NC-ND, 3 CC BY-NC-SA
- *Itinerario* (0165-1153): 34 CC BY 4.0, 3 CC BY-NC-ND, 2 CC BY-NC, 1 CC BY-NC-SA
- *The Historical Journal* (0018-246X): 27 CC BY 4.0, 7 CC BY-NC-ND, 4 none, 2 CC BY-NC-SA

**What it teaches.** Recent titles verified CC BY 4.0 in these journals include
"Between commerce and sanctity: Ottoman policies and international boundaries in
the early modern Red Sea", "Charting the shattered sea: Maritime geopolitics and
transnational oceanography in East Asia", "A Soviet history of the Quran of
Uthman", "The plague of Egypt crossing the Red Sea", "Theoretical foundations of
the economics of slavery: Enslaved people as capital investments" (2025),
"Slavery and the new history of capitalism" (2020), and "Samuel Pepys, the
African Companies, and the Archives of Slavery, 1660–1689" (2026). That single
list touches the Islamic world, East Asia, the Indian Ocean, the Atlantic and the
Graeber vein — all at a scholarly level the textbooks cannot reach, and all
under the app's best licence.

**How to fetch it.** Two steps, both tested.
1. Find and licence-check: `https://api.crossref.org/journals/<ISSN>/works?query.bibliographic=<terms>&select=title,license,DOI,issued`
   and keep only items whose licence URL contains `licenses/by/4.0`.
2. Fetch full text: resolve the DOI to get the Cambridge article ID, then request
   `https://www.cambridge.org/core/product/<ID>/core-reader`.
   Tested on DOI `10.1017/S1740022826100497` → ID
   `940FD84400E0A8584345C5108C10956A` → `core-reader` returned HTTP 200 with 89
   body paragraphs of prose in `<p>` tags. **Note:** the ordinary article landing
   page (`/core/journals/…/article/<slug>/<ID>`) returns 200 but contains *no*
   body prose — the `/core/product/<ID>/core-reader` path is the one that works.

### 11. *The American Yawp* — with a live caveat

Joseph Locke and Ben Wright, eds., *The American Yawp*, published by Stanford
University Press, 30 chapters. Licence **CC BY-SA 4.0**: the about page states
"The project is formally operated under a Creative Commons Attribution-Share
Alike 4.0 International (CC-BY-SA) License", and every chapter page carries a
machine-readable link to `creativecommons.org/licenses/by-sa/4.0`. (Older footer
text on the archived edition says "2.0 Generic"; the 4.0 link is the operative
one and matches the about page.)

**Caveat, tested today.** `americanyawp.com/text/<NN>-<slug>/` — the archived
first edition — fetches cleanly (HTTP 200, 69 prose paragraphs on chapter 4,
section headings in `<h2>` with anchors). But each page now carries a banner
saying the first edition stopped receiving updates in spring 2026, and the
homepage's links to the second edition
(`/text/2e-02-making-an-atlantic-world` and siblings) **all return 404**. The
second edition appears to be mid-migration. Build against the first edition only
if you are willing to re-point later, or wait.

**What it teaches.** Chapter 2 of the second edition is "Making an Atlantic
World"; the first edition's chapter 4 has a section "Slavery, Anti-Slavery and
Atlantic Exchange". It is the strongest openly licensed *narrative synthesis* of
the Atlantic world available, and it pairs with a companion **American Yawp
Reader** of primary documents at `americanyawp.com/reader/…` — including, notably
for the Canada pack, "Pontiac calls for war, 1763", "Alibamo Mingo, Choctaw
leader, reflects on the British and French, 1765" and "Samson Occom describes his
conversion and ministry, 1768".

**Licence compatibility — read this before using it.** CC BY-SA 4.0 requires that
*adaptations* be licensed BY-SA; adding a NonCommercial term is not permitted.
This project's content is CC BY-NC-SA 4.0. The safe reading is that a verbatim
quote inside a question is aggregation, not adaptation, and that the app's own
explanations are new writing *about* the quote rather than derivative of it —
but the safest practice is what SOURCES.md already does: keep each source's own
licence attached to its own quotes, and state in SOURCES.md that Yawp quotations
remain CC BY-SA 4.0. Same reasoning applies to the Voices corpus (also BY-SA).
If that reading ever looks shaky, the two BY-SA sources can be dropped without
touching anything else.

### 12. DocSouth *North American Slave Narratives* — strong content, soft licence

The University of North Carolina Libraries' digitisation of essentially every
narrative written by self-emancipated and formerly enslaved people published in
English up to 1920, plus many biographies. The texts themselves are public domain
by age. UNC provides **corrected, structured, machine-readable text** — not just
scans — and ships it in bulk through "DocSouth Data":
`https://docsouth.unc.edu/full-text/na-slave-narratives.zip`
(tested, HTTP 200, 48,927,341 bytes, `Content-Type: application/zip`). Individual
texts are clean HTML, e.g. `https://docsouth.unc.edu/neh/prince/prince.html`
(HTTP 200, 168 KB) — which happens to be Mary Prince, so it can be diffed against
the corpus already built from Gutenberg.

**Two caveats.** First, the site banner reads "Site Archived as of 3/30/26" — it
is frozen, so mirror what you need. Second, and more importantly for the iron
rule: **UNC states no licence.** The about, support and citing pages give
citation guidance and no rights statement. The underlying works are unambiguously
public domain; a faithful transcription of a public-domain text attracts little
or no new copyright; but "no stated licence" is weaker than the app's other
sources, so it is ranked below Gutenberg for the same texts. The Voices corpus
(candidate 1) already re-publishes a DocSouth selection under an explicit
CC BY-SA 4.0, which is the cleaner way to get the same material.

### 4, 5, 6, 9, 13. The public-domain Atlantic shelf

All plain text, all through `extract.mjs`'s existing `PLAIN` pipeline, all
verified fetchable today:

- **Olaudah Equiano**, *The Interesting Narrative of the Life of Olaudah Equiano, or Gustavus Vassa* (1789) — Gutenberg #15399, `https://www.gutenberg.org/cache/epub/15399/pg15399.txt` (HTTP 200, 479 KB). An African-born, Igbo-identified, formerly enslaved author on the Middle Passage, the Caribbean and abolition. The counterweight the app needs to Mary Prince's Bermuda/Antigua frame.
- **Thomas Clarkson**, *The History of the Rise, Progress and Accomplishment of the Abolition of the African Slave Trade by the British Parliament* (1808) — Gutenberg #12428 (vol I), #12507 (vol II); an 1839 abridgement is #10633. Abolition told by an organiser of it, which lets the app ask how the movement described its own methods rather than only its result.
- **Marcus Rainsford**, *An Historical Account of the Black Empire of Hayti* (1805) — Internet Archive `historicalaccoun00rain_0`, `_djvu.txt` (HTTP 200, 938 KB, clean body OCR). A British officer's sympathetic contemporary account of the Haitian Revolution, reproducing Leclerc's and Toussaint's proclamations in full. Pairs with the *Haytian Papers* as an outside account against Haiti's own.
- **John Gabriel Stedman**, *Narrative, of a Five Years Expedition against the Revolted Negroes of Surinam* (1796) — Gutenberg #65715, #69441. Plantation Suriname and maroon resistance, from a soldier sent to suppress it; the app's chance to ask what a hostile witness nonetheless records.
- **Harriet Jacobs**, *Incidents in the Life of a Slave Girl* (1861) — Gutenberg #11030 (478 KB); **Frederick Douglass**, *Narrative of the Life of Frederick Douglass* (1845) — Gutenberg #23 (249 KB).

### 15. *Histories of Indigenous Peoples and Canada* — the obvious next Canadian book

John Douglas Belshaw with **Sarah Nickel** (Tk'emlúps te Secwépemc) and Chelsea
Horton, Thompson Rivers University Open Press / BCcampus. **CC BY 4.0**,
confirmed by fetching `https://histindigenouspeoples.pressbooks.tru.ca/`
(HTTP 200, two `creativecommons.org/licenses/by/4.0` links; per-chapter footer
reads "is licensed under a Creative Commons Attribution 4.0 International
License, except where otherwise noted"). Fetch the whole book in one request at
`https://histindigenouspeoples.pressbooks.tru.ca/open/download?type=xhtml`
(HTTP 200, 706 KB: 25 parts, 110 chapters, 190 inline footnotes) — note that the
*live* chapter pages use different markup from the export and are the harder
route.

**Why this one first.** Same author as the two textbooks already in the corpus,
same licence, and the export lands in exactly the markup `extract.mjs`'s Belshaw
branch already parses — plus an Indigenous co-author. It covers "since time immemorial" as an
evidentiary argument, the confederacies, Wabanaki and Beothuk diplomacy, Red
River and the Saskatchewan resistance, residential schools and the potlatch law,
the White Paper, and Truth and Reconciliation. Belshaw's existing two books
narrate Canada; this narrates Indigenous nations. It answers PLAN.md item 5
(Inuit, Métis, women, the Beothuk lead) more directly than anything else found.

### 16, 18. Indigenous-authored public-domain voices

The app's `Voices` home screen currently has Copway and Peter Jones. Verified
available in clean transcription, all public domain, all fetchable:

- **Black Hawk** (Sauk), *Autobiography of Ma-ka-tai-me-she-kia-kiak* (1833) — Gutenberg **#7097**.
- **William Apess** (Pequot), *Indian Nullification of the Unconstitutional Laws of Massachusetts Relative to the Marshpee Tribe* (1835) — Gutenberg **#12486**. The earliest sustained Indigenous legal-political argument in print. *A Son of the Forest* and *Eulogy on King Philip* are **not** available in clean transcription anywhere checked.
- **Simon Pokagon** (Potawatomi), *The Red Man's Rebuke* (1893) — **#66563**; *The Passenger Pigeon* — **#44729**.
- **Charles Alexander Eastman / Ohiyesa** (Santee Dakota) — **#337** *Indian Boyhood*, **#340** *The Soul of the Indian*, **#336** *Indian Heroes and Great Chieftains*, **#27448** *The Indian To-day*, **#339** *Old Indian Days*.
- **Zitkala-Ša** (Yankton Dakota) — **#10376** *American Indian Stories*, **#338** *Old Indian Legends*.
- **Sarah Winnemucca Hopkins** (Northern Paiute), *Life Among the Piutes: Their Wrongs and Claims* (1883) — the first known autobiography by a Native American woman, and **not on Gutenberg**. Use the proofread Wikisource transcription (human-corrected through the Page: namespace, not raw OCR): `https://en.wikisource.org/w/api.php?action=parse&page=Life_Among_the_Piutes/Chapter_<n>&prop=text&format=json&formatversion=2`. Tested chapter 1 (HTTP 200, 91 KB, 125 prose paragraphs). Use `prop=text`, not `prop=wikitext` — the wikitext is only a `<pages index=…>` transclusion stub.

Fetch note for Gutenberg: use `https://www.gutenberg.org/cache/epub/<id>/pg<id>.txt`
or `…/pg<id>-images.html`. The `ebooks/<id>.txt.utf-8` form 302-redirects.

### 17, 21. Africa beyond OpenStax

**Ruth Finnegan, *Oral Literature in Africa*** (Open Book Publishers, 2012;
version 1.2, 2016) is the strongest single Africa find. **CC BY 3.0 Unported** —
verified verbatim on the book's own copyright page,
`https://books.openbookpublishers.com/10.11647/obp.0025/copyright.xhtml`: "This
book is licensed under a Creative Commons Attribution 3.0 Unported license
(CC-BY 3.0). This license allows you to share, copy, distribute and transmit the
work; to adapt the work and to make commercial use of it…". That is the most
permissive licence of anything in this audit. XHTML chapters at
`https://books.openbookpublishers.com/10.11647/obp.0025/ch<n>.xhtml`, `ch1`–`ch15`
all HTTP 200. It is a reissue of the 1970 Oxford original by a major scholar, and
its subject is exactly what an app built on written sources most needs: how
African societies recorded and argued about their own pasts — praise poetry,
panegyric, epic, dynastic and genealogical narrative, drum language, and the
patronage economy that paid court historians. Finnegan attacks the image of an
unchanging, uniform, non-literate Africa head-on, which is quotable argument
rather than summary.

**Warning on OBP file naming:** it is *not* consistent across books. obp.0025
uses `chN.xhtml`; obp.0033 (*Storytelling in Northern Zambia*) uses names like
`19_Works.html` and 404s on `chN.xhtml`. Scrape each book's `/toc.xhtml`.

***Historia*** (Historical Association of South Africa, UP Journals, on SciELO
South Africa) is **CC BY 4.0**, verified at
`https://www.scielo.org.za/revistas/hist/iaboutj.htm`: "Historia is published
under a Creative Commons Attribution 4.0 International Licence (CC BY 4.0).
Copyright is retained by the authors." Full-text HTML at
`https://www.scielo.org.za/scielo.php?script=sci_arttext&pid=S0018-229X<YYYYVVIISSS>&lng=en&nrm=iso`,
with enumerable issue TOCs. A long continuous run of southern African scholarship,
much of it by South African historians, on the Cape frontier, the mineral
revolution, the construction of segregation and apartheid, and the liberation
movements — all of which OpenStax gives a paragraph. Companion:
***Studia Historiae Ecclesiasticae*** (UNISA Press), **CC BY-SA 4.0**, same
platform, narrower (African Christianity, mission encounter, African Independent
Churches, the churches under apartheid).

### 19, 20, 22. Indigenous-authored open textbooks, Canada

All Pressbooks HTML, all fetchable, all NC:

- **Kory Wilson** (Kwakwaka'wakw) with Dianne Biin, *Pulling Together: Foundations Guide* (BCcampus, 2018) — **CC BY-NC 4.0**, stated at `https://opentextbc.ca/indigenizationfoundations/`. Terminology and its politics (Aboriginal vs Indigenous; First Nations, Métis, Inuit), the mechanics of colonization and decolonization, territorial acknowledgement, and an Indian Act timeline. It *defines* the vocabulary the narrative textbooks assume.
- **Susan Manitowabi** (Anishinaabe, Wiikwemkoong), *Historical and Contemporary Realities: Movement Towards Reconciliation* (Laurentian / eCampusOntario, 2018) — **CC BY-NC 4.0**, machine-readable in the book's schema.org JSON-LD. Six chapters on Robinson-Huron Treaty territory, Sudbury and Manitoulin, structured on the medicine wheel. This is the Ontario counterweight to the BC-heavy BCcampus material — treaty, mining, and Indigenous story treated as historical evidence.
- Gloria Snively and **Wanosts'a7 Lorna Williams** (Lil'wat), eds., *Knowing Home: Braiding Indigenous Science with Western Science*, Books 1–2 (Univ. of Victoria / BCcampus, 2016 & 2018) — **CC BY-NC-SA 4.0**, exactly this project's own licence. Fish traps and reef nets, clam gardens, cedar technologies, ethnobotany, navigation. A register the app entirely lacks: Indigenous intellectual and technological history rather than colonial political history.

Do not scrape these page by page — use `/open/download?type=xhtml` (see the
method section), which returns each book in the Belshaw export format.
*Knowing Home* is the exception: its export 500s, so use
`/wp-json/pressbooks/v2/toc` and `/wp-json/pressbooks/v2/chapters?per_page=100`.
Guessed chapter slugs 404 on every one of these sites.

---

## Fetching: what blocks scripts, and what does not

Tested today with `curl` and a browser User-Agent.

| Host | Result | Note |
|---|---|---|
| `opentextbc.ca` | **200** | Works. Contradicts PLAN.md item 7 — retry the 2nd-edition swap. |
| `brill.com` | 200 | Needs browser UA. Full article prose present. |
| `docsouth.unc.edu` | 200 | Including the 49 MB bulk zip. Site frozen 30 Mar 2026. |
| `books.openbookpublishers.com` | 200 | XHTML chapters. |
| `www.openbookpublishers.com` | **Vercel Security Checkpoint** | The catalogue/landing pages are unreachable; use the `books.` subdomain and Open Textbook Library for metadata. |
| `www.cambridge.org/core/product/<ID>/core-reader` | 200 | Prose present. The article landing page is *not* usable. |
| `www.gutenberg.org`, `archive.org` | 200 | As already used. |
| `raw.githubusercontent.com` / GitHub API | 200 | OpenStax CNXML. |
| `www.ebi.ac.uk/europepmc/...` | 200 | JATS XML, as already used. |
| `api.crossref.org` | 200 | No key needed. |
| `ecampusontario.pressbooks.pub` | 200 | |
| `pressbooks.pub` | **403** | The central Pressbooks host blocks scripted fetching. |
| `pressbooks.directory` | **Cloudflare Turnstile** | |
| `doaj.org` | **403** | Both the page and the API. Use Crossref instead. |
| `library.oapen.org` REST API | 200 | Metadata only — and OAPEN's metadata usually omits the licence. |
| `library.oapen.org/bitstream/...` | **Anubis proof-of-work** | The actual book files are unreachable to scripts. |
| `directory.doabooks.org/handle/...` | 403 | The `/rest/search` API works; item pages do not. |
| `www.degruyterbrill.com` | **202, empty body** | Bot challenge. |
| `direct.mit.edu` (MIT Press) | **403** | |
| `www.jstor.org` (OA books) | 200 but 3 KB stub | Effectively blocked. |
| `escholarship.org` | **202, empty body** | Bot challenge. |
| `www.liverpooluniversitypress.co.uk` | **403** | |
| `uplopen.com` (Leiden UP) | **403** | |
| `perspectives.americananthro.org` | 200 | But only an 18 MB PDF. |
| `histindigenouspeoples.pressbooks.tru.ca` | 200 | |
| `pressbooks.bccampus.ca` | 200 | |
| `en.wikisource.org` (incl. `w/api.php`) | 200 | Use `action=parse&prop=text`. |
| `www.scielo.org.za` | 200 | Article PIDs enumerable from issue TOCs. |
| `unesdoc.unesco.org` PDFs | **Cloudflare challenge** | Record pages are a JS SPA; `.pdf.multi` returns a 1.9 KB challenge shell. |
| `journals.codesria.org` | **redirects to login** | |

---

## Rejected, and why

**Rejected on licence (the usual reason).**

- **ANU Press** — everything from January 2018 is **CC BY-NC-ND 4.0**, and the terms page states plainly that you "may not alter, transform or build upon this work" (`https://press.anu.edu.au/faqs/conditions-use`). Titles before 2018 are all rights reserved. ND is the one CC term that genuinely threatens the app's model: whether lifting a paragraph into a question counts as an excerpt (permitted) or an adaptation (not) is unsettled, and Creative Commons' own FAQ answer on excerpting ND works turns on the facts rather than giving a clean yes. Given a large supply of BY and BY-NC-SA material, ND is not worth the exposure. **This rules out most of ANU Press, most Liverpool University Press open-access titles, and a large share of OAPEN.**
- **Liverpool University Press** Haiti titles — *The Unfinished Revolution* (Karen Salt) and *Haiti for the Haitians* are genuinely open access and exactly on topic, but LUP's stated recommendation for its open-access books is **CC BY-NC-ND**, and the LUP site returns 403 to scripts so per-title confirmation was not possible. ND plus unconfirmed plus blocked: rejected, reluctantly.
- **OAPEN / DOAB books generally** — *Awakening the Ashes* (Marlene L. Daut, UNC Press, 2023, an intellectual history of the Haitian Revolution and the single most desirable title found), *The Glasgow Sugar Aristocracy* (Stephen Mullen, University of London Press, 2022), *The Last Turtlemen of the Caribbean* (Sharika D. Crawford, UNC Press, 2020), *Slavery and the Dutch State* (Leiden UP, 2025), *Teaching Slavery* (UCL Press, 2023). All rejected for the same compound reason: **OAPEN's metadata records no licence at all** for these items (the full metadata dump for *Awakening the Ashes* has `dc.title`, `publisher.name`, `dc.date.issued` and no rights field), DOAB records only the useless string "open access", and the file that would settle it sits behind Anubis proof-of-work. If any one of these is wanted badly enough, the route is to obtain the EPUB by hand (*Awakening the Ashes* has `9781469674759.epub`, *Turtlemen* has `9781469660233.epub`) and read the copyright page — but that is a manual step, not a pipeline, and the answer may still be ND.

**Rejected on format.**

- **UNESCO *General History of Africa*** — rejected, with regret. It is the obvious Africa source and it does not work. The record pages on `unesdoc.unesco.org` are a Cloudflare-protected JavaScript single-page app that returns no licence text to a fetch at all, and the download URL (`…/PDF/398380eng.pdf.multi`) returns a 1,938-byte HTML challenge shell rather than a PDF. The widely repeated CC BY-SA 3.0 IGO claim could not be confirmed from UNESCO's own page by fetch; it applies confidently only to the new volume IX (2025), while volumes I–VIII are 1980s print scans published under the older all-rights-reserved model. Manual download plus manual licence checking, per volume, on scanned text. Not a pipeline. **Low confidence, not recommended.** *Oral Literature in Africa* and *Historia* do this job instead.
- ***Kronos: Southern African Histories*** (SciELO ZA) — a perfect topical fit that fetches cleanly, rejected purely on licence: its about page states **CC BY-NC-ND**. *Historia* is the substitute.
- **CODESRIA journals**, including *Afrika Zamani* — the archive redirects to a login page. Not openly fetchable.
- **African Minds** — genuinely CC BY 4.0 and the press is reputable, but the catalogue is JavaScript-rendered, delivery is PDF-first, and the list is overwhelmingly higher-education and research policy rather than history. Low yield.
- **William Apess, *A Son of the Forest* and *Eulogy on King Philip*** — wanted, not available. Neither Project Gutenberg nor Wikisource has a transcription (`Author:William_Apess`, `A_Son_of_the_Forest`, `Eulogy_on_King_Philip` all 404). Only *Indian Nullification* (Gutenberg #12486) exists in clean form.
- **MIT OpenCourseWare** — licence is clean (**CC BY-NC-SA 4.0**, stated verbatim at `https://ocw.mit.edu/pages/privacy-and-terms-of-use/`) and the site is fetchable, but OCW history courses are overwhelmingly syllabi, reading lists, assignment prompts and slide decks. There is very little continuous authored prose to quote verbatim, which is the only thing this app can use. Keep on the list as a curiosity; do not build on it.
- **Perspectives: An Open Introduction to Cultural Anthropology, 2nd ed.** (Society for Anthropology in Community Colleges / American Anthropological Association) — **CC BY-NC 4.0**, a genuinely good licence and a peer-reviewed book. But its Pressbooks host returns **403** to scripts and the only other route is a single 18 MB PDF. Since OpenStax *Introduction to Anthropology* covers the same ground with cleaner CNXML, this is a fallback, not a candidate.
- **Cliodynamics**, "Resetting History's Dial? A Critique of David Graeber and David Wengrow, *The Dawn of Everything*" (2022, DOI `10.21237/c7clio0057266`) — **CC BY 4.0** per Crossref, and thematically ideal: it would let the app teach the Graeber argument *and* the argument about the argument, the way it already handles the Macau 1557/1577 disagreement. But it is hosted on eScholarship, which returns **202 with an empty body** to scripts. Parked until a fetch route is found.
- **De Gruyter Brill open-access books** (*Slavery and the Dutch State*, *Cultural Heritage and Slavery*) — per-chapter HTML exists at `degruyterbrill.com/document/doi/<DOI>/html`, which would be ideal, but the host returns 202 with an empty body.
- **JSTOR Open Access books** and **MIT Press Direct to Open** — both block scripted fetching outright (3 KB stub and 403 respectively), so neither licence nor content could be verified.

**Rejected on rights being unstated.**

- **DocSouth** is ranked but flagged: see candidate 12. It is the only entry in the table with no stated licence, and it is there only because the underlying texts are indisputably public domain.

**Not rejected, but not verifiable today.**

- **SlaveVoyages** (listed as "planned" in SOURCES.md, CC BY-NC) was not re-checked — it is a database, not prose, and the app cannot quote a verbatim passage from a voyage record. Worth removing from SOURCES.md's "planned" list or re-scoping it as a figures source rather than a quote source.
