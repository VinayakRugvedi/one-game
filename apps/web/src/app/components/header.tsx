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
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <div className="text-2xl">One Game.</div>
          </a>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" size="icon-lg" className="rounded-full">
            <CircleQuestionMarkIcon />
          </Button>

          <Button variant="outline" size="icon-lg" className="rounded-full">
            <PlayIcon />
          </Button>
        </div>
      </nav>
    </header>
  );
}
