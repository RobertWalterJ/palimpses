# Work plan

## Now
1. Playable app: scheduler, choice + order questions, source card, read-aloud, no timers. ← in progress
2. On Robert's phone (single-file Artifact) and as a local build.

## Next content
3. Canada chapters 3–5 (Atlantic world, New France, contact) — from the Wendat and Mi’kmaq side.
4. Swap in the 2020 2nd edition of Pre-Confederation (via browser pane; opentextbc.ca blocks scripts).
5. Cross-cutting "economy" thread from OpenStax *Introduction to Anthropology* (barter, credit, debt, the state).
6. Find open-access sources for Kandiaronk and for Amazonian earthworks (CC-licensed articles count).

## Audits
Done (Sept 18, 2026), findings integrated:
- Design & UX (agent) → ultraviolet palette, undertext hero, epicentre strip, sibling type family, round-end "what slipped", back button, 44px targets
- Dyslexia (agent) → upright quotes, reading settings, sentence-by-sentence read-aloud with highlighting, glossary on tap, prompt split, option-length check in verify
- Colour & colour-blindness (build-failing, `build/audit-colour.mjs`, 96 checks)
- Sound (build/sound-lab.html) → materials not instruments; wrong ≤ right in level

Still to run (same set as Landfall, each by a separate agent where useful):
- Playability
- Learning & improvement over time (scheduler measured with a seeded simulation)
- Interest & variety (question kinds, repetition across rounds in one day)
- Data sources & licensing (every question cited; per-source licence recorded)
- User journey (first run → daily habit → finishing a chapter)
- Historiography: does each pack keep its own centre? (the brief)
Then an integration pass that prioritises the findings.
