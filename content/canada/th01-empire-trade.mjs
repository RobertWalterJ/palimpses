// Thread 1 — Trade, empire and abolition, 1488–1842.
//
// Robert's brief (19 Sept 2026): line up Portuguese Macau, early English
// activity in Asia, the Napoleonic wars and the War of 1812, the lead-up to the
// Opium Wars, what Europe was doing meanwhile, the end of slavery in Canada and
// the British Empire, and what is known of how enslaved people were treated in
// the British Caribbean.
//
// A thread crosses chapters and regions. It has the same parts as a chapter —
// big questions, questions, every claim quoted — plus a TIMELINE of dated
// events in four lanes, each date found verbatim in its quote. Sources:
// OpenStax World History vol. 2 (wh2), Belshaw (pre), Ljungstedt's 1836
// history of Macau, and Mary Prince's own account (1831).

export const LANES = [
  { id: 'asia', name: 'China and Asia' },
  { id: 'europe', name: 'Europe and Britain' },
  { id: 'na', name: 'North America' },
  { id: 'carib', name: 'Caribbean and Atlantic' },
];

export const TIMELINE = [
  { lane: 'carib', at: 1488, label: 'A Portuguese ship rounds the Cape of Good Hope', ev: { p: 'wh2-2.1-p38', q: 'In 1488, a Portuguese ship’s captain, Bartolomeu Dias, had sailed around the Cape of Good Hope at the southern tip of Africa' } },
  { lane: 'carib', at: 1492, label: 'Columbus lands in the Caribbean', ev: { p: 'wh2-5.2-p61', q: 'Christopher Columbus, who landed in the Caribbean in 1492 believing it was part of the Indies.' } },
  { lane: 'asia', at: 1557, label: 'Macau assigned to the Portuguese, in one account', ev: { p: 'ljungstedt1836-p115', q: 'the desert island, Ama, assigned, in 1557, for the residence of the strangers.' } },
  { lane: 'asia', at: 1577, label: 'Portuguese allowed a trading post at Macao, in another', ev: { p: 'wh2-2.3-p31', q: 'In 1577, Portuguese merchants, who had already been trading in China in violation of the law, were given permission to establish a factory at Macao.' } },
  { lane: 'asia', at: 1600, label: 'England charters the East India Company', ev: { p: 'wh2-2.1-p53', q: 'In 1600, Queen Elizabeth I of England granted a monopoly on trade in the Indian Ocean to the British East India Company' } },
  { lane: 'asia', at: 1661, label: 'Bombay passes to England, leased to the Company', ev: { p: 'wh2-2.1-p54', q: 'In 1661, Charles II of England received Bombay (Mumbai) as part of the dowry of his Portuguese wife, Catherine of Braganza, and leased it to the British East India Company.' } },
  { lane: 'na', at: 1670, label: 'The Hudson’s Bay Company chartered, on the East India model', ev: { p: 'pre-8.12-p13', q: 'In 1670, a monopolistic charter modelled on the East India Company' } },
  { lane: 'asia', at: 1729, label: 'China outlaws recreational opium', ev: { p: 'wh2-6.2-p51', q: 'The Chinese government outlawed recreational opium in 1729' } },
  { lane: 'asia', at: 1759, label: 'The Canton system begins', ev: { p: 'wh2-6.2-p26', q: 'Under the Canton system, in place from 1759 to 1842' } },
  { lane: 'carib', at: 1791, label: 'Enslaved people rise in Saint-Domingue (Haiti)', ev: { p: 'wh2-8.1-p17', q: 'The rebellion by enslaved people in Saint-Domingue (now Haiti) that had begun in 1791' } },
  { lane: 'na', at: 1793, label: 'Simcoe begins limiting slavery in Upper Canada', ev: { p: 'pre-7.9-p5', q: 'Abolition in Upper Canada was initiated by John Graves Simcoe in 1793.' } },
  { lane: 'asia', at: 1793, label: 'Macartney’s embassy to the Qianlong emperor', ev: { p: 'wh2-2.3-p54', q: 'Lord George Macartney, who visited China in 1793 on behalf of the British king.' } },
  { lane: 'europe', at: 1803, label: 'The Napoleonic Wars begin', ev: { p: 'pre-7.9-p31', q: 'Napoleonic Wars: A series of wars involving France and much of the rest of Europe from 1803 to 1815.' } },
  { lane: 'carib', at: 1804, label: 'Haiti declares independence', ev: { p: 'wh2-7.3-p45', q: 'After Dessalines declared Haiti’s sovereign independence on January 1, 1804' } },
  { lane: 'europe', at: 1807, label: 'Parliament ends the legal slave trade', ev: { p: 'pre-11.15-p1', q: 'In 1807 Parliament in London passed the Slave Trade Act, which put an end to the legal trafficking in slaves across the empire.' } },
  { lane: 'na', at: 1812, label: 'The War of 1812: Brock and Tecumseh take Detroit', ev: { p: 'pre-7.8-p14', q: 'Victory followed quickly on August 16, 1812' } },
  { lane: 'europe', at: 1814, label: 'The Congress of Vienna', ev: { p: 'wh2-7.4-p22', q: 'the Congress of Vienna in 1814–1815' } },
  { lane: 'europe', at: 1833, label: 'Britain passes the Slavery Abolition Act', ev: { p: 'pre-11.15-p1', q: 'In 1833 Britain passed the Slavery Abolition Act.' } },
  { lane: 'na', at: 1834, label: 'Slavery ends in Canada, with the empire', ev: { p: 'pre-7.7-p6', q: 'continued in Canada until the British Parliament voted for abolition in 1834.' } },
  { lane: 'asia', at: 1839, label: 'China seizes British opium at Canton', ev: { p: 'wh2-6.2-p52', q: 'In 1839, the Chinese government seized opium in British warehouses in Canton.' } },
  { lane: 'asia', at: 1842, label: 'The Treaty of Nanjing', ev: { p: 'wh2-6.2-p52', q: 'In 1842, Great Britain and China signed the Treaty of Nanjing' } },
];

