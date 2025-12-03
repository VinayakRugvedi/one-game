import { motion } from "motion/react";

import { ANIMATION_TIMINGS } from "../index";

export default function WinBoardDecorator() {
  return (
    <motion.div
      className="z-30 absolute w-[650px] h-[650px] rounded-full top-[-27%] left-[-27%] inset-shadow-[0_0_50px_140px_var(--background)]"
      initial={{ scale: 1, opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        opacity: {
          delay: ANIMATION_TIMINGS.WinBoardDecoratorDelay,
          duration: 0.5,
        },
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[650px] h-[650px] blur-[60px] rounded-[50%] bg-[radial-gradient(farthest-corner_at_60px_60px_in_hsl_longer_hue,transparent_58%,var(--primary))]"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: {
            delay: ANIMATION_TIMINGS.WinBoardDecoratorDelay,
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
    </motion.div>
  );
}
