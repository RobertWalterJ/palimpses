// Palimpsest — what to ask, and when.
//
// Ported from Landfall's scheduler, keeping the rules that were measured there
// rather than re-deriving them:
//   - SM-2-lite intervals, ease 1.35–3.0, capped at 270 days;
//   - ONE repeat inside the round, then tomorrow (Karpicke & Roediger 2008;
//     Cepeda et al. 2006 — retrieval spread across sessions is what lasts);
//   - ease can recover toward its start after three clean reviews, but never
//     climbs past it (the "pawl");
//   - practice never moves the schedule;
//   - days are the player's local calendar days, not UTC's.
// What is dropped is everything about places and facets. A card here is one
// question.

const KEY = 'palimpsest.v1';

export const MAX_INTERVAL = 270;
export const EASE_START = 2.2;
export const EASE_MIN = 1.35;
export const EASE_MAX = 3.0;
export const KNOWN_AT = 21;          // days — "known" means you will still have it in three weeks
export const SECURE_AT = 90;
export const DAY = 864e5;
const LEARN_STEP = 4;                // questions later, inside the round
const NEW_PER_ROUND = 5;
const ROUND = 12;                    // slots, counting the in-round repeats
const MAX_REPEATS = 4;                // in-round second looks, per round
const LOAD_CEILING = 25;             // due reviews at which nothing new is introduced

let clock = () => Date.now();
export const now = () => clock();
export function __setClock(fn) { clock = fn; }   // tests

export const dayKey = (t = now()) => {
  const d = new Date(t);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const newCard = () => ({ iv: 0, e: EASE_START, reps: 0, lapses: 0, due: 0, last: 0, st: 'new', step: 0, ok: false, run: 0, lapseRep: -9 });

export function cardState(c) {
  if (!c || c.st === 'new') return 'unseen';
  if (c.iv >= SECURE_AT) return 'secure';
  if (c.iv >= KNOWN_AT && c.ok) return 'known';
  return 'met';
}

function blank() {
  return {
    v: 1, cards: {}, days: {},
    settings: { sound: true, readAloud: 'manual', rate: 0.97, theme: 'system' },
  };
}

// Storage can be absent (private windows, blocked site data). The app must
// still work; it just forgets.
export const State = {
  data: blank(),
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.v === 1) this.data = { ...blank(), ...d, settings: { ...blank().settings, ...d.settings } };
      }
    } catch { /* keep the blank state */ }
  },
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch { /* nothing to do */ } },
  card(id) { return this.data.cards[id] || null; },

  answer(id, right, { practice = false } = {}) {
    const c = this.data.cards[id] || newCard();
    c.last = now();
    c.ok = right;
    c.run = right ? c.run + 1 : 0;
    const d = this.data.days[dayKey()] || (this.data.days[dayKey()] = { n: 0, right: 0 });
    d.n++; if (right) d.right++;
    if (practice) { this.data.cards[id] = c; this.save(); return c; }

    if (right) {
      c.reps++;
      if (c.st === 'new' || c.st === 'learning') {
        c.st = 'learning';
        c.step++;
        if (c.step > 1) { c.st = 'review'; c.iv = 1; c.due = now() + DAY; c.step = 0; }
        else c.due = now();                         // the round asks it once more
      } else if (c.st === 'relearning') {
        c.iv = Math.max(1, Math.round((c.ivBefore || c.iv || 1) * 0.35));
        c.st = 'review';
        c.due = now() + c.iv * DAY;
      } else {
        c.iv = Math.min(MAX_INTERVAL, Math.max(1, Math.round(c.iv * c.e)));
        c.due = now() + c.iv * DAY;
        if (c.reps - c.lapseRep >= 3 && c.e < EASE_START) c.e = Math.min(EASE_START, c.e + 0.05);
      }
    } else {
      if (c.st === 'review' || c.st === 'relearning') {
        if (c.st === 'review') { c.ivBefore = c.iv; c.lapses++; c.lapseRep = c.reps; }
        c.st = 'relearning';
        c.e = clamp(c.e - 0.25, EASE_MIN, EASE_MAX);
      } else {
        c.st = 'learning';
        c.step = 0;
      }
      c.due = now();
    }
    this.data.cards[id] = c;
    this.save();
    return c;
  },

  dueIds(ids) {
    const t = now();
    return ids.filter((id) => { const c = this.card(id); return c && c.st !== 'new' && c.due <= t; })
      .sort((a, b) => this.card(a).due - this.card(b).due);
  },
  nextDue(ids) {
    let soonest = Infinity;
    for (const id of ids) { const c = this.card(id); if (c && c.st !== 'new' && c.due > now() && c.due < soonest) soonest = c.due; }
    return Number.isFinite(soonest) ? soonest : null;
  },
  runOfDays() {
    let run = 0;
    for (let i = 0; i < 400; i++) { if (this.data.days[dayKey(now() - i * DAY)]) run++; else if (i > 0) break; }
    return run;
  },
};

