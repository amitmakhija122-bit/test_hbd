import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";

import { Petals } from "@/components/Petals";
import { Confetti } from "@/components/Confetti";
import { CakeScene } from "@/components/CakeScene";
import { chapters } from "@/data/chapters";
import { assets } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Princess — Ruth Mariya S" },
      {
        name: "description",
        content:
          "A jasmine-scented birthday surprise for Ruth Mariya S: blow the candles, make a wish, and walk through every chapter of what makes her special.",
      },
      { property: "og:title", content: "Happy Birthday Princess — Ruth Mariya S" },
      {
        property: "og:description",
        content: "Blow the candles, make a wish, and open every chapter of this birthday surprise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayPage,
});

/** 0 = cake, 1 = hero, 2..n+1 = chapters, last = finale */
const HERO = 1;
const FIRST_CHAPTER = 2;
const TOTAL = FIRST_CHAPTER + chapters.length + 1;

function BirthdayPage() {
  const [scene, setScene] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  const next = useCallback(() => setScene((s) => Math.min(s + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setScene((s) => Math.max(s - 1, HERO)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onBlown = useCallback(() => {
    setCelebrate(true);
    setScene(HERO);
    setTimeout(() => setCelebrate(false), 6000);
  }, []);

  const chapter = scene >= FIRST_CHAPTER && scene < FIRST_CHAPTER + chapters.length
    ? chapters[scene - FIRST_CHAPTER]
    : undefined;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Petals />
      {celebrate && <Confetti />}

      {scene === 0 && <CakeScene onBlown={onBlown} />}
      {scene === HERO && <Hero />}
      {chapter && <ChapterScene key={chapter.id} chapter={chapter} index={scene - FIRST_CHAPTER} />}
      {scene === TOTAL - 1 && <Finale onRestart={() => setScene(0)} />}

      {scene > 0 && <Nav scene={scene} onNext={next} onPrev={prev} />}
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <img
        src={assets.jasmineBg}
        alt=""
        aria-hidden="true"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-20 flex flex-col items-center text-center">
        <div className="rise-in relative">
          <span className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-3xl" />
          <img
            src={assets.portrait}
            alt="Ruth Mariya S"
            width={768}
            height={1024}
            className="float-soft h-48 w-48 rounded-full border-4 border-cream object-cover shadow-soft sm:h-60 sm:w-60"
          />
        </div>

        <p
          className="rise-in mt-8 font-script text-5xl leading-tight text-gradient-rose shimmer-text sm:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          Happy Birthday
        </p>
        <h1
          className="rise-in font-heading text-4xl tracking-tight text-gradient-gold sm:text-6xl"
          style={{ animationDelay: "0.3s" }}
        >
          Princess
        </h1>
        <p
          className="rise-in mt-4 max-w-md text-sm text-secondary-foreground sm:text-base"
          style={{ animationDelay: "0.45s" }}
        >
          Ruth Mariya S — my Junior, my Princess. Chennai's jasmine girl, biryani's biggest fan,
          and the calmest person on any incident call.
        </p>
      </div>
    </section>
  );
}

function ChapterScene({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number];
  index: number;
}) {
  const flip = index % 2 === 1;
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-24">
      <div
        className={`flex w-full max-w-5xl flex-col items-center gap-10 md:gap-16 ${
          flip ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="rise-in relative w-full max-w-sm shrink-0">
          <span className="absolute -inset-4 -z-10 rounded-4xl bg-primary/20 blur-2xl" />
          <img
            src={chapter.image}
            alt={chapter.imageAlt}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-4xl border-4 border-cream object-cover shadow-soft"
          />
        </div>

        <div
          className="rise-in glass-card w-full rounded-4xl p-8 text-center md:text-left"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="font-script text-2xl text-gradient-rose">{chapter.eyebrow}</p>
          <h2 className="mt-1 font-heading text-3xl text-foreground sm:text-4xl">
            {chapter.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary-foreground">
            {chapter.message}
          </p>
        </div>
      </div>
    </section>
  );
}

function Finale({ onRestart }: { onRestart: () => void }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Heart className="h-10 w-10 text-primary float-soft" aria-hidden="true" />
      <p className="rise-in mt-6 font-script text-5xl text-gradient-rose sm:text-6xl">
        One Last Wish
      </p>
      <p
        className="rise-in mt-6 max-w-xl text-base leading-relaxed text-secondary-foreground"
        style={{ animationDelay: "0.2s" }}
      >
        May this year bring you jasmine mornings, endless biryani, beach sunsets, k-dramas with
        happy endings, and every prayer answered. Distance is just a config value — Mumbai to
        Chennai, I'm always one message away.
      </p>
      <p
        className="rise-in mt-6 font-heading text-xl text-gradient-gold"
        style={{ animationDelay: "0.35s" }}
      >
        Happy Birthday, Junior 🤍
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 cursor-pointer rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
      >
        Blow the candles again
      </button>
    </section>
  );
}

function Nav({
  scene,
  onNext,
  onPrev,
}: {
  scene: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  const isLast = scene === TOTAL - 1;
  return (
    <>
      {scene > HERO && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="fixed left-3 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full glass-card p-3 text-foreground transition-transform hover:scale-110 sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {!isLast && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="fixed right-3 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-4 text-primary-foreground shadow-soft transition-transform hover:scale-110 sm:right-6"
        >
          <span className="absolute inset-0 rounded-full border-2 border-primary/50 [animation:pulse-ring_2.2s_ease-out_infinite]" />
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {Array.from({ length: TOTAL - 1 }, (_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i + 1 === scene ? "w-6 bg-primary" : "w-2 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </>
  );
}
