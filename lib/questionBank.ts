import { getAllModules, type Module, type Question } from '@/lib/curriculum';

export const ACTIVITY_QUESTION_COUNT = 60;

const names = ['Maya', 'Jordan', 'Avery', 'Riley', 'Sam', 'Kai', 'Nora', 'Eli', 'Leah', 'Omar', 'Ivy', 'Theo'];

function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function question(id: string, prompt: string, answer: string, distractors: string[], explanation: string): Question {
  const options = [...new Set([answer, ...distractors])].slice(0, 4);
  while (options.length < 4) options.push(`Another possible response ${options.length}`);
  return { id, prompt, choices: shuffled(options), answer, explanation };
}

function numericQuestion(id: string, prompt: string, answer: number | string, distractors: Array<number | string>, explanation: string): Question {
  return question(id, prompt, String(answer), distractors.map(String), explanation);
}

function mathQuestion(module: Module, index: number): Question {
  const period = module.id.slice(0, 3);
  const scenario = Math.floor(index / 5) + 1;
  const skill = index % 5;
  const a = scenario + 2;
  const b = (scenario % 7) + 2;
  const id = `${module.id}-generated-${index + 1}`;

  if (period === 'mp1') {
    if (skill === 0) {
      const left = scenario % 2 ? -a : a;
      const right = scenario % 3 ? b : -b;
      const answer = left + right;
      return numericQuestion(id, `Evaluate ${left} + (${right}).`, answer, [answer + 1, answer - 2, -answer], 'Add the signed values, keeping track of each number’s sign.');
    }
    if (skill === 1) {
      const answer = -a * b;
      return numericQuestion(id, `What is (−${a}) × ${b}?`, answer, [a * b, answer + b, answer - a], 'A negative number times a positive number gives a negative product.');
    }
    if (skill === 2) {
      const coefficient = (scenario % 5) + 2;
      const constant = scenario + 3;
        return question(id, `A garden has ${coefficient} rows with (x + ${constant}) seedlings in each row. Which expression gives the total?`, `${coefficient}x + ${coefficient * constant}`, [`${coefficient}x + ${constant}`, `x + ${coefficient * constant}`, `${coefficient + constant}x`], 'Use the distributive property to multiply the coefficient by both terms.');
    }
    if (skill === 3) {
      const coefficient = (scenario % 4) + 2;
      const solution = scenario % 6 + 1;
      const constant = scenario + 2;
      const total = coefficient * solution + constant;
      return numericQuestion(id, `Solve ${coefficient}x + ${constant} = ${total}.`, solution, [solution + 1, solution - 1, total - constant], 'Undo addition first, then divide both sides by the coefficient.');
    }
    const denominator = (scenario % 5) + 2;
    return question(id, `Which value is greater: −${a}/${denominator} or ${b}/${denominator}?`, `${b}/${denominator}`, [`−${a}/${denominator}`, 'They are equal', 'Cannot be determined'], 'A positive rational number is greater than a negative rational number.');
  }

  if (period === 'mp2') {
    if (skill === 0) {
      const base = scenario * 20;
      const percent = [10, 20, 25, 50, 75][scenario % 5];
      const answer = base * percent / 100;
      return numericQuestion(id, `What is ${percent}% of ${base}?`, answer, [answer + percent, base - answer, answer / 2], 'Convert the percent to a decimal or fraction, then multiply by the whole.');
    }
    if (skill === 1) {
      const hours = scenario % 5 + 2;
      const rate = scenario + 4;
      const total = hours * rate;
      return numericQuestion(id, `${total} pages are read in ${hours} hours. What is the unit rate in pages per hour?`, rate, [total - hours, rate + hours, total + hours], 'Divide the total number of pages by the number of hours.');
    }
    if (skill === 2) {
      const scale = scenario + 2;
      return numericQuestion(id, `A map uses 1 cm for ${scale} km. How many km does 2 cm represent?`, scale * 2, [scale, scale * 3, scale * 4], 'Use the constant scale ratio: double the map distance, double the real distance.');
    }
    if (skill === 3) {
      const price = scenario * 20;
      const discount = 25;
      const answer = price - price * discount / 100;
      return numericQuestion(id, `A $${price} item is discounted by ${discount}%. What is the sale price?`, answer, [price * discount / 100, price - discount, price + discount], 'Find 25% of the original price, then subtract the discount.');
    }
    const units = scenario + 1;
    const cost = units * 3;
    return numericQuestion(id, `${units} notebooks cost $${cost}. At the same rate, what do ${units * 2} notebooks cost?`, cost * 2, [cost + 2, units * 2, cost * 3], 'The number of notebooks doubles, so the proportional cost doubles.');
  }

  if (period === 'mp3') {
    if (skill === 0) {
      const coefficient = scenario % 5 + 2;
      const solution = scenario % 7 + 1;
      const constant = scenario + 4;
      const total = coefficient * solution + constant;
      return numericQuestion(id, `Solve ${coefficient}x + ${constant} = ${total}.`, solution, [solution + 2, solution - 1, total - coefficient], 'Subtract the constant from both sides, then divide by the coefficient.');
    }
    if (skill === 1) {
      const boundary = scenario + 8;
      const value = boundary + (scenario % 4);
      return question(id, `Which value satisfies x ≥ ${boundary}?`, String(value), [String(boundary - 1), String(boundary - 3), String(boundary - 2)], 'A value satisfies x ≥ the boundary when it is equal to or greater than the boundary.');
    }
    if (skill === 2) {
      const rate = scenario + 3;
      const fixed = scenario + 5;
      return question(id, `A club charges $${fixed} to join and $${rate} per visit. Which expression gives the cost for v visits?`, `${rate}v + ${fixed}`, [`${fixed}v + ${rate}`, `${rate + fixed}v`, `${rate} + ${fixed}`], 'Multiply the per-visit cost by v and add the one-time fee.');
    }
    if (skill === 3) {
      const x = scenario + 2;
      const coefficient = scenario % 4 + 2;
      return numericQuestion(id, `Evaluate ${coefficient}x − ${scenario} when x = ${x}.`, coefficient * x - scenario, [coefficient * x + scenario, coefficient + x - scenario, coefficient * (x - scenario)], 'Substitute the given value for x, then follow the order of operations.');
    }
    const x = scenario + 1;
    return question(id, `Which equation has solution x = ${x}?`, `x + ${b} = ${x + b}`, [`x − ${b} = ${x + b}`, `${b}x = ${x + b}`, `x + ${b} = ${x + b + 1}`], 'Substitute the proposed solution into each equation and check both sides.');
  }

  if (skill === 0) {
    const angleA = 35 + (scenario % 8) * 5;
    const angleB = 60 + (scenario % 7) * 7;
    const first = angleA;
    const second = angleB;
    const answer = 180 - first - second;
    return numericQuestion(id, `A triangle has angles ${first}° and ${second}°. What is its third angle?`, answer, [180 - first, 180 - second, first + second], 'The interior angles of a triangle add to 180 degrees.');
  }
  if (skill === 1) {
    const length = scenario + 4;
    const width = scenario + 2;
    return numericQuestion(id, `What is the area of a ${length}-by-${width} rectangle?`, length * width, [2 * (length + width), length + width, length * width + 2], 'Area is length multiplied by width.');
  }
  if (skill === 2) {
    const favorable = scenario % 4 + 1;
    const total = scenario + 8;
    return question(id, `A spinner has ${total} equal sections, ${favorable} of them green. What is P(green)?`, `${favorable}/${total}`, [`${total}/${favorable}`, `${favorable + 1}/${total}`, `${total - favorable}/${total}`], 'Probability is the number of favorable outcomes divided by the total number of equally likely outcomes.');
  }
  if (skill === 3) {
    const scale = scenario + 2;
    return numericQuestion(id, `A drawing scale is 1 cm : ${scale} m. What real length does ${scale} cm represent?`, scale * scale, [scale + 1, scale * 2, scale * scale + scale], 'Multiply the drawing length by the scale factor.');
  }
  const coefficient = scenario % 5 + 2;
  const solution = scenario % 6 + 2;
  return numericQuestion(id, `If y = ${coefficient}x and x = ${solution}, what is y?`, coefficient * solution, [coefficient + solution, coefficient * solution + 1, coefficient * (solution - 1)], 'Substitute the value of x and multiply.');
}

