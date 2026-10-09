export type CurriculumTopic = {
  id: string;
  title: string;
  description: string;
  skillIndices: number[];
};

export const topicDifficulties = ['easy', 'medium', 'hard'] as const;
export type TopicDifficulty = (typeof topicDifficulties)[number];

export const TOPIC_QUESTION_COUNT = 30;

export const topicDifficultyNotes: Record<TopicDifficulty, string> = {
  easy: 'Core skills',
  medium: 'Apply and connect',
  hard: 'Challenge reasoning'
};

const topicsByModule: Record<string, CurriculumTopic[]> = {
  'mp1-ela': [
    { id: 'story-shape', title: 'Character, plot, and theme', description: 'Trace what characters want, how they respond to setbacks, and how those choices shape a story’s message.', skillIndices: [1, 2, 0] },
    { id: 'theme-evidence', title: 'Theme and story evidence', description: 'Connect a message about life to the specific actions and details that develop it.', skillIndices: [0, 3, 4] },
    { id: 'narrative-meaning', title: 'Narrative meaning and summary', description: 'Identify the most important events and explain how character choices shape the story.', skillIndices: [4, 1, 2] }
  ],
  'mp1-math': [
    { id: 'signed-operations', title: 'Signed-number operations', description: 'Add and multiply positive and negative rational numbers with attention to sign.', skillIndices: [0, 1, 4] },
    { id: 'expressions-equations', title: 'Expressions and equations', description: 'Use the distributive property and solve equations with rational-number reasoning.', skillIndices: [2, 3, 1] },
    { id: 'rational-comparisons', title: 'Rational-number reasoning', description: 'Compare signed values and use number relationships to solve rational-number problems.', skillIndices: [4, 0, 3] }
  ],
  'mp1-science': [
    { id: 'producers-energy', title: 'Producers and energy flow', description: 'Explain how producers capture energy and support other organisms in a food web.', skillIndices: [0, 1, 4] },
    { id: 'matter-cycles', title: 'Matter cycling and decomposers', description: 'Follow matter through organisms and describe how decomposers return nutrients.', skillIndices: [2, 3, 4] },
    { id: 'food-webs', title: 'Food-web cause and effect', description: 'Predict how changes to organisms and food sources can affect an ecosystem.', skillIndices: [0, 2, 4] }
  ],
  'mp1-social': [
    { id: 'geographic-themes', title: 'Location, place, and region', description: 'Use the themes of geography to describe where places are and what makes them distinct.', skillIndices: [0, 1, 4] },
    { id: 'people-places', title: 'People, environment, and movement', description: 'Connect environmental conditions with how people adapt, travel, and exchange ideas.', skillIndices: [2, 3, 1] },
    { id: 'maps-sources', title: 'Geographic patterns and movement', description: 'Use location, movement, and shared characteristics to describe patterns across places.', skillIndices: [0, 3, 4] }
  ],
  'mp2-ela': [
    { id: 'figurative-language', title: 'Figurative language and imagery', description: 'Interpret images and comparisons to explain what a poem suggests beyond its literal words.', skillIndices: [0, 3, 4] },
    { id: 'poetry-sound', title: 'Poetry sound and repetition', description: 'Notice how repeated sounds, phrases, and images shape rhythm, emphasis, and tone.', skillIndices: [1, 3, 4] },
    { id: 'drama-comparison', title: 'Drama and cross-form analysis', description: 'Read stage directions and compare how poems and plays develop related themes.', skillIndices: [2, 4, 0] }
  ],
  'mp2-math': [
    { id: 'percent-change', title: 'Percent and percent change', description: 'Find a percent of a quantity and use the original amount to reason about discounts.', skillIndices: [0, 3, 4] },
    { id: 'rates-ratios', title: 'Rates, ratios, and unit rates', description: 'Compare quantities, find a unit rate, and scale a proportional relationship.', skillIndices: [1, 4, 2] },
    { id: 'proportions-scale', title: 'Scale and proportional reasoning', description: 'Use constant ratios to solve problems involving maps, prices, and equivalent rates.', skillIndices: [2, 3, 0] }
  ],
  'mp2-science': [
    { id: 'structures-ancestry', title: 'Structures and shared ancestry', description: 'Compare body structures and explain what similarities can suggest about relatedness.', skillIndices: [0, 1, 4] },
    { id: 'biodiversity', title: 'Biodiversity and relatedness', description: 'Describe biodiversity and use more than one observation to investigate relationships.', skillIndices: [2, 3, 4] },
    { id: 'scientific-evidence', title: 'Claims from scientific evidence', description: 'Build careful conclusions from observations without claiming more than the evidence shows.', skillIndices: [1, 3, 4] }
  ],
  'mp2-social': [
    { id: 'colonial-regions', title: 'Colonial regions and geography', description: 'Connect regional climate and landforms with the work people did in the colonies.', skillIndices: [0, 1, 4] },
    { id: 'colonial-economies', title: 'Economy, resources, and settlement', description: 'Compare how resources and geography shaped colonial economies and settlement patterns.', skillIndices: [1, 2, 4] },
    { id: 'primary-sources', title: 'Regional comparisons and source context', description: 'Compare colonial regions and consider how source context and geography shape historical evidence.', skillIndices: [3, 2, 4] }
  ],
  'mp3-ela': [
    { id: 'central-idea', title: 'Central ideas and evidence', description: 'Identify an informational text’s main point and select details that support it.', skillIndices: [0, 1, 2] },
    { id: 'summary-paraphrase', title: 'Summary and paraphrasing', description: 'Condense key information and restate a source accurately in your own words.', skillIndices: [2, 3, 4] },
    { id: 'research-sources', title: 'Research sources and relevance', description: 'Choose useful sources and give credit when using information from them.', skillIndices: [1, 3, 4] }
  ],
  'mp3-math': [
    { id: 'solving-equations', title: 'Solving equations', description: 'Use inverse operations and substitution to solve and check equations.', skillIndices: [0, 3, 4] },
    { id: 'inequalities', title: 'Inequality solution sets', description: 'Interpret inequality symbols and identify values that satisfy an increasing boundary.', skillIndices: [1] },
    { id: 'expressions-relationships', title: 'Expressions and relationships', description: 'Evaluate expressions and represent real-world relationships with variables.', skillIndices: [2, 3, 0] }
  ],
  'mp3-science': [
    { id: 'cloud-formation', title: 'Condensation and cloud formation', description: 'Describe how water vapor cools and forms liquid droplets in the water cycle.', skillIndices: [0, 2, 1] },
    { id: 'weather-climate', title: 'Weather and climate patterns', description: 'Distinguish daily weather from climate and identify the records needed to study patterns.', skillIndices: [3, 1, 4] },
    { id: 'water-movement', title: 'Water movement and runoff', description: 'Trace evaporation, precipitation, and runoff through connected Earth systems.', skillIndices: [4, 1, 2] }
  ],
  'mp3-social': [
    { id: 'constitution', title: 'Constitutional principles', description: 'Explain why a constitution establishes government structure, powers, and limits.', skillIndices: [0, 1, 2] },
    { id: 'representation', title: 'Representation and civic voice', description: 'Connect representation, constitutional structure, and checks and balances with the role of the people.', skillIndices: [2, 0, 1] },
    { id: 'historical-reasoning', title: 'Historical evidence and cause', description: 'Compare accounts and connect historical conditions with the changes they produced.', skillIndices: [3, 4, 0] }
  ],
  'mp4-ela': [
    { id: 'claims-evidence', title: 'Claims and strong evidence', description: 'Write a specific position and select relevant support for the reasons behind it.', skillIndices: [0, 1, 4] },
    { id: 'counterclaims', title: 'Counterclaims and responses', description: 'Recognize a reasonable opposing view and answer it with evidence and reasoning.', skillIndices: [2, 3, 1] },
    { id: 'argument-structure', title: 'Argument structure and conclusions', description: 'Organize an argument so its opening, support, and conclusion work together.', skillIndices: [0, 3, 4] }
  ],
  'mp4-math': [
    { id: 'geometry', title: 'Angles and geometry reasoning', description: 'Apply angle relationships and area formulas to solve geometry problems.', skillIndices: [0, 1] },
    { id: 'probability', title: 'Probability and chance', description: 'Use favorable outcomes and sample spaces to describe the likelihood of events.', skillIndices: [2] },
    { id: 'scale-algebra', title: 'Scale and algebraic patterns', description: 'Apply scale factors and equations to represent relationships between quantities.', skillIndices: [3, 4] }
  ],
  'mp4-science': [
    { id: 'weathering-erosion', title: 'Weathering and erosion', description: 'Distinguish the breakdown of rock from the movement of weathered material.', skillIndices: [0, 1, 4] },
    { id: 'deposition-rock', title: 'Deposition and sedimentary rock', description: 'Explain how transported sediment settles and can form layers of rock.', skillIndices: [2, 3, 1] },
    { id: 'fossils-history', title: 'Fossils and Earth history', description: 'Use fossils and rock layers as evidence about past life and environments.', skillIndices: [4, 3, 0] }
  ],
  'mp4-social': [
    { id: 'historical-accounts', title: 'Evidence and historical accounts', description: 'Use reliable evidence and compare perspectives when studying the Civil War era.', skillIndices: [0, 1, 4] },
    { id: 'causes-consequences', title: 'Causes and consequences', description: 'Connect political and economic conditions with events and their outcomes.', skillIndices: [2, 3, 1] },
    { id: 'chronology-change', title: 'Chronology and sectional change', description: 'Put events in context and trace how expansion and sectional conflict developed.', skillIndices: [3, 4, 0] }
  ]
};

export function getTopicsForModule(moduleId: string): CurriculumTopic[] {
  return topicsByModule[moduleId] ?? [];
}