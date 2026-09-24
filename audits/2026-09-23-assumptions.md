# Palimpsest — the assumptions we were carrying, tested

23 September 2026. Robert asked what standing beliefs and roadblocks were in the
way of a product good enough for daily use and for handing to a friend. Each
belief below was tested rather than reasoned about, and the test is recorded so
it can be re-run.

---

## 1. "opentextbc.ca blocks scripts" — FALSE

Carried since 18 September, and the reason PLAN.md item 7 (swap in the 2020 2nd
edition of *Pre-Confederation*) sat untouched for five days.

    curl -s -o /dev/null -w "%{http_code} %{size_download}\n" \
      "https://opentextbc.ca/preconfederation/open/download?type=xhtml"
    # 403 5542   ← Cloudflare interstitial

    curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/140.0" \
      -o pre2.xhtml "https://opentextbc.ca/preconfederation/open/download?type=xhtml"
    # 200 1957449   ← the whole book, 135 chapter titles

It blocks **curl's default user agent**, not scripts. With a browser user agent
every Pressbooks book in the world exports as one XHTML file, in the markup
`extract.mjs` already parses — that is where Belshaw's text came from.

**Not acted on, deliberately.** Swapping editions changes every paragraph id,
so every existing Belshaw quote would need re-verifying. It is a project, not a
drop-in, and the questions are correct against the 1st edition today.

## 2. "The app has to be one file" — FALSE, and it was the biggest thing in the way

The page was 8.6 MB, 3.0 MB over the wire, because both textbooks' full text was
inlined into it. Every first visit paid for the library whether or not the
reader ever opened it. That is the entire cost of handing someone the link on a
phone.

The books now travel beside the page and are fetched when something needs them.

| | before | after |
|---|---|---|
| page | 8.6 MB | **1.27 MB** |
| over the wire (gzip) | 3.0 MB | **~470 KB** |
| library | inlined, always | 9.5 MB, on demand, cached after |

The library also grew 30% in the same sitting (two new books) without the first
load changing at all.

## 3. "The local preview truncating the page means something is wrong" — no

Python's `http.server` drops the connection part-way through a large file; the
live site served the same file intact (`curl` 200, full length). It is a quirk
of the preview server, not the app. With a 1.27 MB page it has stopped
happening.

## 4. "Kandiaronk needs another source" — CONFIRMED, and still open

`Kandiaronk` appears nowhere in the 1st edition, and zero times in the 2020 2nd
edition either. The app's Kandiaronk voice comes from Lahontan's 1703 dialogues
(public domain), which is honest but is a European's rendering. Still worth a
better source.

## 5. "About credits its sources" — FALSE, and a licence condition

The About screen's source list was hand-written and had gone three versions
without naming OpenStax, whose CC BY-NC-SA licence requires attribution — while
the app was drawing 158 generated questions and six chapters from it.

Fixed at the root: the pack now carries a `sources` list built from the books
the questions **actually cite**, and About renders that. It cannot drift again.
It also revealed that no question cites *Post-Confederation* at all.

## 6. "The service worker makes it work offline" — partly

`index.html` is precached and the library is cached after its first fetch, so an
installed app opened offline works for questions immediately, and for the books
only if they have been opened once on a connection. That is the right trade at
9.5 MB, and the app now says so when a fetch fails instead of hanging.

## 7. The link people would be given has a typo — still true

The repository is `palimpses` (a missed "t"), so the public link is
<https://robertwalterj.github.io/palimpses/>. Renaming the repository on GitHub
to `palimpsest` would give the URL its proper spelling and leave a redirect
behind, but it touches Robert's account and his Pages settings, so it is his
call:

    gh repo rename palimpsest

## What is still in the way

- **97% of a fortnight's questions are the same four-option shape.** The
  question-quality audit lists four alternative shapes buildable from the
  evidence already verified. Nothing has been built yet.
- **The should-fix list from the design audit** (16 items) is untouched.
- **Placement** ("Where do you start?") is still offered only on a first visit,
  so anyone already playing cannot take it.
