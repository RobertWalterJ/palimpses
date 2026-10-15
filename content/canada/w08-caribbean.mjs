// World · The Caribbean, in its own voices. Public-domain books by people who
// were there: Ashton Warner of St Vincent (1831), Mary Prince of Bermuda
// (1831), Mary Seacole of Jamaica (1857), and the state papers of Haiti (1816).
//
// Robert, 14 October 2026: "I really ought to know more Caribbean history, its
// pre-colonial history, colonial history and anti-colonial/Black and enslaved-
// persons-centred histories."
//
// The Atlantic chapter (w02) tells the system — twelve million people, the
// sugar, the Middle Passage, the revolution in Saint-Domingue — from a
// textbook. This chapter is the other half: four people describing the same
// world from inside it, in their own books. Where w02 says what the trade did,
// Warner says what the law did when a free man was seized, and Seacole says
// what the War Office did when a Jamaican woman volunteered.
//
// Still missing, and the next thing to write here: the pre-colonial Caribbean.
// The one open archaeology of the Taíno and Kalinago worth having is not
// openly licensed (see audits/2026-10-14-prose-sources.md), so for now that
// story is told only through w02's textbook paragraphs.

export const GLOSSARY_FROM = [];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'The Caribbean, told from inside it, 1787–1857';

export const BIG = [
  { id: 'law', q: 'What did the law do for people the law called property?', src: [],
    ev: [{ p: 'warner1831-p28', q: 'The Governor, after looking at it, said that Mr. Wilson had no legal right to claim me upon the estate, and he promised my aunt that he would write to him to that effect.' }] },
  { id: 'work', q: 'What was the work, in the words of people who did it?', src: [],
    ev: [{ p: 'warner1831-p59', q: 'The work is very severe, and great numbers of the slaves, during this .period, sink under it, and become ill; but if they complain, their complaints are not readily believed, or are considered only a pretence to escape from labour.' }] },
  { id: 'freedom', q: 'What did people do with, and for, their own freedom?', src: [],
    ev: [{ p: 'warner1831-p24', q: 'all the money she could save went to purchase the freedom of slaves who had formerly been her companions in bondage at Cane Grove, or to make their condition better' }] },
];