function languageQuestion(module: Module, context: number, skill: number): Question {
  const id = `${module.id}-generated-${context * 5 + skill + 1}`;
  const name = names[context];
  const period = module.id.slice(0, 3);

  if (period === 'mp1') {
    const goals = ['finish a difficult science model', 'learn a new song for a school concert', 'help a team prepare for a tournament', 'repair a bicycle for a neighbor'];
    const themes = ['perseverance', 'cooperation', 'responsibility', 'honesty'];
    const actions = ['tries a new method after two attempts fail', 'asks the group to share ideas and divide the work', 'returns to complete a promise despite being tired', 'admits a mistake and works to correct it'];
    const theme = themes[context % themes.length];
    const goal = goals[context % goals.length];
    const action = actions[context % actions.length];
    const scene = `${name} wants to ${goal}. After a setback, ${name} ${action}.`;
    const answers = [theme, 'jealousy', 'carelessness', 'luck'];
    if (skill === 0) return question(id, `${scene} Which theme is best supported?`, theme, answers.filter((item) => item !== theme), 'A theme is a message about life supported by what a character does and learns.');
    if (skill === 1) return question(id, `${scene} Which detail best reveals ${name}’s motivation?`, `The goal to ${goal}`, ['The time of day', 'A description of the weather', 'The color of an object'], 'Motivation is the reason a character acts; the goal explains what the character wants.');
    if (skill === 2) return question(id, `${scene} Which action is the turning point?`, action, ['The opening description of the room', 'A detail that does not affect the goal', 'The title printed on the page'], 'A turning point is the event or choice that changes the direction of the conflict.');
    if (skill === 3) return question(id, `${scene} Which evidence most strongly supports the theme of ${theme}?`, action, ['The story names the school', 'The scene mentions the time', 'A character describes the weather'], 'Strong evidence directly shows the character acting in a way connected to the theme.');
    return question(id, `${scene} Which statement is the most objective summary?`, `${name} works toward a goal, faces a setback, and responds by ${action}.`, [`${name} is the best character in every story.`, `The scene takes place at exactly noon.`, `The story is boring because the goal is difficult.`], 'A summary states the central events without adding an unsupported opinion.');
  }

  if (period === 'mp2') {
    const images = ['a hallway humming like a beehive', 'the moon keeping watch over the playground', 'a drumbeat of rain tapping on the roof', 'a backpack weighing as much as a mountain', 'the gym woke up when the whistle blew', 'the old bridge wore a coat of fog', 'the classroom was a beehive before the fair', 'the wind whispered through the pines', 'the deadline raced toward the team', 'the window blinked with reflected lightning', 'the notebook swallowed a whole afternoon', 'the river stitched silver through the valley'];
    const meanings = ['the hallway is busy and full of sound', 'the moon appears steady and watchful', 'the rain makes a repeated rhythmic sound', 'the backpack feels very heavy', 'the gym became active and energetic', 'fog covered the bridge', 'the classroom was busy with activity', 'the wind moved softly through the trees', 'time felt limited', 'light flashed against the window', 'the notebook contains a long stretch of work', 'the river formed a winding path through the valley'];
    const image = images[context % images.length];
    const meaning = meanings[context % meanings.length];
    if (skill === 0) return question(id, `A poem describes ${image}. What does this image most likely suggest?`, meaning, ['The scene has no sound or movement', 'The speaker is giving a scientific measurement', 'The image must be interpreted literally in every detail'], 'Figurative language creates an image that helps readers infer an idea or feeling.');
    if (skill === 1) {
      const refrains = ['still we try', 'one more step', 'hold the light', 'listen again', 'we begin', 'keep the promise', 'wait for morning', 'carry the song', 'look ahead', 'build it together', 'return to the page', 'make room for hope'];
      return question(id, `A poet repeats “${refrains[context]}” after each stanza. What is the most likely effect?`, 'It emphasizes an idea and creates a refrain', ['It proves the poem is a play', 'It changes the setting to a different country', 'It removes the poem’s central idea'], 'Repetition draws attention to an idea and can create rhythm or emphasis.');
    }
    if (skill === 2) {
      const directions = ['Mina steps back and lowers her voice', 'Jules pauses at the doorway', 'Ari turns toward the window', 'Nora folds the letter carefully', 'The lights fade as Eli exits', 'Sam speaks quickly, then stops', 'Riley points toward the map', 'Kai sits before answering', 'Leah crosses the room slowly', 'Omar closes the book', 'Ivy smiles at the audience', 'Theo waits before opening the door'];
      return question(id, `A stage direction reads “(${directions[context]}).” What does it tell the performer?`, 'How to move or deliver a line during the scene', ['The poem’s rhyme scheme', 'The author’s research sources', 'The exact theme of the whole play'], 'Stage directions guide movement, expression, and delivery.');
    }
    if (skill === 3) {
      const evidence = ['a green shoot appears after a storm', 'a friend returns to help at dawn', 'the speaker saves a seat for someone new', 'a small lamp remains lit through the night', 'a character shares the last slice of bread', 'the team repairs a bridge together', 'a student tries the difficult passage again', 'neighbors plant trees along the road', 'a note thanks someone for listening', 'the final image is an open gate', 'the speaker asks a new question', 'a character offers to begin again'];
        return question(id, `In a poem where ${evidence[context]}, which detail best supports a hopeful tone?`, `The text includes ${evidence[context]}`, ['The poem has four pages', 'The title is printed in bold type', 'A character enters in the final scene'], 'Interpretations should be supported by meaningful details from the text.');
    }
    const forms = ['a poem and a scene about courage', 'a play and a poem about belonging', 'two texts about overcoming a setback', 'a poem and a scene about responsibility', 'two works about a difficult choice', 'a drama and poem about friendship', 'texts about a community working together', 'two works about learning from mistakes', 'a poem and scene about change', 'texts about protecting a place', 'a poem and a play about memory', 'two works about keeping a promise'];
    return question(id, `When comparing ${forms[context]}, what should a reader examine?`, 'How each form uses its own elements to develop the theme', ['Only the length of each text', 'Whether both works use identical sentences', 'The order of the authors’ names'], 'Poems and plays can develop similar themes through different structures and techniques.');
  }

  if (period === 'mp3') {
    const topics = ['a school garden', 'a neighborhood creek', 'a community library', 'a local recycling program', 'a walking path', 'a public playground', 'a pollinator garden', 'a town bus route', 'a student science fair', 'a tree-planting project', 'a history exhibit', 'a community food pantry'];
    const details = ['native plants need less watering once established', 'rain gardens can slow runoff after storms', 'quiet study areas help students focus', 'sorting materials keeps reusable items out of landfills', 'marked crossings can make walking routes easier to follow', 'regular equipment checks can help keep a playground usable', 'native flowers can provide food for pollinators', 'reliable schedules help riders plan a trip', 'testing one variable helps students compare results', 'young trees need water while their roots establish', 'primary sources can connect visitors with past events', 'organized donations help volunteers track supplies'];
    const topic = topics[context % topics.length];
    const detail = details[context % details.length];
    const mainIdea = `The ${topic} can benefit the community when it is planned and cared for.`;
    if (skill === 0) return question(id, `An informational passage about ${topic} explains that ${detail}. Which statement is the best main idea?`, mainIdea, ['Every community project costs the same amount.', 'One detail is the only important idea in the passage.', 'The passage is mainly about an unrelated sport.'], 'A main idea captures the broader point supported by the passage’s details.');
    if (skill === 1) return question(id, `Which detail best supports the idea that ${topic} can be useful?`, detail, ['The passage uses three paragraphs.', 'The author wrote the passage on a Tuesday.', 'The topic appears in the heading.'], 'Supporting evidence is relevant to the claim or central idea.');
    if (skill === 2) return question(id, `Which sentence is the best brief summary of a passage about ${topic}?`, `${topic} supports the community, and ${detail}.`, [`${topic} is mentioned once in the second paragraph.`, `The writer likes every project more than every other topic.`, `The passage contains several words with long spellings.`], 'A summary combines the central idea with the most important supporting detail.');
    if (skill === 3) return question(id, `A student rewrites “${detail}” in new words and cites the report. What is this called?`, 'A paraphrase with attribution', ['Plagiarism without attribution', 'A direct quotation with no source', 'An unrelated opinion'], 'A paraphrase restates a source’s idea in new wording and still credits the source.');
    return question(id, `Which source would be most relevant when researching ${topic}?`, 'A recent report with observations about that local project', ['A fictional story set on another planet', 'An advertisement with no supporting details', 'A source about an unrelated activity'], 'Relevant sources directly address the research question and provide useful evidence.');
  }

  const issues = ['later school start times', 'more shade on the playground', 'a longer library checkout period', 'a school garden', 'a quieter study space', 'more bicycle racks', 'a student art display', 'a community clean-up day', 'an expanded book collection', 'a water-bottle refill station', 'more outdoor science lessons', 'a peer tutoring period'];
  const reasons = ['students may be more rested and ready to learn', 'shade can make outdoor areas more comfortable', 'more time can help students finish longer books', 'growing food can support hands-on science', 'a quieter room can help students concentrate', 'secure racks can support students who bike', 'student work can make learning visible', 'shared work can improve a public space', 'new titles can support a wider range of readers', 'refill access can reduce single-use bottles', 'direct observation can support science learning', 'peer explanations can give learners another way to practice'];
  const issue = issues[context % issues.length];
  const reason = reasons[context % reasons.length];
  const claim = `The school should consider ${issue} because ${reason}.`;
  if (skill === 0) return question(id, `A student is writing about ${issue}. Which is the strongest arguable claim?`, claim, ['Some schools have students.', 'This topic exists in the world.', 'There are many opinions about school.'], 'A strong claim takes a clear, debatable position and gives a reason.');
  if (skill === 1) return question(id, `Which evidence would best support the claim that ${reason}?`, 'Relevant observations or reliable data about the students and situation', ['A fact about an unrelated town', 'A personal insult about people who disagree', 'A repeated claim without evidence'], 'Evidence should directly support the claim and come from a useful source.');
  if (skill === 2) return question(id, `What is a fair counterclaim to the proposal about ${issue}?`, 'A reasonable concern about cost, schedule, or implementation', ['A statement that no student has ever had an opinion', 'A detail that repeats the proposal word for word', 'An unrelated fact about a different subject'], 'A counterclaim presents a reasonable alternative view rather than a straw argument.');
  if (skill === 3) return question(id, `After presenting a concern about ${issue}, what should the writer do?`, 'Respond with relevant evidence and reasoning', ['Ignore the concern and change the topic', 'Repeat the claim without explanation', 'Remove every source citation'], 'A response should address the counterclaim using reasoning and evidence.');
  return question(id, `Which conclusion best fits an argument about ${issue}?`, 'Restate the claim and connect it to the strongest reasons', ['Introduce an unrelated new claim', 'Copy the opening paragraph without changes', 'Add evidence that was never discussed'], 'A conclusion reinforces the argument without introducing unsupported ideas.');
}

