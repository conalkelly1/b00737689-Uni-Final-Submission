export const GAME_STATUS = {
  WAITING: 'waiting',
  STARTED: 'started',
  COMPLETED: 'completed',
};

export interface Participants {
  name: string;
  guesses: number;
  foundWord: boolean;
  timeTaken: number;
}

export interface Room {
  roomId: string;
  roomCode: string;
  wordToGuess: string;
  guessLimit: number;
  participants: Participants[];
  gameStatus: string;
}
