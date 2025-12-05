import { useState, useEffect, useRef } from "react";

import {
  BOARD_STATE,
  type BoardStateValues,
  type ValueState,
  type ValuesState,
  type ValuesMatrix,
} from "@/components/bingo/board";
import {
  PLAYER_TYPE,
  PLAYER_STATUS,
  type SetsTrackerState,
  type PlayersState,
  type PlayerStatusValues,
  type PlayerTypeValues,
  type ValuesOrderFlow,
  type SetsTrackerKey,
} from "./page";
import BINGO from "@repo/ui/constants/bingo";
import { generateRandomNumbers } from "@repo/ui/utils";

interface AgentProps {
  setsTracker: SetsTrackerState;
  updateSetsTracker: (tracker: SetsTrackerState) => void;
  playersState: PlayersState;
  updatePlayerStatus: (newStatus: PlayerStatusValues) => void;
  valuesOrderFlow: ValuesOrderFlow;
  updateValuesOrderFlow: (value: number, from: PlayerTypeValues) => void;
}

export default function Agent({
  setsTracker,
  updateSetsTracker,
  updatePlayerStatus,
  valuesOrderFlow,
  updateValuesOrderFlow,
  playersState,
}: AgentProps) {
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
  const [valuesState, setValuesState] = useState<ValuesState>({});
  const orderOfValuesToMark = useRef<number[]>(generateRandomNumbers());
  const orderOfValuesToMarkIndexTracker = useRef(0);

  const isThisBoardsTurn = valuesOrderFlow.whoIsNext === PLAYER_TYPE.Agent;
  const hasPlayerWon = playersState.selfPlayer === PLAYER_STATUS.Won;

  useEffect(() => {
    const randomOrderNumbers = generateRandomNumbers();
    const newValuesMatrix: ValuesMatrix = [];
    for (let row = 0; row < BINGO.Size; row++) {
      newValuesMatrix.push(randomOrderNumbers.slice(row * 5, (row + 1) * 5));
    }
    setValuesMatrix(newValuesMatrix);
    setBoardState(BOARD_STATE.Prepared as "prepared");
  }, []);

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
            value: value,
            isMarked: false,
            isFromExternal: false,
          };
          initialValuesState[value] = valueState;
        }
      }
    }

    setValuesState(initialValuesState);
    updatePlayerStatus(PLAYER_STATUS.Ready);
  }, [boardState]);

  useEffect(() => {
    // user always starts first
    if (!isThisBoardsTurn) return;

    const lastMove = valuesOrderFlow.values[valuesOrderFlow.values.length - 1];
    const valueToMark = lastMove?.value;

    if (valueToMark === undefined) return;

    const valuesStateCopy = { ...valuesState };
    const valueState = { ...valuesStateCopy[valueToMark] } as ValueState;
    valueState.isMarked = true;
    valueState.isFromExternal = true;
    valuesStateCopy[valueToMark] = valueState;

    setValuesState(valuesStateCopy);
    !hasPlayerWon &&
      checkForSetCompletion(
        valuesStateCopy,
        valuesStateCopy[valueToMark]!.row,
        valuesStateCopy[valueToMark]!.column
      );
  }, [valuesOrderFlow]);

  // mark a new value from agent
  useEffect(() => {
    if (
      !isThisBoardsTurn ||
      boardState !== BOARD_STATE.Prepared ||
      hasPlayerWon
    )
      return;

    let valueToMark: number | undefined = undefined;
    while (
      valuesState[
        orderOfValuesToMark.current[
          orderOfValuesToMarkIndexTracker.current as number
        ] as number
      ]!.isMarked
    ) {
      orderOfValuesToMarkIndexTracker.current += 1;
    }

    valueToMark = orderOfValuesToMark.current[
      orderOfValuesToMarkIndexTracker.current
    ] as number;
    orderOfValuesToMarkIndexTracker.current += 1;

    const valuesStateCopy = { ...valuesState };
    const newValueState = { ...valuesStateCopy[valueToMark] } as ValueState;
    newValueState.isMarked = true;
    valuesStateCopy[valueToMark] = newValueState;

    setTimeout(() => {
      setValuesState(valuesStateCopy);
      checkForSetCompletion(
        valuesStateCopy,
        newValueState.row,
        newValueState.column
      );
      updateValuesOrderFlow(valueToMark as number, PLAYER_TYPE.Agent);
    }, 800);
  }, [valuesState]);

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

    // check for left diagonal
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

    const completedSetsCount: number = Object.values(setsTrackerCopy).reduce(
      (count: number, isComplete) => (isComplete ? ++count : count),
      0
    );

    updateSetsTracker(setsTrackerCopy);
    if (completedSetsCount >= BINGO.WinSetsCount) {
      updatePlayerStatus(PLAYER_STATUS.Won);
    }
  };

  return <></>;
}
