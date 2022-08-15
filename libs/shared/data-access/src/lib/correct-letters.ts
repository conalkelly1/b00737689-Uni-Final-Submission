export interface CorrectLetter {
  letter: boolean;
  position: boolean;
}

export interface CorrectLetters {
  [key: number]: CorrectLetter;
}
