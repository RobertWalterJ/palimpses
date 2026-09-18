// Canada · Chapter 4 (with §3.6) · New France, inside other people's worlds.
//
// The usual telling puts Champlain at the centre and the nations around him.
// Belshaw turns it round, and so do these questions: the Wendat approached the
// French; the Wabanaki grafted the Acadiens onto their lives; French settlers
// in the Pays d'en Haut found themselves "integrated … more into an Aboriginal
// world". And one question keeps the correction honest in the other direction:
// the Fox Wars "put the lie to the myth" of an always-benign French regime.

export default [
  // ── the stranger at Stadacona ──────────────────────────────────────────
  {
    id: 'hochelaga-walls', kind: 'choice', lens: ['own-terms'],
    prompt: 'Hochelaga, near Mount Royal, was a town of about 3,000 people. How was it defended?',
    answer: 'A triple palisade of wood',
    options: ['A stone wall and a moat', 'Earthen mounds like Cahokia’s', 'It had no defences at all'],
    must: ['triple palisade of wood', 'about 3,000 people'],
    ev: [{ p: 'pre-3.6-p6', q: 'Unlike Stadacona, Hochelaga was fortified with a triple palisade of wood. The town contained about 3,000 people and was surrounded by cornfields.' }],
  },
  {
    id: 'scurvy-cure', kind: 'choice', lens: ['own-terms', 'against-progress'],
    prompt: 'Most of Cartier’s crew were dying of scurvy in the winter at Stadacona. What saved the rest?',
    answer: 'A cure the Stadaconans gave them',
    options: ['Supplies shipped out from France', 'Fresh meat from Basque whalers', 'An early thaw and fresh greens'],
    must: ['a cure provided by the Stadaconans'],
    ev: [{ p: 'pre-3.6-p7', q: 'The good news was a cure provided by the Stadaconans that mitigated the vitamin C deficiency that causes scurvy and without which the whole of the French expedition would have been doomed.' }],
  },
  {
    id: 'cartier-abduction', kind: 'choice', lens: ['against-progress'],
    prompt: 'Donnacona had supported Cartier’s men through that winter. What did Cartier do next?',
    answer: 'Abducted him, his sons and seven others to France',
    options: ['Named him an ally of the French king', 'Paid him in iron for the winter’s food', 'Left him gifts and a promise to return'],
    must: ['Cartier abducted Donnaconna, his sons (again), and seven other Stadaconans', 'Nine of the 10 perished'],
    ev: [{ p: 'pre-3.6-p7', q: 'Cartier abducted Donnaconna, his sons (again), and seven other Stadaconans and took them all to France. Nine of the 10 perished, and the 10th never returned to Canada.' }],
  },
  {
    id: 'false-diamonds', kind: 'choice', lens: ['against-progress'],
    prompt: 'Cartier sailed home with “diamonds” and “gold” from Canada. What were they?',
    answer: 'Quartz and iron pyrites',
    options: ['Real gold from the Saguenay', 'Copper from Lake Superior', 'Mica and polished shell'],
    must: ['quartz and iron pyrites'],
    ev: [{ p: 'pre-3.6-p10', q: 'Cartier disappointed his sponsors with samples of quartz and iron pyrites from Canada, which he very optimistically claimed were, respectively, diamonds and gold.' }],
  },
  {
    id: 'hochelaga-fate', kind: 'choice', lens: ['contested'],
    prompt: 'By 1541 Hochelaga was gone. What happened to it?',
    answer: 'Nobody knows: war, disease, or a planned move',
    options: ['The French burned it in 1540', 'A flood on the St. Lawrence', 'Its people joined New France'],
    must: ['may have been destroyed by enemies or disease', 'the fate of Hochelaga remains unknown'],
    ev: [{ p: 'pre-3.6-p9', q: 'It may have been destroyed by enemies or disease' },
      { p: 'pre-3.6-p9', q: 'At the present time — and perhaps forever — the fate of Hochelaga remains unknown.' }],
  },

  // ── acadia, inside the wabanaki world ──────────────────────────────────
  {
    id: 'wabanaki-grafted', kind: 'choice', lens: ['own-terms', 'against-progress'],
    prompt: 'Acadia “wasn’t entirely the imposition of one people over another.” Who took in whom?',
    answer: 'The Wabanaki grafted the Acadiens onto their lives',
    options: ['The Acadiens absorbed the Wabanaki into Acadia', 'The English absorbed both peoples by treaty', 'Neither; the two peoples never mixed at all'],
    must: ['grafted the Acadiens onto their lives and struggles'],
    ev: [{ p: 'pre-4.2-p8', q: 'The Wabanaki Confederacy of Penobscot, Mi’kmaq, Maliseet, and Abenaki peoples grafted the Acadiens onto their lives and struggles.' }],
  },
  {
    id: 'wabanaki-preferred', kind: 'choice', lens: ['own-terms'],
    prompt: 'Why did the Wabanaki prefer the French to the English?',
    answer: 'The French were fewer, so posed fewer threats',
    options: ['The French paid far more for furs', 'The French king already ruled them', 'The French had the stronger navy'],
    must: ['the French posed fewer threats', 'the number of French in Acadia was never as great'],
    ev: [{ p: 'pre-4.2-p8', q: 'the Wabanaki preferred the French over the English precisely because the French posed fewer threats for several reasons. First, the number of French in Acadia was never as great or as worrisome as the number of English to the south.' }],
  },
  {
    id: 'catholic-mikmaq', kind: 'choice', lens: ['own-terms'],
    prompt: 'By the late 1600s, how did the number of Catholic Mi’kmaq compare with Catholic Acadiens?',
    answer: 'Perhaps about the same',
    options: ['Only a handful', 'Far fewer', 'None at all'],
    must: ['perhaps as many as there were Catholic French-Acadiens'],
    ev: [{ p: 'pre-4.2-p8', q: 'By the late 17th century there were many Catholic Mi’kmaqs, perhaps as many as there were Catholic French-Acadiens.' }],
  },
  {
    id: 'salt-marshes', kind: 'choice', lens: ['own-terms'],
    prompt: 'The Acadiens drained salt marshes to make pasture for their cattle. What did that let them avoid?',
    answer: 'Taking Wabanaki land',
    options: ['Paying tithes to the Church', 'Trading with New England', 'Building forts on the coast'],
    must: ['without, importantly, alienating Aboriginal land'],
    ev: [{ p: 'pre-4.2-p9', q: 'the draining of the salt marshes, a distinctively Acadien practice that created coastal and river-mouth pasture land on which to raise substantial herds of cattle — without, importantly, alienating Aboriginal land.' }],
  },

  // ── canada, and wendake ────────────────────────────────────────────────
  {
    id: 'tadoussac-innu', kind: 'choice', lens: ['own-terms'],
    prompt: 'Tadoussac was a fine place for hunting seals and whales. Who was doing that when Cartier visited in 1535?',
    answer: 'The Innu',
    options: ['The Mohawk', 'The Wendat', 'The Beothuk'],
    must: ['The Innu (Montagnais) were doing this when Cartier visited in 1535'],
    ev: [{ p: 'pre-4.3-p1', q: 'The Innu (Montagnais) were doing this when Cartier visited in 1535, and the Basques did it in the same century.' }],
  },
  {
    id: 'no-permission', kind: 'choice', lens: ['own-terms', 'economy'],
    prompt: 'Why did the young colony depend on Indigenous traders for its furs?',
    answer: 'It lacked the people, and the nations’ permission, to trap',
    options: ['French law forbade its settlers to trap', 'The beaver lived only in the far north', 'The Church banned trapping as a sin'],
    must: ['neither the manpower nor the permission of the local First Nations to engage directly in trapping'],
    ev: [{ p: 'pre-4.3-p10', q: 'the colony was dependent on Aboriginal traders in the fur trade as it had neither the manpower nor the permission of the local First Nations to engage directly in trapping.' }],
  },
  {
    id: 'renewal', kind: 'choice', lens: ['own-terms', 'economy'],
    prompt: 'Europeans often assumed a treaty or pact was made once and for all. What did the nations expect instead?',
    answer: 'Regular renewal, with gifts and declarations of loyalty',
    options: ['A written copy for each nation to keep', 'A fixed price set for every year after', 'Nothing more once the pact was agreed'],
    must: ['put an emphasis on renewal and reaffirmation', 'expected gifts and declarations of loyalty'],
    ev: [{ p: 'pre-4.4-p1', q: 'Aboriginal peoples, however, put an emphasis on renewal and reaffirmation: they expected gifts and declarations of loyalty from one another in commerce and diplomacy and expected no less from their European trading partners.' }],
  },
  {
    id: 'consensus', kind: 'choice', lens: ['own-terms'],
    prompt: 'How did Iroquoian councils try to reach decisions?',
    answer: 'By consensus from discussion — not always binding',
    options: ['By a single ruler’s command', 'By a vote of the richest families', 'By the ruling of the eldest priest'],
    must: ['efforts were made to develop consensus arising from discussion', 'not always binding on all parties'],
    ev: [{ p: 'pre-4.4-p1', q: 'Even when councils, which dominated the longhouse societies, reached decisions, these were not always binding on all parties. In Iroquoian societies in particular, efforts were made to develop consensus arising from discussion' }],
  },
  {
    id: 'wendat-approached', kind: 'choice', lens: ['own-terms', 'against-progress'],
    prompt: 'Many histories have Champlain drawing the Wendat into an alliance. Who actually approached whom?',
    answer: 'The Wendat approached the French',
    options: ['Champlain sought out the Wendat', 'The French king sent envoys west', 'Jesuits arranged the first meeting'],
    must: ['In point of fact, the Wendat approached the French.'],
    ev: [{ p: 'pre-4.4-p3', q: 'In point of fact, the Wendat approached the French.' }],
  },
  {
    id: 'visit-1609', kind: 'choice', lens: ['own-terms', 'economy'],
    prompt: 'The Wendat visited Champlain’s habitation in 1609 to size up the newcomers. What was their other purpose?',
    answer: 'To bring the Innu into their existing trade alliance',
    options: ['To ask the French for protection', 'To offer land to the French king', 'To invite Jesuits to Wendake'],
    must: ['engage the Innu (Montagnais) in a trade relationship that was already in place between the Wendat and the Algonquin nations'],
    ev: [{ p: 'pre-4.4-p7', q: 'First, it was meant to engage the Innu (Montagnais) in a trade relationship that was already in place between the Wendat and the Algonquin nations.' }],
  },
  {
    id: 'wealth-given', kind: 'choice', lens: ['economy', 'own-terms'],
    prompt: 'The Wendat were canny traders. What was wealth for?',
    answer: 'Giving away — generosity brought status',
    options: ['Hoarding, to show a family’s power', 'Paying tribute to the French', 'Buying land from neighbours'],
    must: ['wealth was acquired so that it could be given away', 'Generosity and lavish gift-giving was a route to status'],
    ev: [{ p: 'pre-4.4-p5', q: 'But wealth was acquired so that it could be given away: acquisitiveness and hoarding for personal use were frowned upon. Generosity and lavish gift-giving was a route to status in many Aboriginal societies' }],
  },
  {
    id: 'longhouse-warehouse', kind: 'choice', lens: ['economy', 'own-terms'],
    prompt: 'What let the Wendat stockpile furs as no one else north of Lake Ontario could?',
    answer: 'They were settled; longhouses doubled as warehouses',
    options: ['They had the largest canoes', 'They alone trapped in winter', 'They kept French clerks in every village'],
    must: ['the Wendat were sedentary', 'Their longhouses functioned as warehouses'],
    ev: [{ p: 'pre-4.4-p6', q: 'the simple fact that the Wendat were sedentary. Their longhouses functioned as warehouses, too.' }],
  },
  {
    id: 'wendake-half', kind: 'choice', lens: ['economy'],
    prompt: 'Wendake was 700 km of river from Montreal. How much of all the furs traded in the 1620s did it produce?',
    answer: 'About half',
    options: ['About a tenth', 'Almost none', 'Nearly all of them'],
    must: ['approximately half of all the furs traded in the 1620s'],
    ev: [{ p: 'pre-4.4-p9', q: 'Wendake (Huronia) was 700 km of river route away from Montreal but it produced approximately half of all the furs traded in the 1620s' }],
  },
  {
    id: 'french-seventy', kind: 'choice', lens: ['against-progress'],
    prompt: 'As the 1620s opened, how many French residents were there in Canada?',
    answer: 'Fewer than 70',
    options: ['About 1,500', 'About 12,000', 'About 40,000'],
    must: ['fewer than 70 French residents in Canada', 'utterly dependent on the engagement of Aboriginal partners'],
    ev: [{ p: 'pre-4.4-p11', q: 'the fur trade was utterly dependent on the engagement of Aboriginal partners. As the 1620s opened, there were fewer than 70 French residents in Canada.' }],
  },

  // ── whose account ──────────────────────────────────────────────────────
  {
    id: 'jesuit-relations', kind: 'choice', lens: ['record'],
    prompt: 'Much of what historians know about the Wendat comes from one set of writings. Whose?',
    answer: 'Jesuit missionaries’ letters, the Jesuit Relations',
    options: ['Wendat birchbark scrolls', 'Champlain’s maps and journals', 'Hudson’s Bay Company ledgers'],
    must: ['Jesuit Relations', 'Much of the information we have about the Wendat'],
    ev: [{ p: 'pre-4.7-p2', q: 'Much of the information we have about the Wendat and other groups in the Quebec area comes from these letters, collectively called the Jesuit Relations.' }],
  },
  {
    id: 'jesuit-approach', kind: 'choice', lens: ['record'],
    prompt: 'How did the Jesuits’ approach differ from most other missionaries’?',
    answer: 'They didn’t try to make people European first',
    options: ['They preached only in French', 'They lived only inside the forts', 'They refused to learn Wendat'],
    must: ['they did not try to Europeanize the Aboriginal people'],
    ev: [{ p: 'pre-4.7-p2', q: 'The Jesuit approach was distinct from that of most other missionary groups in that they did not try to Europeanize the Aboriginal people' }],
  },

  // ── the pays d'en haut ─────────────────────────────────────────────────
  {
    id: 'guests', kind: 'choice', lens: ['own-terms', 'economy'],
    prompt: 'Why did most nations of the Great Lakes and Ohio support the French?',
    answer: 'They took no land, came as guests, and gave gifts',
    options: ['The French king had conquered them in battle', 'French goods were cheaper than the English goods', 'The missions had converted nearly all of them'],
    must: ['They did not demand concessions of land', 'they arrived as (and generally behaved as) guests', 'they regularly and systematically gave gifts'],
    ev: [{ p: 'pre-4.9-p1', q: 'They did not demand concessions of land, they arrived as (and generally behaved as) guests, they regularly and systematically gave gifts of various kinds to maintain alliances' }],
  },
  {
    id: 'slave-gift', kind: 'choice', lens: ['economy', 'own-terms'],
    prompt: 'An allied nation offered the French a captive as a gift. What did accepting it do?',
    answer: 'Ruled out the captive’s nation as an ally',
    options: ['Made the captive a French subject', 'Bound the French to pay in guns', 'Nothing beyond the gift itself'],
    must: ['the slave’s nation of origin was ruled out as another ally'],
    ev: [{ p: 'pre-4.8-p7', q: 'accepting a slave-gift from one allied nation meant that the slave’s nation of origin was ruled out as another ally.' }],
  },
  {
    id: 'aboriginal-world', kind: 'choice', lens: ['own-terms', 'against-progress'],
    prompt: 'Across much of Louisiana and the Pays d’en Haut, what did French settlers find themselves part of?',
    answer: 'An Indigenous world more than a European one',
    options: ['A tightly run province of the French Crown', 'A Spanish trading empire run from Mexico', 'An English market economy based in Boston'],
    must: ['integrated less into a European system and more into an Aboriginal world'],
    ev: [{ p: 'pre-4.8-p8', q: 'French settlers and farmers soon found themselves integrated less into a European system and more into an Aboriginal world.' }],
  },
  {
    id: 'fox-wars', kind: 'choice', lens: ['against-progress'],
    prompt: 'The French and their allies waged war on the Meskwaki (Fox) until only a few hundred survived. What does Belshaw say it shows?',
    answer: 'French relations with the nations weren’t all benign',
    options: ['The Meskwaki had attacked Quebec itself', 'The French avoided wars in the west', 'The allies refused to take part'],
    must: ['puts the lie to the myth of unqualified positive relations', 'Only a few hundred Meskwaki survived'],
    ev: [{ p: 'pre-4.9-p4', q: 'Only a few hundred Meskwaki survived the Fox Wars.' },
      { p: 'pre-4.9-p5', q: 'First, it puts the lie to the myth of unqualified positive relations between the French and their Aboriginal neighbours.' }],
  },

  {
    id: 'fox-wars-allies', kind: 'choice', lens: ['against-progress'],
    prompt: 'Could the French have waged the Fox Wars on the Meskwaki alone?',
    answer: 'No — it needed their Indigenous allies’ support',
    options: ['Yes — French troops needed no help', 'Yes — the allies stayed neutral', 'No — the English did the fighting'],
    must: ['could not come to pass without the support of the Aboriginal allies'],
    ev: [{ p: 'pre-4.9-p5', q: 'It is important to note that, whatever Beauharnois might have wanted, it could not come to pass without the support of the Aboriginal allies.' }],
  },

  // ── in order ───────────────────────────────────────────────────────────
  {
    id: 'order-new-france', kind: 'order', lens: ['own-terms'],
    prompt: 'Oldest first.',
    items: [
      { label: 'Cartier finds the Innu hunting at Tadoussac', at: 1535, when: '1535', ev: { p: 'pre-4.3-p1', q: 'The Innu (Montagnais) were doing this when Cartier visited in 1535' } },
      { label: 'Port-Royal is founded on the Bay of Fundy', at: 1605, when: '1605', ev: { p: 'pre-4.2-p3', q: 'a viable presence was only established in July 1605, when Port-Royal was founded on the Bay of Fundy' } },
      { label: 'The Wendat Confederacy is dispersed', at: 1649, when: '1649', ev: { p: 'pre-4.4-p9', q: 'The Confederacy was dispersed in 1649.' } },
      { label: 'Louisiana is founded on the Mississippi', at: 1699, when: '1699', ev: { p: 'pre-4.8-p1', q: 'in 1699 French territorial claims in North America expanded dramatically when Louisiana was founded' } },
    ],
  },
];
