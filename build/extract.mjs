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
      const text = clean($n.text());
      if (text.length < 25) return;
      section.paras.push({
        id: `${section.id}-p${++k}`,
        under: heading,
        key: /^key points?$/i.test(heading || ''),   // the author's own summary
        text,
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
