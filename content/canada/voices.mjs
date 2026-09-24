// Voices — people of the past in their own words, for the home screen's
// background and its "Whose voices?" sheet.
//
// The same rule as the questions: every line is checked VERBATIM against its
// source by build/verify.mjs. Primary sources are public-domain scans from the
// Internet Archive (OCR text in sources/voices/); lines quoted inside Belshaw
// point at the paragraph (`p`) instead.
//
// Honesty about whose words these are matters more than usual. Most
// Indigenous speech from before 1800 survives only as a European wrote it
// down, translated, and published it — `recorded` says who, and `note` says
// what is argued. Copway and Jones wrote their own books.
//
// Spelling: the 1703 Lahontan text prints the long s, which the OCR reads as
// "f" ("Beafts"). Quotes are given with a modern s; `longS` lets the checker
// match s against f in that source only. Nothing else is modernised.

export const VOICE_SOURCES = {
  leclercq: {
    file: 'sources/voices/newrelationofgas0005lecl.txt',
    title: 'New Relation of Gaspesia', author: 'Chrestien Le Clercq (1691), translated and edited by William F. Ganong',
    publisher: 'The Champlain Society, Toronto', year: 1910, licence: 'Public domain',
    url: 'https://archive.org/details/newrelationofgas0005lecl',
  },
  lahontan: {
    file: 'sources/voices/agd5973.0002.001.umich.edu.txt', longS: true,
    title: 'New Voyages to North-America, vol. 2', author: 'Louis-Armand de Lom d’Arce, baron de Lahontan (English edition 1703), edited by Reuben Gold Thwaites',
    publisher: 'A. C. McClurg, Chicago', year: 1905, licence: 'Public domain',
    url: 'https://archive.org/details/agd5973.0002.001.umich.edu',
  },
  copway: {
    file: 'sources/voices/traditionalhisto00copw.txt',
    title: 'The Traditional History and Characteristic Sketches of the Ojibway Nation', author: 'George Copway (Kahgegagahbowh)',
    publisher: 'Benjamin B. Mussey, Boston', year: 1851, licence: 'Public domain',
    url: 'https://archive.org/details/traditionalhisto00copw',
  },
  jones: {
    file: 'sources/voices/historyofojebway00jonerich.txt',
    title: 'History of the Ojebway Indians', author: 'Peter Jones (Kahkewaquonaby)',
    publisher: 'A. W. Bennett, London', year: 1861, licence: 'Public domain',
    url: 'https://archive.org/details/historyofojebway00jonerich',
  },
};

