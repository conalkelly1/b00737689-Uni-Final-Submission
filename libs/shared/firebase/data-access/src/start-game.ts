import { doc, Firestore, updateDoc } from 'firebase/firestore';
import { GAME_STATUS } from '@ewgg/shared/data-access';

export async function startGameForRoom(roomId: string, db: Firestore) {
  try {
    await updateDoc(doc(db, 'rooms', roomId), {
      gameStatus: GAME_STATUS.STARTED,
    });
  } catch (e) {
    console.error('Could not start game for room', e);
  }
}
