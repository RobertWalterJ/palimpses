// Palimpsest — does the palette still carry its information without colour?
//
//   node build/audit-colour.mjs            report, and fail on any loss
//   node build/audit-colour.mjs --full     every check, including the passes
//
// The rule and the engine live in build/lib/audit-template.mjs, shared with
// Landfall, Halyard, Wordhoard and Commonplace. This file only says which
// tokens mean what, and where.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runAudit } from './lib/audit-template.mjs';

const SPEC = {
  files: ['app/styles.css'],
  // Three surfaces: light, dark by phone setting, and dark chosen in Settings.
  // The two dark blocks should be identical; auditing both catches the day
  // someone edits one and not the other.
  surfaces: [['light', ':root'], ['dark (phone)', ':root:not([data-theme="light"])'], ['dark (chosen)', ':root[data-theme="dark"]']],
  pairs: [
    // Right and wrong: the ✓ and ✗ carry the meaning, colour reinforces it…
    { a: '--good', b: '--bad', channel: 'shape', where: 'a graded option and the verdict line' },
    { a: '--good-bg', b: '--bad-bg', channel: 'tint', where: 'the wash behind a graded option' },
    // …and those glyphs must themselves be visible on their washes.
    { a: '--good', b: '--good-bg', channel: 'lightness', where: 'the ✓ on the right-answer wash' },
    { a: '--bad', b: '--bad-bg', channel: 'lightness', where: 'the ✗ on the wrong-answer wash' },
    // The progress bar: known, met and not-yet-met are told apart by lightness.
    { a: '--ink', b: '--met', channel: 'lightness', where: 'progress bar: known against met' },
    { a: '--met', b: '--surface-2', channel: 'lightness', where: 'progress bar: met against not yet met' },
    { a: '--ink-2', b: '--surface-2', channel: 'lightness', where: 'round pips: answered against to come' },
    { a: '--accent', b: '--ink-2', channel: 'tint', where: 'round pips: the current one (position also says it)' },
  ],
  text: [
    { fg: '--ink', bg: '--ground', where: 'titles on the page' },
    { fg: '--ink', bg: '--surface', where: 'questions, answers, options' },
    { fg: '--ink-2', bg: '--surface', where: 'supporting lines, the paragraph' },
    { fg: '--ink-2', bg: '--ground', where: 'the tagline' },
    { fg: '--ink-3', bg: '--surface', where: 'citations, labels' },
    { fg: '--ink', bg: '--quote-bg', where: 'the quotation from the book' },
    { fg: '--ink-2', bg: '--surface-2', where: 'thread chips' },
    { fg: '--ink', bg: '--surface-2', where: 'secondary buttons' },
    { fg: '--on-accent', bg: '--accent', where: 'the main button' },
    { fg: '--accent', bg: '--surface', where: 'links and quiet buttons on a card' },
    { fg: '--accent', bg: '--ground', where: 'quiet buttons on the page' },
    { fg: '--ink', bg: '--good-bg', where: 'option text on the right-answer wash' },
    { fg: '--ink', bg: '--bad-bg', where: 'option text on the wrong-answer wash' },
    { fg: '--good', bg: '--surface', where: 'the “✓ Right.” verdict' },
    { fg: '--bad', bg: '--surface', where: 'the “✗ Not quite.” verdict' },
    { fg: '--good', bg: '--ground', where: 'the verdict line on the page' },
    { fg: '--bad', bg: '--ground', where: 'the verdict line on the page' },
  ],
};

runAudit(SPEC, join(dirname(fileURLToPath(import.meta.url)), '..'));
