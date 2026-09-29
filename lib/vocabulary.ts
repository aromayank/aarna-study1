export const vocabularySubjects = ['ELA', 'Math', 'Social Studies'] as const;

export type VocabularySubject = (typeof vocabularySubjects)[number];

export type VocabularyTerm = {
  term: string;
  definition: string;
};

const vocabularyByPeriod: Record<string, Record<VocabularySubject, VocabularyTerm[]>> = {
  mp1: {
    ELA: [
      { term: 'character motivation', definition: 'The reason behind a character’s choices and actions in a narrative.' },
      { term: 'conflict', definition: 'The central struggle between opposing forces that drives a story.' },
      { term: 'exposition', definition: 'The opening information that introduces a narrative’s characters, setting, and situation.' },
      { term: 'rising action', definition: 'Events that build tension as a narrative conflict develops.' },
      { term: 'climax', definition: 'The turning point of greatest tension, when the main conflict changes direction.' },
      { term: 'resolution', definition: 'The part of a narrative that shows how the central conflict ends.' },
      { term: 'characterization', definition: 'The ways a writer reveals a character through actions, dialogue, thoughts, and details.' },
      { term: 'theme', definition: 'A message about life developed through a story and supported by its details.' }
    ],
    Math: [
      { term: 'rational number', definition: 'A number that can be written as a ratio of two integers, with a nonzero denominator.' },
      { term: 'integer', definition: 'A positive or negative whole number, including zero.' },
      { term: 'opposite', definition: 'A number the same distance from zero on the number line but on the other side.' },
      { term: 'absolute value', definition: 'A number’s distance from zero, regardless of direction.' },
      { term: 'coefficient', definition: 'The number multiplying a variable in an expression, such as 5 in 5x.' },
      { term: 'constant', definition: 'A fixed number without a variable in an expression.' },
      { term: 'distributive property', definition: 'Multiplying a factor by each term inside parentheses: a(b + c) = ab + ac.' },
      { term: 'equivalent expressions', definition: 'Expressions that may look different but have the same value for every allowed variable value.' }
    ],
    'Social Studies': [
      { term: 'absolute location', definition: 'A precise position on Earth, often given with coordinates or an address.' },
      { term: 'relative location', definition: 'A place described in relation to another place.' },
      { term: 'region', definition: 'An area grouped by shared physical or human characteristics.' },
      { term: 'human-environment interaction', definition: 'How people depend on, adapt to, and change their surroundings.' },
      { term: 'movement', definition: 'The movement of people, goods, and ideas from one place to another.' },
      { term: 'civilization', definition: 'A complex society with organized communities and shared institutions.' },
      { term: 'primary source', definition: 'Evidence created by someone who experienced or witnessed the period being studied.' },
      { term: 'perspective', definition: 'A person’s point of view, shaped by their experiences and position.' }
    ]
  },
  mp2: {
    ELA: [
      { term: 'speaker', definition: 'The voice that speaks in a poem; it is not automatically the poet.' },
      { term: 'stanza', definition: 'A grouped set of lines in a poem, similar to a paragraph.' },
      { term: 'imagery', definition: 'Descriptive language that helps readers picture, hear, feel, smell, or taste a scene.' },
      { term: 'figurative language', definition: 'Language used beyond its literal meaning to create an image or comparison.' },
      { term: 'simile', definition: 'A comparison using “like” or “as.”' },
      { term: 'alliteration', definition: 'Repetition of beginning consonant sounds in nearby words.' },
      { term: 'stage direction', definition: 'A playwright’s note about movement, expression, sound, or setting that is not spoken aloud.' },
      { term: 'dramatic structure', definition: 'The way a play organizes scenes and events to develop conflict and theme.' }
    ],
    Math: [
      { term: 'ratio', definition: 'A comparison of two quantities by division.' },
      { term: 'rate', definition: 'A ratio comparing quantities measured in different units.' },
      { term: 'unit rate', definition: 'A rate expressed for one unit of the second quantity.' },
      { term: 'proportion', definition: 'An equation stating that two ratios are equal.' },
      { term: 'proportional relationship', definition: 'A relationship with a constant ratio between corresponding quantities.' },
      { term: 'constant of proportionality', definition: 'The constant value k in an equation such as y = kx.' },
      { term: 'percent', definition: 'A rate or ratio expressed per one hundred.' },
      { term: 'percent change', definition: 'The change in an amount compared with the original amount, expressed as a percent.' }
    ],
    'Social Studies': [
      { term: 'colony', definition: 'A settlement or territory governed by a country located elsewhere.' },
      { term: 'New England colonies', definition: 'The northern English colonies, where climate and rocky soil supported trade, fishing, and smaller farms.' },
      { term: 'Middle Colonies', definition: 'The central English colonies, known for diverse communities, farming, and trade.' },
      { term: 'Southern Colonies', definition: 'The southern English colonies, where climate and fertile land supported plantations and cash crops.' },
      { term: 'cash crop', definition: 'A crop grown mainly to sell or trade rather than to feed the grower.' },
      { term: 'subsistence farming', definition: 'Growing enough food mainly for a family or local community to use.' },
      { term: 'mercantilism', definition: 'An economic system in which colonies supplied resources and markets to benefit the home country.' },
      { term: 'triangular trade', definition: 'A term for interconnected Atlantic trade routes linking Europe, Africa, and the Americas; the routes and cargoes varied.' }
    ]
  },
  mp3: {
    ELA: [
      { term: 'central idea', definition: 'The main point an informational text develops about its topic.' },
      { term: 'objective summary', definition: 'A concise account of the central ideas and key details without personal opinion.' },
      { term: 'paraphrase', definition: 'Restating a source’s idea in your own words while preserving its meaning and giving credit.' },
      { term: 'plagiarism', definition: 'Presenting someone else’s words or ideas as your own without proper acknowledgment.' },
      { term: 'citation', definition: 'Information that identifies a source used in research.' },
      { term: 'relevant evidence', definition: 'Facts, examples, or quotations that directly help answer a research question or support an idea.' },
      { term: 'source credibility', definition: 'How trustworthy and appropriate a source is for a particular research purpose.' },
      { term: 'corroboration', definition: 'Checking a claim against additional sources to see whether the evidence agrees.' }
    ],
    Math: [
      { term: 'variable', definition: 'A symbol, often a letter, that represents a value that may be unknown or change.' },
      { term: 'expression', definition: 'Numbers, variables, and operations combined without an equals sign.' },
      { term: 'equation', definition: 'A statement that two expressions have equal values.' },
      { term: 'inequality', definition: 'A comparison of expressions using symbols such as <, >, ≤, or ≥.' },
      { term: 'solution', definition: 'A value that makes an equation or inequality true.' },
      { term: 'inverse operations', definition: 'Operations that undo one another, such as addition and subtraction.' },
      { term: 'independent variable', definition: 'The input value chosen or changed in a relationship.' },
      { term: 'dependent variable', definition: 'The output value that depends on the input in a relationship.' }
    ],
    'Social Studies': [
      { term: 'taxation without representation', definition: 'The colonists’ objection that Parliament taxed them without allowing elected colonial representatives there.' },
      { term: 'boycott', definition: 'A refusal to buy or use goods as a form of protest.' },
      { term: 'independence', definition: 'Self-government and freedom from another country’s control.' },
      { term: 'natural rights', definition: 'Rights understood as belonging to people by nature, not granted by a ruler.' },
      { term: 'popular sovereignty', definition: 'The principle that a government’s authority comes from the people.' },
      { term: 'separation of powers', definition: 'Dividing government responsibilities among branches to limit concentrated power.' },
      { term: 'checks and balances', definition: 'Powers that let each branch limit actions of the other branches.' },
      { term: 'federalism', definition: 'A system that divides government authority between national and state governments.' }
    ]
  },
  mp4: {
    ELA: [
      { term: 'claim', definition: 'A debatable statement that an argument aims to support.' },
      { term: 'evidence', definition: 'Relevant facts, examples, or quotations used to support a claim.' },
      { term: 'reasoning', definition: 'The explanation connecting evidence to the claim it supports.' },
      { term: 'counterclaim', definition: 'A reasonable opposing position on the issue being argued.' },
      { term: 'rebuttal', definition: 'A response that explains why a counterclaim does not overturn the main claim.' },
      { term: 'bias', definition: 'A tendency or preference that can affect how information is selected or presented.' },
      { term: 'rhetorical appeal', definition: 'A strategy that persuades through credibility, emotion, or logic.' },
      { term: 'conclusion', definition: 'The ending that reinforces an argument’s claim and leaves the reader with its significance.' }
    ],
    Math: [
      { term: 'angle', definition: 'A figure formed by two rays that share an endpoint.' },
      { term: 'triangle angle sum', definition: 'The interior angles of every triangle add to 180 degrees.' },
      { term: 'scale drawing', definition: 'A drawing whose lengths keep a consistent ratio to the real object.' },
      { term: 'area', definition: 'The number of square units covering a two-dimensional region.' },
      { term: 'system of equations', definition: 'Two or more equations considered together; a solution satisfies all of them.' },
      { term: 'solution to a system', definition: 'An ordered pair or set of values that makes every equation in the system true.' },
      { term: 'sample space', definition: 'The complete set of possible outcomes for a chance experiment.' },
      { term: 'probability', definition: 'A measure of how likely an event is, from 0 for impossible to 1 for certain.' }
    ],
    'Social Studies': [
      { term: 'sectionalism', definition: 'Strong loyalty to a region whose interests may conflict with those of other regions.' },
      { term: 'westward expansion', definition: 'The growth of U.S. settlement and territorial control toward the west.' },
      { term: 'abolition', definition: 'The movement to end slavery.' },
      { term: 'compromise', definition: 'An agreement in which opposing sides accept different parts of a proposal.' },
      { term: 'secession', definition: 'A formal decision by a state to leave the United States.' },
      { term: 'Union', definition: 'The United States and the states that remained in it during the Civil War.' },
      { term: 'Confederacy', definition: 'The government formed by states that seceded from the United States.' },
      { term: 'emancipation', definition: 'The act of freeing enslaved people; during the Civil War, the Emancipation Proclamation applied to areas in rebellion.' }
    ]
  }
};

export function getVocabularyTerms(periodId: string, subject: VocabularySubject): VocabularyTerm[] {
  return vocabularyByPeriod[periodId]?.[subject] ?? [];
}