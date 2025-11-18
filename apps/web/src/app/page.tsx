import { Gradient } from "@repo/ui/gradient";

export default function Page() {
  return (
    <main className="bg-black/95 text-slate-300 main">
      <div className="flex justify-center items-center min-h-screen p-6 flex-col gap-3">
        <div className="flex justify-center items-center relative">
          <Gradient
            className="top-[100px] opacity-[0.15] w-[1000px] h-[1000px]"
            conic
          />
        </div>
      </div>
    </main>
  );
}
