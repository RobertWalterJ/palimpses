// Canada · the reference library: peoples, cultures and periods.
//
// Each entry names what the books call it (`match`: a pattern for every
// spelling and older name the text uses — the index finds passages with it)
// and gives a short lead in the books' own words (`lead`: quotes, verified
// verbatim like any question). Nothing here is written from memory: an entry
// says only what its quotes say, then lists every passage that mentions it.
//
// Names: the nation's own name first, older outsider names in `also` — the
// book's own nomenclature section (pre-2.4-p30) sets that rule.
//
// `group` places an entry on the library's map of the subject. The groups are
// regions of the continent and eras, not "Indigenous" versus "European": the
// newcomers are one group among several, which is the point of the app.

export default [
  // ── the northeast ──────────────────────────────────────────────────────
  {
    id: 'wendat', name: 'Wendat', also: ['Huron', 'Wendake (homeland)'], group: 'Northeast', kind: 'people',
    match: '\\bWendat|\\bWendake|\\bHuron(s|ia)?\\b',
    lead: [
      { p: 'pre-4.4-p13', q: 'That network depended on the involvement of Aboriginal traders and merchants, the most important to the French in this period being the Wendat (also known as the Huron) who called their confederacy and homeland Wendake (aka Huronia).' },
      { p: 'pre-4.4-p9', q: 'Wendake (Huronia) was 700 km of river route away from Montreal but it produced approximately half of all the furs traded in the 1620s' },
    ],
  },
  {
    id: 'haudenosaunee', name: 'Haudenosaunee', also: ['Five Nations', 'Six Nations', 'Iroquois'], group: 'Northeast', kind: 'people',
    match: 'Haudenosaunee|Iroquois|Five Nations|Six Nations',
    lead: [
      { p: 'pre-2.4-p14', q: 'the most successful and largest of which were the Haudenosaunee (also known as the League of the Tree of Peace and Power, or the Five Nations Iroquois) and the Wendat Confederacy.' },
      { p: 'pre-5.5-p5', q: 'Original members of this cultural and ceremonial organization or League — the Mohawk, Oneida, Onondaga, Cayuga, and Seneca — resolved long-standing differences by acceptance of the Great Law of Peace.' },
    ],
  },
  {
    id: 'mikmaq', name: 'Mi’kmaq', also: ['Micmac'], group: 'Northeast', kind: 'people',
    match: 'Mi.?kmaq|Micmac',
    lead: [
      { p: 'pre-2.4-p15', q: 'These include the Abenaki, Mi’kmaq, and Maliseet (subsequently known as the Wabanaki Confederacy) in what are now the Maritimes and much of modern New England' },
      { p: 'pre-2.2-p14', q: 'Whether in the longhouses of the Haudenosaunee (Five Nations Iroquois) or the seaside camps of the Mi’kmaq, Europeans witnessed the fruit of a long tradition of storytelling' },
    ],
  },
  {
    id: 'wabanaki', name: 'Wabanaki Confederacy', also: ['Abenaki', 'Maliseet', 'Penobscot'], group: 'Northeast', kind: 'people',
    match: 'Wabanaki|Abenaki|Maliseet|Penobscot',
    lead: [
      { p: 'pre-4.2-p8', q: 'The Wabanaki Confederacy of Penobscot, Mi’kmaq, Maliseet, and Abenaki peoples grafted the Acadiens onto their lives and struggles.' },
    ],
  },
  {
    id: 'innu', name: 'Innu', also: ['Montagnais'], group: 'Northeast', kind: 'people',
    match: '\\bInnu\\b|Montagnais',
    lead: [
      { p: 'pre-2.4-p15', q: 'the Innu (also known as Montagnais) on the north shore of the St. Lawrence and in the north-central Ungava Peninsula' },
    ],
  },
  {
    id: 'anishinaabe', name: 'Anishinaabe', also: ['Anishinaabeg (plural)', 'Ojibwe', 'Ojibwa', 'Saulteaux'], group: 'Northeast', kind: 'people',
    match: 'Anishinaab|Ojibw|Saulteaux|Chippewa|Three Fires',
    lead: [
      { p: 'pre-5.5-p10', q: 'Known in Anishinaabe as Niswi-mishkodewin, the Council of Three Fires was a venerable alliance between the Odawa (Ottawa) of Lake Huron’s north shore, the Anishinaabeg (Ojibwa) of the Sault Narrows between Lakes Huron and Superior, and the Potawatomi of what is now Michigan.' },
      { p: 'pre-2.2-p13', q: 'The nearest equivalent or comparable script known in Canada are the birchbark scrolls prepared by members of the Anishinaabeg nation.' },
    ],
  },
  {
    id: 'beothuk', name: 'Beothuk', also: [], group: 'Northeast', kind: 'people',
    match: 'Beothuk',
    lead: [
      { p: 'post-2.14-p4', q: 'Aboriginal people of Newfoundland; believed to have disappeared — due to exotic diseases, loss of territory, and armed conflict with European colonist' },
      { p: 'pre-7.5-p32', q: 'The Beothuk were among the first Aboriginal people to encounter Europeans.' },
    ],
  },

  // ── plains and subarctic ───────────────────────────────────────────────
  {
    id: 'cree', name: 'Cree', also: ['Nehiyawak'], group: 'Plains and Subarctic', kind: 'people',
    match: '\\bCree\\b',
    lead: [
      { p: 'pre-8.4-p3', q: 'The Cree were looking for reliable and long-term commercial alliances, not incidental trade opportunities.' },
      { p: 'pre-5.3-p23', q: 'the Iron Confederacy (Cree, Assiniboine, Anishinaabe)' },
    ],
  },
  {
    id: 'niitsitapi', name: 'Niitsitapi', also: ['Blackfoot Confederacy'], group: 'Plains and Subarctic', kind: 'people',
    match: 'Niitsitapi|Blackfoot|Siksika|Kainai|Piikani',
    lead: [
      { p: 'pre-5.8-p4', q: 'Also known as the Niitsitapi, an alliance centred in the western Plains, in territory that extended from what is now southern Alberta into Montana' },
      { p: 'pre-2.4-p11', q: 'Head-Smashed-In was in use for thousands of years, into the historic period, when Blackfoot, disguised as coyote and wolves, would drive buffalo along established “drive lanes” to the cliff.' },
    ],
  },
  {
    id: 'dene', name: 'Dene', also: ['Athabascan / Na-Dené language family', 'Chipewyan'], group: 'Plains and Subarctic', kind: 'people',
    match: '\\bDene\\b|Athabascan|Athapaskan|Chipewyan',
    lead: [
      { p: 'pre-2.5-p1', q: 'the two most widely spoken language groups before contact — Athabascan or Na-Dené and Algonquian — cover massive areas and include societies that were separated by huge distances.' },
    ],
  },
  {
    id: 'mandan', name: 'Mandan and Hidatsa', also: [], group: 'Plains and Subarctic', kind: 'people',
    match: 'Mandan|Hidatsa',
    lead: [
      { p: 'pre-2.4-p10', q: 'Among the most important of these was the Mandan, whose villages along the Missouri and Knife Rivers survived until the smallpox catastrophe of the 1830s.' },
      { p: 'pre-2.4-p10', q: 'The Mandan villages acted as the commercial hub of an enormous wheel of Plains culture' },
    ],
  },
  {
    id: 'metis', name: 'Métis', also: [], group: 'Plains and Subarctic', kind: 'people',
    match: 'M[ée]tis',
    lead: [
      { p: 'pre-8.12-p14', q: 'Capitalized, it refers to people of mixed ancestry (European and Aboriginal) who self-identify with a synthetic culture that evolved mainly around the' },
      { p: 'pre-8.1-p3', q: 'The emergence of the “new nation” — the Métis — and their neighbours the “country born” gave substance to the concept of fur trade society.' },
    ],
  },

  // ── the arctic ─────────────────────────────────────────────────────────
  {
    id: 'inuit', name: 'Inuit', also: [], group: 'Arctic', kind: 'people',
    match: '\\bInuit|\\bInuk\\b',
    lead: [
      { p: 'pre-8.2-p3', q: 'Inuit culture — descended from Thule traditions — dominated the arctic rim of North America from ca. 1500 to the present.' },
      { p: 'pre-8.4-p10', q: 'one that depended on smaller bands hunting for caribou and muskox on land, and whales, walrus, and seals at sea.' },
    ],
  },
  {
    id: 'thule', name: 'Thule', also: [], group: 'Arctic', kind: 'culture', when: 'from about 1000 CE',
    match: '\\bThule\\b',
    lead: [
      { p: 'pre-8.12-p29', q: 'Arctic culture that evolved into Inuit culture. The Thule migrated across and occupied the Arctic mainland and islands beginning about 1000 CE' },
    ],
  },
  {
    id: 'dorset', name: 'Dorset', also: [], group: 'Arctic', kind: 'culture', when: 'c. 500 BCE–1500 CE',
    match: '\\bDorset\\b',
    lead: [
      { p: 'pre-8.12-p8', q: 'The Paleo-Eskimo culture that existed in the Canadian Arctic from about 500 BCE-1500 CE. Succeeded by the Inuit Culture.' },
    ],
  },

  // ── pacific and plateau ────────────────────────────────────────────────
  {
    id: 'kwakwakawakw', name: 'Kwakwaka’wakw', also: ['Kwakiutl'], group: 'Pacific and Plateau', kind: 'people',
    match: 'Kwakwaka|Kwakiutl',
    lead: [
      { p: 'pre-2.4-p22', q: 'The Kwakwaka’wakw, whose domain extended in pre-contact times from the northern tip of Vancouver Island south along its east coast to Quadra Island and possibly farther, assembled kin groups (numayms) as part of a system of social rank' },
    ],
  },
  {
    id: 'nuuchahnulth', name: 'Nuu-chah-nulth', also: ['Nootka'], group: 'Pacific and Plateau', kind: 'people',
    match: 'Nuu-cha?h?-nulth|Nootka',
    lead: [
      { p: 'pre-2.3-p23', q: 'The Nuu-chah-nulth of Vancouver Island, for example, began whaling with advanced long spears.' },
    ],
  },
  {
    id: 'haida', name: 'Haida', also: ['Haida Gwaii (homeland)'], group: 'Pacific and Plateau', kind: 'people',
    match: 'Haida',
    lead: [
      { p: 'pre-2.3-p17', q: 'In the creation story of the Haida, Raven arranges things nicely and then releases the first humans from a clamshell' },
    ],
  },
  {
    id: 'nlakapamux', name: 'Nlaka’pamux', also: [], group: 'Pacific and Plateau', kind: 'people',
    match: 'Nlaka',
    lead: [
      { p: 'pre-2.2-p15', q: 'Comparing the oral record of the Nlaka’pamux with fur trader and explorer Simon Fraser’s written account of contact in 1808, she found both remarkable similarities and revealing differences.' },
    ],
  },
  {
    id: 'stolo', name: 'Stó:lō', also: ['Coast Salish'], group: 'Pacific and Plateau', kind: 'people',
    match: 'St[óo]:?l[ōo]|Coast Salish',
    lead: [
      { p: 'pre-13.2-p9', q: 'Interior peoples like the Nlaka’pamux had connections with Stó:lō peoples in the lower Fraser Valley, commercial and military alliances that were facilitated by their common language group (Salishan).' },
    ],
  },

  // ── beyond: the continent's other centres ──────────────────────────────
  {
    id: 'mississippian', name: 'Mississippian culture', also: ['Cahokia'], group: 'The continent’s other centres', kind: 'culture', when: 'c. 500–1400 CE',
    match: 'Mississippian|Cahokia',
    lead: [
      { p: 'pre-2.6-p37', q: 'An agricultural, town-centred civilization that thrived from ca. 500-1400 CE.' },
      { p: 'pre-2.4-p6', q: 'Cahokia was a walled complex made up of 120 mounds that housed perhaps as many as 30,000 people' },
    ],
  },
  {
    id: 'maya', name: 'Maya', also: ['Mayan civilization'], group: 'The continent’s other centres', kind: 'culture', when: 'crest c. 200–900 CE',
    match: '\\bMaya',
    lead: [
      { p: 'pre-2.2-p11', q: 'The Mayan civilizations in particular advanced writing to a point where it included glyphs (symbols for things or people) and syllabics' },
      { p: 'pre-2.3-p28', q: 'from about 200 to 900 CE the Mayan civilization crested' },
    ],
  },
  {
    id: 'aztec', name: 'Mexica (Aztec)', also: ['Aztec Triple Alliance', 'Tenochtitlan'], group: 'The continent’s other centres', kind: 'culture', when: '1300s–1500s',
    match: 'Aztec|Mexica|Tenochtitlan',
    lead: [
      { p: 'pre-2.6-p10', q: 'A Mesoamerican civilization and polity that collapsed in the early 16th century.' },
      { p: 'pre-2.3-p28', q: 'The Aztec capital of Tenochtitlan was, in the late 1400s, one of the largest cities on the planet and possibly the most beautiful' },
    ],
  },

  {
    id: 'casarabe', name: 'Casarabe culture', also: ['Llanos de Mojos', 'Cotoca', 'Landívar'], group: 'The continent’s other centres', kind: 'culture', when: 'c. 500–1400 CE',
    match: 'Casarabe',
    lead: [
      { p: 'prumers2022-main-p1', q: 'The Casarabe culture developed here between around ad 500 and ad 1400, spreading over an area of 4,500 km2' },
      { p: 'prumers2022-conclusions-p1', q: 'Our results put to rest arguments that western Amazonia was sparsely populated in pre-Hispanic times.' },
    ],
  },

  // ── newcomers ──────────────────────────────────────────────────────────
  {
    id: 'norse', name: 'Norse', also: ['Vikings', 'L’Anse aux Meadows'], group: 'Newcomers', kind: 'people',
    match: 'Norse|Viking|L.Anse aux Meadows|Vinland',
    lead: [
      { p: 'pre-3.2-p8', q: 'The location of Vinland is uncertain, but an archaeological site on the northern tip of Newfoundland at L’Anse aux Meadows has been identified as a good candidate.' },
      { p: 'pre-3.2-p9', q: 'the Viking legacy evaporated with their departure.' },
    ],
  },
  {
    id: 'basque', name: 'Basque fishers and whalers', also: [], group: 'Newcomers', kind: 'people',
    match: 'Basque',
    lead: [
      { p: 'pre-3.2-p11', q: 'the enthusiasm with which Basque, Bristol, and French whaling and fishing fleets patrolled the Grand Banks in the era of recorded voyages suggests that they were one step ahead of John Cabot’s voyage in 1497 at the very least.' },
    ],
  },
  {
    id: 'acadians', name: 'Acadiens', also: ['Acadians', 'Cajuns (in Louisiana)'], group: 'Newcomers', kind: 'people',
    match: 'Acadi',
    lead: [
      { p: 'pre-4.2-p8', q: 'The Wabanaki Confederacy of Penobscot, Mi’kmaq, Maliseet, and Abenaki peoples grafted the Acadiens onto their lives and struggles.' },
      { p: 'pre-4.2-p5', q: 'Many of the deported Acadiens wound up in Louisiana where their group name evolved into Cajuns' },
    ],
  },
  {
    id: 'loyalists', name: 'Loyalists', also: ['United Empire Loyalists'], group: 'Newcomers', kind: 'people',
    match: 'Loyalist',
    lead: [
      { p: 'pre-6.12-p25', q: 'British-American colonists who were opposed to the revolutionary position struck by other colonists.' },
    ],
  },

  // ── periods ────────────────────────────────────────────────────────────
  {
    id: 'paleo-indian', name: 'Paleo-Indian period', also: [], group: 'Periods', kind: 'period', when: 'until c. 8000 BPE', at: -12000,
    match: 'Paleo-Indian',
    lead: [
      { p: 'pre-2.6-p42', q: 'The peoples occupying parts of the Americas until about 8000 BPE.' },
      { p: 'pre-2.3-p19', q: 'Paleo-Indians were nomadic hunter-gatherers.' },
    ],
  },
  {
    id: 'archaic', name: 'Archaic period', also: [], group: 'Periods', kind: 'period', when: 'c. 10,000–3,000 BPE', at: -8000,
    match: '\\bArchaic\\b',
    lead: [
      { p: 'pre-2.6-p9', q: 'The era described by archaeologists and anthropologists as roughly 10,000-3,000 years BPE.' },
      { p: 'pre-2.3-p25', q: 'It was, as well, during the Archaic and Woodland periods that the peoples of the Americas also began to domesticate plants' },
    ],
  },
  {
    id: 'maritime-archaic', name: 'Maritime Archaic', also: [], group: 'Periods', kind: 'period', when: 'c. 7000–1500 BCE', at: -7000,
    match: 'Maritime Archaic',
    lead: [
      { p: 'pre-2.6-p31', q: 'A variant on the Archaic tradition. Maritime Archaic cultures were found on the Atlantic coast.' },
      { p: 'pre-2.3-p24', q: 'They engaged in long-distance trade, using as currency white chert' },
    ],
  },
  {
    id: 'woodland', name: 'Woodland period', also: [], group: 'Periods', kind: 'period', when: 'c. 1000 BCE–1000 CE', at: -1000,
    match: 'Woodland [Pp]eriod',
    lead: [
      { p: 'pre-2.6-p55', q: 'The era described by archaeologists and anthropologists as roughly 1000 BCE-1000 CE.' },
    ],
  },
  {
    id: 'little-ice-age', name: 'The little ice age', also: [], group: 'Periods', kind: 'period', when: 'late 1200s–1820s', at: 1280,
    match: 'little ice age',
    lead: [
      { p: 'pre-2.6-p28', q: 'The term given to a hemispheric downturn in average temperatures that lasted from the 1600s (as early as the late 1200s in some locales) to the 1820s.' },
      { p: 'pre-2.4-p9', q: 'The “little ice age,” beginning in the late 1200s, had severe impacts on farming communities.' },
    ],
  },
  {
    id: 'proto-contact', name: 'Proto-contact', also: [], group: 'Periods', kind: 'period', when: 'before direct contact', at: 1500,
    match: 'proto-contact',
    lead: [
      { p: 'pre-2.6-p49', q: 'The period of indirect influence of Europeans on Aboriginal peoples. Some of the effects of contact ran ahead of direct encounters.' },
    ],
  },
];
