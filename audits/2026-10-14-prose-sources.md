# Prose sources — 14 October 2026

A second source hunt, built on `audits/2026-09-23-source-hunt.md` rather than
repeating it. Same iron rule: every question quotes a verbatim passage from an
openly licensed source, and the licence must permit redistributing those quotes
in a free app that is never sold.

Priorities, in the owner's order: **Caribbean history, from the Caribbean** —
pre-colonial, colonial, and anti-colonial / Black and enslaved-persons-centred;
then narrative (not list) material on the **English and British monarchy**, the
**Chinese dynasties as a sequence**, and the **Hellenistic successor kingdoms,
above all the Ptolemies**.

Every licence below was read from a fetched page or a fetched Crossref record.
Every fetch pattern below was executed and its HTTP status, byte count and
paragraph count recorded. Nothing has been added to the repository.

---

## Two corrections to the September hunt

**NWIG is not uniformly CC BY 4.0.** The September audit recorded "all 40 of the
most recent NWIG works carry CC BY 4.0, with no exceptions," and that is true of
the most recent works — but it was a recent-only sample. Walking the whole
Crossref record for ISSN 2213-4360 in both directions (500 items ascending, 300
descending) gives a clean split:

| Era | Licence in Crossref | Count in sample |
|---|---|---|
| 2023–2026 | `CC BY 4.0` | 296 of 300 |
| 1919–1928 (and the rest of the scanned back catalogue) | `CC BY-NC 4.0` | 499 of 500 |
| scattered | none recorded | 5 |
| one 2013 article | `CC BY-NC 3.0` | 1 |

Both licences are usable here — the app's own content is already CC BY-NC-SA 4.0
and the app is never sold — but the attribution string differs per article, so
**the licence must be read per article, not assumed from the journal**.

**The NWIG back catalogue has no HTML full text.** This is the more consequential
finding. Scanned-era articles resolve with HTTP 200 but return a 30–44 KB
metadata shell with the article body only as a PDF at
`/downloadpdf/view/journals/nwig/<vol>/<issue>/article-p<page>_<n>.pdf`.
Measured, counting paragraphs longer than 200 characters inside the page:

| Article | Year | Page size | Long paragraphs |
|---|---|---|---|
| `10.1163/13822373-90002605` (marronage in Barbados) | 1997 | 30 KB | 0 |
| `10.1163/22134360-90002365` (archaeology, Neth. Antilles) | 1960 | 30 KB | 0 |
| `10.1163/22134360-12340110` (Maroon population explosion) | 2013 | 44 KB | 0 |
| `10.1163/22134360-09203008` (review) | 2018 | 40 KB | 23 |
| `10.1163/22134360-09401050` (Maroon Fashion History) | 2020 | 112 KB | 138 |
| `10.1163/22134360-bja10020` (Practices of (Micro)Marronage) | 2022 | 110 KB | 239 |
| `10.1163/22134360-bja10045` (Bahamas, Black priest) | 2026 | 809 KB | 435 |

So the quotable NWIG corpus is the born-digital era, roughly 2019 onward, plus
anything whose page yields a real body. The rule for the fetcher is mechanical:
**extract paragraphs, and discard the item if fewer than about 40 exceed 200
characters** — that threshold separates full articles from reviews and from
PDF-only shells without needing to know the year.

A third, smaller correction: **OpenLearn is not blocked.** `www.open.edu`
returned 403 to a bare browser User-Agent string but 200/404 correctly once
`Accept`, `Accept-Language` and `Sec-Fetch-Mode` headers were sent. SOURCES.md
still lists OpenLearn as "planned"; it is reachable, but no unit's licence or
content was verified in this pass, so it stays planned rather than ranked.

---

## Ranked table

Rank weighs, in order: licence certainty, fit to the owner's stated priorities,
machine readability, and scholarly quality. "NC" flags NonCommercial, fine here
and already true of this project's own output.

