// World · The Caribbean and the Atlantic. OpenStax World History (wh1 ch. 8;
// wh2 ch. 5, 6, 7.3, 8), told from the islands outward: the people who were
// already there, the trade that emptied and refilled them, the lives made
// under it, and the revolution that began where the sugar was richest.
//
// The empire-and-abolition THREAD (th01) already asks about Adam Smith on
// Caribbean slavery, Mary Prince, the 1793 Upper Canada act and 1833. These
// questions deliberately stay off that ground and ask about the Atlantic
// system itself, so the two don't repeat each other.
export const GLOSSARY_FROM = ['wh1-8', 'wh2-5.2', 'wh2-5.3', 'wh2-5.4', 'wh2-6', 'wh2-8'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'The Atlantic world, 1400s–1800s';

export const BIG = [
  { id: 'crossing', q: 'Why did Europeans cross the Atlantic — and what did they meet?', src: ['wh2-5.2', 'wh2-5.3', 'wh1-8'],
    ev: [{ p: 'wh2-5.2-p60', q: 'With the fall of Constantinople to the Ottomans in 1453, Europeans found themselves forced to deal with Muslim middlemen to access the prized goods of South and East Asia.' }] },
  { id: 'slavery', q: 'What did the Atlantic slave trade take, and from whom?', src: ['wh2-5.4', 'wh2-6'],
    ev: [{ p: 'wh2-5.4-p37', q: 'European nations shipped approximately twelve million enslaved African people across the Atlantic Ocean' }] },
  { id: 'lives', q: 'What did people make of life under slavery?', src: ['wh2-5.4'],
    ev: [{ p: 'wh2-5.4-p38', q: 'Nevertheless, enslaved people established ties with one another and found ways to maintain their human dignity and aspects of their culture.' }] },
  { id: 'revolutions', q: 'Revolution for whom? Freedom in the Caribbean and Latin America', src: ['wh2-8'],
    ev: [{ p: 'wh2-8.1-p20', q: 'This revolt evolved into a full-fledged revolution that led to the colony’s independence and the declaration of the free republic of Haiti in 1804.' }] },
];

export default [
  // ── anchors: school history, with something added ──────────────────────
  {
    id: 'columbus-indies', kind: 'choice', big: 'crossing', at: 1492, lens: ['own-terms'],
    prompt: 'Columbus landed in the Caribbean in 1492. Where did he believe he was?',
    answer: 'In the Indies',
    options: ['In a new continent', 'Off the coast of Africa', 'In China itself'],
    must: ['believing it was part of the Indies'],
    ev: [{ p: 'wh2-5.2-p61', q: 'The Spanish monarchs Isabella I of Castille and Ferdinand II of Aragon financed the voyages of Christopher Columbus, who landed in the Caribbean in 1492 believing it was part of the Indies.' }],
  },
  {
    id: 'why-sail-west', kind: 'choice', big: 'crossing', at: 1453, lens: ['economy'],
    prompt: 'Why did European rulers start looking for an all-water route to Asia in the 1400s?',
    answer: 'Constantinople had fallen to the Ottomans',
    options: ['Their own ports had silted up', 'Asian goods had gone out of fashion', 'The land route had never existed'],
    must: ['fall of Constantinople to the Ottomans in 1453'],
    ev: [{ p: 'wh2-5.2-p60', q: 'With the fall of Constantinople to the Ottomans in 1453, Europeans found themselves forced to deal with Muslim middlemen to access the prized goods of South and East Asia.' }],
  },
  {
    id: 'tordesillas', kind: 'choice', big: 'crossing', at: 1494, depth: 'detail', lens: ['record'],
    prompt: 'Two years after Columbus returned, Spain and Portugal settled their claims by treaty at Tordesillas. What did it do?',
    answer: 'Drew a line through the Atlantic',
    options: ['Banned Portuguese ships from Africa', 'Gave the Caribbean to the Pope', 'Split Asia between them'],
    must: ['drew a line through the Atlantic'],
    ev: [{ p: 'wh2-5.2-p62', q: 'in 1494 Spain and Portugal negotiated the Treaty of Tordesillas, which drew a line through the Atlantic awarding the Americas, with the exception of Brazil, to Spain' }],
  },
  {
    id: 'exchange-east', kind: 'choice', big: 'crossing', lens: ['economy', 'against-progress'],
    prompt: 'Tomatoes, chili peppers, vanilla, pineapples and peanuts became staples of European, African and Asian cooking. Where had they come from?',
    answer: 'The Americas',
    options: ['India and the spice islands', 'West Africa', 'The Ottoman Mediterranean'],
    must: ['became culinary staples of nations in Europe, Africa, and Asia'],
    ev: [{ p: 'wh2-5.2-p50', q: 'Along with these foods, tomatoes, chili peppers, vanilla, manioc, pineapples, and peanuts were introduced to and became culinary staples of nations in Europe, Africa, and Asia.' }],
  },

  // ── what the crossing did ─────────────────────────────────────────────
  {
    id: 'disease-toll', kind: 'choice', big: 'crossing', lens: ['against-progress'],
    prompt: 'Diseases carried across the Atlantic met people with no immunity to them. How high do some scholars estimate the death rate was?',
    answer: 'As high as 95 per cent',
    options: ['About 10 per cent', 'About a quarter', 'Roughly half'],
    must: ['as high as 95 percent'],
    ev: [{ p: 'wh2-5.2-p54', q: 'native peoples without natural immunity who contracted them experienced a death rate that some scholars estimate was as high as 95 percent' }],
  },
  {
    id: 'taino-hispaniola', kind: 'choice', big: 'crossing', at: 1514, lens: ['against-progress', 'record'],
    prompt: 'The Taíno of Hispaniola numbered at least several hundred thousand in 1492. How many remained by 1514?',
    answer: 'About thirty-two thousand',
    options: ['About half of them', 'Roughly two hundred thousand', 'None at all'],
    must: ['only about thirty-two thousand Taíno remained'],
    ev: [{ p: 'wh2-5.4-p3', q: 'By 1514, however, only about thirty-two thousand Taíno remained.' }],
  },
  {
    id: 'taino-cause', kind: 'choice', big: 'crossing', lens: ['record', 'contested'],
    prompt: 'The Taíno of Hispaniola were killed by the Spanish, worked to death in forced labour, and struck by disease. Which took the most?',
    answer: 'Disease',
    options: ['Killings', 'Forced labour', 'Flight from the island'],
    must: ['The vast majority, though, had died of disease'],
    ev: [{ p: 'wh2-5.4-p3', q: 'Some had been deliberately killed by the Spanish, and others had died from hard labor and poor living conditions after being enslaved. The vast majority, though, had died of disease.' }],
  },
  {
    id: 'encomienda-what', kind: 'choice', big: 'crossing', depth: 'detail', lens: ['economy'],
    prompt: 'Spain rewarded its conquistadors with an encomienda. What did the holder receive?',
    answer: 'The labour of conquered people',
    options: ['A title at the Spanish court', 'A share of the royal silver fleet', 'Freehold of an island'],
    must: ['entitled the holder, called an encomendero, to the labor of a specified number of conquered people'],
    ev: [{ p: 'wh2-5.2-p23', q: 'the encomienda, a hereditary grant that entitled the holder, called an encomendero, to the labor of a specified number of conquered people, or to a tribute of precious metals or agricultural produce' }],
  },
  {
    id: 'negotiators-to-europe', kind: 'choice', big: 'crossing', lens: ['against-progress', 'own-terms'],
    prompt: 'Traffic across the Atlantic is usually pictured going one way. What were dozens of Indigenous negotiators doing by the 1600s?',
    answer: 'Sailing to Europe to petition monarchs',
    options: ['Refusing all contact with Europe', 'Serving in European armies', 'Studying in Spanish universities'],
    must: ['dozens of Indigenous negotiators had gone to Europe to appeal directly to the monarchs'],
    ev: [{ p: 'wh2-5.2-p59', q: 'By the seventeenth century, dozens of Indigenous negotiators had gone to Europe to appeal directly to the monarchs for aid and for military and economic benefits.' }],
  },

  // ── the trade ─────────────────────────────────────────────────────────
  {
    id: 'trade-scale', kind: 'choice', big: 'slavery', lens: ['record'],
    prompt: 'Across some three and a half centuries, how many enslaved African people did European nations ship across the Atlantic?',
    answer: 'About twelve million',
    options: ['About one million', 'About four million', 'About fifty million'],
    must: ['approximately twelve million enslaved African people'],
    ev: [{ p: 'wh2-5.4-p37', q: 'European nations shipped approximately twelve million enslaved African people across the Atlantic Ocean on the Middle Passage. Some ten million arrived alive' }],
  },
  {
    id: 'where-taken', kind: 'choice', big: 'slavery', lens: ['against-progress'],
    prompt: 'Most people carried across the Atlantic in chains were taken where?',
    answer: 'To the Caribbean and Brazil',
    options: ['To the colonies of North America', 'To Spain and Portugal', 'To the Pacific coast'],
    must: ['destined to labor on sugar plantations in the Caribbean and Brazil'],
    ev: [{ p: 'wh2-5.4-p3', q: 'The majority of Africans brought across the Atlantic were destined to labor on sugar plantations in the Caribbean and Brazil. Many enslaved Africans were also sent to the Spanish colonies in South America; relatively few went to the North American mainland, mostly Mexico.' }],
  },
  {
    id: 'middle-passage-why', kind: 'choice', big: 'slavery', depth: 'detail', lens: ['record'],
    prompt: 'Why is the voyage that carried enslaved Africans across the Atlantic called the Middle Passage?',
    answer: 'It was the middle leg of three',
    options: ['It crossed the middle of the ocean', 'It ran along the equator', 'It took half a year'],
    must: ['because it was the middle (or second) leg of the three-legged exchange'],
    ev: [{ p: 'wh2-5.4-p7', q: 'This journey was called the Middle Passage because it was the middle (or second) leg of the three-legged exchange.' }],
  },
  {
    id: 'rum-molasses', kind: 'choice', big: 'slavery', lens: ['economy'],
    prompt: 'Molasses from Caribbean sugar was shipped north to English settlers in Massachusetts. What did they make of it?',
    answer: 'Rum, traded in Africa for captives',
    options: ['Sugar for the London market', 'Feed for their livestock', 'Medicine sold to the Spanish'],
    must: ['who transformed it into rum and shipped that to England'],
    ev: [{ p: 'wh2-5.4-p8', q: 'The plantation owners then shipped molasses, a by-product of sugar production, to other English settlers in the colony of Massachusetts, who transformed it into rum and shipped that to England. English ship captains in Africa then exchanged rum along with manufactured products like cloth, guns, and ammunition for captives.' }],
  },
  {
    id: 'guns-cycle', kind: 'choice', big: 'slavery', lens: ['economy', 'contested'],
    prompt: 'European traders exchanged cloth, guns and ammunition for captives at African ports. What did those guns then do?',
    answer: 'Served to capture more people',
    options: ['Armed Europeans against the Ottomans', 'Were melted down for tools', 'Went unused, as trophies'],
    must: ['African slave traders used the guns to capture more people'],
    ev: [{ p: 'wh2-5.4-p8', q: 'African slave traders used the guns to capture more people to send along the Middle Passage, and the cycle continued.' }],
  },
  {
    id: 'packing', kind: 'choice', big: 'slavery', at: 1713, depth: 'detail', lens: ['record'],
    prompt: 'In 1713 a British slave-trading company told its captains how much room each enslaved person should be allotted below deck. How wide?',
    answer: 'Eleven inches',
    options: ['Three feet', 'Six feet', 'Two yards'],
    must: ['five feet long, eleven inches wide, and twenty inches high'],
    ev: [{ p: 'wh2-5.4-p9', q: 'In 1713, the Royal Africa Company, a British company, instructed captains that enslaved people should be allotted a space five feet long, eleven inches wide, and twenty inches high.' }],
  },
  {
    id: 'deaths-expected', kind: 'choice', big: 'slavery', lens: ['economy'],
    prompt: 'Captains knew that 10 to 20 per cent of the people in the hold would die on the voyage. How did they respond?',
    answer: 'By packing in as many as possible',
    options: ['By carrying fewer, in better conditions', 'By shortening the route', 'By refusing the trade'],
    must: ['packed as many people as possible into the hold'],
    ev: [{ p: 'wh2-5.4-p9', q: 'Some captains, knowing that 10 to 20 percent would die on the voyage, packed as many people as possible into the hold, hoping enough would survive to earn them a good profit.' }],
  },

  // ── sugar ─────────────────────────────────────────────────────────────
  {
    id: 'sugar-labour', kind: 'choice', big: 'slavery', lens: ['economy'],
    prompt: 'Of all the crops grown by enslaved people, which was the most valuable — and needed the most labour?',
    answer: 'Sugar',
    options: ['Tobacco', 'Rice', 'Cotton'],
    must: ['Sugar, the most valuable crop grown by enslaved people, also required the most labor'],
    ev: [{ p: 'wh2-5.4-p26', q: 'Sugar, the most valuable crop grown by enslaved people, also required the most labor, and sugar plantations often contained hundreds of workers.' }],
  },
  {
    id: 'cane-24-hours', kind: 'choice', big: 'slavery', depth: 'detail', lens: ['economy'],
    prompt: 'Cut cane had to reach the mill within twenty-four hours. Why?',
    answer: 'The sap evaporated quickly',
    options: ['The cane caught fire easily', 'Insects destroyed it overnight', 'The mill ran only at dawn'],
    must: ['because the sap evaporated quickly'],
    ev: [{ p: 'wh2-5.4-p27', q: 'This had to be done very quickly, within twenty-four hours of cutting the cane, because the sap evaporated quickly.' }],
  },
  {
    id: 'barbados-sugar', kind: 'choice', big: 'slavery', at: 1650, depth: 'detail', lens: ['economy'],
    prompt: 'Barbados shipped about five thousand tons of sugar to England in 1650. What had happened fifty years later?',
    answer: 'The amount had doubled',
    options: ['It had fallen by half', 'It was roughly unchanged', 'The island had stopped growing cane'],
    must: ['Fifty years later, that amount had doubled'],
    ev: [{ p: 'wh2-5.4-p34', q: 'In 1650, planters in Barbados alone shipped about five thousand tons of sugar to England. Fifty years later, that amount had doubled.' }],
  },

  // ── the lives made under it ───────────────────────────────────────────
  {
    id: 'kin-networks', kind: 'choice', big: 'lives', lens: ['own-terms'],
    prompt: 'Taken from their families, enslaved people called fellow labourers “brother” and “aunt”. What were they doing?',
    answer: 'Forming new kin networks',
    options: ['Obeying a rule of the plantation', 'Copying their enslavers’ manners', 'Marking work gangs apart'],
    must: ['They formed new kin networks'],
    ev: [{ p: 'wh2-5.4-p33', q: 'They formed new kin networks, calling fellow laborers “brother” and “aunt” to replace the relatives from whom they had been taken.' }],
  },
  {
    id: 'resistance-forms', kind: 'choice', big: 'lives', lens: ['own-terms', 'against-progress'],
    prompt: 'Resistance on the plantations is often pictured as armed revolt alone. What else did enslaved people do?',
    answer: 'Broke tools and burned the cane',
    options: ['Petitioned the colonial courts', 'Bought their freedom in numbers', 'Refused all religion'],
    must: ['They damaged tools, sabotaged machinery, and set fire to cane fields'],
    ev: [{ p: 'wh2-5.4-p33', q: 'They damaged tools, sabotaged machinery, and set fire to cane fields and barns full of sugar awaiting export to Europe.' }],
  },
  {
    id: 'jamaica-runaways', kind: 'choice', big: 'lives', depth: 'detail', lens: ['own-terms'],
    prompt: 'Where did people who ran from Jamaica’s plantations build communities of their own?',
    answer: 'In the mountains',
    options: ['On the coast, near the ports', 'On neighbouring Cuba', 'In the towns, in hiding'],
    must: ['in the mountains of Jamaica, runaways formed communities and lived in hiding'],
    ev: [{ p: 'wh2-5.4-p33', q: 'They ran away; in the mountains of Jamaica, runaways formed communities and lived in hiding.' }],
  },

  // ── the revolution ────────────────────────────────────────────────────
  {
    id: 'saint-domingue-wealth', kind: 'choice', big: 'revolutions', lens: ['economy'],
    prompt: 'In the 1700s one French colony on Hispaniola supplied roughly 40 per cent of Europe’s sugar and nearly half its coffee. Which?',
    answer: 'Saint-Domingue',
    options: ['Martinique', 'Guadeloupe', 'Louisiana'],
    must: ['Saint-Domingue on the island of Hispaniola yielded roughly 40 percent of the sugar'],
    ev: [{ p: 'wh2-7.3-p32', q: 'As France’s wealthiest colony, Saint-Domingue on the island of Hispaniola yielded roughly 40 percent of the sugar and nearly half the coffee imported to Europe in the eighteenth century.' }],
  },
  {
    id: 'haiti-unique', kind: 'choice', big: 'revolutions', at: 1791, lens: ['against-progress'],
    prompt: 'The American revolution was led by colonists of European descent seeking representation. Who fought the revolution in Saint-Domingue?',
    answer: 'Those lowest in the social order',
    options: ['The colony’s white planters', 'Merchants in the ports', 'Officers sent from France'],
    must: ['fought by those at the lowest levels of the social hierarchy'],
    ev: [{ p: 'wh2-8.1-p20', q: 'instead, the struggle for independence in Saint-Domingue was fought by those at the lowest levels of the social hierarchy' }],
  },
  {
    id: 'bois-caiman', kind: 'choice', big: 'revolutions', at: 1791, depth: 'detail', lens: ['record'],
    prompt: 'In August 1791 people planning a rebellion in Saint-Domingue met in woods at Bois Caïman. What sealed their pact?',
    answer: 'A Vodou ritual',
    options: ['An oath to the French assembly', 'A signed charter', 'A Catholic mass'],
    must: ['to formalize their pact in a Vodou ritual'],
    ev: [{ p: 'wh2-7.3-p34', q: 'In August 1791, a group of enslaved people planning a rebellion met in a heavily wooded area known as Bois Caïman to formalize their pact in a Vodou ritual overseen by Dutty Boukman, a Vodou priest from Jamaica.' }],
  },
  {
    id: 'louverture-end', kind: 'choice', big: 'revolutions', at: 1802, lens: ['record'],
    prompt: 'Toussaint Louverture freed the enslaved people of Hispaniola in 1801. How did his own life end?',
    answer: 'In a French prison',
    options: ['In battle on the island', 'As Haiti’s first president', 'In exile in the United States'],
    must: ['spent the brief remainder of his life in a French prison'],
    ev: [{ p: 'wh2-7.3-p38', q: 'After being deported to France, Louverture spent the brief remainder of his life in a French prison, writing his memoirs to defend himself against charges of treason.' }],
  },
  {
    id: 'haiti-name', kind: 'choice', big: 'revolutions', at: 1804, depth: 'detail', lens: ['own-terms', 'record'],
    prompt: 'Independent in 1804, the new republic took the name Haiti. Where does the word come from?',
    answer: 'The Taíno language',
    options: ['A French royal title', 'A Yoruba word for freedom', 'The name of a battle'],
    must: ['derived from the Taíno language of the precolonial people'],
    ev: [{ p: 'wh2-7.3-p45', q: 'Dessalines and his victorious forces thereafter renamed their country Haiti, a term meaning mountainous that derived from the Taíno language of the precolonial people.' }],
  },
  {
    id: 'haiti-debt', kind: 'choice', big: 'revolutions', at: 1825, lens: ['economy', 'against-progress'],
    prompt: 'Twenty-one years after Haiti won its independence, France exacted something that crippled the country’s economy. What?',
    answer: 'An enormous independence debt',
    options: ['A naval base on the coast', 'The return of the plantations', 'A ban on growing sugar'],
    must: ['France imposed an exorbitant independence debt'],
    ev: [{ p: 'wh2-7.3-p45', q: 'in 1825, France imposed an exorbitant independence debt that devastated the new country’s economy for many years thereafter' }],
  },
  {
    id: 'haiti-equality', kind: 'choice', big: 'revolutions', lens: ['contested', 'against-progress'],
    prompt: 'Did the revolution in Haiti bring lasting equality to everyone?',
    answer: 'No — a new hierarchy formed',
    options: ['Yes, from the first year', 'Yes, once the debt was paid', 'The record does not say'],
    must: ['the Haitian Revolution did not bring lasting equality for all'],
    ev: [{ p: 'wh2-7.3-p45', q: 'Thus, the Haitian Revolution did not bring lasting equality for all, but it did remove racial inequalities even though the gens de couleur libres brought an element of race into their views.' }],
  },
  {
    id: 'bolivar-petion', kind: 'choice', big: 'revolutions', lens: ['economy'],
    prompt: 'Fighting the Spanish in South America, Simón Bolívar won help from Haiti’s president Pétion. What did he promise in return?',
    answer: 'To abolish slavery',
    options: ['A share of Peru’s silver', 'Ships for the Haitian navy', 'To take the Spanish islands'],
    must: ['By promising to abolish slavery, Bolívar won the help of Haiti’s president Alexandre Pétion'],
    ev: [{ p: 'wh2-8.3-p43', q: 'By promising to abolish slavery, Bolívar won the help of Haiti’s president Alexandre Pétion.' }],
  },
];