function scienceQuestion(module: Module, context: number, skill: number): Question {
  const id = `${module.id}-generated-${context * 5 + skill + 1}`;
  const period = module.id.slice(0, 3);
  if (period === 'mp1') {
    const plants = ['grass', 'algae', 'oak leaves', 'pond plants', 'clover', 'wildflowers', 'seaweed', 'cattails', 'berry bushes', 'moss', 'corn plants', 'phytoplankton'];
    const consumers = ['rabbits', 'snails', 'caterpillars', 'small fish', 'grasshoppers', 'deer', 'sea urchins', 'tadpoles', 'songbirds', 'mice', 'beetles', 'zooplankton'];
    const producer = plants[context % plants.length];
    const consumer = consumers[context % consumers.length];
    if (skill === 0) return question(id, `In a food web, what role does ${producer} play?`, 'Producer', ['Decomposer', 'Predator only', 'Nonliving factor'], 'Producers capture energy and make food that supports other organisms.');
    if (skill === 1) return question(id, `A ${consumer} eats ${producer}. Where did most of the energy stored by the ${producer} originally come from?`, 'Sunlight', ['Sound waves', 'The soil creating energy', 'The consumer’s movement'], 'Energy enters most ecosystems as sunlight captured by producers.');
    if (skill === 2) return question(id, `What happens to matter when a ${consumer} eats ${producer}?`, 'Matter moves between organisms and can be rearranged into new molecules', ['Matter disappears permanently', 'Matter changes into energy and no longer exists', 'Only sunlight moves between them'], 'Matter cycles through organisms and the environment; it is not destroyed.');
    if (skill === 3) return question(id, `Which organism helps return nutrients from dead ${producer} and ${consumer} matter to the ecosystem?`, 'Decomposer', ['Producer', 'Sunlight', 'Cloud'], 'Decomposers break down dead material and return nutrients to the environment.');
    return question(id, `If the number of ${producer} plants decreases, what is a likely first effect on the ${consumer} population?`, 'Less food may be available to the consumers', ['The consumers immediately become producers', 'The ecosystem stops cycling matter', 'Sunlight disappears'], 'Organisms that depend on a food source may be affected when it becomes less available.');
  }
  if (period === 'mp2') {
    const pairs = [['whale flipper and human arm', 'similar underlying bone patterns'], ['bat wing and human arm', 'similar arrangement of bones'], ['bird forelimb and crocodile forelimb', 'shared structural features'], ['seal flipper and dog foreleg', 'similar skeletal patterns'], ['horse foreleg and human arm', 'a comparable arrangement of bones'], ['cat foreleg and whale flipper', 'similar limb-bone relationships'], ['bat forelimb and cat foreleg', 'shared forelimb structures'], ['lizard forelimb and bird forelimb', 'similar underlying limb bones'], ['human arm and horse foreleg', 'a similar pattern of major bones'], ['seal flipper and human arm', 'related forelimb structures'], ['bird forelimb and bat forelimb', 'shared forelimb bones despite different wing adaptations'], ['crocodile forelimb and horse foreleg', 'similar patterns in the forelimb bones']];
    const [pair, feature] = pairs[context % pairs.length];
    if (skill === 0) return question(id, `Scientists compare a ${pair} and observe ${feature}. What can this be evidence for?`, 'A possible evolutionary relationship', ['Exactly the same current function', 'Identical habitats today', 'The organisms’ exact ages'], 'Homologous structures can provide evidence of shared ancestry even when functions differ.');
    if (skill === 1) return question(id, `When comparing ${pair}, why should scientists examine more than one structure?`, 'Multiple lines of evidence make a relationship claim stronger', ['One feature always proves every detail', 'Structures cannot provide evidence', 'It removes the need to record observations'], 'Scientific explanations are stronger when supported by multiple relevant observations.');
    if (skill === 2) return question(id, `When studying organisms such as those in the ${pair} comparison, what does biodiversity describe?`, 'The variety of living organisms and their roles', ['The number of rock layers', 'The daily weather forecast', 'The size of one individual organism'], 'Biodiversity refers to the variety of life in an area or ecosystem.');
    if (skill === 3) return question(id, `After observing ${feature} in the ${pair} comparison, what is the strongest next step?`, 'Compare additional evidence before drawing a broader relationship conclusion', ['Assume one observation proves every detail', 'Ignore the organisms’ other structures', 'Stop recording evidence'], 'Scientists test explanations with multiple observations rather than overgeneralizing from one feature.');
    return question(id, `Given the ${pair} comparison and ${feature}, which conclusion is best supported?`, `${feature} may indicate a relationship that should be tested with more evidence`, ['The organisms must behave exactly alike', 'The organisms live in the same place today', 'One observation proves every detail of their history'], 'A careful conclusion states what evidence supports without claiming more than it shows.');
  }
  if (period === 'mp3') {
    const locations = ['a warm lake', 'a coastal marsh', 'a mountain stream', 'a neighborhood after rainfall', 'a forest pond', 'a grassy field after a shower', 'a reservoir on a sunny day', 'a river bend in cool weather', 'a schoolyard after a storm', 'a wetland in early spring', 'a hillside during a dry week', 'a bay under cloudy skies'];
    const location = locations[context % locations.length];
    if (skill === 0) return question(id, `Water vapor cools above ${location} and forms tiny liquid droplets. Which process is occurring?`, 'Condensation', ['Evaporation', 'Erosion', 'Deposition'], 'Condensation changes water vapor into liquid droplets.');
    if (skill === 1) return question(id, `Sunlight warms surface water at ${location}, and liquid water becomes vapor. Which process is this?`, 'Evaporation', ['Condensation', 'Precipitation', 'Runoff'], 'Evaporation changes liquid water into water vapor.');
    if (skill === 2) return question(id, `Cloud droplets grow and fall as rain over ${location}. What is this water-cycle process?`, 'Precipitation', ['Condensation', 'Collection only', 'Weathering'], 'Precipitation is water falling from clouds as rain, snow, sleet, or hail.');
    if (skill === 3) return question(id, `What kind of record would best show the climate pattern near ${location}?`, 'Many years of temperature and precipitation data', ['One afternoon’s temperature', 'A single photograph', 'Tomorrow’s forecast'], 'Climate is described by long-term patterns, so many years of data are more useful.');
    return question(id, `Water flows over land toward a stream near ${location}. Which process does this describe?`, 'Runoff', ['Condensation', 'Photosynthesis', 'Crystallization'], 'Runoff is water flowing across land into rivers, lakes, or other bodies of water.');
  }
  const materials = ['sediment at a river delta', 'rock exposed at Earth’s surface', 'a cliff face exposed to wind and rain', 'layers containing ancient shells', 'sand carried by a stream', 'rock fragments on a hillside', 'sediment settling on a lake bottom', 'a rock layer buried beneath newer sediment', 'grains deposited along a coast', 'a rock surface cracked by ice', 'sediment moved by a glacier', 'shell fossils preserved in layered rock'];
  const material = materials[context % materials.length];
  if (skill === 0) return question(id, `What process can turn ${material} into smaller particles without transporting them?`, 'Weathering', ['Erosion', 'Condensation', 'Photosynthesis'], 'Weathering breaks rock into smaller pieces; erosion moves the material.');
  if (skill === 1) return question(id, `What process moves the particles from ${material} to another location?`, 'Erosion', ['Weathering only', 'Condensation', 'Compaction'], 'Erosion transports weathered material by water, wind, ice, or gravity.');
  if (skill === 2) return question(id, `If transported particles settle in ${material}, which process is occurring?`, 'Deposition', ['Evaporation', 'Melting', 'Photosynthesis'], 'Deposition occurs when transported sediment is dropped and settles.');
  if (skill === 3) return question(id, `How can sedimentary rock form from ${material}?`, 'Sediment can be deposited, compacted, and cemented', ['A cloud compresses water vapor into rock', 'A fossil turns directly into magma', 'Wind creates a new chemical element'], 'Sedimentary rock commonly forms as deposited sediment is compacted and cemented.');
  return question(id, `What can fossils in ${material} help scientists infer?`, 'Evidence about past life and environments', ['Tomorrow’s weather with certainty', 'The exact age of every organism', 'The current population size'], 'Fossils provide evidence about organisms and environments from Earth’s past.');
}

