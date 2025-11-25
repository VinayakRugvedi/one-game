import Tile from "./tile";

const VALUES_MATRIX: number[][] = [
  [23, 1, 22, 4, 10],
  [11, 17, 12, 20, 2],
  [6, 21, 5, 8, 15],
  [14, 16, 25, 9, 24],
  [19, 18, 3, 7, 13],
];

interface DumbBoardProps {
  canShowSelected?: boolean;
}

export default function DumbBoard({ canShowSelected = true }: DumbBoardProps) {
  const selectedValues: Record<number, boolean> = {
    1: true,
    12: true,
    5: true,
    20: true,
    16: true,
    24: true,
    18: true,
  };

  return (
    <div className="w-[420px] h-[420px] grid grid-rows-5 gap-3.5 z-20">
      {VALUES_MATRIX.map((rowValues, rowIndex) => {
        return (
          <div className="grid gap-3.5 grid-cols-5" key={rowIndex}>
            {rowValues.map((value, columnIndex) => {
              return (
                <Tile
                  key={value}
                  isMarked={
                    canShowSelected ? selectedValues[value] || false : false
                  }
                  value={value}
                  shouldDisableHover={true}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
