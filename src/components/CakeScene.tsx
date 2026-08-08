import { useEffect, useState } from "react";
import { assets } from "@/lib/images";

/**
 * Scene 1 — the cake. Blow into the mic (or tap) to put the candles out
 * and unlock the rest of the site.
 */
export function CakeScene({ onBlown }: { onBlown: () => void }) {
  const [blown, setBlown] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!blown) return;
    const t = setTimeout(onBlown, 2200);
    return () => clearTimeout(t);
  }, [blown, onBlown]);

  // Optional mic detection: a real breath puts the candles out.
  useEffect(() => {
    if (blown) return;
    let ctx: AudioContext | undefined;
    let stream: MediaStream | undefined;
    let raf = 0;
    let cancelled = false;

    async function listen() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) return;
        ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        setListening(true);
        const tick = () => {
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (const v of data) sum += (v - 128) ** 2;
          const rms = Math.sqrt(sum / data.length);
          if (rms > 26) setBlown(true);
          else raf = requestAnimationFrame(tick);
        };
        tick();
      } catch {
        setListening(false);
      }
    }
    void listen();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      void ctx?.close();
    };
  }, [blown]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-script text-4xl text-gradient-rose sm:text-5xl">Happy Birthday</p>
      <h1 className="mt-1 font-heading text-3xl tracking-tight text-foreground sm:text-5xl">
        Ruth Mariya S
      </h1>

      <button
        type="button"
        onClick={() => setBlown(true)}
        aria-label="Blow out the candles"
        className="group relative mt-10 cursor-pointer rounded-4xl focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative float-soft">
          <img
            src={assets.cake}
            alt="A pink two-tier birthday cake with candles"
            width={1024}
            height={1024}
            className="w-[min(78vw,26rem)] rounded-4xl shadow-soft"
          />
          {/* candle flames */}
          <div className="pointer-events-none absolute inset-0">
            {[38, 46, 54, 62].map((left, i) => (
              <span
                key={left}
                className="absolute"
                style={{ left: `${left}%`, top: `${i === 2 ? 12 : 15}%` }}
              >
                {!blown ? (
                  <span
                    className="block h-5 w-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-accent to-cream"
                    style={{
                      animation: `flicker ${0.35 + i * 0.07}s ease-in-out infinite`,
                      boxShadow: "0 0 22px var(--gold)",
                    }}
                  />
                ) : (
                  <span
                    className="block h-4 w-4 rounded-full bg-muted-foreground/40 blur-sm"
                    style={{ animation: `smoke-up 1.6s ease-out ${i * 0.1}s forwards` }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
        {!blown && (
          <span className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40 [animation:pulse-ring_2.4s_ease-out_infinite]" />
        )}
      </button>

      <p className="mt-8 max-w-sm text-sm text-muted-foreground sm:text-base">
        {blown
          ? "Wish locked in. Don't tell anyone what it was ✨"
          : listening
            ? "Close your eyes, make a wish… then blow into your mic 🎂"
            : "Make a wish, Princess — tap the cake to blow out the candles."}
      </p>
    </section>
  );
}