| # | Source | Author / publisher | Licence (where stated) | Format | Verified fetch | Size | Pri |
|---|---|---|---|---|---|---|---|
| 1 | **New West Indian Guide** | Brill for the KITLV, 1919– | CC BY 4.0 (2023+) / CC BY-NC 4.0 (back cat.), per article, in the page and in Crossref | article HTML, `<p>` | yes, browser UA | 435 prose paras in one 2026 article; 3,654 works indexed | 1 |
| 2 | **Latin American Research Review** | Cambridge UP for LASA, diamond OA | **CC BY 4.0** for 269 of 300 most recent, per article, Crossref + page | `core-reader` HTML | yes | 1.03 MB per article, full body | 1 |
| 3 | **Tempo** | Univ. Federal Fluminense, Brazil, on SciELO | **CC BY 4.0**, 300 of 300 sampled, no exceptions | article HTML, English + Portuguese side by side | yes | 78 `<p>`; ~40 articles/yr since 2019 | 1 |
| 4 | **Juan Francisco Manzano / R. R. Madden, *Poems by a Slave in the Island of Cuba*** (1840) | London, 1840 | **Public domain** | IA `_djvu.txt` | yes | 356 KB, 54,836 words | 1 |
| 5 | **Narrative of Ashton Warner, a Native of St Vincent** (1831) | ed. Susanna Strickland, London | **Public domain** | IA `_djvu.txt` | yes | 181 KB, 31,386 words | 1 |
| 6 | **Quobna Ottobah Cugoano, *Thoughts and Sentiments on the Evil … of Slavery*** (1787) | London, 1787 | **Public domain** | IA `_djvu.txt` | yes | 278 KB, 47,816 words | 2 |
| 7 | **Mary Seacole, *Wonderful Adventures of Mrs Seacole in Many Lands*** (1857) | London, 1857 | **Public domain** | Gutenberg plain text + HTML | yes | PG #23031 | 1 |
| 8 | **Marcus Garvey, *Philosophy and Opinions of Marcus Garvey*** (1923) | ed. Amy Jacques Garvey | **Public domain** (US; Garvey d. 1940, so also Canada) | Wikisource, proofread, one page | yes, MediaWiki API | 293 paras, 29,052 words | 1 |
| 9 | **Sarah Schneewind, *An Outline History of East Asia to 1200*** | UC San Diego, via eScholarship | **CC BY-NC 4.0**, stated in the page footer and in the page's own licence tag | section HTML, clean `<p>` | yes | 11 chapters, ~100 leaf sections | 3 |
| 10 | **Wolfram Eberhard, *A History of China*, 3rd ed.** | University of California Press, 1969 | **Public domain in the US** — see the caveat | Gutenberg plain text | yes | 999 KB, **161,749 words** | 3 |
| 11 | **Dictionary of National Biography, 1885–1900** | Smith, Elder; Wikisource transcription | **Public domain**; proofread, not OCR | Wikisource `action=parse` | yes | *Henry VIII* alone = 73 paras, 16,707 words; 2,455 pages indexed | 4 |
| 12 | **J. P. Mahaffy, *The Empire of the Ptolemies*** (1895) | Macmillan | **Public domain** | IA `_djvu.txt`, clean OCR | yes | 1.14 MB, **180,570 words** | 4 |
| 13 | **Edwyn Bevan, *The House of Seleucus*** (1902), vols I–II | Edward Arnold | **Public domain** | IA `_djvu.txt` | yes | vol I 895 KB, 131,891 words | 4 |
| 14 | **Edwyn Bevan, *A History of Egypt under the Ptolemaic Dynasty*** (1927) | Methuen | **Public domain** (US) | IA `_djvu.txt` | yes | 1.01 MB | 4 |
| 15 | **1911 Encyclopædia Britannica** | Cambridge UP, 1911; Wikisource transcription | **Public domain**; proofread | Wikisource `action=parse` | yes | *Ptolemies* 3,217 words; *Seleucid Dynasty* 3,503 words | 4 |
| 16 | **Berger, Israel, Miller, Parkinson & Williams, *World History: Cultures, States, and Societies to 1500*** | Univ. System of Georgia / GALILEO | **CC BY-SA 4.0**, stated on the GALILEO original and in the LibreTexts footer | section HTML | yes | 12 chapters incl. China to Ming, Greek world to Roman conquest | 3 / 4 |
| 17 | **Christopher Brooks, *Western Civilization: A Concise History*, 3rd ed., vols I–III** | Portland Community College | **CC BY-NC-SA 4.0**, licence tag `license:ccbyncsa` `licenseversion:40` | section HTML | yes | 3 volumes | 4 |
| 18 | **Moses Grandy** (1843) #15036 · **Josiah Henson** (1849) #53609, #49129 | Gutenberg | **Public domain** | plain text | yes | — | 2 |
| 19 | **Anglo-Saxon Chronicle** #657 · **Holinshed's Chronicles** (England, early history) #16617 | Gutenberg | **Public domain** | plain text + HTML | yes | — | 4 |
| 20 | **Antiquity** (Cambridge) | Cambridge UP | **CC BY 4.0** for 137 of 300 most recent, per article | `core-reader` HTML | yes | — | low |
| 21 | **Latin American Antiquity** (Cambridge) | Cambridge UP for the SAA | **CC BY 4.0** for 81 of 300; 191 are all-rights-reserved Cambridge terms | `core-reader` HTML | yes | — | low |
| 22 | Europe PMC CC BY Caribbean archaeology — *Edible flora in pre-Columbian Caribbean coprolites* (PLOS ONE 2023, PMC10566737); *Faces Divulge the Origins of Caribbean Prehistoric Inhabitants* (Sci Rep 2020, PMC6954214) | PLOS, Springer Nature | **CC BY**, in the Europe PMC `license` field | JATS XML | yes | 9 CC BY hits total for the whole query | low |

