import { LinkedinIcon, TwitterIcon } from "lucide-react";

import { Button } from "@repo/ui/components/button";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl p-6 lg:px-8 flex flex-col justify-center items-center gap-3">
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="icon-lg" className="rounded-full">
            <LinkedinIcon />
          </Button>
          <Button variant="outline" size="icon-lg" className="rounded-full">
            <TwitterIcon />
          </Button>
        </div>
        <div>One Game.</div>
      </div>
    </footer>
  );
}
