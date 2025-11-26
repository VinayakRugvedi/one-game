"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

import DumbBoard from "@/components/bingo/dumb-board";
import { Button } from "@repo/ui/components/button";

export default function Hero() {
  return (
    <section>
      <div className="flex justify-between items-center p-6 flex-col gap-3">
        <div className="relative mt-6">
          <DumbBoard />
          <div className="absolute w-[650px] h-[650px] rounded-full top-[-27%] left-[-27%] inset-shadow-[0_0_50px_150px_var(--background)] before:absolute before:w-[650px] before:h-[650px] before:blur-[70px] before:rounded-[50%] before:bg-[radial-gradient(farthest-corner_at_60px_60px_in_hsl_longer_hue,transparent_50%,var(--primary))]"></div>
        </div>
      </div>

      <div className="flex justify-between items-start mt-8 flex-col gap-1">
        <h3 className="text-7xl">Introducing</h3>
        <h3 className="text-9xl font-medium flex">
          <AnimatePresence>
            {"B I N G O".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -21 }}
                animate={{ opacity: 1, x: 0 }}
                exit="hidden"
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {char === " " ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </AnimatePresence>
        </h3>

        <div className="flex justify-center items center gap-3">
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="#how-to-play">How to play?</Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link href="/play-the-board">Play the board</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
