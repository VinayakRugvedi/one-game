import { motion } from "motion/react";

import {
  type SetsTrackerKey,
  type SetsTrackerState,
} from "@/app/play-the-board/page";
import COLORS from "@repo/ui/constants/colors";
import BINGO from "@repo/ui/constants/bingo";

interface SetsTrackerProps {
  setsTracker: SetsTrackerState;
}

export default function SetsTracker({ setsTracker }: SetsTrackerProps) {
  const size = BINGO.Size;

  const getDots = () => {
    const collection = [];

    for (let column = 1; column <= size; column++) {
      for (let row = 1; row <= size; row++) {
        const x = 50 + (column - 1) * 200;
        const y = 50 + (row - 1) * 200;
        collection.push(
          <circle
            key={`${row}-${column}`}
            cx={x}
            cy={y}
            r="50"
            fill={COLORS.White}
          />
        );
      }
    }

    return collection;
  };

  const getAnimatedDots = () => {
    const collection = [];

    const checkForDiagnols = (row: number, column: number) => {
      if (row === column && setsTracker.leftDiagonal) return COLORS.Primary;

      if (row + column === size + 1 && setsTracker.rightDiagonal)
        return COLORS.Primary;

      return null;
    };

    for (let column = 1; column <= size; column++) {
      for (let row = 1; row <= size; row++) {
        let fill =
          setsTracker[`row${row}` as SetsTrackerKey] ||
          setsTracker[`column${column}` as SetsTrackerKey]
            ? COLORS.Primary
            : COLORS.White;
        const diagonalFill = checkForDiagnols(row, column);
        fill = diagonalFill || fill;

        const x = 50 + (column - 1) * 200;
        const y = 50 + (row - 1) * 200;

        collection.push(
          <motion.circle
            key={`${row}-${column}`}
            layoutId={`dot-${row}-${column}`}
            cx={x}
            cy={y}
            r="50"
            initial={{ fill: COLORS.White }}
            animate={{
              fill,
            }}
            transition={{
              duration: 0.7,
              delay: (row + column) * 0.06,
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          />
        );
      }
    }

    return collection;
  };

  return (
    <div className="w-[100px] h-[100px] relative">
      <div className="absolute w-full top-0 left-0">
        <svg
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {getDots()}
        </svg>
      </div>

      <div className="absolute w-full top-0 left-0">
        <svg
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {getAnimatedDots()}
        </svg>
      </div>
    </div>
  );
}
