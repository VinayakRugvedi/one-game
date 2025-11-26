import Image from "next/image";

export default function BrandPhilosophy() {
  return (
    <section className="flex justify-between items-center mt-30 flex-col gap-10 py-24">
      <div className="text-9xl self-end flex justify-center items-center gap-3">
        <h2>One Game</h2>
        <Image
          src="/plain-right-flower-logo.svg"
          alt="one game"
          width={100}
          height={100}
        />
      </div>

      <div className="text-3xl self-start flex justify-center items-center gap-5">
        <Image
          src="/icons/grid-dots-five-by-five.svg"
          alt="5 by 5"
          width={100}
          height={100}
        />
        <p>
          The internet&apos;s most <br />
          <span className="italic text-primary">minimal</span> and <br />
          <span className="italic text-primary">premium</span> board game.
        </p>
      </div>
    </section>
  );
}
