// World · Exchange and obligation. OpenStax *Introduction to Anthropology*
// (ch. 7, Work, Life, and Value: Economic Anthropology), CC BY-NC-SA 4.0.
//
// This chapter exists because the app's own brief rests on a claim — that
// barter was never the primordial economy, and that credit, gift and tribute
// came first — which until now the app asserted in its design notes and never
// asked. Here it is in a textbook's words, quoted and checkable, along with
// what the potlatch, hxaro and Hawaiian tribute did, what money is for, and
// what industrialism brought.
export const GLOSSARY_FROM = ['anth-7'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'How goods move: gift, tribute and market';

export const BIG = [
  { id: 'before-markets', q: 'How did goods move before markets?', src: ['anth-7.6'],
    ev: [{ p: 'anth-7.7-p43', q: 'In the first three modes of subsistence, forms of reciprocity structure the circulation of goods in society.' }] },
  { id: 'states', q: 'What do leaders and states do with what they take?', src: ['anth-7.5'],
    ev: [{ p: 'anth-7.6-p8', q: 'Redistribution is practiced in all state societies.' }] },
  { id: 'industry', q: 'What did industrialism bring — and to whom?', src: ['anth-7.7', 'anth-7.1', 'anth-7.2', 'anth-7.3', 'anth-7.4'],
    ev: [{ p: 'anth-7.7-p44', q: 'Industrialism was first developed in Europe and motivated the colonization of many other parts of the world.' }] },
];

export default [
  // ── the barter story ──────────────────────────────────────────────────
  {
    id: 'barter-never', kind: 'choice', big: 'before-markets', lens: ['economy', 'against-progress'],
    prompt: 'Economics textbooks often begin with people swapping goods on the spot, and money arriving to make the swapping easier. How common was that swapping in the past?',
    answer: 'It was never the dominant form',
    options: ['It was how most trade worked', 'It was universal before coins', 'It came after money'],
    must: ['The swapping of goods on the spot, however, was never a dominant form of exchange in any culture in the past'],
    ev: [{ p: 'anth-7.6-p17', q: 'The swapping of goods on the spot, however, was never a dominant form of exchange in any culture in the past.' }],
  },
  {
    id: 'instead-of-barter', kind: 'choice', big: 'before-markets', lens: ['economy'],
    prompt: 'If people did not mostly swap goods on the spot, what did many anthropologists argue moved goods through a society before capitalism?',
    answer: 'Gift, redistribution and debt',
    options: ['Coins, and then paper money', 'Raiding and tribute alone', 'Nothing much moved at all'],
    must: ['precapitalist peoples relied more on gift exchange, redistribution, and debt to circulate goods through society'],
    ev: [{ p: 'anth-7.6-p17', q: 'Instead, many anthropologists argue that precapitalist peoples relied more on gift exchange, redistribution, and debt to circulate goods through society.' }],
  },
  {
    id: 'credit-and-debt', kind: 'choice', big: 'before-markets', lens: ['economy', 'own-terms'],
    prompt: 'A herder gives a whole goat to a farming friend, who will return the favour later. What does that leave a community looking like?',
    answer: 'Everyone entwined in credit and debt',
    options: ['A market with fixed prices', 'A chain of one-off trades', 'A society without exchange'],
    must: ['whole communities of people all mutually entwined in relations of credit and debt'],
    ev: [{ p: 'anth-7.6-p17', q: 'Individuals would have been involved in many such relationships simultaneously – whole communities of people all mutually entwined in relations of credit and debt.' }],
  },

  // ── forms of exchange ─────────────────────────────────────────────────
  {
    id: 'generalized-reciprocity', kind: 'choice', big: 'before-markets', lens: ['own-terms'],
    prompt: 'Hunters who divide large game equally among the band, and gatherers who hand out food to anyone hungry, are practising something with a name. What?',
    answer: 'Generalized reciprocity',
    options: ['Charity', 'Barter', 'Redistribution'],
    must: ['Generalized reciprocity is the anthropological term to describe how people share things with no regard for their value'],
    ev: [{ p: 'anth-7.6-p3', q: 'Generalized reciprocity is the anthropological term to describe how people share things with no regard for their value or interest in compensation.' }],
  },
  {
    id: 'sharing-result', kind: 'choice', big: 'before-markets', lens: ['economy', 'against-progress'],
    prompt: 'Sharing with no thought of return looks like altruism rather than exchange. What does it produce over time, when a group enforces it?',
    answer: 'Roughly equal exchange for everyone',
    options: ['Chronic shortages', 'A wealthy few', 'Idleness, eventually'],
    must: ['the result of generalized reciprocity over time is more or less the equal exchange of goods among all members of the group'],
    ev: [{ p: 'anth-7.6-p3', q: 'But when rigorously practiced by a group, with social sanctions used to punish laziness and stinginess, the result of generalized reciprocity over time is more or less the equal exchange of goods among all members of the group.' }],
  },
  {
    id: 'hxaro', kind: 'choice', big: 'before-markets', lens: ['own-terms', 'economy'],
    prompt: 'In the hxaro gift relationships of the Ju/’hoansi and other San groups of southern Africa, what is never discussed?',
    answer: 'The value, and the timing',
    options: ['Who asked first', 'Whether to accept', 'The item itself'],
    must: ['The value of the items is never discussed; nor is the time between episodes of gift giving'],
    ev: [{ p: 'anth-7.6-p5', q: 'The value of the items is never discussed; nor is the time between episodes of gift giving. All is made to seem natural and spontaneous. This form of exchange is known as balanced reciprocity.' }],
  },
  {
    id: 'hxaro-advantage', kind: 'choice', big: 'before-markets', depth: 'detail', lens: ['economy'],
    prompt: 'What does a hxaro partnership bring besides the gifts themselves?',
    answer: 'The right to hunt in their band',
    options: ['A share of their herd, in time', 'A claim on their children', 'A say in their marriage'],
    must: ['the right to hunt and gather in the band of your hxaro partner'],
    ev: [{ p: 'anth-7.6-p5', q: 'These relationships come with many advantages—for instance, the right to hunt and gather in the band of your hxaro partner.' }],
  },
  {
    id: 'potlatch-power', kind: 'choice', big: 'before-markets', lens: ['own-terms', 'against-progress'],
    prompt: 'At the potlatch feasts of the Haida, Kwakiutl and Tlingit, a host chief heaped gifts on a guest chief — sometimes burning them outright. How was power established?',
    answer: 'By giving wealth away',
    options: ['By hoarding wealth', 'By conquest, afterwards', 'By marriage alliances'],
    must: ['not by acquiring wealth but by giving it away'],
    ev: [{ p: 'anth-7.6-p6', q: 'Power among neighboring communities was established and reinforced through this competitive feasting, not by acquiring wealth but by giving it away.' }],
  },
  {
    id: 'hawaii-tribute', kind: 'choice', big: 'states', lens: ['economy'],
    prompt: 'In the Hawaiian Islands before contact with Europeans, farmers passed part of their surplus to local chiefs. Where did it go from there?',
    answer: 'Up a pyramid of chiefs',
    options: ['Back to the farmers, as seed', 'Into trade with other islands', 'To the priests alone'],
    must: ['These local chiefs then relayed a portion of the tribute they received to regional chiefs, and so on up the pyramid to the great chief'],
    ev: [{ p: 'anth-7.6-p7', q: 'These local chiefs then relayed a portion of the tribute they received to regional chiefs, and so on up the pyramid to the great chief.' }],
  },
  {
    id: 'tribute-paid-for', kind: 'choice', big: 'states', depth: 'detail', lens: ['economy'],
    prompt: 'What did that Hawaiian tribute pay for?',
    answer: 'Government at every level',
    options: ['The chiefs’ households only', 'Warfare with other islands', 'Temples, and nothing else'],
    must: ['This tribute supported government at each level, including royal courts, political advisers, priests, military strategists, guards, and entertainers'],
    ev: [{ p: 'anth-7.6-p7', q: 'This tribute supported government at each level, including royal courts, political advisers, priests, military strategists, guards, and entertainers.' }],
  },

  // ── states, money and markets ─────────────────────────────────────────
  {
    id: 'redistribution-states', kind: 'choice', big: 'states', lens: ['economy'],
    prompt: 'Roads, post, schools, libraries, courts, police — all paid for by taxation. What is the anthropological name for what a state is doing there?',
    answer: 'Redistribution',
    options: ['Balanced reciprocity', 'Market exchange', 'Tribute'],
    must: ['Redistribution is practiced in all state societies'],
    ev: [{ p: 'anth-7.6-p8', q: 'Redistribution is practiced in all state societies. Consider the roads in your neighborhood, the postal service, the public schools, the libraries, government-funded scientific research, the courts, the prisons, the police—all are paid for by taxation, the form of redistribution conducted by states.' }],
  },
  {
    id: 'not-buying', kind: 'choice', big: 'states', lens: ['economy', 'contested'],
    prompt: 'Some see taxation as a fee predatory elites extract; others as what makes the social order possible. What does redistribution not amount to?',
    answer: 'Buying goods from the state',
    options: ['Allocating resources', 'Supporting the economy', 'A system of any kind'],
    must: ['redistribution is not a way for individuals to purchase goods and services from the state but rather a system of allocating resources for the well-being of society as a whole'],
    ev: [{ p: 'anth-7.6-p8', q: 'It’s important to recognize that redistribution is not a way for individuals to purchase goods and services from the state but rather a system of allocating resources for the well-being of society as a whole.' }],
  },
  {
    id: 'what-is-money', kind: 'choice', big: 'before-markets', lens: ['economy', 'record'],
    prompt: 'Money is usually defined by three jobs it does: a medium of exchange, a store of value, and what else?',
    answer: 'A unit of account',
    options: ['A store of credit', 'A claim on the state', 'A measure of labour'],
    must: ['money is defined by three functions: it serves as a medium of exchange, a unit of account, and a store of value'],
    ev: [{ p: 'anth-7.6-p16', q: 'In the formulation of classical philosophy, money is defined by three functions: it serves as a medium of exchange, a unit of account, and a store of value.' }],
  },
  {
    id: 'what-is-market', kind: 'choice', big: 'before-markets', depth: 'detail', lens: ['economy'],
    prompt: 'A market, in the plainest anthropological sense, is what?',
    answer: 'An institution where buyers meet sellers',
    options: ['A price agreed by a state', 'Any exchange of goods', 'A building with stalls'],
    must: ['A market is an institution that makes it possible for buyers and sellers of goods to meet for the purposes of exchange'],
    ev: [{ p: 'anth-7.6-p10', q: 'A market is an institution that makes it possible for buyers and sellers of goods to meet for the purposes of exchange.' }],
  },
  {
    id: 'reciprocity-sidelined', kind: 'choice', big: 'before-markets', lens: ['economy', 'against-progress'],
    prompt: 'Gift and redistribution have not disappeared in modern Western societies. What has happened to them?',
    answer: 'Markets have sidelined them',
    options: ['They were outlawed', 'They replaced markets', 'They never existed there'],
    must: ['forms of reciprocity and redistribution have become increasingly sidelined by the other main form of economic exchange: markets'],
    ev: [{ p: 'anth-7.6-p10', q: 'In contemporary Western society, forms of reciprocity and redistribution have become increasingly sidelined by the other main form of economic exchange: markets.' }],
  },

  // ── modes of subsistence, and industry ────────────────────────────────
  {
    id: 'four-modes', kind: 'choice', big: 'industry', depth: 'detail', lens: ['record'],
    prompt: 'Anthropologists group the ways people meet their needs into four modes: gathering-hunting, pastoralism, plant cultivation and which other?',
    answer: 'Industrialism',
    options: ['Trade', 'Fishing', 'Mining'],
    must: ['Humans use four main modes of subsistence to meet their needs: gathering-hunting, pastoralism, plant cultivation, and industrialism'],
    ev: [{ p: 'anth-7.7-p42', q: 'Humans use four main modes of subsistence to meet their needs: gathering-hunting, pastoralism, plant cultivation, and industrialism.' }],
  },
  {
    id: 'cities-from-surplus', kind: 'choice', big: 'industry', lens: ['economy'],
    prompt: 'Where do cities and craft specialists come from, in this account?',
    answer: 'The surplus of intensive agriculture',
    options: ['Long-distance trade', 'The invention of money', 'The first states’ decrees'],
    must: ['Cities and craft specialization are developed from the surplus generated by intensive agriculture'],
    ev: [{ p: 'anth-7.7-p42', q: 'Cities and craft specialization are developed from the surplus generated by intensive agriculture.' }],
  },
  {
    id: 'when-money-dominates', kind: 'choice', big: 'before-markets', lens: ['economy'],
    prompt: 'In which ways of living does a money market become the dominant way goods change hands?',
    answer: 'Intensive agriculture and industry',
    options: ['Herding and horticulture', 'Gathering and hunting', 'All of them equally'],
    must: ['In intensive agriculture and industrialism, the market economy based on money forms the dominant mode of exchange'],
    ev: [{ p: 'anth-7.7-p43', q: 'In intensive agriculture and industrialism, the market economy based on money forms the dominant mode of exchange.' }],
  },
  {
    id: 'industrialism-colonies', kind: 'choice', big: 'industry', lens: ['against-progress'],
    prompt: 'Industrialism was first developed in Europe. What did it motivate?',
    answer: 'The colonization of the world',
    options: ['The end of slavery, at last', 'A retreat from empire', 'Migration into Europe'],
    must: ['Industrialism was first developed in Europe and motivated the colonization of many other parts of the world'],
    ev: [{ p: 'anth-7.7-p44', q: 'Industrialism was first developed in Europe and motivated the colonization of many other parts of the world.' }],
  },
  {
    id: 'industrial-society', kind: 'choice', big: 'industry', lens: ['economy'],
    prompt: 'What is an industrial society associated with, besides wage labour and commodity consumption?',
    answer: 'Work discipline, classes, inequality',
    options: ['Shared ownership', 'Falling populations', 'Weak states'],
    must: ['Industrial societies are associated with wage labor, work discipline, social classes, commodity consumption, and high degrees of inequality'],
    ev: [{ p: 'anth-7.7-p44', q: 'Industrial societies are associated with wage labor, work discipline, social classes, commodity consumption, and high degrees of inequality.' }],
  },
  {
    id: 'postindustrial', kind: 'choice', big: 'industry', lens: ['against-progress', 'economy'],
    prompt: 'How have some industrialized societies become postindustrial?',
    answer: 'By moving production where labour is cheap',
    options: ['By ending manufacturing outright', 'By automating every last factory', 'By returning to farming'],
    must: ['Some industrialized societies have become postindustrial by shifting production to poorer parts of the world with cheaper labor costs'],
    ev: [{ p: 'anth-7.7-p44', q: 'Some industrialized societies have become postindustrial by shifting production to poorer parts of the world with cheaper labor costs.' }],
  },
];
