// World · Africa. From OpenStax World History (wh1 ch. 9 and 15, wh2 ch. 3),
// told from Africa's own centres — Kush, Aksum, Ghana, Mali, Songhai, Great
// Zimbabwe, the Swahili coast — with the authors' section summaries as the big
// picture. GLOSSARY_FROM: the sections whose glossary terms become generated
// questions (build/bundle.mjs).

export const GLOSSARY_FROM = ['wh1-9', 'wh1-15', 'wh2-3', 'wh1-10.3'];

// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'Africa, ancient times to the 1800s';

export const BIG = [
  { id: 'land', q: 'How did Africa’s land shape the ways its peoples lived?', src: ['wh1-9'],
    ev: [{ p: 'wh1-9.1-p32', q: 'Geography played a critical role in the development of early human civilization in Africa.' }] },
  { id: 'kingdoms', q: 'What kingdoms grew from Africa’s trade, and how did they rule?', src: ['wh1-15', 'wh2-3.1', 'wh2-3.2'],
    ev: [{ p: 'wh1-15.2-p53', q: 'Medieval African kingdoms and polities controlled vast territories, used emerging technologies, and governed populations that were heterogeneous and cosmopolitan.' }] },
  { id: 'faith', q: 'How did new faiths take root in Africa — and blend with old ones?', src: ['wh1-10.3'],
    ev: [{ p: 'wh1-15.1-p44', q: 'By the medieval period, the nature of religious belief throughout much of the continent had been utterly transformed.' }] },
  { id: 'wider', q: 'How was Africa tied to the wider world — and how did the slave trade change that?', src: ['wh2-3.3', 'wh2-3.4'],
    ev: [{ p: 'wh2-3.4-p31', q: 'Many of the coastal states became little more than arteries through which passed the caravans of captives destined for the markets of European slavers.' }] },
];

