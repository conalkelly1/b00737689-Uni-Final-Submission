import { Page } from '@ewgg/shared/ui/core';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { joinRoom, useFirebase } from '@ewgg/shared/firebase/data-access';
import { useStore } from '@ewgg/shared/data-access';

import { Firestore } from 'firebase/firestore';

/* eslint-disable-next-line */
export interface RoomCodeEntryProps {}

export function RoomCodeEntry(props: RoomCodeEntryProps) {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const { addParticipant, setActiveRoom, setName, setParticipant } = useStore();
  const { db } = useFirebase();

  const routeToWaitingRoom = async () => {
    const { room, name } = await joinRoom(roomCode, db as Firestore);
    setActiveRoom(room);
    addParticipant(name);
    setName(name);
    setParticipant({ name, timeTaken: 0, guesses: 0, foundWord: false });
    navigate('/student/waiting-room', { replace: true });
  };

  return (
    <Page className={'justify-center items-center'}>
      <Stack spacing={2}>
        <Typography variant="h3" className="text-center">
          Enter Room Code:
        </Typography>
        <FormControl>
          <TextField
            label="Room Code"
            variant="outlined"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
        </FormControl>
        <Button variant="contained" onClick={routeToWaitingRoom}>
          Join Room
        </Button>
      </Stack>
    </Page>
  );
}

export default RoomCodeEntry;
