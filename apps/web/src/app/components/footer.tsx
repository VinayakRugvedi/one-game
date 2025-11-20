import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl p-6 lg:px-8 flex flex-col justify-center items-center gap-3">
        <div className="flex items-center justify-center text-7xl gap-10">
          <Image
            src="/plain-right-flower-logo.svg"
            alt="One Game"
            width={100}
            height={100}
          />
          One Game
        </div>

        <p className="text-muted-foreground">
          Copyright © <span>{new Date().getFullYear()}</span> One Game
        </p>
      </div>
    </footer>
  );
}
