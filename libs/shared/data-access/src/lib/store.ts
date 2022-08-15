import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from './user';
import { GAME_STATUS, Participants, Room } from './room';

interface GameState {
  user: { id: string } | null;
  setUser: (user: User | null) => void;
  activeRoom: Room | null;
  setActiveRoom: (room: Room) => void;
  addParticipant: (name: string) => void;
  name: string;
  setName: (name: string) => void;
  participant: Participants | null;
  setParticipant: (participant: Participants) => void;
  setGameStarted: () => void;
}

export const useStore = create<GameState>()(
  devtools(
    persist((set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      activeRoom: null,
      setActiveRoom: (room) => set(() => ({ activeRoom: room })),
      addParticipant: (name) =>
        set(({ activeRoom }) => ({
          activeRoom: {
            ...(activeRoom ?? {
              roomId: '',
              roomCode: '',
              wordToGuess: '',
              guessLimit: 5,
              gameStatus: GAME_STATUS.WAITING,
            }),
            participants: [
              ...(activeRoom?.participants ?? []),
              { name, foundWord: false, guesses: 0, timeTaken: 0 },
            ],
          },
        })),
      name: '',
      setName: (name) => set(() => ({ name })),
      setGameStarted: () =>
        set(({ activeRoom }) => ({
          activeRoom: {
            ...(activeRoom ?? {
              roomId: '',
              roomCode: '',
              wordToGuess: '',
              guessLimit: 5,
              participants: [],
              gameStatus: GAME_STATUS.WAITING,
            }),
            gameStatus: GAME_STATUS.STARTED,
          },
        })),
      participant: null,
      setParticipant: (participant) => set(() => ({ participant })),
    }))
  )
);
