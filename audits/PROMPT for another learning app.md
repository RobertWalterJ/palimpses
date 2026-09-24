# A prompt to give another app's chat

Written 24 September 2026, for Hinterland's learning module — the same
programme of audits that Palimpsest has been through, in a form that can be
pasted into that chat. The point of every item is that it is **measured**, not
judged: each one has a number that can be recomputed after the fix.

---

I want to put Hinterland's question and learning module through the same
programme of audits and fixes another of my apps has just been through. Please
work through this in order, and **measure everything before and after** — write
the scripts as real files in the repo so I can re-run them, not one-off checks
in the chat. Run agents in parallel where the work is independent.

**Before you start:** read the project's own docs and tell me, in one page, what
you believe the learning module is trying to do and what it currently does.
Then say which of the checks below already exist, so you don't build them twice.

### 1. Accuracy — does every question claim only what its source says?

Write a script that reads each question against whatever it cites and flags:
every **date**, **name**, **quantity** and **wrong option** that the cited source
does not account for. Numbers that come from a computation rather than a source
need a stated tolerance and a check that the computation still produces them.
Report clean, or list what you fixed. (In my case this found three real errors
hiding behind 77 false positives — spend the effort on making the checker quiet
enough to be worth running.)

### 2. Repetition — the difference between spacing and sameness

Two separate problems, measured separately.

**a. The scheduler.** Simulate a fortnight of real play against the *actual*
scheduling code — not a model of it — two sittings a day, and report:
- how many **distinct** questions the player saw;
- how many were seen five times or more;
- how many arrived **the day after** the last time they were asked.
Mine was: 66 distinct, 17 seen five-plus times, 115 of 266 asks on consecutive
days. The fixes were a minimum two-day gap, three days when something is right
first time, a back-off for repeated misses instead of "tomorrow" every time, and
a floor under how many new items a round may introduce when reviews are waiting.
Afterwards: 110 distinct, none next-day. Then re-run the learning simulation to
prove the wider spacing did not cost retention — mine went *up*.

**b. The pack itself.** Find questions that test the same thing: the same source
sentence, the same answer within one topic, a generated question duplicating a
written one. Print clusters and say which to keep. Mine had 60 clusters; six
survive and those are the detector's own false positives.

### 3. Question shapes — what is the player actually being asked to do?

Count the pool by the **task**, not by the data structure. Two questions can
both be "multiple choice" and be completely different things to do. If nearly
everything is one shape, add two or three more that can be **generated from
material already verified**, so they cost content work rather than authoring:
ordering three things, identifying who said or produced something, filling a
gap in a real sentence, true-against-a-common-myth.

Then check **where they sit in the introduction order**. Mine were appended to
the end of the pack, which means they would never have been reached at all.
Interleave them, round-robin by type, so no two sittings set the same task.

### 4. Guessability

How many questions can be answered without knowing anything? Count:
- the answer being conspicuously longer than every wrong option;
- the only answer that hedges, or the only one that negates;
- the answer echoing a word in the question;
- wrong options that are variants of the right one.
Make the worst of these a build failure rather than a note.

### 5. Design and UX, on a phone, measured

Have an agent play the app at 375×812 in a real browser and report with
**numbers**: pixel heights of each screen, characters per line in the text that
matters most, how far down the screen the second-most-likely action sits, tap
target sizes, contrast, and what happens at the largest text setting. Mine found
that the answer options ignored the reader's own text size while the question
obeyed it — the one place where small text costs a mark. Also check every back
button actually returns to where you were.

### 6. Load weight — the thing that decides whether you can share it

Measure what a first visit downloads, gzipped, and how much of it the player
needs before the first interaction. Mine was 3.0 MB because the reference
material was inlined into the page; moving it out and fetching it on demand took
the first load to 470 KB and made the app shareable. Do this before adding
anything else heavy.

### 7. Coverage

Tabulate the questions by topic, era, region and subject, and name the holes
out loud. Mine: an entire people absent from the app, and nine questions out of
five hundred with a woman as their subject. This is the audit that tells you
what to build next.

### 8. Standing rules to check the app against

- no timers or countdowns anywhere;
- read-aloud available for anything text-heavy, including the app's **own**
  prose, not only its quoted material;
- a "quiet mode" switch for public places that turns off sound *and* stops
  offering read-aloud, and does not leave the layout with a hole where the
  buttons were;
- anything with a licence is credited where the licence requires, and that
  credit is generated from what the app actually uses so it cannot drift.

### How I want it reported

For each audit: what you measured, the number before, what you changed, the
number after. Where a fix would cost more than it is worth, say so and leave it.
Where something I have believed for a while turns out to be false, tell me
plainly — the most useful hour of this whole programme was spent disproving
three assumptions I had been building around for a week.
