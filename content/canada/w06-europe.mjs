// World · Europe. OpenStax World History (wh1 ch. 6, 7, 13, 16; wh2 ch. 5.1,
// 7, 10) — Europe as one region among the others in this app rather than the
// baseline they are measured against: whose labour built Rome, what the
// fourteenth century's cold and plague broke, where the Enlightenment's ideas
// came from, and who paid for industry.
//
// The Congress of Vienna and the Napoleonic wars belong to the empire thread,
// and the Haitian Revolution to the Atlantic chapter; neither is repeated here.
export const GLOSSARY_FROM = ['wh1-6', 'wh1-7', 'wh1-13', 'wh1-16', 'wh2-5.1', 'wh2-7', 'wh2-10'];
// Shown above every question in this chapter, so nobody has to guess whose
// history is being asked about.
export const ERA = 'Europe, ancient times to the 1900s';

export const BIG = [
  { id: 'ancient', q: 'What did Greece and Rome build — and on whose labour?', src: ['wh1-6', 'wh1-7'],
    ev: [{ p: 'wh1-7.2-p21', q: 'Rome relied on the labor of enslaved individuals who were mostly war captives but who might also have been born into slavery, kidnapped, or abandoned in infancy.' }] },
  { id: 'faith', q: 'How did Europe’s churches rise, divide and fight?', src: ['wh1-13', 'wh2-5.1'],
    ev: [{ p: 'wh2-5.1-p41', q: 'In the sixteenth century, many European Christians were critical of practices within the Catholic Church.' }] },
  { id: 'revolutions', q: 'What did Europe’s revolutions and industries change, and for whom?', src: ['wh1-16', 'wh2-7', 'wh2-10'],
    ev: [{ p: 'wh2-7.4-p22', q: 'In the wake of Napoléon’s defeat, Metternich and diplomats from Prussia, Russia, and Great Britain agreed to form a united front to maintain European peace and stability.' }] },
];