---

## The top candidates, and what each would let the app teach

### 1. New West Indian Guide — still the spine of any Caribbean pack

Nothing else found in two hunts comes close. NWIG is the oldest scholarly journal
on the Caribbean, published continuously since 1919 by Brill for the Royal
Netherlands Institute of Southeast Asian and Caribbean Studies, diamond open
access with no author charge, and much of it written by Caribbean scholars about
the Dutch, Hispanic, Francophone and Anglophone Caribbean alike. Searching
Crossref within the journal shows the depth directly: marronage in Barbados
1650s–1830s, the Maroon population explosion in Suriname and Guyane, "Practices
of (Micro)Marronage," Maroon fashion history, Cuban archaeology, "Resistance,
Refuge, Revival: The Indigenous Kalinagos of Dominica," and three 1960s studies
on the archaeology of the Netherlands Antilles.

Today Palimpsest can ask about Caribbean slavery only through Mary Prince's own
account and whatever Belshaw and OpenStax say in passing. NWIG is what would let
it ask a question about **marronage as a system** rather than as an anecdote —
about who ran, where to, how colonial states counted and failed to count them,
and how Maroon communities in Suriname grew after emancipation rather than
dispersing. It is also the only verified source in either hunt that can teach
the Kalinago as a continuing people rather than as a line in a conquest
narrative.

**Fetch instructions.** Discovery and licence first, body second.

1. Enumerate works and read each one's licence from Crossref:
   `https://api.crossref.org/journals/2213-4360/works?rows=100&offset=<n>&select=license,DOI,issued,type,title&sort=issued&order=desc&mailto=<address>`
   Paginate with `offset`; 3,654 works are indexed. Keep only items whose
   `license[].URL` is a `creativecommons.org/licenses/...` URL, and record which
   one — it will be `by/4.0` for recent years and `by-nc/4.0` for the back
   catalogue, and that string is the attribution the app must print.
2. Narrow by topic with `query.bibliographic=<terms>` on the same journal
   endpoint (`maroon marronage resistance`, `Taino indigenous archaeology
   precolonial`, and so on).
3. Fetch the body by resolving the DOI, which lands directly on the full-text
   page — no page-number guessing, which is what the September recipe needed:
   `curl -sL -A "<browser UA>" https://doi.org/10.1163/22134360-bja10045`
   returns `https://brill.com/view/journals/nwig/aop/article-10.1163-22134360-bja10045/article-10.1163-22134360-bja10045.xml`,
   HTTP 200, 809 KB, 435 prose paragraphs, with
   `creativecommons.org/licenses/by/4.0` present in the page.
4. **A browser User-Agent is required** — brill.com is one of the hosts the
   September audit identified. Verify the CC URL in the fetched page as well as
   in Crossref; they agreed in every case tested.
5. **Discard any item with fewer than about 40 paragraphs over 200 characters.**
   That one filter removes the PDF-only back catalogue and the book reviews in a
   single step, and is more reliable than a date cutoff.

### 2. Latin American Research Review — new, and the cleanest licence of the three journals

LARR is the Latin American Studies Association's journal, published by Cambridge
since 2021 as full open access with no charge to authors. Of its 300 most recent
works, 269 are CC BY 4.0; the remaining 31 are NC or ND variants, so the
per-article check is mandatory but the hit rate is high. It covers the Caribbean
as part of Latin America rather than as an appendix to the British Empire, which
is exactly the shift in vantage point the owner asked for, and it reaches
subjects no textbook in the corpus touches: the article tested in full was on
Zapotec student-authors in 1930s Mexico City publishing manifestos that merged
Latin American intellectual movements with Zapotec cosmology.

What LARR adds that the app cannot currently do is **the twentieth century on
its own terms** — the independence era, US occupation, colonial administration,
and the intellectual history of anti-colonial thought, written by scholars in
and of the region. Verified: `https://doi.org/10.1017/lar.2026.10164` resolves
to a Cambridge landing page; take the last path segment as the product ID and
fetch
`https://www.cambridge.org/core/product/<ID>/core-reader`
(HTTP 200, 1.03 MB, full body present, `creativecommons.org/licenses/by/4.0` in
the page). The landing page itself is not usable; the `core-reader` route is.
Enumerate and licence-check through
`https://api.crossref.org/journals/1542-4278/works?...` exactly as for NWIG.

### 3. Tempo — Atlantic slavery in English, CC BY, with no exceptions at all

