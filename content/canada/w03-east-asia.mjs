// World · China and East Asia. OpenStax World History (wh1 ch. 5, 12, 14, 17;
// wh2 ch. 2), told from East Asia's own centres: Tang and Song China, the
// steppe empire that swallowed them, the fleets that sailed the Indian Ocean
// eighty years before Columbus, and what happened when Europeans came by sea.
//
// The empire-and-abolition THREAD (th01) already asks about the Canton system,
// the Macartney embassy and the Opium Wars, so these questions stop at the
// point where that one begins.
export const GLOSSARY_FROM = ['wh1-5.1', 'wh1-5.2', 'wh1-5.3', 'wh1-12.2', 'wh1-12.3', 'wh1-14', 'wh1-17.2', 'wh2-2.3'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'China and East Asia, ancient times to the 1800s';

export const BIG = [
  { id: 'song', q: 'What did Song China build — long before Europe’s industrial age?', src: ['wh1-14.1', 'wh1-5.1'],
    ev: [{ p: 'wh1-14.1-p45', q: 'The Song dynasty revived and strengthened Confucian civilization in the areas it ruled.' }] },
  { id: 'silk', q: 'How did the Silk Roads tie China to the rest of Asia and the West?', src: ['wh1-12.2', 'wh1-12.3', 'wh1-5.2', 'wh1-5.3'],
    ev: [{ p: 'wh1-12.2-p50', q: 'The Silk Roads originated in the Han dynasty’s trade with nomadic peoples from the Inner Asian Steppe and grew into a vast network that crisscrossed much of central Asia, linking China with the West.' }] },
  { id: 'steppe', q: 'What did the Mongols do to Asia — and what came after?', src: ['wh1-14.2', 'wh1-14.3', 'wh1-14', 'wh1-17.2', 'wh2-2.3'],
    ev: [{ p: 'wh1-14.2-p40', q: 'Chinggis Khan ruled the Mongol Empire for twenty-one years.' }] },
  { id: 'by-sea', q: 'What happened when East Asia met Europe by sea?', src: ['wh2-2.2', 'wh2-2.3'],
    ev: [{ p: 'wh2-2.3-p62', q: 'East Asia was drawn into the network of global maritime trade in the sixteenth and seventeenth centuries.' }] },
];

export default [
  // ── Tang and Song ─────────────────────────────────────────────────────
  {
    id: 'song-industry', kind: 'choice', big: 'song', lens: ['against-progress'],
    prompt: 'The industrial revolution is usually dated to eighteenth-century Britain. What had improved farming and technology already laid the groundwork for in China?',
    answer: 'An industrial revolution of its own, far earlier',
    options: ['A turn away from all machinery', 'A single imperial workshop', 'A short-lived experiment'],
    must: ['laid the groundwork for a type of industrial revolution to occur long before the one that took place in the Western world'],
    ev: [{ p: 'wh1-14.1-p45', q: 'Technology improved agricultural yields and laid the groundwork for a type of industrial revolution to occur long before the one that took place in the Western world.' }],
  },
  {
    id: 'tang-exam', kind: 'choice', big: 'song', lens: ['record'],
    prompt: 'Entry to the Tang bureaucracy in China turned on an exam held every three years. What was remarkable about it?',
    answer: 'The first written exam anywhere',
    options: ['The oldest exam still in use', 'The only exam open to women', 'The shortest exam on record'],
    must: ['the first fully written such exam in history'],
    ev: [{ p: 'wh1-12.1-p45', q: 'This civil service exam, the first fully written such exam in history, had been developed from the Sui dynasty and tested sophisticated literary skills and knowledge of Confucian and Daoist classics.' }],
  },
  {
    id: 'tang-exam-open', kind: 'choice', big: 'song', depth: 'detail', lens: ['contested', 'record'],
    prompt: 'That Chinese civil service exam was open to all in theory. Who was kept out in practice?',
    answer: 'Women, merchants’ sons and the poor',
    options: ['Only foreigners', 'Only the sons of officials', 'Nobody at all'],
    must: ['women, the sons of merchants, and those who could not afford a classical education were excluded'],
    ev: [{ p: 'wh1-12.1-p45', q: 'In theory it was open to all; in practice, however, until the late Tang period, women, the sons of merchants, and those who could not afford a classical education were excluded.' }],
  },
  {
    id: 'song-bribes', kind: 'choice', big: 'song', lens: ['economy'],
    prompt: 'Song China’s rulers held a Confucian distrust of soldiering. How did they keep hostile neighbours off?',
    answer: 'They paid them',
    options: ['They fortified every border', 'They hired steppe cavalry', 'They married into their families'],
    must: ['bribing potentially hostile neighbors either not to attack them or to attack hostile neighbors for the Song'],
    ev: [{ p: 'wh1-14.1-p6', q: 'they structured a government in which the mandarins applied their Confucian pacifism to protect the state by bribing potentially hostile neighbors either not to attack them or to attack hostile neighbors for the Song' }],
  },
  {
    id: 'song-smaller', kind: 'choice', big: 'song', depth: 'detail', lens: ['own-terms'],
    prompt: 'Song China ruled less territory than the Han or Tang dynasties before it. What happened to its people’s standard of living?',
    answer: 'It rose steadily',
    options: ['It fell with the territory', 'It stayed flat for centuries', 'The record does not say'],
    must: ['Song China was largely stable, with a steadily rising population and standard of living'],
    ev: [{ p: 'wh1-14.1-p2', q: 'Despite this, Song China was largely stable, with a steadily rising population and standard of living.' }],
  },

  // ── the steppe ────────────────────────────────────────────────────────
  {
    id: 'temujin-1204', kind: 'choice', big: 'steppe', at: 1204, lens: ['own-terms'],
    prompt: 'Before he was called Chinggis Khan, Temujin won command of the Mongols. What did his own people call themselves?',
    answer: 'The People of the Felt Walls',
    options: ['The Riders of the Blue Sky', 'The Sons of the Gobi', 'The Horse Nations'],
    must: ['Temujin was the unchallenged ruler of the People of the Felt Walls'],
    ev: [{ p: 'wh1-14.1-p46', q: 'By 1204, Temujin was the unchallenged ruler of the People of the Felt Walls.' }],
  },
  {
    id: 'yassa', kind: 'choice', big: 'steppe', depth: 'detail', lens: ['record'],
    prompt: 'In his twenty-one years as ruler, Chinggis Khan gave his people a law code. What was it called?',
    answer: 'The yassa',
    options: ['The yurt', 'The khuriltai', 'The ordu'],
    must: ['he established a law code, the yassa'],
    ev: [{ p: 'wh1-14.2-p40', q: 'In that time, he established a law code, the yassa, that he hoped would allow his seminomadic people to live in harmony.' }],
  },
  {
    id: 'ogedei-trade', kind: 'choice', big: 'steppe', lens: ['economy'],
    prompt: 'Chinggis Khan’s son Ogedei is remembered for expanding the empire. What else did he build?',
    answer: 'The bureaucracy and roads that trade needed',
    options: ['A navy for the Pacific', 'A new capital in Persia', 'A wall along the steppe'],
    must: ['Ogedei undertook the development of the bureaucracy and infrastructure necessary to support trade on a large scale'],
    ev: [{ p: 'wh1-14.2-p41', q: 'Equally important, Ogedei undertook the development of the bureaucracy and infrastructure necessary to support trade on a large scale.' }],
  },
  {
    id: 'yuan-staffing', kind: 'choice', big: 'steppe', lens: ['record'],
    prompt: 'Ruling China, the Mongols took over its system of taxation and administration. Who did they put in the posts?',
    answer: 'Foreigners rather than their Chinese subjects',
    options: ['The old Chinese officials', 'Only Mongol nobles', 'Buddhist monks'],
    must: ['which they staffed mainly with foreigners rather than with their Chinese subjects'],
    ev: [{ p: 'wh1-16.1-p4', q: 'so they began by absorbing many Chinese practices of taxation and administration into their government, which they staffed mainly with foreigners rather than with their Chinese subjects' }],
  },
  {
    id: 'yuan-paper-money', kind: 'choice', big: 'steppe', lens: ['economy'],
    prompt: 'Travellers wrote of the wealth of China under Mongol rule. What was paper currency doing to its economy?',
    answer: 'Driving inflation',
    options: ['Steadying prices', 'Replacing taxes', 'Funding the Silk Roads'],
    must: ['The use of paper currency was a major contributor to inflation'],
    ev: [{ p: 'wh1-14.3-p32', q: 'The use of paper currency was a major contributor to inflation. While paper money was theoretically convertible to metal or silk, the Yuan government issued much more of it than it had metal or silk to redeem it with.' }],
  },
  {
    id: 'mongol-limits', kind: 'choice', big: 'steppe', lens: ['against-progress'],
    prompt: 'The Mongol armies are remembered as unstoppable. Where did they fail?',
    answer: 'Southeast Asia, and the sea',
    options: ['The Persian plateau', 'The Russian principalities', 'Northern China'],
    must: ['proven unable to conquer Southeast Asia and were even less skilled at long-distance sea invasions'],
    ev: [{ p: 'wh1-14.3-p35', q: 'The seemingly invincible armies of the Mongol Empire had proven unable to conquer Southeast Asia and were even less skilled at long-distance sea invasions.' }],
  },
  {
    id: 'silk-roads-origin', kind: 'choice', big: 'silk', lens: ['economy'],
    prompt: 'The Silk Roads are pictured as a highway built for luxury goods. How did they actually begin?',
    answer: 'As Han China’s trade with steppe peoples',
    options: ['As a Roman military road', 'As a Buddhist pilgrimage route', 'As a Mongol postal system'],
    must: ['originated in the Han dynasty’s trade with nomadic peoples from the Inner Asian Steppe'],
    ev: [{ p: 'wh1-12.2-p50', q: 'The Silk Roads originated in the Han dynasty’s trade with nomadic peoples from the Inner Asian Steppe and grew into a vast network that crisscrossed much of central Asia, linking China with the West.' }],
  },

  // ── the fleets, and the turn inward ───────────────────────────────────
  {
    id: 'zheng-he-fleet', kind: 'choice', big: 'by-sea', at: 1405, lens: ['against-progress'],
    prompt: 'The first Chinese treasure fleet sailed the Indian Ocean in 1405, decades before Columbus crossed the Atlantic with three ships. How large was it?',
    answer: '317 ships and 27,000 people',
    options: ['Twelve ships and 400 people', 'Forty ships and 2,000 people', 'A thousand ships and 90,000 people'],
    must: ['It consisted of 317 ships and 27,000 people'],
    ev: [{ p: 'wh2-2.3-p28', q: 'The first fleet departed in 1405. It consisted of 317 ships and 27,000 people, including sailors, soldiers, scholars, craftspeople, and fortune-tellers.' }],
  },
  {
    id: 'zheng-he-purpose', kind: 'choice', big: 'by-sea', lens: ['own-terms'],
    prompt: 'Those Chinese voyages carried gifts to the rulers they visited. What were they for?',
    answer: 'To draw rulers into paying tribute',
    options: ['To claim colonies', 'To find a route to Europe', 'To convert people to Buddhism'],
    must: ['thus prompting them to pledge themselves as vassals and offer tribute to the Ming emperor'],
    ev: [{ p: 'wh2-2.3-p27', q: 'The purpose of these voyages was to demonstrate the wealth and power of China by distributing gifts to foreign rulers, thus prompting them to pledge themselves as vassals and offer tribute to the Ming emperor.' }],
  },
  {
    id: 'zheng-he-end', kind: 'choice', big: 'by-sea', at: 1430, lens: ['record'],
    prompt: 'After the seventh and last of those voyages, what became of the admiral’s charts and the fleet?',
    answer: 'The charts were destroyed, the ships left to rot',
    options: ['They were kept for a later voyage', 'They were sold to Malacca', 'They were copied and published'],
    must: ['his charts and records were destroyed, and the ships of the fleet were left to rot'],
    ev: [{ p: 'wh2-2.3-p29', q: 'Following Zheng He’s death, his charts and records were destroyed, and the ships of the fleet were left to rot.' }],
  },
  {
    id: 'hongwu-ban', kind: 'choice', big: 'by-sea', lens: ['economy'],
    prompt: 'After the Mongols were expelled, China’s first Ming emperor made a decision about the outside world. What was it?',
    answer: 'He forbade foreign trade',
    options: ['He opened every port', 'He sent envoys to Europe', 'He invited Arab merchants inland'],
    must: ['The first Ming emperor, Hongwu, forbade foreign trade'],
    ev: [{ p: 'wh2-2.3-p63', q: 'Following the expulsion of the Mongols, China also turned inward. The first Ming emperor, Hongwu, forbade foreign trade.' }],
  },
  {
    id: 'ming-fall', kind: 'choice', big: 'by-sea', at: 1644, depth: 'detail', lens: ['record'],
    prompt: 'Famines, floods and a government that could not cope brought down the Ming in 1644. Who took the throne?',
    answer: 'The Manchu Qing dynasty',
    options: ['A Mongol khan', 'The Tokugawa shoguns', 'A Portuguese viceroy'],
    must: ['The Manchu Qing dynasty attempted to reassert traditional Confucian values'],
    ev: [{ p: 'wh2-2.3-p63', q: 'However, famines, floods, and the inability of the Ming government to solve China’s problems led to the dynasty’s overthrow in 1644. The Manchu Qing dynasty attempted to reassert traditional Confucian values while still trading with Europe.' }],
  },
  {
    id: 'malacca-straits', kind: 'choice', big: 'by-sea', at: 1400, lens: ['economy'],
    prompt: 'The sultanate of Malacca grew rich from where it stood. What passed through the straits it sat on?',
    answer: 'The ships between two oceans',
    options: ['The caravans from China', 'The pilgrim route to Mecca', 'The gold of Sumatra'],
    must: ['the straits were the route taken by trading ships between the Indian Ocean and the Pacific'],
    ev: [{ p: 'wh2-2.2-p26', q: 'The city’s location on both sides of the Malaccan Straits destined it for success, because the straits were the route taken by trading ships between the Indian Ocean and the Pacific.' }],
  },
  {
    id: 'malacca-1511', kind: 'choice', big: 'by-sea', at: 1511, lens: ['record'],
    prompt: 'The Portuguese seized Malacca in 1511. What cost them their hold on it?',
    answer: 'Insisting on conversions',
    options: ['A Dutch fleet', 'Disease among the garrison', 'The loss of their charts'],
    must: ['their insistence on converting the people to Christianity resulted in their being expelled'],
    ev: [{ p: 'wh2-2.2-p27', q: 'In 1511, the Portuguese attacked Malacca and took over the city, but their insistence on converting the people to Christianity resulted in their being expelled from both Malacca and the Sultanate of Ternate in Indonesia.' }],
  },

  // ── Japan ─────────────────────────────────────────────────────────────
  {
    id: 'japan-guns', kind: 'choice', big: 'by-sea', at: 1575, lens: ['record'],
    prompt: 'A single European gun was slow and hard to aim, no better than a sword in one man’s hands. What made guns decisive in Japan?',
    answer: 'Massed soldiers firing in succession',
    options: ['Longer range than bows', 'Their noise, which broke charges', 'Cheapness compared to armour'],
    must: ['when soldiers massed together and groups of them fired in succession'],
    ev: [{ p: 'wh2-2.3-p5', q: 'However, when soldiers massed together and groups of them fired in succession, as Europeans fought, they could easily defeat those armed with traditional Japanese weapons.' }],
  },
  {
    id: 'japan-daimyo-guns', kind: 'choice', big: 'by-sea', lens: ['economy', 'contested'],
    prompt: 'Many Japanese lords supported Christian missionaries although most samurai had no interest in the faith. What were the lords after?',
    answer: 'Guns',
    options: ['Literacy for their sons', 'An alliance with Spain', 'Medicine for their troops'],
    must: ['they were nevertheless interested in something else the Europeans had to offer—guns'],
    ev: [{ p: 'wh2-2.3-p4', q: 'Although most samurai were not interested in becoming Roman Catholics, they were nevertheless interested in something else the Europeans had to offer—guns.' }],
  },
  {
    id: 'japan-converts', kind: 'choice', big: 'by-sea', at: 1600, depth: 'detail', lens: ['record'],
    prompt: 'How many Japanese had become Roman Catholics by 1600?',
    answer: 'More than 100,000',
    options: ['A few hundred', 'About 5,000', 'More than two million'],
    must: ['more than 100,000 Japanese had become Roman Catholics'],
    ev: [{ p: 'wh2-2.3-p4', q: 'By 1600, more than 100,000 Japanese had become Roman Catholics, and half the Jesuits serving in Japan were Japanese.' }],
  },
  {
    id: 'hideyoshi-disarm', kind: 'choice', big: 'by-sea', at: 1590, lens: ['own-terms'],
    prompt: 'Having defeated every rival lord in Japan by 1590, Hideyoshi fixed people in their places. How?',
    answer: 'Disarming everyone but the samurai',
    options: ['Abolishing the samurai', 'Arming the peasantry', 'Banning all landholding'],
    must: ['He disarmed non-samurai and forbade peasants to leave the land or become soldiers'],
    ev: [{ p: 'wh2-2.3-p6', q: 'He disarmed non-samurai and forbade peasants to leave the land or become soldiers, while also forbidding samurai to take up any occupation other than war.' }],
  },
  {
    id: 'japan-closes', kind: 'choice', big: 'by-sea', at: 1614, lens: ['record'],
    prompt: 'Japan’s shogun outlawed Christianity in 1614. What did he decide was the surest way to keep foreign influence out?',
    answer: 'Barring entry, and forbidding Japanese to leave',
    options: ['Taxing every foreign ship', 'Converting the country to Buddhism', 'Fortifying the coast'],
    must: ['ban the entry of foreigners and forbid Japanese to leave'],
    ev: [{ p: 'wh2-2.3-p22', q: 'It was clear to Ieyasu that the best way to keep Christian influence—and other dangerous forces—out of the country was to ban the entry of foreigners and forbid Japanese to leave.' }],
  },
  {
    id: 'dejima', kind: 'choice', big: 'by-sea', at: 1639, lens: ['economy'],
    prompt: 'One European nation was still allowed to trade with Japan because it had kept out of missionary work. Where were its merchants kept?',
    answer: 'On a walled island in Nagasaki harbour',
    options: ['In the capital, under guard', 'On their ships, at anchor', 'In a quarter of Kyoto'],
    must: ['Dutch merchants were confined to a settlement on Dejima Island in the harbor of Nagasaki'],
    ev: [{ p: 'wh2-2.3-p23', q: 'The Dutch, who had refrained from missionary activity, were still allowed to enter Japan to trade. However, to limit any harmful influence on their part, Dutch merchants were confined to a settlement on Dejima Island in the harbor of Nagasaki, in a walled compound they were not allowed to leave.' }],
  },
  {
    id: 'dutch-learning', kind: 'choice', big: 'by-sea', at: 1640, lens: ['against-progress', 'record'],
    prompt: 'Japan is often said to have shut the world out entirely. Which European books stayed legal after 1640?',
    answer: 'Medical books and books on sailing',
    options: ['Bibles, but nothing else', 'Histories and atlases', 'None of any kind'],
    must: ['European books were banned with the exception of medical treatises and books on sailing'],
    ev: [{ p: 'wh2-2.3-p24', q: 'In 1640, European books were banned with the exception of medical treatises and books on sailing.' }],
  },

  // ── Korea ─────────────────────────────────────────────────────────────
  {
    id: 'silhak', kind: 'choice', big: 'by-sea', lens: ['own-terms'],
    prompt: 'Korean scholars sick of elite infighting backed a movement whose name means “practical learning”. What did it promote?',
    answer: 'Science and technology for practical problems',
    options: ['A return to the Confucian classics', 'Trade with Japan', 'Rule by the military'],
    must: ['which promoted the study of the physical sciences and technology in order to solve practical problems'],
    ev: [{ p: 'wh2-2.3-p60', q: 'disgust at the conflict among the yangban elites led many scholars, officials, and common people to support the Silhak movement, which promoted the study of the physical sciences and technology in order to solve practical problems instead of focusing narrowly on the Confucian classics (silhak means “practical learning”)' }],
  },
  {
    id: 'korea-identity', kind: 'choice', big: 'by-sea', lens: ['own-terms', 'against-progress'],
    prompt: 'Korea was invaded by its neighbours for centuries and borrowed writing, painting and philosophy from China. What did that do to its sense of itself?',
    answer: 'Sharpened a distinct Korean identity',
    options: ['Dissolved it into China’s', 'Left it without a written culture', 'Turned it towards Japan'],
    must: ['helped to reinforce in Koreans the separate sense of a distinctive Korean identity'],
    ev: [{ p: 'wh2-2.3-p61', q: 'Nevertheless, the constant influx of foreign ideas and material goods helped to reinforce in Koreans the separate sense of a distinctive Korean identity.' }],
  },
];
