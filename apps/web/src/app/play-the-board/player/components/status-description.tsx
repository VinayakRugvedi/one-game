import { motion, AnimatePresence } from "motion/react";
import { DotIcon, CirclePlusIcon } from "lucide-react";

import BINGO from "@repo/ui/constants/bingo";
import { Button } from "@repo/ui/components/button";
import {
  PLAYER_STATUS,
  PLAYER_TYPE,
  type PlayersState,
  type ValuesOrderFlow,
} from "@/app/play-the-board/page";

interface StatusDescriptionProps {
  playersState: PlayersState;
  completedSetsCount: number;
  shouldAutofill: boolean;
  initiateAutofill: () => void;
  hasAgentWon: boolean;
  valuesOrderFlow: ValuesOrderFlow;
}

export default function StatusDescription({
  playersState,
  shouldAutofill,
  initiateAutofill,
  completedSetsCount,
  hasAgentWon,
  valuesOrderFlow,
}: StatusDescriptionProps) {
  const isPlayerPreparing = playersState.selfPlayer === PLAYER_STATUS.Preparing;

  return (
    <AnimatePresence mode="wait">
      {isPlayerPreparing && !shouldAutofill ? (
        <motion.div
          key="preparing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-right">
            Click on tiles to assign no&apos;s
            <br /> from 1 - 25 or&nbsp;
            <Button
              variant="outline"
              className="rounded-full p-0 m-0 h-6"
              size="sm"
              onClick={initiateAutofill}
              aria-label="Autofill board with numbers 1 to 25 randomly"
            >
              Autofill{" "}
              <CirclePlusIcon className="underline" aria-hidden="true" />
            </Button>
          </p>
        </motion.div>
      ) : null}

      {completedSetsCount < BINGO.WinSetsCount &&
      !hasAgentWon &&
      playersState.selfPlayer === PLAYER_STATUS.Ready ? (
        <motion.div
          key="turn-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="status"
          aria-live="polite"
        >
          <motion.div
            className="flex items-center justify-center"
            initial={{
              opacity: 1,
              x: valuesOrderFlow.whoIsNext === PLAYER_TYPE.Self ? 75 : 0,
            }}
            animate={{
              opacity: 1,
              x: valuesOrderFlow.whoIsNext === PLAYER_TYPE.Self ? 0 : 75,
            }}
            exit={{
              opacity: 1,
              x: valuesOrderFlow.whoIsNext === PLAYER_TYPE.Self ? 0 : 75,
            }}
            transition={{ duration: 0.3 }}
          >
            {valuesOrderFlow.whoIsNext === PLAYER_TYPE.Self ? (
              <>
                <DotIcon aria-hidden="true" />
                <DotIcon aria-hidden="true" />
                <DotIcon aria-hidden="true" />
              </>
            ) : (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <DotIcon aria-hidden="true" />
                  </motion.div>
                ))}
              </>
            )}

            <p className="text-primary">Your Turn</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
