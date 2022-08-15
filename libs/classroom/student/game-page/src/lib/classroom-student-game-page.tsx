import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { TileRow } from '@ewgg/shared/ui/tile';
import {
  CorrectLetters,
  handleGuessInput,
  submitGuess,
  useStore,
} from '@ewgg/shared/data-access';
import {
  makeGuessForParticipantForRoom,
  subscribeToRoomChanges,
  useFirebase,
} from '@ewgg/shared/firebase/data-access';
import { Firestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface GamePageProps {}

export function GamePage(props: GamePageProps) {
  const navigate = useNavigate();
  const { activeRoom, participant, setParticipant, name } = useStore();
  const { db } = useFirebase();
  const wordToFind = (activeRoom && activeRoom.wordToGuess) || '';

  const guessInputRef = useRef<HTMLInputElement>(null);
  const [guesses, setGuesses] = useState<
    {
      guess: string;
      correctLetters: CorrectLetters;
    }[]
  >([]);

  const [guess, setGuess] = useState(''.padEnd(wordToFind.length));
  const [wordFound, setWordFound] = useState(false);
  const [timeStart] = useState(Date.now());
  const [fastestToGuess, setFastestToGuess] = useState('');

  const handleUserInput = () => {
    handleGuessInput(guessInputRef, wordToFind, setGuess);
  };

  const submitUserGuess = async () => {
    if (activeRoom && participant) {
      if (guesses.length < activeRoom.guessLimit) {
        const isWordFound = submitGuess(
          wordToFind,
          setGuesses,
          guesses,
          guess,
          guessInputRef,
          setGuess
        );

        const newParticipantData = {
          ...participant,
          guesses: participant.guesses + 1,
        };
        setParticipant(newParticipantData);

        await makeGuessForParticipantForRoom(
          db as Firestore,
          activeRoom,
          newParticipantData,
          isWordFound,
          isWordFound ? Date.now() - timeStart : 0
        );

        setWordFound(isWordFound);
      }
    }
  };

  const isAtGuessLimit = activeRoom && activeRoom.guessLimit === guesses.length;

  const routeToMainMenu = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (activeRoom) {
      subscribeToRoomChanges(activeRoom.roomId, db as Firestore, (room) => {
        const sortedParticipants = room.participants.sort((a, b) => {
          if (a.foundWord && b.foundWord) {
            return a.guesses - b.guesses;
          } else {
            return 1;
          }
        });

        console.log('sorted participants', sortedParticipants);
        const fastestGuesser = sortedParticipants[0];

        setFastestToGuess(fastestGuesser.name);
      });
    }
  }, []);

  return (
    <div className="bg-wordle w-full h-full">
      <h1 className="text-3xl text-black text-center">
        Educational Word Guessing Game!
      </h1>
      <br />
      <h1 className="text-xl text-black text-center">Good luck {name}!</h1>
      <div className="grid grid-rows-5 gap-1 border-black">
        {guesses.map((attemptedGuess) => (
          <TileRow
            key={attemptedGuess.guess}
            word={attemptedGuess.guess}
            correctLetters={attemptedGuess.correctLetters}
          />
        ))}
        {!isAtGuessLimit && !wordFound && (
          <TileRow word={guess} correctLetters={{}} />
        )}
      </div>
      {!isAtGuessLimit && !wordFound && (
        <div className="flex items-stretch justify-center">
          <FormControl sx={{ mr: 1 }}>
            <TextField
              label="Guess:"
              variant="outlined"
              inputRef={guessInputRef}
              inputProps={{ maxLength: wordToFind.length }}
              onKeyUp={handleUserInput}
            />
          </FormControl>
          <Button variant="contained" onClick={submitUserGuess}>
            Submit
          </Button>
        </div>
      )}
      {isAtGuessLimit ||
        (wordFound && (
          <Dialog open={wordFound || isAtGuessLimit} onClose={routeToMainMenu}>
            <DialogTitle>
              {!wordFound && 'Game Over!'}
              {wordFound && 'You win!'}
            </DialogTitle>
            <List>
              {wordFound && (
                <ListItem>
                  <ListItemText>
                    You found the word in <strong>{guesses.length}</strong>{' '}
                    guesses!!
                  </ListItemText>
                </ListItem>
              )}
              {isAtGuessLimit && !wordFound && (
                <ListItem>
                  <ListItemText>
                    You've run out of guesses! The word was{' '}
                    {activeRoom && activeRoom.wordToGuess}
                  </ListItemText>
                </ListItem>
              )}
              <ListItem>
                <ListItemText>
                  <strong>{fastestToGuess}</strong> was the first to guess
                  correctly!
                </ListItemText>
              </ListItem>
            </List>
            <DialogActions>
              <Button autoFocus onClick={routeToMainMenu}>
                Back to Main Menu
              </Button>
            </DialogActions>
          </Dialog>
        ))}
    </div>
  );
}

export default GamePage;
