// World · South Asia and the Indian Ocean. OpenStax World History (wh1 ch. 3,
// 5, 12; wh2 ch. 2): the planned cities of the Indus valley, the empires that
// held a diverse subcontinent together, and the ocean trade that Europeans
// arrived into — rather than opened.
//
// Malacca and the straits belong to the East Asia chapter, and the East India
// Company's trade to the empire thread; neither is asked about again here.
export const GLOSSARY_FROM = ['wh1-5.4', 'wh1-12.1', 'wh2-2.1', 'wh2-2.2'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'South Asia and the Indian Ocean, 2800 BCE–1700s';

export const BIG = [
  { id: 'cities', q: 'What did the Indus valley build — and what can still be read of it?', src: ['wh1-3.4'],
    ev: [{ p: 'wh1-3.4-p29', q: 'The Indus valley culture emerged as an early civilization in the early third millennium BCE.' }] },
  { id: 'india', q: 'How did India’s empires hold together many peoples and faiths?', src: ['wh1-5.4', 'wh2-2.1'],
    ev: [{ p: 'wh2-2.1-p58', q: 'Although Zahir al-Din Muhammad Babur, a Muslim who founded the Mughal Empire, made little effort to assimilate to Indian culture, his grandson Akbar forged a culture that incorporated Indian and Persian, Hindu and Muslim elements.' }] },
  { id: 'ocean', q: 'Who traded across the Indian Ocean, and on whose terms?', src: ['wh1-12.1', 'wh2-2.2'],
    ev: [{ p: 'wh2-2.2-p26', q: 'The Malaccan Sultanate was established around 1400 by Parameswara, the last king of Singapura.' }] },
];

export default [
  // ── the Indus valley ──────────────────────────────────────────────────
  {
    id: 'indus-cities', kind: 'choice', big: 'cities', at: -2000, lens: ['own-terms'],
    prompt: 'At its height around 2000 BCE, how many urban centres did the Indus valley hold?',
    answer: 'More than a thousand',
    options: ['Two', 'About twenty', 'About a hundred'],
    must: ['more than one thousand urban centers of varying sizes were spread across the expansive region'],
    ev: [{ p: 'wh1-3.4-p5', q: 'By the time this civilization reached its height around 2000 BCE, more than one thousand urban centers of varying sizes were spread across the expansive region ().' }],
  },
  {
    id: 'indus-grid', kind: 'choice', big: 'cities', lens: ['own-terms', 'against-progress'],
    prompt: 'What did the Indus valley cities share, from the largest to the smallest?',
    answer: 'A planned grid of streets',
    options: ['A single royal palace', 'A defensive wall', 'A common burial ground'],
    must: ['with a sophisticated grid of well-laid-out city streets'],
    ev: [{ p: 'wh1-3.4-p7', q: 'The fact that the sites all possessed a similar structural organization, with a sophisticated grid of well-laid-out city streets, ' }],
  },
  {
    id: 'indus-script', kind: 'choice', big: 'cities', lens: ['contested', 'record'],
    prompt: 'Why can historians only speculate about how the Indus valley’s cities rose and fell?',
    answer: 'Its writing has never been deciphered',
    options: ['Its cities were never excavated', 'It left no written script at all', 'Its records were burned'],
    must: ['Since the written script of the Indus peoples remains undeciphered, historians can only speculate'],
    ev: [{ p: 'wh1-3.4-p29', q: 'Since the written script of the Indus peoples remains undeciphered, historians can only speculate about how these great cities arose and why they fell' }],
  },
  {
    id: 'indus-forgotten', kind: 'choice', big: 'cities', depth: 'detail', lens: ['record'],
    prompt: 'When did scholars outside the region learn that this civilization had existed at all?',
    answer: 'In the nineteenth century',
    options: ['In ancient Greek times', 'In the 1500s', 'Only after 1950'],
    must: ['its existence was unknown to modern scholars until the early nineteenth century'],
    ev: [{ p: 'wh1-3.4-p6', q: 'Despite the large size of this civilization, its existence was unknown to modern scholars until the early nineteenth century when British excavations revealed the ancient city of Harappa.' }],
  },

  // ── empires ───────────────────────────────────────────────────────────
  {
    id: 'ashoka-kalinga', kind: 'choice', big: 'india', at: -268, lens: ['own-terms'],
    prompt: 'The Mauryan emperor Ashoka won a battle at Kalinga that killed an estimated 100,000 people. What did the carnage do to him?',
    answer: 'Turned him to Buddhism',
    options: ['Hardened him for more war', 'Cost him his throne', 'Made him abolish the army'],
    must: ['The carnage brought an awakening that led Ashoka to Buddhism'],
    ev: [{ p: 'wh1-5.4-p31', q: 'The carnage brought an awakening that led Ashoka to Buddhism and to reforms intended to promote harmony and compassionate rule throughout India.' }],
  },
  {
    id: 'ashoka-pillars', kind: 'choice', big: 'india', depth: 'detail', lens: ['record'],
    prompt: 'How did Ashoka put his teachings on morality where his people would meet them?',
    answer: 'Inscribed on stone pillars',
    options: ['Copied onto palm-leaf books', 'Recited by royal messengers', 'Stamped on the coinage'],
    must: ['his sayings and teachings on morality be inscribed on stone pillars erected throughout India'],
    ev: [{ p: 'wh1-5.4-p32', q: 'He decreed that his sayings and teachings on morality be inscribed on stone pillars erected throughout India ().' }],
  },
  {
    id: 'maurya-rule', kind: 'choice', big: 'india', lens: ['own-terms', 'economy'],
    prompt: 'Ruling a diverse India, the Mauryans used Buddhism, the arts and great buildings to show morality and benevolence. What kind of rule did that allow?',
    answer: 'Less direct rule',
    options: ['Rule by a standing army', 'Rule by a single law code', 'Rule by taxing only cities'],
    must: ['demonstrate morality and benevolence to their subjects and exercise less direct rule'],
    ev: [{ p: 'wh1-5.4-p32', q: 'Through Buddhism, patronage of the arts, and monumental architecture, the Mauryans wished to demonstrate morality and benevolence to their subjects and exercise less direct rule.' }],
  },
  {
    id: 'after-maurya', kind: 'choice', big: 'india', at: -185, lens: ['against-progress'],
    prompt: 'The Mauryan Empire collapsed in 185 BCE and India broke into many small kingdoms. What held those kingdoms together?',
    answer: 'A shared culture',
    options: ['A single emperor in name', 'A common army', 'Nothing at all'],
    must: ['a multitude of smaller regional kingdoms that shared with each other a common culture'],
    ev: [{ p: 'wh1-5.4-p33', q: 'By the early centuries of the common era, it was a multitude of smaller regional kingdoms that shared with each other a common culture linked by Hinduism, Buddhism, a canon of Sanskrit texts, and the caste system.' }],
  },
  {
    id: 'buddhism-origin', kind: 'choice', big: 'india', lens: ['own-terms'],
    prompt: 'An Indian prince named Siddhartha Gautama founded Buddhism in the sixth century BCE. What was it, in relation to Hinduism?',
    answer: 'An alternative to it',
    options: ['A reform inside it', 'A rejection of all religion', 'A faith brought from Persia'],
    must: ['founded the religion of Buddhism as an alternative to Hinduism'],
    ev: [{ p: 'wh1-5.4-p43', q: 'In the sixth century BCE, an Indian prince named Siddhartha Gautama founded the religion of Buddhism as an alternative to Hinduism and taught people how they might escape the suffering of the world.' }],
  },
  {
    id: 'delhi-diversity', kind: 'choice', big: 'india', lens: ['against-progress'],
    prompt: 'Muslim rulers held Delhi for more than three hundred years. What did their rule do to India’s cultural diversity?',
    answer: 'Strengthened it',
    options: ['Ended it by decree', 'Left it untouched', 'Replaced it with one law'],
    must: ['the invasions strengthened the cultural diversity that was already a hallmark of Indian social order'],
    ev: [{ p: 'wh1-12.1-p50', q: 'However, because the minority Muslim rulers did not enforce cultural homogeneity, the invasions strengthened the cultural diversity that was already a hallmark of Indian social order' }],
  },
  {
    id: 'akbar-illiterate', kind: 'choice', big: 'india', lens: ['record'],
    prompt: 'Akbar became the greatest of the Mughal emperors. What could he not do?',
    answer: 'Read',
    options: ['Ride', 'Speak Persian', 'Command an army'],
    must: ['Although he was illiterate, possibly because of severe dyslexia, Akbar became the greatest of the Mughal emperors'],
    ev: [{ p: 'wh2-2.1-p6', q: 'Although he was illiterate, possibly because of severe dyslexia, Akbar became the greatest of the Mughal emperors.' }],
  },
  {
    id: 'akbar-local-rulers', kind: 'choice', big: 'india', lens: ['economy'],
    prompt: 'Akbar expanded the Mughal Empire by force across northern India. What did he let the rulers he defeated keep?',
    answer: 'Their lands, if they submitted',
    options: ['Their armies, if they paid', 'Their titles alone', 'Nothing whatever'],
    must: ['he allowed local rulers to retain control of their lands so long as they submitted to him'],
    ev: [{ p: 'wh2-2.1-p6', q: 'Although he was aggressive militarily and expanded the bounds of the Mughal Empire across the northern part of the subcontinent and into the central plains to the south, he allowed local rulers to retain control of their lands so long as they submitted to him.' }],
  },
  {
    id: 'jizya-abolished', kind: 'choice', big: 'india', at: 1568, lens: ['own-terms'],
    prompt: 'Non-Muslims in the Mughal Empire paid a tax called the jizya. What did Akbar do with it in 1568?',
    answer: 'Abolished it',
    options: ['Doubled it', 'Extended it to Muslims', 'Gave it to the temples'],
    must: ['he abolished the jizya, a tax imposed on non-Muslims'],
    ev: [{ p: 'wh2-2.1-p8', q: 'In 1568, he abolished the jizya, a tax imposed on non-Muslims.' }],
  },
  {
    id: 'akbar-debate', kind: 'choice', big: 'india', lens: ['own-terms', 'record'],
    prompt: 'Akbar built a hall for religious debate, at first for Muslim scholars alone. What did he do when he found their positions too rigid?',
    answer: 'Invited other religions in',
    options: ['Closed the hall', 'Banned debate at court', 'Declared himself a prophet'],
    must: ['He then invited representatives of other religions to participate, including Portuguese Jesuit missionaries'],
    ev: [{ p: 'wh2-2.1-p11', q: 'He then invited representatives of other religions to participate, including Portuguese Jesuit missionaries.' }],
  },
  {
    id: 'mughal-harem', kind: 'choice', big: 'india', lens: ['contested', 'record'],
    prompt: 'The women of the Mughal royal family were secluded in a harem. Did that leave them without influence?',
    answer: 'No — they shaped decisions',
    options: ['Yes, entirely', 'Yes, but for the empress', 'The record is silent'],
    must: ['wives, mothers, and even nursemaids often played a role in important political decisions'],
    ev: [{ p: 'wh2-2.1-p7', q: 'Women’s separation from the men of the court did not mean they were not influential, and wives, mothers, and even nursemaids often played a role in important political decisions.' }],
  },
  {
    id: 'aurangzeb', kind: 'choice', big: 'india', lens: ['against-progress'],
    prompt: 'A later Mughal emperor attempted an Islamic revival and was largely intolerant of his Hindu subjects. What happened to the empire?',
    answer: 'It weakened',
    options: ['It reached its greatest extent', 'It converted the south', 'It became a republic'],
    must: ['Under Aurangzeb, who attempted an Islamic revival and was largely intolerant of the Hindu population, the empire weakened'],
    ev: [{ p: 'wh2-2.1-p58', q: 'Under Aurangzeb, who attempted an Islamic revival and was largely intolerant of the Hindu population, the empire weakened as it battled the Maratha Empire for dominance' }],
  },

  // ── the ocean ─────────────────────────────────────────────────────────
  {
    id: 'da-gama-calicut', kind: 'choice', big: 'ocean', at: 1498, lens: ['record'],
    prompt: 'Where did Vasco da Gama land in 1498, after rounding Africa?',
    answer: 'Calicut, in southern India',
    options: ['Goa, in western India', 'Colombo, in Sri Lanka', 'Malacca, in the straits'],
    must: ['he landed in the port of Calicut (Kozhikode) in what is today the state of Kerala'],
    ev: [{ p: 'wh2-2.1-p42', q: 'In 1498, da Gama sailed north along the east coast of Africa and from there across the Indian Ocean to the southwestern coast of India, where he landed in the port of Calicut (Kozhikode) in what is today the state of Kerala ().' }],
  },
  {
    id: 'why-expensive', kind: 'choice', big: 'ocean', lens: ['economy', 'against-progress'],
    prompt: 'Europeans had bought Asian spices and silks for centuries before da Gama. Why were they so expensive?',
    answer: 'They came overland, through many hands',
    options: ['They were taxed by the Pope', 'They were rare in Asia too', 'Only kings were allowed them'],
    must: ['they also passed through the hands of many intermediaries between their point of origin and their European consumers'],
    ev: [{ p: 'wh2-2.1-p42', q: 'They had to be carried overland, which limited the amounts that could be brought to Europe, and they also passed through the hands of many intermediaries between their point of origin and their European consumers.' }],
  },
  {
    id: 'portuguese-forcing', kind: 'choice', big: 'ocean', lens: ['against-progress'],
    prompt: 'The Indian Ocean already carried a busy trade when the Portuguese arrived. What did they do to the merchants they found?',
    answer: 'Tried to force them out',
    options: ['Bought cargo space from them', 'Left them to their routes', 'Hired them as pilots'],
    must: ['First the Portuguese attempted to establish trading posts in India while forcing out Arab and other merchants'],
    ev: [{ p: 'wh2-2.1-p59', q: 'First the Portuguese attempted to establish trading posts in India while forcing out Arab and other merchants. Indian rulers and the Mamluk sultan tried to force them from India, but unsuccessfully.' }],
  },
  {
    id: 'alliances-disputes', kind: 'choice', big: 'ocean', lens: ['economy'],
    prompt: 'The English and French followed the Portuguese into India. How did they gain their footing?',
    answer: 'By taking sides in Indian disputes',
    options: ['By conquering the coast outright', 'By treaty with the emperor', 'By buying Portuguese forts'],
    must: ['who also formed alliances with Indian rulers and took advantage of their disputes with one another'],
    ev: [{ p: 'wh2-2.1-p59', q: 'The Portuguese were assisted by alliances with some Indian rulers but soon found themselves competing with the English and French, who also formed alliances with Indian rulers and took advantage of their disputes with one another.' }],
  },
];
