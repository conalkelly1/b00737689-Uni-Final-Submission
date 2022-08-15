import styled from '@emotion/styled';

export interface SharedUiTileProps {
  letter: string;
  wordLength: number;
  correct: { letter: boolean; position: boolean };
}

const StyledTile = styled.div((props: { width: number }) => ({
  width: props.width + 'vw',
  height: props.width + 'vw',
}));

export function Tile({ letter, wordLength, correct }: SharedUiTileProps) {
  const tileWidth = 65 / wordLength;
  const textSize = wordLength > 8 ? 'text-lg' : 'text-3xl';
  return (
    <StyledTile
      width={tileWidth}
      className={`mx-1 border-black p-2 grid place-content-center uppercase ${
        !correct
          ? 'bg-slate-800'
          : correct.position
          ? 'bg-green-500'
          : correct.letter
          ? 'bg-amber-500'
          : 'bg-slate-800'
      } text-white font-semibold ${textSize}`}
    >
      {letter}
    </StyledTile>
  );
}

export default Tile;