Of the three journals this is the licence to trust most: 300 of 300 sampled works
from 2019 to 2026 carry CC BY 4.0, which is a cleaner record than any journal in
either hunt. *Tempo* is published by the history programme at the Universidade
Federal Fluminense and hosted on SciELO Brazil, and it publishes English
translations alongside the Portuguese — the two language versions get separate
DOIs, the Portuguese ending `…pt`. Its slavery scholarship is squarely in the
app's territory: "The second slavery," early Atlantic fisheries and colonial
expansion in the fifteenth and sixteenth centuries, family and forced redemption
in Martinique in 1845–47, the freedom of the enslaved of Brazilian returnees.

This is the source that would let Palimpsest teach slavery as an **Atlantic
system with more than one empire in it** — connecting the Caribbean plantation
world to Brazil, which is the single largest gap in a corpus whose Atlantic
material is otherwise British and Haitian. Fetch:
`https://doi.org/10.1590/tem-1980-542x2024v320109` resolves to
`https://www.scielo.br/j/tem/a/<articleID>/?lang=en`
(HTTP 200, 202 KB, 78 `<p>`, both languages present,
`creativecommons.org/licenses/by/4.0` in the page). Take the English version by
choosing the DOI without the `pt` suffix, or by setting `?lang=en`. Enumerate
through `https://api.crossref.org/journals/1980-542X/works?...`.

### 4, 5, 6, 7, 8. The Caribbean and Black-authored public-domain shelf

Five texts, all verified by downloading the actual file and reading a sample.
Together they do something the app currently does with one voice: they let it
ask about slavery, resistance and anti-colonial thought **in the words of Black
and enslaved authors from five different places and five different decades**,
instead of Mary Prince standing in for all of it.

**Juan Francisco Manzano**, *Poems by a Slave in the Island of Cuba* (1840),
`https://archive.org/download/poemsbyslaveinis00manz/poemsbyslaveinis00manz_djvu.txt`
— 356 KB, 54,836 words, HTTP 200. Manzano was enslaved in Cuba and wrote his own
autobiography; this is R. R. Madden's translation of it together with his poems,
and it is the only Hispanic-Caribbean enslaved voice found in either hunt. The
OCR is clean prose but **double-spaced between words** (`And  marked  with  many
a  recent  wound`), so the extractor needs a whitespace collapse that the
existing normaliser does not yet do.

**The Narrative of Ashton Warner, a native of St Vincent** (1831),
`https://archive.org/download/884d7348-2d60-4deb-9cc7-4923381a0ded/884d7348-2d60-4deb-9cc7-4923381a0ded_djvu.txt`
— 181 KB, 31,386 words, HTTP 200, from the Internet Archive's `antislavery`
collection, published in London by Samuel Maunder. This is the direct companion
piece to *Mary Prince*: same year, same abolitionist circle, same amanuensis
(Susanna Strickland, later Susanna Moodie — which gives the app a real Canadian
hinge it does not have). OCR is clean; line-end hyphens are the glyph `¬` rather
than `-`, which the existing hyphen normaliser will need to accept.

**Quobna Ottobah Cugoano**, *Thoughts and Sentiments on the Evil and Wicked
Traffic of the Slavery and Commerce of the Human Species* (1787),
`https://archive.org/download/thoughtssentimen00cugo/thoughtssentimen00cugo_djvu.txt`
— 278 KB, 47,816 words, HTTP 200. The earliest published abolitionist argument
by an African author in Britain, and an argument rather than a narrative — it
would let the app ask what Cugoano *claimed*, not only what he suffered. The
long s is read as "f" throughout (`defects as may arife from want of better
educa-tion`), which is **the Lahontan case `build/verify.mjs` already handles**;
reuse that normaliser and quote short, clean sentences.

**Mary Seacole**, *Wonderful Adventures of Mrs Seacole in Many Lands* (1857),
Project Gutenberg **#23031**. A free Jamaican woman of colour writing her own
account of Panama and the Crimea, in Gutenberg's clean plain text. It puts a
Caribbean author inside a nineteenth-century imperial story the app will
otherwise tell only from Europe.

**Marcus Garvey**, *Philosophy and Opinions of Marcus Garvey* (1923), on
Wikisource as a single proofread page — 293 paragraphs, 29,052 words, fetched
through `action=parse` (see the recipe at candidate 11). This is the
anti-colonial half of the owner's request, from a Jamaican author, and it is a
**transcription rather than OCR**, so it quotes verbatim without any
normalisation at all. Published 1923 and Garvey died in 1940, so it is public
domain in the United States and in Canada.

### 9. Sarah Schneewind, *An Outline History of East Asia to 1200* — the best answer to the China request

