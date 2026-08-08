import { useEffect, useMemo, useState } from "react";

/** Floating jasmine petals drifting across the screen. */
export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: -Math.random() * 18,
        duration: 14 + Math.random() * 14,
        size: 10 + Math.random() * 18,
        drift: (Math.random() * 2 - 1) * 120,
        spin: Math.random() > 0.5 ? 1 : -1,
      })),
    [count],
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.spin * 540}deg`,
          }}
        />
      ))}
    </div>
  );
}
