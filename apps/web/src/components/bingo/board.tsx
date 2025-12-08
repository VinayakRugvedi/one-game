import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

import BINGO from "@repo/ui/constants/bingo";
import {
  PLAYER_STATUS,
  PLAYER_TYPE,
  type ValuesOrderFlow,
  type PlayerStatusValues,
  type SetsTrackerState,
  type PlayerTypeValues,
  type SetsTrackerKey,
} from "@/app/play-the-board/page";
import { generateRandomNumbers } from "@repo/ui/utils";
import Tile from "./tile";

export enum BOARD_STATE {
  Empty = "empty",
  Prepared = "prepared",
}
export type BoardStateValues = `${BOARD_STATE}`;

export interface ValueState {
  row: number;
  column: number;
  value: number;
  isMarked: boolean;
  isFromExternal: boolean;
}
export type ValuesState = Record<number, ValueState>;
export type ValuesMatrix = number[][];

interface BoardProps {
  setsTracker: SetsTrackerState;
  updateSetsTracker: (tracker: SetsTrackerState) => void;
  completedSetsCount: number;
  shouldAutofill: boolean;
  updatePlayerStatus: (status: PlayerStatusValues) => void;
  hasAgentWon: boolean;
  valuesOrderFlow: ValuesOrderFlow;
  updateValuesOrderFlow: (value: number, from: PlayerTypeValues) => void;
}

