// Canada · The North, and the country of the fur trade. Belshaw,
// Pre-Confederation, ch. 8 (Rupert's Land and the Northern Plains, 1690–1870),
// with two passages from ch. 5.
//
// This chapter exists to close two holes the question audit found: the Inuit
// appeared nowhere in the app at all, and only nine questions in the whole
// pack had a woman as their subject. The North here is not a frontier waiting
// to be entered — it is a place that kept Europeans out for three centuries —
// and the fur trade is a business that ran on women's work and produced a new
// nation.
export const GLOSSARY_FROM = ['pre-8'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'The North and the fur trade country, 900–1870';

export const BIG = [
  { id: 'north', q: 'How did the Arctic keep its own terms?', src: ['pre-8.2', 'pre-8.3'],
    ev: [{ p: 'pre-8.2-p9', q: 'European attempts to penetrate the North before the 20th century were largely unsuccessful.' }] },
  { id: 'trade', q: 'Who actually set the terms of the fur trade?', src: ['pre-8.4', 'pre-8.5'],
    ev: [{ p: 'pre-8.4-p15', q: 'Aboriginal groups in the North — especially the Lowland/Swampy Cree — operated their own monopolies in trade that extended from the bay to the Peace District and the Upper Mississippi.' }] },
  { id: 'women', q: 'Whose work held this country together?', src: ['pre-8.7', 'pre-8.8'],
    ev: [{ p: 'pre-8.8-p15', q: 'The role of the Aboriginal and métis women in these relationships was often critical to the success of the fur trade business.' }] },
  { id: 'newnation', q: 'Where did the Métis come from — and what made them a nation?', src: ['pre-8.8'],
    ev: [{ p: 'pre-8.8-p16', q: 'The people arising from these relationships began to define themselves as different from both Aboriginal and European ancestries.' }] },
];

export default [
  // ── the Arctic ────────────────────────────────────────────────────────
  {
    id: 'thule-move', kind: 'choice', big: 'north', at: 900, lens: ['own-terms'],
    prompt: 'Between about 900 and 1500 CE the Thule people moved along the shoreline and islands of the Arctic Ocean. From where to where?',
    answer: 'Alaska to Labrador',
    options: ['Labrador to Alaska', 'Greenland to Siberia', 'The Plains to the coast'],
    must: ['the Thule people moved steadily across the Arctic Ocean’s shoreline and islands from Alaska to Labrador'],
    ev: [{ p: 'pre-8.2-p3', q: 'Between 900 CE and 1500 CE the Thule people moved steadily across the Arctic Ocean’s shoreline and islands from Alaska to Labrador.' }],
  },
  {
    id: 'thule-inuit', kind: 'choice', big: 'north', at: 1500, lens: ['own-terms', 'record'],
    prompt: 'Which culture is descended from Thule traditions, and has held the Arctic rim of North America from about 1500 to the present?',
    answer: 'Inuit',
    options: ['Dorset', 'Beothuk', 'Innu'],
    must: ['Inuit culture — descended from Thule traditions — dominated the arctic rim of North America from ca. 1500 to the present'],
    ev: [{ p: 'pre-8.2-p3', q: 'In any event, Inuit culture — descended from Thule traditions — dominated the arctic rim of North America from ca. 1500 to the present.' }],
  },
  {
    id: 'inuit-not-joining', kind: 'choice', big: 'north', lens: ['against-progress', 'economy'],
    prompt: 'The Inuit were slow to join the European fur trade. Why did they not need it?',
    answer: 'They took what they needed from abandoned sites',
    options: ['They had no use for metal', 'They were forbidden to trade', 'They traded only with Russia'],
    must: ['they could obtain much of what they needed by raiding and/or picking over fishing and whaling sites abandoned by Europeans'],
    ev: [{ p: 'pre-8.2-p3', q: 'In part this is because, like the Beothuk, they could obtain much of what they needed by raiding and/or picking over fishing and whaling sites abandoned by Europeans.' }],
  },
  {
    id: 'kittigazuit', kind: 'choice', big: 'north', lens: ['own-terms', 'record'],
    prompt: 'Kittigazuit, a Siglit village at the mouth of the Mackenzie River, reached 1,000 to 2,000 people. What did that make it?',
    answer: 'The largest between Siberia and Greenland',
    options: ['The only village north of the treeline', 'The oldest town in the Arctic', 'A seasonal camp, and no more'],
    must: ['This was the largest collection of households between Siberia and Greenland'],
    ev: [{ p: 'pre-8.4-p10', q: 'This produced some unusually large communities, such as Kittigazuit, a Siglit village at the mouth of the Mackenzie River, whose population reached 1,000 to 2,000 individuals. This was the largest collection of households between Siberia and Greenland.' }],
  },
  {
    id: 'igloo-when', kind: 'choice', big: 'north', at: 1700, lens: ['against-progress'],
    prompt: 'The igloo is often imagined as an ancient, unchanging form. What did the colder climate around 1700 do to Arctic building?',
    answer: 'Ended turf houses, brought igloos and tents',
    options: ['Brought the first stone houses', 'Left building unchanged', 'Forced a move into European forts'],
    must: ['saw the end of stone- and/or turf-constructed dwellings, and the appearance of igloos and tents'],
    ev: [{ p: 'pre-8.4-p10', q: 'What’s more, the architectural challenges of living in a colder climate saw the end of stone- and/or turf-constructed dwellings, and the appearance of igloos and tents.' }],
  },
  {
    id: 'inuit-knowledge', kind: 'choice', big: 'north', lens: ['own-terms'],
    prompt: 'What did survival in the North depend on, for the peoples who lived there?',
    answer: 'Knowing land, weather and animals',
    options: ['Stores of preserved food', 'Trade with the settled south', 'Large permanent villages'],
    must: ['their survival depended on their knowledge of the landscape, seasonal and immediate weather, travel routes, and the movement of migratory animals'],
    ev: [{ p: 'pre-8.2-p2', q: 'As hunter-gatherer-fisher societies rather than farming societies, their survival depended on their knowledge of the landscape, seasonal and immediate weather, travel routes, and the movement of migratory animals.' }],
  },
  {
    id: 'franklin', kind: 'choice', big: 'north', at: 1845, lens: ['against-progress', 'record'],
    prompt: 'John Franklin led four expeditions into the North between 1819 and 1845. How did they end?',
    answer: 'Two were disasters, the rest fell short',
    options: ['All four completed their missions', 'Three succeeded, one was lost', 'They were abandoned before sailing'],
    must: ['Two of Franklin’s voyages were famous disasters and the others failed to fully complete their missions'],
    ev: [{ p: 'pre-8.2-p6', q: 'Two of Franklin’s voyages were famous disasters and the others failed to fully complete their missions.' }],
  },
  {
    id: 'moravian-mission', kind: 'choice', big: 'north', at: 1811, depth: 'detail', lens: ['record'],
    prompt: 'Inuit traded with Europeans around Hudson Strait from 1611. How long before any European settled among them for the long term?',
    answer: 'Two centuries',
    options: ['A decade', 'A generation', 'It happened at once'],
    must: ['did not arrive until the Moravian mission of 1811 at Kuujjuaq (a.k.a. Fort Chimo), fully two centuries later'],
    ev: [{ p: 'pre-8.2-p5', q: 'The first long-term European presence among the Inuit, however, did not arrive until the Moravian mission of 1811 at Kuujjuaq (a.k.a. Fort Chimo), fully two centuries later.' }],
  },
  {
    id: 'north-unsuccessful', kind: 'choice', big: 'north', lens: ['against-progress'],
    prompt: 'How well did European attempts to penetrate the North go, before the twentieth century?',
    answer: 'Largely unsuccessfully',
    options: ['Quickly and completely', 'Slowly but surely', 'Only the Russians managed it'],
    must: ['European attempts to penetrate the North before the 20th century were largely unsuccessful'],
    ev: [{ p: 'pre-8.2-p9', q: 'European attempts to penetrate the North before the 20th century were largely unsuccessful.' }],
  },

  // ── who set the terms ─────────────────────────────────────────────────
  {
    id: 'hbc-wait', kind: 'choice', big: 'trade', lens: ['economy'],
    prompt: 'The Hudson’s Bay Company built fortified posts with large warehouses on the bay. What was the strategy?',
    answer: 'To wait for the furs',
    options: ['To travel inland each winter', 'To farm the lowlands', 'To hunt the furs themselves'],
    must: ['to build strong, fortified posts on Hudson Bay with substantial warehousing capacity and to wait for the furs to come to them'],
    ev: [{ p: 'pre-8.4-p14', q: 'The HBC trading strategy was to build strong, fortified posts on Hudson Bay with substantial warehousing capacity and to wait for the furs to come to them.' }],
  },
  {
    id: 'cree-monopolies', kind: 'choice', big: 'trade', lens: ['against-progress', 'economy'],
    prompt: 'The chartered monopoly on the bay is the famous one. Who ran monopolies reaching from the bay to the Peace District and the Upper Mississippi?',
    answer: 'The Lowland and Swampy Cree',
    options: ['The North West Company', 'French traders from Montreal', 'The Inuit of the coast'],
    must: ['especially the Lowland/Swampy Cree — operated their own monopolies in trade'],
    ev: [{ p: 'pre-8.4-p15', q: 'Aboriginal groups in the North — especially the Lowland/Swampy Cree — operated their own monopolies in trade that extended from the bay to the Peace District and the Upper Mississippi.' }],
  },
  {
    id: 'why-trade-europeans', kind: 'choice', big: 'trade', lens: ['economy', 'own-terms'],
    prompt: 'What drew Aboriginal traders into dealing with Europeans, besides European goods?',
    answer: 'Goods made by other Aboriginal peoples',
    options: ['Credit at the posts', 'Protection from raids', 'Wages paid in coin'],
    must: ['their desire to own products generated by other Aboriginal peoples, including horses'],
    ev: [{ p: 'pre-8.4-p16', q: 'Aboriginal traders were motivated to engage with the Europeans by their desire to own products generated by other Aboriginal peoples, including horses.' }],
  },
  {
    id: 'monopoly-competition', kind: 'choice', big: 'trade', lens: ['economy'],
    prompt: 'The Hudson’s Bay Company held a monopoly by charter. Who gained when French traders ignored it?',
    answer: 'Cree and Innu traders',
    options: ['The company’s shareholders', 'The French Crown alone', 'Nobody — trade collapsed'],
    must: ['all of which worked to the advantage of Cree and Innu traders'],
    ev: [{ p: 'pre-8.3-p14', q: 'The HBC monopoly was not a deterrent to French incursions and competition, all of which worked to the advantage of Cree and Innu traders.' }],
  },

  // ── the women the trade ran on ────────────────────────────────────────
  {
    id: 'women-critical', kind: 'choice', big: 'women', lens: ['own-terms', 'economy'],
    prompt: 'Marriages and partnerships between Aboriginal women and European traders are often told as private matters. What were they to the business?',
    answer: 'Often critical to its success',
    options: ['A distraction from it', 'Irrelevant to it', 'Forbidden by the companies'],
    must: ['The role of the Aboriginal and métis women in these relationships was often critical to the success of the fur trade business'],
    ev: [{ p: 'pre-8.8-p15', q: 'The role of the Aboriginal and métis women in these relationships was often critical to the success of the fur trade business.' }],
  },
  {
    id: 'women-bison-setback', kind: 'choice', big: 'women', lens: ['against-progress', 'contested'],
    prompt: 'The bison hunt of the late 1700s is usually told as the height of Plains culture. What was it likely for women?',
    answer: 'A setback',
    options: ['A gain in standing', 'No change at all', 'A move into the hunt'],
    must: ['For women, it is likely that the bison tradition emerging in the late 18th century was a setback'],
    ev: [{ p: 'pre-8.7-p9', q: 'For women, it is likely that the bison tradition emerging in the late 18th century was a setback. The hunt and warfare became a greater preoccupation and source of prestige for men, while women’s work increased in the butchering and preparation of meat.' }],
  },
  {
    id: 'women-carried-culture', kind: 'choice', big: 'women', lens: ['own-terms'],
    prompt: 'Women moved between Plains societies, by capture and otherwise. What moved with them?',
    answer: 'Their crafts, food and language',
    options: ['Their households’ horses', 'Their families’ land rights', 'Nothing they could keep'],
    must: ['They brought with them their skills in making handicrafts, clothes, tipis, and food, as well as their language'],
    ev: [{ p: 'pre-8.7-p9', q: 'They brought with them their skills in making handicrafts, clothes, tipis, and food, as well as their language, as they settled into a new, perhaps married, life in the adoptive community.' }],
  },
  {
    id: 'women-and-horses', kind: 'choice', big: 'women', lens: ['against-progress'],
    prompt: 'Horses and guns are the usual explanation for the emergent Plains culture. What does the record put almost level with them?',
    answer: 'Women',
    options: ['Missionaries', 'The fur companies', 'Disease'],
    must: ['The emergent Plains culture owed almost as much to women as it did to horses and guns'],
    ev: [{ p: 'pre-8.7-p9', q: 'The emergent Plains culture owed almost as much to women as it did to horses and guns.' }],
  },
  {
    id: 'women-dogs', kind: 'choice', big: 'women', depth: 'detail', lens: ['own-terms'],
    prompt: 'Plains peoples kept dogs in their hundreds, sometimes a thousand in one camp. Whose responsibility was the pack?',
    answer: 'Women’s',
    options: ['The hunters’', 'The children’s', 'The whole camp’s, in turn'],
    must: ['the larger pack was the responsibility of women in Plains culture'],
    ev: [{ p: 'pre-8.7-p4', q: 'Although hunting dogs worked and lived closely with Aboriginal men, the larger pack was the responsibility of women in Plains culture; they had to attend to everything from their feeding to training as pack animals to the culling of litters and preparing dog flesh for ceremonial feasts.' }],
  },

  // ── the new nation ────────────────────────────────────────────────────
  {
    id: 'metis-define', kind: 'choice', big: 'newnation', lens: ['own-terms'],
    prompt: 'The children of fur-trade families were of two ancestries. What did they come to define themselves as?',
    answer: 'Different from both',
    options: ['European, in law', 'Aboriginal, by kinship', 'Whatever a post required'],
    must: ['began to define themselves as different from both Aboriginal and European ancestries'],
    ev: [{ p: 'pre-8.8-p16', q: 'The people arising from these relationships began to define themselves as different from both Aboriginal and European ancestries.' }],
  },
  {
    id: 'michif', kind: 'choice', big: 'newnation', at: 1800, lens: ['record', 'own-terms'],
    prompt: 'Around 1800 a Métis language appeared. How was Michif built?',
    answer: 'French nouns with Cree verb phrases',
    options: ['Cree nouns with English verbs', 'French grammar with Ojibwe words', 'A simplified trading pidgin'],
    must: ['a Métis language, Michif, which mainly combined French nouns with Cree verb phrases'],
    ev: [{ p: 'pre-8.8-p9', q: 'A sure sign of the emergence of a self-sustaining culture was the appearance around 1800 of a Métis language, Michif, which mainly combined French nouns with Cree verb phrases.' }],
  },
  {
    id: 'michif-unique', kind: 'choice', big: 'newnation', depth: 'detail', lens: ['record'],
    prompt: 'Linguists call Michif a “mixed language” rather than a pidgin or creole. How common is that in North America?',
    answer: 'The only one, outside Alaska',
    options: ['One of a dozen or so', 'Common in trade regions', 'The record does not say'],
    must: ['outside of the Russian-Aleut communities in Alaska, constitutes the only true “mixed language,”'],
    ev: [{ p: 'pre-8.8-p9', q: '(This was an almost unique phenomenon in North America which, outside of the Russian-Aleut communities in Alaska, constitutes the only true “mixed language,” as opposed to a trading dialect or a pidgin.' }],
  },
  {
    id: 'pemmican', kind: 'choice', big: 'newnation', lens: ['economy'],
    prompt: 'Which trade became the Métis niche, and part of the New Nation’s identity?',
    answer: 'Pemmican',
    options: ['Beaver pelts', 'Timber', 'Whale oil'],
    must: ['It was the pemmican trade that became the Métis niche'],
    ev: [{ p: 'pre-8.8-p10', q: 'It was the pemmican trade that became the Métis niche, especially in what is now southeastern Manitoba and North Dakota. It was to define their relationship with newcomers on the northern Plains and it would become an important part of the “New Nation’s” identity.' }],
  },
  {
    id: 'metis-capital', kind: 'choice', big: 'newnation', lens: ['record', 'own-terms'],
    prompt: 'Written of a people rather than a parentage, the word is capitalised: Métis. What does the lower-case métis describe?',
    answer: 'A heritage, not a culture',
    options: ['A language', 'A legal status', 'A place of birth'],
    must: ['it is not capitalized in this instance, because it describes a heritage, not a culture'],
    ev: [{ p: 'pre-8.8-p11', q: 'Note that it is not capitalized in this instance, because it describes a heritage, not a culture.' }],
  },
];