export default [
  // ── Rome ──────────────────────────────────────────────────────────────
  {
    id: 'rome-enslaved-who', kind: 'choice', big: 'ancient', lens: ['own-terms'],
    prompt: 'Rome ran on the labour of enslaved people. Where did most of them come from?',
    answer: 'They were captured in war',
    options: ['They were bought in Africa', 'They were convicted criminals', 'They were debtors'],
    must: ['Rome relied on the labor of enslaved individuals who were mostly war captives'],
    ev: [{ p: 'wh1-7.2-p21', q: 'Rome relied on the labor of enslaved individuals who were mostly war captives but who might also have been born into slavery, kidnapped, or abandoned in infancy.' }],
  },
  {
    id: 'rome-manumission', kind: 'choice', big: 'ancient', lens: ['record'],
    prompt: 'Freeing an enslaved person was called manumission in Rome. How common was it?',
    answer: 'Common enough to make a class',
    options: ['Almost unknown in practice', 'Allowed only by the emperor', 'Reserved for gladiators'],
    must: ['Manumission was common, and freed people formed a substantial class in a number of skilled professions'],
    ev: [{ p: 'wh1-7.2-p21', q: 'Manumission was common, and freed people formed a substantial class in a number of skilled professions.' }],
  },
  {
    id: 'rome-revolts', kind: 'choice', big: 'ancient', lens: ['against-progress'],
    prompt: 'What do the wars of Rome’s first century BCE show about the lives of the enslaved?',
    answer: 'How often they chose violence to escape',
    options: ['That most were content', 'That they were rarely guarded', 'That they could buy freedom'],
    must: ['the wars of the first century BCE show the frequency with which the enslaved chose violence as a way to escape'],
    ev: [{ p: 'wh1-7.2-p21', q: 'Enslaved life was often brutal, however, and the wars of the first century BCE show the frequency with which the enslaved chose violence as a way to escape.' }],
  },

  // ── the middle ages ───────────────────────────────────────────────────
  {
    id: 'classical-preserved', kind: 'choice', big: 'faith', lens: ['against-progress', 'record'],
    prompt: 'The centuries after Rome’s fall in the west are pictured as a blank. What were kings, clergy and scholars doing with the classical past?',
    answer: 'Preserving it, and trading across Afro-Eurasia',
    options: ['Destroying it as pagan', 'Ignoring it entirely', 'Selling it to Byzantium'],
    must: ['Kings, clergy, and scholars helped to preserve the classical past and maintain diplomatic and economic ties across western Afro-Eurasia'],
    ev: [{ p: 'wh1-13.1-p53', q: 'Kings, clergy, and scholars helped to preserve the classical past and maintain diplomatic and economic ties across western Afro-Eurasia.' }],
  },
  {
    id: 'crusades-failed', kind: 'choice', big: 'faith', lens: ['contested'],
    prompt: 'The Crusades are often told as a clash of faiths. How did they fail their own ideals?',
    answer: 'Massacres, and betraying fellow Christians',
    options: ['By never reaching Jerusalem', 'By refusing papal orders', 'By converting no one'],
    must: ['the massacre of innocents, the betrayal of other Christians, and the too-frequent use of warfare to meet political or economic goals'],
    ev: [{ p: 'wh1-13.4-p34', q: 'They were also complicated by the ways in which they failed their own ideals: the massacre of innocents, the betrayal of other Christians, and the too-frequent use of warfare to meet political or economic goals.' }],
  },
  {
    id: 'crusades-trade', kind: 'choice', big: 'faith', lens: ['economy'],
    prompt: 'Beyond the fighting, what did the Crusades do for Europe’s economy?',
    answer: 'Stimulated trade and the Italian city-states',
    options: ['Emptied the treasuries for a century', 'Ended trade with the east', 'Shifted wealth to the north'],
    must: ['helped to stimulate trade, the growth of the Italian city-states, and contact with peoples across Afro-Eurasia'],
    ev: [{ p: 'wh1-13.4-p34', q: 'The Crusades were a movement that signaled the growth of the papacy’s influence in western Europe and helped to stimulate trade, the growth of the Italian city-states, and contact with peoples across Afro-Eurasia.' }],
  },

  // ── the fourteenth century ────────────────────────────────────────────
  {
    id: 'climate-famine', kind: 'choice', big: 'revolutions', at: 1300, lens: ['record'],
    prompt: 'Historians can now read the climate of the past alongside written sources. What did the early 1300s bring to the Northern Hemisphere?',
    answer: 'Cold, wet years and famine',
    options: ['A long warm spell', 'Drought alone, and no cold', 'No measurable change'],
    must: ['a devastating period of lower temperatures and substantial changes in precipitation in the Northern Hemisphere that wiped out crops and led to widespread droughts and famines'],
    ev: [{ p: 'wh1-16.2-p29', q: 'Thus, we know that at the beginning of the fourteenth century, a prolonged period of temperate climate was followed by a devastating period of lower temperatures and substantial changes in precipitation in the Northern Hemisphere that wiped out crops and led to widespread droughts and famines.' }],
  },
  {
    id: 'plague-authority', kind: 'choice', big: 'revolutions', at: 1348, lens: ['against-progress'],
    prompt: 'The Black Death killed a vast share of Europe. What did the trauma do to how people saw the clergy and nobility?',
    answer: 'Made many question their privileges',
    options: ['Strengthened their standing', 'Left attitudes unchanged', 'Turned people to the crusades'],
    must: ['the psychological toll of the plague’s trauma led many to question the traditional privileges of the clergy and nobility'],
    ev: [{ p: 'wh1-16.3-p36', q: 'The formerly thriving cities of the Mamluk Sultanate in Egypt quickly deteriorated, and in Europe, the psychological toll of the plague’s trauma led many to question the traditional privileges of the clergy and nobility.' }],
  },
  {
    id: 'plague-wages', kind: 'choice', big: 'revolutions', lens: ['economy'],
    prompt: 'With so many dead, what could the peasants who survived do that their parents could not?',
    answer: 'Press their employers for more money',
    options: ['Buy the estates outright', 'Vote for their landlords', 'Refuse to farm at all'],
    must: ['peasants who remained in the countryside, especially males, were now able to press their employers for more money'],
    ev: [{ p: 'wh1-16.4-p3', q: 'Because the demand for labor was so high, peasants who remained in the countryside, especially males, were now able to press their employers for more money' }],
  },
  {
    id: 'feudalism-weakens', kind: 'choice', big: 'revolutions', lens: ['economy'],
    prompt: 'As the fourteenth century wore on, who was gaining wealth and power in Europe’s cities while feudalism weakened in the countryside?',
    answer: 'The merchant class',
    options: ['The monasteries', 'The old landowning families', 'The royal courts'],
    must: ['the merchant class began to acquire increasing wealth and power, while in the countryside the political and social pyramid known as feudalism began to weaken'],
    ev: [{ p: 'wh1-16.4-p2', q: 'In many medieval cities, the merchant class began to acquire increasing wealth and power, while in the countryside the political and social pyramid known as feudalism began to weaken.' }],
  },

  // ── the Reformation ───────────────────────────────────────────────────
  {
    id: 'indulgences', kind: 'choice', big: 'faith', at: 1517, lens: ['record'],
    prompt: 'What practice of the church did Martin Luther publicly object to, starting the Protestant Reformation?',
    answer: 'The sale of indulgences',
    options: ['The Latin mass', 'The celibacy of priests', 'The veneration of relics'],
    must: ['Martin Luther, a German monk, began the Protestant Reformation when he publicly objected to the church’s sale of indulgences'],
    ev: [{ p: 'wh2-5.1-p41', q: 'Martin Luther, a German monk, began the Protestant Reformation when he publicly objected to the church’s sale of indulgences.' }],
  },
  {
    id: 'printing-spread', kind: 'choice', big: 'faith', lens: ['record', 'economy'],
    prompt: 'Luther was excommunicated. What carried his ideas across Europe anyway?',
    answer: 'The printing press',
    options: ['Travelling preachers alone', 'The German princes’ armies', 'The universities of Italy'],
    must: ['the printing press enabled his ideas to spread throughout Europe'],
    ev: [{ p: 'wh2-5.1-p41', q: 'Luther was excommunicated, but the printing press enabled his ideas to spread throughout Europe.' }],
  },
  {
    id: 'henry-viii', kind: 'choice', big: 'faith', depth: 'detail', lens: ['record'],
    prompt: 'Why did Henry VIII of England reject the authority of the pope?',
    answer: 'He was refused an annulment',
    options: ['He had read Luther’s theses', 'He wanted the monasteries’ land', 'He was excommunicated first'],
    must: ['In England, Henry VIII rejected the pope’s authority after the pope refused to grant him an annulment'],
    ev: [{ p: 'wh2-5.1-p42', q: 'In England, Henry VIII rejected the pope’s authority after the pope refused to grant him an annulment.' }],
  },

  // ── the Enlightenment ─────────────────────────────────────────────────
  {
    id: 'enlightenment-sources', kind: 'choice', big: 'revolutions', lens: ['against-progress', 'record'],
    prompt: 'The Enlightenment is told as Europe reasoning its own way out of superstition. Whose scientific foundations did it build on?',
    answer: 'Muslim, Greek and Indian',
    options: ['Its own, and no one else’s', 'Roman and Egyptian', 'Chinese and Japanese'],
    must: ['the legacy of Muslim, Greek, and Indian scientific foundations'],
    ev: [{ p: 'wh2-7.1-p30', q: 'Inspired by the Scientific Revolution’s spirit of critical thinking, the ideas of the Italian Renaissance, and the legacy of Muslim, Greek, and Indian scientific foundations, the Enlightenment centered on the role of reason and generated a newfound optimism in philosophical principles such as liberty, rights, and the rejection of tyranny.' }],
  },
  {
    id: 'enlightenment-limits', kind: 'choice', big: 'revolutions', lens: ['contested', 'against-progress'],
    prompt: 'The Enlightenment laid foundations for the defence of human rights. What did it live alongside?',
    answer: 'Slavery and colonialism',
    options: ['An end to both', 'A ban on public debate', 'The collapse of the monarchies'],
    must: ['it coexisted with the oppressive institutions of slavery and colonialism'],
    ev: [{ p: 'wh2-7.1-p31', q: 'Despite its emphasis on ideals of freedom and liberty, it coexisted with the oppressive institutions of slavery and colonialism.' }],
  },
  {
    id: 'coffeehouses', kind: 'choice', big: 'revolutions', lens: ['own-terms'],
    prompt: 'Where could people of different backgrounds argue politics without fear of the state or the church?',
    answer: 'In the coffeehouses',
    options: ['In the churches themselves', 'At the royal court', 'In the universities'],
    must: ['coffeehouses provided a setting in which people from all social backgrounds who had the luxury of leisure could share ideas and opinions without fear of punishment from the state or church'],
    ev: [{ p: 'wh2-7.2-p20', q: 'As networks of informal socialization and intellectual exchange, coffeehouses provided a setting in which people from all social backgrounds who had the luxury of leisure could share ideas and opinions without fear of punishment from the state or church.' }],
  },
  {
    id: 'revolutions-cause', kind: 'choice', big: 'revolutions', lens: ['economy'],
    prompt: 'Alongside Enlightenment ideas, what material conditions led into the age of revolutions on both sides of the Atlantic?',
    answer: 'Famines and economic crises',
    options: ['A century of good harvests', 'War with the Ottomans', 'The collapse of trade with Asia'],
    must: ['a series of famines and economic crises deepened wealth inequality and narrowed access to political power on both sides of the Atlantic'],
    ev: [{ p: 'wh2-7.3-p47', q: 'Over the course of the eighteenth century, a series of famines and economic crises deepened wealth inequality and narrowed access to political power on both sides of the Atlantic.' }],
  },

  // ── industry ──────────────────────────────────────────────────────────
  {
    id: 'industry-both', kind: 'choice', big: 'revolutions', lens: ['economy', 'contested'],
    prompt: 'Factory work in the industrial age meant long hours, low wages and danger. What did it also bring working people?',
    answer: 'Goods they could finally afford',
    options: ['Shorter working lives', 'A share of the factories', 'Land of their own'],
    must: ['members of the working class could afford to purchase less-expensive versions of items that had once been available only to the middle and wealthy classes'],
    ev: [{ p: 'wh2-10.1-p50', q: 'Mass-produced consumer goods were priced so that by the end of the nineteenth century, members of the working class could afford to purchase less-expensive versions of items that had once been available only to the middle and wealthy classes.' }],
  },
  {
    id: 'industrial-city', kind: 'choice', big: 'revolutions', lens: ['own-terms'],
    prompt: 'Industrial cities drew people looking for work. Which of their pleasures were open to everyone?',
    answer: 'Libraries and parks',
    options: ['The opera and ballet', 'The department stores', 'The music halls'],
    must: ['Libraries and parks were open to everyone'],
    ev: [{ p: 'wh2-10.2-p40', q: 'Libraries and parks were open to everyone.' }],
  },
  {
    id: 'city-housing', kind: 'choice', big: 'revolutions', lens: ['record'],
    prompt: 'What was working-class and immigrant housing like in those same cities?',
    answer: 'Overcrowded, without air or light',
    options: ['Small but newly built', 'Provided by the factories', 'Cheap and spacious'],
    must: ['Housing, especially for immigrants and the working class, was usually overcrowded, and rooms often lacked fresh air and sunlight'],
    ev: [{ p: 'wh2-10.2-p41', q: 'Housing, especially for immigrants and the working class, was usually overcrowded, and rooms often lacked fresh air and sunlight.' }],
  },
  {
    id: 'unfree-labour', kind: 'choice', big: 'revolutions', lens: ['against-progress'],
    prompt: 'Industrial workers had little choice about their work. What kinds of labour continued elsewhere into the later 1800s?',
    answer: 'Slavery, serfdom and debt bondage',
    options: ['Only apprenticeships', 'Only convict labour', 'None; all had ended'],
    must: ['Slavery continued into the second half of the nineteenth century in the United States and Brazil, as did serfdom in Russia'],
    ev: [{ p: 'wh2-10.3-p18', q: 'Slavery continued into the second half of the nineteenth century in the United States and Brazil, as did serfdom in Russia.' }],
  },
  {
    id: 'migration-racism', kind: 'choice', big: 'revolutions', lens: ['contested'],
    prompt: 'Millions left home in the later 1800s for work abroad. What met non-European immigrants in societies dominated by Europeans?',
    answer: 'Racism, and laws to keep them out',
    options: ['Land grants and citizenship', 'Equal wages by law', 'A welcome, then quick assimilation'],
    must: ['Non-European immigrants also faced racism in societies dominated by Europeans'],
    ev: [{ p: 'wh2-10.4-p23', q: 'Non-European immigrants also faced racism in societies dominated by Europeans. Some countries attempted to restrict the immigration of particular groups.' }],
  },
  {
    id: 'reform-unions', kind: 'choice', big: 'revolutions', lens: ['own-terms', 'economy'],
    prompt: 'Faced with the conditions industry created, what did working people themselves do?',
    answer: 'Formed unions',
    options: ['Petitioned the churches', 'Emigrated in a body', 'Waited for the reformers'],
    must: ['Members of the working class tried to better their lives by forming unions'],
    ev: [{ p: 'wh2-10.5-p38', q: 'Members of the working class tried to better their lives by forming unions to force employers to redu' }],
  },
];
