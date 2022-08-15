import { Page } from '@ewgg/shared/ui/core';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { GAME_STATUS, useStore } from '@ewgg/shared/data-access';
import { useEffect } from 'react';
import {
  subscribeToRoomChanges,
  useFirebase,
} from '@ewgg/shared/firebase/data-access';
import { Firestore } from 'firebase/firestore';

/* eslint-disable-next-line */
export interface StudentWaitingRoomProps {}

export function StudentWaitingRoom(props: StudentWaitingRoomProps) {
  const navigate = useNavigate();
  const { activeRoom, name } = useStore();
  const { db } = useFirebase();
  const routeToGamePage = () => {
    navigate('/student/game-page', { replace: true });
  };

  useEffect(() => {
    let unsub: any = () => null;
    if (activeRoom) {
      unsub = subscribeToRoomChanges(
        activeRoom.roomId,
        db as Firestore,
        (room) => {
          if (room.gameStatus === GAME_STATUS.STARTED) {
            routeToGamePage();
          }
        }
      );
    }

    return function cleanup() {
      unsub();
    };
  }, []);

  return (
    <Page className={`justify-center`}>
      <Stack spacing={12}>
        <div>
          <Typography variant="h4" align="center">
            Welcome! You've Joined Room Code:
          </Typography>
          <Box
            component={'div'}
            sx={{
              letterSpacing: 3,
              fontFamily: 'monospace',
              fontSize: 'h3.fontSize',
              textAlign: 'center',
            }}
          >
            {activeRoom && activeRoom.roomCode}
          </Box>
        </div>
        <div>
          <Typography variant="h4" align="center">
            Your assigned name is:
          </Typography>
          <Box
            component={'div'}
            sx={{
              letterSpacing: 3,
              fontFamily: 'monospace',
              fontSize: 'h3.fontSize',
              textAlign: 'center',
            }}
          >
            {name}
          </Box>
        </div>

        <Typography variant="h5" align="center">
          Waiting for Game to Start...
        </Typography>
      </Stack>
    </Page>
  );
}

export default StudentWaitingRoom;