A genuine university textbook by a professor of Chinese history at UC San Diego,
licensed **CC BY-NC 4.0** and structured as exactly the sequence the owner asked
for: East Asia to 1045 BC, the Zhou period, from Warring States to empire, the
Han empire and its neighbours, religion and society in Han, a world of many
powers (AD 200–580), consolidating unified regimes, Tang and Silla, Heian Japan,
the Commercial Revolution. It is not a list of dynasties; it is an argument about
how each regime formed, and it carries Korea and Japan alongside China rather
than as footnotes.

A section fetched in full — 4.06, "Enslaved People," inside the Han chapter —
yielded clean extractable prose on government and private slavery in Qin and
Han, on families enslaved for a relative's crime, on children sold during
famine, on Liu Bang permitting the sale of children in 205 BC and freeing them
three years later. That is both the dynastic sequence and the
debt-and-obligation register the app's "Exchange and obligation" chapter already
works in.

**Fetch instructions.** The author's own copy lives on eScholarship
(`https://escholarship.org/uc/item/9d699767`), which the September audit found
returns 202 with an empty body to scripts. **Use the LibreTexts copy instead**,
which is fetchable and carries the licence and attribution in the page:

- Book root:
  `https://human.libretexts.org/Bookshelves/History/World_History/An_Outline_History_of_East_Asia_to_1200_(Schneewind)`
- Chapter pages are linked from it; leaf sections are linked from each chapter
  page. Example leaf, tested:
  `…/An_Outline_History_of_East_Asia_to_1200_(Schneewind)/04%3A_The_Han_Empire_and_Its_Neighbors/4.06%3A_Enslaved_People`
  (HTTP 200, 28,730 bytes).
- Enumerate by scraping `href` values matching the chapter prefix; a chapter page
  lists its own sections (`4.01` … `4.11`).
- **The body is in the page, inside `class="mt-content-container"`, ending at
  `mt-content-footer`.** A `<p>` scan over that slice returns the prose. Do not
  look for `id="mt-content-container"`, which does not exist — that mistake
  returns zero paragraphs and makes the page look JavaScript-rendered when it is
  not.
- **The MindTouch API is 403** (`/@api/deki/pages/<id>/contents` and `/tree`
  both). Page HTML only.
- Licence verification per page: the footer prints "shared under a CC BY-NC 4.0
  license … authored … by Sarah Schneewind (eScholarship)", and the page's own
  tag list contains `license:ccbync`, `licenseversion:40`,
  `authorname:sschneewind`, `source@https://escholarship.org/uc/item/9d699767`.
  **Check that per page.** LibreTexts is a remix platform: a page's licence is a
  property of the page, not of the book, and a single bookshelf can mix CC BY-NC,
  CC BY-SA and CC BY-NC-SA material.

### 10. Wolfram Eberhard, *A History of China* — the whole sequence, with one real caveat

The third revised edition (University of California Press, 1969), 161,749 words,
at Project Gutenberg **#17695**:
`https://www.gutenberg.org/cache/epub/17695/pg17695.txt` (HTTP 200, 999 KB).
This is a proper scholarly narrative running from prehistory through every
dynasty to the twentieth century, written by a sinologist who argued explicitly
against the received dynastic story and built the book on archaeology and social
structure instead. It is the single text that would let the app teach the
dynasties *as a sequence with causes*, which neither OpenStax volume does at
length and which Schneewind stops doing at 1200.

