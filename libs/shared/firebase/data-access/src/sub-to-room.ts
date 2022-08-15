import { doc, Firestore, onSnapshot } from 'firebase/firestore';
import { Room } from '@ewgg/shared/data-access';

export function subscribeToRoomChanges(
  roomId: string,
  db: Firestore,
  action: (room: Room) => any
) {
  const unsub = onSnapshot(doc(db, 'rooms', roomId), (doc) => {
    const docData = doc.data();
    if (docData) {
      const room = {
        roomId: doc.id,
        roomCode: docData['roomCode'],
        wordToGuess: docData['wordToGuess'],
        guessLimit: docData['guessLimit'],
        participants: docData['participants'],
        gameStatus: docData['gameStatus'],
      };

      action(room);
    }
  });

  return unsub;
}