export default [
  // ── anchors: the widely known, with a fact taught in the question ──────
  {
    id: 'musa-pilgrimage', kind: 'choice', big: 'kingdoms', at: 1324, lens: ['own-terms'],
    prompt: 'Mansa Musa, the most famous ruler of the Mali Empire, drew attention from Arabia to Spain in 1324–1325. What was he doing?',
    answer: 'Making the pilgrimage to Mecca',
    options: ['Invading Egypt', 'Sailing into the Atlantic', 'Fleeing a revolt at home'],
    must: ['went on pilgrimage to Mecca in 1324–1325'],
    ev: [{ p: 'wh1-15.1-p38', q: 'Mansa Musa, perhaps the most famous ruler of Mali, drew the attention of observers from Arabia to Spain when he went on pilgrimage to Mecca in 1324–1325.' }],
  },
  {
    id: 'timbuktu', kind: 'choice', big: 'kingdoms', lens: ['own-terms', 'record'],
    prompt: 'Timbuktu was a trading town on the edge of the Sahara. What did Mansa Musa make of it?',
    answer: 'A centre of Islamic scholarship',
    options: ['A fortress against the Portuguese', 'A port for Atlantic ships', 'A market for enslaved people'],
    must: ['repositories of Islamic scholarship and learning'],
    ev: [{ p: 'wh2-3.1-p16', q: 'Mansa Musa, transformed the trading center of Timbuktu by establishing mosques and schools there that became repositories of Islamic scholarship and learning.' }],
  },
  {
    id: 'piye', kind: 'choice', big: 'kingdoms', at: -736, lens: ['own-terms', 'against-progress'],
    prompt: 'Egypt had often ruled Kush, the Nubian kingdom to its south. What did the Kushite king Piye do in the eighth century BCE?',
    answer: 'Took the throne of Egypt',
    options: ['Paid tribute to the pharaoh', 'Moved his people west', 'Built the Great Pyramid'],
    must: ['placed himself on the Egyptian throne'],
    ev: [{ p: 'wh1-9.3-p39', q: 'Incredibly, in the eighth century BCE, the Kushite king Piye turned the tables on Egypt and placed himself on the Egyptian throne.' }],
  },
  {
    id: 'cleopatra', kind: 'choice', big: 'wider', lens: ['record'],
    prompt: 'Cleopatra of Egypt used her influence with Julius Caesar and Marc Antony for her kingdom’s benefit. What followed?',
    answer: 'Egypt came under Roman rule',
    options: ['Egypt ruled Rome for a century', 'Rome and Egypt merged by treaty', 'Egypt stayed free until Arab rule'],
    must: ['Rome responded with force, and Egypt came under Roman rule'],
    ev: [{ p: 'wh1-9.4-p38', q: 'When Cleopatra of Egypt began influencing Roman officials, including Julius Caesar and Marc Antony, to the benefit of her kingdom, Rome responded with force, and Egypt came under Roman rule.' }],
  },

  // ── the land ────────────────────────────────────────────────────────
  {
    id: 'lived-with-land', kind: 'choice', big: 'land', lens: ['own-terms'],
    prompt: 'Africa’s peoples lived everywhere from the desert (the San) to the rainforest (the Baka). How did their ways of life relate to the land?',
    answer: 'Suited to it, and shaped by it',
    options: ['Much the same everywhere', 'Imposed on it by outside rulers', 'Unaffected by climate or soil'],
    must: ['not only suited to their geography but were also greatly influenced by it'],
    ev: [{ p: 'wh1-9.1-p32', q: 'All developed lifestyles and cultures that were not only suited to their geography but were also greatly influenced by it.' }],
  },
  {
    id: 'farming-independent', kind: 'choice', big: 'land', lens: ['against-progress'],
    prompt: 'Farming reached Egypt from southwest Asia. In the eastern Sahara and West Africa, where did it come from?',
    answer: 'It seems to have begun there, independently',
    options: ['From Egypt, along the Nile', 'From Roman settlers', 'From Arab traders, much later'],
    must: ['plant domestication appears to have emerged independently'],
    ev: [{ p: 'wh1-9.2-p30', q: 'In the other two locations, plant domestication appears to have emerged independently.' }],
  },
  {
    id: 'iron-independent', kind: 'choice', big: 'land', lens: ['against-progress'],
    prompt: 'Scholars once thought iron-working reached Africa through Egypt. What do they now generally agree?',
    answer: 'It was developed in Central Africa, independently',
    options: ['It came with Roman traders', 'It was brought from India by sea', 'It arrived with the Portuguese'],
    must: ['iron smelting was developed independently in Central Africa'],
    ev: [{ p: 'wh1-9.2-p31', q: 'Once believe to have been introduced to Africa through Egypt, scholars now generally agree that iron smelting was developed independently in Central Africa.' }],
  },
  {
    id: 'bantu', kind: 'choice', big: 'land', at: -3000, lens: ['own-terms'],
    prompt: 'From as early as 3000 BCE, Bantu-speaking peoples spread east and south from West and Central Africa, farming as they went. What did they transform?',
    answer: 'The languages spoken south of the equator',
    options: ['The coastlines, by building ports', 'The Sahara, by irrigating it', 'Nothing lasting; they returned'],
    must: ['dramatically transformed the linguistic makeup of much of subequatorial Africa'],
    ev: [{ p: 'wh1-9.2-p32', q: 'As they spread, they established farms, introduced others to agricultural practices, and dramatically transformed the linguistic makeup of much of subequatorial Africa.' }],
  },
  {
    id: 'meroe', kind: 'choice', big: 'kingdoms', lens: ['own-terms'],
    prompt: 'After Assyria conquered Egypt, the Kingdom of Kush moved south to Meroe. What was Meroe known for?',
    answer: 'Iron-making and trade goods',
    options: ['Its pyramids of gold', 'Its fleet on the Red Sea', 'Its horses and chariots'],
    must: ['known for its iron production and trade goods'],
    ev: [{ p: 'wh1-9.3-p40', q: 'There they built up a kingdom known for its iron production and trade goods.' }],
  },
  {
    id: 'kush-writing', kind: 'choice', big: 'kingdoms', lens: ['record', 'own-terms'],
    prompt: 'Kush blended Egyptian ways with Nubian traditions over many centuries. What did it develop of its own?',
    answer: 'Its own styles, even writing',
    options: ['Nothing; it copied Egypt exactly', 'A religion with no gods', 'The first coins in Africa'],
    must: ['its own distinctive styles and even writing system'],
    ev: [{ p: 'wh1-9.3-p40', q: 'For many centuries, the kingdom blended its many Egyptian cultural practices with Nubian traditions to develop its own distinctive styles and even writing system.' }],
  },

  // ── trade across the Sahara ─────────────────────────────────────────
  {
    id: 'sahara-goods', kind: 'choice', big: 'wider', lens: ['economy'],
    prompt: 'Rare goods crossed the Sahara from Africa’s interior to the Mediterranean, sought by Egyptians, Greeks, Romans and Arabs. Which?',
    answer: 'Salt, gold and ivory',
    options: ['Silk, tea and porcelain', 'Wheat, wine and olive oil', 'Spices, pepper and cotton'],
    must: ['salt, gold, and ivory'],
    ev: [{ p: 'wh1-9.4-p37', q: 'It was the source of rare and valuable commodities such as salt, gold, and ivory, transported from the African interior across the Sahara by Indigenous nomadic peoples' }],
  },
  {
    id: 'camel', kind: 'choice', big: 'wider', lens: ['economy'],
    prompt: 'The camel came to North Africa. What did it change?',
    answer: 'It made trade right across the Sahara practical',
    options: ['It replaced ships on the Nile', 'It ended trade with Rome', 'It carried armies into Europe'],
    must: ['enlarged the practical scope of truly trans-Saharan trade'],
    ev: [{ p: 'wh1-9.4-p38', q: 'Three hundred years later, the Romans’ introduction of the camel to North Africa enlarged the practical scope of truly trans-Saharan trade from the far south of the great desert to the Mediterranean coast.' }],
  },
  {
    id: 'caravan-leaders', kind: 'choice', big: 'wider', lens: ['own-terms', 'economy'],
    prompt: 'Who made the trans-Saharan trade possible, leading the caravans between oases?',
    answer: 'Nomadic peoples such as the Tuareg',
    options: ['Portuguese sea captains', 'Roman legions on patrol', 'Egyptian royal officials'],
    must: ['nomadic and seminomadic peoples such as the Sanhaja and Tuareg'],
    ev: [{ p: 'wh1-15.3-p33', q: 'This trade was made possible largely by nomadic and seminomadic peoples such as the Sanhaja and Tuareg who acted as caravan leaders, merchants, and traders.' }],
  },
  {
    id: 'ghana-rulers', kind: 'choice', big: 'faith', lens: ['own-terms'],
    prompt: 'Ghana’s rulers controlled West African trade and dealt with Muslim traders for centuries. Did they convert to Islam?',
    answer: 'No — though the rulers of Mali later did',
    options: ['Yes — the first in West Africa', 'Yes — after an Arab conquest', 'No — they banned Muslim traders'],
    must: ['who never converted', 'whose mansas converted to Islam'],
    ev: [{ p: 'wh1-15.2-p53', q: 'Ghanaian control over trans-Saharan trade in West Africa led to a thriving relationship between Muslim traders and the empire’s rulers, who never converted. After Ghana’s fall, the larger kingdom of Mali emerged, whose mansas converted to Islam.' }],
  },
  {
    id: 'songhai-wealth', kind: 'choice', big: 'kingdoms', lens: ['economy'],
    prompt: 'In the 1500s the Songhai Empire grew larger and wealthier even than Mali. What was its wealth built on?',
    answer: 'Salt, cloth and gold',
    options: ['Sugar and enslaved labour', 'Spices from India', 'Silver from the Americas'],
    must: ['salt, cloth, and gold'],
    ev: [{ p: 'wh2-3.2-p31', q: 'The basis of the Songhai Empire’s wealth was much the same as for the kingdoms that preceded it: salt, cloth, and gold.' }],
  },
  {
    id: 'great-zimbabwe', kind: 'choice', big: 'kingdoms', lens: ['own-terms', 'against-progress'],
    prompt: 'The Shona civilization of the Zimbabwean plateau grew rich on long-distance trade. What did it build?',
    answer: 'Medieval Africa’s largest stone structures',
    options: ['Nothing that has survived', 'Wooden forts, long since burned', 'Earth mounds like Cahokia’s'],
    must: ['medieval Africa’s largest stone structures'],
    ev: [{ p: 'wh1-15.2-p54', q: 'the Shona civilization of the Zimbabwean plateau used the wealth it generated to expand its territory and to build medieval Africa’s largest stone structures, many of which stand to this day.' }],
  },

  // ── faith ───────────────────────────────────────────────────────────
  {
    id: 'aksum-coins', kind: 'choice', big: 'faith', lens: ['record'],
    prompt: 'Aksum, in northeast Africa, became Christian early. What do its coins show?',
    answer: 'The cross gradually replacing other symbols',
    options: ['Roman emperors’ heads', 'Arabic writing from the Quran', 'No symbols at all'],
    must: ['coinage shows the Christian cross gradually replacing other symbols'],
    ev: [{ p: 'wh1-10.3-p4', q: 'coinage shows the Christian cross gradually replacing other symbols' }],
  },
  {
    id: 'beliefs-blended', kind: 'choice', big: 'faith', lens: ['own-terms'],
    prompt: 'Islam spread across West Africa and the Swahili coast. What became of older African beliefs?',
    answer: 'They lived on, some blended in',
    options: ['They disappeared within a century', 'They were banned by every ruler', 'They survived only in Egypt'],
    must: ['ancient African belief systems continued to be practiced', 'monotheistic beliefs were blended'],
    ev: [{ p: 'wh1-15.1-p44', q: 'Nevertheless, ancient African belief systems continued to be practiced in many rural communities. In other areas, monotheistic beliefs were blended with prehistoric religious practices' }],
  },

  // ── the Swahili coast and the wider world ───────────────────────────
  {
    id: 'swahili-united', kind: 'choice', big: 'wider', lens: ['own-terms'],
    prompt: 'City-states grew rich along Africa’s east coast. What united their people?',
    answer: 'Islam and the Swahili language',
    options: ['One king in Kilwa', 'Portuguese rule', 'The Christian church'],
    must: ['a shared religion, Islam, and a shared language, Swahili'],
    ev: [{ p: 'wh2-3.3-p20', q: 'Their people were united by a shared religion, Islam, and a shared language, Swahili.' }],
  },
  {
    id: 'swahili-winds', kind: 'choice', big: 'wider', lens: ['economy'],
    prompt: 'How did the Swahili city-states take part in trade across the Indian Ocean?',
    answer: 'They used the patterns of the winds',
    options: ['They rowed galleys to India', 'They waited for Chinese fleets', 'They traded only overland'],
    must: ['took advantage of wind patterns'],
    ev: [{ p: 'wh2-3.3-p20', q: 'City-states on the east coast of Africa grew in size and prosperity as they took advantage of wind patterns to participate in Indian Ocean trade.' }],
  },
  {
    id: 'portuguese-swahili', kind: 'choice', big: 'wider', lens: ['against-progress'],
    prompt: 'The Portuguese arrived on the Swahili coast in the late 1400s and tried to take over its trade. What happened?',
    answer: 'They were driven out of all but Mozambique',
    options: ['They ruled the coast for 300 years', 'The cities welcomed them as allies', 'Kilwa paid them to leave'],
    must: ['drove them from all the city-states except Mozambique'],
    ev: [{ p: 'wh2-3.3-p21', q: 'but a Somali-Ottoman alliance and the Omani Sultanate ultimately drove them from all the city-states except Mozambique.' }],
  },
  {
    id: 'captives-coast', kind: 'choice', big: 'wider', lens: ['economy', 'against-progress'],
    prompt: 'By the 1700s, West African trade turned from the Mediterranean toward the Atlantic coast. What turned it?',
    answer: 'European demand for captives, and chiefs’ pursuit of profit',
    options: ['A new gold find on the coast', 'The Sahara becoming impassable', 'Islamic law forbidding the caravans'],
    must: ['the European demand for enslaved captives', 'the desire of African chiefs to exploit opportunities for financial gain'],
    ev: [{ p: 'wh2-3.4-p31', q: 'By the eighteenth century, the European demand for enslaved captives and the desire of African chiefs to exploit opportunities for financial gain reoriented trans-Saharan trade away from traditional markets' }],
  },

  // ── in order ────────────────────────────────────────────────────────
  {
    id: 'order-africa', kind: 'order', big: 'kingdoms', lens: ['own-terms'],
    prompt: 'Oldest first.',
    items: [
      { label: 'Bantu speakers begin spreading east and south', at: -3000, when: 'c. 3000 BCE', ev: { p: 'wh1-9.2-p32', q: 'began spreading east and south as early as 3000 BCE' } },
      { label: 'Kush grows strong, centred on Napata', at: -736, when: '736 BCE', ev: { p: 'wh1-9.3-p16', q: 'By the year 736 BCE, the Kushite kingdom centered on Napata was growing in power and influence' } },
      { label: 'Mansa Musa’s pilgrimage to Mecca', at: 1324, when: '1324–1325', ev: { p: 'wh1-15.2-p28', q: 'The pilgrimage of Mansa Musa to Egypt and Mecca in 1324–1325 represents the golden age of the Mali Empire.' } },
    ],
  },
];