export default [
  {
    id: 'mikmaq-at-home', src: 'leclercq', short: 'A Mi’kmaq elder',
    who: 'A Mi’kmaq elder, to French visitors at Gaspé', when: 'published 1691',
    recorded: 'Written down in French by the missionary Chrestien Le Clercq',
    q: 'we can always say, more truly than thou, that we are at home everywhere, because we set up our wigwams with ease wheresoever we go, and without asking permission of anybody.',
  },
  {
    id: 'mikmaq-content', src: 'leclercq', short: 'A Mi’kmaq elder',
    who: 'A Mi’kmaq elder, to French visitors at Gaspé', when: 'published 1691',
    recorded: 'Written down in French by the missionary Chrestien Le Clercq',
    q: 'all miserable as we seem in thine eyes, we consider ourselves nevertheless much happier than thou in this, that we are very content with the little that we have',
  },
  {
    id: 'mikmaq-cod', src: 'leclercq', short: 'A Mi’kmaq elder',
    who: 'A Mi’kmaq elder, to French visitors at Gaspé', when: 'published 1691',
    recorded: 'Written down in French by the missionary Chrestien Le Clercq',
    q: 'It is everlastingly nothing but cod—cod in the morning, cod at midday, cod at evening, and always cod',
  },
  {
    id: 'adario-beasts', src: 'lahontan', short: 'Adario (Kandiaronk)',
    who: 'Adario — usually taken to be the Wendat statesman Kandiaronk', when: 'published 1703',
    recorded: 'Written as a dialogue by the French officer Lahontan',
    note: 'How much of Adario is Kandiaronk, and how much is Lahontan, is still argued.',
    q: 'The French in general take us for Beasts; the Jesuits Brand us for impious, foolish and ignorant Vagabonds. And to be even with you, we have the same thoughts of you',
  },
  {
    id: 'adario-money', src: 'lahontan', short: 'Adario (Kandiaronk)',
    who: 'Adario — usually taken to be the Wendat statesman Kandiaronk', when: 'published 1703',
    recorded: 'Written as a dialogue by the French officer Lahontan',
    note: 'How much of Adario is Kandiaronk, and how much is Lahontan, is still argued.',
    q: 'This Mony is the Father of Luxury, Lasciviousness, Intrigues, Tricks, Lying, Treachery, Falseness, and in a word, of all the mischief in the World.',
  },
  {
    id: 'copway-records', src: 'copway', short: 'George Copway',
    who: 'George Copway (Kahgegagahbowh), Ojibwe writer', when: '1851',
    recorded: 'In his own book',
    q: 'These records are made on one side of bark and board plates, and are examined once in fifteen years, at which time the decaying ones are replaced by new plates.',
  },
  {
    id: 'copway-first', src: 'copway', short: 'George Copway',
    who: 'George Copway (Kahgegagahbowh), Ojibwe writer', when: '1851',
    recorded: 'In his own book',
    q: 'As the first volume of Indian history written by an Indian, with a hope that it may in some degree benefit his nation',
  },
  {
    id: 'one-dish', src: 'jones', short: 'John Buck, an Onondaga chief',
    who: 'John Buck, Onondaga chief, reading the wampum at a council with the Ojibwe', when: '1840',
    recorded: 'Reported by Peter Jones (Kahkewaquonaby), Mississauga Ojibwe',
    q: 'the Ojebways and the Six Nations were all to eat out of the same dish; that is, to have all their game in common.',
  },
  {
    id: 'prince-feel', p: 'prince1831-p101', short: 'Mary Prince', ask: { ch: 'th01-empire-trade', big: 'slavery' },
    who: 'Mary Prince, enslaved in Bermuda, Turks Island and Antigua', when: 'published 1831',
    recorded: 'Told in her own words and taken down by a helper; published by Thomas Pringle in London',
    q: 'I have been a slave myself--I know what slaves feel--I can tell by myself what other slaves feel, and by what they have told me.',
  },
  {
    // Haiti speaking for itself, in English, while other states refused to
    // recognise it: a general of the revolution telling the French commander
    // what proof he requires before he will submit.
    id: 'christophe-proof', p: 'haytian1816-p76', short: 'Henry Christophe', ask: { ch: 'w02-atlantic', big: 'revolutions' },
    who: 'Henry Christophe, general of the Haitian revolution and later king, to General Leclerc', when: '1802',
    recorded: 'Printed in the state papers Prince Saunders gathered for an English readership, London, 1816',
    // The OCR reads this line's opening "I" as "T"; the quote starts after it.
    q: 'a proof which must convince me of the intention to procure the liberty and equality of the population of this colony',
  },
  {
    id: 'hayti-dating', p: 'haytian1816-p281', short: 'The state of Hayti itself', ask: { ch: 'w02-atlantic', big: 'revolutions' },
    who: 'The state of Hayti, dating its own decrees', when: '1810',
    recorded: 'From the royal proclamations Prince Saunders published in London in 1816',
    q: 'Done at our Palace of Cape Henry, the 8th October 1810, in the seventh year of the independence of Hayti.',
  },
  {
    id: 'las-casas', p: 'pre-1.2-p11', short: 'Bartolomé de las Casas', ask: { ch: 'ch05-contact', big: 'terms' },
    who: 'Bartolomé de las Casas, Spanish priest in the Caribbean', when: '1500s',
    recorded: 'Quoted in Belshaw',
    q: 'My eyes have seen these acts so foreign to human nature, and now I tremble as I write, not believing them myself',
  },
  {
    id: 'diaz-tenochtitlan', p: 'pre-5.3-p5', short: 'Bernal Díaz del Castillo', ask: { ch: 'w02-atlantic', big: 'crossing' },
    who: 'Bernal Díaz del Castillo, a Spanish soldier, on Tenochtitlan after the siege', when: 'written years after 1521',
    recorded: 'Quoted in Belshaw',
    q: 'The city looked as though it had been ploughed up.',
  },
];
