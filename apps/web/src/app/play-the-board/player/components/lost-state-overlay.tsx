import Link from "next/link";
import { motion } from "motion/react";
import { DotIcon } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { ANIMATION_TIMINGS } from "../index";

export default function LostStateOverlay() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-background/90 flex items-center justify-center p-7"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
      transition={{
        delay: ANIMATION_TIMINGS.LostStateOverlayDelay,
        duration: ANIMATION_TIMINGS.LostStateOverlayDuration,
      }}
    >
      <motion.div
        className="h-full flex flex-col items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.8 * ANIMATION_TIMINGS.LostStateOverlayDelay,
          duration: 1,
        }}
      >
        <div>
          <div className="flex items-center justify-center">
            <p className="font-medium tracking-widest flex items-center justify-center">
              Uh-oh
            </p>
            <DotIcon aria-hidden="true" />
            Not this time
          </div>
          <p className="flex items-center justify-center">
            Your opponent called Bingo first
            <DotIcon aria-hidden="true" />
            <span className="text-primary font-medium tracking-widest">
              DEFEATED
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
