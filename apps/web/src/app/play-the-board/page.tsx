"use client";

import { useState } from "react";

import Agent from "./agent";
import Player from "./player";

export enum PLAYER_TYPE {
  Self = "self",
  Agent = "agent",
}
export type PlayerTypeValues = `${PLAYER_TYPE}`;

export enum PLAYER_STATUS {
  Preparing = "preparing",
  Ready = "ready",
  Won = "won",
  Lost = "lost",
}
export type PlayerStatusValues = `${PLAYER_STATUS}`;

export type SetsTrackerKey =
  | "row1"
  | "row2"
  | "row3"
  | "row4"
  | "row5"
  | "column1"
  | "column2"
  | "column3"
  | "column4"
  | "column5"
  | "leftDiagonal"
  | "rightDiagonal";

export type SetsTrackerState = Record<SetsTrackerKey, boolean>;

export interface PlayersState {
  selfPlayer: PlayerStatusValues;
  agentPlayer: PlayerStatusValues;
}

interface ValueMove {
  value: number;
  from: PlayerTypeValues;
}

export interface ValuesOrderFlow {
  whoIsNext: PlayerTypeValues;
  values: ValueMove[];
}

const INITIAL_SETS_TRACKER: SetsTrackerState = {
  row1: false,
  row2: false,
  row3: false,
  row4: false,
  row5: false,
  column1: false,
  column2: false,
  column3: false,
  column4: false,
  column5: false,
  leftDiagonal: false,
  rightDiagonal: false,
};

export default function Page() {
  const [setsTracker, setSetsTracker] =
    useState<Record<SetsTrackerKey, boolean>>(INITIAL_SETS_TRACKER);
  const [agentSetsTracker, setAgentSetsTracker] =
    useState<Record<SetsTrackerKey, boolean>>(INITIAL_SETS_TRACKER);
  const [playersState, setPlayersState] = useState<PlayersState>({
    selfPlayer: PLAYER_STATUS.Preparing,
    agentPlayer: PLAYER_STATUS.Preparing,
  });
  const [valuesOrderFlow, setValuesOrderFlow] = useState<ValuesOrderFlow>({
    whoIsNext: PLAYER_TYPE.Self,
    values: [],
  });

  const updateSetsTracker = (refreshedSetsTracker: SetsTrackerState) => {
    setSetsTracker(refreshedSetsTracker);
  };

  const updateAgentSetsTracker = (refreshedSetsTracker: SetsTrackerState) => {
    setAgentSetsTracker(refreshedSetsTracker);
  };

  const updatePlayerStatus = (
    playerType: PlayerTypeValues,
    newStatus: PlayerStatusValues
  ) => {
    setPlayersState((prev) => ({
      ...prev,
      [`${playerType}Player`]: newStatus,
    }));
  };

  const updateValuesOrderFlow = (value: number, from: PlayerTypeValues) => {
    setValuesOrderFlow((prev) => ({
      whoIsNext:
        from === PLAYER_TYPE.Self ? PLAYER_TYPE.Agent : PLAYER_TYPE.Self,
      values: [...prev.values, { value, from }],
    }));
  };

  return (
    <main>
      <Player
        setsTracker={setsTracker}
        updateSetsTracker={updateSetsTracker}
        playersState={playersState}
        updatePlayerStatus={(newStatus: PlayerStatusValues) =>
          updatePlayerStatus("self", newStatus)
        }
        valuesOrderFlow={valuesOrderFlow}
        updateValuesOrderFlow={updateValuesOrderFlow}
      />

      <Agent
        setsTracker={agentSetsTracker}
        updateSetsTracker={updateAgentSetsTracker}
        updatePlayerStatus={(newStatus: PlayerStatusValues) =>
          updatePlayerStatus("agent", newStatus)
        }
        valuesOrderFlow={valuesOrderFlow}
        updateValuesOrderFlow={updateValuesOrderFlow}
        playersState={playersState}
      />
    </main>
  );
}
