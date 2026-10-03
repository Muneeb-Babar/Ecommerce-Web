"use client";

import { motion } from "framer-motion";
import { brandNames } from "@/data/content";

export function BrandMarquee() {
  const items = [...brandNames, ...brandNames];

  return (
    <section
      className="relative overflow-hidden border-y border-border/60 bg-card/40 py-8"
      aria-label="Brands we carry"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max items-center gap-14 pr-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="whitespace-nowrap text-xl font-bold uppercase tracking-wider text-foreground/40 transition-colors hover:text-foreground/80 md:text-2xl"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </section>
  );
}