// A round: what is due, oldest first; then new questions in the order the
// story is told — the pack is authored as a narrative, so "new" follows it
// rather than being shuffled; nothing new at all once reviews pile up.
export class Round {
  constructor(ids, { practice = false } = {}) {
    this.practice = practice;
    this.queue = [];
    this.asked = 0;
    if (practice) {
      const seen = ids.filter((id) => State.card(id));
      this.queue = shuffle(seen).slice(0, ROUND);
      return;
    }
    const due = State.dueIds(ids);
    // Slots, not questions. A card still learning (new, or missed last time)
    // is asked and then asked once more inside the round, so it costs two;
    // reviews leave two slots spare for the repeats their misses earn.
    // Counting every card as one let a round run to seventeen.
    const cost = (id) => { const c = State.card(id); return !c || c.st === 'learning' || c.st === 'relearning' ? 2 : 1; };
    let used = 0;
    for (const id of due) {
      if (used + cost(id) > ROUND - 2) break;
      this.queue.push(id); used += cost(id);
    }
    if (due.length < LOAD_CEILING) {
      const room = Math.floor((ROUND - used) / 2);
      const fresh = ids.filter((id) => !State.card(id)).slice(0, Math.min(NEW_PER_ROUND, room));
      this.queue.push(...fresh);
    }
  }
  get empty() { return this.queue.length === 0; }
  next() { this.asked++; return this.queue.shift() || null; }
  // After an answer: a card still in its learning step (or just missed) comes
  // back a few questions later, once.
  //
  // ONCE. A missed card used to come back until it was right twice running,
  // which turned a five-new-question round into fifteen questions — the
  // simulation caught it. Landfall measured why once is enough: the second
  // retrieval inside a session adds little; tomorrow's adds a lot. A card still
  // learning at the end of the round is simply due tomorrow.
  after(id, card) {
    if (this.practice) return;
    this.seen = this.seen || new Map();
    const times = (this.seen.get(id) || 0) + 1;
    this.seen.set(id, times);
    // And at most MAX_REPEATS a round: on a bad day every miss earns a repeat,
    // and a round that GROWS the worse you're doing is the discouraging kind.
    // A miss past the cap is simply due tomorrow.
    this.repeats = this.repeats || 0;
    if (times < 2 && this.repeats < MAX_REPEATS && (card.st === 'learning' || card.st === 'relearning') && !this.queue.includes(id)) {
      this.repeats++;
      // Two to four questions later, varied: a fixed gap replayed the first
      // five questions in exactly the same order, which is recitation.
      const gap = 2 + Math.floor(Math.random() * (LEARN_STEP - 1));
      this.queue.splice(Math.min(gap, this.queue.length), 0, id);
    }
  }
}

export function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

// "The next one comes round Friday" — said on a Friday about a card due that
// afternoon was Landfall's bug. Name the day by the calendar.
export function nextDueSentence(when, nowT = now()) {
  const due = new Date(when), today = new Date(nowT);
  const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((midnight(due) - midnight(today)) / DAY);
  const mins = Math.round((when - nowT) / 60e3);
  const hr = due.getHours(), mn = due.getMinutes();
  const clockText = `${hr % 12 || 12}${mn ? ':' + String(mn).padStart(2, '0') : ''} ${hr < 12 ? 'am' : 'pm'}`;
  if (days <= 0) {
    const at = mins < 60 ? `in about ${Math.max(1, mins)} minute${mins === 1 ? '' : 's'}` : `later today, around ${clockText}`;
    return `Nothing else is due right now. The next question comes round ${at}.`;
  }
  const at = days === 1 ? 'tomorrow'
    : days < 7 ? due.toLocaleDateString('en-CA', { weekday: 'long' })
      : 'on ' + due.toLocaleDateString('en-CA', { day: 'numeric', month: 'long' });
  return `Nothing else is due today. The next question comes round ${at}.`;
}
