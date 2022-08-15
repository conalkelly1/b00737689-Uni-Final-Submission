import {
  arrayUnion,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Participants, Room } from '@ewgg/shared/data-access';

const PRENAMES = [
  'WHITE',
  'BLACK',
  'RED',
  'BLUE',
  'PURPLE',
  'YELLOW',
  'ORANGE',
  'GREEN',
  'BROWN',
  'CYAN',
  'MAGENTA',
  'GREY',
];
const NAMES = [
  'CAT',
  'DOG',
  'BEAR',
  'BIRD',
  'WHALE',
  'TIGER',
  'LION',
  'KANGAROO',
  'EAGLE',
  'SNAKE',
  'HAMSTER',
  'RABBIT',
];

async function findRoomIdByCode(roomCode: string, db: Firestore) {
  const roomsRef = collection(db, 'rooms');
  const q = query(roomsRef, where('roomCode', '==', roomCode));
  const querySnapshot = await getDocs(q);
  const roomData: Promise<Room> = new Promise((res, rej) =>
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      res({
        roomId: doc.id,
        roomCode: docData['roomCode'],
        wordToGuess: docData['wordToGuess'],
        guessLimit: docData['guessLimit'],
        participants: docData['participants'],
        gameStatus: docData['gameStatus'],
      });
    })
  );

  return roomData;
}

export async function joinRoom(roomCode: string, db: Firestore) {
  const name = `${PRENAMES[Math.floor(Math.random() * PRENAMES.length)]} ${
    NAMES[Math.floor(Math.random() * NAMES.length)]
  }`;
  const roomData = await findRoomIdByCode(roomCode, db);
  try {
    const participant: Participants = {
      name,
      guesses: 0,
      timeTaken: 0,
      foundWord: false,
    };
    await updateDoc(doc(db, 'rooms', roomData.roomId), {
      participants: arrayUnion(participant),
    });
  } catch (e) {
    console.error('Could not join room', e);
  }

  return { room: roomData, name };
}
