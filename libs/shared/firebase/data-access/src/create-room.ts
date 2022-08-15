import { addDoc, collection, doc, Firestore, getDoc } from 'firebase/firestore';
import { GAME_STATUS, Room } from '@ewgg/shared/data-access';

function generateRoomCode() {
  const LETTERS: Record<number, string> = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
    11: 'K',
    12: 'L',
    13: 'M',
    14: 'N',
    15: 'O',
    16: 'P',
    17: 'Q',
    18: 'R',
    19: 'S',
    20: 'T',
    21: 'U',
    22: 'V',
    23: 'W',
    24: 'X',
    25: 'Y',
    26: 'Z',
  };

  function selectLetter() {
    const num = Math.ceil(Math.random() * 26);
    return LETTERS[num];
  }

  return `${selectLetter()}${selectLetter()}${selectLetter()}${selectLetter()}`;
}

export async function createRoom(
  wordToGuess: string,
  guessLimit: number,
  db: Firestore
): Promise<Room | undefined> {
  try {
    const roomRef = await addDoc(collection(db, 'rooms'), {
      roomCode: generateRoomCode(),
      wordToGuess: wordToGuess.toUpperCase(),
      guessLimit,
      participants: [],
      gameStatus: GAME_STATUS.WAITING,
    });

    const roomDocRef = doc(db, 'rooms', roomRef.id);
    const roomSnapshot = await getDoc(roomDocRef);

    const roomData = roomSnapshot.data();
    if (roomData) {
      return {
        roomId: roomSnapshot.id,
        roomCode: roomData['roomCode'],
        wordToGuess,
        guessLimit,
        participants: [],
        gameStatus: GAME_STATUS.WAITING,
      };
    } else {
      throw new Error('Room was not created correctly');
    }
  } catch (e) {
    console.error('Could not create room', e);
  }

  return undefined;
}
