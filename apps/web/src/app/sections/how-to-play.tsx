import Link from "next/link";
import Image from "next/image";

import Tile from "@/components/bingo/tile";
import { Button } from "@repo/ui/components/button";

export default function HowToPlay() {
  return (
    <section className="flex justify-between items-center mt-30 flex-col py-6">
      <h2 className="text-7xl self-start" id="how-to-play">
        How to play?
      </h2>
      <div className="grid grid-rows-1 grid-cols-3 mt-6 w-full gap-6">
        <div>
          <div className="grid grid-rows-3 grid-cols-3 gap-[10px] w-[230px] h-[230px] [clip-path:rect(33px_196px_105%_-5%_round_10px)]">
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
            <Tile shouldDisableHover shouldDisableAnimation />
          </div>

          <h6 className="text-primary text-xl font-medium mt-2">Start</h6>
          <p>
            You begin with an empty 5 * 5 board - 25 tiles, no distractions.
          </p>
        </div>
        <div>
          <div className="grid grid-rows-3 grid-cols-3 gap-[10px] w-[230px] h-[230px] [clip-path:rect(33px_196px_105%_-5%_round_10px)]">
            <Tile shouldDisableHover shouldDisableAnimation value={3} />
            <Tile shouldDisableHover shouldDisableAnimation value={17} />
            <Tile shouldDisableHover shouldDisableAnimation value={10} />
            <Tile shouldDisableHover shouldDisableAnimation value={25} />
            <Tile shouldDisableHover shouldDisableAnimation value={1} />
            <Tile shouldDisableHover shouldDisableAnimation value={8} />
            <Tile shouldDisableHover shouldDisableAnimation value={21} />
            <Tile shouldDisableHover shouldDisableAnimation value={13} />
            <Tile shouldDisableHover shouldDisableAnimation value={5} />
          </div>

          <h6 className="text-primary text-xl font-medium mt-2">Prepare</h6>
          <p className="w-90">
            Fill the grid with numbers 1 to 25, placed anywhere you like or use
            the easy autofill option to populate your board.
          </p>
        </div>
        <div>
          <div className="grid grid-rows-3 grid-cols-3 gap-[10px] w-[230px] h-[230px] [clip-path:rect(33px_196px_105%_-5%_round_10px)]">
            <Tile shouldDisableHover shouldDisableAnimation value={3} />
            <Tile shouldDisableHover shouldDisableAnimation value={17} />
            <Tile shouldDisableHover shouldDisableAnimation value={10} />
            <Tile shouldDisableHover shouldDisableAnimation value={25} />
            <Tile
              shouldDisableHover
              shouldDisableAnimation
              value={1}
              isMarked
            />
            <Tile shouldDisableHover shouldDisableAnimation value={8} />
            <Tile shouldDisableHover shouldDisableAnimation value={21} />
            <Tile
              shouldDisableHover
              shouldDisableAnimation
              value={13}
              isMarked
            />
            <Tile
              shouldDisableHover
              shouldDisableAnimation
              value={5}
              isMarked
            />
          </div>
          <h6 className="text-primary text-xl font-medium mt-2">Mark</h6>
          <p className="w-90">
            Players take turns calling out numbers from their own boards.
            Whenever a number is called, both players mark the same number on
            their boards.
          </p>
        </div>
      </div>

      <div className="self-start mt-10">
        <h4 className="text-4xl text-primary flex gap-4 items-center">
          <Image
            src="/icons/grid-dots-five-by-five.svg"
            alt="5 by 5"
            width={50}
            height={50}
          />
          How do you win?
        </h4>

        <div className="mt-6 ml-17">
          <p>
            Your goal is to complete 5 sets.
            <br />A set is any fully-marked row, column, or diagonal.
            <br />
            The moment you complete your fifth set, you hit the magic word
            Bingo.
          </p>

          <Button className="rounded-full mt-6" asChild>
            <Link href="/play-the-board">Play the board</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
