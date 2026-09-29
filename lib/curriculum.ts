export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
};

export type Module = {
  id: string;
  title: string;
  domain: string;
  courseLevel?: string;
  practiceGoal: string;
  assignment: string;
  questions: Question[];
};

export type MarkingPeriod = {
  id: string;
  name: string;
  focus: string;
  modules: Module[];
};

type QuestionDraft = Omit<Question, 'id'>;

function questions(moduleId: string, drafts: QuestionDraft[]): Question[] {
  return drafts.map((draft, index) => ({ ...draft, id: `${moduleId}-${index + 1}` }));
}

export const curriculum: MarkingPeriod[] = [
  {
    id: 'mp1',
    name: 'Marking Period 1',
    focus: 'Narrative reading, rational numbers, ecosystems, and American geography',
    modules: [
      {
        id: 'mp1-ela', title: 'Literature and narrative writing', domain: 'ELA', courseLevel: 'Standard + Honors',
        practiceGoal: 'Analyze plot, character, setting, central ideas, and theme in narrative texts.',
        assignment: 'Write a short narrative with a clear conflict, turning point, and resolution. Annotate how one character changes.',
        questions: questions('mp1-ela', [
          { prompt: 'Which detail most directly reveals a character’s motivation?', choices: ['A detail about the weather', 'The character’s goal and choices', 'The page number', 'The story’s title alone'], answer: 'The character’s goal and choices', explanation: 'Motivation is inferred from what a character wants and the actions they take.' },
          { prompt: 'What is the climax of a narrative?', choices: ['The opening description', 'The main turning point of greatest tension', 'A list of characters', 'The final sentence only'], answer: 'The main turning point of greatest tension', explanation: 'The climax is the pivotal moment that changes the direction of the conflict.' },
          { prompt: 'How is a theme best described?', choices: ['A topic named in one word', 'A message about life developed through a text', 'The setting of a story', 'The order of events'], answer: 'A message about life developed through a text', explanation: 'A theme is an idea that readers can support with details from the text.' }
        ])
      },
      {
        id: 'mp1-math', title: 'Rational numbers and expressions', domain: 'Math', courseLevel: 'Honors guide',
        practiceGoal: 'Operate with positive and negative rational numbers and represent relationships with equivalent expressions.',
        assignment: 'Solve real-world rational-number problems and explain one equivalent-expression strategy.',
        questions: questions('mp1-math', [
          { prompt: 'What is −3/4 + 1/2?', choices: ['−1/4', '1/4', '−5/4', '5/4'], answer: '−1/4', explanation: 'Rewrite 1/2 as 2/4, then add: −3/4 + 2/4 = −1/4.' },
          { prompt: 'Which expression is equivalent to 3(x + 4)?', choices: ['3x + 4', '3x + 12', 'x + 12', '7x'], answer: '3x + 12', explanation: 'The distributive property multiplies 3 by each term inside the parentheses.' },
          { prompt: 'What is (−2/3) × 9?', choices: ['−6', '6', '−3', '3'], answer: '−6', explanation: 'Multiply the values; the product is negative because the signs differ.' }
        ])
      },
      {
        id: 'mp1-science', title: 'Ecology and the environment', domain: 'Science', courseLevel: 'Grade 7 · Module C',
        practiceGoal: 'Model how matter cycles and energy flows through ecosystems and organisms.',
        assignment: 'Draw a food web for a local ecosystem and annotate how matter and energy move through it.',
        questions: questions('mp1-science', [
          { prompt: 'What is the main role of a producer in an ecosystem?', choices: ['Break down rocks', 'Capture energy and make food', 'Hunt every other organism', 'Remove all matter from the system'], answer: 'Capture energy and make food', explanation: 'Producers use light energy to make sugars that support food webs.' },
          { prompt: 'Which process moves carbon from the air into plant matter?', choices: ['Photosynthesis', 'Condensation', 'Erosion', 'Decomposition only'], answer: 'Photosynthesis', explanation: 'Plants take in carbon dioxide and use it to build energy-rich molecules.' },
          { prompt: 'In a food web, energy is transferred when:', choices: ['An organism consumes another organism', 'Water freezes', 'Rocks weather', 'A population is renamed'], answer: 'An organism consumes another organism', explanation: 'Eating transfers some stored chemical energy between organisms.' }
        ])
      },
      {
        id: 'mp1-social', title: 'Geography and Two Worlds Meet', domain: 'Social Studies', courseLevel: 'Grade 7 · U.S. History',
        practiceGoal: 'Use geographic themes to explain how place and environment shape societies and early encounters.',
        assignment: 'Annotate a map of North America and compare how geography shaped two Native American civilizations.',
        questions: questions('mp1-social', [
          { prompt: 'Which is one of the five themes of geography?', choices: ['Location', 'Narration', 'Photosynthesis', 'Proportion'], answer: 'Location', explanation: 'Location is one of the themes used to study people and places.' },
          { prompt: 'Why does climate matter when studying where a community develops?', choices: ['It affects resources and ways of living', 'It determines every law', 'It never affects travel', 'It replaces the need for maps'], answer: 'It affects resources and ways of living', explanation: 'Climate influences resources, settlement, transportation, and daily life.' },
          { prompt: 'A historian compares two accounts of first contact. What should they consider?', choices: ['Who created each source and why', 'Only which account is longer', 'The authors’ favorite colors', 'Neither source’s perspective'], answer: 'Who created each source and why', explanation: 'Point of view and purpose help historians interpret evidence.' }
        ])
      }
    ]
  },
  {
    id: 'mp2',
    name: 'Marking Period 2',
    focus: 'Poetry and drama, proportions, biodiversity, and colonial America',
    modules: [
      {
        id: 'mp2-ela', title: 'Poetry, drama, and theme', domain: 'ELA', courseLevel: 'Standard + Honors',
        practiceGoal: 'Analyze figurative language, sound, structure, and theme across poetry and drama.',
        assignment: 'Compare how a poem and a scene from a play develop a shared theme using quoted evidence.',
        questions: questions('mp2-ela', [
          { prompt: 'What is the effect of a repeated sound or phrase in a poem?', choices: ['It can create emphasis or rhythm', 'It always identifies the author', 'It removes the poem’s tone', 'It changes the setting'], answer: 'It can create emphasis or rhythm', explanation: 'Repetition and sound devices shape rhythm, mood, and meaning.' },
          { prompt: 'What does a stage direction usually tell a reader?', choices: ['How a character moves or how a scene is staged', 'The poem’s rhyme scheme', 'The book’s publication date', 'The narrator’s biography'], answer: 'How a character moves or how a scene is staged', explanation: 'Stage directions provide performance details not spoken as dialogue.' },
          { prompt: 'Which evidence best supports an interpretation of a poem’s theme?', choices: ['A repeated image that changes across the poem', 'The number of pages in the book', 'A random word from the title', 'The color of the cover'], answer: 'A repeated image that changes across the poem', explanation: 'Recurring images and their development can support an interpretation of theme.' }
        ])
      },
      {
        id: 'mp2-math', title: 'Proportions and percent', domain: 'Math', courseLevel: 'Honors guide',
        practiceGoal: 'Represent proportional relationships and solve real-world percent problems.',
        assignment: 'Create a proportional table for a real-world situation and solve percent problems with shown reasoning.',
        questions: questions('mp2-math', [
          { prompt: 'A recipe uses 3 cups of flour for 8 servings. How much for 16 servings?', choices: ['4 cups', '6 cups', '8 cups', '11 cups'], answer: '6 cups', explanation: 'The servings double, so the flour doubles: 3 × 2 = 6 cups.' },
          { prompt: 'What is 25% of 80?', choices: ['15', '20', '25', '40'], answer: '20', explanation: 'Twenty-five percent is one quarter, and 80 ÷ 4 = 20.' },
          { prompt: 'Which table shows a proportional relationship?', choices: ['x: 1, 2; y: 3, 6', 'x: 1, 2; y: 3, 7', 'x: 2, 4; y: 5, 8', 'x: 3, 6; y: 4, 9'], answer: 'x: 1, 2; y: 3, 6', explanation: 'The ratio y/x is constant at 3 in both pairs.' }
        ])
      },
      {
        id: 'mp2-science', title: 'Diversity of living things', domain: 'Science', courseLevel: 'Grade 7 · Module D',
        practiceGoal: 'Use evidence from structures and patterns of change to explain biodiversity and relatedness.',
        assignment: 'Compare two organisms using observable structures and explain what similarities suggest.',
        questions: questions('mp2-science', [
          { prompt: 'What can similar body structures in different organisms provide evidence about?', choices: ['A possible evolutionary relationship', 'The organisms’ exact ages', 'Their identical habitats today', 'Tomorrow’s weather'], answer: 'A possible evolutionary relationship', explanation: 'Homologous structures can indicate shared ancestry, even when functions differ.' },
          { prompt: 'What does biodiversity describe?', choices: ['The variety of living things', 'Only one species in an area', 'The age of rocks', 'The daily temperature'], answer: 'The variety of living things', explanation: 'Biodiversity refers to the variety of organisms and ecological roles in an area.' },
          { prompt: 'Which is the strongest scientific explanation?', choices: ['A claim supported by observations and evidence', 'A guess without evidence', 'Unrelated facts', 'An opinion that cannot be checked'], answer: 'A claim supported by observations and evidence', explanation: 'Scientific explanations connect claims to evidence and reasoning.' }
        ])
      },
      {
        id: 'mp2-social', title: 'The English colonies', domain: 'Social Studies', courseLevel: 'Grade 7 · U.S. History',
        practiceGoal: 'Compare the regions, economies, settlement patterns, and society of the English colonies.',
        assignment: 'Build a three-region comparison chart and support a colony-choice recommendation with evidence.',
        questions: questions('mp2-social', [
          { prompt: 'Why did colonial economies differ between regions?', choices: ['Geography and available resources differed', 'Every colony had the same climate', 'Colonists were forbidden to trade', 'The colonies had no resources'], answer: 'Geography and available resources differed', explanation: 'Climate, land, waterways, and resources shaped regional work and trade.' },
          { prompt: 'Which comparison is most useful when studying colonial regions?', choices: ['Economy, geography, and settlement patterns', 'Only the names of governors', 'Ignoring local resources', 'Using one colony to describe all thirteen'], answer: 'Economy, geography, and settlement patterns', explanation: 'These factors help explain differences among colonial regions.' },
          { prompt: 'What does a primary source from colonial times provide?', choices: ['Evidence created during the period studied', 'A guaranteed unbiased account', 'A modern summary only', 'Proof that all colonists agreed'], answer: 'Evidence created during the period studied', explanation: 'Primary sources were created during the period, though their perspective should be considered.' }
        ])
      }
    ]
  },
  {
    id: 'mp3',
    name: 'Marking Period 3',
    focus: 'Informational research, algebraic reasoning, Earth systems, and the founding government',
    modules: [
      {
        id: 'mp3-ela', title: 'Informational reading and research', domain: 'ELA', courseLevel: 'Standard + Honors',
        practiceGoal: 'Analyze informational text, summarize and paraphrase accurately, and use sources responsibly.',
        assignment: 'Write a research summary using two sources, accurate paraphrases, and citations.',
        questions: questions('mp3-ela', [
          { prompt: 'What belongs in an objective summary?', choices: ['Central ideas and key supporting details', 'Every minor detail', 'Unrelated opinions', 'A copied paragraph without citation'], answer: 'Central ideas and key supporting details', explanation: 'A summary condenses important ideas without adding unsupported opinions.' },
          { prompt: 'What should a writer do when using another author’s exact words?', choices: ['Use quotation marks and cite the source', 'Change only the font', 'Remove the author’s name', 'Present the words as their own'], answer: 'Use quotation marks and cite the source', explanation: 'Direct quotations need clear attribution and citation.' },
          { prompt: 'Which source is most relevant to a question about local water quality?', choices: ['A recent report with water-testing data', 'An unrelated historical novel', 'An unsigned social post', 'A report about a different topic'], answer: 'A recent report with water-testing data', explanation: 'Relevant evidence directly addresses the research question.' }
        ])
      },
      {
        id: 'mp3-math', title: 'Equations and proportional reasoning', domain: 'Math', courseLevel: 'Honors guide',
        practiceGoal: 'Represent relationships with equations and inequalities and solve multi-step problems.',
        assignment: 'Write and solve equations for word problems, then check each solution in context.',
        questions: questions('mp3-math', [
          { prompt: 'Solve 3x − 4 = 11.', choices: ['3', '5', '7', '15'], answer: '5', explanation: 'Add 4 to get 3x = 15, then divide by 3.' },
          { prompt: 'Which inequality represents “at least 12”?', choices: ['x < 12', 'x ≤ 12', 'x ≥ 12', 'x > 12'], answer: 'x ≥ 12', explanation: 'At least 12 includes 12 and every value greater than 12.' },
          { prompt: 'A taxi charges $4 plus $2 per mile. Which expression gives the cost for m miles?', choices: ['4m + 2', '2m + 4', '6m', '2(m + 4)'], answer: '2m + 4', explanation: 'The $2-per-mile charge is 2m, plus the fixed $4 fee.' }
        ])
      },
      {
        id: 'mp3-science', title: 'Water, weather, and climate', domain: 'Science', courseLevel: 'Grade 7 · Earth systems',
        practiceGoal: 'Model water movement and explain interactions among Earth’s systems, weather, and climate.',
        assignment: 'Create a labeled water-cycle model and use a local weather dataset to describe a pattern.',
        questions: questions('mp3-science', [
          { prompt: 'What happens during condensation in the water cycle?', choices: ['Water vapor cools and forms liquid droplets', 'Liquid water becomes vapor', 'Water flows downhill as runoff', 'Ice turns into rock'], answer: 'Water vapor cools and forms liquid droplets', explanation: 'Condensation changes water vapor into liquid droplets, often forming clouds.' },
          { prompt: 'What is climate?', choices: ['Long-term patterns of weather in a region', 'The temperature at one moment', 'A single storm', 'The daily chance of rain only'], answer: 'Long-term patterns of weather in a region', explanation: 'Climate describes longer-term patterns, unlike day-to-day weather.' },
          { prompt: 'Which data best supports a claim about a region’s climate?', choices: ['Many years of temperature and precipitation records', 'One afternoon’s temperature', 'A single photograph', 'Tomorrow’s forecast'], answer: 'Many years of temperature and precipitation records', explanation: 'Long-term measurements reveal climate patterns.' }
        ])
      },
      {
        id: 'mp3-social', title: 'Rebellion, revolution, and the Constitution', domain: 'Social Studies', courseLevel: 'Grade 7 · U.S. History',
        practiceGoal: 'Trace causes of the American Revolution and explain principles in the Declaration and Constitution.',
        assignment: 'Create a cause-and-effect timeline from colonial protests to the Constitution and cite two sources.',
        questions: questions('mp3-social', [
          { prompt: 'What central idea is expressed in the Declaration of Independence?', choices: ['Government should protect people’s rights', 'A king should have unlimited power', 'Colonies should have no laws', 'Only one region should vote'], answer: 'Government should protect people’s rights', explanation: 'The Declaration argues that government should protect rights and derive authority from the people.' },
          { prompt: 'What is one purpose of separating powers among branches?', choices: ['To limit concentrated government power', 'To remove all national laws', 'To prevent civic participation', 'To make one branch supreme'], answer: 'To limit concentrated government power', explanation: 'Checks and balances help prevent any branch from gaining unchecked authority.' },
          { prompt: 'Which evidence best supports a claim about a cause of the Revolution?', choices: ['A contemporary account of a colonial protest', 'A modern weather report', 'An unrelated map', 'A poem from another era'], answer: 'A contemporary account of a colonial protest', explanation: 'A period source about the event can provide relevant historical evidence.' }
        ])
      }
    ]
  },
  {
    id: 'mp4',
    name: 'Marking Period 4',
    focus: 'Argument writing, geometry and data, geological history, and the Civil War era',
    modules: [
      {
        id: 'mp4-ela', title: 'Argument, evidence, and debate', domain: 'ELA', courseLevel: 'Standard + Honors',
        practiceGoal: 'Build clear claims with relevant evidence, reasoning, and responses to counterclaims.',
        assignment: 'Write an evidence-based argument on a school or community issue and address one counterclaim.',
        questions: questions('mp4-ela', [
          { prompt: 'Which statement is the strongest arguable claim?', choices: ['Many students attend school.', 'Schools should provide more outdoor learning because it supports observation and engagement.', 'The library has books.', 'It rained on Tuesday.'], answer: 'Schools should provide more outdoor learning because it supports observation and engagement.', explanation: 'A strong claim is specific, debatable, and supported with reasons.' },
          { prompt: 'Why include a counterclaim in an argument?', choices: ['To acknowledge and respond to another point of view', 'To replace all evidence', 'To avoid stating a position', 'To repeat the introduction'], answer: 'To acknowledge and respond to another point of view', explanation: 'Addressing a counterclaim helps show why the main claim remains persuasive.' },
          { prompt: 'What makes evidence relevant to a claim?', choices: ['It directly supports or challenges the claim', 'It is the longest quotation', 'It comes from any source', 'It uses complicated vocabulary'], answer: 'It directly supports or challenges the claim', explanation: 'Relevant evidence has a clear connection to the point being argued.' }
        ])
      },
      {
        id: 'mp4-math', title: 'Geometry, probability, and algebra', domain: 'Math', courseLevel: 'Honors guide',
        practiceGoal: 'Solve geometry problems and use algebraic and probability models to describe situations.',
        assignment: 'Design a scale drawing, calculate its area, and explain a probability-based prediction.',
        questions: questions('mp4-math', [
          { prompt: 'A triangle has angles of 45° and 65°. What is the third angle?', choices: ['60°', '70°', '80°', '90°'], answer: '70°', explanation: 'Triangle angles total 180°, so 180 − 45 − 65 = 70°.' },
          { prompt: 'A fair six-sided number cube is rolled once. What is the probability of rolling an even number?', choices: ['1/6', '1/3', '1/2', '2/3'], answer: '1/2', explanation: 'Three of the six outcomes are even, so the probability is 3/6 = 1/2.' },
          { prompt: 'Solve the system: y = x + 1 and y = 5.', choices: ['x = 3, y = 5', 'x = 4, y = 5', 'x = 5, y = 6', 'x = 1, y = 4'], answer: 'x = 4, y = 5', explanation: 'Substitute y = 5 into y = x + 1 to get x = 4.' }
        ])
      },
      {
        id: 'mp4-science', title: 'Geological processes and history', domain: 'Science', courseLevel: 'Grade 7 · Module F',
        practiceGoal: 'Explain how weathering, erosion, deposition, and the rock cycle shape Earth over time.',
        assignment: 'Use a labeled diagram to explain how one rock type can change through the rock cycle.',
        questions: questions('mp4-science', [
          { prompt: 'What is erosion?', choices: ['Movement of weathered material', 'Breaking of rock in place only', 'Cooling of water vapor', 'Formation of a new organism'], answer: 'Movement of weathered material', explanation: 'Erosion transports sediment by water, wind, ice, or gravity.' },
          { prompt: 'How does sedimentary rock commonly form?', choices: ['Sediment is deposited, compacted, and cemented', 'Magma cools underground', 'A plant absorbs sunlight', 'A cloud releases rain'], answer: 'Sediment is deposited, compacted, and cemented', explanation: 'These processes turn layers of sediment into sedimentary rock.' },
          { prompt: 'What can fossils in rock layers help scientists infer?', choices: ['Evidence about past life and environments', 'Tomorrow’s weather with certainty', 'The exact age of every organism', 'Current population size'], answer: 'Evidence about past life and environments', explanation: 'Fossils provide evidence about organisms and environments from Earth’s past.' }
        ])
      },
      {
        id: 'mp4-social', title: 'A growing nation and the Civil War', domain: 'Social Studies', courseLevel: 'Grade 7 · U.S. History',
        practiceGoal: 'Connect expansion, economic change, sectional conflict, and the causes and consequences of the Civil War.',
        assignment: 'Build a timeline linking expansion and sectional conflict to the Civil War, using two sources.',
        questions: questions('mp4-social', [
          { prompt: 'How can an economic change affect a society?', choices: ['It can change work, trade, and where people live', 'It never affects daily life', 'It changes geography instantly', 'It prevents disagreement'], answer: 'It can change work, trade, and where people live', explanation: 'Economic change can reshape jobs, settlement, transportation, and political debates.' },
          { prompt: 'Why do historians compare multiple accounts of the Civil War?', choices: ['To examine different perspectives and evaluate evidence', 'To make every account identical', 'To avoid primary sources', 'To remove context'], answer: 'To examine different perspectives and evaluate evidence', explanation: 'Comparing sources can reveal perspective and support stronger conclusions.' },
          { prompt: 'What does a cause-and-effect explanation do?', choices: ['Connects an event to conditions that helped produce it', 'Lists dates without relationships', 'Describes only a map key', 'Gives an opinion without evidence'], answer: 'Connects an event to conditions that helped produce it', explanation: 'Historical explanations connect causes and consequences using evidence.' }
        ])
      }
    ]
  }
];

export function getAllModules(): Module[] {
  return curriculum.flatMap((period) => period.modules);
}

function shuffledQuestions(items: Question[]): Question[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function buildPracticeSet(moduleId: string, count = 5): Question[] {
  const courseModule = getAllModules().find((item) => item.id === moduleId);
  return courseModule ? shuffledQuestions(courseModule.questions).slice(0, count) : [];
}

export function buildAssessment(moduleId: string, count = 10): Question[] {
  const courseModule = getAllModules().find((item) => item.id === moduleId);
  return courseModule ? shuffledQuestions(courseModule.questions).slice(0, Math.min(count, courseModule.questions.length)) : [];
}
