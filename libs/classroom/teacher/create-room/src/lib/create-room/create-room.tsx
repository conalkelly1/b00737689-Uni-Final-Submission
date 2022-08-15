import { Page } from '@ewgg/shared/ui/core';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getRandomWord, useStore } from '@ewgg/shared/data-access';
import {
  createRoom,
  signInAnon,
  useFirebase,
} from '@ewgg/shared/firebase/data-access';
import { onAuthStateChanged } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import Casino from '@mui/icons-material/Casino';

/* eslint-disable-next-line */
export interface CreateRoomProps {}

export function CreateRoom(props: CreateRoomProps) {
  const navigate = useNavigate();
  const [selectedGameMode, setGameMode] = useState(1);
  const { user, setUser, setActiveRoom } = useStore();
  const { auth, db } = useFirebase();

  const [wordToGuess, setWordToGuess] = useState('');
  const [guessLimit, setGuessLimit] = useState(5);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({ id: user.uid });
        } else {
          setUser(null);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (auth && !user) {
      signInAnon(setUser, auth);
    }
  }, [user]);

  const routeToWaitingRoom = async () => {
    const room = await createRoom(wordToGuess, guessLimit, db as Firestore);
    if (room) {
      setActiveRoom(room);
      navigate('/teacher/waiting-room', { replace: true });
    } else {
      // do something with error
    }
  };

  const pickRandomWord = () => {
    setWordToGuess(getRandomWord());
  };

  return (
    <Page className={'justify-center items-center'}>
      <Stack spacing={2}>
        <Typography variant="h3" className="text-center">
          Create Game Room
        </Typography>
        <FormControl>
          <TextField
            label="Set Word"
            variant="outlined"
            value={wordToGuess}
            onChange={(e) => setWordToGuess(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="pick random word"
                    onClick={pickRandomWord}
                    edge="end"
                  >
                    <Casino></Casino>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Set Guess Limit"
            type="number"
            variant="outlined"
            value={guessLimit}
            onChange={(e) => setGuessLimit(parseInt(e.target.value, 10))}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Set Game Mode</InputLabel>
          <Select
            labelId="set-game-mode-select-label"
            id="set-game-mode-select"
            label="Set Game Mode"
            value={selectedGameMode}
            onChange={(event) => setGameMode(event.target.value as number)}
          >
            <MenuItem value={1}>Normal</MenuItem>
            <MenuItem value={2}>First to Guess</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={routeToWaitingRoom}>
          Create Room
        </Button>
      </Stack>
    </Page>
  );
}

export default CreateRoom;
