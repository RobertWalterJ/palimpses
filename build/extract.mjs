// Palimpsest — turn the open textbooks into a citable corpus.
//
//   node build/extract.mjs
//
// Every question this app asks will point at the paragraph it came from, so the
// first job is to give every paragraph of every source a stable id, its place
// in the book (chapter › section › heading) and a link to the same passage on
// the publisher's site. Nothing is summarised or rewritten here: the text is
// kept exactly as published, because the checker that later verifies each
// question does so by finding its evidence VERBATIM in this text.
//
// Output: corpus/<source>.json and a coverage report on stdout.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(join(ROOT, 'corpus'), { recursive: true });

const SOURCES = [
  {
    id: 'pre', file: 'sources/belshaw/pre-confederation.html',
    title: 'Canadian History: Pre-Confederation', author: 'John Douglas Belshaw',
    publisher: 'BCcampus', year: 2015, licence: 'CC BY 4.0',
    web: 'https://opentextbc.ca/preconfederation/chapter/',
    got: 'https://openlibrary-repo.ecampusontario.ca/jspui/handle/123456789/235',
  },
  {
    id: 'post', file: 'sources/belshaw/post-confederation.html',
    title: 'Canadian History: Post-Confederation', author: 'John Douglas Belshaw',
    publisher: 'BCcampus', year: 2016, licence: 'CC BY 4.0',
    web: 'https://opentextbc.ca/postconfederation/chapter/',
    got: 'https://openlibrary-repo.ecampusontario.ca/jspui/handle/123456789/234',
  },
];

// Headings whose content is apparatus, not history: image credits, alt-text
// long descriptions, reading lists.
const SKIP = /^(attributions?|long descriptions?|suggested readings?|media attributions|references)$/i;

const clean = (s) => s.replace(/\s+/g, ' ').replace(/ /g, ' ').trim();

for (const src of SOURCES) {
  const $ = cheerio.load(readFileSync(join(ROOT, src.file), 'utf8'));
  const chapters = [];
  let chapter = null;

  $('div.part, div.chapter').each((_, el) => {
    const $el = $(el);
    if ($el.hasClass('part')) {
      const title = clean($el.find('.part-title, h1').first().text());
      const m = title.match(/^Chapter\s+(\d+)\.?\s*(.*)$/i);
      chapter = { n: m ? +m[1] : null, title: m ? m[2] : title, sections: [] };
      chapters.push(chapter);
      return;
    }
    if (!chapter) return;                      // front matter before chapter 1
    const slug = ($el.attr('id') || '').replace(/^slug-/, '');
    const head = clean($el.find('.chapter-title').first().text());
    const num = (head.match(/^(\d+\.\d+)/) || [])[1] || null;
    const section = { id: `${src.id}-${num || slug}`, num, title: head.replace(/^\d+\.\d+\s*/, ''),
      url: src.web + slug + '/', paras: [] };
    // Some sections were written by other historians (Post-Confederation is
    // multi-authored). CC BY requires crediting them, so keep the name.
    const byline = clean($el.find('.chapter-author').first().text());
    if (byline) section.author = byline.split(',')[0].trim();

    let heading = null, skipping = false, k = 0;
    $el.find('h2, h3, p, li').each((__, node) => {
      const tag = node.tagName.toLowerCase();
      const $n = $(node);
      if ($n.hasClass('chapter-title')) return;
      if (tag === 'h2' || tag === 'h3') {
        heading = clean($n.text());
        // Pressbooks puts a bare page number in an h2 at the top of each
        // section; it is not a heading anyone wrote.
        if (/^\d+$/.test(heading)) heading = null;
        skipping = heading ? SKIP.test(heading) : false;
        return;
      }
      if (skipping) return;
      // Figure captions and image credits are not narrative.
      if ($n.closest('figure, .wp-caption, figcaption, .media-attributions').length) return;
      // A list item inside a paragraph would be counted twice.
      if (tag === 'p' && $n.closest('li').length) return;
      // Footnotes are inline <span class="footnote"> in Pressbooks, so they ran
      // straight into the prose ("…ethnohistory.”Bruce Trigger, The Children…")
      // — hard for anyone to read and worse for a dyslexic reader. They are
      // lifted out and kept beside the paragraph, where a citation belongs.
      const $c = $n.clone();
      const notes = $c.find('.footnote').map((_, f) => clean($(f).text())).get();
      $c.find('.footnote').remove();
      const text = clean($c.text());
      if (text.length < 25) return;
      section.paras.push({
        id: `${section.id}-p${++k}`,
        under: heading,
        key: /^key points?$/i.test(heading || ''),   // the author's own summary
        text,
        ...(notes.length ? { notes } : {}),
      });
    });
    if (section.paras.length) chapter.sections.push(section);
  });

  const out = { source: { ...src, file: undefined }, chapters };
  writeFileSync(join(ROOT, 'corpus', src.id + '.json'), JSON.stringify(out, null, 1));

  const paras = chapters.flatMap((c) => c.sections.flatMap((s) => s.paras));
  const words = paras.reduce((t, p) => t + p.text.split(' ').length, 0);
  console.log(`\n${src.title}: ${chapters.length} chapters, `
    + `${chapters.reduce((t, c) => t + c.sections.length, 0)} sections, ${paras.length} paragraphs, `
    + `${words.toLocaleString()} words, ${paras.filter((p) => p.key).length} key points`);
  for (const c of chapters) {
    console.log(`  ${String(c.n).padStart(2)}. ${c.title}  (${c.sections.length} sections, `
      + `${c.sections.reduce((t, s) => t + s.paras.length, 0)} paragraphs)`);
  }
}

