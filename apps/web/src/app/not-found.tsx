import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/ui/components/button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col gap-6 h-[40rem]">
      <div className="text-9xl flex items-center justify-center gap-6">
        <span>4</span>
        <div className="w-[100px] h-[100px] [clip-path:circle(55%)]">
          <Image
            src="/icons/grid-dots-five-by-five.svg"
            alt="5 by 5"
            width={100}
            height={100}
          />
        </div>
        <span>4</span>
      </div>

      <p className="text-center">
        Sorry, the page you are looking for does not exist.
      </p>

      <div className="flex gap-4">
        <Button className="rounded-full" variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>

        <Button className="rounded-full" asChild>
          <Link href="/play-the-board">Play the board</Link>
        </Button>
      </div>
    </div>
  );
}
