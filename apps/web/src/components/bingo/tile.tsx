"use client";

import { motion } from "motion/react";

import COLORS from "@repo/ui/constants/colors";

interface TileProps {
  isMarked?: boolean;
  value?: number | null;
  shouldDisableHover?: boolean;
  shouldDisableAnimation?: boolean;
  isFromExternal?: boolean;
}

export default function Tile({
  isMarked = false,
  value = null,
  shouldDisableHover = false,
  shouldDisableAnimation = false,
  isFromExternal,
}: TileProps) {
  const isHoverAllowed = !isMarked && !shouldDisableHover;

  const getAnimationProps = () => {
    if (shouldDisableAnimation) {
      return {};
    }

    return {
      backgroundColor: isMarked ? COLORS.Transparent : COLORS.DarkBackground,
      rotate: isMarked && isFromExternal ? [0, -3, 3, 0] : 0,
    };
  };

  return (
    <div
      className={`relative w-full h-full rounded-xl ${isMarked && "bg-radial from-primary to-transparent"}`}
      role="button"
      aria-pressed={isMarked}
      aria-label={value !== null ? `Tile with value ${value}` : "Empty tile"}
    >
      <motion.div
        className={`
          select-none rounded-xl w-full h-full flex items-center justify-center
          shadow-[-3px_3px_10px_0_black,3px_-3px_8px_0_var(--shadow-gray),inset_-3px_3px_3px_0_var(--shadow-gray),inset_3px_-3px_3px_0_black]
          ${
            isHoverAllowed &&
            "hover:shadow-[-3px_3px_10px_0_black,3px_-3px_8px_0_var(--primary),inset_-3px_3px_3px_0_var(--primary),inset_3px_-3px_3px_0_black]"
          }
          ${isHoverAllowed ? "hover:cursor-pointer" : "hover:cursor-default"}
          transition-shadow duration-300
          ${isMarked ? "bg-transparent" : "bg-background"}
      `}
        animate={getAnimationProps()}
        transition={{
          backgroundColor: { duration: 0.4, ease: "easeOut" },
          type: "spring",
          rotate: {
            duration: 0.4,
            times: [0, 0.3, 0.7, 1],
          },
        }}
      >
        <span className="text-xl [text-shadow:_0px_0px_2px_white]">
          {value}
        </span>
      </motion.div>
    </div>
  );
}
