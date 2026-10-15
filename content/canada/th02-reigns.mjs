// Thread · Reigns and dynasties. The one chapter in this app whose evidence is
// mostly RECORDS rather than sentences: a regnal list, the span of a dynasty,
// the dates a prime minister held office. Nobody wrote those as prose, so the
// app shows the record — field, value, source, licence and the date of the
// snapshot — instead of hunting for a paragraph that happens to contain a
// number.
//
// Robert, 14 October 2026: "I have long been confused about the order of
// Chinese dynasties and English kings." The point of putting them in one
// thread is the lanes: the timeline runs England, China and Canada side by
// side, so the answer to "what order did these come in" arrives attached to
// "and what was happening elsewhere".
//
// The data is in records/, taken from Wikidata (CC0) by build/fetch-records.mjs
// and committed, so every question can be checked against exactly the snapshot
// it was built from. What is NOT here is as deliberate: the dates Caribbean
// islands became independent, and the dates provinces joined Confederation,
// are not in this thread because Wikidata's "inception" means three different
// things at once — for Saint Lucia it gives 1967, the year of home rule, not
// 1979; for Prince Edward Island it gives 1769, the colony, not 1873. Those
// belong in prose, where a historian says which is which.

export const FROM_RECORDS = ['english-monarchs', 'chinese-dynasties', 'canadian-pms', 'ontario-premiers'];

export const LANES = [
  { id: 'england', name: 'England and Britain' },
  { id: 'china', name: 'China' },
  { id: 'canada', name: 'Canada' },
];

export const ERA = 'Reigns and dynasties, 2200 BCE–today';

export const BLURB = 'Three lists of rulers on one line: the kings and queens of England, the Chinese dynasties, and the prime ministers and premiers of Canada and Ontario. The dates are records rather than quotations, and every one of them says where it came from.';

export const BIG = [
  { id: 'order', q: 'What order did they come in?', src: [],
    ev: [{ p: 'wh1-1.3-p25', q: 'The historian’s main job is to discover why history happened as it did.' }] },
  { id: 'together', q: 'Who was ruling elsewhere at the same time?', src: [],
    ev: [{ p: 'wh1-10.2-p25', q: 'The two great superpowers of Late Antiquity, the Byzantine Empire and the Sasanian Empire, vied for supremacy in the fifth and sixth centuries.' }] },
  { id: 'offices', q: 'Who has governed Canada and Ontario since 1867?', src: [],
    ev: [{ p: 'post-2.14-p1', q: 'In 1870 Manitoba signed on and British Columbia followed in 1871.' }] },
];

export default [];
