import { motion, AnimatePresence } from "motion/react";

import BINGO from "@repo/ui/constants/bingo";
import { ANIMATION_TIMINGS } from "../index";

interface DefaultBoardDecoratorProps {
  completedSetsCount: number;
  hasAgentWon: boolean;
}

export default function DefaultBoardDecorator({
  completedSetsCount,
  hasAgentWon,
}: DefaultBoardDecoratorProps) {
  return (
    <AnimatePresence>
      {completedSetsCount < BINGO.WinSetsCount && !hasAgentWon && (
        <motion.div
          className="absolute w-[650px] h-[650px] rounded-full top-[-27%] left-[-27%] z-10"
          initial={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{
            scale: 0,
            rotate: -180,
            opacity: 0,
          }}
          transition={{
            delay: ANIMATION_TIMINGS.DefaultBoardDecoratorDelay,
            duration: ANIMATION_TIMINGS.DefaultBoardDecoratorDuration,
          }}
          aria-hidden="true"
        >
          <div className="absolute w-[750px] h-[750px] blur-[70px] rounded-[50%] bg-[radial-gradient(farthest-corner_at_60px_60px,transparent_65%,var(--primary))]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
