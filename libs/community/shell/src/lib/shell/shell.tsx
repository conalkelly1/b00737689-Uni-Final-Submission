import { Route, Routes } from 'react-router-dom';
import { useRef, useState } from 'react';

import { TileRow } from '@ewgg/shared/ui/tile';
import { CorrectLetters } from '@ewgg/shared/data-access';

export function Shell() {
  const wordToFind = 'stern';
  const guessInputRef = useRef<HTMLInputElement>(null);
  const [guesses, setGuesses] = useState<
    {
      guess: string;
      correctLetters: CorrectLetters;
    }[]
  >([]);

  const [guess, setGuess] = useState(''.padEnd(wordToFind.length));

  const handleGuessInput = () => {
    const newGuess = guessInputRef.current?.value;
    if (newGuess === undefined || newGuess === null) {
      return;
    }

    const newPaddedGuess = `${newGuess}`.padEnd(wordToFind.length, ' ');
    setGuess(newPaddedGuess);
  };

  const submitGuess = () => {
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
  };

  return (
    <div className="bg-wordle w-screen h-screen">
      <div className="grid grid-rows-5 gap-1">
        {guesses.map((attemptedGuess) => (
          <TileRow
            key={attemptedGuess.guess}
            word={attemptedGuess.guess}
            correctLetters={attemptedGuess.correctLetters}
          />
        ))}
        <TileRow word={guess} correctLetters={{}} />
      </div>
      <input type="text" ref={guessInputRef} onKeyUp={handleGuessInput} />
      <button
        className="border-2 border-solid border-cyan-500 text-cyan-500 p-2 rounded-full hover:bg-cyan-500 hover:text-white active:bg-cyan-500 active:text-white m-2"
        type="button"
        onClick={submitGuess}
      >
        Submit
      </button>
      <Routes>
        <Route path="/" />
        <Route path="/page-2" />
      </Routes>
    </div>
  );
}

export default Shell;
