import { motion } from "motion/react";

import BINGO from "@repo/ui/constants/bingo";

interface SetsCountProps {
  completedSetsCount: number;
}

export default function SetsCount({ completedSetsCount }: SetsCountProps) {
  return (
    <div
      className="flex items-center justify-center gap-3"
      role="status"
      aria-label={`Completed sets: ${completedSetsCount} out of ${BINGO.WinSetsCount}`}
    >
      {[1, 2, 3, 4, 5].map((count) => (
        <motion.div
          key={count}
          className="relative w-[30px] h-[30px] rounded-full shadow-[-2px_2px_4px_0_black,2px_-2px_4px_0_var(--shadow-gray),inset_-2px_2px_2px_0_var(--shadow-gray),inset_2px_-2px_3px_0_black]"
          animate={{
            filter:
              count <= completedSetsCount
                ? [
                    "drop-shadow(0 0 0px var(--background))",
                    "drop-shadow(0 0 20px var(--primary))",
                    "drop-shadow(0 0 0px var(--background))",
                  ]
                : "drop-shadow(0 0 0px var(--background))",
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            times: [0, 0.6, 1],
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full shadow-[-2px_2px_2px_0_black,inset_2px_-2px_3px_0_black] bg-radial from-primary to-transparent"
            initial={{ scale: 0 }}
            animate={{
              scale: count <= completedSetsCount ? [0, 1.05, 1] : 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              times: [0, 0.6, 1],
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
