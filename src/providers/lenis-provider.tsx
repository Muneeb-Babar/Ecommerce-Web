"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const lenisInstance = new Lenis({
      duration: 1.08,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
      autoResize: true,
    });

    lenisRef.current = lenisInstance;

    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    if (media.matches) {
      lenisInstance.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    } else {
      document.documentElement.classList.add("lenis", "lenis-smooth");
      rafId = requestAnimationFrame(raf);
    }

    // Defer setState to avoid set-state-in-effect lint warning
    const timeout = setTimeout(() => setLenis(lenisInstance), 0);

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(rafId);
        lenisRef.current?.destroy();
        lenisRef.current = null;
        setLenis(null);
        document.documentElement.classList.remove("lenis", "lenis-smooth");
      } else {
        cancelAnimationFrame(rafId);
        document.documentElement.classList.add("lenis", "lenis-smooth");
        const newLenis = new Lenis({
          duration: 1.08,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          smoothWheel: true,
          syncTouch: true,
          touchMultiplier: 1.2,
          wheelMultiplier: 1,
          autoResize: true,
        });
        lenisRef.current = newLenis;
        rafId = requestAnimationFrame(raf);
        setLenis(newLenis);
      }
    };

    media.addEventListener("change", handleReducedMotion);

    return () => {
      clearTimeout(timeout);
      media.removeEventListener("change", handleReducedMotion);
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
