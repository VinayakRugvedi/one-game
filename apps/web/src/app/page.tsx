import { Gradient } from "@repo/ui/gradient";
import Board from "./board";

export default function Page() {
  return (
    <main className="main">
      <div className="flex justify-between items-center min-h-screen p-6 flex-col gap-3">
        <Board />
        <h1 className="text-9xl">One Game</h1>
        {/* <div className="flex justify-center items-center relative">
          <Gradient
            className="top-[100px] opacity-[0.15] w-[1000px] h-[1000px]"
            conic
          />
        </div> */}
      </div>
    </main>
  );
}