export default [
  // ── Ashton Warner, St Vincent ─────────────────────────────────────────
  {
    id: 'daphne-buying-freedom', kind: 'choice', big: 'freedom', at: 1831, lens: ['own-terms'],
    prompt: 'Daphne Crosbie, once enslaved herself, bought her own mother and her sister’s child out of slavery in St Vincent. What did she do with the rest of the money she saved?',
    answer: 'Bought other people’s freedom',
    options: ['Bought land of her own', 'Paid for a passage to England', 'Left it to the parish church'],
    must: ['all the money she could save went to purchase the freedom of slaves who had formerly been her companions in bondage'],
    ev: [{ p: 'warner1831-p24', q: 'I am sure our best days were spent with my dear aunt; nor did she make us alone happy; all the money she could save went to purchase the freedom of slaves who had formerly been her companions in bondage at Cane Grove, or to make their condition better.' }],
  },
  {
    id: 'warner-governor', kind: 'choice', big: 'law', at: 1831, lens: ['against-progress', 'record'],
    prompt: 'A man held on a St Vincent estate had a manumission paper proving he was free, and the Governor agreed the planter had no legal right to him. What happened then?',
    answer: 'Nothing — no answer ever came',
    options: ['He was freed at once', 'The planter was prosecuted', 'The case went to London'],
    must: ['But we never knew whether he did or not, for we never got an answer from him'],
    ev: [{ p: 'warner1831-p28', q: 'The Governor, after looking at it, said that Mr. Wilson had no legal right to claim me upon the estate, and he promised my aunt that he would write to him to that effect. But we never knew whether he did or not, for we never got an answer from him.' }],
  },
  {
    id: 'croptime-nights', kind: 'choice', big: 'work', lens: ['economy', 'record'],
    prompt: 'During crop-time on a St Vincent sugar estate, the field gangs worked all day. What else was required of them?',
    answer: 'Half the night, or three nights a week',
    options: ['An hour before dawn', 'Sunday mornings as well', 'Nothing — nights were their own'],
    must: ['to endure during crop-time the severe daily labour, but to work half the night also, or three whole nights in the week'],
    ev: [{ p: 'warner1831-p59', q: 'The whole gang of field slaves are divided into spells, and every man. and woman able to work has not only to endure during crop-time the severe daily labour, but to work half the night also, or three whole nights in the week.' }],
  },
  {
    id: 'complaints-not-believed', kind: 'choice', big: 'work', lens: ['own-terms', 'against-progress'],
    prompt: 'What happened when people worked past the point of illness and said so?',
    answer: 'They were disbelieved',
    options: ['They were sent home to rest', 'They were given lighter work', 'A doctor was called for'],
    must: ['their complaints are not readily believed, or are considered only a pretence to escape from labour'],
    ev: [{ p: 'warner1831-p59', q: 'The work is very severe, and great numbers of the slaves, during this .period, sink under it, and become ill; but if they complain, their complaints are not readily believed, or are considered only a pretence to escape from labour.' }],
  },
  {
    id: 'sick-house', kind: 'choice', big: 'work', lens: ['record'],
    prompt: 'The estate’s sick-house was, in one man’s words, “just like a penn to keep pigs in”. How did the people on the estate regard being sent there?',
    answer: 'As one of the worst punishments',
    options: ['As a rest from the field', 'As a mark of favour', 'As the only safe place'],
    must: ['It is one of the greatest punishments to the slaves to be sent there'],
    ev: [{ p: 'warner1831-p61', q: 'The sick-house is just like a penn to keep pigs in; if you wish to keep yourself clean and decent, you cannot. It is one of the greatest punishments to the slaves to be sent there.' }],
  },
  {
    id: 'sick-called-to-work', kind: 'choice', big: 'work', depth: 'detail', lens: ['against-progress'],
    prompt: 'When there was much sugar to pot, the manager sent to the sick-house for people who were ill or lame. What happened to those who said they could not come?',
    answer: 'They were flogged with the cartwhip',
    options: ['They were left alone', 'Their rations were cut', 'They were sold off the estate'],
    must: ['they were taken down and severely flogged, by the manager’s order, with the cartwhip'],
    ev: [{ p: 'warner1831-p61', q: 'If they’ refused to come, and said that they were unable to work, they were taken down and severely flogged, by the manager’s order, with the cartwhip.' }],
  },
  {
    id: 'not-buying-myself', kind: 'choice', big: 'freedom', lens: ['own-terms', 'contested'],
    prompt: 'A manager offered to let a man he held leave the estate and work for wages, if his friends paid part of his price. His friends told him to refuse. Why?',
    answer: 'Paying would admit he had been justly enslaved',
    options: ['The price was far too high', 'The manager could not be trusted', 'Wages would be worse than the estate'],
    must: ['I must not submit to be sold in any way, as that would be owning myself to have been justly enslaved'],
    ev: [{ p: 'warner1831-p80', q: 'but when I applied to my friends they told me that I had as good a claim to freedom as they had; ahd that I must not submit to be sold in any way, as that would be owning myself to have been justly enslaved' }],
  },

  // ── Mary Seacole, Jamaica ─────────────────────────────────────────────
  {
    id: 'seacole-doctress', kind: 'choice', big: 'freedom', at: 1857, lens: ['own-terms'],
    prompt: 'Mary Seacole learned her medicine in Kingston before she ever saw a war. From whom?',
    answer: 'Her mother, a Jamaican doctress',
    options: ['An army surgeon', 'A London hospital', 'A Spanish physician'],
    must: ['My mother kept a boarding-house in Kingston, and was, like very many of the Creole women, an admirable doctress'],
    ev: [{ p: 'seacole1857-p26', q: 'My mother kept a boarding-house in Kingston, and was, like very many of the Creole women, an admirable doctress; in high repute with the officers of both services, and their wives, who were from time to time stationed at Kingston.' }],
  },
  {
    id: 'seacole-war-office', kind: 'choice', big: 'law', at: 1854, lens: ['against-progress', 'record'],
    prompt: 'Mary Seacole had nursed cholera in Panama and Jamaica. What came of her applications to the War Office for a post as a nurse in the Crimea?',
    answer: 'She never got an interview',
    options: ['She was posted within weeks', 'She was sent to Scutari instead', 'She was offered a lesser post'],
    must: ['my ridiculous endeavours to gain an interview with the Secretary-at-War of course failed'],
    ev: [{ p: 'seacole1857-p170', q: 'But my ridiculous endeavours to gain an interview with the Secretary-at-War of course failed, and glad at last to oblige a distracted messenger, I transferred my attentions to the Quartermaster-General’s department.' },
      { p: 'seacole1857-p170', q: 'So I made long and unwearied application at the War Office, in blissful ignorance of the labour and time I was throwing away.' }],
  },
  {
    id: 'self-liberated', kind: 'choice', big: 'freedom', lens: ['own-terms', 'against-progress'],
    prompt: 'In the New Granada republics of Central America, where people who had freed themselves from slavery in the southern United States took refuge, where did they end up?',
    answer: 'In the foremost rank of every profession',
    options: ['Confined to the ports', 'Kept out of public office', 'Returned under treaty'],
    must: ['In the priesthood, in the army, in all municipal offices, the self-liberated negroes were invariably found in the foremost rank'],
    ev: [{ p: 'seacole1857-p109', q: 'In the priesthood, in the army, in all municipal offices, the self-liberated negroes were invariably found in the foremost rank' }],
  },
];
