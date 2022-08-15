import Tile from '../tile';

export interface TileRowProps {
  word: string;
  correctLetters: { [key: number]: { letter: boolean; position: boolean } };
}

export function TileRow({ word, correctLetters }: TileRowProps) {
  const wordLength = word.length;

  return (
    <div className="flex flex-row justify-center">
      {word.split('').map((letter, i) => (
        <Tile
          key={i}
          wordLength={wordLength}
          letter={letter}
          correct={correctLetters[i]}
        />
      ))}
    </div>
  );
}

export default TileRow;
