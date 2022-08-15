import { CorrectLetters } from './correct-letters';

export const handleGuessInput = (
  guessInputRef: React.RefObject<HTMLInputElement>,
  wordToFind: string,
  setGuess: (value: React.SetStateAction<string>) => void
) => {
  const newGuess = guessInputRef.current?.value.toUpperCase();
  if (newGuess === undefined || newGuess === null) {
    return;
  }

  const newPaddedGuess = `${newGuess}`.padEnd(wordToFind.length, ' ');
  setGuess(newPaddedGuess);
};
export const submitGuess = (
  wordToFind: string,
  setGuesses: (
    value: { guess: string; correctLetters: CorrectLetters }[]
  ) => void,
  guesses: { guess: string; correctLetters: CorrectLetters }[],
  guess: string,
  guessInputRef: React.RefObject<HTMLInputElement>,
  setGuess: React.Dispatch<React.SetStateAction<string>>
) => {
  const lettersInWordToFind = wordToFind.split('');
  const lettersInGuess = guess.split('');
  const correctLetters: CorrectLetters = {};

  for (const [i, letter] of lettersInGuess.entries()) {
    if (lettersInWordToFind[i] === letter) {
      correctLetters[i] = { letter: true, position: true };
    } else if (wordToFind.includes(letter)) {
      correctLetters[i] = { letter: true, position: false };
    } else {
      correctLetters[i] = { letter: false, position: false };
    }
  }

  setGuesses([...guesses, { guess, correctLetters }]);

  if (guessInputRef.current) {
    guessInputRef.current.value = '';
    guessInputRef.current.focus();
  }
  setGuess(''.padEnd(wordToFind.length));

  let isCorrect = true;
  for (const letter of Object.values(correctLetters)) {
    if (letter.letter && letter.position) {
      isCorrect = true;
    } else {
      isCorrect = false;
      break;
    }
  }

  return isCorrect;
};