function socialStudiesQuestion(module: Module, context: number, skill: number): Question {
  const id = `${module.id}-generated-${context * 5 + skill + 1}`;
  const period = module.id.slice(0, 3);
  if (period === 'mp1') {
    const places = ['a river valley', 'a rocky coastline', 'a broad grassland', 'a mountain pass', 'a desert oasis', 'a forested plateau', 'a busy harbor', 'a chain of islands', 'a fertile plain', 'a high mountain lake', 'a wooded peninsula', 'a wide coastal marsh'];
    const place = places[context % places.length];
    if (skill === 0) return question(id, `A map identifies the exact coordinates of ${place}. Which geographic theme is emphasized?`, 'Location', ['Movement', 'Region', 'Human-environment interaction'], 'Location describes where a place is, using absolute or relative position.');
    if (skill === 1) return question(id, `A historian describes the climate and landforms around ${place}. Which theme is emphasized?`, 'Place', ['Movement', 'Location only', 'Region only'], 'Place describes the physical and human characteristics of a location.');
    if (skill === 2) return question(id, `A community changes how it farms because of conditions near ${place}. Which theme is emphasized?`, 'Human-environment interaction', ['Location', 'Movement', 'Region'], 'Human-environment interaction examines how people depend on, adapt to, and change their environment.');
    if (skill === 3) return question(id, `People and goods travel along routes near ${place}. Which theme is emphasized?`, 'Movement', ['Place', 'Location', 'Region'], 'Movement describes how people, goods, and ideas travel.');
    return question(id, `Several nearby areas around ${place} share a climate and way of life. Which theme is emphasized?`, 'Region', ['Movement', 'Absolute location', 'Human-environment interaction'], 'A region is an area grouped by shared characteristics.');
  }
  if (period === 'mp2') {
    const regions = [
      { name: 'New England', clue: 'rocky soil and a long coastline', work: 'fishing and shipbuilding' },
      { name: 'Middle Colonies', clue: 'fertile farmland and navigable rivers', work: 'grain farming and trade' },
      { name: 'Southern Colonies', clue: 'a long growing season and large farms', work: 'plantation agriculture' },
      { name: 'New England', clue: 'many harbors and forests', work: 'shipping and lumber' },
      { name: 'Middle Colonies', clue: 'productive soil near market towns', work: 'grain farming and commerce' },
      { name: 'Southern Colonies', clue: 'warm weather and a long growing season', work: 'growing cash crops on large farms' },
      { name: 'New England', clue: 'short growing seasons and coastal access', work: 'fishing, trade, and shipbuilding' },
      { name: 'Middle Colonies', clue: 'rivers connecting farms and ports', work: 'shipping agricultural goods' },
      { name: 'Southern Colonies', clue: 'large rivers and warm coastal plains', work: 'plantation agriculture and trade' },
      { name: 'New England', clue: 'forests that supplied ship timber', work: 'lumber and shipbuilding' },
      { name: 'Middle Colonies', clue: 'a mix of farms and busy ports', work: 'farming and regional trade' },
      { name: 'Southern Colonies', clue: 'fertile land suited to labor-intensive crops', work: 'large-scale cash-crop farming' }
    ];
    const region = regions[context % regions.length];
    if (skill === 0) return question(id, `Which colonial region is most associated with ${region.clue}?`, region.name, ['The Great Plains', 'The Pacific Colonies', 'The Northwest Territory'], 'The district guide asks students to compare colonial regions and how geography shaped them.');
    if (skill === 1) return question(id, `How did ${region.clue} influence work in the ${region.name}?`, region.work, ['It prevented all trade', 'It made every family use the same job', 'It removed the need for local resources'], 'Regional geography and resources shaped settlement, work, and trade.');
    if (skill === 2) return question(id, `When comparing ${region.name}, including areas with ${region.clue}, which categories should students use?`, 'Geography, resources, economy, and settlement patterns', ['Only the names of governors', 'Assume every colony was identical', 'Ignore the environment'], 'Comparing several shared categories makes regional similarities and differences clearer.');
    if (skill === 3) return question(id, `A primary source about ${region.name} describes work shaped by ${region.clue}. What should a historian consider?`, 'Who created it, when, and for what purpose', ['Only the paper color', 'Whether it is the longest source', 'Nothing about its perspective'], 'Source context and perspective help historians evaluate evidence.');
    return question(id, `How could ${region.clue} help explain the economy of ${region.name}?`, 'Geography and resources influence available work and trade', ['Regions never use local resources', 'Every colony had identical conditions', 'Economic choices never relate to geography'], 'Geographic conditions influence the resources and opportunities available to communities.');
  }
  if (period === 'mp3') {
    const civicSituations = ['a community debates a new law', 'a branch reviews a government action', 'citizens petition representatives', 'a convention writes rules for government', 'representatives consider a public request', 'two branches disagree about a decision', 'a community discusses individual rights', 'a law is checked against a constitution', 'voters choose local representatives', 'a public meeting considers a proposal', 'officials divide responsibilities among offices', 'citizens ask government to explain a decision'];
    const situation = civicSituations[context % civicSituations.length];
    if (skill === 0) return question(id, `During ${situation}, what is one purpose of a written constitution?`, 'To establish the structure and limits of government', ['To guarantee that no laws can change', 'To give every power to one official', 'To prevent citizens from having rights'], 'A constitution sets out government structure, powers, and limits.');
    if (skill === 1) return question(id, `Why divide government power among branches when ${situation}?`, 'To limit concentrated power through checks and balances', ['To remove all public accountability', 'To make one branch unlimited', 'To stop every law from being reviewed'], 'Checks and balances help prevent any branch from gaining unchecked power.');
    if (skill === 2) return question(id, `Which principle is reflected when people choose representatives during ${situation}?`, 'Representative government', ['Absolute monarchy', 'Rule without consent', 'Geographic isolation'], 'Representative government gives people a role in choosing those who make decisions.');
    if (skill === 3) return question(id, `A historian studies a period account of ${situation}. Why compare it with another source?`, 'To examine perspective and corroborate evidence', ['To make both sources identical', 'To remove the date and author', 'To avoid evaluating claims'], 'Comparing sources helps historians assess perspective and reliability.');
    return question(id, `Which statement is a cause-and-effect explanation of ${situation}?`, 'It connects a condition or decision to a resulting change', ['It lists unrelated dates', 'It gives an opinion without evidence', 'It describes only a map symbol'], 'Historical reasoning explains relationships among events using evidence.');
  }
  const events = ['westward expansion', 'industrial growth', 'sectional disagreement', 'a debate over federal and state authority', 'a new transportation route', 'a change in regional labor systems', 'a disputed national policy', 'a new territory seeking statehood', 'a growing disagreement over slavery', 'a change in the national economy', 'a decision made by state leaders', 'a conflict between political viewpoints'];
  const event = events[context % events.length];
  if (skill === 0) return question(id, `When studying ${event}, what should a historian use to support a claim?`, 'Relevant evidence from reliable sources', ['A guess without support', 'An unrelated modern advertisement', 'A statement repeated without citation'], 'Historical claims should be supported by relevant evidence.');
  if (skill === 1) return question(id, `Why compare accounts of ${event}?`, 'To evaluate different perspectives and corroborate details', ['To assume every account is identical', 'To avoid asking who created each source', 'To replace evidence with opinion'], 'Multiple accounts can reveal perspective and help corroborate information.');
  if (skill === 2) return question(id, `Which question helps explain a cause of ${event}?`, 'What conditions and decisions helped bring it about?', ['What color was the book cover?', 'Which event happened in an unrelated country?', 'How many letters are in the event name?'], 'Causal analysis looks for conditions and decisions that contributed to an event.');
  if (skill === 3) return question(id, `Which statement best describes a consequence of ${event}?`, 'A change that followed and can be supported with evidence', ['A cause that happened before every other event', 'A detail with no historical connection', 'An unsupported prediction'], 'A consequence is an outcome that follows an event or decision.');
  return question(id, `What should a timeline about ${event} show?`, 'Events in chronological order with relevant context', ['Only opinions about the events', 'Dates with no labels', 'Unrelated events placed randomly'], 'A useful timeline orders relevant events and includes enough context to interpret them.');
}

function generatedQuestion(module: Module, index: number): Question {
  const context = Math.floor(index / 5);
  const skill = index % 5;
  if (module.domain === 'Math') return mathQuestion(module, index);
  if (module.domain === 'ELA') return languageQuestion(module, context, skill);
  if (module.domain === 'Science') return scienceQuestion(module, context, skill);
  return socialStudiesQuestion(module, context, skill);
}

export function buildActivityQuestionSet(moduleId: string, count = ACTIVITY_QUESTION_COUNT): Question[] {
  const courseModule = getAllModules().find((item) => item.id === moduleId);
  if (!courseModule) return [];
  const generatedCount = Math.max(0, count - courseModule.questions.length);
  const generated = Array.from({ length: generatedCount }, (_, index) => generatedQuestion(courseModule, index));
  const bank = [...courseModule.questions, ...generated];
  return shuffled(bank).slice(0, count);
}

export function getActivityQuestionCount(moduleId: string): number {
  const courseModule = getAllModules().find((item) => item.id === moduleId);
  return courseModule ? Math.max(ACTIVITY_QUESTION_COUNT, courseModule.questions.length) : 0;
}
