# Sources, and what their licences require

Palimpsest builds every question from openly licensed text and cites the
paragraph it came from. `build/verify.mjs` refuses any question whose quoted
evidence is not found verbatim in its source, or whose answer the quote does
not support.

## In use

**John Douglas Belshaw, *Canadian History: Pre-Confederation* (BCcampus, 2015)
and *Canadian History: Post-Confederation* (BCcampus, 2016).**
Licensed CC BY 4.0. <https://opentextbc.ca/preconfederation/> ·
<https://opentextbc.ca/postconfederation/>. Copies retrieved 2026-09-18 from the
eCampusOntario Open Library repository (handles 123456789/235 and /234).
Text only: the books' figures carry their own, varied licences (some
NoDerivatives) and are not used.

## Planned

OpenStax *World History* vols 1–2 and *Introduction to Anthropology* — CC BY-NC-SA 4.0.
OpenLearn (The Open University) — CC BY-NC-SA 4.0.
SlaveVoyages — CC BY-NC.

## This project's own content

Because the planned sources are share-alike and non-commercial, the questions
and explanations in `content/` are offered under **CC BY-NC-SA 4.0**. This app
is not sold.

## Voices (home screen)

Primary sources, public domain, OCR text from the Internet Archive in `sources/voices/`.
Each line is checked verbatim by `build/verify.mjs` (normalising only line-end
hyphens, bracketed original page numbers, OCR spacing before punctuation, and
— for the 1703 Lahontan text — the long s read as "f").

- Chrestien Le Clercq, *New Relation of Gaspesia* (1691), tr. and ed. William F. Ganong (Champlain Society, 1910) — https://archive.org/details/newrelationofgas0005lecl
- Baron de Lahontan, *New Voyages to North-America*, vol. 2 (English ed. 1703), ed. R. G. Thwaites (McClurg, 1905) — https://archive.org/details/agd5973.0002.001.umich.edu
- George Copway (Kahgegagahbowh), *The Traditional History and Characteristic Sketches of the Ojibway Nation* (Boston, 1851) — https://archive.org/details/traditionalhisto00copw
- Peter Jones (Kahkewaquonaby), *History of the Ojebway Indians* (London, 1861) — https://archive.org/details/historyofojebway00jonerich
- Two witnesses quoted within Belshaw (Las Casas, Díaz), cited to the paragraph.

## OpenStax World History, Volume 2: from 1400 (world layer, in progress)

Ann Kordas, Ryan J. Lynch, Brooke Nelson, Julie Tatlock et al., OpenStax, 2023.
CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/). Source:
CNXML from https://github.com/openstax/osbooks-world-history (collection
world-history-volume-2, 80 modules, retrieved 19 September 2026), in
`sources/openstax-wh2/`; extracted to `corpus/wh2.json` (15 chapters, 75
sections, 2,455 paragraphs). Links go to openstax.org's pages.

## Primary sources for the thread "Trade, empire and abolition" (public domain)

- Mary Prince, *The History of Mary Prince, a West Indian Slave. Related by Herself*, ed. Thomas Pringle (London, 1831). Project Gutenberg #17851, via the Internet Archive (thehistoryofmary17851gut); `corpus/prince1831.json`.
- Anders Ljungstedt, *An Historical Sketch of the Portuguese Settlements in China* (Boston, 1836). Internet Archive anhistoricalske00unkngoog (OCR); `corpus/ljungstedt1836.json`. Its 1557 date for Macau differs from OpenStax's 1577; the app asks about the disagreement rather than choosing.
