const WORDS = [
'well',
'only',
'those',
'tell',
'one',
'very',
'her',
'even',
'back',
'any',
'good',
'woman',
'us',
'life',
'child',
'there',
'work',
'down',
'may',
'after',
'should',
'call',
'world',
'over',
'school',
'in',
'as',
'last',
'ask',
'need',
'too',
'feel',
'when',
'high',
'really',
'most',
'much',
'family',
'own',
'out',
'leave',
'put',
'old',
'mean',
'on',
'keep',
'why',
'let',
'same',
'big',
'group',
'seem',
'help',
'talk',
'where',
'turn',
'every',
'start',
'hand',
'might',
'show',
'part',
'about',
'place',
'over',
'such',
'again',
'few',
'case',
'most',
'week',
'company',
'where',
'system',
'each',
'right',
'program',
'hear',
'so',
'question',
'during',
'work',
'play',
];

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
