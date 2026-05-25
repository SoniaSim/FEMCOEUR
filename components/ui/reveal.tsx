"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Délai avant le déclenchement, en ms */
  delay?: number;
  /** Direction du slide initial */
  from?: "bottom" | "left";
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Les classes d'invisibilité sont gated par `motion-safe:`, donc les users
  // en reduced-motion voient le contenu directement via CSS — pas besoin de
  // gérer ce cas en JS.
  const hiddenClass =
    from === "left"
      ? "motion-safe:opacity-0 motion-safe:-translate-x-6"
      : "motion-safe:opacity-0 motion-safe:translate-y-6";

  return (
    <div
      ref={ref}
      className={`will-change-transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : hiddenClass
      } ${className}`}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
