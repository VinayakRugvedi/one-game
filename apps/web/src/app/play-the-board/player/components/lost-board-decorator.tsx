import { motion } from "motion/react";

import { ANIMATION_TIMINGS } from "../index";

export default function LostBoardDecorator() {
  return (
    <motion.div
      className="z-30 absolute w-[650px] h-[650px] rounded-full top-[-27%] left-[-27%] inset-shadow-[0_0_50px_140px_var(--background)]"
      initial={{ scale: 1, opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        opacity: {
          delay: ANIMATION_TIMINGS.LostBoardDecoratorDelay,
          duration: ANIMATION_TIMINGS.LostBoardDecoratorDelay,
        },
      }}
      aria-hidden="true"
    />
  );
}
