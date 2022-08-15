import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore';
import { Participants, Room } from '@ewgg/shared/data-access';

export async function makeGuessForParticipantForRoom(
  db: Firestore,
  room: Room,
  participant: Participants,
  foundWord = false,
  timeTaken = 0
) {
  const roomRef = doc(db, 'rooms', room.roomId);

  const roomDoc = await getDoc(roomRef);

  if (roomDoc) {
    const roomDocData = roomDoc.data();
    if (roomDocData) {
      await updateDoc(roomRef, {
        participants: [
          ...roomDocData['participants'].map((p: Participants) =>
            p.name === participant.name
              ? { ...participant, foundWord, timeTaken }
              : p
          ),
        ],
      });
    }
  }
}
