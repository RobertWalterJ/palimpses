// Palimpsest — read a passage aloud, one sentence at a time.
//
// Built to the dyslexia audit's spec:
//   - one sentence per utterance: the current sentence is highlighted, and
//     Chrome's habit of dropping speech after ~15 s never gets its chance;
//   - the current word is underlined where the voice reports word boundaries,
//     and quietly isn't where it doesn't (sentence highlighting still works);
//   - play/pause, back and forward a sentence, stop; tapping any sentence
//     reads from there. Nothing ever starts by itself.

import { speakOne, stop as stopSpeech, unlock } from './speech.js';

// Split into sentences without breaking "ca. 1500", "St. Lawrence", "U.S."
const ABBR = /\b(ca|c|St|Mt|Dr|Mr|Mrs|Ms|Jr|Sr|vs|etc|e\.g|i\.e|U\.S|No|Fig|approx|al)\.$/i;
export function sentences(text) {
  const out = [];
  let cur = '';
  for (const part of text.split(/(?<=[.!?][”"’)]?)\s+/)) {
    cur = cur ? cur + ' ' + part : part;
    if (!ABBR.test(cur.trim()) && !/\b[A-Z]\.$/.test(cur.trim())) { out.push(cur); cur = ''; }
  }
  if (cur) out.push(cur);
  return out;
}

// Wrap a paragraph's sentences in spans so they can be highlighted and tapped.
export function sentenceMarkup(text, esc) {
  return sentences(text).map((s, i) => `<span class="sn" data-s="${i}">${esc(s)}</span>`).join(' ');
}

let active = null;

export class Reader {
  // host: the element holding .sn spans (in document order). ui: callbacks.
  constructor(host, { onChange } = {}) {
    this.host = host;
    this.spans = [...host.querySelectorAll('.sn')];
    for (const sp of this.spans) sp.dataset.html = sp.innerHTML;   // keeps glossary marks
    this.engaged = false;
    this.i = 0;
    this.playing = false;
    this.onChange = onChange;
    host.addEventListener('click', (e) => {
      const sn = e.target.closest('.sn');
      // A tap jumps only once you are reading (playing or paused). Otherwise a
      // tap meant for a glossary word or a scroll would start a voice — and in
      // this app nothing speaks unless you asked it to.
      if (!sn || !this.engaged || e.target.closest('.term')) return;
      if (window.getSelection()?.toString()) return;     // selecting text, not reading
      this.play(this.spans.indexOf(sn));
    });
  }
  _mark() {
    this.spans.forEach((s, k) => s.classList.toggle('now', this.playing && k === this.i));
    this._clearWord();
    this.onChange?.(this);
  }
  _clearWord() {
    for (const sp of this.spans) if (sp.dataset.plain) { sp.innerHTML = sp.dataset.html; delete sp.dataset.plain; }
  }
  _word(start, len) {
    this._clearWord();
    const span = this.spans[this.i];
    if (!span || !len) return;
    const text = span.textContent;
    const end = start + len;
    if (end > text.length) return;
    span.dataset.plain = '1';
    span.innerHTML = '';
    span.append(text.slice(0, start));
    const w = document.createElement('span');
    w.className = 'word';
    w.textContent = text.slice(start, end);
    span.append(w, text.slice(end));
  }
  play(from = this.i) {
    if (active && active !== this) active.stop();
    active = this;
    unlock();
    this.i = Math.max(0, Math.min(from, this.spans.length - 1));
    this.playing = true;
    this.engaged = true;
    this._speak();
  }
  _speak() {
    const my = ++this.token || (this.token = 1);
    const span = this.spans[this.i];
    if (!span) { this.stop(); return; }
    this._restore(span);
    this._mark();
    this._follow(span);
    stopSpeech();
    speakOne(span.textContent, {
      onWord: (c, l) => { if (this.token === my) this._word(c, l); },
      onEnd: () => {
        if (this.token !== my || !this.playing) return;
        if (this.i < this.spans.length - 1) { this.i++; this._speak(); } else this.stop();
      },
    });
  }
  _restore() { this._clearWord(); }
  _follow(span) {
    const r = span.getBoundingClientRect();
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (r.top < 80 || r.bottom > window.innerHeight - 140) {
      span.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  pause() { this.playing = false; this.token = (this.token || 0) + 1; stopSpeech(); this._mark(); }
  toggle() { this.playing ? this.pause() : this.play(this.i); }
  next() { if (this.i < this.spans.length - 1) { this.i++; this.playing ? this._speak() : this._mark(); } }
  prev() { if (this.i > 0) { this.i--; this.playing ? this._speak() : this._mark(); } }
  stop() { this.playing = false; this.engaged = false; this.token = (this.token || 0) + 1; stopSpeech(); this._mark(); if (active === this) active = null; }
}

export function stopAllReading() { if (active) active.stop(); }
