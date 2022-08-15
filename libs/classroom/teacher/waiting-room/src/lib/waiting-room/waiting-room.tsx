import { Page } from '@ewgg/shared/ui/core';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useStore } from '@ewgg/shared/data-access';
import { useEffect, useState } from 'react';
import {
  startGameForRoom,
  subscribeToRoomChanges,
  useFirebase,
} from '@ewgg/shared/firebase/data-access';
import { Firestore } from 'firebase/firestore';

/* eslint-disable-next-line */
export interface WaitingRoomProps {}

export function WaitingRoom(props: WaitingRoomProps) {
  const navigate = useNavigate();
  const { activeRoom, setGameStarted } = useStore();
  const [participants, setParticipants] = useState<{ name: string }[]>([]);
  const { db } = useFirebase();

  const routeToLiveResults = async () => {
    if (activeRoom) {
      await startGameForRoom(activeRoom.roomId, db as Firestore);
      setGameStarted();
    }
    navigate('/teacher/live-results', { replace: true });
  };

  useEffect(() => {
    if (activeRoom) {
      subscribeToRoomChanges(
        activeRoom?.roomId ?? '',
        db as Firestore,
        (room) => {
          if (
            activeRoom &&
            room.participants.length > activeRoom.participants.length
          ) {
            setParticipants(room.participants);
          }
        }
      );
    }
  }, [activeRoom]);

  return (
    <Page className={`justify-center`}>
      <Stack spacing={4}>
        <div>
          <Typography variant="h4" align="center">
            The Room Code is
          </Typography>
          <Box
            component={'div'}
            sx={{
              letterSpacing: 2,
              fontFamily: 'monospace',
              fontSize: 'h4.fontSize',
              textAlign: 'center',
            }}
          >
            {activeRoom && activeRoom.roomCode}
          </Box>
        </div>

        <div>
          <Typography variant="h4" align="center">
            The Word is
          </Typography>
          <Box
            component={'div'}
            sx={{
              letterSpacing: 2,
              fontFamily: 'monospace',
              fontSize: 'h4.fontSize',
              textAlign: 'center',
            }}
          >
            {activeRoom && activeRoom.wordToGuess}
          </Box>
        </div>
        <div>
          <Typography variant="body1">
            Joined Students{' - '}
            <strong>({participants && participants.length})</strong>
          </Typography>
          <Box
            sx={{
              width: '100%',
              maxWidth: 360,
              border: '1px solid grey',
              overflowY: 'auto',
              minHeight: '30vh',
              maxHeight: '30vh',
            }}
          >
            {participants &&
              participants.length > 0 &&
              participants.map(({ name }) => (
                <ListItem>
                  <ListItemText>{name}</ListItemText>
                </ListItem>
              ))}
            {participants && participants.length === 0 && (
              <ListItem>
                <ListItemText>No students joined yet!</ListItemText>
              </ListItem>
            )}
            <Divider />
          </Box>
        </div>

        <Button variant="contained" onClick={routeToLiveResults}>
          Start Game
        </Button>
      </Stack>
    </Page>
  );
}

export default WaitingRoom;