// ── open-access articles (JATS XML, from Europe PMC) ─────────────────────
// Same contract as the books: every paragraph kept verbatim with a stable id,
// a heading, and a link. Citation markers (<xref>) are removed — they are
// glued to words in the XML ("urbanism1–3") — and figures and tables skipped.
const ARTICLES = [
  {
    id: 'prumers2022', file: 'sources/articles/prumers-2022.xml',
    title: 'Lidar reveals pre-Hispanic low-density urbanism in the Bolivian Amazon',
    author: 'Heiko Prümers, Carla Jaimes Betancourt, José Iriarte, Mark Robinson and Martin Schaich',
    publisher: 'Nature 606, 325–328', year: 2022, licence: 'CC BY 4.0',
    web: 'https://www.nature.com/articles/s41586-022-04780-4',
    got: 'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9177426/fullTextXML',
    keep: ['Main', 'Large settlement sites', 'Low-density urbanism of the Casarabe culture', 'Conclusions'],
  },
];
for (const src of ARTICLES) {
  const $ = cheerio.load(readFileSync(join(ROOT, src.file), 'utf8'), { xmlMode: true });
  $('xref, fig, table-wrap, supplementary-material').remove();
  const sections = [];
  // What removing <xref> leaves behind: the dashes and commas of citation
  // ranges glued to a word ("urbanism–", "sites,,") and figure references
  // with nothing left in them ("(Fig. )", "(see … in the , Supplementary …)").
  // Both are apparatus, not prose.
  // Only DEBRIS goes: dashes left glued to a word, doubled commas, a comma
  // stranded before a full stop. A single comma is the author's punctuation
  // and stays — a first version stripped them and changed the text, and a
  // second swallowed the real comma after "Amazonia7–9,".
  const tidy = (t) => clean(t
    .replace(/\s*\([^()]*?\b(?:Figs?|Tables?|Supplementary|Extended Data)\b[^()]*\)/g, '')
    .replace(/([A-Za-z0-9)])–+(?=[\s.,;:)]|$)/g, '$1')
    .replace(/,{2,}/g, ',')
    .replace(/,(?=[.;:])/g, ''))
    .replace(/\s+([.,;:])/g, '$1');
  const abs = $('abstract').first();
  const absParas = abs.find('p').map((_, p) => tidy($(p).text())).get().filter((t) => t.length >= 25);
  let n = 0;
  sections.push({ id: `${src.id}-abstract`, num: `${++n}`, title: 'Abstract', url: src.web,
    paras: absParas.map((t, i) => ({ id: `${src.id}-abstract-p${i + 1}`, under: null, key: false, text: t })) });
  $('body > sec').each((_, sec) => {
    const title = clean($(sec).children('title').first().text());
    if (!src.keep.includes(title)) return;
    const slug = title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
    const paras = [];
    let k = 0;
    $(sec).find('p').each((__, p) => {
      const text = tidy($(p).text());
      if (text.length < 25) return;
      const sub = clean($(p).parent('sec').children('title').first().text());
      paras.push({ id: `${src.id}-${slug}-p${++k}`, under: sub && sub !== title ? sub : null, key: false, text });
    });
    if (paras.length) sections.push({ id: `${src.id}-${slug}`, num: `${++n}`, title, url: src.web, paras });
  });
  const chapters = [{ n: 1, title: src.title, sections }];
  writeFileSync(join(ROOT, 'corpus', src.id + '.json'), JSON.stringify({ source: { ...src, file: undefined, keep: undefined }, chapters }, null, 1));
  const paras = sections.flatMap((s) => s.paras);
  console.log(`\n${src.title} (${src.year}): ${sections.length} sections, ${paras.length} paragraphs, `
    + `${paras.reduce((t, p) => t + p.text.split(' ').length, 0).toLocaleString()} words`);
}