export const BIG = [
  { id: 'terms', q: 'Who set the terms of trade between Europe and China?',
    ev: [{ p: 'wh2-6.2-p63', q: 'Under the Canton system, China increased its trade with Europe and improved its economy, while rejecting most European trade goods and insisting on payment in silver, acquiring a very favorable balance of trade.' }] },
  { id: 'opium', q: 'How did a trade in opium become a war?',
    ev: [{ p: 'wh2-6.2-p51', q: 'Growing economic relationships also led to conflict when the British tried to end China’s positive balance of trade by importing opium into China from their territories in India.' }] },
  { id: 'wars', q: 'How did Europe’s wars reach North America?',
    ev: [{ p: 'pre-8.12-p1', q: 'The Napoleonic Wars, of which the War of 1812 was a part, barely touched the Prairie West.' }] },
  { id: 'slavery', q: 'What was slavery in the British Caribbean — and how did it end?',
    ev: [{ p: 'wh2-5.4-p32', q: 'Infectious disease, overwork, poor diet, and injuries claimed large numbers of lives.' },
      { p: 'pre-11.15-p1', q: 'In 1807 Parliament in London passed the Slave Trade Act, which put an end to the legal trafficking in slaves across the empire. In 1833 Britain passed the Slavery Abolition Act.' }] },
];

