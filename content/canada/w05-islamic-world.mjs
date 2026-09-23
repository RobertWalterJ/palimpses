// World · The Islamic world. OpenStax World History (wh1 ch. 11, 17; wh2
// ch. 4): the first caliphates, the ties that held a world together after
// there was no single ruler left to hold it, and the empires — Ottoman and
// Safavid — that governed many faiths at once.
export const GLOSSARY_FROM = ['wh1-11', 'wh1-17.1', 'wh2-4'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'The Islamic world, 600s–1800s';

export const BIG = [
  { id: 'caliphates', q: 'How did Islam’s first empires grow, and hold together?', src: ['wh1-11'],
    ev: [{ p: 'wh1-11.3-p43', q: 'Through a process of conquest, conversion, and coexistence, the early Abbasids created a cosmopolitan medieval empire centered at their new capital of Baghdad.' }] },
  { id: 'connected', q: 'What held the Islamic world together once no one ruler did?', src: ['wh2-4.1'],
    ev: [{ p: 'wh2-4.1-p35', q: 'But although no single powerful caliphate held all these areas together, the religion of Islam allowed for a degree of cohesiveness and unity, despite theological disagreements.' }] },
  { id: 'empires', q: 'How did the Ottomans and their neighbours govern many peoples?', src: ['wh1-17.1', 'wh2-4'],
    ev: [{ p: 'wh2-4.2-p51', q: 'The Ottoman Empire was one of the most diverse political entities of its time.' }] },
];

export default [
  // ── the first century ─────────────────────────────────────────────────
  {
    id: 'byzantine-exhausted', kind: 'choice', big: 'caliphates', lens: ['record'],
    prompt: 'Arab armies moved out of Arabia in the seventh century into lands held by two old empires. What state were those empires in?',
    answer: 'Exhausted by war with each other',
    options: ['At the height of their power', 'Newly allied against Arabia', 'Ruled from a single capital'],
    must: ['now the combatants were exhausted and financially drained'],
    ev: [{ p: 'wh1-11.1-p54', q: 'In the early seventh century, the Byzantine Empire had won a long and costly war against the Sasanians, sometimes fought on both sides by proxies from northern Arabia, but now the combatants were exhausted and financially drained.' }],
  },
  {
    id: 'largest-empire', kind: 'choice', big: 'caliphates', lens: ['own-terms'],
    prompt: 'How long did it take, after Muhammad’s death, for an Islamic state to rule the largest empire then in the world?',
    answer: 'Less than a century',
    options: ['Four hundred years', 'A thousand years', 'It never did'],
    must: ['Within a century of Muhammad’s death, an Islamic state ruled over the world’s largest empire at that time'],
    ev: [{ p: 'wh1-11.2-p38', q: 'Within a century of Muhammad’s death, an Islamic state ruled over the world’s largest empire at that time, first unifying the Arabian Peninsula through the Ridda Wars and then taking territory previously ruled by the flagging Byzantine and Sasanian Empires.' }],
  },
  {
    id: 'succession-war', kind: 'choice', big: 'caliphates', lens: ['contested'],
    prompt: 'Who should lead after Muhammad? What did that question bring about?',
    answer: 'A civil war, and Islam’s first dynasty',
    options: ['A council that settled it', 'An immediate split into two states', 'A return to tribal rule'],
    must: ['resulted in a civil war that brought Islam’s first dynasty to power'],
    ev: [{ p: 'wh1-11.2-p37', q: 'Tensions between the family of Muhammad—especially his son-in-law Ali, the fourth caliph—and the Umayyads resulted in a civil war that brought Islam’s first dynasty to power.' }],
  },
  {
    id: 'baghdad-knowledge', kind: 'choice', big: 'caliphates', lens: ['against-progress', 'record'],
    prompt: 'The centuries after Rome are often called dark. What were the Abbasids doing at Baghdad with the knowledge of the ancient world?',
    answer: 'Preserving and spreading it',
    options: ['Burning it as pagan', 'Keeping it sealed in the palace', 'Translating it only into Greek'],
    must: ['overseeing the preservation and dissemination of knowledge from the ancient world'],
    ev: [{ p: 'wh1-11.3-p43', q: 'By assimilating the late antique traditions of the Byzantines and Persians before supplanting them, integrating Arab culture northward throughout the region, and overseeing the preservation and dissemination of knowledge from the ancient world, the Muslims of the Middle East created a thriving cultural hub with considerable impact on world history in this period and beyond.' }],
  },
  {
    id: 'abbasid-end', kind: 'choice', big: 'caliphates', at: 1258, lens: ['record'],
    prompt: 'What ended the Abbasid Caliphate in 1258?',
    answer: 'The arrival of the Mongols',
    options: ['A Byzantine reconquest', 'The First Crusade', 'A Safavid invasion'],
    must: ['The arrival of the Mongols in the thirteenth century resulted in increased expansion but also the end of the Abbasid Caliphate in 1258'],
    ev: [{ p: 'wh2-4.1-p3', q: 'The arrival of the Mongols in the thirteenth century resulted in increased expansion but also the end of the Abbasid Caliphate in 1258.' }],
  },

  // ── what held it together ─────────────────────────────────────────────
  {
    id: 'no-caliphate', kind: 'choice', big: 'connected', at: 1500, lens: ['own-terms'],
    prompt: 'By 1500 Islamic states stretched from West Africa to Southeast Asia with no single caliphate over them. What gave that world its cohesion?',
    answer: 'A shared religion, and trade',
    options: ['A single sultan in Cairo', 'A common army', 'Treaties between the empires'],
    must: ['the religion of Islam allowed for a degree of cohesiveness and unity, despite theological disagreements'],
    ev: [{ p: 'wh2-4.1-p35', q: 'But although no single powerful caliphate held all these areas together, the religion of Islam allowed for a degree of cohesiveness and unity, despite theological disagreements.' }],
  },
  {
    id: 'letters-of-credit', kind: 'choice', big: 'connected', lens: ['economy'],
    prompt: 'What let a merchant cross the Islamic world without carrying a fortune in gold?',
    answer: 'Letters of credit',
    options: ['Armed escorts', 'Barter at every market', 'Coins minted by each city'],
    must: ['the widespread use of letters of credit, which were recognized in other Islamic lands and allowed merchants to travel without carrying large amounts of gold'],
    ev: [{ p: 'wh2-4.1-p13', q: 'Another benefit was the widespread use of letters of credit, which were recognized in other Islamic lands and allowed merchants to travel without carrying large amounts of gold.' }],
  },
  {
    id: 'market-inspector', kind: 'choice', big: 'connected', depth: 'detail', lens: ['economy'],
    prompt: 'A Muslim market inspector checked weights and measures, verified contracts and certified loads. What did that do for the merchants?',
    answer: 'Made them worth contracting with',
    options: ['Kept foreigners out of the market', 'Fixed the prices of goods', 'Replaced the need for judges'],
    must: ['The consistency with which Muslim merchants and traders operated was a key advantage of contracting with them'],
    ev: [{ p: 'wh2-4.1-p13', q: 'The consistency with which Muslim merchants and traders operated was a key advantage of contracting with them to transport goods long distances.' }],
  },
  {
    id: 'arabic-scholarship', kind: 'choice', big: 'connected', lens: ['record'],
    prompt: 'Scholars in the Islamic world were scattered across many states but rarely isolated. What made that possible?',
    answer: 'Arabic served them all',
    options: ['A single university at Baghdad', 'Printing, four centuries early', 'Annual councils at Mecca'],
    must: ['communication across long distances was possible in the Islamic world because Arabic, the language of the Quran, also served for most scholarly and administrative purposes'],
    ev: [{ p: 'wh2-4.1-p21', q: 'Despite the absence of centralized political authority, communication across long distances was possible in the Islamic world because Arabic, the language of the Quran, also served for most scholarly and administrative purposes as well as religious ones.' }],
  },
  {
    id: 'firearms-spread', kind: 'choice', big: 'connected', lens: ['economy'],
    prompt: 'Trade routes carried more than goods. Which technology gave the Ottomans, Safavids and Mughals an edge?',
    answer: 'Firearms and artillery',
    options: ['Water-powered mills', 'The printing press', 'Deep-sea shipbuilding'],
    must: ['Others had military applications, such as new firearms and artillery'],
    ev: [{ p: 'wh2-4.1-p36', q: 'Others had military applications, such as new firearms and artillery. These weapons provided advantages to some of the large Islamic empires of the era, like the Ottomans, Safavids, and Mughals.' }],
  },
  {
    id: 'dhimmi-system', kind: 'choice', big: 'connected', lens: ['contested'],
    prompt: 'Non-Muslim communities under Muslim rule were called dhimmis. What did that status mean?',
    answer: 'Legal protection, with restrictions',
    options: ['Full equality with Muslims', 'Expulsion within a generation', 'Forced conversion'],
    must: ['The dhimmi system was intended to provide religious minorities with official standing within the Muslim community and grant them legal protection, but it usually also included some rest'],
    ev: [{ p: 'wh2-4.1-p7', q: 'The dhimmi system was intended to provide religious minorities with official standing within the Muslim community and grant them legal protection, but it usually also included some rest' }],
  },
  {
    id: 'why-convert', kind: 'choice', big: 'connected', lens: ['economy', 'against-progress'],
    prompt: 'Conversion to Islam is often imagined as forced at sword-point. Why did many merchants convert?',
    answer: 'For access to trading networks',
    options: ['To escape military service', 'Because trade was closed to others', 'To be allowed to travel at all'],
    must: ['Merchants often converted to Islam to gain access to Islamic trading networks and potential business partners'],
    ev: [{ p: 'wh2-4.1-p8', q: 'Merchants often converted to Islam to gain access to Islamic trading networks and potential business partners.' }],
  },

  // ── the Ottomans ──────────────────────────────────────────────────────
  {
    id: 'millet', kind: 'choice', big: 'empires', lens: ['own-terms'],
    prompt: 'Under the Ottoman millet system, what did each religious community do for itself?',
    answer: 'Ran its own affairs and schools',
    options: ['Elected its own sultan', 'Raised its own army', 'Collected the empire’s taxes'],
    must: ['each religious community had its own leader, regulated its own affairs, and educated its own children'],
    ev: [{ p: 'wh2-4.2-p51', q: 'Sultans such as Suleiman I encouraged people of all ethnicities to settle there, and under the millet system, each religious community had its own leader, regulated its own affairs, and educated its own children.' }],
  },
  {
    id: 'three-languages', kind: 'choice', big: 'empires', depth: 'detail', lens: ['record'],
    prompt: 'The Ottoman Empire used three languages for three purposes: Turkish with the government, Arabic for scholarship and religion. What was Persian for?',
    answer: 'Literature',
    options: ['The law courts', 'The army', 'Trade with Europe'],
    must: ['Persian for literature'],
    ev: [{ p: 'wh2-4.2-p51', q: 'Turkish was for interacting with the government, Arabic for scholarship and in religious settings, and Persian for literature.' }],
  },
  {
    id: 'suleiman-lawgiver', kind: 'choice', big: 'empires', lens: ['own-terms', 'record'],
    prompt: 'Europeans called Suleiman I “the Magnificent”. What did the Ottomans call him, and for what?',
    answer: '“The lawgiver”, for his legal code',
    options: ['“The conqueror”, for Vienna', '“The navigator”, for his fleet', '“The builder”, for his mosques'],
    must: ['known in the West as “the Magnificent” and among Ottomans as “the lawgiver” for his creation of a legal code that applied throughout the realm'],
    ev: [{ p: 'wh2-4.2-p52', q: 'The empire reached its greatest heights under Suleiman I, known in the West as “the Magnificent” and among Ottomans as “the lawgiver” for his creation of a legal code that applied throughout the realm.' }],
  },
  {
    id: 'lepanto', kind: 'choice', big: 'empires', at: 1571, depth: 'detail', lens: ['record'],
    prompt: 'From which defeat is the decline of Ottoman power usually dated?',
    answer: 'The sea battle at Lepanto',
    options: ['The siege of Vienna', 'The loss of Egypt', 'The fall of Baghdad'],
    must: ['The Ottoman Empire began to decline in power following the defeat of its forces by European navies at the Battle of Lepanto in 1571'],
    ev: [{ p: 'wh2-4.2-p52', q: 'The Ottoman Empire began to decline in power following the defeat of its forces by European navies at the Battle of Lepanto in 1571.' }],
  },
  {
    id: 'devshirme', kind: 'choice', big: 'empires', lens: ['record'],
    prompt: 'Ottoman agents collected a tax from their European subjects every three to five years. What did it consist of?',
    answer: 'Christian boys, for the sultan’s service',
    options: ['Silver, weighed by village', 'Grain for the army', 'Horses for the cavalry'],
    must: ['Ottoman agents recruited Christian boys as part of the tax imposed on their European subjects'],
    ev: [{ p: 'wh1-17.2-p9', q: 'In a system known as the devshirme (“gathering”), Ottoman agents recruited Christian boys as part of the tax imposed on their European subjects ().' }],
  },
  {
    id: 'janissaries-loyalty', kind: 'choice', big: 'empires', lens: ['own-terms', 'contested'],
    prompt: 'Why did Ottoman sultans think the Janissaries more dependable than their own nobles?',
    answer: 'They depended on the sultan for everything',
    options: ['They were better paid', 'They were older and steadier', 'They were volunteers'],
    must: ['because they were entirely dependent upon the sultans for their status and privileges'],
    ev: [{ p: 'wh1-17.2-p10', q: 'In fact, the sultans believed the Janissaries would prove more dependable than the noble vassals, because they were entirely dependent upon the sultans for their status and privileges, and because they had been cut off from the biological families to whom they might otherwise have owed their first loyalty.' }],
  },
  {
    id: 'ottoman-peasants', kind: 'choice', big: 'empires', lens: ['against-progress'],
    prompt: 'European peasants who came under Ottoman rule were mostly Orthodox Christians. What were they allowed?',
    answer: 'Their faith, on paying a tax',
    options: ['Nothing; they had to convert', 'Their own courts and army', 'A vote for the local governor'],
    must: ['they were allowed to practice their faith without interference so long as they paid the special tax, the jizya'],
    ev: [{ p: 'wh1-17.1-p9', q: 'The European peasants who came under Ottoman control did not necessarily resent their new masters; the majority were Orthodox Christians, and they were allowed to practice their faith without interference so long as they paid the special tax, the jizya, and recognized their status as Ottoman subjects.' }],
  },

  // ── the Safavids ──────────────────────────────────────────────────────
  {
    id: 'safavid-sunni', kind: 'choice', big: 'empires', at: 1501, lens: ['contested'],
    prompt: 'The Safavid shahs of Iran were committed to Shi‘ite Islam. What did they do to the Sunni Muslims in their territories?',
    answer: 'Converted them by force',
    options: ['Taxed them as non-believers', 'Left them to their mosques', 'Expelled them to the Ottomans'],
    must: ['The Safavid shahs were committed to Shi‘ite Islam and forcibly converted the Sunni Muslims in their territories'],
    ev: [{ p: 'wh2-4.3-p39', q: 'The Safavid shahs were committed to Shi‘ite Islam and forcibly converted the Sunni Muslims in their territories.' }],
  },
  {
    id: 'sunni-shia-rift', kind: 'choice', big: 'empires', lens: ['contested', 'record'],
    prompt: 'What did that Safavid militance do to relations between Sunnis and Shia in the wider Muslim world?',
    answer: 'Opened a rift still apparent today',
    options: ['Settled the question for centuries', 'Had no effect outside Iran', 'Brought the two closer'],
    must: ['heightened tensions between Sunnis and Shia throughout the Muslim world, a rift still apparent today'],
    ev: [{ p: 'wh2-4.3-p39', q: 'But the Safavids’ militance and their intolerance of Sunnis heightened tensions between Sunnis and Shia throughout the Muslim world, a rift still apparent today.' }],
  },
  {
    id: 'safavid-art', kind: 'choice', big: 'empires', depth: 'detail', lens: ['own-terms'],
    prompt: 'What did the stability of the Safavid political system allow to flourish in Iran?',
    answer: 'Miniature painting and ceramics',
    options: ['Overseas trade', 'Parliamentary government', 'Printing in Persian'],
    must: ['The stability of the Safavids’ political system allowed for a flourishing of art, however, as exemplified in miniature painting, ceramics, and royal architecture'],
    ev: [{ p: 'wh2-4.3-p39', q: 'The stability of the Safavids’ political system allowed for a flourishing of art, however, as exemplified in miniature painting, ceramics, and royal architecture.' }],
  },
];