export default function Board({
  setsTracker,
  updateSetsTracker,
  completedSetsCount,
  shouldAutofill,
  updatePlayerStatus,
  valuesOrderFlow,
  updateValuesOrderFlow,
  hasAgentWon,
}: BoardProps) {
  const [boardState, setBoardState] = useState<BoardStateValues>(
    BOARD_STATE.Empty as "empty"
  );
  const [valuesMatrix, setValuesMatrix] = useState<ValuesMatrix>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [valuesState, setValuesState] = useState<ValuesState>(
    {} as ValuesState
  );

  const valueToAssign = useRef(1);
  const isThisBoardsTurn = valuesOrderFlow.whoIsNext === PLAYER_TYPE.Self;

  // Prepare valuesState only after the board has been populated with all values from 1 - 25
  useEffect(() => {
    if (boardState === BOARD_STATE.Empty) return;
    const initialValuesState: ValuesState = {};

    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 5; column++) {
        const value = valuesMatrix[row]?.[column];
        if (value !== undefined) {
          const valueState: ValueState = {
            row,
            column,
            value,
            isMarked: false,
            isFromExternal: false,
          };
          initialValuesState[value] = valueState;
        }
      }
    }

    setValuesState(initialValuesState);
    !shouldAutofill && updatePlayerStatus(PLAYER_STATUS.Ready);
  }, [boardState]);

  useEffect(() => {
    if (shouldAutofill !== true && boardState !== BOARD_STATE.Prepared) return;

    const randomOrderNumbers = generateRandomNumbers();
    const newValuesMatrix: ValuesMatrix = [];
    for (let row = 0; row < BINGO.Size; row++) {
      newValuesMatrix.push(randomOrderNumbers.slice(row * 5, (row + 1) * 5));
    }
    setValuesMatrix(newValuesMatrix);
    // Set board state as prepared after autofill animation
  }, [shouldAutofill]);

  useEffect(() => {
    if (!isThisBoardsTurn || valuesOrderFlow.values.length === 0) return;

    const lastMove = valuesOrderFlow.values[valuesOrderFlow.values.length - 1];
    const valueToMark = lastMove?.value;

    if (valueToMark === undefined) return;

    const valuesStateCopy = { ...valuesState };
    const valueState = { ...valuesStateCopy[valueToMark] } as ValueState;
    valueState.isMarked = true;
    valueState.isFromExternal = true;
    valuesStateCopy[valueToMark] = valueState;

    setValuesState(valuesStateCopy);
    checkForSetCompletion(
      valuesStateCopy,
      valuesStateCopy[valueToMark]!.row,
      valuesStateCopy[valueToMark]!.column
    );
  }, [valuesOrderFlow]);

  const checkForSetCompletion = (
    updatedValuesState: ValuesState,
    rowIndex: number,
    columnIndex: number
  ) => {
    const setsTrackerCopy = { ...setsTracker };

    // check for row set
    const rowValues = valuesMatrix[rowIndex] as number[];
    let isEntireRowMarked = true;
    for (const value of rowValues) {
      isEntireRowMarked =
        isEntireRowMarked && updatedValuesState[value]!.isMarked;
    }
    isEntireRowMarked &&
      (setsTrackerCopy[`row${rowIndex + 1}` as SetsTrackerKey] = true);

    // check for column set
    const columnValues = [
      valuesMatrix[0]![columnIndex],
      valuesMatrix[1]![columnIndex],
      valuesMatrix[2]![columnIndex],
      valuesMatrix[3]![columnIndex],
      valuesMatrix[4]![columnIndex],
    ] as number[];

    let isEntireColumnMarked = true;
    for (const value of columnValues) {
      isEntireColumnMarked =
        isEntireColumnMarked && updatedValuesState[value]!.isMarked;
    }
    isEntireColumnMarked &&
      (setsTrackerCopy[`column${columnIndex + 1}` as SetsTrackerKey] = true);

    // check for left diagonal
    if (rowIndex === columnIndex) {
      const leftDiagonalValues = [
        valuesMatrix[0]![0],
        valuesMatrix[1]![1],
        valuesMatrix[2]![2],
        valuesMatrix[3]![3],
        valuesMatrix[4]![4],
      ] as number[];

      let isEntireLeftDiagonalMarked = true;
      for (const value of leftDiagonalValues) {
        isEntireLeftDiagonalMarked =
          isEntireLeftDiagonalMarked && updatedValuesState[value]!.isMarked;
      }
      isEntireLeftDiagonalMarked && (setsTrackerCopy["leftDiagonal"] = true);
    }

    // check for right diagonal
    if (rowIndex + columnIndex === 4) {
      const rightDiagonalValues = [
        valuesMatrix[0]![4],
        valuesMatrix[1]![3],
        valuesMatrix[2]![2],
        valuesMatrix[3]![1],
        valuesMatrix[4]![0],
      ] as number[];

      let isEntireRightDiagonalMarked = true;
      for (const value of rightDiagonalValues) {
        isEntireRightDiagonalMarked =
          isEntireRightDiagonalMarked && updatedValuesState[value]!.isMarked;
      }
      isEntireRightDiagonalMarked && (setsTrackerCopy["rightDiagonal"] = true);
    }

    const newCompletedSetsCount: number = Object.values(setsTrackerCopy).reduce(
      (count: number, isComplete) => (isComplete ? ++count : count),
      0
    );

    updateSetsTracker(setsTrackerCopy);
    if (newCompletedSetsCount >= BINGO.WinSetsCount) {
      updatePlayerStatus(PLAYER_STATUS.Won);
    }
  };

  const updateTile = (value: number, rowIndex: number, columnIndex: number) => {
    if (value === 0 && boardState === BOARD_STATE.Empty) {
      // add value to the tile
      const valuesMatrixCopy = structuredClone(valuesMatrix);
      valuesMatrixCopy[rowIndex]![columnIndex] = valueToAssign.current;
      valueToAssign.current = valueToAssign.current + 1;
      setValuesMatrix(valuesMatrixCopy);
      valueToAssign.current === 26 &&
        setBoardState(BOARD_STATE.Prepared as "prepared");
      return;
    } else if (value !== 0 && boardState === BOARD_STATE.Empty) return;

    if (
      valuesState[value]?.isMarked ||
      !valuesState[value] ||
      !isThisBoardsTurn ||
      completedSetsCount >= BINGO.WinSetsCount ||
      hasAgentWon
    )
      return;

    const valuesStateCopy = { ...valuesState };
    const valueState = { ...valuesStateCopy[value] };
    valueState.isMarked = true;
    valuesStateCopy[value] = valueState as ValueState;

    setValuesState(valuesStateCopy);
    checkForSetCompletion(valuesStateCopy, rowIndex, columnIndex);
    updateValuesOrderFlow(value, PLAYER_TYPE.Self);
  };

  const handleAutofillComplete = () => {
    setBoardState(BOARD_STATE.Prepared as "prepared");
    updatePlayerStatus(PLAYER_STATUS.Ready);
  };

  const origin = [2, 2];
  const baseDelay = 0.5;
  const noise = 0.5;

  const getDistance = (row: number, col: number) => {
    if (!origin[0] || !origin[1]) return 0;
    return (
      Math.sqrt((row - origin[0]) ** 2 + (col - origin[1]) ** 2) /
      (10 * Math.sqrt(2))
    );
  };

  return (
    <div className="w-[420px] h-[420px] grid grid-rows-5 gap-3.5">
      {valuesMatrix.map((rowValues, rowIndex) => {
        return (
          <div className="grid gap-3.5 grid-cols-5" key={rowIndex}>
            {rowValues.map((value, columnIndex) => {
              const isOrigin = rowIndex === 2 && columnIndex === 2;
              const delay =
                getDistance(rowIndex, columnIndex) * baseDelay +
                Math.random() * noise;

              const isMarked = valuesState[value]?.isMarked;
              const isFromExternal = valuesState[value]?.isFromExternal;
              const shouldDisableHover =
                completedSetsCount >= BINGO.WinSetsCount ||
                (boardState === BOARD_STATE.Prepared && !isThisBoardsTurn) ||
                hasAgentWon ||
                (value !== 0 && boardState === BOARD_STATE.Empty);

              return (
                <motion.div
                  key={`${rowIndex}-${columnIndex}`}
                  initial={{
                    opacity: isOrigin ? 1 : 0,
                    scale: isOrigin ? 1 : 0.3,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.5,
                    delay: delay,
                  }}
                  onClick={() => updateTile(value, rowIndex, columnIndex)}
                >
                  <Tile
                    isMarked={isMarked}
                    isFromExternal={isFromExternal}
                    value={value === 0 ? null : value}
                    valueToAssign={valueToAssign.current}
                    isBeingAutofilled={shouldAutofill}
                    shouldDisableHover={shouldDisableHover}
                    onAutofillComplete={handleAutofillComplete}
                  />
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
