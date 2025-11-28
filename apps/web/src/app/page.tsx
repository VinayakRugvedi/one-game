import Hero from "./sections/hero";
import BrandPhilosophy from "./sections/brand-philosophy";
import HowToPlay from "./sections/how-to-play";
import LetsBingo from "./sections/lets-bingo";

export default function Page() {
  return (
    <main className="overflow-hidden max-w-7xl mx-auto p-6 lg:px-8">
      <Hero />

      <BrandPhilosophy />

      <HowToPlay />

      <LetsBingo />
    </main>
  );
}
