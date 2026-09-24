// Canada · Chapter 2 · before contact.
//
// The pack opens HERE, not at Cartier: the northern half of the continent on
// its own terms, fourteen thousand years deep, with its own records, cities,
// economies and arguments. Europeans do not appear until the last question.
//
// Every question carries `ev`: the paragraph it rests on and the exact words
// from it. build/verify.mjs fails the build if any quote is not found verbatim
// in that paragraph, or if the answer is not supported by the quoted words
// (`must` lists the words that have to be there; it defaults to the answer).
//
// `lens` tags say which thread of the brief a question serves:
//   own-terms        a society described by what it was, not by what it lacked
//   against-progress the "primitive / unchanging / new world" story, refuted
//   economy          exchange, credit, gift, currency, obligation
//   record           how the past was kept: oral, written, landscape
//   contested        the source itself says this is uncertain — asked as such

// Belshaw's own Key Terms for these chapters become generated glossary questions.
export const GLOSSARY_FROM = ['pre-2'];

// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'Turtle Island, to about 1450';

export const BIG = [
  { id: 'records', q: 'How do we know a past that kept no archives?',
    ev: [{ p: 'pre-2.2-p21', q: 'The dearth of a written record does not mean there is no record at all.' },
      { p: 'pre-2.2-p22', q: 'Oral traditions and histories are as reliable as written primary sources.' }] },
  { id: 'origins', q: 'Where does the story begin — and who gets to say?',
    ev: [{ p: 'pre-2.3-p34', q: 'Aboriginal peoples’ traditions point to occupation of “Turtle Island” since time immemorial.' },
      { p: 'pre-2.3-p33', q: 'archaeological evidence keeps pushing back the arrival dates.' }] },
  { id: 'worlds', q: 'What kinds of societies were here before Europe arrived?',
    ev: [{ p: 'pre-2.5-p11', q: 'Aboriginal societies at contact defy simple categorization by language, economic activity, or location.' },
      { p: 'pre-2.4-p31', q: 'Elaborate agricultural societies with some measure of urbanization appeared in the Mississippi and Ohio Valleys around 500 CE' }] },
  { id: 'exchange', q: 'How did people trade, bind one another, and shape the land?',
    ev: [{ p: 'pre-2.4-p33', q: 'Pre-contact societies included hunter-gatherers, farmers, and seafaring mammal hunters, all of whom were engaged in commerce.' }] },
];

