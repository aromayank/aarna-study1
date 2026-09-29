export type SpellingLevel = 'easy' | 'medium' | 'hard';

export type SpellingWord = {
  word: string;
  hint: string;
};

export const spellingLevels: SpellingLevel[] = ['easy', 'medium', 'hard'];

const spellingByPeriod: Record<string, Record<SpellingLevel, SpellingWord[]>> = {
  mp1: {
    easy: [
      { word: 'chapter', hint: 'One major section of a book.' },
      { word: 'setting', hint: 'The time and place where a story happens.' },
      { word: 'fraction', hint: 'A number that represents part of a whole.' },
      { word: 'integer', hint: 'A whole number, its opposite, or zero.' },
      { word: 'habitat', hint: 'The natural home of an organism.' },
      { word: 'region', hint: 'An area grouped by shared features.' },
      { word: 'numerator', hint: 'The number above the line in a fraction.' },
      { word: 'plot', hint: 'The sequence of important events in a story.' }
    ],
    medium: [
      { word: 'narrative', hint: 'A text that tells a sequence of events.' },
      { word: 'equivalent', hint: 'Equal in value or meaning.' },
      { word: 'ecosystem', hint: 'Living things interacting with their environment.' },
      { word: 'motivation', hint: 'A reason for a character’s actions.' },
      { word: 'denominator', hint: 'The number below the line in a fraction.' },
      { word: 'resource', hint: 'Something people or organisms can use.' },
      { word: 'civilization', hint: 'A complex society with shared institutions.' },
      { word: 'evidence', hint: 'Information used to support an idea.' }
    ],
    hard: [
      { word: 'perseverance', hint: 'Continuing effort despite difficulty.' },
      { word: 'biodiversity', hint: 'The variety of living things in an area.' },
      { word: 'characterization', hint: 'The way a writer develops a character.' },
      { word: 'protagonist', hint: 'The central character in a story.' },
      { word: 'environment', hint: 'The surroundings and conditions of a living thing.' },
      { word: 'perspective', hint: 'A particular point of view.' },
      { word: 'distributive', hint: 'A property that multiplies a factor across terms.' },
      { word: 'archaeology', hint: 'The study of past people through material remains.' }
    ]
  },
  mp2: {
    easy: [
      { word: 'poem', hint: 'A piece of writing arranged for sound, rhythm, or meaning.' },
      { word: 'verse', hint: 'A line or group of lines in a poem.' },
      { word: 'ratio', hint: 'A comparison of two quantities.' },
      { word: 'percent', hint: 'A rate expressed out of one hundred.' },
      { word: 'species', hint: 'A group of similar organisms.' },
      { word: 'colony', hint: 'A settlement governed by another country.' },
      { word: 'stanza', hint: 'A grouped set of lines in a poem.' },
      { word: 'rhythm', hint: 'A pattern of beats or sounds.' }
    ],
    medium: [
      { word: 'symbolism', hint: 'Using an object or image to represent an idea.' },
      { word: 'figurative', hint: 'Using language beyond its literal meaning.' },
      { word: 'alliteration', hint: 'Repeated beginning sounds in nearby words.' },
      { word: 'adaptation', hint: 'A trait that can help an organism survive.' },
      { word: 'proportion', hint: 'An equation stating that two ratios are equal.' },
      { word: 'settlement', hint: 'A place where people establish a community.' },
      { word: 'longitude', hint: 'A measure of position east or west on Earth.' },
      { word: 'colonist', hint: 'A person who lives in a colony.' }
    ],
    hard: [
      { word: 'interpretation', hint: 'An explanation of the meaning of a text or evidence.' },
      { word: 'circumference', hint: 'The distance around a circle.' },
      { word: 'interdependence', hint: 'A condition in which things depend on one another.' },
      { word: 'proportionality', hint: 'A relationship with a constant ratio.' },
      { word: 'homologous', hint: 'Having a similar structure because of shared ancestry.' },
      { word: 'anthropologist', hint: 'A person who studies human societies and cultures.' },
      { word: 'distinguish', hint: 'To recognize a difference between things.' },
      { word: 'influential', hint: 'Having the power to affect people or events.' }
    ]
  },
  mp3: {
    easy: [
      { word: 'source', hint: 'A place where information or evidence comes from.' },
      { word: 'summary', hint: 'A short statement of the main ideas.' },
      { word: 'climate', hint: 'The long-term pattern of weather in a region.' },
      { word: 'runoff', hint: 'Water that flows over land into waterways.' },
      { word: 'branch', hint: 'A division of government with a specific role.' },
      { word: 'motion', hint: 'A formal proposal for a group to consider.' },
      { word: 'equation', hint: 'A statement that two expressions are equal.' },
      { word: 'circuit', hint: 'A complete path through which electricity can flow.' }
    ],
    medium: [
      { word: 'paraphrase', hint: 'Restating an idea in your own words.' },
      { word: 'condensation', hint: 'The change from water vapor to liquid water.' },
      { word: 'reliable', hint: 'Consistently accurate or trustworthy.' },
      { word: 'variable', hint: 'A symbol or quantity that can change.' },
      { word: 'precipitation', hint: 'Water falling from clouds as rain, snow, sleet, or hail.' },
      { word: 'representative', hint: 'A person chosen to speak or act for others.' },
      { word: 'inequality', hint: 'A comparison showing one value is greater or less than another.' },
      { word: 'citation', hint: 'A reference that identifies a source.' }
    ],
    hard: [
      { word: 'corroborate', hint: 'To support a claim by checking it against another source.' },
      { word: 'constitutional', hint: 'Relating to a written plan for government.' },
      { word: 'accountability', hint: 'Responsibility for actions and decisions.' },
      { word: 'methodology', hint: 'A system of methods used in a study.' },
      { word: 'transformation', hint: 'A change in form, structure, or appearance.' },
      { word: 'hypothesis', hint: 'A testable explanation or prediction.' },
      { word: 'jurisdiction', hint: 'The official power to make decisions in an area.' },
      { word: 'reconciliation', hint: 'The process of restoring a relationship or agreement.' }
    ]
  },
  mp4: {
    easy: [
      { word: 'claim', hint: 'A statement that can be supported with reasons.' },
      { word: 'fossil', hint: 'A preserved remain or trace of past life.' },
      { word: 'angle', hint: 'A figure formed by two rays that share an endpoint.' },
      { word: 'erosion', hint: 'The movement of weathered material.' },
      { word: 'argument', hint: 'A claim supported by reasons and evidence.' },
      { word: 'scale', hint: 'A relationship between a drawing and real size.' },
      { word: 'cause', hint: 'A condition or action that helps produce an event.' },
      { word: 'mineral', hint: 'A naturally occurring solid with a defined composition.' }
    ],
    medium: [
      { word: 'counterclaim', hint: 'A reasonable opposing position in an argument.' },
      { word: 'deposition', hint: 'The settling of sediment in a new location.' },
      { word: 'sedimentary', hint: 'Describing rock formed from layers of sediment.' },
      { word: 'probability', hint: 'The chance that an event will occur.' },
      { word: 'consequence', hint: 'An outcome that follows an event or decision.' },
      { word: 'thesis', hint: 'The main claim or controlling idea in a piece of writing.' },
      { word: 'compaction', hint: 'The pressing together of sediment under pressure.' },
      { word: 'government', hint: 'The system that makes and enforces public rules.' }
    ],
    hard: [
      { word: 'metamorphic', hint: 'Describing rock changed by heat and pressure.' },
      { word: 'chronology', hint: 'The arrangement of events in time order.' },
      { word: 'counterargument', hint: 'A response that addresses an opposing argument.' },
      { word: 'independence', hint: 'The state of being free from outside control.' },
      { word: 'volcanic', hint: 'Relating to a volcano or material erupted from one.' },
      { word: 'legislative', hint: 'Relating to the branch that makes laws.' },
      { word: 'geological', hint: 'Relating to Earth’s structure and history.' },
      { word: 'stratigraphy', hint: 'The study of rock layers and their sequence.' }
    ]
  }
};

export function getSpellingWords(periodId: string, level: SpellingLevel): SpellingWord[] {
  return spellingByPeriod[periodId]?.[level] ?? spellingByPeriod.mp1[level];
}

export function shuffleSpellingWords(words: SpellingWord[]): SpellingWord[] {
  const shuffled = [...words];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}
