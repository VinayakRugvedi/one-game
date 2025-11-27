"use client"

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import DumbBoard from "@/components/bingo/dumb-board";

export default function LetsBingo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const filterBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(30px)"]
  );

  return (
    <section className="flex justify-between items-center mt-30 flex-col pb-24 mb-30">
      <div className="relative mt-10" ref={ref}>
        <DumbBoard canShowSelected={false} />
        <div className="absolute w-[650px] h-[650px] rounded-full top-[-27%] left-[-27%] inset-shadow-[0_0_50px_150px_var(--background)]"></div>
        <div className="absolute text-9xl text-primary top-[20%] left-[60%]">
          <h3 className="">Let&apos;s</h3>
          <h3 className="font-medium">
            <motion.span style={{ filter: filterBlur }}>BIN</motion.span>
            GO!
          </h3>
        </div>
      </div>
    </section>
  );
}