export default [
  // ── who set the terms ────────────────────────────────────────────────
  {
    id: 'macau-two-dates', kind: 'choice', big: 'terms', at: 1557, lens: ['contested', 'record'],
    prompt: 'Portuguese merchants settled at Macau, on China’s south coast. Two sources give the year. What do they say?',
    answer: 'One says 1557, the other 1577',
    options: ['Both say 1498, with Vasco da Gama', 'Both say 1600, with the English', 'Neither gives a year at all'],
    must: ['1557', '1577'],
    ev: [{ p: 'ljungstedt1836-p115', q: 'the desert island, Ama, assigned, in 1557, for the residence of the strangers.' },
      { p: 'wh2-2.3-p31', q: 'In 1577, Portuguese merchants, who had already been trading in China in violation of the law, were given permission to establish a factory at Macao.' }],
  },
  {
    id: 'macau-permission', kind: 'choice', big: 'terms', at: 1577, lens: ['own-terms', 'against-progress'],
    prompt: 'Was Macau a conquest?',
    answer: 'No — China granted permission',
    options: ['Yes — Portuguese soldiers took it', 'Yes — the English captured it', 'No — it was bought outright'],
    must: ['given permission to establish a factory at Macao'],
    ev: [{ p: 'wh2-2.3-p31', q: 'In 1577, Portuguese merchants, who had already been trading in China in violation of the law, were given permission to establish a factory at Macao.' }],
  },
  {
    id: 'canton-system', kind: 'choice', big: 'terms', at: 1759, lens: ['economy', 'own-terms'],
    prompt: 'From 1759 China ran its trade with Europeans under the Canton system. What were Europeans allowed to do?',
    answer: 'Trade only at Guangzhou (Canton), through its guild',
    options: ['Trade freely at any Chinese port', 'Live and trade anywhere in China', 'Trade only through Japan'],
    must: ['trade only through the port of Guangzhou', 'Co-hong'],
    ev: [{ p: 'wh2-2.3-p53', q: 'after 1759 they could conduct trade only through the port of Guangzhou and trade only with the Co-hong, the official Chinese merchant guild.' }],
  },
  {
    id: 'silver', kind: 'choice', big: 'terms', at: 1759, lens: ['economy'],
    prompt: 'China sold tea and silk to Europe but wanted few European goods. What did it insist on in payment?',
    answer: 'Silver',
    options: ['Gold', 'Woollen cloth', 'Guns'],
    must: ['insisting on payment in silver'],
    ev: [{ p: 'wh2-6.2-p63', q: 'rejecting most European trade goods and insisting on payment in silver, acquiring a very favorable balance of trade.' }],
  },
  {
    id: 'macartney', kind: 'choice', big: 'terms', at: 1793, lens: ['own-terms', 'against-progress'],
    prompt: 'In 1793 Britain sent Lord Macartney to the Qianlong emperor. How did Qianlong treat the British king?',
    answer: 'As a vassal, not an equal',
    options: ['As an equal, with an embassy', 'As a trading partner in silver', 'As an ally against Russia'],
    must: ['willing to accept the British monarch as a vassal but did not consider him an equal'],
    ev: [{ p: 'wh2-2.3-p54', q: 'Qianlong announced that he was willing to accept the British monarch as a vassal but did not consider him an equal.' }],
  },
  {
    id: 'hbc-model', kind: 'choice', big: 'terms', at: 1670, lens: ['economy'],
    prompt: 'The Hudson’s Bay Company, chartered in 1670, was modelled on another English trading monopoly. Which?',
    answer: 'The East India Company',
    options: ['The Royal African Company', 'The Dutch West India Company', 'The Muscovy Company'],
    must: ['modelled on the East India Company'],
    ev: [{ p: 'pre-8.12-p13', q: 'In 1670, a monopolistic charter modelled on the East India Company' }],
  },

  // ── opium ────────────────────────────────────────────────────────────
  {
    id: 'eic-pivot', kind: 'choice', big: 'opium', at: 1800, lens: ['economy'],
    prompt: 'The East India Company began in 1600 trading spices, then Indian textiles. What was it trading by the early 1800s?',
    answer: 'Indian opium for Chinese tea',
    options: ['Chinese silk for Canadian furs', 'Caribbean sugar for Indian cotton', 'English wool for Chinese porcelain'],
    must: ['trading Indian-produced opium for Chinese-grown tea'],
    ev: [{ p: 'wh2-6.2-p20', q: 'the company pivoted to trading Indian-produced opium for Chinese-grown tea' }],
  },
  {
    id: 'why-opium', kind: 'choice', big: 'opium', at: 1800, lens: ['economy', 'against-progress'],
    prompt: 'Why did British traders push opium into China?',
    answer: 'To end China’s favourable balance of trade',
    options: ['Because China asked Britain for it', 'To pay for the Napoleonic Wars', 'Because it was legal in China'],
    must: ['tried to end China’s positive balance of trade by importing opium into China'],
    ev: [{ p: 'wh2-6.2-p51', q: 'the British tried to end China’s positive balance of trade by importing opium into China from their territories in India.' }],
  },
  {
    id: 'opium-ban', kind: 'choice', big: 'opium', at: 1729, lens: ['own-terms'],
    prompt: 'China outlawed recreational opium in 1729. What did British traders do?',
    answer: 'Kept selling it, and the price soared',
    options: ['Stopped selling it in China', 'Sold it only as medicine', 'Moved the trade to Japan'],
    must: ['British traders refused to stop selling it', 'the price skyrocketed'],
    ev: [{ p: 'wh2-6.2-p51', q: 'The Chinese government outlawed recreational opium in 1729, but the British traders refused to stop selling it, and the price skyrocketed.' }],
  },
  {
    id: 'opium-war', kind: 'choice', big: 'opium', at: 1839, lens: ['against-progress'],
    prompt: 'What set off the First Opium War in 1839?',
    answer: 'China seized British opium at Canton',
    options: ['Britain’s king was refused an embassy', 'Pirates attacked a British ship', 'China banned the tea trade'],
    must: ['seized opium in British warehouses in Canton'],
    ev: [{ p: 'wh2-6.2-p52', q: 'In 1839, the Chinese government seized opium in British warehouses in Canton.' }],
  },
  {
    id: 'nanjing', kind: 'choice', big: 'opium', at: 1842, lens: ['against-progress'],
    prompt: 'Britain won the First Opium War. What did the Treaty of Nanjing (1842) force on China?',
    answer: 'Hong Kong to Britain, and five ports opened',
    options: ['An end to the opium trade', 'A British governor in Beijing', 'Macau handed from Portugal to Britain'],
    must: ['surrender Hong Kong to Great Britain', 'opened five ports'],
    ev: [{ p: 'wh2-6.2-p52', q: 'In 1842, Great Britain and China signed the Treaty of Nanjing, which forced China to surrender Hong Kong to Great Britain, opened five ports to European traders, and gave the British a favorable trading status.' }],
  },
  {
    id: 'humiliation', kind: 'choice', big: 'opium', at: 1842, lens: ['own-terms'],
    prompt: 'What have the Chinese called the era that the Opium Wars began?',
    answer: 'The century of humiliation',
    options: ['The age of opening', 'The great divergence', 'The treaty century'],
    must: ['the century of humiliation'],
    ev: [{ p: 'wh2-9.1-p64', q: 'China’s defeat in the Opium Wars began what the Chinese have called “the century of humiliation.”' }],
  },

  // ── wars ─────────────────────────────────────────────────────────────
  {
    id: 'war-of-1812-part', kind: 'choice', big: 'wars', at: 1812, lens: ['record'],
    prompt: 'The War of 1812 was fought in North America. What larger war was it part of?',
    answer: 'The Napoleonic Wars',
    options: ['The Seven Years’ War', 'The American Revolution', 'The Opium Wars'],
    must: ['The Napoleonic Wars, of which the War of 1812 was a part'],
    ev: [{ p: 'pre-8.12-p1', q: 'The Napoleonic Wars, of which the War of 1812 was a part, barely touched the Prairie West.' }],
  },
  {
    id: 'vienna', kind: 'choice', big: 'wars', at: 1815, lens: ['against-progress'],
    prompt: 'After Napoleon’s defeat, the powers met at the Congress of Vienna (1814–1815). What did they set out to restore?',
    answer: 'Overthrown monarchs, for the sake of stability',
    options: ['Napoleon’s new republics', 'Free trade across all of Europe', 'The borders of the Roman Empire'],
    must: ['restore the legitimacy of overthrown monarchs'],
    ev: [{ p: 'wh2-7.4-p22', q: 'He asserted that the only way to maintain stability in Europe was to restore the legitimacy of overthrown monarchs' }],
  },

  // ── slavery, and its end ─────────────────────────────────────────────
  {
    id: 'not-self-reproducing', kind: 'choice', big: 'slavery', lens: ['against-progress'],
    prompt: 'Why did Caribbean slaveholders have to buy more enslaved people every year?',
    answer: 'So many died, infants above all, that numbers fell',
    options: ['Many were freed each year by law', 'Most escaped to North America', 'The plantations kept growing fast'],
    must: ['infant mortality among enslaved people in the Caribbean was rampant', 'not self-reproducing'],
    ev: [{ p: 'wh2-5.4-p32', q: 'Because infant mortality among enslaved people in the Caribbean was rampant, the enslaved population was not self-reproducing, and slaveholders had to buy more people each year to maintain their labor force.' }],
  },
  {
    id: 'adam-smith', kind: 'choice', big: 'slavery', lens: ['record', 'economy'],
    prompt: 'The economist Adam Smith compared enslaved people in the British Caribbean with the poorest people in Scotland and Ireland. What did he find?',
    answer: 'They were worse off than the poorest there',
    options: ['They were better fed than the poor there', 'The two were much the same', 'He refused to compare them'],
    must: ['in a worse condition than the poorest people either in Scotland or Ireland'],
    ev: [{ p: 'wh2-6.3-p6', q: 'In The Wealth of Nations, he acknowledged that the enslaved people living in the British Caribbean were “in a worse condition than the poorest people either in Scotland or Ireland,”' }],
  },
  {
    id: 'prince-salt', kind: 'choice', big: 'slavery', at: 1831, lens: ['record', 'own-terms'],
    prompt: 'Mary Prince, enslaved in the British Caribbean, was sent to the salt ponds of Turks Island. She told her own story in 1831. How did a working day begin?',
    answer: 'Knee-deep in salt water from four in the morning',
    options: ['Indoors, sorting salt from sunrise', 'At dawn, after a meal', 'At noon, when the tide went out'],
    must: ["stand up to my knees in the water, from four o'clock in the morning"],
    ev: [{ p: 'prince1831-p46', q: "I was given a half barrel and a shovel, and had to stand up to my knees in the water, from four o'clock in the morning till nine, when we were given some Indian corn boiled in water" }],
  },
  {
    id: 'prince-verdict', kind: 'choice', big: 'slavery', at: 1831, lens: ['record', 'against-progress'],
    prompt: 'Some people in England claimed that enslaved people were content. What did Mary Prince say of anyone who said so?',
    answer: 'That they were either ignorant or lying',
    options: ['That they had been misled by planters', 'That some slaves were content', 'That only the Church could judge'],
    must: ['either ignorant or a lying person'],
    ev: [{ p: 'prince1831-p101', q: 'The man that says slaves be quite happy in slavery--that they don\'t want to be free--that man is either ignorant or a lying person.' }],
  },
  {
    id: 'simcoe-first', kind: 'choice', big: 'slavery', at: 1793, lens: ['own-terms'],
    prompt: 'In 1793 Upper Canada passed a law against slavery. What made it a first?',
    answer: 'The first limit on slavery in the British Empire',
    options: ['The first law to free every slave', 'The first ban on the slave trade at sea', 'The first law passed in Upper Canada'],
    must: ['the first limitation on slavery in the British Empire'],
    ev: [{ p: 'pre-7.7-p6', q: 'This was a remarkable initiative in that it was the first limitation on slavery in the British Empire.' }],
  },
  {
    id: 'simcoe-limits', kind: 'choice', big: 'slavery', at: 1793, lens: ['against-progress'],
    prompt: 'What did Upper Canada’s 1793 law actually do?',
    answer: 'Stopped new slaves coming; freed no one',
    options: ['Freed every enslaved person at once', 'Freed children when they turned five', 'Banned selling slaves to the US'],
    must: ['prohibit the import of new slaves', 'holding the slaves already in their possession until their death'],
    ev: [{ p: 'pre-7.7-p6', q: 'It was, however, also a slippery piece of law that did not prohibit slave owners from selling their people to buyers in the United States, keeping the children of slaves in bondage, and holding the slaves already in their possession until their death. What it did do was prohibit the import of new slaves.' }],
  },
  {
    id: 'act-and-effect', kind: 'choice', big: 'slavery', at: 1833, lens: ['record'],
    prompt: 'Britain passed the Slavery Abolition Act in 1833. When did slavery end in Canada?',
    answer: 'In 1834, with the rest of the empire',
    options: ['In 1793, under Simcoe', 'In 1807, with the slave trade', 'In 1865, with the United States'],
    must: ['1833', '1834'],
    ev: [{ p: 'pre-11.15-p1', q: 'In 1833 Britain passed the Slavery Abolition Act.' },
      { p: 'pre-7.7-p6', q: 'continued in Canada until the British Parliament voted for abolition in 1834.' }],
  },

  // ── which came first, across the world ───────────────────────────────
  {
    id: 'order-trade-world', kind: 'order', big: 'terms', lens: ['own-terms'],
    prompt: 'Oldest first.',
    items: [
      { label: 'England charters the East India Company', at: 1600, when: '1600', ev: { p: 'wh2-2.1-p53', q: 'In 1600, Queen Elizabeth I of England granted a monopoly on trade in the Indian Ocean to the British East India Company' } },
      { label: 'The Hudson’s Bay Company is chartered', at: 1670, when: '1670', ev: { p: 'pre-8.12-p13', q: 'In 1670, a monopolistic charter modelled on the East India Company' } },
      { label: 'China outlaws recreational opium', at: 1729, when: '1729', ev: { p: 'wh2-6.2-p51', q: 'The Chinese government outlawed recreational opium in 1729' } },
      { label: 'The Canton system begins', at: 1759, when: '1759', ev: { p: 'wh2-6.2-p26', q: 'Under the Canton system, in place from 1759 to 1842' } },
    ],
  },
  {
    id: 'order-freedom', kind: 'order', big: 'slavery', lens: ['against-progress'],
    prompt: 'Oldest first.',
    items: [
      { label: 'Enslaved people rise in Saint-Domingue (Haiti)', at: 1791, when: '1791', ev: { p: 'wh2-8.1-p17', q: 'The rebellion by enslaved people in Saint-Domingue (now Haiti) that had begun in 1791' } },
      { label: 'Haiti declares independence', at: 1804, when: '1804', ev: { p: 'wh2-7.3-p45', q: 'After Dessalines declared Haiti’s sovereign independence on January 1, 1804' } },
      { label: 'Parliament ends the legal slave trade', at: 1807, when: '1807', ev: { p: 'pre-11.15-p1', q: 'In 1807 Parliament in London passed the Slave Trade Act' } },
      { label: 'Slavery ends across the British Empire', at: 1834, when: '1834', ev: { p: 'wh2-10.3-p2', q: 'Britain abolished the slave trade and ended slavery completely in 1834.' } },
    ],
  },
  {
    id: 'order-meanwhile', kind: 'order', big: 'wars', lens: ['own-terms'],
    prompt: 'Oldest first.',
    items: [
      { label: 'Macartney’s embassy to the Qianlong emperor', at: 1793, when: '1793', ev: { p: 'wh2-2.3-p54', q: 'Lord George Macartney, who visited China in 1793 on behalf of the British king.' } },
      { label: 'The War of 1812: Brock and Tecumseh take Detroit', at: 1812, when: '1812', ev: { p: 'pre-7.8-p14', q: 'Victory followed quickly on August 16, 1812' } },
      { label: 'The Congress of Vienna', at: 1814, when: '1814–1815', ev: { p: 'wh2-7.4-p22', q: 'the Congress of Vienna in 1814–1815' } },
      { label: 'China seizes British opium at Canton', at: 1839, when: '1839', ev: { p: 'wh2-6.2-p52', q: 'In 1839, the Chinese government seized opium in British warehouses in Canton.' } },
    ],
  },
];
