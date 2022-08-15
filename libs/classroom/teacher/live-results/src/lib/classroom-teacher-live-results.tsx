import { Page } from '@ewgg/shared/ui/core';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Firestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  subscribeToRoomChanges,
  useFirebase,
} from '@ewgg/shared/firebase/data-access';
import { Participants, useStore } from '@ewgg/shared/data-access';
import { intervalToDuration } from 'date-fns';

/* eslint-disable-next-line */
export interface LiveResultsProps {}

const columns: GridColDef[] = [
  { field: 'userName', headerName: 'User Name', width: 140 },
  { field: 'totalGuesses', headerName: 'Attempts', width: 100 },
  { field: 'timeTaken', headerName: 'Time Taken', width: 100 },
  { field: 'wordFound', headerName: 'Found Word', width: 100 },
];

// const rows = [
//   { id: 1, timeTaken: '1:01', userName: 'JonBonBon', totalGuesses: 35 },
//   { id: 2, timeTaken: '3.45', userName: 'Mario', totalGuesses: 42 },
//   { id: 3, timeTaken: '2.44', userName: 'Luigi', totalGuesses: 45 },
//   { id: 4, timeTaken: '6.41', userName: 'Peach', totalGuesses: 16 },
//   { id: 5, timeTaken: '0.30', userName: 'Yoshi', totalGuesses: 1 },
//   { id: 6, timeTaken: '7.59', userName: 'Hermione', totalGuesses: 50 },
//   { id: 7, timeTaken: '9.20', userName: 'JohnnyBravo', totalGuesses: 44 },
//   { id: 8, timeTaken: '4.44', userName: 'Coutinho', totalGuesses: 36 },
//   { id: 9, timeTaken: '0.10', userName: 'Harvey', totalGuesses: 65 },
// ];

export function LiveResults(props: LiveResultsProps) {
  const navigate = useNavigate();
  const { db } = useFirebase();
  const { activeRoom } = useStore();
  const [participants, setParticipants] = useState<Participants[]>([]);

  const routeToLandingPage = () => {
    navigate('/', { replace: true });
  };
  const routeToCreateGame = () => {
    navigate('/teacher/create-room', { replace: true });
  };

  useEffect(() => {
    if (activeRoom) {
      subscribeToRoomChanges(activeRoom.roomId, db as Firestore, (room) => {
        setParticipants(room.participants);
      });
    }
  }, []);

  const createRows = () => {
    return participants.map((participant) => {
      const duration = intervalToDuration({
        start: 0,
        end: participant.timeTaken,
      });
      return {
        id: participant.name,
        timeTaken: `${duration.hours ? `${duration.hours} hours ` : ''}${
          duration.minutes ? `${duration.minutes} mins ` : ''
        }${duration.seconds ? `${duration.seconds} secs` : ''}`,
        userName: participant.name,
        totalGuesses: participant.guesses,
        wordFound: participant.foundWord ? 'Yes' : 'No',
      };
    });
  };

  return (
    <Page className="justify-center">
      <Stack spacing={2}>
        <h1 className="text-3xl text-black text-center">Live Results</h1>
        <div className="w-full h-[75vh]">
          <DataGrid
            rows={createRows()}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
        <Button variant="contained" onClick={routeToCreateGame}>
          New Game
        </Button>
        <Button variant="contained" onClick={routeToLandingPage}>
          Main Menu
        </Button>
      </Stack>
    </Page>
  );
}

export default LiveResults;
