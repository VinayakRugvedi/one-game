import Image from "next/image";
import Link from "next/link";
import { PlayIcon, CircleQuestionMarkIcon } from "lucide-react";

import { Button } from "@repo/ui/components/button";

export default function Header() {
  return (
    <header>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image
              src="/plain-right-flower-logo.svg"
              alt="One Game"
              width={30}
              height={30}
            />
            <span className="sr-only">One Game</span>
            <div className="text-2xl">One Game</div>
          </a>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" size="icon-lg" className="rounded-full">
            <Link href="/#how-to-play">
              <CircleQuestionMarkIcon />
            </Link>
          </Button>

          <Button variant="outline" size="icon-lg" className="rounded-full">
            <Link href="/play-the-board">
              <PlayIcon />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
