import Link from "next/link";
import { motion } from "motion/react";
import { DotIcon } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { ANIMATION_TIMINGS } from "../index";

export default function WinStateOverlay() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-background/90 flex items-center justify-center p-7"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
      transition={{
        delay: ANIMATION_TIMINGS.WinStateOverlayDelay,
        duration: ANIMATION_TIMINGS.WinStateOverlayDuration,
      }}
    >
      <motion.div
        className="h-full flex flex-col items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.8 * ANIMATION_TIMINGS.WinStateOverlayDelay,
          duration: 1,
        }}
      >
        <div>
          <div className="flex items-center justify-center">
            <h3 className="font-medium flex items-center justify-center">
              {["B", "I", "N", "G", "O"].map((char, index) => (
                <motion.span
                  key={`${char}`}
                  className="text-3xl"
                  initial={{ color: "var(--chart-2)" }}
                  animate={{
                    color: "var(--primary)",
                  }}
                  transition={{
                    repeat: Infinity,
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                >
                  {char}&nbsp;
                </motion.span>
              ))}
            </h3>
          </div>
          <p className="flex items-center justify-center">
            Congratulations, you owned the board
            <DotIcon />
            <span className="text-primary font-medium tracking-widest">
              VICTORY
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" className="rounded-full" size="sm">
            <Link href="/">Go home</Link>
          </Button>
          <Button
            className="rounded-full"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Play again
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