**The caveat, stated plainly.** Gutenberg's header is the standard public-domain
notice ("anyone anywhere in the United States and most other parts of the
world"), which here means the US copyright was not renewed. Eberhard died in
1989, so under Canada's life-plus-seventy term the work is **still in copyright
in Canada until 2060**. Every other public-domain text in the corpus — Mary
Prince 1831, Ljungstedt 1836, *Haytian Papers* 1816, Cugoano 1787, Manzano 1840,
Warner 1831, Mahaffy 1895, Bevan 1902 — is public domain everywhere by age, so
this would be the first item in the corpus whose status depends on jurisdiction.
It is also 1969 scholarship. Ranked tenth for that reason rather than higher; if
the jurisdiction point is unwelcome, candidates 9 and 16 cover China between
them without it.

### 11. The Dictionary of National Biography on Wikisource — the monarchy answer

The 1885–1900 DNB is public domain, and Wikisource holds it as a **proofread
transcription rather than OCR**, which makes it the highest-fidelity
public-domain text found in either hunt: there is nothing to normalise. The
article on Henry VIII, by James Gairdner — the editor of the Letters and Papers
of Henry VIII, so the leading documentary scholar of the reign — is 73 paragraphs
and 16,707 words of continuous narrative. A search for the series returns 2,455
pages, which is every monarch and most of the people around them.

This is what the app needs for the English and British monarchy: narrative, by a
named scholar, at biography length, on every reign in order. The standing
caveat is that it is Victorian scholarship with Victorian judgements, which the
app should handle the way it already handles the Macau 1557/1577 disagreement —
by asking what the source says and whose voice it is, not by presenting it as
settled. Pairing it with the **Anglo-Saxon Chronicle** (Gutenberg #657) and
**Holinshed** (#16617) would give the same reigns in the chroniclers' own words
alongside the Victorian summary.

**Fetch instructions**, which also serve candidates 8 and 15:

- Find pages: `https://en.wikisource.org/w/api.php?action=query&list=search&srsearch=<query>&format=json&srlimit=20`
  returns titles with `wordcount`, so the long articles can be picked before
  fetching.
- Fetch one: `https://en.wikisource.org/w/api.php?action=parse&page=<exact title>&prop=text&format=json&formatversion=2`
  returns rendered HTML in `parse.text`. Extract `<p>` and keep paragraphs over
  about 120 characters. Verified: *Dictionary of National Biography, 1885-1900/Henry VIII*
  → 42,839 bytes, 73 paragraphs, 16,707 words.
- URL-encode the page title; non-ASCII titles such as *1911 Encyclopædia
  Britannica/Ptolemies* need NFC-normalised UTF-8 or the API returns a warning.
- `en.wikisource.org` was 200 throughout, with no User-Agent games needed.

### 12, 13, 14, 15. The Ptolemies and the other successor kingdoms

There is no CC-licensed modern narrative history of the Hellenistic kingdoms
that fetches (see the rejected section). The public-domain shelf, however, is
unusually strong here, because the Ptolemies and Seleucids were a Victorian and
Edwardian speciality and the standard works are out of copyright by age.

**J. P. Mahaffy, *The Empire of the Ptolemies*** (Macmillan, 1895),
`https://archive.org/download/empireofptolemi00maha/empireofptolemi00maha_djvu.txt`
— 1.14 MB, **180,570 words**, HTTP 200, and the OCR is the cleanest of any
Internet Archive text tested in this pass. Mahaffy was the Trinity College
Dublin papyrologist who built the field; the book is a reign-by-reign narrative
from Alexander's conquest of Egypt through the whole dynasty, with the papyri
quoted inside it. One fetch gives the app the entire Ptolemaic sequence, which it
currently cannot teach at all.

**Edwyn Bevan, *The House of Seleucus*** (1902),
`https://archive.org/download/houseofseleucus01bevauoft/houseofseleucus01bevauoft_djvu.txt`
— 895 KB, 131,891 words for volume I, with volume II as a separate item. The
companion narrative for the Seleucid east, so that the app can teach the
successor kingdoms as rivals rather than as one kingdom plus a blank. OCR is
double-spaced like Manzano's, same whitespace fix.

**Edwyn Bevan, *A History of Egypt under the Ptolemaic Dynasty*** (Methuen,
1927),
`https://archive.org/download/historyofegyptun0004edwy/historyofegyptun0004edwy_djvu.txt`
— 1.01 MB, HTTP 200. A generation newer than Mahaffy and a different judgement
on the same reigns, which gives the app a second opinion to set against the
first. Note that `in.ernet.dli.2015.279352` has no `_djvu.txt` (404) and
`historyofegyptun0000unse` is a second usable copy (1.02 MB).

**The 1911 Encyclopædia Britannica on Wikisource**, for the short authoritative
summary against which the long narratives can be checked: *Ptolemies* is 10
paragraphs and 3,217 words, *Seleucid Dynasty* 8 paragraphs and 3,503 words,
both proofread, both fetched through the recipe at candidate 11. EB1911's
Hellenistic articles were written by Bevan himself, which is worth knowing
before treating the two as independent sources.

### 16, 17. Two CC-licensed survey textbooks that fill the remaining corners

**Berger, Israel, Miller, Parkinson and Williams, *World History: Cultures,
States, and Societies to 1500*** — University System of Georgia, **CC BY-SA
4.0**, confirmed both on the GALILEO original
(`https://oer.galileo.usg.edu/history-textbooks/2/`, HTTP 200, CC BY-SA 4.0 link
in the page) and in the LibreTexts footer and licence tag (`license:ccbysa`,
`licenseversion:40`, `program:galileo`). Its chapter 4 is China and East Asia to
the Ming dynasty — which carries China past Schneewind's 1200 cutoff under a
licence with no jurisdiction problem — its chapter 5 is the Greek world from the
Bronze Age to the Roman conquest, covering Alexander's successors, and its
chapter 12 is Western Europe 1000–1500, covering the English monarchy.

**Christopher Brooks, *Western Civilization: A Concise History*, 3rd edition,
volumes I–III** — **CC BY-NC-SA 4.0** (`license:ccbyncsa`, `licenseversion:40`,
`authorname:cbrooks`), the same licence family the app already uses for
OpenStax. Three volumes of continuous narrative on Europe, useful mainly as a
second voice on the monarchy and the Hellenistic world rather than as a primary
addition.

Both are fetched through the LibreTexts route and caveats described at candidate
9 — `class="mt-content-container"`, page HTML only, and a per-page licence check,
because these two books sit on the same bookshelf under two different licences,
which is precisely why the check cannot be skipped.

---

## Rejected, and why

**Rejected on licence.**

- **Sidestone Press, *Early Settlers of the Insular Caribbean: Dearchaizing the
  Archaic*** (Hofman & Antczak, eds., 2019) — the most wanted title in this
  hunt and it fails. It is the pre-colonial Caribbean archaeology the owner
  asked for, by the Leiden NEXUS1492 group with Caribbean co-authors, 342 pages,
  free to download. But **Sidestone's licence is per title and is stated only in
  the book's printed colophon.** Their policy page is explicit that CC is a
  recommendation to authors, offered as either CC BY or CC BY-NC-ND, and that the
  colophon carries whichever was chosen. The book's own web page carries no CC
  licence (the only "Creative Commons" string on it is a link to that policy
  page), the OAPEN record returns **403** to `?show=full`, the PDF
  (`https://www.sidestone.com/openaccess/9789088907807.pdf`, 9.5 MB, HTTP 200)
  has no `Creative Commons` string in its uncompressed byte stream, and no PDF
  text extractor is installed on this machine to read page 4. Indexed metadata
  shows the copyright line as "© 2019 Individual authors", which is an
  all-rights-reserved notice. **Unverifiable by fetch, probably all rights
  reserved, and PDF-only even if it were not.** If it is wanted badly enough,
  the manual step is to open page 4 of that PDF and read the colophon — but a
  PDF-only source cannot be kept verified by `build/verify.mjs` the way an
  HTML or XML source can.
- **Nature, Fernandes et al., "A genetic history of the pre-contact Caribbean"**
  (2021), DOI `10.1038/s41586-020-03053-2` — the obvious modern source on when
  and how the islands were settled, and it carries **no Creative Commons licence
  at all**. Its Crossref record lists only `http://www.springer.com/tdm` for both
  the text-mining and version-of-record entries. Not usable. This is the clearest
  possible illustration of why "open access" must never be inferred.
- **Journal of Global Slavery** (Brill, ISSN 2405-8378) — thematically ideal,
  and **Crossref records no licence for any of its works** (4 of 4 in the sample,
  none). Nothing to rely on.
- **Journal of Caribbean Archaeology** (Florida Museum of Natural History) —
  founded 1999, **ceased publication in 2022**, and its site states no licence
  anywhere; the only rights notice on the page is "© Copyright 2026". Rejected on
  rights being unstated, the same category the September audit put DocSouth in,
  but without DocSouth's compensating strength.
- **Latin American Antiquity** — kept in the table at low priority only. 191 of
  its 300 most recent works are under Cambridge's all-rights-reserved terms and
  just 81 are CC BY; its Caribbean content is thin next to its Mesoamerican and
  Andean material. Per-article checking for a low hit rate on a marginal topic.

**Rejected on content, which is the more interesting rejection.**

- **"The Caribbean Since Columbus" (HIST 277), Mahalia Mehu, CUNY Pressbooks** —
  the one thing that looked like an open Caribbean history textbook, and it is
  not a textbook. The Pressbooks XHTML export **500s**; the REST API works
  (`https://pressbooks.cuny.edu/thecaribbeansincecolumbushist277/wp-json/pressbooks/v2/toc`,
  HTTP 200, 45 KB) and settles it. The whole book is **26,573 words**, of which
  every item over 500 words is a weekly quiz with answers, a final exam, an exam
  study guide, a syllabus or a writing rubric. There are **no narrative chapters
  at all**. Worse for the licence: the book's own metadata gives its
  `alternativeHeadline` as "Primarily sourced from *Empire's Crossroads: The
  Caribbean from Columbus to the Present Day* by Carrie Gibson" and lists Gibson
  as a contributor — so the CC BY-SA claim sits over content summarised from an
  in-copyright trade book. Rejected twice over.
- **There is no CC BY open monograph on Caribbean history reachable by script.**
  This is a negative finding worth recording so the next hunt does not repeat it.
  A Crossref sweep filtered to `license.url:http://creativecommons.org/licenses/by/4.0/`,
  `type:book-chapter`, `from-pub-date:2015-01-01`, run against three separate
  topic queries — "Caribbean slavery plantation", "Haiti revolution", "maroon
  resistance enslaved" — returned **not one Caribbean history chapter**. The
  results were Bristol University Press sociology, Open Book Publishers on the
  Scientific Revolution, and Ca' Foscari volumes on rhetoric and language. Taken
  with September's findings on OAPEN, Liverpool University Press and UNC Press,
  the conclusion is that the open-access Caribbean monograph literature exists
  but is NoDerivatives, unlicensed, or behind a bot wall. **Journals, not books,
  are the route into Caribbean scholarship.**

**Rejected on fetching.**

- **Library of Congress / Chronicling America** — this was to be the route into
  nineteenth-century Black newspapers and the English-language Puerto Rican
  press, and both routes are shut. The legacy API
  (`chroniclingamerica.loc.gov/search/pages/results/?format=json`) returns
  **404**, and the current endpoint
  (`www.loc.gov/collections/chronicling-america/?fo=json`) returns **403 with a
  Cloudflare "Just a moment" interstitial** even with full browser headers. A
  real loss: it takes with it the only large body of openly reusable
  Black-published periodical text.
- **Zenodo** — `zenodo.org/api/records` returns **403, "Access to this resource
  has been restricted due to unusual traffic from your network."** This closes
  the obvious route to Leiden's deposited Caribbean archaeology.
- **Taylor & Francis** (`tandfonline.com`, tested on a *Slavery & Abolition*
  article) — **403**. **Oxford University Press** (`academic.oup.com`, tested on
  *History Workshop Journal*) — **403**. Two journals that would both have helped;
  neither is reachable, so neither licence nor content could be confirmed.
- **LibreTexts MindTouch API** (`/@api/deki/pages/<id>/contents`, `/tree`) —
  **403**. Not a rejection of LibreTexts, which works fine as page HTML, but
  worth recording so the next pass does not waste a call on it.
- **eScholarship** — still 202 with an empty body, as September found. It is
  where Schneewind's book and the Cliodynamics critique of Graeber and Wengrow
  both live, and the LibreTexts mirror is the workaround for the first but not
  the second.
- **Li Ung Bing, *Outlines of Chinese History*** (1914) — wanted as a
  Chinese-authored narrative of the dynasties; **not on Project Gutenberg**
  (no records). Internet Archive scans exist but were not assessed, and the
  author's death date is unknown, which makes the non-US copyright position
  unresolvable. Not pursued.
- **Mary Ann Shadd Cary, *A Plea for Emigration; or, Notes of Canada West***
  (1852) — a Black woman's own account of Canada West, and the perfect Canadian
  bridge for this app's existing Canadian spine. Rejected on OCR, not licence.
  The only scriptable copy is the CIHM microfiche (`cihm_47542`, 102 KB,
  16,920 words) and it is **unquotable**: the sample reads `-the so- POR io ie DR
  Git Hp ind Yella ie ha / disinter- hie ' p : = og. ; re - PO gt`. The modern
  scans (`pleaforemigratio0000cary_x3m9`) are lending-restricted and expose no
  `_djvu.txt`. Worth revisiting if a clean transcription ever appears on
  Wikisource.
- **Memoirs of the Life of Boston King** — the Black Loyalist narrative with a
  Nova Scotia and Sierra Leone arc. Not on the Internet Archive under that title
  and not on Gutenberg; it survives inside the *Methodist Magazine* of 1798, which
  no openly fetchable transcription covers.

**Not rejected, but not verified in this pass.**

- **OpenLearn** (The Open University, CC BY-NC-SA 4.0) — SOURCES.md lists it as
  planned, and the first finding of this pass is that **it is not blocked**: the
  403 it returns to a bare User-Agent becomes a correct 200 or 404 once a full
  browser header set is sent. But no unit was located, so neither its licence
  statement nor its prose was read. The next step is to walk
  `https://www.open.edu/openlearn/free-courses/full-catalogue` (HTTP 200,
  22 KB) with those headers and pick the history units.
- **Antiquity** (candidate 20) is CC BY for 137 of its 300 most recent works and
  fetches cleanly through `core-reader`, but a topic search found no Caribbean
  article worth building on. Keep it on the list for the archaeology layer
  generally rather than for the Caribbean.

---

## Normalisation work these sources would require

Four small additions to `build/verify.mjs`'s existing normalisations, each
traceable to a specific source verified above. Recorded here so the cost is
visible before anything is imported.

The **long s read as "f"** is already handled for the 1703 Lahontan text and
applies unchanged to Cugoano 1787. **Double spacing between words** is new, and
is needed for Manzano 1840 and Bevan 1902 — a plain whitespace collapse. The
**`¬` glyph as a line-end hyphen** is new, and is needed for the Warner 1831
narrative; the existing line-end hyphen rule needs to accept it alongside `-`.
And **Wikisource's rendered HTML carries inline style spans** inside
paragraphs — the EB1911 *Ptolemies* article wraps its Greek in
`.mw-parser-output .wst-lang-grc{...}` — so tags must be stripped before the
verbatim comparison, which the existing extractors already do for CNXML and
Pressbooks but not yet for MediaWiki output.
