"use client";

import { motion } from "motion/react";

import COLORS from "@repo/ui/constants/colors";

interface TileProps {
  isMarked?: boolean;
  value?: number | null;
  valueToAssign?: number | null;
  isBeingAutofilled?: boolean;
  onAutofillComplete?: Function;
  shouldDisableHover?: boolean;
  shouldDisableAnimation?: boolean;
  isFromExternal?: boolean;
}

export default function Tile({
  isMarked = false,
  value = null,
  valueToAssign = null,
  isBeingAutofilled = false,
  onAutofillComplete,
  shouldDisableHover = false,
  shouldDisableAnimation = false,
  isFromExternal,
}: TileProps) {
  const isHoverAllowed = !isMarked && !shouldDisableHover;
  const isValueAvailable = value !== null;

  const getAnimationProps = () => {
    if (shouldDisableAnimation) {
      return {};
    }

    return {
      backgroundColor: isMarked ? COLORS.Transparent : COLORS.DarkBackground,
      rotate: isMarked && isFromExternal ? [0, -3, 3, -3, 3, 0] : 0,
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
          select-none group rounded-xl w-full h-full flex items-center justify-center
          shadow-[-3px_3px_10px_0_black,3px_-3px_8px_0_var(--shadow-gray),inset_-3px_3px_3px_0_var(--shadow-gray),inset_3px_-3px_3px_0_black]
          ${
            isHoverAllowed &&
            isValueAvailable &&
            "hover:shadow-[-3px_3px_10px_0_black,3px_-3px_8px_0_var(--primary),inset_-3px_3px_3px_0_var(--primary),inset_3px_-3px_3px_0_black]"
          }
          ${
            isHoverAllowed &&
            !isValueAvailable &&
            "hover:shadow-[-3px_3px_10px_0_black,3px_-3px_8px_0_var(--color-blue-900),inset_-3px_3px_3px_0_var(--color-blue-900),inset_3px_-3px_3px_0_black]"
          }
          ${isHoverAllowed ? "hover:cursor-pointer" : "hover:cursor-default"}
          ${isMarked ? "bg-transparent" : "bg-background"}
          transition-shadow duration-300
      `}
        animate={getAnimationProps()}
        transition={{
          backgroundColor: { duration: 0.4, ease: "easeOut" },
          type: "spring",
          rotate: {
            duration: 0.6,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
        }}
      >
        {isValueAvailable ? (
          <>
            {shouldDisableAnimation ? (
              <span className="text-xl [text-shadow:_0px_0px_2px_white]">
                {value}
              </span>
            ) : (
              <motion.span
                className="text-xl [text-shadow:_0px_0px_2px_white]"
                initial={{ opacity: isBeingAutofilled ? 0 : 0.2 }}
                animate={{ opacity: 1 }}
                transition={
                  isBeingAutofilled
                    ? {
                        type: "spring",
                        delay: value * 0.06,
                        duration: 0.5,
                      }
                    : {
                        duration: 0.3,
                      }
                }
                onAnimationComplete={() => {
                  if (value === 24 && isBeingAutofilled) {
                    onAutofillComplete && onAutofillComplete();
                  }
                }}
              >
                {value}
              </motion.span>
            )}
          </>
        ) : (
          <span className="text-xl [text-shadow:_0px_0px_2px_white] opacity-[0] group-hover:opacity-[0.2] transition-opacity duration-300">
            {valueToAssign}
          </span>
        )}
      </motion.div>
    </div>
  );
}
