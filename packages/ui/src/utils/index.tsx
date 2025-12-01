import BINGO from "../constants/bingo";

export function generateRandomNumbers(size = BINGO.TilesCount): number[] {
  // Create array [1, 2, 3, ..., 25]
  const numbers = Array.from({ length: size }, (_, i) => i + 1);

  // Fisher-Yates shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j] as number, numbers[i] as number];
  }

  return numbers;
}