export default [
  // ── the bigger picture (from the author's Key Points) ──────────────────
  {
    id: 'oral-standard', kind: 'choice', big: 'records', lens: ['record'],
    prompt: 'Many nations kept their history by telling it, generation to generation. As evidence, how reliable are these oral traditions?',
    answer: 'Equally reliable, tested the same way',
    options: ['Less reliable: memory always drifts', 'Useful only where nothing was written', 'Reliable only when archaeology agrees'],
    must: ['as reliable as written primary sources', 'same tests of verifiability and reliability'],
    ev: [{ p: 'pre-2.2-p22', q: 'Oral traditions and histories are as reliable as written primary sources. They are subject to the same tests of verifiability and reliability.' }],
  },
  {
    id: 'cities-declining', kind: 'choice', big: 'worlds', lens: ['against-progress', 'own-terms'],
    prompt: 'The Mississippi and Ohio valleys had farming towns and cities from about 500 CE. What was happening to them before Europeans came?',
    answer: 'They were already in decline',
    options: ['They were still growing fast', 'They had only just been founded', 'They were joining into one empire'],
    must: ['began to decline in the century or so before contact'],
    ev: [{ p: 'pre-2.4-p31', q: 'Elaborate agricultural societies with some measure of urbanization appeared in the Mississippi and Ohio Valleys around 500 CE and began to decline in the century or so before contact with Europeans.' }],
  },
  {
    id: 'population-peak', kind: 'choice', big: 'worlds', lens: ['against-progress'],
    prompt: 'Was the population of the Americas at its height in the late 1400s?',
    answer: 'Perhaps not — it may have been higher centuries earlier',
    options: ['Yes — it had never been higher', 'No — the land was nearly empty then', 'Nobody lived in most of it yet'],
    must: ['not as numerous as they were a few hundred years earlier'],
    ev: [{ p: 'pre-2.5-p12', q: 'Population estimates suggest that humans were very numerous in the Americas in the late 1400s but perhaps not as numerous as they were a few hundred years earlier.' }],
  },
  {
    id: 'arrival-earlier', kind: 'choice', big: 'origins', lens: ['contested'],
    prompt: 'What keeps happening to the dates for when people first reached the Americas?',
    answer: 'New evidence keeps pushing them earlier',
    options: ['They have been fixed since the 1950s', 'New finds keep making them later', 'They depend only on oral tradition'],
    must: ['keeps pushing back the arrival dates'],
    ev: [{ p: 'pre-2.3-p33', q: 'The timing of early human occupation of the Americas is uncertain and archaeological evidence keeps pushing back the arrival dates.' }],
  },

  // ── records ────────────────────────────────────────────────────────────
  {
    id: 'grease-trails', kind: 'choice', big: 'exchange', depth: 'detail', lens: ['record', 'economy'],
    prompt: 'The grease trails of the Chilcotin Plateau linked the coast to the interior. Why the name?',
    answer: 'Freight-bearers carried oolichan grease, a fish oil, along them',
    options: ['They followed the fat-rich salmon runs inland', 'Travellers paid their way in rendered bear fat', 'The trails were greased to drag canoes between rivers'],
    must: ['oolichan grease'],
    ev: [{ p: 'pre-2.2-p7', q: 'They were called grease trails because of the trade in oolichan grease (a fish oil) that was ported on the backs of hundreds of freight-bearers over hundreds of kilometres.' }],
  },
  {
    id: 'trail-markers', kind: 'choice', big: 'records', lens: ['record', 'own-terms'],
    prompt: 'Trails across the land carried rock cairns, markers and boundaries. In a society that keeps its history by memory, what do they do?',
    answer: 'They work like volumes on a shelf, prompting memory',
    options: ['They mark who owns each stretch of the trail', 'They warn travellers off sacred ground', 'They count the days of a journey'],
    must: ['volumes on a shelf'],
    ev: [{ p: 'pre-2.2-p8', q: 'In societies with a strong oral tradition, these are stimulants to memory. They act just as a series of volumes on a shelf might.' }],
  },
  {
    id: 'birchbark-scrolls', kind: 'choice', big: 'records', lens: ['record', 'against-progress'],
    prompt: 'Which nation made birchbark scrolls, some carbon-dated to the mid-1500s — the nearest thing in Canada to a written script?',
    answer: 'The Anishinaabeg',
    options: ['The Wendat', 'The Mi’kmaq', 'The Haida'],
    ev: [{ p: 'pre-2.2-p13', q: 'The nearest equivalent or comparable script known in Canada are the birchbark scrolls prepared by members of the Anishinaabeg nation.' },
      { p: 'pre-2.2-p13', q: 'have been carbon-dated to the mid-16th century' }],
  },
  {
    id: 'midewiwin', kind: 'choice', big: 'records', depth: 'detail', lens: ['record'],
    prompt: 'As the birchbark scrolls grew fragile, who preserved and recopied them?',
    answer: 'The Midewiwin, a medicine society',
    options: ['Jesuit missionaries at Sainte-Marie', 'The Hudson’s Bay Company’s clerks', 'The Grand Council of the Haudenosaunee'],
    must: ['Midewiwin'],
    ev: [{ p: 'pre-2.2-p13', q: 'A secret or at least semi-secret medicine society called Midewiwin was responsible for preserving and reproducing scrolls as they became more fragile or at risk from missionaries and colonial administrators.' }],
  },
  {
    id: 'giant-beaver', kind: 'choice', big: 'records', lens: ['record', 'against-progress'],
    prompt: 'Oral traditions told of a giant beaver that outsiders took for myth. What did the bones show?',
    answer: 'It was real: up to 2.5 metres long, extinct about 10,000 years ago',
    options: ['It was a moose, misremembered', 'It was a Norse story that reached Canada after 1000 CE', 'It was real, but lived only in Siberia'],
    must: ['2.5 metres', '10,000 years ago'],
    ev: [{ p: 'pre-2.2-p17', q: 'We now know the stories about gargantuan beavers are true: their skeletal remains have been found throughout Canada, some of them measuring 2.5 metres in length' },
      { p: 'pre-2.2-p17', q: 'These massive rodents became extinct about 10,000 years ago' }],
  },
  {
    id: 'wickwire-fraser', kind: 'choice', big: 'records', lens: ['record'],
    prompt: 'The Nlaka’pamux remember their first meeting with a European in their own oral history. A historian set it beside that European’s written account. Whose?',
    answer: 'Simon Fraser’s, from 1808',
    options: ['Jacques Cartier’s, from 1535', 'Samuel de Champlain’s, from 1609', 'George Vancouver’s, from 1792'],
    must: ['Simon Fraser', '1808'],
    ev: [{ p: 'pre-2.2-p15', q: 'Comparing the oral record of the Nlaka’pamux with fur trader and explorer Simon Fraser’s written account of contact in 1808, she found both remarkable similarities and revealing differences.' }],
  },
  {
    id: 'innis-speech', kind: 'choice', big: 'records', depth: 'detail', lens: ['record'],
    prompt: 'The thinker Harold Innis sorted media by what they carry best: ideas that last through time, like carvings in stone, or orders sent across distance. Which is speech?',
    answer: 'Time-biased: it lasts',
    options: ['Space-biased: it travels'],
    must: ['time-biased'],
    ev: [{ p: 'pre-2.2-p2', q: 'For Innis, speech is also a time-biased medium.' }],
  },
  {
    id: 'written-record-ignored', kind: 'choice', big: 'records', lens: ['against-progress', 'record'],
    prompt: 'The Americas had written records before Europeans arrived. Why do so many people believe they had none?',
    answer: 'Europeans ignored or destroyed the records that existed, and attacked oral tradition',
    options: ['No Indigenous society kept records of any kind', 'The records were written in scripts no one can read', 'The records were all lost to epidemics before contact'],
    must: ['ignore or attempt to destroy'],
    ev: [{ p: 'pre-2.2-p5', q: 'they had a written record, which the Europeans chose to ignore or attempt to destroy where it challenged their own media.' },
      { p: 'pre-2.2-p5', q: 'Consequently, it is a generally, and wrongly, held belief that the Americas (as we’ve come to call them) had no historic record.' }],
  },

  // ── the long past ──────────────────────────────────────────────────────
  {
    id: 'migration-story-served', kind: 'choice', big: 'origins', lens: ['against-progress'],
    prompt: 'Histories often open with migration routes into the Americas. Whose interest did the idea of Indigenous peoples as recent, wandering arrivals serve?',
    answer: 'European empires — it justified taking the land',
    options: ['Archaeologists, who needed funding for digs', 'The First Nations themselves, in treaty talks', 'No one; it was simply the best evidence of the day'],
    must: ['justified the dispossession'],
    ev: [{ p: 'pre-2.3-p1', q: 'This misperception, of course, served European empires in the Americas very well because it justified the dispossession of native peoples from their lands.' }],
  },
  {
    id: 'no-atlantic-roots', kind: 'choice', big: 'origins', lens: ['against-progress'],
    prompt: 'For centuries Europeans explained Indigenous peoples as “Lost Tribes of Israel” or wayward Welshmen. What does the DNA show?',
    answer: 'No sign of migration from Europe or Africa before 1492',
    options: ['A small Norse contribution among nations of the northeast', 'A Welsh line of descent in the Ohio Valley', 'Evidence split evenly between Asia and Europe'],
    must: ['no genetic indication of migration from Europe or Africa'],
    ev: [{ p: 'pre-2.3-p16', q: 'There is no genetic indication of migration from Europe or Africa' },
      { p: 'pre-2.3-p16', q: 'not one study has shown conclusive proof of European genetic markers among the Native American population before 1492.' }],
  },
  {
    id: 'maritime-archaic-currency', kind: 'choice', big: 'exchange', depth: 'detail', lens: ['economy', 'own-terms'],
    prompt: 'The Maritime Archaic people of the Atlantic coast (c. 7000–1500 BCE) traded over long distances. What did they use as currency?',
    answer: 'White chert, a quarried stone',
    options: ['Wampum shell beads', 'Copper nuggets from Lake Superior', 'Dried cod'],
    must: ['white chert', 'currency'],
    ev: [{ p: 'pre-2.3-p24', q: 'They engaged in long-distance trade, using as currency white chert, a rock quarried from northern Labrador to Maine.' }],
  },
  // ── anchors added 24 Sept 2026: the question audit found five pieces of
  // school history the app assumed and never asked.
  {
    id: 'turtle-island', kind: 'choice', big: 'origins', lens: ['own-terms', 'record'],
    prompt: 'Origin stories across the hemisphere say the land was made for the people, and the people made to inhabit it. What do those traditions say about how long people have been here?',
    answer: 'Since time immemorial',
    options: ['Since the last ice age', 'Since about 1000 CE', 'They do not say'],
    must: ['Aboriginal peoples’ traditions point to occupation of “Turtle Island” since time immemorial'],
    ev: [{ p: 'pre-2.3-p34', q: 'Aboriginal peoples’ traditions point to occupation of “Turtle Island” since time immemorial.' }],
  },
  {
    id: 'origin-stories-enough', kind: 'choice', big: 'origins', lens: ['contested', 'record'],
    prompt: 'Archaeology argues about Beringia and coastal routes. How do the peoples whose origins are being argued over treat their own origin stories?',
    answer: 'As sufficient to their needs as history',
    options: ['As stories for children', 'As second to the science', 'As lost beyond recovery'],
    must: ['these stories are invoked by Aboriginal peoples as sufficient to their needs as regards history'],
    ev: [{ p: 'pre-2.3-p18', q: 'It is also the case that these stories are invoked by Aboriginal peoples as sufficient to their needs as regards history.' }],
  },
  {
    id: 'cabot-1497', kind: 'choice', big: 'worlds', at: 1497, lens: ['against-progress'],
    prompt: 'John Cabot and his crew may have briefly visited one small patch of the northern half of North America in 1497. What was that landscape at the time?',
    answer: 'More populous than for centuries after',
    options: ['Almost empty of people', 'Newly settled from the south', 'Mapped in detail in Europe'],
    must: ['was a vastly more populous and rich human environment than would re-emerge here until the 19th century'],
    ev: [{ p: 'pre-1.1-p4', q: 'The “Canada” of 1497 — one small patch of which may have been briefly visited by John Cabot and his crew — was a vastly more populous and rich human environment than would re-emerge here until the 19th century.' }],
  },
  {
    id: 'three-sisters', kind: 'choice', big: 'worlds', depth: 'detail', lens: ['own-terms'],
    prompt: 'Why do the “three sisters” — corn, beans and squash — grow better together?',
    answer: 'Corn holds up beans, squash shades the soil, beans feed it nitrogen',
    options: ['Each keeps away the insects that would eat the others', 'They ripen at different times, spreading the work of harvest', 'Squash roots break up hard soil so the corn roots go deeper'],
    must: ['pole', 'shade that retained moisture', 'nitrogen'],
    ev: [{ p: 'pre-2.3-p26', q: 'The corn grew tall and provided a “pole” for the beans to grow up and around, and the large squash leaves provided shade that retained moisture and inhibited the growth of weeds. As well, beans, which are “nitrogen fixers,” returned nitrogen back into the soil that the corn crops stripped out during growth.' }],
  },
  {
    id: 'tenochtitlan', kind: 'choice', big: 'worlds', lens: ['own-terms', 'against-progress'],
    prompt: 'What was Tenochtitlan, the Aztec capital, in the late 1400s?',
    answer: 'One of the largest cities on the planet',
    options: ['A seasonal ceremonial site, empty most of the year', 'A trading post of a few thousand people', 'A ruin, abandoned since the Mayan decline'],
    must: ['one of the largest cities on the planet'],
    ev: [{ p: 'pre-2.3-p28', q: 'The Aztec capital of Tenochtitlan was, in the late 1400s, one of the largest cities on the planet and possibly the most beautiful' }],
  },

  // ── cities, villages, confederacies ────────────────────────────────────
  {
    id: 'cahokia-lisbon', kind: 'choice', big: 'worlds', lens: ['own-terms', 'against-progress'],
    prompt: 'Cahokia’s 120 mounds, across the Mississippi from today’s St. Louis, took enormous labour. About how much earth did its builders move?',
    answer: 'About 1.5 million cubic metres',
    options: ['About 40,000 cubic metres', 'About 300,000 cubic metres', 'About 9 million cubic metres'],
    must: ['1.5 million cubic metres of earth'],
    ev: [{ p: 'pre-2.4-p6', q: 'Cahokia’s mounds took tremendous effort to build; labourers moved about 1.5 million cubic metres of earth in their construction.' },
      { p: 'pre-2.4-p6', q: 'Cahokia was a walled complex made up of 120 mounds that housed perhaps as many as 30,000 people, making it a very large city for its day, certainly as large as contemporary Lisbon, Portugal.' }],
  },
  {
    id: 'cahokia-woodhenge', kind: 'choice', big: 'worlds', depth: 'detail', lens: ['own-terms'],
    prompt: 'Cahokia was a city on the Mississippi, across from today’s St. Louis. Its builders raised a “woodhenge,” a great circle of wooden posts. What was it for?',
    answer: 'A calendar: it marked sunrise at solstices and equinoxes',
    options: ['A rack for drying hides and meat in the sun', 'A frame for smoking fish over a fire', 'A fence around the chief’s household on the plaza'],
    must: ['solstices and equinoxes', 'calendar'],
    ev: [{ p: 'pre-2.4-p6', q: 'with poles in the henge marked to indicate the sun’s rising point on the solstices and equinoxes, making it a kind of community calendar or town-square clock.' }],
  },
  {
    id: 'cahokia-rivers', kind: 'choice', big: 'worlds', lens: ['economy'],
    prompt: 'Why did Cahokia become a centre of power?',
    answer: 'It sat where three rivers meet, and controlled the trade',
    options: ['It held the only copper mines in the continent', 'It was the first place maize was grown', 'It was protected by mountains on three sides'],
    must: ['confluence of the Mississippi, Illinois, and Missouri Rivers', 'control much of the regional commerce'],
    ev: [{ p: 'pre-2.4-p7', q: 'Cahokia became a centre of power in part because of its location near the confluence of the Mississippi, Illinois, and Missouri Rivers. This confluence allowed the chiefdom to control much of the regional commerce' }],
  },
  {
    id: 'mississippian-uncle', kind: 'choice', big: 'worlds', depth: 'detail', lens: ['own-terms'],
    prompt: 'Mississippian descent ran through the mother’s line. Who was a boy’s most important male figure?',
    answer: 'His mother’s brother',
    options: ['His father', 'His father’s eldest brother', 'The chief of his town'],
    must: ['mother’s brother'],
    ev: [{ p: 'pre-2.4-p3', q: 'Boys looked to their mother’s brother as an important male figure rather than to their father' }],
  },
  {
    id: 'keatley-creek', kind: 'choice', big: 'worlds', lens: ['own-terms', 'against-progress'],
    prompt: 'Keatley Creek, above the Fraser Canyon, was a village of up to 115 pit houses. Why does it matter to the story of how towns begin?',
    answer: 'A dense town built on salmon, not on farming',
    options: ['It proves farming reached British Columbia before Mexico', 'It was founded by migrants from Cahokia', 'It shows towns only grew up around trading posts'],
    must: ['salmon runs', 'challenge to the model of agriculture-led town development'],
    ev: [{ p: 'pre-2.4-p8', q: 'established an economy based on the salmon runs in the river below their plateau village' },
      { p: 'pre-2.4-p8', q: 'It also provides a challenge to the model of agriculture-led town development.' }],
  },
  {
    id: 'head-smashed-in', kind: 'choice', big: 'exchange', depth: 'detail', lens: ['own-terms'],
    prompt: 'Head-Smashed-In, the buffalo jump near Lethbridge, was used into historic times. When did it first come into use?',
    answer: 'About 5,700 years ago',
    options: ['About 150 years ago', 'About 1,500 years ago', 'About 12,000 years ago'],
    must: ['5,700 years ago'],
    ev: [{ p: 'pre-2.4-p11', q: 'Head-Smashed-In (not far from present-day Lethbridge), which first came into use about 5,700 years ago.' }],
  },
  {
    id: 'counting-coup', kind: 'choice', big: 'worlds', depth: 'detail', lens: ['own-terms'],
    prompt: 'In Plains warfare, what was the most highly valued coup?',
    answer: 'Touching a live enemy and living to tell about it',
    options: ['Killing the enemy’s war leader in open battle', 'Capturing the enemy’s horses from their camp', 'Wounding the enemy from far away'],
    must: ['touch a live enemy'],
    ev: [{ p: 'pre-2.4-p12', q: 'The most highly valued coup was to touch a live enemy and live to tell about it.' }],
  },
  {
    id: 'confederacies-feuds', kind: 'choice', big: 'worlds', lens: ['own-terms'],
    prompt: 'The Haudenosaunee and Wendat confederacies formed in the 500 years before contact. What were they an effective means of reducing?',
    answer: 'Long-running blood feuds between bands and clans',
    options: ['Competition with European traders', 'The risk of famine in bad years', 'Disputes over hunting grounds with the Cree'],
    must: ['long-running blood feuds'],
    ev: [{ p: 'pre-2.4-p14', q: 'These alliances were an effective means of reducing the prospect of long-running blood feuds between many bands and clans' }],
  },

  // ── exchange and obligation ────────────────────────────────────────────
  {
    id: 'wampum-record', kind: 'choice', big: 'records', lens: ['economy', 'record'],
    prompt: 'Wampum shells had a currency value. Strung on belts and in patterns, what else were they?',
    answer: 'A record: they held the details of treaties and agreements',
    options: ['Badges of rank that showed a person’s clan', 'Tokens of mourning, buried with the dead', 'Decoration, worn for beauty and nothing more'],
    must: ['mnemonic devices to record the details of treaties'],
    ev: [{ p: 'pre-2.4-p16', q: 'had a currency value but were often assembled in strings, on belts, and otherwise in patterns that served as mnemonic devices to record the details of treaties or other agreements.' }],
  },
  {
    id: 'potlatch-witness', kind: 'choice', big: 'exchange', lens: ['economy', 'own-terms'],
    prompt: 'At a potlatch the host gave property away. What did a guest take on by accepting it?',
    answer: 'A duty to witness that the event was legitimate',
    options: ['A share in the host’s fishing grounds', 'Membership in the host’s kin group', 'A place in the host’s war party'],
    must: ['witness to the legitimacy of the event'],
    ev: [{ p: 'pre-2.4-p24', q: 'In receiving property at a potlatch an attendee was committing to act as a witness to the legitimacy of the event being celebrated.' }],
  },
  {
    id: 'everyone-traded', kind: 'choice', big: 'exchange', lens: ['economy', 'against-progress'],
    prompt: 'Before contact, some peoples hunted and gathered, some farmed, and some hunted sea mammals from boats. Which of them traded?',
    answer: 'All of them',
    options: ['Only the farmers, who had surplus', 'Only the coastal peoples', 'None; exchange arrived with the fur trade'],
    must: ['all of whom were engaged in commerce'],
    ev: [{ p: 'pre-2.4-p33', q: 'Pre-contact societies included hunter-gatherers, farmers, and seafaring mammal hunters, all of whom were engaged in commerce.' }],
  },
  {
    id: 'made-landscapes', kind: 'choice', big: 'exchange', lens: ['against-progress', 'own-terms'],
    prompt: 'Settlers in the Pacific Northwest saw open berry patches and camas meadows as natural and free for the taking. What were they?',
    answer: 'Human-made, kept open by centuries of controlled burning',
    options: ['Natural meadows left behind by the retreating glaciers', 'Ground cleared by lightning fires, then grown back', 'Old village sites, abandoned and slowly grown over'],
    must: ['anthropogenic', 'human-made', 'controlled burning'],
    ev: [{ p: 'pre-2.4-p25', q: 'applied controlled burning to eliminate underbrush and open up landscape to berry patches and meadows of camas plants' },
      { p: 'pre-2.4-p25', q: 'Europeans would see these spaces as pastoral, natural, and available rather than anthropogenic — human-made — landscapes, the product of centuries of horticultural experimentation.' }],
  },

  {
    id: 'pacific-ranks', kind: 'choice', big: 'worlds', lens: ['against-progress', 'own-terms'],
    prompt: 'How were many Pacific Northwest societies organised?',
    answer: 'By rank: an elite, commoners and a slave class',
    options: ['Without ranks — everyone was equal', 'Under one king for the whole coast', 'By age alone, the eldest ruling all'],
    must: ['an elite, a commoner class, and a slave class'],
    ev: [{ p: 'pre-2.4-p22', q: 'Society in Pacific Northwest groups was generally highly stratified and included, in many instances, an elite, a commoner class, and a slave class.' },
      { p: 'pre-2.4-p23', q: 'The fact that slavery existed points to the competition that existed between coastal rivals.' }],
  },

  // ── asked as contested ─────────────────────────────────────────────────
  {
    id: 'population-1400s', kind: 'choice', big: 'worlds', lens: ['contested'],
    prompt: 'How many people lived in what is now Canada in the late 1400s?',
    answer: 'Nobody knows: estimates run from 200,000 to 2 million',
    options: ['About 50,000, fewer than a single European city', 'Exactly 500,000, from the first censuses', 'About 54 million'],
    must: ['between 200,000 and 2 million', 'utterly conditional'],
    ev: [{ p: 'pre-2.5-p9', q: 'The Aboriginal population of Canada during the late 15th century is estimated to have been between 200,000 and 2 million, with a figure of 500,000 currently accepted widely. These numbers are utterly conditional' }],
  },
  {
    id: 'how-people-came', kind: 'choice', big: 'origins', lens: ['contested'],
    prompt: 'Land bridge from Siberia, or boats down the Pacific coast: how did people first reach the Americas?',
    answer: 'Probably both, over a long span — and neither is proven',
    options: ['Over the land bridge; the Clovis sites settle it', 'By sea; the land bridge has been disproved', 'Across the Atlantic from Europe'],
    must: ['both are probably correct', 'hypotheses only'],
    ev: [{ p: 'pre-2.3-p13', q: 'most historians and archaeologists now accept that both are probably correct' },
      { p: 'pre-2.3-p13', q: 'conclusive evidence in support of either theory continues to elude us; these are still hypotheses only.' }],
  },

  // ── putting it in order ────────────────────────────────────────────────
  {
    id: 'order-long-past', kind: 'order', big: 'worlds', lens: ['own-terms'],
    prompt: 'Oldest first.',
    items: [
      { label: 'The Maritime Archaic begins trading along the Atlantic coast', at: -7000, when: 'c. 7000 BCE', ev: { p: 'pre-2.3-p24', q: 'They prospered from approximately 7000 BCE to 1500 BCE' } },
      { label: 'The Stl’atl’imx settle Keatley Creek above the Fraser', at: -2800, when: 'c. 2800 BCE', ev: { p: 'pre-2.4-p8', q: 'The Stl’atl’imx people who lived there from about 2800 BCE' } },
      { label: 'Cahokia rises on the Mississippi', at: 600, when: 'c. 600 CE', ev: { p: 'pre-2.4-p6', q: 'Cahokia (ca. 600-1400 CE)' } },
      { label: 'The Haudenosaunee League comes together', at: 1450, when: 'c. 1450', ev: { p: 'pre-5.5-p5', q: 'came together sometime around 1450' } },
    ],
  },
];
