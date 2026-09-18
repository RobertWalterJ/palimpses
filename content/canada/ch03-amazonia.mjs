// Amazonia · a centre of its own.
//
// Robert's brief names the pre-Columbian Amazon: "heavily managed, highly
// populated … earthwork builders, agroforestry experts, and complex
// confederacies". Belshaw's books don't cover it; this chapter is built from
// Prümers et al. 2022, "Lidar reveals pre-Hispanic low-density urbanism in the
// Bolivian Amazon" (Nature 606; CC BY 4.0), on the Casarabe culture of the
// Llanos de Mojos. The paper's own claims are strong ones — where the authors
// PROPOSE rather than find, the question is tagged contested.

export default [
  {
    id: 'amazon-sparse', kind: 'choice', lens: ['against-progress'],
    prompt: 'Lidar surveys mapped Casarabe sites in the Bolivian Amazon. What do the authors say their results put to rest?',
    answer: 'The idea that western Amazonia was thinly peopled',
    options: ['The idea that farming began in the Andes', 'The idea that the region had any cities', 'The idea that lidar works under forest'],
    must: ['put to rest arguments that western Amazonia was sparsely populated'],
    ev: [{ p: 'prumers2022-conclusions-p1', q: 'Our results put to rest arguments that western Amazonia was sparsely populated in pre-Hispanic times.' }],
  },
  {
    id: 'casarabe-when', kind: 'choice', lens: ['own-terms'],
    prompt: 'When did the Casarabe culture flourish in the Llanos de Mojos?',
    answer: 'About 500 to 1400 CE',
    options: ['About 5000 to 4000 BCE', 'About 1600 to 1800 CE', 'About 100 to 300 CE'],
    must: ['between around ad 500 and ad 1400'],
    ev: [{ p: 'prumers2022-main-p1', q: 'The Casarabe culture developed here between around ad 500 and ad 1400, spreading over an area of 4,500 km2' }],
  },
  {
    id: 'casarabe-lived-in', kind: 'choice', lens: ['own-terms', 'against-progress'],
    prompt: 'Were the big Casarabe mound sites empty ceremonial centres?',
    answer: 'No — farmers lived there all year round',
    options: ['Yes — used only for yearly festivals', 'Yes — they were burial grounds alone', 'No — they were forts for soldiers only'],
    must: ['not unoccupied ceremonial centres but inhabited throughout the year by agriculturalists'],
    ev: [{ p: 'prumers2022-main-p1', q: 'monumental sites were not unoccupied ceremonial centres but inhabited throughout the year by agriculturalists who cultivated a diversity of crops, with maize (Zea mays) as the primary staple' }],
  },
  {
    id: 'casarabe-pyramids', kind: 'choice', lens: ['own-terms'],
    prompt: 'The Casarabe centres had conical pyramids. How tall?',
    answer: 'Up to 22 metres',
    options: ['About 3 metres', 'About 60 metres', 'About 150 metres'],
    must: ['up to 22 m tall'],
    ev: [{ p: 'prumers2022-abstract-p1', q: 'rectangular platform mounds and conical pyramids (which are up to 22 m tall)' }],
  },
  {
    id: 'casarabe-causeways', kind: 'choice', lens: ['own-terms'],
    prompt: 'How were the two large Casarabe centres linked to smaller sites?',
    answer: 'By straight, raised causeways kilometres long',
    options: ['By paved Inca-style mountain roads', 'By rivers alone, with no built routes', 'By forest footpaths, left unmarked'],
    must: ['straight, raised causeways that stretch over several kilometres'],
    ev: [{ p: 'prumers2022-abstract-p1', q: 'connected to lower-ranked sites by straight, raised causeways that stretch over several kilometres' }],
  },
  {
    id: 'cotoca-tiwanaku', kind: 'choice', lens: ['own-terms'],
    prompt: 'Compare the earth moved to build Cotoca’s core with the largest structure at Tiwanaku, in the Andes.',
    answer: 'Cotoca took about ten times as much',
    options: ['Cotoca took about a tenth as much', 'The two took about the same amount', 'No one has measured either of them'],
    must: ['ten times the amount of earth moved for the construction of the Akapana'],
    ev: [{ p: 'prumers2022-large-settlement-sites-p4', q: 'This latter figure is ten times the amount of earth moved for the construction of the Akapana (53,546 m3), the largest structure in Tiwanaku' }],
  },
  {
    id: 'casarabe-canal', kind: 'choice', lens: ['own-terms', 'economy'],
    prompt: 'A 7-km canal brought water from Laguna San José to Cotoca. What do the authors say it shows?',
    answer: 'The scale of landscape management and labour',
    options: ['That Cotoca was built by Andean settlers', 'That the site flooded and was abandoned', 'That canals were dug only for defence'],
    must: ['indicating the scale of landscape management and labour mobilization'],
    ev: [{ p: 'prumers2022-low-density-urbanism-of-the-casarabe-culture-p3', q: 'A 7-km canal brought water from Laguna San José to Cotoca, indicating the scale of landscape management and labour mobilization.' }],
  },
  {
    id: 'casarabe-made-landscape', kind: 'choice', lens: ['own-terms', 'against-progress'],
    prompt: 'Canals and reservoirs completed the Casarabe settlement system. In what kind of landscape?',
    answer: 'One shaped and modified by people',
    options: ['An untouched rainforest wilderness', 'A dry desert, irrigated from wells', 'A mountain valley, terraced for crops'],
    must: ['anthropogenically modified landscape'],
    ev: [{ p: 'prumers2022-abstract-p1', q: 'Massive water-management infrastructure, composed of canals and reservoirs, complete the settlement system in an anthropogenically modified landscape.' }],
  },
  {
    id: 'casarabe-urbanism', kind: 'choice', lens: ['contested', 'own-terms'],
    prompt: 'What do the authors propose the Casarabe settlement system was?',
    answer: 'Low-density urbanism, the first known in lowland South America',
    options: ['Scattered camps of mobile foragers', 'An outpost of the Inca Empire', 'A copy of an Andean capital city'],
    must: ['We propose', 'tropical agrarian low-density urbanism', 'the first known case'],
    ev: [{ p: 'prumers2022-conclusions-p1', q: 'We propose that the Casarabe-culture settlement system is a singular form of tropical agrarian low-density urbanism—to our knowledge, the first known case for the entire tropical lowlands of South America' }],
  },
  {
    id: 'order-hemisphere', kind: 'order', lens: ['own-terms'],
    prompt: 'Oldest first.',
    items: [
      { label: 'The Maritime Archaic trade along the Atlantic coast', at: -7000, when: 'c. 7000 BCE', ev: { p: 'pre-2.3-p24', q: 'They prospered from approximately 7000 BCE to 1500 BCE' } },
      { label: 'The Stl’atl’imx settle Keatley Creek', at: -2800, when: 'c. 2800 BCE', ev: { p: 'pre-2.4-p8', q: 'The Stl’atl’imx people who lived there from about 2800 BCE' } },
      { label: 'The Casarabe culture begins in the Llanos de Mojos', at: 500, when: 'c. 500 CE', ev: { p: 'prumers2022-main-p1', q: 'The Casarabe culture developed here between around ad 500 and ad 1400' } },
      { label: 'The Haudenosaunee League comes together', at: 1450, when: 'c. 1450', ev: { p: 'pre-5.5-p5', q: 'came together sometime around 1450' } },
    ],
  },
];
