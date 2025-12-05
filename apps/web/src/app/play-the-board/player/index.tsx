import { useState } from "react";

import SetsTracker from "@/components/bingo/sets-tracker";
import Board from "@/components/bingo/board";
import BINGO from "@repo/ui/constants/bingo";
import SetsCount from "@/components/bingo/sets-count";

import {
  PLAYER_STATUS,
  type PlayerTypeValues,
  type PlayerStatusValues,
  PlayersState,
  type SetsTrackerState,
  type ValuesOrderFlow,
} from "../page";
import WinStateOverlay from "./components/win-state-overlay";
import LostStateOverlay from "./components/lost-state-overlay";
import DefaultBoardDecorator from "./components/default-board-decorator";
import StatusDescription from "./components/status-description";
import WinBoardDecorator from "./components/win-board-decorator";
import LostBoardDecorator from "./components/lost-board-decorator";

interface PlayerProps {
  setsTracker: SetsTrackerState;
  updateSetsTracker: (tracker: SetsTrackerState) => void;
  playersState: PlayersState;
  updatePlayerStatus: (newStatus: PlayerStatusValues) => void;
  valuesOrderFlow: ValuesOrderFlow;
  updateValuesOrderFlow: (value: number, from: PlayerTypeValues) => void;
}

export const ANIMATION_TIMINGS = {
  WinStateOverlayDelay: 0.7,
  WinStateOverlayDuration: 0.6,
  LostStateOverlayDelay: 0.7,
  LostStateOverlayDuration: 0.6,
  DefaultBoardDecoratorDelay: 0.5,
  DefaultBoardDecoratorDuration: 0.7,
  WinBoardDecoratorDelay: 0.8,
  LostBoardDecoratorDelay: 0.8,
  LostBoardDecoratorDuration: 0.6,
} as const;

export default function Player({
  setsTracker,
  updateSetsTracker,
  playersState,
  updatePlayerStatus,
  valuesOrderFlow,
  updateValuesOrderFlow,
}: PlayerProps) {
  const [shouldAutofill, setShouldAutofill] = useState(false);

  const completedSetsCount: number = Object.values(setsTracker).reduce(
    (count: number, isComplete) => (isComplete ? ++count : count),
    0
  );

  const hasAgentWon = playersState.agentPlayer === PLAYER_STATUS.Won;

  const initiateAutofill = () => {
    if (!shouldAutofill) setShouldAutofill(true);
  };

  return (
    <div className="flex justify-between items-center p-6 flex-col gap-3">
      <div className="relative p-8">
        <div className="flex items-center justify-between gap-70 h-[101px] relative">
          <div className="flex gap-6">
            <div className="self-end">
              <p className="text-primary text-right font-medium tracking-widest">
                BINGO
              </p>
              <p className="text-right">Sets Tracker</p>
            </div>

            <SetsTracker setsTracker={setsTracker} />
          </div>

          <div className="flex flex-col items-end justify-between self-stretch">
            <SetsCount completedSetsCount={completedSetsCount} />

            <div className="overflow-hidden">
              <StatusDescription
                playersState={playersState}
                shouldAutofill={shouldAutofill}
                initiateAutofill={initiateAutofill}
                completedSetsCount={completedSetsCount}
                hasAgentWon={hasAgentWon}
                valuesOrderFlow={valuesOrderFlow}
              />
            </div>
          </div>
        </div>

        {completedSetsCount >= BINGO.WinSetsCount && !hasAgentWon ? (
          <WinStateOverlay />
        ) : null}

        {hasAgentWon ? <LostStateOverlay /> : null}
      </div>

      <div className="relative mt-20 flex items-center justify-center">
        <DefaultBoardDecorator
          completedSetsCount={completedSetsCount}
          hasAgentWon={hasAgentWon}
        />

        <div className="z-20">
          <Board
            setsTracker={setsTracker}
            updateSetsTracker={updateSetsTracker}
            completedSetsCount={completedSetsCount}
            shouldAutofill={shouldAutofill}
            updatePlayerStatus={updatePlayerStatus}
            hasAgentWon={hasAgentWon}
            valuesOrderFlow={valuesOrderFlow}
            updateValuesOrderFlow={updateValuesOrderFlow}
          />
        </div>

        {completedSetsCount >= BINGO.WinSetsCount && !hasAgentWon && (
          <WinBoardDecorator />
        )}

        {hasAgentWon && <LostBoardDecorator />}
      </div>
    </div>
  );
}
